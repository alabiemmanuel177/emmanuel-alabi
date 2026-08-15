# Academic CV

The CV source is version-controlled here; the built PDF is copied into
`public/cv/` so the website can serve it.

```
cv/
├── cv.tex                      ← source
├── references.bib              ← for a publications section, once one exists
└── generated/
    └── emmanuel-alabi-cv.pdf   ← build output
```

## Building

Requires a TeX distribution (`brew install --cask mactex-no-gui`, or TeX Live).

```bash
npm run cv:build
```

That runs `pdflatex` twice (once to resolve references, once to typeset) and
copies the result to `public/cv/emmanuel-alabi-cv.pdf`.

The site checks whether that file exists: if it is missing, the download button
is hidden rather than rendered as a broken link, and `/cv` tells the reader to
email for a copy instead.

## Content order

Follow the academic ordering, not the industry one:

1. Research interests
2. Education
3. Research experience
4. Publications
5. Selected projects
6. Engineering experience
7. Open source
8. Technical skills

## Rules

- **No GPA** unless it is verified against the final official transcript and you
  have decided it helps. Never attach the transcript itself.
- **No private data** — no phone number, no address, no passport or test
  registration numbers. This file is public.
- **Link individual entries to the site.** A CV line that reads
  `emmanuelalabi.com/research/<slug>` lets an admissions reader verify the work
  in one click, which is the entire point of maintaining both.
- **Version it in the footer**: `Academic CV v0 — August 2026`, and keep
  `site.cv.version` / `site.cv.updated` in `src/lib/site.ts` in step.
