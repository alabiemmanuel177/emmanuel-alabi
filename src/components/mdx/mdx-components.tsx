import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { ArchitectureDiagram } from "@/components/media/ArchitectureDiagram";
import { Figure } from "@/components/media/Figure";
import { VideoEmbed } from "@/components/media/VideoEmbed";
import { Cite, References } from "@/components/writing/Citation";

/** Wide tables must scroll inside their own container, never the page (spec §37). */
function Table(props: ComponentPropsWithoutRef<"table">) {
  return (
    <div className="table-wrap">
      <table {...props} />
    </div>
  );
}

function Anchor({ href = "", ...props }: ComponentPropsWithoutRef<"a">) {
  if (href.startsWith("/")) {
    return <Link href={href} {...props} />;
  }
  if (href.startsWith("#")) {
    return <a href={href} {...props} />;
  }
  return <a href={href} target="_blank" rel="noreferrer" {...props} />;
}

/**
 * A callout for the things a credible research page must state plainly:
 * limitations, negative results, and caveats (spec §59).
 */
function Note({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <aside className="border-line bg-surface rounded-lg border p-5 text-[0.9375rem] leading-relaxed">
      {title ? (
        // `text-ink-muted`, not `text-ink-subtle`: subtle-on-surface measures
        // 4.33:1 in dark mode, below the 4.5:1 AA threshold for small text.
        <p className="text-ink-muted mb-2 text-xs font-medium tracking-wider uppercase">
          {title}
        </p>
      ) : null}
      <div className="[&>*+*]:mt-3">{children}</div>
    </aside>
  );
}

export const mdxComponents = {
  a: Anchor,
  table: Table,
  Figure,
  ArchitectureDiagram,
  VideoEmbed,
  Cite,
  References,
  Note,
};
