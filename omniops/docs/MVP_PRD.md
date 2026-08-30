# MVP product requirements

## Product statement

OmniOps helps Microsoft-centric MSPs execute and prove employee offboarding
across client tenants. The MVP coordinates deterministic Microsoft 365/Entra
actions and returns one of two outcomes for every required step:

1. verified complete; or
2. explicit exception requiring a named human owner.

It does not promise that every third-party operation completes within five
seconds. It records initiation time, verified-completion time, retries, and the
provider response independently.

## Primary user and workflow

The primary user is an MSP service-delivery technician operating an approved
client tenant.

1. Technician identifies the tenant and departing user.
2. OmniOps performs a read-only preflight and shows the discovered state.
3. A permitted approver reviews the exact action plan.
4. OmniOps executes approved actions using least-privileged tenant consent.
5. Transient provider failures respect `Retry-After` or exponential backoff.
6. OmniOps verifies postconditions instead of treating a successful request as
   proof of completion.
7. Exceptions remain visible and assigned; the run cannot appear successful
   while a required step is unverified.
8. OmniOps emits a tamper-evident evidence package.

## MVP action set

| Action | Desired postcondition | Failure behavior |
| --- | --- | --- |
| Disable sign-in | `accountEnabled` is false | Critical exception; continue safe independent checks |
| Revoke sessions | Provider accepts revocation and the revocation timestamp/verification limitation is recorded | Retry transient failures; otherwise exception; never claim immediate global invalidation |
| Remove direct group memberships | User is absent from approved removable groups | Preserve protected/dynamic groups; exception per group |
| Reclaim direct licenses | Approved direct licenses are absent | Do not remove inherited/group-based licenses |

Mailbox delegation, OneDrive ownership transfer, devices, privileged roles,
on-premises Active Directory, and non-Microsoft SaaS are discovery items, not
assumed MVP commitments. They enter scope only when partner evidence establishes
their exact semantics and required permissions.

## Functional requirements

- Tenant isolation: every object and execution is keyed by MSP and client tenant.
- Idempotency: replaying the same action does not create a second destructive effect.
- Approval binding: approval references an immutable plan hash, actor, and timestamp.
- Dry run by default: no connected action without explicit mode and valid approval.
- Least privilege: request only the Microsoft Graph permissions required by the
  partner-approved action set.
- Verification: read the postcondition after the provider accepts a write.
- Honest certainty: where Microsoft exposes acceptance but not an immediate
  observable global postcondition, label the evidence `accepted_pending_effect`
  and record the documented propagation limitation.
- Retry policy: retry only errors classified as transient; respect provider delay.
- Exceptions: record code, safe message, attempts, owner, and next action.
- Audit trail: append execution events with actor, tenant, target, action, and time.
- Evidence integrity: hash a canonical representation of the final package.
- Data minimization: avoid storing message contents, files, credentials, or
  unrelated directory attributes.

## Safety invariants

- An LLM may not authorize or directly execute an offboarding action.
- Device wipe and user deletion are not MVP actions.
- An action absent from the approved immutable plan cannot execute.
- A run with an unverified required step cannot be labeled complete.
- Provider credentials and access tokens must never appear in logs or evidence.
- Simulation and production adapters must be visibly distinct.
- Production requires an MSP/client authorization record and tested break-glass path.

## Architecture boundary

```text
request -> preflight -> immutable plan -> approval -> workflow engine
                                                      |-> provider adapter
                                                      |-> verification reads
                                                      |-> append-only events
                                                      `-> evidence package
```

The workflow engine owns state transitions, retries, approvals, and evidence.
Provider adapters translate deterministic actions into provider APIs. A future UI
or PSA integration may submit requests but cannot bypass the engine invariants.

## Connected-alpha prerequisites

- Three design partners pass the validation gate.
- One paid pilot or deployment deposit is signed.
- Permission matrix reviewed with a Microsoft identity specialist.
- Threat model, DPA, incident response plan, and credential-rotation procedure exist.
- Sandbox tests cover throttling, partial success, stale approval, target mismatch,
  replay, loss of connectivity, and evidence integrity.
- A human-readable rollback/compensation procedure exists for each reversible action.

## Out of scope until expansion gates pass

- AI helpdesk and password/MFA reset
- General onboarding automation
- Network/root-cause diagnostics
- Endpoint telemetry ingestion
- Automated device wipe
- Self-healing compliance remediation
- Kubernetes, Kafka, Neo4j, and other scale infrastructure without measured need
