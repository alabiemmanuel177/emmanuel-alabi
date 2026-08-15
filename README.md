# Emmanuel Alabi — research website

Personal AI and robotics research site. It is the canonical public index for
research, projects, writing, and CV, and the evidence layer that everything else
(GitHub repositories, papers, the academic CV) links back to.

Next.js 16 · App Router · TypeScript · Tailwind CSS v4 · MDX · KaTeX · Shiki.

## Running it

```bash
npm install
npm run dev          # http://localhost:3000 — drafts are visible
npm run check        # typecheck → lint → content validation → tests → build
```

| script                 | what it does                                          |
| ---------------------- | ----------------------------------------------------- |
| `npm run dev`          | dev server, drafts visible                            |
| `npm run build`        | production build, drafts excluded                     |
| `npm run typecheck`    | `tsc --noEmit`                                        |
| `npm run lint`         | ESLint                                                |
| `npm run content:validate` | frontmatter schemas, slugs, internal links        |
| `npm test`             | Vitest                                                |
| `npm run cv:build`     | build `cv/cv.tex` → `public/cv/` (needs a TeX install)|
| `npm run check`        | everything CI runs                                    |

## Where content lives

Content is MDX with validated frontmatter, version-controlled alongside the
code. There is no CMS, by design.

```
content/
├── research/       one .mdx per investigation (+ optional <slug>.experiments.json)
├── projects/       engineering and educational work
├── writing/        research notes, derivations, reproductions
├── log/            research log entries
└── publications/   publications.json (currently empty, and must stay honest)
```

Schemas live in `src/lib/content/schemas.ts` and are enforced at build time —
malformed frontmatter fails the build rather than shipping.

### Adding something

1. Copy the relevant `_template-*.mdx` in the target directory.
2. Rename the file **and** its `slug` to match — a mismatch is a build error.
3. Fill it in. Delete every `TODO`.
4. Set `draft: false` when it passes the quality gate below.

Filenames beginning with `_` are templates: schema-checked, never published.

### Draft protection

`draft: true` or `visibility: private | archived` removes an entry from every
page, from `generateStaticParams`, and from the sitemap in any non-development
build. `SHOW_DRAFTS=1` previews drafts locally; CI asserts that no draft was
prerendered.

## Publishing bar

Before setting `draft: false` on a research page:

- can the primary claim be supported by something linkable?
- does every metric trace to a specific experiment?
- is the methodology understandable to someone outside the project?
- are limitations acknowledged?
- is external work properly referenced?
- does the repository exist, and do its links resolve?
- does the status accurately represent maturity?
- has anything confidential been removed?

Three standing rules:

1. **Never fabricate** metrics, collaborators, papers, affiliations, venues,
   supervisors, datasets, or results.
2. **Distinguish** hypothesis, preliminary result, final result, manuscript,
   submitted paper, and peer-reviewed work. Status labels are factual claims.
3. **Keep negative results.** Failed experiments stay documented.

Nothing about admissions strategy, referees, statements, transcripts, or other
private application material belongs in this repository.

## Writing MDX

Math is KaTeX (`$inline$`, `$$display$$`), code is highlighted by Shiki, and
both render at build time — a research page ships no client JavaScript for its
content. Components available inside MDX:

| component               | use                                              |
| ----------------------- | ------------------------------------------------ |
| `<Figure>`              | research figure with caption, source, context     |
| `<ArchitectureDiagram>` | vector pipeline diagram (text, not an image)      |
| `<VideoEmbed>`          | privacy-enhanced YouTube embed                    |
| `<Cite n={1} />`        | inline numbered citation                          |
| `<References items>`    | reference list                                    |
| `<Note title>`          | callout for limitations and caveats               |

## Deployment

GitHub → Vercel. `main` deploys to production; branches get preview
deployments. Set `NEXT_PUBLIC_SITE_URL` in the Vercel project once the custom
domain is attached — canonicals, OpenGraph URLs, the sitemap, and `robots.txt`
all derive from it.

## Identity and links

`src/lib/site.ts` is the single source for name, descriptor, research
interests, email, and profile links. A profile link is rendered only when it is
non-empty, so an unset handle is absent rather than broken. Add `orcid` and
`scholar` there once formal publications exist; the footer, CV, contact page,
and `Person` JSON-LD pick them up automatically.
