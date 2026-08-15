import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { PublicationItem } from "@/components/publications/PublicationItem";
import { EmptyState } from "@/components/ui/EmptyState";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHeader } from "@/components/ui/PageHeader";
import { getPublications, groupPublications } from "@/lib/content/publications";
import { pageMetadata } from "@/lib/metadata";
import { scholarlyArticleJsonLd } from "@/lib/metadata/structured-data";

export const metadata: Metadata = pageMetadata({
  title: "Publications",
  description:
    "Papers, preprints, and manuscripts by Emmanuel Alabi, each labelled with its actual review status.",
  path: "/publications",
});

export default function PublicationsPage() {
  const publications = getPublications();
  const groups = groupPublications(publications);

  return (
    <Container>
      <PageHeader
        title="Publications"
        lead="Each entry states where the work actually is: manuscript, preprint, under review, accepted, or peer-reviewed and published. Nothing is listed above its true status."
      />

      <div className="py-14">
        {groups.length > 0 ? (
          <div className="space-y-14">
            {groups.map((group) => (
              <section key={group.status}>
                <h2 className="text-ink-subtle mb-6 text-xs font-medium tracking-wider uppercase">
                  {group.label}
                </h2>
                <div>
                  {group.items.map((item) => (
                    <PublicationItem key={item.slug} item={item} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <EmptyState>
            <p>
              I have no publications, preprints, or manuscripts under review.
              This page exists so that when there are, they appear here with an
              accurate status rather than being announced ahead of a decision.
            </p>
            <p className="mt-3">
              Current work is described under{" "}
              <Link href="/research" className="text-accent underline">
                Research
              </Link>
              .
            </p>
          </EmptyState>
        )}
      </div>

      {publications.map((item) => (
        <JsonLd key={item.slug} data={scholarlyArticleJsonLd(item)} />
      ))}
    </Container>
  );
}
