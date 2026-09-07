/**
 * Selected engineering background.
 *
 * Deliberately short and subordinate to the research sections. Each entry is
 * framed as problem → contribution → technical depth → outcome, not as a
 * product pitch, and commercial metrics are omitted unless academically
 * relevant.
 *
 * Dates verified against the LinkedIn record, September 2026. The set is chosen
 * to leave no unexplained gap between graduation and the present: Union Bank
 * from July 2023, SPay from November 2023, Punch Group through 2025, Obelo from
 * October 2025. Concurrent founder roles (TechAdes, TechGate, Royal Gate,
 * Acadu) are deliberately omitted from the academic CV for length, not hidden —
 * they are on LinkedIn.
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
    name: "Obelo — AI Systems & Multimodal Content Infrastructure",
    context: "Obelo",
    role: "Founder & CEO",
    period: "Oct 2025 — present",
    problem:
      "Generating brand-consistent multimodal output reliably enough to run in production, where model behaviour varies between families, requests are long-running, and quality has to be measured rather than assumed.",
    contribution:
      "Designed and developed a production AI platform combining multimodal generation, retrieval-augmented context, asynchronous orchestration, model routing, and evaluation systems.",
    depth:
      "Multi-agent orchestration over a structured brand representation, with specialised planner, copywriter, image-composer, layout and publisher agents, and a brand-consistency grader checking every output before it ships.",
    technologies: [
      "Multimodal pipelines",
      "Multi-agent orchestration",
      "Model routing",
      "Retrieval-augmented generation",
      "Evaluation systems",
    ],
  },
  {
    name: "Punch Group — Production Web Systems",
    context: "Punch Group",
    role: "Software Engineer",
    period: "Jan 2025 — Jul 2025",
    problem:
      "Shipping and maintaining production applications across an agency's client portfolio, under real performance and integration constraints.",
    contribution:
      "Delivered three production products: GraphQL query optimisation and memory-leak resolution on a Next.js/Express application, a Nuxt.js lead-generation tool with HubSpot and Salesforce integrations, and a real-time support service with in-app video.",
    depth:
      "Diagnosing memory heap exhaustion in a running production application is the closest thing in commercial work to debugging an experiment that fails only at scale.",
    technologies: ["Next.js", "NestJS", "GraphQL", "Firebase", "Nuxt.js"],
  },
  {
    name: "SPay Business — Mobile & Financial Systems Engineering",
    context: "SPay",
    role: "Software Engineer",
    period: "Nov 2023 — Dec 2024",
    problem:
      "Operating and improving a production mobile financial application, where authentication correctness, performance, and safe release practice all carry real consequences.",
    contribution:
      "Worked on production mobile-financial systems, including authentication improvements, application performance, interface redesign, CI/CD automation, and over-the-air mobile deployments.",
    depth:
      "Production engineering maturity: release automation, over-the-air delivery, and performance work under real usage rather than in a demo environment.",
    technologies: ["React Native", "CI/CD", "OTA deployment", "Authentication"],
  },
  {
    name: "Union Bank of Nigeria — Enterprise Systems & Security",
    context: "Union Bank of Nigeria",
    role: "Software Engineer",
    period: "Jul 2023 — Nov 2023",
    problem:
      "Modernising internal enterprise workflows at a long-established bank, where security compliance is a hard constraint rather than a feature.",
    contribution:
      "Built and maintained enterprise applications in React and Java, designed and enforced website security protocols, and delivered merchant notification systems over REST APIs.",
    depth:
      "Working where correctness and security are audited rather than assumed — the closest commercial analogue to a protocol that has to survive review.",
    technologies: ["React", "Java", "REST APIs"],
  },
];
