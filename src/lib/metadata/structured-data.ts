import { absoluteUrl, isoDate } from "./index";
import { profileLinks, site } from "@/lib/site";
import { focusLabels, researchProfile } from "@/lib/research-profile";
import type { Publication } from "@/lib/content/schemas";

/**
 * schema.org JSON-LD (spec §44).
 *
 * Only facts that the site actually states are emitted — no affiliation is
 * declared, because none exists yet.
 */

type Json = Record<string, unknown>;

export function personJsonLd(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    email: `mailto:${site.email}`,
    jobTitle: site.title,
    description: site.tagline,
    knowsAbout: [...focusLabels, ...researchProfile.broaderInterests],
    sameAs: profileLinks().map((l) => l.href),
  };
}

export function articleJsonLd(input: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.headline,
    description: input.description,
    url: absoluteUrl(input.path),
    datePublished: isoDate(input.datePublished),
    dateModified: isoDate(input.dateModified ?? input.datePublished),
    author: { "@type": "Person", name: site.name, url: site.url },
  };
}

export function scholarlyArticleJsonLd(publication: Publication): Json {
  return {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: publication.title,
    author: publication.authors.map((name) => ({ "@type": "Person", name })),
    datePublished: String(publication.year),
    ...(publication.venue ? { publisher: publication.venue } : {}),
    ...(publication.abstract ? { abstract: publication.abstract } : {}),
    ...(publication.doi ? { identifier: `https://doi.org/${publication.doi}` } : {}),
    ...(publication.paperUrl ?? publication.preprintUrl
      ? { url: publication.paperUrl ?? publication.preprintUrl }
      : {}),
  };
}

export function softwareSourceCodeJsonLd(input: {
  name: string;
  description: string;
  codeRepository: string;
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: input.name,
    description: input.description,
    codeRepository: input.codeRepository,
    author: { "@type": "Person", name: site.name, url: site.url },
  };
}
