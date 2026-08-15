import "server-only";

import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import { mdxComponents } from "@/components/mdx/mdx-components";

/**
 * Compile an MDX body to a React element on the server.
 *
 * Every transformation happens at build time: highlighting via Shiki and
 * mathematics via KaTeX both ship as plain HTML, so a research page costs no
 * client JavaScript for its content (spec §40, §48).
 */
export async function renderMdx(source: string) {
  const { default: MDXContent } = await evaluate(source, {
    ...runtime,
    development: false,
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: { className: "heading-anchor" },
        },
      ],
      [
        rehypeKatex,
        {
          strict: false,
          throwOnError: false,
          trust: false,
          output: "html",
        },
      ],
      [
        rehypePrettyCode,
        {
          theme: { light: "github-light", dark: "github-dark-dimmed" },
          keepBackground: false,
          defaultLang: "text",
        },
      ],
    ],
  });

  return <MDXContent components={mdxComponents} />;
}
