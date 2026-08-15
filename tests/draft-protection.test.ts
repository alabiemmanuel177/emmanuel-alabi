import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { describe, expect, it } from "vitest";

import {
  draftsVisible,
  getLog,
  getProjects,
  getResearch,
  getWriting,
} from "@/lib/content/loader";

/**
 * Draft content must never reach production (spec §56).
 *
 * Vitest runs with NODE_ENV=test, so `draftsVisible()` is false here — the same
 * condition a production build sees.
 */
describe("draft protection", () => {
  it("drafts are hidden outside development", () => {
    expect(draftsVisible()).toBe(false);
  });

  const loaders = {
    research: getResearch,
    projects: getProjects,
    writing: getWriting,
    log: getLog,
  };

  for (const [collection, load] of Object.entries(loaders)) {
    it(`no draft or non-public ${collection} entry is exposed`, () => {
      for (const entry of load()) {
        expect(entry.frontmatter.draft).toBe(false);
        expect(entry.frontmatter.visibility).toBe("public");
      }
    });
  }

  it("at least one draft exists on disk, so this test is meaningful", () => {
    const drafts: string[] = [];

    for (const collection of Object.keys(loaders)) {
      const dir = path.join(process.cwd(), "content", collection);
      if (!fs.existsSync(dir)) continue;

      for (const filename of fs.readdirSync(dir)) {
        if (!filename.endsWith(".mdx") && !filename.endsWith(".md")) continue;
        const { data } = matter(
          fs.readFileSync(path.join(dir, filename), "utf8"),
        );
        if (data.draft === true) drafts.push(`${collection}/${filename}`);
      }
    }

    expect(drafts.length).toBeGreaterThan(0);
  });

  it("a known draft is absent from the published set", () => {
    const slugs = getWriting().map((entry) => entry.frontmatter.slug);
    expect(slugs).not.toContain("kalman-filter-state-estimation");
  });
});
