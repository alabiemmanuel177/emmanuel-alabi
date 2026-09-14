import Image from "next/image";
import Link from "next/link";

import { ResearchStatus } from "./ResearchStatus";
import { EvidenceLinks } from "@/components/ui/EvidenceLinks";
import { PlayIcon } from "@/components/ui/icons";
import { formatDateRange } from "@/lib/format";
import type { ResearchFrontmatter } from "@/lib/content/schemas";

/**
 * A thumbnail for an investigation that has a clip to watch.
 *
 * It is a still frame, not an embedded player: the listing is for scanning, and
 * three autoplaying videos on one page would be both heavy and hostile. The
 * play badge signals that the clip exists; the work of showing it belongs to
 * the research page, which is also where the caption that makes it evidence
 * lives. The whole thing is one link to that page.
 */
function Thumbnail({ item }: { item: ResearchFrontmatter }) {
  if (!item.image) return null;

  return (
    <Link
      href={`/research/${item.slug}`}
      // The heading link already names the entry, so this one is redundant to a
      // screen reader and is hidden from it rather than repeating the title.
      tabIndex={-1}
      aria-hidden="true"
      className="group border-line relative block overflow-hidden rounded-md border"
    >
      <Image
        src={item.image}
        alt={item.imageAlt ?? ""}
        width={1000}
        height={900}
        sizes="(max-width: 640px) 100vw, 208px"
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
      />
      {item.video ? (
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="rounded-full bg-black/55 p-2.5 text-white backdrop-blur-sm transition-colors group-hover:bg-black/70">
            <PlayIcon />
          </span>
        </span>
      ) : null}
    </Link>
  );
}

export function ResearchCard({ item }: { item: ResearchFrontmatter }) {
  const href = `/research/${item.slug}`;
  const hasThumbnail = Boolean(item.image);

  return (
    <article className="border-line border-t py-8 first:border-t-0 first:pt-0">
      {/*
        The thumbnail sits in a right-hand column rather than a left one. Only
        some investigations have a clip, and a left column would indent those
        entries alone — leaving the titles down the list on a ragged edge. On
        the right, cards without a thumbnail simply end sooner and every title
        still starts at the same place. It comes after the content in the DOM
        so the heading is what a screen reader meets first, and is reordered
        above it only on narrow screens.
      */}
      <div
        className={
          hasThumbnail
            ? "grid gap-5 sm:grid-cols-[minmax(0,1fr)_13rem] sm:gap-7"
            : undefined
        }
      >
        <div>
          <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2">
            <ResearchStatus status={item.status} />
            <span className="text-ink-subtle text-xs">
              {formatDateRange(item.startDate, item.endDate)}
            </span>
          </div>

          <h3 className="text-ink font-serif text-xl font-semibold tracking-tight">
            <Link href={href} className="hover:text-accent transition-colors">
              {item.title}
            </Link>
          </h3>

          <p className="text-ink mt-3 text-[0.9375rem] leading-relaxed">
            <span className="text-ink-subtle">Question. </span>
            {item.question}
          </p>

          <p className="text-ink-muted mt-3 text-[0.9375rem] leading-relaxed">
            {item.summary}
          </p>

          {item.result ? (
            <p className="border-accent text-ink mt-4 border-l-2 py-1 pl-4 text-[0.9375rem] leading-relaxed">
              {item.result}
            </p>
          ) : null}

          <ul className="text-ink-subtle mt-4 flex flex-wrap gap-x-2 gap-y-1 text-xs">
            {item.researchAreas.map((area) => (
              <li
                key={area}
                className="border-line rounded-full border px-2.5 py-0.5"
              >
                {area}
              </li>
            ))}
          </ul>

          <EvidenceLinks
            className="mt-5"
            links={[
              { label: "Research", href },
              { label: "Code", href: item.github },
              { label: "Paper", href: item.paper ?? item.preprint },
              { label: "Demo", href: item.demo },
              { label: "Dataset", href: item.dataset },
            ]}
          />
        </div>

        {hasThumbnail ? (
          <div className="order-first sm:order-none sm:pt-1">
            <Thumbnail item={item} />
          </div>
        ) : null}
      </div>
    </article>
  );
}
