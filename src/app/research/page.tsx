import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";
import { ResearchCard } from "@/components/research/ResearchCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getResearch } from "@/lib/content/loader";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Research",
  description:
    "Research interests and investigations in embodied AI, robot learning, computer vision, autonomous systems, and multimodal intelligence.",
  path: "/research",
});

export default function ResearchIndexPage() {
  const research = getResearch();

  return (
    <Container>
      <PageHeader
        title="Research"
        lead="I study intelligent systems that perceive, reason, learn, and act in physical environments. This page describes what I am investigating and the state each investigation is actually in."
      />

      <section className="py-14">
        <SectionHeader
          title="Research interests"
          description="Interests, not claims of expertise. They are expected to narrow as the work does."
        />
        <dl className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
          {site.researchInterests.map((interest) => (
            <div key={interest.title}>
              <dt className="text-ink font-medium">{interest.title}</dt>
              <dd className="text-ink-muted mt-1.5 text-[0.9375rem] leading-relaxed">
                {interest.description}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="border-line border-t py-14">
        <SectionHeader
          title="Investigations"
          description="Each entry states its research question and its status. Nothing here reports a result unless the result exists and can be traced to an experiment."
        />

        {research.length > 0 ? (
          <div>
            {research.map((entry) => (
              <ResearchCard
                key={entry.frontmatter.slug}
                item={entry.frontmatter}
              />
            ))}
          </div>
        ) : (
          <EmptyState>
            No investigations are published yet. Work in progress will appear
            here with its research question, method, results, and limitations.
          </EmptyState>
        )}
      </section>
    </Container>
  );
}
