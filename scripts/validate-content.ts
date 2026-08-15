/**
 * Content validation gate (spec §73, §74).
 *
 * Runs in CI before the build. Malformed frontmatter, mismatched slugs, broken
 * internal links, or a draft that has slipped into a production build all fail
 * here rather than reaching a reader.
 *
 *   npm run content:validate
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

import {
  ExperimentLogSchema,
  PublicationSchema,
  contentSchemas,
  type ContentCollection,
} from "../src/lib/content/schemas";
import { z } from "zod";

const ROOT = process.cwd();
const CONTENT = path.join(ROOT, "content");

const errors: string[] = [];
const warnings: string[] = [];

function fail(file: string, message: string) {
  errors.push(`${file}: ${message}`);
}

function warn(file: string, message: string) {
  warnings.push(`${file}: ${message}`);
}

/** Routes the app serves that are not generated from content. */
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

type Loaded = {
  collection: ContentCollection;
  file: string;
  slug: string;
  draft: boolean;
  visibility: string;
  body: string;
};

const loaded: Loaded[] = [];

/* ---------------------------------------------------------- frontmatter -- */

for (const collection of Object.keys(contentSchemas) as ContentCollection[]) {
  const dir = path.join(CONTENT, collection);
  if (!fs.existsSync(dir)) {
    warn(`content/${collection}`, "directory does not exist");
    continue;
  }

  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  for (const filename of files) {
    const rel = path.join("content", collection, filename);
    const raw = fs.readFileSync(path.join(dir, filename), "utf8");
    const { data, content } = matter(raw);

    // `_`-prefixed files are templates: still schema-checked (so a template
    // never rots), but exempt from the slug/filename rule.
    const isTemplate = filename.startsWith("_");

    const parsed = contentSchemas[collection].safeParse(data);
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        fail(rel, `${issue.path.join(".") || "(root)"} — ${issue.message}`);
      }
      continue;
    }

    const fm = parsed.data as { slug: string; draft: boolean; visibility: string };
    const fileSlug = filename.replace(/\.mdx?$/, "");

    if (!isTemplate && fm.slug !== fileSlug) {
      fail(rel, `slug "${fm.slug}" does not match filename "${fileSlug}"`);
    }

    if (isTemplate && !fm.draft) {
      fail(rel, "template files must be draft: true");
    }

    if (!isTemplate) {
      loaded.push({
        collection,
        file: rel,
        slug: fm.slug,
        draft: fm.draft,
        visibility: fm.visibility,
        body: content,
      });
    }
  }
}

/* ------------------------------------------------------ duplicate slugs -- */

const bySlug = new Map<string, string[]>();
for (const entry of loaded) {
  const key = `${entry.collection}/${entry.slug}`;
  bySlug.set(key, [...(bySlug.get(key) ?? []), entry.file]);
}
for (const [key, files] of bySlug) {
  if (files.length > 1) {
    fail(files.join(", "), `duplicate slug "${key}"`);
  }
}

/* ------------------------------------------------------- publications ---- */

const publicationsFile = path.join(CONTENT, "publications", "publications.json");
if (fs.existsSync(publicationsFile)) {
  const rel = path.relative(ROOT, publicationsFile);
  try {
    const parsed = z
      .array(PublicationSchema)
      .safeParse(JSON.parse(fs.readFileSync(publicationsFile, "utf8")));
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        fail(rel, `${issue.path.join(".") || "(root)"} — ${issue.message}`);
      }
    }
  } catch (error) {
    fail(rel, `invalid JSON — ${(error as Error).message}`);
  }
} else {
  warn("content/publications/publications.json", "missing");
}

/* -------------------------------------------------------- experiments ---- */

const researchDir = path.join(CONTENT, "research");
if (fs.existsSync(researchDir)) {
  for (const filename of fs.readdirSync(researchDir)) {
    if (!filename.endsWith(".experiments.json")) continue;

    const rel = path.join("content", "research", filename);
    const researchSlug = filename.replace(/\.experiments\.json$/, "");

    if (!loaded.some((e) => e.collection === "research" && e.slug === researchSlug)) {
      fail(rel, `no research entry with slug "${researchSlug}"`);
    }

    const parsed = ExperimentLogSchema.safeParse(
      JSON.parse(fs.readFileSync(path.join(researchDir, filename), "utf8")),
    );
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        fail(rel, `${issue.path.join(".") || "(root)"} — ${issue.message}`);
      }
      continue;
    }

    const ids = parsed.data.experiments.map((e) => e.id);
    const duplicates = ids.filter((id, i) => ids.indexOf(id) !== i);
    if (duplicates.length > 0) {
      fail(rel, `duplicate experiment ids: ${[...new Set(duplicates)].join(", ")}`);
    }
  }
}

/* ----------------------------------------------------- internal links ---- */

const publicSlugs = new Set(
  loaded
    .filter((e) => !e.draft && e.visibility === "public")
    .map((e) => `/${e.collection === "log" ? "log" : e.collection}/${e.slug}`),
);

const LINK = /\]\((\/[^)\s]*)\)/g;

for (const entry of loaded) {
  for (const match of entry.body.matchAll(LINK)) {
    const href = match[1].split("#")[0].replace(/\/$/, "") || "/";

    if (STATIC_ROUTES.has(href)) continue;
    if (publicSlugs.has(href)) continue;
    // Assets shipped from public/.
    if (fs.existsSync(path.join(ROOT, "public", href))) continue;
    // Experiment sub-routes.
    if (/^\/research\/[^/]+\/experiments$/.test(href)) {
      const slug = href.split("/")[2];
      if (fs.existsSync(path.join(researchDir, `${slug}.experiments.json`))) {
        continue;
      }
    }

    const message = `internal link "${href}" does not resolve to a published page`;
    // A draft may legitimately reference work that is not published yet.
    if (entry.draft) warn(entry.file, message);
    else fail(entry.file, message);
  }
}

/* ---------------------------------------------- draft leakage in prod ---- */

if (process.env.NODE_ENV === "production" && process.env.SHOW_DRAFTS === "1") {
  errors.push(
    "SHOW_DRAFTS=1 must never be set for a production build (spec §56).",
  );
}

/* ------------------------------------------------------------ report ----- */

const published = loaded.filter((e) => !e.draft && e.visibility === "public");

console.log(
  `content: ${loaded.length} entries checked, ${published.length} published, ` +
    `${loaded.length - published.length} draft/private.`,
);

for (const warning of warnings) console.warn(`  warn  ${warning}`);

if (errors.length > 0) {
  console.error(`\n${errors.length} content error(s):`);
  for (const error of errors) console.error(`  error ${error}`);
  process.exit(1);
}

console.log("content: ok");
