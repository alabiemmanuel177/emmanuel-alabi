import "server-only";

import fs from "node:fs";
import path from "node:path";
import { z } from "zod";

import { PublicationSchema, type Publication } from "./schemas";
import { CONTENT_ROOT, ContentValidationError, draftsVisible } from "./loader";

const PUBLICATIONS_FILE = path.join(
  CONTENT_ROOT,
  "publications",
  "publications.json",
);

const FileSchema = z.array(PublicationSchema);

/**
 * Publications are pure metadata, so they live in a single validated JSON file
 * rather than one MDX document each. The shape is the `Publication` type from
 * spec §17 and the file is version-controlled alongside the rest of the content.
 */
export function getPublications(): Publication[] {
  if (!fs.existsSync(PUBLICATIONS_FILE)) return [];

  const raw = JSON.parse(fs.readFileSync(PUBLICATIONS_FILE, "utf8"));
  const parsed = FileSchema.safeParse(raw);

  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((i) => `  · ${i.path.join(".") || "(root)"}: ${i.message}`)
      .join("\n");
    throw new ContentValidationError(
      path.relative(process.cwd(), PUBLICATIONS_FILE),
      issues,
    );
  }

  const visible = draftsVisible()
    ? parsed.data
    : parsed.data.filter((p) => !p.draft && p.visibility === "public");

  return visible.sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));
}

/**
 * Group publications by status so the UI can keep peer-reviewed work visually
 * distinct from manuscripts (spec §9: never represent a manuscript as
 * peer-reviewed).
 */
export const publicationGroupOrder = [
  { status: "published", label: "Published" },
  { status: "accepted", label: "Accepted" },
  { status: "submitted", label: "Under review" },
  { status: "preprint", label: "Preprints" },
  { status: "manuscript", label: "Manuscripts in preparation" },
] as const;

export function groupPublications(publications: Publication[]) {
  return publicationGroupOrder
    .map((group) => ({
      ...group,
      items: publications.filter((p) => p.status === group.status),
    }))
    .filter((group) => group.items.length > 0);
}
