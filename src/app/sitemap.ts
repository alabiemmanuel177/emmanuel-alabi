import type { MetadataRoute } from "next";

import { getLog, getProjects, getResearch, getWriting } from "@/lib/content/loader";
import { hasExperiments } from "@/lib/content/experiments";
import { absoluteUrl, isoDate } from "@/lib/metadata";

/**
 * Public routes only (spec §45). The content loaders already exclude drafts,
 * private and archived entries, so nothing unpublished can leak in here.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), priority: 1 },
    { url: absoluteUrl("/research"), priority: 0.9 },
    { url: absoluteUrl("/publications"), priority: 0.7 },
    { url: absoluteUrl("/projects"), priority: 0.8 },
    { url: absoluteUrl("/writing"), priority: 0.8 },
    { url: absoluteUrl("/log"), priority: 0.6 },
    { url: absoluteUrl("/about"), priority: 0.8 },
    { url: absoluteUrl("/now"), priority: 0.6 },
    { url: absoluteUrl("/cv"), priority: 0.8 },
    { url: absoluteUrl("/contact"), priority: 0.5 },
  ];

  const research = getResearch().flatMap(({ frontmatter }) => {
    const entries: MetadataRoute.Sitemap = [
      {
        url: absoluteUrl(`/research/${frontmatter.slug}`),
        lastModified: isoDate(frontmatter.endDate ?? frontmatter.startDate),
        priority: 0.9,
      },
    ];
    if (hasExperiments(frontmatter.slug)) {
      entries.push({
        url: absoluteUrl(`/research/${frontmatter.slug}/experiments`),
        priority: 0.6,
      });
    }
    return entries;
  });

  const projects = getProjects().map(({ frontmatter }) => {
    const date = frontmatter.endDate ?? frontmatter.startDate;
    return {
      url: absoluteUrl(`/projects/${frontmatter.slug}`),
      ...(date ? { lastModified: isoDate(date) } : {}),
      priority: 0.7,
    };
  });

  const writing = getWriting().map(({ frontmatter }) => ({
    url: absoluteUrl(`/writing/${frontmatter.slug}`),
    lastModified: isoDate(frontmatter.updatedAt ?? frontmatter.publishedAt),
    priority: 0.7,
  }));

  const log = getLog().map(({ frontmatter }) => ({
    url: absoluteUrl(`/log/${frontmatter.slug}`),
    lastModified: isoDate(frontmatter.publishedAt),
    priority: 0.5,
  }));

  return [...staticRoutes, ...research, ...projects, ...writing, ...log];
}
