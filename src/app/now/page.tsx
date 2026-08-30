import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { formatDate } from "@/lib/format";
import { pageMetadata } from "@/lib/metadata";
import { now } from "@/lib/now";

export const metadata: Metadata = pageMetadata({
  title: "Now",
  description: `What Emmanuel Alabi is studying, building, and researching as of ${now.period}.`,
  path: "/now",
});

function List({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <section className="border-line border-t py-7">
      <h2 className="text-ink-subtle mb-3 text-xs font-medium tracking-wider uppercase">
        {title}
      </h2>
      <ul className="space-y-1.5 text-[0.9375rem]">
        {items.map((item) => (
          <li key={item} className="text-ink">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function NowPage() {
  return (
    <Container width="prose">
      <PageHeader
        eyebrow={now.period}
        title="Currently"
        lead="A short snapshot of what I am actually working on, updated about monthly. For the technical details, including what was tried and what failed, see the research log."
      />

      <List title="Studying" items={now.studying} />
      <List title="Building" items={now.building} />
      <List title="Recently completed" items={now.recentlyCompleted ?? []} />

      <section className="border-line border-t py-7">
        <h2 className="text-ink-subtle mb-3 text-xs font-medium tracking-wider uppercase">
          Research
        </h2>
        <p className="text-ink text-[0.9375rem] leading-relaxed">
          {now.research}
        </p>
      </section>

      <section className="border-line border-t py-7">
        <h2 className="text-ink-subtle mb-3 text-xs font-medium tracking-wider uppercase">
          Next
        </h2>
        <p className="text-ink text-[0.9375rem] leading-relaxed">{now.next}</p>
      </section>

      <div className="border-line text-ink-subtle border-t py-7 text-sm">
        <p>Last updated {formatDate(now.updated)}.</p>
        <p className="mt-2">
          <Link
            href="/research"
            className="text-accent underline underline-offset-4"
          >
            Research direction
          </Link>
          {" · "}
          <Link href="/log" className="text-accent underline underline-offset-4">
            Research log
          </Link>
        </p>
      </div>
    </Container>
  );
}
