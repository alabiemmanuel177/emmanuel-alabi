import "server-only";

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { ZodType } from "zod";

import {
  contentSchemas,
  type ContentCollection,
  type LogFrontmatter,
  type ProjectFrontmatter,
  type ResearchFrontmatter,
  type WritingFrontmatter,
} from "./schemas";

export const CONTENT_ROOT = path.join(process.cwd(), "content");

export type Entry<T> = {
  collection: ContentCollection;
  /** Path relative to the repo root, used in validation error messages. */
  file: string;
  frontmatter: T;
  /** Raw MDX body, frontmatter stripped. */
  body: string;
  readingMinutes: number;
};

export class ContentValidationError extends Error {
  constructor(file: string, issues: string) {
    super(`Invalid frontmatter in ${file}:\n${issues}`);
    this.name = "ContentValidationError";
  }
}

function collectionDir(collection: ContentCollection) {
  return path.join(CONTENT_ROOT, collection);
}

function listFiles(collection: ContentCollection): string[] {
  const dir = collectionDir(collection);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    // `_`-prefixed files are templates and partials, never content.
    .filter((f) => !f.startsWith("_"))
    .map((f) => path.join(dir, f))
    .sort();
}

function parseFile<T>(
  collection: ContentCollection,
  filePath: string,
  schema: ZodType<T>,
): Entry<T> {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const relative = path.relative(process.cwd(), filePath);

  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((i) => `  · ${i.path.join(".") || "(root)"}: ${i.message}`)
      .join("\n");
    throw new ContentValidationError(relative, issues);
  }

  const fileSlug = path.basename(filePath).replace(/\.mdx?$/, "");
  const declaredSlug = (parsed.data as { slug: string }).slug;
  if (declaredSlug !== fileSlug) {
    throw new ContentValidationError(
      relative,
      `  · slug: "${declaredSlug}" does not match the filename "${fileSlug}"`,
    );
  }

  return {
    collection,
    file: relative,
    frontmatter: parsed.data,
    body: content,
    readingMinutes: Math.max(1, Math.round(readingTime(content).minutes)),
  };
}

/**
 * Draft protection (spec §56).
 *
 * Outside development, anything marked `draft: true` or given a non-public
 * visibility is removed before it can reach a page, a sitemap, or an RSS feed.
 * Set `SHOW_DRAFTS=1` to preview drafts in a build (never in production).
 */
export function draftsVisible(): boolean {
  if (process.env.SHOW_DRAFTS === "1") return true;
  return process.env.NODE_ENV === "development";
}

type Visible = { draft: boolean; visibility: "public" | "private" | "archived" };

export function isPublic(frontmatter: Visible): boolean {
  return !frontmatter.draft && frontmatter.visibility === "public";
}

function applyVisibility<T extends Visible>(entries: Entry<T>[]): Entry<T>[] {
  if (draftsVisible()) return entries;
  return entries.filter((e) => isPublic(e.frontmatter));
}

/** Load every entry in a collection, including drafts. Prefer the typed helpers. */
export function loadAll<T>(collection: ContentCollection): Entry<T>[] {
  const schema = contentSchemas[collection] as unknown as ZodType<T>;
  return listFiles(collection).map((f) => parseFile(collection, f, schema));
}

function loadVisible<T extends Visible>(
  collection: ContentCollection,
): Entry<T>[] {
  return applyVisibility(loadAll<T>(collection));
}

/* -------------------------------------------------------------------------- */
/* Typed accessors                                                             */
/* -------------------------------------------------------------------------- */

const statusOrder: Record<string, number> = {
  active: 0,
  exploring: 1,
  paused: 2,
  completed: 3,
};

function byDateDesc(a: string, b: string) {
  return b.localeCompare(a);
}

export function getResearch(): Entry<ResearchFrontmatter>[] {
  return loadVisible<ResearchFrontmatter>("research").sort((a, b) => {
    const explicit =
      (a.frontmatter.order ?? Number.MAX_SAFE_INTEGER) -
      (b.frontmatter.order ?? Number.MAX_SAFE_INTEGER);
    if (explicit !== 0) return explicit;
    const status =
      statusOrder[a.frontmatter.status] - statusOrder[b.frontmatter.status];
    if (status !== 0) return status;
    return byDateDesc(a.frontmatter.startDate, b.frontmatter.startDate);
  });
}

export function getProjects(): Entry<ProjectFrontmatter>[] {
  return loadVisible<ProjectFrontmatter>("projects").sort((a, b) => {
    const explicit =
      (a.frontmatter.order ?? Number.MAX_SAFE_INTEGER) -
      (b.frontmatter.order ?? Number.MAX_SAFE_INTEGER);
    if (explicit !== 0) return explicit;
    return byDateDesc(
      a.frontmatter.startDate ?? "",
      b.frontmatter.startDate ?? "",
    );
  });
}

export function getWriting(): Entry<WritingFrontmatter>[] {
  return loadVisible<WritingFrontmatter>("writing").sort((a, b) =>
    byDateDesc(a.frontmatter.publishedAt, b.frontmatter.publishedAt),
  );
}

export function getLog(): Entry<LogFrontmatter>[] {
  return loadVisible<LogFrontmatter>("log").sort((a, b) =>
    byDateDesc(a.frontmatter.publishedAt, b.frontmatter.publishedAt),
  );
}

function findBySlug<T extends { slug: string }>(
  entries: Entry<T>[],
  slug: string,
): Entry<T> | undefined {
  return entries.find((e) => e.frontmatter.slug === slug);
}

export const getResearchBySlug = (slug: string) =>
  findBySlug(getResearch(), slug);
export const getProjectBySlug = (slug: string) =>
  findBySlug(getProjects(), slug);
export const getWritingBySlug = (slug: string) => findBySlug(getWriting(), slug);
export const getLogBySlug = (slug: string) => findBySlug(getLog(), slug);

export const featured = <T extends { featured: boolean }>(
  entries: Entry<T>[],
) => entries.filter((e) => e.frontmatter.featured);
