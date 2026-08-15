import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "quiet";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-canvas border-ink hover:opacity-90",
  secondary:
    "bg-transparent text-ink border-line-strong hover:border-ink",
  quiet: "bg-transparent text-ink-muted border-transparent hover:text-ink",
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
  download?: boolean;
  className?: string;
};

export function LinkButton({
  href,
  children,
  variant = "secondary",
  external = false,
  download = false,
  className = "",
}: Props) {
  const classes = `inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition-colors ${variants[variant]} ${className}`;

  if (external || href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={classes}
        target={href.startsWith("mailto:") ? undefined : "_blank"}
        rel="noreferrer"
      >
        {children}
      </a>
    );
  }

  if (download) {
    return (
      <a href={href} className={classes} download>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
