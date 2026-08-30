from __future__ import annotations

from dataclasses import asdict, replace
from datetime import datetime, timezone
import time
from typing import Callable
from uuid import uuid4

from .adapters import OffboardingAdapter, PermanentProviderError, RetryableProviderError
from .models import (
    ActionKind,
    ActionSpec,
    Approval,
    ExecutionPlan,
    RunMode,
    RunResult,
    StepResult,
    StepStatus,
    content_hash,
)


class ApprovalError(RuntimeError):
    pass


class PlanIntegrityError(RuntimeError):
    pass


class OffboardingEngine:
    def __init__(
        self,
        adapter: OffboardingAdapter,
        sleeper: Callable[[float], None] = time.sleep,
        clock: Callable[[], datetime] | None = None,
    ) -> None:
        self.adapter = adapter
        self.sleeper = sleeper
        self.clock = clock or (lambda: datetime.now(timezone.utc))

    def create_plan(self, request_id: str, tenant_id: str, user_id: str) -> ExecutionPlan:
        snapshot = self.adapter.inspect_user(tenant_id, user_id)
        removable_groups = tuple(
            group_id
            for group_id in snapshot.direct_group_ids
            if group_id not in set(snapshot.protected_group_ids)
        )
        actions = (
            ActionSpec(
                action_id="disable-sign-in",
                kind=ActionKind.DISABLE_SIGN_IN,
                required=True,
                parameters={},
                desired_postcondition={"account_enabled": False},
            ),
            ActionSpec(
                action_id="revoke-sessions",
                kind=ActionKind.REVOKE_SESSIONS,
                required=True,
                parameters={},
                desired_postcondition={"sessions_revoked": True},
            ),
            ActionSpec(
                action_id="remove-direct-groups",
                kind=ActionKind.REMOVE_DIRECT_GROUPS,
                required=True,
                parameters={"group_ids": removable_groups},
                desired_postcondition={"direct_group_ids_absent": removable_groups},
            ),
            ActionSpec(
                action_id="reclaim-direct-licenses",
                kind=ActionKind.RECLAIM_DIRECT_LICENSES,
                required=True,
                parameters={"license_ids": snapshot.direct_license_ids},
                desired_postcondition={"direct_license_ids_absent": snapshot.direct_license_ids},
            ),
        )
        unsigned = ExecutionPlan(
            request_id=request_id,
            tenant_id=tenant_id,
            user_id=user_id,
            user_principal_name=snapshot.user_principal_name,
            created_at=self.clock(),
            preflight=snapshot,
            actions=actions,
            plan_hash="",
        )
        return replace(unsigned, plan_hash=self._calculate_plan_hash(unsigned))

    def execute(self, plan: ExecutionPlan, approval: Approval | None = None) -> RunResult:
        self._assert_plan_integrity(plan)
        mode = RunMode.PRODUCTION if self.adapter.is_production else RunMode.SIMULATION
        if mode is RunMode.PRODUCTION:
            self._assert_valid_approval(plan, approval)

        started_at = self.clock()
        results = tuple(self._execute_step(plan, action, mode) for action in plan.actions)
        required_exceptions = any(
            action.required and result.status is StepStatus.EXCEPTION
            for action, result in zip(plan.actions, results, strict=True)
        )
        outcome = (
            "exceptions"
            if required_exceptions
            else "simulated"
            if mode is RunMode.SIMULATION
            else "complete"
        )
        unsigned_result = RunResult(
            run_id=str(uuid4()),
            mode=mode,
            outcome=outcome,
            plan_hash=plan.plan_hash,
            started_at=started_at,
            finished_at=self.clock(),
            steps=results,
            evidence_hash="",
        )
        return replace(unsigned_result, evidence_hash=content_hash(asdict(unsigned_result)))

    def _execute_step(
        self, plan: ExecutionPlan, action: ActionSpec, mode: RunMode
    ) -> StepResult:
        started_at = self.clock()
        retry_delays: list[float] = []
        receipt = None
        attempts = 0
        try:
            for attempts in range(1, action.max_attempts + 1):
                try:
                    receipt = self.adapter.execute(plan.tenant_id, plan.user_id, action)
                    verification = self.adapter.verify(plan.tenant_id, plan.user_id, action)
                    if not verification.get("satisfied"):
                        raise PermanentProviderError("provider accepted action but postcondition failed")
                    return StepResult(
                        action_id=action.action_id,
                        kind=action.kind,
                        status=(
                            StepStatus.SIMULATED
                            if mode is RunMode.SIMULATION
                            else StepStatus.VERIFIED
                        ),
                        attempts=attempts,
                        started_at=started_at,
                        finished_at=self.clock(),
                        receipt=receipt,
                        verification=verification,
                        retry_delays_seconds=tuple(retry_delays),
                    )
                except RetryableProviderError as error:
                    if attempts == action.max_attempts:
                        raise
                    delay = (
                        error.retry_after_seconds
                        if error.retry_after_seconds is not None
                        else float(2 ** (attempts - 1))
                    )
                    retry_delays.append(delay)
                    self.sleeper(delay)
        except RetryableProviderError as error:
            code = "provider_retry_exhausted"
            message = str(error)
        except PermanentProviderError as error:
            code = "provider_permanent_error"
            message = str(error)

        return StepResult(
            action_id=action.action_id,
            kind=action.kind,
            status=StepStatus.EXCEPTION,
            attempts=attempts,
            started_at=started_at,
            finished_at=self.clock(),
            receipt=receipt,
            verification={"satisfied": False},
            exception_code=code,
            exception_message=message,
            retry_delays_seconds=tuple(retry_delays),
        )

    def _assert_plan_integrity(self, plan: ExecutionPlan) -> None:
        if plan.plan_hash != self._calculate_plan_hash(plan):
            raise PlanIntegrityError("execution plan content no longer matches its hash")

    def _assert_valid_approval(self, plan: ExecutionPlan, approval: Approval | None) -> None:
        if approval is None:
            raise ApprovalError("production execution requires explicit approval")
        if approval.plan_hash != plan.plan_hash:
            raise ApprovalError("approval is bound to a different execution plan")
        if approval.expires_at <= self.clock():
            raise ApprovalError("approval has expired")
        if approval.approved_at > self.clock():
            raise ApprovalError("approval timestamp is in the future")
        if not approval.approved_by.strip():
            raise ApprovalError("approval actor is required")

    @staticmethod
    def _calculate_plan_hash(plan: ExecutionPlan) -> str:
        payload = asdict(plan)
        payload.pop("plan_hash", None)
        return content_hash(payload)

