/**
 * Selected engineering background (spec §12, §63).
 *
 * Deliberately short and subordinate to the research sections. Each entry is
 * framed as problem → contribution → technical depth → outcome, not as a
 * product pitch, and startup metrics are omitted unless academically relevant.
 *
 * TODO(emmanuel): add 3–4 systems. Nothing here is filled in automatically —
 * these must be written from work you can actually describe and, where the
 * repository is public, link to. The homepage and /about render whatever is in
 * this array and quietly skip the section when it is empty.
 */

export type EngineeringSystem = {
  name: string;
  /** Company, team, or "Independent". */
  context: string;
  period: string;
  /** What needed solving. */
  problem: string;
  /** What you specifically built. */
  contribution: string;
  /** The part that was technically hard, and why. */
  depth: string;
  /** What it does now — measured where possible. */
  outcome: string;
  technologies: string[];
  url?: string;
  github?: string;
};

export const engineeringSummary =
  "Before focusing more deeply on AI and robotics research, I worked across full-stack systems, AI infrastructure, distributed systems, developer tooling, and production software. That background is the reason I approach research as a systems problem as much as a modelling one.";

export const engineeringSystems: EngineeringSystem[] = [];
