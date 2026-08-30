# Metrics and expansion gates

## Pilot measurement model

Measure workflow quality before vanity metrics such as total users “managed.”

| Metric | Definition | Pilot target |
| --- | --- | --- |
| Verified-step rate | Verified required steps / attempted required steps | 100%, allowing explicit exceptions rather than false success |
| Unauthorized actions | Actions without a valid plan-bound approval | 0 |
| Straight-through run rate | Runs needing no technician re-entry after approval | >=95% |
| Technician handling time | Active human minutes from request to accepted evidence | Median <5 minutes |
| Exception rate | Runs with at least one unresolved required step | Establish baseline; trend down weekly |
| Detection value | Previously missed/failed actions surfaced by OmniOps | Record count and severity |
| Time to access containment | Request approval to verified sign-in disablement | P50 and P95, no universal five-second claim |
| Evidence acceptance | Runs whose report is accepted without rework | >=90% |
| Pilot conversion | Paid annual conversions / completed pilots | >=50% before scaling sales |

## Instrumentation events

At minimum record:

- request created
- preflight started/completed
- plan created with content hash
- approval granted/rejected/expired
- action attempted/retried/accepted
- postcondition verified/failed
- exception assigned/resolved
- evidence generated/accepted
- run completed with outcome

Do not put tokens, credentials, message contents, or unnecessary personal data in
telemetry.

## Gate A: connected alpha

Open a sandbox integration only after the discovery gate in
`strategy/ICP_AND_VALIDATION.md` passes. Production remains disabled.

## Gate B: production pilot

Enable one production tenant only when:

- Sandbox runs demonstrate approval binding, idempotency, retries, and verification.
- The partner approves permissions and target actions in writing.
- Zero unresolved critical security findings remain.
- Evidence and exception handling are accepted by the partner workflow owner.
- Support and incident-response ownership are named.

## Gate C: repeatable offboarding product

Sell beyond design partners only when:

- At least 100 production runs have completed.
- No unauthorized action has occurred.
- Straight-through rate is at least 95% over the most recent 50 runs.
- At least two MSPs convert to paid annual use.
- Deployment can be repeated from documented steps without founder intervention.

## Gate D: add onboarding

Add onboarding only when Gate C passes and at least five paying MSPs rank it as
their next highest-value workflow. Build one joiner template for the same
Microsoft-first ICP; do not add a generic workflow platform yet.

## Gate E: add access requests

Add just-in-time application/group access only after onboarding is reliable and:

- Three customers provide written approval policies and escalation rules.
- The system can prove entitlement source, approver, duration, and revocation.
- A security review covers privilege escalation and compromised approver accounts.

## Separate investment decisions

AI helpdesk, network diagnostics, and self-healing infrastructure are not automatic
roadmap stages. Each requires its own discovery evidence, buyer, competitive review,
technical feasibility study, and explicit investment decision.

