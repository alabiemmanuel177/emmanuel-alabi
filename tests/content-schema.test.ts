import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { describe, expect, it } from "vitest";

import {
  contentSchemas,
  type ContentCollection,
} from "@/lib/content/schemas";

const CONTENT = path.join(process.cwd(), "content");
const collections = Object.keys(contentSchemas) as ContentCollection[];

function filesIn(collection: ContentCollection) {
  const dir = path.join(CONTENT, collection);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
}

describe("content frontmatter", () => {
  for (const collection of collections) {
    const files = filesIn(collection);

    describe(collection, () => {
      it("has a content directory", () => {
        expect(fs.existsSync(path.join(CONTENT, collection))).toBe(true);
      });

      for (const filename of files) {
        const rel = `content/${collection}/${filename}`;
        const raw = fs.readFileSync(
          path.join(CONTENT, collection, filename),
          "utf8",
        );
        const { data } = matter(raw);

        it(`${rel} validates against the schema`, () => {
          const parsed = contentSchemas[collection].safeParse(data);
          if (!parsed.success) {
            throw new Error(
              parsed.error.issues
                .map((i) => `${i.path.join(".")}: ${i.message}`)
                .join("\n"),
            );
          }
          expect(parsed.success).toBe(true);
        });

        if (filename.startsWith("_")) {
          it(`${rel} is a template and must be a draft`, () => {
            expect(data.draft).toBe(true);
          });
        } else {
          it(`${rel} has a slug matching its filename`, () => {
            expect(data.slug).toBe(filename.replace(/\.mdx?$/, ""));
          });
        }
      }
    });
  }
});

describe("publications", () => {
  it("publications.json exists and is a JSON array", () => {
    const file = path.join(CONTENT, "publications", "publications.json");
    expect(fs.existsSync(file)).toBe(true);
    expect(Array.isArray(JSON.parse(fs.readFileSync(file, "utf8")))).toBe(true);
  });
});
