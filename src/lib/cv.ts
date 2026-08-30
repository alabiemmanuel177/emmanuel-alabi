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
    period: "2019–2023",
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
 * Formal research positions only — not self-directed study, and not assessed
 * coursework. Assessed academic work belongs in `academicProjects` below.
 */
export const researchExperience: ResearchExperience[] = [];

export type IndependentStudy = {
  title: string;
  context: string;
  period: string;
  highlights: string[];
  /** Site-relative path to the project page. */
  url?: string;
  github?: string;
};

/**
 * Independent research and reproduction studies — self-directed empirical work
 * with a stated question, a protocol, and reported results. Distinct from
 * `academicProjects` (assessed coursework) and from `researchExperience`
 * (formal positions). Nothing here is a publication.
 */
export const independentStudies: IndependentStudy[] = [
  {
    title: "Driver Drowsiness Detection: Reproduction & Evaluation Study",
    context: "Independent Computer Vision Study",
    period: "2026",
    highlights: [
      "Rebuilt and evaluated a classical eye-state and temporal-alerting pipeline under a subject-disjoint protocol on the MRL Eye Dataset (84,898 images, 37 subjects), training a lightweight CNN from scratch against a HOG+SVM baseline and measuring both frame-level and event-level behaviour.",
      "Designed an oracle-classifier decomposition showing that, once classification accuracy was sufficient, the historical temporal threshold rather than residual classification error remained the dominant source of false alerts under a simulated-sequence protocol.",
      "Produced a fully reproducible pipeline: deterministic splits, automated leakage checks, three-seed ablations, generated result artifacts, structured failure analysis, a documented limitations and safety boundary, and 145 automated tests.",
    ],
    url: "/projects/driver-drowsiness-reproduction",
    github: "https://github.com/alabiemmanuel177/driver-drowsiness-reproduction",
  },
];

export type AcademicProject = {
  title: string;
  context: string;
  period: string;
  highlights: string[];
  /** Site-relative path to the project page. */
  url?: string;
};

/**
 * Assessed academic work. Distinct from research: these were graded by an
 * institution, and they are presented as coursework rather than as research
 * output. Nothing here is a publication.
 */
export const academicProjects: AcademicProject[] = [
  {
    title:
      "BUCODEL: Learning Management System for Open & Distance e-Learning",
    context:
      "Undergraduate Final-Year Project (SENG490, 72/100), Babcock University",
    period: "2022–2023",
    highlights: [
      "Co-designed and implemented a web-based learning management system for Babcock University's Centre for Open and Distance e-Learning, supporting student, lecturer, and administrator workflows.",
      "Built course and resource management, assignments, authentication, user administration, collaborative course activity, and role-specific interfaces using React, Node.js/Express, and MongoDB.",
      "Conducted requirements analysis, system design, iterative implementation under a spiral methodology, and interface/usability, unit, and integration testing.",
    ],
    url: "/projects/bucodel-learning-management-system",
  },
];

/** Engineering roles, derived from the single source in `engineering.ts`. */
export const experience: Experience[] = engineeringSystems.map((system) => ({
  role: system.role,
  organisation: system.name.split(": ")[0],
  period: system.period,
  highlights: [system.contribution, system.depth],
  technologies: system.technologies,
  url: system.url,
}));

export const openSource: Experience[] = [];

/**
 * Technical skills.
 *
 * Conservative by design: everything here should survive an interview question.
 * Deliberately absent until there is real evidence — ROS 2, Gazebo, SLAM,
 * reinforcement learning, robot control, state estimation, motion planning. Those
 * are roadmap items, not skills, and they get added when a project demonstrates
 * them.
 *
 * Entries marked below with (no public artefact yet) are supported by private or
 * professional work but have nothing on this site a reviewer can click through
 * to. They are truthful, but they are the first things to cut if the list needs
 * to be defensible on published evidence alone.
 */
export const skills: SkillGroup[] = [
  {
    group: "Programming",
    // Java: Babcock coursework (Programming in JAVA, Hands-on JAVA training).
    // JavaScript/TypeScript: BUCODEL, this site. Python, SQL: no public artefact yet.
    items: ["Python", "TypeScript", "JavaScript", "Java", "SQL"],
  },
  {
    group: "AI/ML",
    // Computer vision is evidenced by the driver-drowsiness reproduction study
    // (public, reproducible, subject-disjoint evaluation). The rest is Obelo.
    // Still deliberately absent until a project demonstrates them: ROS 2,
    // Gazebo, SLAM, reinforcement learning, robot control, state estimation,
    // motion planning. Areas before libraries — keep this list short.
    items: [
      "Computer Vision",
      "Multimodal AI systems",
      "Retrieval-augmented generation",
      "LLM and model integration",
      "Evaluation and quality systems",
    ],
  },
  {
    group: "Systems and engineering",
    // React/Node/Express/MongoDB: BUCODEL. Next.js, CI/CD: this repository.
    // PostgreSQL, Redis, Docker: no public artefact yet.
    items: [
      "React",
      "Next.js",
      "Node.js",
      "Express",
      "MongoDB",
      "PyTorch",
      "PostgreSQL",
      "Redis",
      "Docker",
      "CI/CD",
    ],
  },
];
