import "server-only";

import fs from "node:fs";
import path from "node:path";

import { site } from "./site";

/**
 * Whether the CV PDF has actually been built into `public/`.
 *
 * The download button is rendered only when the file exists, so the site never
 * offers a download that 404s. Run `npm run cv:build` (see `cv/README.md`) to
 * produce it.
 */
export function cvAvailable(): boolean {
  return fs.existsSync(path.join(process.cwd(), "public", site.cv.path));
}
