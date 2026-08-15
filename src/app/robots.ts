import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/metadata";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Next.js internals only. Draft content is filtered at build time and is
      // never emitted, so it does not need — and must not rely on — a
      // disallow rule (spec §71: obscurity is not access control).
      disallow: ["/_next/"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}
