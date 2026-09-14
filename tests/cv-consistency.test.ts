import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { getResearch } from "@/lib/content/loader";
import { getPublications } from "@/lib/content/publications";

/**
 * The CV has two renderers that can drift.
 *
 * `/cv` renders research entries from the content files, so it updates itself.
 * `cv/cv.tex` is written by hand and does not. The PDF is the artefact that
 * gets attached to an application, so it is the one that matters — and it has
 * silently fallen behind the site three times.
 *
 * These tests fail the build when the LaTeX CV is missing something the site is
 * already publishing. They match on slug URLs and DOIs rather than on titles,
 * because titles are LaTeX-escaped in the .tex source and would match brittly.
 */

const TEX = fs.readFileSync(path.join(process.cwd(), "cv", "cv.tex"), "utf8");

/**
 * Research entries deliberately kept off the academic CV. Add a slug here only
 * with a reason — the default is that published research belongs on the CV.
 */
const NOT_ON_CV = new Set<string>([
  // The programme statement is self-directed training, and appears under its
  // own heading rather than as a study.
  "research-programme-2026",
]);

describe("LaTeX CV tracks published research", () => {
  const entries = getResearch().filter(
    (e) => !NOT_ON_CV.has(e.frontmatter.slug),
  );

  it("has research to check", () => {
    expect(entries.length).toBeGreaterThan(0);
  });

  for (const entry of entries) {
    const { slug, title } = entry.frontmatter;
    it(`cv.tex includes ${slug}`, () => {
      expect(
        TEX.includes(`research/${slug}`),
        `"${title}" is published at /research/${slug} but does not appear in cv/cv.tex. ` +
          `The website and the PDF would disagree. Add it, or add the slug to NOT_ON_CV with a reason.`,
      ).toBe(true);
    });
  }
});

describe("LaTeX CV cites every published DOI", () => {
  const withDoi = getPublications().filter((p) => p.doi);

  for (const pub of withDoi) {
    it(`cv.tex cites ${pub.doi}`, () => {
      expect(
        TEX.includes(pub.doi as string),
        `${pub.doi} ("${pub.title}") is listed on /publications but is absent from cv/cv.tex.`,
      ).toBe(true);
    });
  }
});

describe("the built PDF matches the LaTeX source", () => {
  const pdf = path.join(process.cwd(), "public", "cv", "emmanuel-alabi-academic-cv.pdf");
  const stamp = path.join(process.cwd(), "cv", ".built-from.sha256");

  it("the PDF exists", () => {
    expect(fs.existsSync(pdf)).toBe(true);
  });

  it("was built from the current cv.tex", () => {
    // A committed hash rather than a file mtime: mtimes are meaningless after a
    // fresh clone, which is exactly where CI runs.
    expect(
      fs.existsSync(stamp),
      "cv/.built-from.sha256 is missing. Run `npm run cv:build`.",
    ).toBe(true);

    const built = fs.readFileSync(stamp, "utf8").trim();
    const current = createHash("sha256").update(TEX).digest("hex");
    expect(
      built,
      "cv/cv.tex has changed since the PDF was built, so the published PDF is stale. Run `npm run cv:build`.",
    ).toBe(current);
  });
});
