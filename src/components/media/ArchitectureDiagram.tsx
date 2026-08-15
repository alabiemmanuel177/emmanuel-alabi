import type { ReactNode } from "react";

type Props = {
  /** Ordered pipeline stages, rendered top-to-bottom. */
  stages: string[];
  caption?: ReactNode;
  /** Screen-reader description of the whole pipeline. */
  label?: string;
};

/**
 * A vector pipeline diagram for methods sections (spec §39):
 *
 *   Sensors → Perception → Scene Representation → … → Robot
 *
 * Rendered as real text in a flow layout rather than an exported image, so it
 * scales, prints, reflows on mobile, and stays readable to a screen reader.
 */
export function ArchitectureDiagram({ stages, caption, label }: Props) {
  return (
    <figure>
      <ol
        aria-label={label ?? `Pipeline: ${stages.join(", then ")}`}
        className="border-line bg-surface flex flex-col items-stretch gap-0 rounded-lg border p-5"
      >
        {stages.map((stage, index) => (
          <li key={stage} className="contents">
            <div className="border-line bg-canvas text-ink rounded-md border px-4 py-2.5 text-center font-mono text-sm">
              {stage}
            </div>
            {index < stages.length - 1 ? (
              <div
                aria-hidden="true"
                className="text-ink-subtle py-1 text-center text-sm leading-none"
              >
                ↓
              </div>
            ) : null}
          </li>
        ))}
      </ol>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}
