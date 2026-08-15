import { z } from "zod";

/**
 * Frontmatter schemas for every content type.
 *
 * Malformed content must fail the build (spec §73), so these schemas are used
 * both by the content loader and by `scripts/validate-content.ts` in CI.
 */

/** `2026` | `2026-08` | `2026-08-15` */
const partialDate = z
  .string()
  .regex(
    /^\d{4}(-\d{2}(-\d{2})?)?$/,
    "must be YYYY, YYYY-MM or YYYY-MM-DD",
  );

const slug = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "must be kebab-case");

const url = z.string().url();

/** Optional URL that also tolerates an empty string in frontmatter. */
const optionalUrl = z
  .union([url, z.literal("")])
  .optional()
  .transform((v) => (v ? v : undefined));

/** Publication / visibility state shared by all content types (spec §55). */
const visibility = z
  .enum(["public", "private", "archived"])
  .default("public");

const base = {
  title: z.string().min(1),
  slug,
  summary: z.string().min(1),
  draft: z.boolean().default(false),
  visibility,
};

/* -------------------------------------------------------------------------- */
/* Research                                                                    */
/* -------------------------------------------------------------------------- */

export const researchStatuses = [
  "exploring",
  "active",
  "completed",
  "paused",
] as const;

export const ResearchSchema = z.object({
  ...base,
  /** The explicit research question (spec §15). */
  question: z.string().min(1),
  status: z.enum(researchStatuses),
  researchAreas: z.array(z.string().min(1)).min(1),
  startDate: partialDate,
  endDate: partialDate.optional(),
  collaborators: z.array(z.string()).default([]),
  supervisor: z.string().optional(),
  /** One-line headline result. Omit entirely until a result actually exists. */
  result: z.string().optional(),
  image: z.string().optional(),
  imageAlt: z.string().optional(),
  github: optionalUrl,
  paper: optionalUrl,
  preprint: optionalUrl,
  demo: optionalUrl,
  dataset: optionalUrl,
  featured: z.boolean().default(false),
  order: z.number().int().optional(),
});

export type ResearchFrontmatter = z.infer<typeof ResearchSchema>;

/* -------------------------------------------------------------------------- */
/* Projects                                                                    */
/* -------------------------------------------------------------------------- */

export const projectTypes = [
  "research",
  "research-engineering",
  "reproduction-study",
  "academic-project",
  "robotics",
  "machine-learning",
  "computer-vision",
  "systems",
] as const;

/**
 * Academic provenance for coursework and final-year projects.
 *
 * Present only on entries that were assessed by an institution. Every field
 * here is a factual claim a reviewer could check against a transcript, so
 * populate it only from the official record.
 */
const AcademicContext = z.object({
  /** e.g. "Undergraduate Final-Year Project". */
  kind: z.string().min(1),
  institution: z.string().min(1),
  /** Course code and title, e.g. "SENG490 Research Project (6 credits)". */
  course: z.string().optional(),
  year: z.string().optional(),
  /** e.g. "72/100". Only from the official record. */
  grade: z.string().optional(),
  supervisor: z.string().optional(),
  collaborators: z.array(z.string()).default([]),
});

export const ProjectSchema = z.object({
  ...base,
  type: z.enum(projectTypes),
  topics: z.array(z.string().min(1)).min(1),
  technologies: z.array(z.string()).default([]),
  status: z.enum(researchStatuses),
  /** Omit rather than guess — the UI drops the date line when it is absent. */
  startDate: partialDate.optional(),
  endDate: partialDate.optional(),
  github: optionalUrl,
  demo: optionalUrl,
  article: z.string().optional(),
  /** Second repository, for projects split across frontend and backend. */
  github2: optionalUrl,
  github2Label: z.string().optional(),
  academic: AcademicContext.optional(),
  featured: z.boolean().default(false),
  order: z.number().int().optional(),
});

export type ProjectFrontmatter = z.infer<typeof ProjectSchema>;

/* -------------------------------------------------------------------------- */
/* Writing                                                                     */
/* -------------------------------------------------------------------------- */

export const writingTypes = [
  "research-note",
  "technical-article",
  "literature-review",
  "experiment-report",
  "reproduction-study",
  "mathematical-note",
] as const;

export const WritingSchema = z.object({
  ...base,
  type: z.enum(writingTypes),
  publishedAt: partialDate,
  updatedAt: partialDate.optional(),
  topics: z.array(z.string().min(1)).min(1),
  /** Slugs of research entries this note supports. */
  relatedResearch: z.array(slug).default([]),
  featured: z.boolean().default(false),
});

export type WritingFrontmatter = z.infer<typeof WritingSchema>;

/* -------------------------------------------------------------------------- */
/* Research log                                                                */
/* -------------------------------------------------------------------------- */

export const LogSchema = z.object({
  ...base,
  publishedAt: partialDate,
  /** Human-readable period the entry covers, e.g. "10–16 August 2026". */
  period: z.string().optional(),
  topics: z.array(z.string()).default([]),
  relatedResearch: z.array(slug).default([]),
});

export type LogFrontmatter = z.infer<typeof LogSchema>;

/* -------------------------------------------------------------------------- */
/* Experiments (spec §16)                                                      */
/* -------------------------------------------------------------------------- */

export const ExperimentSchema = z.object({
  /** Stable identifier, e.g. "EXP-021". */
  id: z.string().regex(/^EXP-\d{3,}$/, 'must look like "EXP-001"'),
  date: partialDate,
  hypothesis: z.string().min(1),
  configuration: z.record(z.string(), z.string()).default({}),
  baseline: z.string().optional(),
  metrics: z.record(z.string(), z.union([z.string(), z.number()])).default({}),
  result: z.string().min(1),
  observations: z.string().optional(),
  /** Anything that makes the run reproducible: commit, seed, config path. */
  reproduce: z.string().optional(),
});

export type Experiment = z.infer<typeof ExperimentSchema>;

export const ExperimentLogSchema = z.object({
  research: slug,
  experiments: z.array(ExperimentSchema),
});

export type ExperimentLog = z.infer<typeof ExperimentLogSchema>;

/* -------------------------------------------------------------------------- */
/* Publications                                                                */
/* -------------------------------------------------------------------------- */

export const publicationStatuses = [
  "manuscript",
  "preprint",
  "submitted",
  "accepted",
  "published",
] as const;

export const PublicationSchema = z.object({
  title: z.string().min(1),
  slug,
  authors: z.array(z.string().min(1)).min(1),
  year: z.number().int().min(2000).max(2100),
  status: z.enum(publicationStatuses),
  venue: z.string().optional(),
  abstract: z.string().optional(),
  paperUrl: optionalUrl,
  preprintUrl: optionalUrl,
  codeUrl: optionalUrl,
  projectUrl: z.string().optional(),
  doi: z.string().optional(),
  arxivId: z.string().optional(),
  bibtex: z.string().optional(),
  draft: z.boolean().default(false),
  visibility,
});

export type Publication = z.infer<typeof PublicationSchema>;

/* -------------------------------------------------------------------------- */

export const contentSchemas = {
  research: ResearchSchema,
  projects: ProjectSchema,
  writing: WritingSchema,
  log: LogSchema,
} as const;

export type ContentCollection = keyof typeof contentSchemas;
