import type { ReactNode } from "react";

type Props = {
  /** Path under public/, e.g. "/video/r2-held-out-replay.mp4". */
  src: string;
  /** Required. Carries the evidential content — see the note below. */
  caption: ReactNode;
  /** Figure number, e.g. 2 → "Figure 2 — …". */
  number?: number;
  /** Rendered aspect, so the page does not reflow while the file loads. */
  width: number;
  height: number;
};

/**
 * A self-hosted research clip.
 *
 * No autoplay and no loop: these are 2 fps renders meant to be scrubbed, not
 * ambient decoration, and motion that starts on its own is hostile to anyone
 * who did not ask for it.
 *
 * The caption is required and does the accessibility work. A silent screen
 * recording has no speech to caption, so the text alternative has to be the
 * surrounding prose — which is also where the numbers belong, since a reader
 * should not have to watch a video to learn what it shows.
 */
export function Video({ src, caption, number, width, height }: Props) {
  return (
    <figure>
      <video
        controls
        preload="metadata"
        playsInline
        width={width}
        height={height}
        className="border-line h-auto w-full rounded-md border"
      >
        <source src={src} type="video/mp4" />
        Your browser cannot play this video. It is available directly at{" "}
        <a href={src}>{src}</a>.
      </video>
      <figcaption>
        {number ? (
          <span className="text-ink font-medium">Figure {number} — </span>
        ) : null}
        {caption}
      </figcaption>
    </figure>
  );
}
