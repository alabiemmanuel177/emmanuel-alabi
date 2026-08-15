import Link from "next/link";

import { formatDate, label } from "@/lib/format";
import type { LogFrontmatter, WritingFrontmatter } from "@/lib/content/schemas";

type Props = {
  item: WritingFrontmatter | LogFrontmatter;
  basePath: "/writing" | "/log";
  readingMinutes?: number;
};

function typeOf(item: Props["item"]): string | null {
  return "type" in item ? label(item.type) : null;
}

export function ArticleCard({ item, basePath, readingMinutes }: Props) {
  const kind = typeOf(item);

  return (
    <article className="border-line border-t py-6 first:border-t-0 first:pt-0">
      <div className="text-ink-subtle mb-2 flex flex-wrap items-center gap-x-3 text-xs">
        <time dateTime={item.publishedAt}>{formatDate(item.publishedAt)}</time>
        {kind ? <span>{kind}</span> : null}
        {readingMinutes ? <span>{readingMinutes} min read</span> : null}
      </div>

      <h3 className="text-ink text-lg font-semibold tracking-tight">
        <Link
          href={`${basePath}/${item.slug}`}
          className="hover:text-accent transition-colors"
        >
          {item.title}
        </Link>
      </h3>

      <p className="text-ink-muted mt-2 text-[0.9375rem] leading-relaxed">
        {item.summary}
      </p>

      {item.topics.length > 0 ? (
        <ul className="text-ink-subtle mt-3 flex flex-wrap gap-x-2 gap-y-1 font-mono text-xs">
          {item.topics.map((topic) => (
            <li key={topic}>#{topic}</li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
