import type { TocItem } from "@/lib/content/toc";

/**
 * A static table of contents. No scroll-spy, no client JavaScript — a research
 * page should cost nothing to read (spec §48).
 */
export function TableOfContents({ items }: { items: TocItem[] }) {
  if (items.length < 3) return null;

  return (
    <nav aria-labelledby="toc-heading" className="border-line rounded-lg border p-5">
      <h2
        id="toc-heading"
        className="text-ink-subtle text-xs font-medium tracking-wider uppercase"
      >
        Contents
      </h2>
      <ol className="mt-3 space-y-1.5 text-sm">
        {items.map((item) => (
          <li key={item.id} className={item.depth === 3 ? "pl-4" : ""}>
            <a
              href={`#${item.id}`}
              className="text-ink-muted hover:text-ink leading-snug"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
