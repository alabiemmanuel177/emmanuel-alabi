import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";
import { ArticleCard } from "@/components/writing/ArticleCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { getLog } from "@/lib/content/loader";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Research log",
  description:
    "A running record of what was studied, tested, and learned — including the experiments that did not work.",
  path: "/log",
});

export default function LogIndexPage() {
  const entries = getLog();

  return (
    <Container>
      <PageHeader
        title="Research log"
        lead="Less polished than the writing section, and deliberately so. Each entry records what was studied, what was tested, what happened, what failed, and what remains open."
      />

      <div className="py-14">
        {entries.length > 0 ? (
          <div>
            {entries.map((entry) => (
              <ArticleCard
                key={entry.frontmatter.slug}
                item={entry.frontmatter}
                basePath="/log"
                readingMinutes={entry.readingMinutes}
              />
            ))}
          </div>
        ) : (
          <EmptyState>
            The log starts once there is technical progression worth recording.
            It is a record of experiments and failures, not a countdown of days
            spent studying.
          </EmptyState>
        )}
      </div>
    </Container>
  );
}
