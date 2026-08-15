import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { getLog, getProjects, getResearch, getWriting } from "@/lib/content/loader";

/** Static routes the app serves. */
const STATIC_ROUTES = new Set([
  "/",
  "/research",
  "/publications",
  "/projects",
  "/writing",
  "/log",
  "/about",
  "/now",
  "/cv",
  "/contact",
]);

const published = [
  ...getResearch().map((e) => `/research/${e.frontmatter.slug}`),
  ...getProjects().map((e) => `/projects/${e.frontmatter.slug}`),
  ...getWriting().map((e) => `/writing/${e.frontmatter.slug}`),
  ...getLog().map((e) => `/log/${e.frontmatter.slug}`),
];

const known = new Set([...STATIC_ROUTES, ...published]);

const entries = [
  ...getResearch(),
  ...getProjects(),
  ...getWriting(),
  ...getLog(),
];

const LINK = /\]\((\/[^)\s]*)\)/g;

function resolves(href: string): boolean {
  const clean = href.split("#")[0].replace(/\/$/, "") || "/";
  if (known.has(clean)) return true;
  if (fs.existsSync(path.join(process.cwd(), "public", clean))) return true;

  const experiments = /^\/research\/([^/]+)\/experiments$/.exec(clean);
  if (experiments) {
    return fs.existsSync(
      path.join(process.cwd(), "content", "research", `${experiments[1]}.experiments.json`),
    );
  }
  return false;
}

describe("internal links in published content", () => {
  if (entries.length === 0) {
    it("skipped — no published content", () => {
      expect(true).toBe(true);
    });
  }

  for (const entry of entries) {
    const hrefs = [...entry.body.matchAll(LINK)].map((m) => m[1]);
    for (const href of hrefs) {
      it(`${entry.file} → ${href}`, () => {
        expect(resolves(href), `${href} does not resolve`).toBe(true);
      });
    }
  }
});

describe("relatedResearch references", () => {
  const researchSlugs = new Set(
    getResearch().map((entry) => entry.frontmatter.slug),
  );

  const references = [...getWriting(), ...getLog()].flatMap((entry) =>
    entry.frontmatter.relatedResearch.map((slug) => ({ file: entry.file, slug })),
  );

  it("every referenced research slug is published", () => {
    const dangling = references.filter((r) => !researchSlugs.has(r.slug));
    expect(dangling).toEqual([]);
  });
});
