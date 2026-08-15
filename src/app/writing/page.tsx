import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";
import { ArticleCard } from "@/components/writing/ArticleCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { getWriting } from "@/lib/content/loader";
import { label } from "@/lib/format";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Writing",
  description:
    "Research notes, derivations, reproduction studies, and technical articles on machine learning, robotics, and perception.",
  path: "/writing",
});

export default function WritingIndexPage() {
  const entries = getWriting();

  const types = Array.from(
    new Set(entries.map((entry) => entry.frontmatter.type)),
  );

  return (
    <Container>
      <PageHeader
        title="Writing"
        lead="Research notes, derivations, reproduction studies, and technical articles. Each one has to contain an implementation, an experiment, a derivation, or a reproduction — otherwise it does not get published."
      />

      {types.length > 1 ? (
        <p className="text-ink-subtle border-line border-b py-4 text-xs">
          {types.map(label).join(" · ")}
        </p>
      ) : null}

      <div className="py-14">
        {entries.length > 0 ? (
          <div>
            {entries.map((entry) => (
              <ArticleCard
                key={entry.frontmatter.slug}
                item={entry.frontmatter}
                basePath="/writing"
                readingMinutes={entry.readingMinutes}
              />
            ))}
          </div>
        ) : (
          <EmptyState>
            Nothing is published here yet. The publishing bar is deliberately
            high: a note appears once it contains original implementation,
            experiment, derivation, reproduction, or failure analysis — not
            before.
          </EmptyState>
        )}
      </div>
    </Container>
  );
}
