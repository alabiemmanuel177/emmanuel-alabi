import type { ReactNode } from "react";

type Props = {
  /** YouTube video id. */
  id: string;
  title: string;
  caption?: ReactNode;
  start?: number;
};

/**
 * Privacy-enhanced YouTube embed (spec §53) — youtube-nocookie, lazy-loaded,
 * so a demo video costs nothing until the reader scrolls to it.
 */
export function VideoEmbed({ id, title, caption, start }: Props) {
  const src = new URL(`https://www.youtube-nocookie.com/embed/${id}`);
  src.searchParams.set("rel", "0");
  src.searchParams.set("modestbranding", "1");
  if (start) src.searchParams.set("start", String(start));

  return (
    <figure>
      <div className="border-line relative aspect-video overflow-hidden rounded-md border">
        <iframe
          src={src.toString()}
          title={title}
          loading="lazy"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}
