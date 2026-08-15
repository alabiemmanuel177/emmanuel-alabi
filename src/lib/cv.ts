/**
 * Structured CV data, shared by /about and /cv.
 *
 * Nothing here is inferred or padded. Fields you have not verified should stay
 * empty — every renderer below omits empty sections rather than showing a
 * placeholder, so an incomplete CV reads as short rather than as false.
 *
 * Ordering follows the academic CV priority in spec §25:
 * research interests → education → research experience → publications →
 * selected projects → engineering experience → open source → skills.
 */

export type Education = {
  institution: string;
  qualification: string;
  /** e.g. "2021 — 2025". Omit if you would otherwise be guessing. */
  period?: string;
  location?: string;
  /** Only list courses you actually took. */
  coursework?: string[];
  notes?: string;
  /**
   * Do not publish a GPA unless it is verified against the final official
   * transcript and it is strategically useful to show (spec §24).
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
  period: string;
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
 * TODO(emmanuel): confirm the exact period and, if you want it shown, the
 * degree classification from the final official transcript. Add the coursework
 * you actually took. Never upload the transcript itself to this repository.
 */
export const education: Education[] = [
  {
    institution: "Babcock University",
    qualification: "BSc (Hons) Software Engineering",
    coursework: [],
  },
];

/** Formal research positions only — not self-directed study. */
export const researchExperience: ResearchExperience[] = [];

/**
 * TODO(emmanuel): add the engineering roles that support the research
 * trajectory — AI systems, multimodal systems, distributed systems, computer
 * vision, production ML infrastructure. Three or four is plenty.
 */
export const experience: Experience[] = [];

export const openSource: Experience[] = [];

/**
 * TODO(emmanuel): keep this to tools you would be comfortable being examined
 * on in an interview.
 */
export const skills: SkillGroup[] = [];
