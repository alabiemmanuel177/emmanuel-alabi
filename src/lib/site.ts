import { focusLine, researchProfile } from "./research-profile";

/**
 * Canonical site configuration.
 *
 * Everything identity-related lives here so that no page component hardcodes a
 * handle, URL, or descriptor. Research interests come from `research-profile.ts`
 * — this file does not restate them.
 */

export const site = {
  name: researchProfile.name,

  /**
   * Current public descriptor. Deliberately the weaker of the two: the
   * "researcher" label is earned by published output, not asserted ahead of it.
   * Swap to `titleAspirational` once the flagship research project is underway
   * and has a page with methods and results behind it.
   */
  title: "Software Engineer working toward AI & Robotics Research",
  titleAspirational: "Software Engineer & AI/Robotics Researcher",

  tagline:
    "I'm interested in intelligent systems that can perceive, reason, learn, and act in complex environments.",

  currentFocusStatement:
    "My current focus is building deeper foundations in machine learning, robotics, computer vision, autonomous systems, and embodied intelligence.",

  interestLine: focusLine,

  description:
    "Personal research site of Emmanuel Alabi — software engineer working toward research in embodied AI, robot learning, computer vision, autonomous systems, and multimodal intelligence.",

  /**
   * Set NEXT_PUBLIC_SITE_URL in the Vercel project once the domain is attached.
   * Falls back to the Vercel-generated URL, then to the intended custom domain.
   */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "https://emmanuelalabi.com"),

  locale: "en_GB",

  email: "alabiemmanuel177@gmail.com",

  /**
   * Profile links. A link is rendered only when its value is non-empty, so an
   * unknown handle degrades to "absent" rather than "broken". Add `orcid` /
   * `scholar` once formal publications exist — the footer, CV, contact page and
   * Person JSON-LD pick them up automatically.
   */
  links: {
    github: "https://github.com/alabiemmanuel177",
    linkedin: "https://www.linkedin.com/in/olasub/",
    scholar: "",
    orcid: "",
    arxiv: "",
  },

  cv: {
    path: "/cv/emmanuel-alabi-academic-cv.pdf",
    version: "Academic CV v0",
    updated: "August 2026",
  },

  /** Research interests, from the single machine-readable source. */
  researchInterests: researchProfile.currentFocus,
} as const;

export type ProfileLink = { label: string; href: string };

/** Profile links that are actually configured, in display order. */
export function profileLinks(): ProfileLink[] {
  const candidates: ProfileLink[] = [
    { label: "GitHub", href: site.links.github },
    { label: "LinkedIn", href: site.links.linkedin },
    { label: "Google Scholar", href: site.links.scholar },
    { label: "ORCID", href: site.links.orcid },
    { label: "arXiv", href: site.links.arxiv },
  ];
  return candidates.filter((l) => l.href.length > 0);
}

export const navigation = [
  { label: "Research", href: "/research" },
  { label: "Publications", href: "/publications" },
  { label: "Projects", href: "/projects" },
  { label: "Writing", href: "/writing" },
  { label: "Log", href: "/log" },
  { label: "About", href: "/about" },
  { label: "CV", href: "/cv" },
] as const;
