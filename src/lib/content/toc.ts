import GithubSlugger from "github-slugger";

export type TocItem = {
  depth: 2 | 3;
  text: string;
  id: string;
};

const FENCE = /^(```|~~~)/;
const HEADING = /^(#{2,3})\s+(.+?)\s*#*\s*$/;

/** Strip the inline markdown a heading might contain. */
function plain(text: string): string {
  return text
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/\$([^$]+)\$/g, "$1")
    .trim();
}

/**
 * Build a table of contents from raw MDX.
 *
 * Uses the same slugger as `rehype-slug`, so the generated ids match the
 * anchors rendered into the page.
 */
export function buildToc(source: string): TocItem[] {
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];
  let inFence = false;

  for (const line of source.split("\n")) {
    if (FENCE.test(line.trim())) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = HEADING.exec(line);
    if (!match) continue;

    const text = plain(match[2]);
    if (!text) continue;

    items.push({
      depth: match[1].length as 2 | 3,
      text,
      id: slugger.slug(text),
    });
  }

  return items;
}
