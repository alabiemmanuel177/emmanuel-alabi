import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { getLog, getLogBySlug, getResearch } from "@/lib/content/loader";
import { renderMdx } from "@/lib/content/mdx";
import { formatDate } from "@/lib/format";
import { pageMetadata } from "@/lib/metadata";
import { articleJsonLd } from "@/lib/metadata/structured-data";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getLog().map((entry) => ({ slug: entry.frontmatter.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const entry = getLogBySlug(slug);
  if (!entry) return {};

  return pageMetadata({
    title: entry.frontmatter.title,
    description: entry.frontmatter.summary,
    path: `/log/${slug}`,
    type: "article",
    publishedTime: entry.frontmatter.publishedAt,
  });
}

export default async function LogEntryPage({ params }: Params) {
  const { slug } = await params;
  const entry = getLogBySlug(slug);
  if (!entry) notFound();

  const { frontmatter: fm } = entry;
  const content = await renderMdx(entry.body);
  const related = getResearch().filter((r) =>
    fm.relatedResearch.includes(r.frontmatter.slug),
  );

  return (
    <Container width="prose">
      <article className="py-14">
        <nav aria-label="Breadcrumb" className="mb-8">
          <Link href="/log" className="text-ink-muted hover:text-ink text-sm">
            ← Research log
          </Link>
        </nav>

        <header>
          <p className="text-ink-subtle mb-3 text-xs">
            <time dateTime={fm.publishedAt}>{formatDate(fm.publishedAt)}</time>
            {fm.period ? ` · ${fm.period}` : ""}
          </p>

          <h1 className="text-ink font-serif text-2xl font-semibold tracking-tight sm:text-3xl">
            {fm.title}
          </h1>

          <p className="text-ink-muted mt-3 leading-relaxed">{fm.summary}</p>
        </header>

        <div className="prose-research border-line mt-8 border-t pt-8">
          {content}
        </div>

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
          path: `/log/${slug}`,
          datePublished: fm.publishedAt,
        })}
      />
    </Container>
  );
}
