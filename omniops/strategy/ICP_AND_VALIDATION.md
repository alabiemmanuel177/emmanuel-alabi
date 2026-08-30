# ICP and validation plan

## Narrow market thesis

OmniOps initially serves Microsoft-centric MSPs that repeatedly offboard users
across multiple client tenants and must prove that every access-revocation step
completed.

### Ideal design partner

- MSP with 10–75 employees
- Manages 10–100 client organizations and 1,000–20,000 Microsoft 365 users
- Uses Microsoft 365 and Entra ID for most clients
- Performs at least 20 employee offboardings per month across its client base
- Uses a PSA or ticketing system but still relies on checklists, scripts, or
  technician memory for some offboarding work
- Owner, service-delivery lead, or security lead can authorize a pilot

### Exclusions for the first pilot

- Internal IT departments that do not manage multiple tenants
- Enterprises requiring on-premises Active Directory in the first workflow
- Google-first estates
- Buyers asking first for general helpdesk chat, endpoint management, SIEM, or
  network diagnostics

## Job to be done

> When a client's employee leaves, help me disable access, reclaim licenses,
> handle exceptions, and produce evidence across tenants without relying on a
> technician to remember every step.

The initial promise is **verified completion**, not universal completion in five
seconds.

## Hypotheses to test

| ID | Hypothesis | Evidence required |
| --- | --- | --- |
| H1 | Offboarding remains partly manual | 10 of 15 qualified MSPs show a real checklist, ticket, or script |
| H2 | Failures or omissions are meaningful | 8 of 15 report a missed, delayed, or unverifiable step in the last 90 days |
| H3 | Assurance is more valuable than raw speed | 8 of 15 rank verification/evidence above “finish in seconds” |
| H4 | MSPs will grant narrowly scoped tenant access | 5 of 15 agree to a sandbox or test tenant integration review |
| H5 | A buyer will pay | 3 signed design-partner agreements, including at least 1 paid pilot |
| H6 | Microsoft-first is sufficiently common | 10 of 15 say at least 70% of managed seats are Microsoft 365/Entra based |
| H7 | Lighthouse leaves a valuable workflow gap | 8 of 15 can name a recurring orchestration, verification, evidence, or PSA-integration gap not acceptably solved by Microsoft 365 Lighthouse |

## Discovery sample

Recruit 20 MSPs to obtain at least 15 qualified interviews. Avoid counting
consultants, vendors, friends without buying authority, or hypothetical answers
as qualified evidence.

For each interview capture:

- Interviewee role, company size, managed tenants, and managed seats
- Monthly offboarding volume
- Last real offboarding, including tools, handoffs, elapsed time, and failures
- Existing PSA, scripts, identity tools, and competing products
- Security review and tenant-consent requirements
- Economic impact and current budget owner
- Commitment obtained: none, follow-up, artifact sharing, sandbox, LOI, or paid pilot

## Decision gate after 15 qualified interviews

Proceed to a connected alpha only if all are true:

1. At least five of H1–H7 pass, including H4, H5, and H7.
2. Three design partners provide workflow artifacts or sandbox access.
3. At least one partner signs a paid pilot or pays a refundable deployment fee.
4. No single incumbent already satisfies more than 80% of the desired workflow
   at an acceptable price for most interviewees.

If H4 fails, test a customer-hosted execution worker. If H5 fails, revise the
problem or buyer before adding product scope. Do not compensate by adding an AI
helpdesk, diagnostics, or compliance features.

If H7 fails, stop the Microsoft-only product build. Consider either a thin
services/implementation offering around Lighthouse or validate a genuinely
cross-vendor workflow instead of recreating Microsoft's control plane.

## Interview scorecard

Score each account from 0–2 on each dimension:

| Dimension | 0 | 1 | 2 |
| --- | --- | --- | --- |
| Frequency | <5 exits/month | 5–19 | 20+ |
| Manual work | Fully automated | Some scripts/checklists | Mostly manual/multi-step |
| Consequence | Minor inconvenience | Rework/SLA risk | Security, audit, or client risk |
| Authority | No buyer access | Influencer | Budget owner/signer |
| Access readiness | Will not connect | Needs review | Sandbox/test tenant available |
| Payment signal | No budget | Price discussion | Paid pilot/deposit |

Prioritize accounts scoring 9 or higher out of 12.
