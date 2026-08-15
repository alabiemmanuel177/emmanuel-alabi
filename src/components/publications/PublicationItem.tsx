import { PublicationStatus } from "./PublicationStatus";
import { EvidenceLinks } from "@/components/ui/EvidenceLinks";
import { site } from "@/lib/site";
import type { Publication } from "@/lib/content/schemas";

export function PublicationItem({ item }: { item: Publication }) {
  return (
    <article className="border-line border-t py-7 first:border-t-0 first:pt-0">
      <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2">
        <PublicationStatus status={item.status} />
        <span className="text-ink-subtle text-xs tabular-nums">{item.year}</span>
      </div>

      <h3 className="text-ink font-serif text-lg leading-snug font-semibold">
        {item.title}
      </h3>

      <p className="text-ink-muted mt-2 text-sm">
        {item.authors.map((author, index) => (
          <span key={author}>
            {index > 0 ? ", " : ""}
            {author === site.name ? (
              <span className="text-ink font-medium">{author}</span>
            ) : (
              author
            )}
          </span>
        ))}
      </p>

      {item.venue ? (
        <p className="text-ink-muted mt-1 text-sm italic">{item.venue}</p>
      ) : null}

      {item.abstract ? (
        <details className="group mt-3">
          <summary className="text-ink-muted hover:text-ink cursor-pointer text-sm">
            <span className="group-open:hidden">Show abstract</span>
            <span className="hidden group-open:inline">Hide abstract</span>
          </summary>
          <p className="text-ink mt-2 max-w-prose text-[0.9375rem] leading-relaxed">
            {item.abstract}
          </p>
        </details>
      ) : null}

      <EvidenceLinks
        className="mt-4"
        links={[
          { label: "Paper", href: item.paperUrl },
          { label: "Preprint", href: item.preprintUrl },
          { label: "Code", href: item.codeUrl },
          { label: "Project", href: item.projectUrl },
          {
            label: "DOI",
            href: item.doi ? `https://doi.org/${item.doi}` : undefined,
          },
          {
            label: "arXiv",
            href: item.arxivId
              ? `https://arxiv.org/abs/${item.arxivId}`
              : undefined,
          },
        ]}
      />

      {item.bibtex ? (
        <details className="mt-4">
          <summary className="text-ink-muted hover:text-ink cursor-pointer text-sm">
            Citation
          </summary>
          <pre className="border-line bg-surface text-ink mt-2 overflow-x-auto rounded-md border p-3 font-mono text-xs">
            {item.bibtex}
          </pre>
        </details>
      ) : null}
    </article>
  );
}
