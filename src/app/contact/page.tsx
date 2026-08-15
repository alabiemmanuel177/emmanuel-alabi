import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { pageMetadata } from "@/lib/metadata";
import { profileLinks, site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: `Get in touch with ${site.name} about research collaborations in embodied AI, robot perception, autonomous systems, and multimodal learning.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <Container width="prose">
      <PageHeader
        title="Contact"
        lead="I am interested in research collaborations involving embodied AI, robot perception, autonomous systems, and multimodal learning."
      />

      <div className="py-12">
        <dl className="border-line divide-line divide-y border-b">
          <div className="flex flex-wrap gap-x-8 gap-y-1 py-4">
            <dt className="text-ink-subtle w-24 text-sm">Email</dt>
            <dd>
              <a
                href={`mailto:${site.email}`}
                className="text-accent underline underline-offset-4"
              >
                {site.email}
              </a>
            </dd>
          </div>

          {profileLinks().map((link) => (
            <div key={link.href} className="flex flex-wrap gap-x-8 gap-y-1 py-4">
              <dt className="text-ink-subtle w-24 text-sm">{link.label}</dt>
              <dd>
                <a
                  href={link.href}
                  target="_blank"
                  rel="me noreferrer"
                  className="text-accent underline underline-offset-4 break-all"
                >
                  {link.href.replace(/^https?:\/\//, "")}
                </a>
              </dd>
            </div>
          ))}
        </dl>

        <p className="text-ink-muted mt-8 text-[0.9375rem] leading-relaxed">
          If you are writing about a specific piece of work, a link to the
          research or project page it concerns is the fastest way to get a useful
          reply.
        </p>
      </div>
    </Container>
  );
}
