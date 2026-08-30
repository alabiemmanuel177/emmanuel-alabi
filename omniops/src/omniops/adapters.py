from __future__ import annotations

from copy import deepcopy
from datetime import datetime, timezone
from typing import Protocol
from uuid import uuid4

from .models import ActionKind, ActionSpec, ProviderReceipt, UserSnapshot


class RetryableProviderError(RuntimeError):
    def __init__(self, message: str, retry_after_seconds: float | None = None):
        super().__init__(message)
        self.retry_after_seconds = retry_after_seconds


class PermanentProviderError(RuntimeError):
    pass


class OffboardingAdapter(Protocol):
    is_production: bool

    def inspect_user(self, tenant_id: str, user_id: str) -> UserSnapshot: ...

    def execute(self, tenant_id: str, user_id: str, action: ActionSpec) -> ProviderReceipt: ...

    def verify(self, tenant_id: str, user_id: str, action: ActionSpec) -> dict[str, object]: ...


class SimulatedMicrosoftAdapter:
    """Stateful, credential-free Microsoft adapter for workflow validation.

    Failure counts make throttling and partial-provider failures reproducible in
    tests and demos. This adapter never performs network operations.
    """

    is_production = False

    def __init__(
        self,
        users: dict[tuple[str, str], dict[str, object]],
        transient_failures: dict[ActionKind, int] | None = None,
        permanent_failures: set[ActionKind] | None = None,
    ) -> None:
        self._users = deepcopy(users)
        self._transient_failures = dict(transient_failures or {})
        self._permanent_failures = set(permanent_failures or set())
        self.execution_counts: dict[ActionKind, int] = {}

    def inspect_user(self, tenant_id: str, user_id: str) -> UserSnapshot:
        state = self._state(tenant_id, user_id)
        return UserSnapshot(
            tenant_id=tenant_id,
            user_id=user_id,
            user_principal_name=str(state["user_principal_name"]),
            account_enabled=bool(state["account_enabled"]),
            direct_group_ids=tuple(sorted(str(v) for v in state["direct_group_ids"])),
            protected_group_ids=tuple(sorted(str(v) for v in state["protected_group_ids"])),
            direct_license_ids=tuple(sorted(str(v) for v in state["direct_license_ids"])),
            captured_at=datetime.now(timezone.utc),
        )

    def execute(self, tenant_id: str, user_id: str, action: ActionSpec) -> ProviderReceipt:
        self.execution_counts[action.kind] = self.execution_counts.get(action.kind, 0) + 1
        remaining = self._transient_failures.get(action.kind, 0)
        if remaining:
            self._transient_failures[action.kind] = remaining - 1
            raise RetryableProviderError("simulated provider throttling", retry_after_seconds=0)
        if action.kind in self._permanent_failures:
            raise PermanentProviderError("simulated permanent provider rejection")

        state = self._state(tenant_id, user_id)
        already_satisfied = self._is_satisfied(state, action)
        if not already_satisfied:
            if action.kind is ActionKind.DISABLE_SIGN_IN:
                state["account_enabled"] = False
            elif action.kind is ActionKind.REVOKE_SESSIONS:
                state["sessions_revoked"] = True
            elif action.kind is ActionKind.REMOVE_DIRECT_GROUPS:
                removable = set(action.parameters["group_ids"])
                state["direct_group_ids"] = set(state["direct_group_ids"]) - removable
            elif action.kind is ActionKind.RECLAIM_DIRECT_LICENSES:
                removable = set(action.parameters["license_ids"])
                state["direct_license_ids"] = set(state["direct_license_ids"]) - removable

        return ProviderReceipt(
            provider="simulated-microsoft",
            operation_id=str(uuid4()),
            accepted_at=datetime.now(timezone.utc),
            already_satisfied=already_satisfied,
        )

    def verify(self, tenant_id: str, user_id: str, action: ActionSpec) -> dict[str, object]:
        state = self._state(tenant_id, user_id)
        satisfied = self._is_satisfied(state, action)
        return {"satisfied": satisfied, "postcondition": action.desired_postcondition}

    def _state(self, tenant_id: str, user_id: str) -> dict[str, object]:
        try:
            return self._users[(tenant_id, user_id)]
        except KeyError as error:
            raise PermanentProviderError("target user was not found in the tenant") from error

    @staticmethod
    def _is_satisfied(state: dict[str, object], action: ActionSpec) -> bool:
        if action.kind is ActionKind.DISABLE_SIGN_IN:
            return state["account_enabled"] is False
        if action.kind is ActionKind.REVOKE_SESSIONS:
            return state.get("sessions_revoked") is True
        if action.kind is ActionKind.REMOVE_DIRECT_GROUPS:
            return not (set(action.parameters["group_ids"]) & set(state["direct_group_ids"]))
        if action.kind is ActionKind.RECLAIM_DIRECT_LICENSES:
            return not (set(action.parameters["license_ids"]) & set(state["direct_license_ids"]))
        return False

