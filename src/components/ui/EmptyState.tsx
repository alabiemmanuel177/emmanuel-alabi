import type { ReactNode } from "react";

/**
 * An honest empty state.
 *
 * The site launches sparse on purpose (spec §60) — a section with nothing in it
 * should say so plainly rather than be padded with manufactured content.
 */
export function EmptyState({ children }: { children: ReactNode }) {
  return (
    <div className="border-line text-ink-muted rounded-lg border border-dashed px-5 py-8 text-sm leading-relaxed">
      {children}
    </div>
  );
}
