import type { ProjectFrontmatter } from "@/lib/content/schemas";

type Academic = NonNullable<ProjectFrontmatter["academic"]>;

/**
 * Academic provenance for an assessed project.
 *
 * Every row is checkable against a transcript, which is the point: an
 * undergraduate project labelled as such, with its course code and grade
 * visible, is more credible than one presented without provenance.
 */
export function AcademicMeta({ academic }: { academic: Academic }) {
  const rows: { term: string; value: string }[] = [
    { term: "Type", value: academic.kind },
    { term: "Institution", value: academic.institution },
  ];

  if (academic.year) rows.push({ term: "Year", value: academic.year });
  if (academic.course) rows.push({ term: "Course", value: academic.course });
  if (academic.grade) rows.push({ term: "Grade", value: academic.grade });
  if (academic.supervisor) {
    rows.push({ term: "Supervisor", value: academic.supervisor });
  }
  if (academic.collaborators.length > 0) {
    rows.push({
      term: academic.collaborators.length > 1 ? "Collaborators" : "Collaborator",
      value: academic.collaborators.join(", "),
    });
  }

  return (
    <dl className="border-line grid gap-x-8 gap-y-3 border-y py-5 text-sm sm:grid-cols-[max-content_1fr]">
      {rows.map((row) => (
        <div key={row.term} className="contents">
          <dt className="text-ink-subtle">{row.term}</dt>
          <dd className="text-ink mb-2 sm:mb-0">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
