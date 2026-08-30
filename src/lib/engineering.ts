/**
 * Selected engineering background.
 *
 * Deliberately short and subordinate to the research sections. Each entry is
 * framed as problem → contribution → technical depth → outcome, not as a
 * product pitch, and commercial metrics are omitted unless academically
 * relevant.
 *
 * TODO(emmanuel): two more entries to come — pick the ones with the most
 * technical substance (distributed systems, ML infrastructure, or computer
 * vision), not the ones with the best commercial story.
 */

export type EngineeringSystem = {
  name: string;
  /** Company, team, or "Independent". */
  context: string;
  role: string;
  /** Omit until the dates are verified — renderers drop it rather than guess. */
  period?: string;
  /** What needed solving. */
  problem: string;
  /** What you specifically built. */
  contribution: string;
  /** The part that was technically hard, and why. */
  depth: string;
  technologies: string[];
  url?: string;
  github?: string;
};

export const engineeringSummary =
  "Before focusing more deeply on AI and robotics research, I worked across full-stack systems, AI infrastructure, distributed systems, developer tooling, and production software. That background is the reason I approach research as a systems problem as much as a modelling one.";

export const engineeringSystems: EngineeringSystem[] = [
  {
    name: "Obelo: AI Systems & Multimodal Content Infrastructure",
    context: "Obelo",
    role: "Founder / Lead Engineer",
    problem:
      "Generating brand-consistent multimodal output reliably enough to run in production, where model behaviour varies between families, requests are long-running, and quality has to be measured rather than assumed.",
    contribution:
      "Designed and developed a production AI platform combining multimodal generation, retrieval-augmented context, asynchronous orchestration, model routing, and evaluation systems.",
    depth:
      "Experimentation across multiple image-generation and language-model families, structured creative pipelines, retrieval-augmented brand context, and reliability mechanisms for long-running AI workflows.",
    technologies: [
      "Multimodal pipelines",
      "Model routing",
      "Retrieval-augmented generation",
      "Async orchestration",
      "Evaluation systems",
    ],
  },
  {
    name: "SPay Business: Mobile & Financial Systems Engineering",
    context: "SPay",
    role: "Software Engineer",
    problem:
      "Operating and improving a production mobile financial application, where authentication correctness, performance, and safe release practice all carry real consequences.",
    contribution:
      "Worked on production mobile-financial systems, including authentication improvements, application performance, interface redesign, CI/CD automation, and over-the-air mobile deployments.",
    depth:
      "Production engineering maturity: release automation, over-the-air delivery, and performance work under real usage rather than in a demo environment.",
    technologies: ["Mobile", "CI/CD", "OTA deployment", "Authentication"],
  },
];
