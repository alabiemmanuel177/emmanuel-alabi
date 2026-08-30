from __future__ import annotations

from dataclasses import asdict, replace
from datetime import datetime, timedelta, timezone
import unittest

from omniops.adapters import SimulatedMicrosoftAdapter
from omniops.engine import ApprovalError, OffboardingEngine, PlanIntegrityError
from omniops.models import (
    ActionKind,
    Approval,
    StepStatus,
    content_hash,
)


def user_state() -> dict[tuple[str, str], dict[str, object]]:
    return {
        ("tenant-1", "user-1"): {
            "user_principal_name": "alex@contoso.example",
            "account_enabled": True,
            "sessions_revoked": False,
            "direct_group_ids": {"sales", "protected-everyone"},
            "protected_group_ids": {"protected-everyone"},
            "direct_license_ids": {"m365-e3"},
        }
    }


class FixedClock:
    def __init__(self) -> None:
        self.now = datetime(2026, 8, 24, 12, 0, tzinfo=timezone.utc)

    def __call__(self) -> datetime:
        self.now += timedelta(milliseconds=1)
        return self.now


class EngineTests(unittest.TestCase):
    def make_engine(self, adapter: SimulatedMicrosoftAdapter) -> OffboardingEngine:
        return OffboardingEngine(adapter, sleeper=lambda _: None, clock=FixedClock())

    def test_plan_preserves_protected_groups(self) -> None:
        engine = self.make_engine(SimulatedMicrosoftAdapter(user_state()))
        plan = engine.create_plan("request-1", "tenant-1", "user-1")
        group_action = next(
            action for action in plan.actions if action.kind is ActionKind.REMOVE_DIRECT_GROUPS
        )

        self.assertEqual(group_action.parameters["group_ids"], ("sales",))
        self.assertNotIn("protected-everyone", group_action.parameters["group_ids"])

    def test_successful_simulation_verifies_all_steps_and_hashes_evidence(self) -> None:
        engine = self.make_engine(SimulatedMicrosoftAdapter(user_state()))
        plan = engine.create_plan("request-1", "tenant-1", "user-1")
        result = engine.execute(plan)

        self.assertEqual(result.outcome, "simulated")
        self.assertTrue(all(step.status is StepStatus.SIMULATED for step in result.steps))
        unsigned = replace(result, evidence_hash="")
        self.assertEqual(result.evidence_hash, content_hash(asdict(unsigned)))

    def test_transient_failure_is_retried_and_recorded(self) -> None:
        adapter = SimulatedMicrosoftAdapter(
            user_state(), transient_failures={ActionKind.REVOKE_SESSIONS: 1}
        )
        engine = self.make_engine(adapter)
        result = engine.execute(engine.create_plan("request-1", "tenant-1", "user-1"))
        step = next(
            item for item in result.steps if item.kind is ActionKind.REVOKE_SESSIONS
        )

        self.assertEqual(step.attempts, 2)
        self.assertEqual(step.retry_delays_seconds, (0,))
        self.assertEqual(adapter.execution_counts[ActionKind.REVOKE_SESSIONS], 2)

    def test_replaying_plan_is_idempotent(self) -> None:
        adapter = SimulatedMicrosoftAdapter(user_state())
        engine = self.make_engine(adapter)
        plan = engine.create_plan("request-1", "tenant-1", "user-1")
        engine.execute(plan)
        replay = engine.execute(plan)

        self.assertEqual(replay.outcome, "simulated")
        self.assertTrue(
            all(step.receipt and step.receipt.already_satisfied for step in replay.steps)
        )

    def test_permanent_failure_produces_explicit_exception(self) -> None:
        adapter = SimulatedMicrosoftAdapter(
            user_state(), permanent_failures={ActionKind.RECLAIM_DIRECT_LICENSES}
        )
        engine = self.make_engine(adapter)
        result = engine.execute(engine.create_plan("request-1", "tenant-1", "user-1"))
        step = next(
            item for item in result.steps
            if item.kind is ActionKind.RECLAIM_DIRECT_LICENSES
        )

        self.assertEqual(result.outcome, "exceptions")
        self.assertEqual(step.status, StepStatus.EXCEPTION)
        self.assertEqual(step.exception_code, "provider_permanent_error")

    def test_modified_plan_is_rejected(self) -> None:
        engine = self.make_engine(SimulatedMicrosoftAdapter(user_state()))
        plan = engine.create_plan("request-1", "tenant-1", "user-1")
        tampered_action = replace(plan.actions[0], required=False)
        tampered_plan = replace(plan, actions=(tampered_action, *plan.actions[1:]))

        with self.assertRaises(PlanIntegrityError):
            engine.execute(tampered_plan)

    def test_production_adapter_requires_plan_bound_unexpired_approval(self) -> None:
        adapter = SimulatedMicrosoftAdapter(user_state())
        adapter.is_production = True
        clock = FixedClock()
        engine = OffboardingEngine(adapter, sleeper=lambda _: None, clock=clock)
        plan = engine.create_plan("request-1", "tenant-1", "user-1")

        with self.assertRaises(ApprovalError):
            engine.execute(plan)

        approval = Approval(
            plan_hash=plan.plan_hash,
            approved_by="service-owner@partner.example",
            approved_at=clock.now - timedelta(minutes=1),
            expires_at=clock.now + timedelta(minutes=30),
        )
        result = engine.execute(plan, approval)
        self.assertEqual(result.outcome, "complete")
        self.assertTrue(all(step.status is StepStatus.VERIFIED for step in result.steps))


if __name__ == "__main__":
    unittest.main()
