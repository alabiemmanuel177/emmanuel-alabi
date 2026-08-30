import Image from "next/image";
import type { ReactNode } from "react";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Figure number, e.g. 3 → "Figure 3 — …". */
  number?: number;
  caption: ReactNode;
  /** Where the figure came from: a paper, a run, a dataset. */
  source?: string;
  /** Experimental context the reader needs to interpret it (spec §38). */
  context?: string;
};

/**
 * A research figure. Caption, alt text, source and experimental context are all
 * part of the contract (spec §38) — a figure without them is not evidence.
 */
export function Figure({
  src,
  alt,
  width,
  height,
  number,
  caption,
  source,
  context,
}: Props) {
  return (
    <figure>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="border-line h-auto w-full rounded-md border"
        sizes="(max-width: 768px) 100vw, 704px"
      />
      <figcaption>
        {number ? (
          <span className="text-ink font-medium">Figure {number}: </span>
        ) : null}
        {caption}
        {context ? <span className="block mt-1">{context}</span> : null}
        {source ? (
          <span className="text-ink-subtle mt-1 block">Source: {source}</span>
        ) : null}
      </figcaption>
    </figure>
  );
}
