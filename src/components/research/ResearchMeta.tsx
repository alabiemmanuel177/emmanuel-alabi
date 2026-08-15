import { formatDateRange } from "@/lib/format";
import type { ResearchFrontmatter } from "@/lib/content/schemas";

type Row = { term: string; value: string };

/**
 * The metadata block at the head of a research page (spec §15).
 * Only rows with real values are rendered — an absent supervisor or
 * collaborator list is simply omitted rather than shown as "N/A".
 */
export function ResearchMeta({ item }: { item: ResearchFrontmatter }) {
  const entries: Row[] = [
    { term: "Dates", value: formatDateRange(item.startDate, item.endDate) },
    { term: "Research areas", value: item.researchAreas.join(", ") },
  ];

  if (item.collaborators.length > 0) {
    entries.push({
      term: "Collaborators",
      value: item.collaborators.join(", "),
    });
  }
  if (item.supervisor) {
    entries.push({ term: "Supervisor", value: item.supervisor });
  }

  return (
    <dl className="border-line grid gap-x-8 gap-y-3 border-y py-5 text-sm sm:grid-cols-[max-content_1fr]">
      {entries.map((row) => (
        <div key={row.term} className="contents">
          <dt className="text-ink-subtle">{row.term}</dt>
          <dd className="text-ink mb-2 sm:mb-0">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
