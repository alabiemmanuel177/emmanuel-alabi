/**
 * `/now` — a short, structured statement of what is currently being worked on.
 *
 * Update roughly monthly. It creates a chronological public record without
 * turning the research log into "Day 7 of learning AI" updates: the log is for
 * technical progression, this is for orientation.
 *
 * Keep every line concrete. If a section has nothing real in it, empty it —
 * the page omits empty sections.
 */

export type NowSnapshot = {
  /** e.g. "August–September 2026". Shown as the period this describes. */
  period: string;
  /** ISO date this was last edited, for the "last updated" line. */
  updated: string;
  studying: string[];
  building: string[];
  /** Work finished recently enough to be worth surfacing. Keep it short. */
  recentlyCompleted?: string[];
  /** One or two sentences on the current state of research work. */
  research: string;
  /** The concrete next step, not an aspiration. */
  next: string;
};

export const now: NowSnapshot = {
  period: "August–September 2026",
  updated: "2026-08-15",

  studying: [
    "Linear algebra",
    "Probability",
    "Optimization",
    "Robotics foundations",
  ],

  building: ["Mathematics for Intelligent Systems", "ROS 2 Robotics Foundations"],

  recentlyCompleted: [
    "Driver Drowsiness Detection — Reproduction & Evaluation Study: a reproducible computer-vision study of eye-state classification and temporal alerting for prolonged eye closure.",
  ],

  research:
    "Currently conducting literature exploration around embodied AI and autonomous robot navigation.",

  next: "Select an initial research problem and begin baseline reproduction.",
};
