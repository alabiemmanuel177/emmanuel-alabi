import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { getProjects } from "@/lib/content/loader";
import { label } from "@/lib/format";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Projects",
  description:
    "Implementations, engineering systems, robotics tooling, and experimental libraries by Emmanuel Alabi.",
  path: "/projects",
});

export default function ProjectsPage() {
  const projects = getProjects();

  const groups = Array.from(
    projects.reduce((map, entry) => {
      const key = entry.frontmatter.type;
      map.set(key, [...(map.get(key) ?? []), entry]);
      return map;
    }, new Map<string, typeof projects>()),
  );

  return (
    <Container>
      <PageHeader
        title="Projects"
        lead="Technical work that is not formal research: implementations built to understand something, engineering systems, tooling, and experiments. Depth matters more than count."
      />

      <div className="space-y-14 py-14">
        {groups.length > 0 ? (
          groups.map(([type, entries]) => (
            <section key={type}>
              <h2 className="text-ink-subtle mb-6 text-xs font-medium tracking-wider uppercase">
                {label(type)}
              </h2>
              <div className="grid gap-5 sm:grid-cols-2">
                {entries.map((entry) => (
                  <ProjectCard
                    key={entry.frontmatter.slug}
                    item={entry.frontmatter}
                  />
                ))}
              </div>
            </section>
          ))
        ) : (
          <EmptyState>
            <p>
              No projects are published yet. Only genuinely completed or active
              technical work appears here; the list is not padded to look
              fuller than it is.
            </p>
            <p className="mt-3">
              The direction this work is taking is described under{" "}
              <Link href="/research" className="text-accent underline">
                Research
              </Link>
              .
            </p>
          </EmptyState>
        )}
      </div>
    </Container>
  );
}
