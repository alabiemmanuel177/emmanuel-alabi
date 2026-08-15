import type { Metadata } from "next";

import { site } from "@/lib/site";

type PageMetaInput = {
  title: string;
  description: string;
  /** Site-relative path, e.g. "/research/semantic-navigation". */
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  /** Absolute or site-relative image path. Defaults to the generated OG image. */
  image?: string;
};

/**
 * Every route builds its metadata through here so that titles, canonicals and
 * social cards stay consistent (spec §43).
 *
 * Example produced title: "Semantic Robot Navigation | Emmanuel Alabi".
 */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  publishedTime,
  modifiedTime,
  image,
}: PageMetaInput): Metadata {
  const url = new URL(path, site.url).toString();
  const ogImage = image ?? "/opengraph-image";

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url,
      siteName: site.name,
      locale: site.locale,
      type,
      images: [{ url: new URL(ogImage, site.url).toString() }],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.name}`,
      description,
      images: [new URL(ogImage, site.url).toString()],
    },
  };
}

export function absoluteUrl(path: string): string {
  return new URL(path, site.url).toString();
}

/** Normalise a partial date ("2026", "2026-08", "2026-08-15") to ISO-8601. */
export function isoDate(partial: string): string {
  const parts = partial.split("-");
  const year = parts[0];
  const month = parts[1] ?? "01";
  const day = parts[2] ?? "01";
  return `${year}-${month}-${day}`;
}
