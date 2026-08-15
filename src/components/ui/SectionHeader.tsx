import Link from "next/link";

import { ArrowIcon } from "./icons";

type Props = {
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
  as?: "h2" | "h3";
};

export function SectionHeader({
  title,
  description,
  href,
  linkLabel = "View all",
  as: Tag = "h2",
}: Props) {
  return (
    <div className="mb-7 flex items-end justify-between gap-6">
      <div>
        <Tag className="text-ink font-serif text-xl font-semibold tracking-tight">
          {title}
        </Tag>
        {description ? (
          <p className="text-ink-muted mt-1.5 max-w-2xl text-sm leading-relaxed">
            {description}
          </p>
        ) : null}
      </div>
      {href ? (
        <Link
          href={href}
          className="text-ink-muted hover:text-ink group inline-flex shrink-0 items-center gap-1.5 text-sm whitespace-nowrap"
        >
          {linkLabel}
          <ArrowIcon className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      ) : null}
    </div>
  );
}
