import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: string;
  lead?: string;
  children?: ReactNode;
};

export function PageHeader({ eyebrow, title, lead, children }: Props) {
  return (
    <div className="border-line border-b pt-14 pb-10">
      {eyebrow ? (
        <p className="text-ink-subtle mb-3 text-xs font-medium tracking-wider uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="text-ink font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h1>
      {lead ? (
        <p className="text-ink-muted mt-4 max-w-2xl text-base leading-relaxed">
          {lead}
        </p>
      ) : null}
      {children}
    </div>
  );
}
