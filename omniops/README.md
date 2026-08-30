# OmniOps

OmniOps is an offboarding-assurance platform for Microsoft-centric managed
service providers (MSPs). It coordinates access-revocation work, verifies each
operation, retries transient failures, and produces an audit-ready evidence
record.

The repository deliberately starts with one narrow workflow. It does not yet
connect to a production Microsoft tenant and it does not use an LLM to authorize
destructive actions.

## Current phase

The project is in design-partner validation. The included prototype is a
credential-free workflow core with a simulated Microsoft adapter. It is useful
for testing the workflow contract with MSPs before requesting tenant access.

## Repository map

- `strategy/ICP_AND_VALIDATION.md` — target customer, hypotheses, and evidence gates
- `strategy/DESIGN_PARTNER_PLAYBOOK.md` — outreach, interview, LOI, and paid pilot
- `docs/MVP_PRD.md` — product requirements and safety boundaries
- `docs/METRICS_AND_EXPANSION_GATES.md` — pilot measurement and expansion rules
- `src/omniops/` — deterministic workflow prototype
- `tests/` — behavior and safety tests

## Run the prototype

Requires Python 3.11 or newer and has no third-party runtime dependencies.

```bash
python3 -m unittest discover -s tests -v
PYTHONPATH=src python3 -m omniops.cli --scenario success
PYTHONPATH=src python3 -m omniops.cli --scenario transient-failure
```

The CLI prints a JSON evidence package. Every execution defaults to simulation;
the engine requires an explicit approval record before it will execute a live
adapter.

