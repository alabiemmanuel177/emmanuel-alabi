from __future__ import annotations

import argparse
import json

from .adapters import SimulatedMicrosoftAdapter
from .engine import OffboardingEngine
from .models import ActionKind, canonical_json


def main() -> None:
    parser = argparse.ArgumentParser(description="Run a safe OmniOps workflow simulation")
    parser.add_argument(
        "--scenario",
        choices=("success", "transient-failure", "permanent-failure"),
        default="success",
    )
    args = parser.parse_args()

    user_state = {
        ("tenant-demo", "user-demo"): {
            "user_principal_name": "alex@contoso.example",
            "account_enabled": True,
            "sessions_revoked": False,
            "direct_group_ids": {"sales", "all-employees", "vpn-users"},
            "protected_group_ids": {"all-employees"},
            "direct_license_ids": {"m365-e3", "power-bi-pro"},
        }
    }
    transient = (
        {ActionKind.REVOKE_SESSIONS: 1} if args.scenario == "transient-failure" else None
    )
    permanent = (
        {ActionKind.RECLAIM_DIRECT_LICENSES}
        if args.scenario == "permanent-failure"
        else None
    )
    adapter = SimulatedMicrosoftAdapter(user_state, transient, permanent)
    engine = OffboardingEngine(adapter)
    plan = engine.create_plan("request-demo", "tenant-demo", "user-demo")
    result = engine.execute(plan)
    print(json.dumps(json.loads(canonical_json(result.to_dict())), indent=2, sort_keys=True))


if __name__ == "__main__":
    main()

