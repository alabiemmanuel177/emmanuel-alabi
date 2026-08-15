export type Reference = {
  /** Full reference text, e.g. "Vaswani et al. Attention Is All You Need. NeurIPS, 2017." */
  text: string;
  url?: string;
};

/**
 * Numbered references (spec §41). Used from MDX as:
 *
 *   Transformers <Cite n={1} /> changed sequence modelling.
 *   <References items={[{ text: "Vaswani et al. ...", url: "https://..." }]} />
 */
export function Cite({ n }: { n: number }) {
  return (
    <sup>
      <a href={`#ref-${n}`} aria-label={`Reference ${n}`}>
        [{n}]
      </a>
    </sup>
  );
}

export function References({ items }: { items: Reference[] }) {
  if (items.length === 0) return null;

  return (
    <section aria-labelledby="references-heading">
      <h2 id="references-heading">References</h2>
      <ol className="space-y-2 text-sm">
        {items.map((ref, index) => (
          <li key={ref.text} id={`ref-${index + 1}`} className="scroll-mt-20">
            <span className="text-ink-subtle mr-1.5 font-mono">
              [{index + 1}]
            </span>
            {ref.url ? (
              <a href={ref.url} target="_blank" rel="noreferrer">
                {ref.text}
              </a>
            ) : (
              ref.text
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
