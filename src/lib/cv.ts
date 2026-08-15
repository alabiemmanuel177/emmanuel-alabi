import { engineeringSystems } from "./engineering";

/**
 * Structured CV data, shared by /about and /cv.
 *
 * Nothing here is inferred or padded. Fields you have not verified stay empty —
 * every renderer omits empty sections rather than showing a placeholder, so an
 * incomplete CV reads as short rather than as false.
 *
 * Ordering follows the academic CV priority: research interests → education →
 * research & technical experience → selected projects → engineering experience
 * → open source → skills. There is deliberately no Publications section until a
 * publication exists.
 */

export type Education = {
  institution: string;
  qualification: string;
  period?: string;
  location?: string;
  /** Only courses actually taken, using the titles from the official record. */
  coursework?: string[];
  notes?: string;
  /**
   * Degree classification. Publish only if verified against the final official
   * transcript and you have decided it helps your case.
   */
  grade?: string;
};

export type ResearchExperience = {
  role: string;
  organisation: string;
  period: string;
  description: string;
  url?: string;
};

export type Experience = {
  role: string;
  organisation: string;
  period?: string;
  location?: string;
  /** Two or three lines. Technical contribution, not sales metrics. */
  highlights: string[];
  technologies?: string[];
  url?: string;
};

export type SkillGroup = {
  group: string;
  items: string[];
};

/**
 * Verified against the official Babcock University transcript record
 * (BSc (Hons) Software Engineering; admitted 2019, degree awarded 22 June 2023).
 *
 * Coursework lists the modules with genuine academic bearing on this
 * application, using the titles exactly as they appear on the transcript.
 *
 * Classification is deliberately not published here. The transcript shows a
 * final C-GPA of 4.00/5.00 — Second Class Upper under Babcock's scale. Set
 * `grade` if you decide it helps a particular application; the CV page and PDF
 * both render it when present.
 */
export const education: Education[] = [
  {
    institution: "Babcock University",
    qualification: "BSc (Hons) Software Engineering",
    location: "Ilishan-Remo, Ogun State, Nigeria",
    period: "2019 — 2023",
    coursework: [
      "Algorithms and Data Structures",
      "Discrete Mathematics",
      "Introductory Statistics",
      "Introduction to Operations Research",
      "Artificial Intelligence and Applications",
      "Introduction to Big Data Engineering",
      "Computer Organization and Assembly Language",
      "Operating System I",
      "Database System Design, Implementation and Management",
    ],
  },
];

/**
 * Formal research positions only — not self-directed study.
 *
 * TODO(emmanuel): the final-year Research Project (SENG490) is a legitimate
 * academic research entry. Add it once you can state its question, method, and
 * outcome accurately.
 */
export const researchExperience: ResearchExperience[] = [];

/** Engineering roles, derived from the single source in `engineering.ts`. */
export const experience: Experience[] = engineeringSystems.map((system) => ({
  role: system.role,
  organisation: system.name.split(" — ")[0],
  period: system.period,
  highlights: [system.contribution, system.depth],
  technologies: system.technologies,
  url: system.url,
}));

export const openSource: Experience[] = [];

/**
 * TODO(emmanuel): keep this to tools you would be comfortable being examined
 * on in an interview.
 */
export const skills: SkillGroup[] = [];
