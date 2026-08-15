import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { TableOfContents } from "@/components/writing/TableOfContents";
import { getResearch, getWriting, getWritingBySlug } from "@/lib/content/loader";
import { renderMdx } from "@/lib/content/mdx";
import { buildToc } from "@/lib/content/toc";
import { formatDate, label } from "@/lib/format";
import { pageMetadata } from "@/lib/metadata";
import { articleJsonLd } from "@/lib/metadata/structured-data";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getWriting().map((entry) => ({ slug: entry.frontmatter.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const entry = getWritingBySlug(slug);
  if (!entry) return {};

  return pageMetadata({
    title: entry.frontmatter.title,
    description: entry.frontmatter.summary,
    path: `/writing/${slug}`,
    type: "article",
    publishedTime: entry.frontmatter.publishedAt,
    modifiedTime: entry.frontmatter.updatedAt,
  });
}

export default async function WritingPage({ params }: Params) {
  const { slug } = await params;
  const entry = getWritingBySlug(slug);
  if (!entry) notFound();

  const { frontmatter: fm } = entry;
  const toc = buildToc(entry.body);
  const content = await renderMdx(entry.body);

  const related = getResearch().filter((r) =>
    fm.relatedResearch.includes(r.frontmatter.slug),
  );

  return (
    <Container width="prose">
      <article className="py-14">
        <nav aria-label="Breadcrumb" className="mb-8">
          <Link href="/writing" className="text-ink-muted hover:text-ink text-sm">
            ← Writing
          </Link>
        </nav>

        <header>
          <p className="text-ink-subtle mb-3 text-xs font-medium tracking-wider uppercase">
            {label(fm.type)}
          </p>

          <h1 className="text-ink font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            {fm.title}
          </h1>

          <p className="text-ink-muted mt-4 text-lg leading-relaxed">
            {fm.summary}
          </p>

          <div className="text-ink-subtle border-line mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 border-t pt-4 text-xs">
            <time dateTime={fm.publishedAt}>
              Published {formatDate(fm.publishedAt)}
            </time>
            {fm.updatedAt && fm.updatedAt !== fm.publishedAt ? (
              <time dateTime={fm.updatedAt}>
                Updated {formatDate(fm.updatedAt)}
              </time>
            ) : null}
            <span>{entry.readingMinutes} min read</span>
          </div>

          {fm.topics.length > 0 ? (
            <ul className="text-ink-subtle mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs">
              {fm.topics.map((topic) => (
                <li key={topic}>#{topic}</li>
              ))}
            </ul>
          ) : null}
        </header>

        {toc.length >= 3 ? (
          <div className="mt-10">
            <TableOfContents items={toc} />
          </div>
        ) : null}

        <div className="prose-research mt-10">{content}</div>

        {related.length > 0 ? (
          <aside className="border-line mt-14 border-t pt-8">
            <h2 className="text-ink-subtle text-xs font-medium tracking-wider uppercase">
              Related research
            </h2>
            <ul className="mt-3 space-y-2">
              {related.map((item) => (
                <li key={item.frontmatter.slug}>
                  <Link
                    href={`/research/${item.frontmatter.slug}`}
                    className="text-accent text-[0.9375rem] underline underline-offset-4"
                  >
                    {item.frontmatter.title}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        ) : null}
      </article>

      <JsonLd
        data={articleJsonLd({
          headline: fm.title,
          description: fm.summary,
          path: `/writing/${slug}`,
          datePublished: fm.publishedAt,
          dateModified: fm.updatedAt,
        })}
      />
    </Container>
  );
}
