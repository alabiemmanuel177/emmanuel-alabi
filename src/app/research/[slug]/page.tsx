import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/Container";
import { ResearchMeta } from "@/components/research/ResearchMeta";
import { ResearchStatus } from "@/components/research/ResearchStatus";
import { EvidenceLinks } from "@/components/ui/EvidenceLinks";
import { JsonLd } from "@/components/ui/JsonLd";
import { TableOfContents } from "@/components/writing/TableOfContents";
import { getResearch, getResearchBySlug } from "@/lib/content/loader";
import { hasExperiments } from "@/lib/content/experiments";
import { renderMdx } from "@/lib/content/mdx";
import { buildToc } from "@/lib/content/toc";
import { pageMetadata } from "@/lib/metadata";
import {
  articleJsonLd,
  softwareSourceCodeJsonLd,
} from "@/lib/metadata/structured-data";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getResearch().map((entry) => ({ slug: entry.frontmatter.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const entry = getResearchBySlug(slug);
  if (!entry) return {};

  return pageMetadata({
    title: entry.frontmatter.title,
    description: entry.frontmatter.summary,
    path: `/research/${slug}`,
    type: "article",
  });
}

export default async function ResearchPage({ params }: Params) {
  const { slug } = await params;
  const entry = getResearchBySlug(slug);
  if (!entry) notFound();

  const { frontmatter: fm } = entry;
  const toc = buildToc(entry.body);
  const content = await renderMdx(entry.body);
  const experimentsHref = hasExperiments(slug)
    ? `/research/${slug}/experiments`
    : undefined;

  return (
    <Container width="prose">
      <article className="py-14">
        <nav aria-label="Breadcrumb" className="mb-8">
          <Link
            href="/research"
            className="text-ink-muted hover:text-ink text-sm"
          >
            ← Research
          </Link>
        </nav>

        <header>
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <ResearchStatus status={fm.status} />
          </div>

          <h1 className="text-ink font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            {fm.title}
          </h1>

          <p className="text-ink mt-5 text-lg leading-relaxed">
            <span className="text-ink-subtle">Research question. </span>
            {fm.question}
          </p>

          <div className="mt-7">
            <ResearchMeta item={fm} />
          </div>

          <EvidenceLinks
            className="mt-5"
            links={[
              { label: "Code", href: fm.github },
              { label: "Paper", href: fm.paper },
              { label: "Preprint", href: fm.preprint },
              { label: "Demo", href: fm.demo },
              { label: "Dataset", href: fm.dataset },
              { label: "Experiments", href: experimentsHref },
            ]}
          />
        </header>

        {toc.length >= 3 ? (
          <div className="mt-10">
            <TableOfContents items={toc} />
          </div>
        ) : null}

        <div className="prose-research mt-10">{content}</div>
      </article>

      <JsonLd
        data={articleJsonLd({
          headline: fm.title,
          description: fm.summary,
          path: `/research/${slug}`,
          datePublished: fm.startDate,
          dateModified: fm.endDate,
        })}
      />
      {fm.github ? (
        <JsonLd
          data={softwareSourceCodeJsonLd({
            name: fm.title,
            description: fm.summary,
            codeRepository: fm.github,
          })}
        />
      ) : null}
    </Container>
  );
}
