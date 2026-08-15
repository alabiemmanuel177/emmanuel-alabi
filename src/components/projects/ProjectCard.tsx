import Link from "next/link";

import { Badge } from "@/components/ui/Badge";
import { EvidenceLinks } from "@/components/ui/EvidenceLinks";
import { formatDateRange, label } from "@/lib/format";
import type { ProjectFrontmatter } from "@/lib/content/schemas";

export function ProjectCard({ item }: { item: ProjectFrontmatter }) {
  const href = `/projects/${item.slug}`;

  return (
    <article className="border-line flex flex-col rounded-lg border p-6">
      <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2">
        <Badge>{label(item.type)}</Badge>
        {item.startDate ? (
          <span className="text-ink-subtle text-xs">
            {formatDateRange(item.startDate, item.endDate)}
          </span>
        ) : null}
      </div>

      <h3 className="text-ink text-lg font-semibold tracking-tight">
        <Link href={href} className="hover:text-accent transition-colors">
          {item.title}
        </Link>
      </h3>

      <p className="text-ink-muted mt-2.5 grow text-[0.9375rem] leading-relaxed">
        {item.summary}
      </p>

      {item.technologies.length > 0 ? (
        <p className="text-ink-subtle mt-4 font-mono text-xs">
          {item.technologies.join(" · ")}
        </p>
      ) : null}

      <EvidenceLinks
        className="mt-5"
        links={[
          { label: "Details", href },
          { label: "Code", href: item.github },
          { label: "Demo", href: item.demo },
          {
            label: "Write-up",
            href: item.article ? `/writing/${item.article}` : undefined,
          },
        ]}
      />
    </article>
  );
}
