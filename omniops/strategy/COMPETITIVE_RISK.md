# Competitive risk: Microsoft 365 Lighthouse

## Why this is the first kill test

Microsoft 365 Lighthouse is a first-party, multi-tenant management portal for
MSPs. Microsoft documents cross-tenant user search and common account-management
tasks, including updating users, blocking sign-in, resetting passwords, assigning
licenses, and managing groups, mailboxes, and OneDrive.

Sources:

- [Lighthouse overview](https://learn.microsoft.com/en-us/microsoft-365/lighthouse/m365-lighthouse-overview?view=o365-worldwide)
- [Users page overview](https://learn.microsoft.com/en-us/microsoft-365/lighthouse/m365-lighthouse-users-page-overview?view=o365-worldwide)
- [Block user sign-in](https://learn.microsoft.com/en-us/microsoft-365/lighthouse/m365-lighthouse-block-user-signin?view=o365-worldwide)

Building another screen for those actions is not sufficient differentiation.

## Potential gap to validate, not assume

OmniOps may still be valuable if MSPs demonstrate that Lighthouse does not
acceptably provide an end-to-end offboarding workflow with:

- a PSA/ticket trigger and status synchronization;
- immutable, plan-bound customer approval;
- ordered execution across every required step;
- provider-aware retries and explicit exception ownership;
- postcondition verification rather than a closed checklist;
- customer-specific policy templates;
- cross-vendor actions outside the Microsoft estate; and
- one client-ready, tamper-evident evidence package.

These are hypotheses. The team must observe the gap in real MSP workflows and
obtain payment/access commitments before building a connected adapter.

## Interview comparison test

Ask the partner to execute or demonstrate a recent offboarding using its current
tools. Record every step that occurs outside Lighthouse and why. Then show only a
low-fidelity OmniOps evidence package—not a feature-heavy product pitch—and ask:

1. Which missing proof would stop you from sending this report to a client?
2. Which current tool could already produce it?
3. Would replacing the remaining manual work justify a paid pilot?
4. Would you prefer a product, a PowerShell/Lighthouse implementation service,
   or a PSA-native extension?

If most buyers prefer a one-time script or configuration engagement, that is
evidence against the proposed SaaS model.

