import "server-only";

import fs from "node:fs";
import path from "node:path";

import { ExperimentLogSchema, type ExperimentLog } from "./schemas";
import { CONTENT_ROOT, ContentValidationError } from "./loader";

/**
 * Experiment logs (spec §16) live beside their research entry as structured
 * JSON — `content/research/<slug>.experiments.json` — so they can be generated
 * from the research repository rather than hand-written into a page.
 */
function experimentFile(researchSlug: string) {
  return path.join(CONTENT_ROOT, "research", `${researchSlug}.experiments.json`);
}

export function hasExperiments(researchSlug: string): boolean {
  return fs.existsSync(experimentFile(researchSlug));
}

export function getExperiments(researchSlug: string): ExperimentLog | null {
  const file = experimentFile(researchSlug);
  if (!fs.existsSync(file)) return null;

  const parsed = ExperimentLogSchema.safeParse(
    JSON.parse(fs.readFileSync(file, "utf8")),
  );

  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((i) => `  · ${i.path.join(".") || "(root)"}: ${i.message}`)
      .join("\n");
    throw new ContentValidationError(path.relative(process.cwd(), file), issues);
  }

  if (parsed.data.research !== researchSlug) {
    throw new ContentValidationError(
      path.relative(process.cwd(), file),
      `  · research: "${parsed.data.research}" does not match the filename slug "${researchSlug}"`,
    );
  }

  return {
    ...parsed.data,
    experiments: [...parsed.data.experiments].sort((a, b) =>
      b.id.localeCompare(a.id),
    ),
  };
}
