import Link from "next/link";

import { Container } from "./Container";
import { NavLinks } from "./NavLinks";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";
import { site } from "@/lib/site";

export function Header() {
  return (
    <header className="border-line border-b">
      <Container>
        <div className="flex h-16 items-center justify-between gap-6">
          <Link
            href="/"
            className="text-ink font-serif text-[1.0625rem] font-semibold tracking-tight"
          >
            {site.name}
          </Link>

          <nav aria-label="Primary" className="hidden md:block">
            <NavLinks />
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            {site.links.github ? (
              <a
                href={site.links.github}
                className="text-ink-subtle hover:text-ink transition-colors"
                aria-label="GitHub profile"
                rel="me noreferrer"
                target="_blank"
              >
                <GitHubIcon />
              </a>
            ) : null}
            {site.links.linkedin ? (
              <a
                href={site.links.linkedin}
                className="text-ink-subtle hover:text-ink transition-colors"
                aria-label="LinkedIn profile"
                rel="me noreferrer"
                target="_blank"
              >
                <LinkedInIcon />
              </a>
            ) : null}
            <Link
              href="/contact"
              className="text-ink-muted hover:text-ink text-[0.9375rem] transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Mobile: a native disclosure, so the menu costs no JavaScript. */}
          <details className="group md:hidden">
            <summary
              className="text-ink-muted marker:content-none flex cursor-pointer list-none items-center gap-2 text-[0.9375rem]"
              aria-label="Toggle navigation menu"
            >
              <span className="group-open:hidden">Menu</span>
              <span className="hidden group-open:inline">Close</span>
            </summary>
            <div className="border-line bg-canvas absolute inset-x-0 z-20 border-b px-5 shadow-sm">
              <nav aria-label="Primary (mobile)">
                <NavLinks orientation="vertical" />
              </nav>
              <div className="border-line flex items-center gap-4 border-t py-3">
                {site.links.github ? (
                  <a
                    href={site.links.github}
                    className="text-ink-muted text-sm"
                    rel="me noreferrer"
                    target="_blank"
                  >
                    GitHub
                  </a>
                ) : null}
                {site.links.linkedin ? (
                  <a
                    href={site.links.linkedin}
                    className="text-ink-muted text-sm"
                    rel="me noreferrer"
                    target="_blank"
                  >
                    LinkedIn
                  </a>
                ) : null}
                <Link href="/contact" className="text-ink-muted text-sm">
                  Contact
                </Link>
              </div>
            </div>
          </details>
        </div>
      </Container>
    </header>
  );
}
