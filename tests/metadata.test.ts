import { describe, expect, it } from "vitest";

import { isoDate, pageMetadata } from "@/lib/metadata";
import { personJsonLd } from "@/lib/metadata/structured-data";
import { formatDate, formatDateRange, label } from "@/lib/format";
import { buildToc } from "@/lib/content/toc";
import { site } from "@/lib/site";

describe("pageMetadata", () => {
  const meta = pageMetadata({
    title: "Semantic Robot Navigation",
    description: "A description.",
    path: "/research/semantic-robot-navigation",
  });

  it("sets a canonical URL", () => {
    expect(meta.alternates?.canonical).toBe(
      `${site.url}/research/semantic-robot-navigation`,
    );
  });

  it("titles OpenGraph as 'Page | Name'", () => {
    expect(meta.openGraph?.title).toBe(
      "Semantic Robot Navigation | Emmanuel Alabi",
    );
  });

  it("includes a social card image", () => {
    expect(meta.twitter?.images).toBeDefined();
  });
});

describe("structured data", () => {
  const person = personJsonLd();

  it("declares a Person", () => {
    expect(person["@type"]).toBe("Person");
    expect(person.name).toBe(site.name);
  });

  it("claims no affiliation", () => {
    expect(person).not.toHaveProperty("affiliation");
    expect(person).not.toHaveProperty("worksFor");
  });

  it("lists only configured profile links", () => {
    const sameAs = person.sameAs as string[];
    expect(sameAs.every((url) => url.length > 0)).toBe(true);
  });
});

describe("date formatting", () => {
  it("formats partial dates", () => {
    expect(formatDate("2026")).toBe("2026");
    expect(formatDate("2026-08")).toBe("August 2026");
    expect(formatDate("2026-08-15")).toBe("15 August 2026");
  });

  it("formats an open-ended range as 'present'", () => {
    expect(formatDateRange("2026-08")).toBe("August 2026–present");
  });

  it("normalises partial dates to ISO-8601", () => {
    expect(isoDate("2026")).toBe("2026-01-01");
    expect(isoDate("2026-08")).toBe("2026-08-01");
    expect(isoDate("2026-08-15")).toBe("2026-08-15");
  });

  it("labels kebab-case enums", () => {
    expect(label("research-engineering")).toBe("Research Engineering");
    expect(label("mathematical-note")).toBe("Mathematical Note");
  });
});

describe("table of contents", () => {
  const toc = buildToc(
    [
      "# Title",
      "## Abstract",
      "Some text.",
      "```python",
      "## not a heading",
      "```",
      "### Sub Section",
      "## Results & Analysis",
    ].join("\n"),
  );

  it("collects h2 and h3 only", () => {
    expect(toc.map((t) => t.depth)).toEqual([2, 3, 2]);
  });

  it("ignores headings inside code fences", () => {
    expect(toc.map((t) => t.text)).toEqual([
      "Abstract",
      "Sub Section",
      "Results & Analysis",
    ]);
  });

  it("generates GitHub-compatible ids", () => {
    expect(toc[2].id).toBe("results--analysis");
  });
});
