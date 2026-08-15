import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { ResearchCard } from "@/components/research/ResearchCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowIcon } from "@/components/ui/icons";
import { getResearch } from "@/lib/content/loader";
import { pageMetadata } from "@/lib/metadata";
import { researchProfile } from "@/lib/research-profile";

export const metadata: Metadata = pageMetadata({
  title: "Research",
  description:
    "Current research direction and the areas being explored: embodied AI, robot learning, computer vision, autonomous systems, and multimodal intelligence.",
  path: "/research",
});

export default function ResearchIndexPage() {
  const research = getResearch();
  const [programme, ...investigations] = research;

  return (
    <Container>
      <PageHeader title="Research" />

      <section className="py-14">
        <h2 className="text-ink font-serif text-xl font-semibold tracking-tight">
          Current research direction
        </h2>
        <p className="text-ink mt-4 max-w-2xl text-lg leading-relaxed">
          My current work is focused on developing the mathematical,
          machine-learning, and robotics foundations required to investigate
          intelligent autonomous systems, with particular interest in embodied
          AI, robot learning, computer vision, and multimodal perception.
        </p>
        <p className="text-ink-muted mt-4 max-w-2xl text-[0.9375rem] leading-relaxed">
          This page is intentionally sparse. Investigations appear here once they
          have a research question, a method, and something a reader can check —
          not before.
        </p>

        {programme ? (
          <p className="mt-7">
            <Link
              href={`/research/${programme.frontmatter.slug}`}
              className="text-accent group inline-flex items-center gap-1.5 text-[0.9375rem] underline underline-offset-4"
            >
              Read the full research programme
              <ArrowIcon className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </p>
        ) : null}
      </section>

      <section className="border-line border-t py-14">
        <SectionHeader
          title="Areas I'm exploring"
          description="Interests, not claims of expertise. They are expected to narrow as the work does."
        />
        <dl className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
          {researchProfile.currentFocus.map((area) => (
            <div key={area.title}>
              <dt className="text-ink font-medium">{area.title}</dt>
              <dd className="text-ink-muted mt-1.5 text-[0.9375rem] leading-relaxed">
                {area.description}
              </dd>
            </div>
          ))}
        </dl>

        <div className="border-line mt-10 border-t pt-6">
          <h3 className="text-ink-subtle text-xs font-medium tracking-wider uppercase">
            Broader interests
          </h3>
          <p className="text-ink-muted mt-2 text-[0.9375rem]">
            {researchProfile.broaderInterests.join(" · ")}
          </p>
        </div>
      </section>

      {investigations.length > 0 ? (
        <section className="border-line border-t py-14">
          <SectionHeader
            title="Investigations"
            description="Each entry states its research question and its status. Nothing here reports a result unless the result exists and can be traced to an experiment."
          />
          <div>
            {investigations.map((entry) => (
              <ResearchCard
                key={entry.frontmatter.slug}
                item={entry.frontmatter}
              />
            ))}
          </div>
        </section>
      ) : null}
    </Container>
  );
}
