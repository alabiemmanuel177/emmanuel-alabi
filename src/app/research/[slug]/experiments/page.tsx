import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/Container";
import { ExperimentTable } from "@/components/research/ExperimentTable";
import { getResearch, getResearchBySlug } from "@/lib/content/loader";
import { getExperiments, hasExperiments } from "@/lib/content/experiments";
import { pageMetadata } from "@/lib/metadata";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getResearch()
    .filter((entry) => hasExperiments(entry.frontmatter.slug))
    .map((entry) => ({ slug: entry.frontmatter.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const entry = getResearchBySlug(slug);
  if (!entry) return {};

  return pageMetadata({
    title: `Experiments — ${entry.frontmatter.title}`,
    description: `Experiment log for ${entry.frontmatter.title}: hypotheses, configurations, metrics, and outcomes.`,
    path: `/research/${slug}/experiments`,
  });
}

export default async function ExperimentsPage({ params }: Params) {
  const { slug } = await params;
  const entry = getResearchBySlug(slug);
  const log = entry ? getExperiments(slug) : null;
  if (!entry || !log) notFound();

  return (
    <Container width="prose">
      <nav aria-label="Breadcrumb" className="pt-14">
        <Link
          href={`/research/${slug}`}
          className="text-ink-muted hover:text-ink text-sm"
        >
          ← {entry.frontmatter.title}
        </Link>
      </nav>

      <header className="border-line border-b pt-8 pb-10">
        <p className="text-ink-subtle mb-3 text-xs font-medium tracking-wider uppercase">
          Experiment log
        </p>
        <h1 className="text-ink font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
          {entry.frontmatter.title}
        </h1>
        <p className="text-ink-muted mt-4 text-base leading-relaxed">
          Every run, in the order it happened — including the ones that
          disproved the hypothesis. Configurations and seeds are recorded so each
          row can be re-run.
        </p>
      </header>

      <div className="py-12">
        <ExperimentTable experiments={log.experiments} />
      </div>
    </Container>
  );
}
