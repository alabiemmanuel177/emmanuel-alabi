import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const APP = path.join(process.cwd(), "src", "app");

/** Every route the URL structure in the spec (§27) promises. */
const ROUTES = [
  "page.tsx",
  "research/page.tsx",
  "research/[slug]/page.tsx",
  "research/[slug]/experiments/page.tsx",
  "publications/page.tsx",
  "projects/page.tsx",
  "projects/[slug]/page.tsx",
  "writing/page.tsx",
  "writing/[slug]/page.tsx",
  "log/page.tsx",
  "log/[slug]/page.tsx",
  "about/page.tsx",
  "cv/page.tsx",
  "contact/page.tsx",
  "not-found.tsx",
  "sitemap.ts",
  "robots.ts",
  "opengraph-image.tsx",
];

describe("routes", () => {
  for (const route of ROUTES) {
    it(`app/${route} exists`, () => {
      expect(fs.existsSync(path.join(APP, route))).toBe(true);
    });
  }
});

describe("page metadata", () => {
  /** Detail routes generate metadata dynamically; index routes export it. */
  const needsMetadata = ROUTES.filter(
    (r) =>
      r.endsWith("page.tsx") && !r.includes("[slug]") && r !== "opengraph-image.tsx",
  );

  for (const route of needsMetadata) {
    it(`app/${route} defines metadata`, () => {
      const source = fs.readFileSync(path.join(APP, route), "utf8");
      const hasMetadata =
        source.includes("export const metadata") ||
        source.includes("export async function generateMetadata");
      expect(hasMetadata).toBe(true);
    });
  }

  for (const route of ROUTES.filter((r) => r.includes("[slug]"))) {
    it(`app/${route} generates metadata and static params`, () => {
      const source = fs.readFileSync(path.join(APP, route), "utf8");
      expect(source).toContain("generateMetadata");
      expect(source).toContain("generateStaticParams");
    });
  }
});
