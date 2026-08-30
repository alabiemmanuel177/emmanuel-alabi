from __future__ import annotations

from dataclasses import asdict, dataclass
from datetime import datetime, timezone
from enum import Enum
from hashlib import sha256
import json
from typing import Any


class ActionKind(str, Enum):
    DISABLE_SIGN_IN = "disable_sign_in"
    REVOKE_SESSIONS = "revoke_sessions"
    REMOVE_DIRECT_GROUPS = "remove_direct_groups"
    RECLAIM_DIRECT_LICENSES = "reclaim_direct_licenses"


class RunMode(str, Enum):
    SIMULATION = "simulation"
    PRODUCTION = "production"


class StepStatus(str, Enum):
    SIMULATED = "simulated"
    VERIFIED = "verified"
    EXCEPTION = "exception"


def utc_now() -> datetime:
    return datetime.now(timezone.utc)


def canonical_json(value: Any) -> str:
    return json.dumps(value, sort_keys=True, separators=(",", ":"), default=_json_default)


def content_hash(value: Any) -> str:
    return sha256(canonical_json(value).encode("utf-8")).hexdigest()


def _json_default(value: Any) -> Any:
    if isinstance(value, datetime):
        return value.isoformat()
    if isinstance(value, Enum):
        return value.value
    if hasattr(value, "__dataclass_fields__"):
        return asdict(value)
    raise TypeError(f"Cannot serialize {type(value)!r}")


@dataclass(frozen=True)
class UserSnapshot:
    tenant_id: str
    user_id: str
    user_principal_name: str
    account_enabled: bool
    direct_group_ids: tuple[str, ...]
    protected_group_ids: tuple[str, ...]
    direct_license_ids: tuple[str, ...]
    captured_at: datetime


@dataclass(frozen=True)
class ActionSpec:
    action_id: str
    kind: ActionKind
    required: bool
    parameters: dict[str, Any]
    desired_postcondition: dict[str, Any]
    max_attempts: int = 3


@dataclass(frozen=True)
class ExecutionPlan:
    request_id: str
    tenant_id: str
    user_id: str
    user_principal_name: str
    created_at: datetime
    preflight: UserSnapshot
    actions: tuple[ActionSpec, ...]
    plan_hash: str


@dataclass(frozen=True)
class Approval:
    plan_hash: str
    approved_by: str
    approved_at: datetime
    expires_at: datetime


@dataclass(frozen=True)
class ProviderReceipt:
    provider: str
    operation_id: str
    accepted_at: datetime
    already_satisfied: bool = False


@dataclass(frozen=True)
class StepResult:
    action_id: str
    kind: ActionKind
    status: StepStatus
    attempts: int
    started_at: datetime
    finished_at: datetime
    receipt: ProviderReceipt | None
    verification: dict[str, Any]
    exception_code: str | None = None
    exception_message: str | None = None
    retry_delays_seconds: tuple[float, ...] = ()


@dataclass(frozen=True)
class RunResult:
    run_id: str
    mode: RunMode
    outcome: str
    plan_hash: str
    started_at: datetime
    finished_at: datetime
    steps: tuple[StepResult, ...]
    evidence_hash: str

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)

