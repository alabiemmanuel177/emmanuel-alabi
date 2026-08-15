import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { EvidenceLinks } from "@/components/ui/EvidenceLinks";
import { JsonLd } from "@/components/ui/JsonLd";
import { TableOfContents } from "@/components/writing/TableOfContents";
import { getProjectBySlug, getProjects } from "@/lib/content/loader";
import { renderMdx } from "@/lib/content/mdx";
import { buildToc } from "@/lib/content/toc";
import { formatDateRange, label } from "@/lib/format";
import { pageMetadata } from "@/lib/metadata";
import { softwareSourceCodeJsonLd } from "@/lib/metadata/structured-data";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getProjects().map((entry) => ({ slug: entry.frontmatter.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const entry = getProjectBySlug(slug);
  if (!entry) return {};

  return pageMetadata({
    title: entry.frontmatter.title,
    description: entry.frontmatter.summary,
    path: `/projects/${slug}`,
    type: "article",
  });
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const entry = getProjectBySlug(slug);
  if (!entry) notFound();

  const { frontmatter: fm } = entry;
  const toc = buildToc(entry.body);
  const content = await renderMdx(entry.body);

  return (
    <Container width="prose">
      <article className="py-14">
        <nav aria-label="Breadcrumb" className="mb-8">
          <Link
            href="/projects"
            className="text-ink-muted hover:text-ink text-sm"
          >
            ← Projects
          </Link>
        </nav>

        <header>
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <Badge>{label(fm.type)}</Badge>
            <span className="text-ink-subtle text-xs">
              {formatDateRange(fm.startDate, fm.endDate)}
            </span>
          </div>

          <h1 className="text-ink font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            {fm.title}
          </h1>

          <p className="text-ink-muted mt-4 text-lg leading-relaxed">
            {fm.summary}
          </p>

          {fm.technologies.length > 0 ? (
            <p className="text-ink-subtle border-line mt-6 border-t pt-5 font-mono text-xs">
              {fm.technologies.join(" · ")}
            </p>
          ) : null}

          <EvidenceLinks
            className="mt-5"
            links={[
              { label: "Code", href: fm.github },
              { label: "Demo", href: fm.demo },
              {
                label: "Write-up",
                href: fm.article ? `/writing/${fm.article}` : undefined,
              },
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
