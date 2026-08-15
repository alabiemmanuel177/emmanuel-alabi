import Link from "next/link";

import { Container } from "./Container";
import { profileLinks, site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-line mt-24 border-t">
      <Container>
        <div className="grid gap-10 py-12 sm:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <p className="text-ink font-serif text-base font-semibold">
              {site.name}
            </p>
            <p className="text-ink-muted mt-2 max-w-sm text-sm leading-relaxed">
              {site.interestLine}
            </p>
          </div>

          <nav aria-label="Site">
            <h2 className="text-ink-subtle text-xs font-medium tracking-wider uppercase">
              Site
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/research" className="text-ink-muted hover:text-ink">
                  Research
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-ink-muted hover:text-ink">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/writing" className="text-ink-muted hover:text-ink">
                  Writing
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-ink-muted hover:text-ink">
                  About
                </Link>
              </li>
              <li>
                <Link href="/now" className="text-ink-muted hover:text-ink">
                  Now
                </Link>
              </li>
              <li>
                <Link href="/cv" className="text-ink-muted hover:text-ink">
                  CV
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Elsewhere">
            <h2 className="text-ink-subtle text-xs font-medium tracking-wider uppercase">
              Elsewhere
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              {profileLinks().map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-ink-muted hover:text-ink"
                    rel="me noreferrer"
                    target="_blank"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="text-ink-muted hover:text-ink"
                >
                  Email
                </a>
              </li>
              <li>
                <Link href="/contact" className="text-ink-muted hover:text-ink">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="border-line text-ink-subtle flex flex-col gap-1 border-t py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Emmanuel Alabi</p>
          <p>Built and maintained by Emmanuel Alabi.</p>
        </div>
      </Container>
    </footer>
  );
}
