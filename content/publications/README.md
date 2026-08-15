# Publications

`publications.json` is a validated array of `Publication` records
(`src/lib/content/schemas.ts`). It is empty because there are no publications
yet, and it must stay empty until there are.

## Adding an entry

```json
[
  {
    "title": "Paper title",
    "slug": "paper-title",
    "authors": ["Emmanuel Alabi", "Co-author Name"],
    "year": 2027,
    "status": "preprint",
    "venue": "arXiv",
    "abstract": "…",
    "preprintUrl": "https://arxiv.org/abs/…",
    "codeUrl": "https://github.com/…",
    "projectUrl": "/research/…",
    "arxivId": "2701.00000",
    "bibtex": "@article{…}"
  }
]
```

## Status is a factual claim

`status` must describe where the work actually is:

| status       | means                                              |
| ------------ | -------------------------------------------------- |
| `manuscript` | being written; not submitted anywhere               |
| `preprint`   | publicly posted; **not** peer reviewed              |
| `submitted`  | submitted to a venue; under review                  |
| `accepted`   | accepted, not yet published                         |
| `published`  | published after peer review                         |

The UI labels each of these explicitly, so an inaccurate value is a visible
misrepresentation rather than a private one. Never upgrade a status ahead of the
decision letter.

The `/publications` route stays live with an honest empty state, and the section
is deliberately absent from the homepage until a real record exists.
