const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/** "2026" → "2026"; "2026-08" → "August 2026"; "2026-08-15" → "15 August 2026". */
export function formatDate(partial: string): string {
  const [year, month, day] = partial.split("-");
  if (!month) return year;
  const monthName = MONTHS[Number(month) - 1] ?? month;
  if (!day) return `${monthName} ${year}`;
  return `${Number(day)} ${monthName} ${year}`;
}

/** "August 2026–present" / "August 2026–December 2026". Empty when undated. */
export function formatDateRange(start?: string, end?: string): string {
  if (!start) return end ? formatDate(end) : "";
  if (end === start) return formatDate(start);
  return `${formatDate(start)}–${end ? formatDate(end) : "present"}`;
}

const TITLE_CASE: Record<string, string> = {
  "research-engineering": "Research Engineering",
  "academic-project": "Academic Project",
  "machine-learning": "Machine Learning",
  "computer-vision": "Computer Vision",
  research: "Research",
  robotics: "Robotics",
  systems: "Systems",
  "research-note": "Research Note",
  "technical-article": "Technical Article",
  "literature-review": "Literature Review",
  "experiment-report": "Experiment Report",
  "reproduction-study": "Reproduction Study",
  "mathematical-note": "Mathematical Note",
};

/** Human label for a kebab-case enum value. */
export function label(value: string): string {
  return (
    TITLE_CASE[value] ??
    value
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ")
  );
}
