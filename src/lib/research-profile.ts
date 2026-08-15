/**
 * Machine-readable research identity.
 *
 * Single source for what Emmanuel is working on. The homepage, /about,
 * /research, /cv, page metadata and the `Person` JSON-LD all read from here, so
 * interests can be re-scoped over the year by editing this file alone — no
 * hardcoded labels scattered across components.
 *
 * `currentFocus` is what is actively being pursued and is expected to narrow.
 * `broaderInterests` is the surrounding territory: relevant, not yet a focus.
 */

export type FocusArea = {
  title: string;
  description: string;
};

export const researchProfile = {
  name: "Emmanuel Alabi",

  currentFocus: [
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
  ] satisfies FocusArea[],

  broaderInterests: [
    "Machine Learning",
    "Robotics",
    "State Estimation",
    "Planning",
    "Reinforcement Learning",
  ],
} as const;

/** Just the focus-area names, for compact lines and structured data. */
export const focusLabels: readonly string[] =
  researchProfile.currentFocus.map((area) => area.title);

/** "Embodied AI · Robot Learning · Computer Vision · …" */
export const focusLine = focusLabels.join(" · ");
