import Link from "next/link";

import { ExternalIcon } from "./icons";

export type EvidenceLink = {
  label: string;
  href?: string;
};

/**
 * The evidence row that sits under a research or project claim
 * (spec §4.1: "Paper · Code · Experiments · Demo").
 *
 * Entries without an href are dropped, so a card never renders a dead promise.
 */
export function EvidenceLinks({
  links,
  className = "",
}: {
  links: EvidenceLink[];
  className?: string;
}) {
  const present = links.filter(
    (l): l is Required<EvidenceLink> => Boolean(l.href),
  );
  if (present.length === 0) return null;

  return (
    <ul className={`flex flex-wrap items-center gap-x-4 gap-y-2 ${className}`}>
      {present.map((link) => {
        const isExternal = link.href.startsWith("http");
        const classes =
          "text-accent inline-flex items-center gap-1 text-sm hover:underline underline-offset-4";

        return (
          <li key={`${link.label}-${link.href}`}>
            {isExternal ? (
              <a
                href={link.href}
                className={classes}
                target="_blank"
                rel="noreferrer"
              >
                {link.label}
                <ExternalIcon />
              </a>
            ) : (
              <Link href={link.href} className={classes}>
                {link.label}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}
