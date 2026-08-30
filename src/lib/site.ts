import { focusLine, researchProfile } from "./research-profile";

/**
 * Canonical site configuration.
 *
 * Everything identity-related lives here so that no page component hardcodes a
 * handle, URL, or descriptor. Research interests come from `research-profile.ts`
 * — this file does not restate them.
 */

export const site = {
  /** Public display name. This is the site brand; do not swap it for the formal name. */
  name: researchProfile.name,

  /**
   * Formal legal/academic name, as it appears on the Babcock transcript.
   *
   * Deliberately not rendered anywhere on the public site. It exists here so
   * that formal artefacts — university applications, transcript matching,
   * ORCID registration, and any future publication byline — draw the correct
   * name from one place instead of being retyped.
   */
  formalName: "Alabi Emmanuel Olasubomi",

  /**
   * Public descriptor.
   *
   * Promoted from `titlePrior` on 2026-08-30, once the condition set at launch
   * was actually met: a flagship research project with a public page carrying
   * its question, preregistered hypotheses, methods, results and limitations —
   * /research/risk-calibrated-semantic-navigation. The label is now supported
   * by output rather than asserted ahead of it.
   *
   * `titlePrior` is kept only as a record of what this said before.
   */
  title: "Software Engineer & AI/Robotics Researcher",
  titlePrior: "Software Engineer working toward AI & Robotics Research",

  tagline:
    "I'm interested in intelligent systems that can perceive, reason, learn, and act in complex environments.",

  currentFocusStatement:
    "My current focus is building deeper foundations in machine learning, robotics, computer vision, autonomous systems, and embodied intelligence.",

  interestLine: focusLine,

  description:
    "Personal research site of Emmanuel Alabi, a software engineer working toward research in embodied AI, robot learning, computer vision, autonomous systems, and multimodal intelligence.",

  /**
   * The canonical hostname is **www.emmanuelalabi.com**; the apex 308-redirects
   * to it. This is a permanent identity — it goes on the CV, GitHub profile,
   * ORCID, applications, and any future paper — so it must not drift.
   *
   * `NEXT_PUBLIC_SITE_URL` is set on the Vercel project and is what production
   * actually uses. The Vercel-generated URL is the preview-deployment fallback,
   * and the literal below is the local-development default. If the canonical
   * hostname ever changes, change it in all three places at once.
   */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "https://www.emmanuelalabi.com"),

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
