import Link from "next/link";

import { ResearchStatus } from "./ResearchStatus";
import { EvidenceLinks } from "@/components/ui/EvidenceLinks";
import { formatDateRange } from "@/lib/format";
import type { ResearchFrontmatter } from "@/lib/content/schemas";

export function ResearchCard({ item }: { item: ResearchFrontmatter }) {
  const href = `/research/${item.slug}`;

  return (
    <article className="border-line border-t py-8 first:border-t-0 first:pt-0">
      <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2">
        <ResearchStatus status={item.status} />
        <span className="text-ink-subtle text-xs">
          {formatDateRange(item.startDate, item.endDate)}
        </span>
      </div>

      <h3 className="text-ink font-serif text-xl font-semibold tracking-tight">
        <Link href={href} className="hover:text-accent transition-colors">
          {item.title}
        </Link>
      </h3>

      <p className="text-ink mt-3 text-[0.9375rem] leading-relaxed">
        <span className="text-ink-subtle">Question. </span>
        {item.question}
      </p>

      <p className="text-ink-muted mt-3 text-[0.9375rem] leading-relaxed">
        {item.summary}
      </p>

      {item.result ? (
        <p className="border-accent text-ink mt-4 border-l-2 py-1 pl-4 text-[0.9375rem] leading-relaxed">
          {item.result}
        </p>
      ) : null}

      <ul className="text-ink-subtle mt-4 flex flex-wrap gap-x-2 gap-y-1 text-xs">
        {item.researchAreas.map((area) => (
          <li
            key={area}
            className="border-line rounded-full border px-2.5 py-0.5"
          >
            {area}
          </li>
        ))}
      </ul>

      <EvidenceLinks
        className="mt-5"
        links={[
          { label: "Research", href },
          { label: "Code", href: item.github },
          { label: "Paper", href: item.paper ?? item.preprint },
          { label: "Demo", href: item.demo },
          { label: "Dataset", href: item.dataset },
        ]}
      />
    </article>
  );
}
