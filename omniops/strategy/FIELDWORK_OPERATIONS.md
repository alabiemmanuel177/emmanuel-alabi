# Fieldwork operations

## Evidence pipeline

```text
public prospect -> reply -> qualification -> scheduled interview
                -> workflow evidence -> score -> design-partner ask
```

No account becomes a “qualified interview” merely by replying. It must confirm
that it manages multiple customer tenants and participate in a workflow-specific
conversation.

## Response classification

- `positive`: agrees to interview or routes to an operator
- `question`: asks for more context; answer without turning it into a product pitch
- `not_fit`: does not manage recurring M365 operations or exits
- `no_interest`: relevant but declines
- `no_response`: no reply after one follow-up
- `bounce`: invalid route; research a new official contact

## Positive-reply response

Thank you. I am looking for 25 minutes with the person closest to the actual
workflow. I will ask about one recent, anonymised employee exit: trigger, systems,
steps, verification, exceptions, Lighthouse usage and customer evidence. No
confidential client data or system access is needed.

Please share two suitable times in WAT, or send me your booking link.

## “Tell me about the product” response

I am testing the problem before presenting a product. The working hypothesis is
that MSPs may need deterministic orchestration and evidence across offboarding
steps, but Microsoft 365 Lighthouse or existing scripts may already solve enough
of the job. I would rather understand your real workflow first than bias the
conversation with a demo.

## Interview handling

1. Obtain permission to take notes; do not record audio without explicit consent.
2. Use the guide in `DESIGN_PARTNER_PLAYBOOK.md`.
3. Ask to see a redacted ticket/checklist or a non-confidential Lighthouse flow.
4. Separate observed facts, direct statements, and interviewer inference.
5. Complete the scorecard within 30 minutes of the call.
6. Record H1–H7 evidence and contradictory evidence.
7. Make no design-partner offer unless the account scores at least 9/12.

## Design-partner transition

For a high-scoring account, ask:

> Based on what you showed me, I have a safe simulation of an offboarding plan,
> approval, retry and evidence workflow. Would you review it against a redacted
> real case? If that review confirms the gap, the next step would be a paid,
> sandbox-first pilot—not immediate production access.

Do not offer free lifetime pricing. A paid signal is part of validation.

## Weekly dashboard

| Metric | Week-one target |
| --- | ---: |
| Personalized first messages | 10 |
| Valid deliveries | 9 |
| Positive/routed replies | 3 |
| Qualified interviews booked | 2 |
| Qualified interviews completed | 1 |
| Workflow artifacts offered | 1 |
| Paid-pilot conversations | 0–1 |

The funnel is diagnostic. Low replies can indicate poor targeting or messaging;
interviews that reveal no pain indicate a weak problem; enthusiastic interviews
without access, artifacts or money remain weak commercial evidence.

