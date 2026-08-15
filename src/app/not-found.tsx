import Link from "next/link";

import { Container } from "@/components/layout/Container";

export default function NotFound() {
  return (
    <Container width="prose">
      <div className="py-28">
        <p className="text-ink-subtle text-xs font-medium tracking-wider uppercase">
          404
        </p>
        <h1 className="text-ink mt-3 font-serif text-3xl font-semibold tracking-tight">
          Page not found
        </h1>
        <p className="text-ink-muted mt-4 leading-relaxed">
          This page does not exist, or it was a draft that has not been
          published.
        </p>
        <ul className="mt-8 space-y-2 text-[0.9375rem]">
          <li>
            <Link
              href="/research"
              className="text-accent underline underline-offset-4"
            >
              Research
            </Link>
          </li>
          <li>
            <Link
              href="/writing"
              className="text-accent underline underline-offset-4"
            >
              Writing
            </Link>
          </li>
          <li>
            <Link href="/" className="text-accent underline underline-offset-4">
              Home
            </Link>
          </li>
        </ul>
      </div>
    </Container>
  );
}
