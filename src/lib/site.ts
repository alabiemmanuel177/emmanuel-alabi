/**
 * Canonical site configuration.
 *
 * Everything identity-related lives here so that no page component hardcodes a
 * handle, URL, or descriptor. Update this file when a profile changes; the
 * header, footer, contact page, CV, sitemap and structured data all read from it.
 */

export const site = {
  name: "Emmanuel Alabi",

  /**
   * Primary descriptor. Spec §5 offers a weaker alternative for the earliest
   * stage — swap `title` for `titleAlternative` if the "researcher" label is
   * not yet supported by published output.
   */
  title: "Software Engineer & AI/Robotics Researcher",
  titleAlternative:
    "Software Engineer exploring AI, Robotics & Intelligent Autonomous Systems",

  tagline:
    "I study and build intelligent systems that perceive, reason, learn, and act within complex environments.",

  interestLine:
    "Embodied AI · Robot Learning · Computer Vision · Autonomous Systems · Multimodal Learning",

  description:
    "Personal research site of Emmanuel Alabi — software engineer working on embodied AI, robot learning, computer vision, autonomous systems, and multimodal intelligence.",

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
   * unknown handle degrades to "absent" rather than "broken".
   *
   * TODO(emmanuel): fill in `linkedin`. Add `orcid` / `scholar` once formal
   * publications exist (spec §54) — the footer and Person JSON-LD pick them up
   * automatically.
   */
  links: {
    github: "https://github.com/alabiemmanuel177",
    linkedin: "",
    scholar: "",
    orcid: "",
    arxiv: "",
  },

  cv: {
    path: "/cv/emmanuel-alabi-cv.pdf",
    version: "Academic CV v0",
    updated: "August 2026",
  },

  /**
   * Public research interests (spec §62). These are interests, not claims of
   * expertise. Edit freely — the homepage, /about and /research all read them.
   */
  researchInterests: [
    {
      title: "Embodied AI",
      description:
        "How intelligent agents can perceive, reason about, and interact with physical environments.",
    },
    {
      title: "Robot Learning",
      description:
        "Learning policies and representations for perception, navigation, manipulation, and control.",
    },
    {
      title: "Computer Vision",
      description:
        "Visual perception and representation for autonomous systems.",
    },
    {
      title: "Autonomous Systems",
      description:
        "Systems capable of sensing, planning, decision-making, and action.",
    },
    {
      title: "Multimodal Intelligence",
      description:
        "Combining vision, language, sensor observations, and action.",
    },
  ],
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
