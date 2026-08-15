import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ResearchCard } from "@/components/research/ResearchCard";
import { ArticleCard } from "@/components/writing/ArticleCard";
import { LinkButton } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { DownloadIcon } from "@/components/ui/icons";
import { featured, getProjects, getResearch, getWriting } from "@/lib/content/loader";
import { cvAvailable } from "@/lib/cv-file";
import { engineeringSummary, engineeringSystems } from "@/lib/engineering";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: `${site.name} — ${site.title}`,
  },
  description: site.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const research = getResearch();
  const currentResearch = (
    featured(research).length > 0 ? featured(research) : research
  ).slice(0, 3);

  const projects = (() => {
    const all = getProjects();
    const highlighted = featured(all);
    return (highlighted.length > 0 ? highlighted : all).slice(0, 4);
  })();

  const notes = getWriting().slice(0, 3);

  return (
    <>
      {/* Hero (spec §7) */}
      <section className="border-line border-b">
        <Container>
          <div className="max-w-2xl py-16 sm:py-24">
            <h1 className="text-ink font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
              {site.name}
            </h1>
            <p className="text-ink-muted mt-3 text-lg">{site.title}</p>

            <p className="text-ink mt-8 text-lg leading-relaxed">
              {site.tagline}
            </p>

            <p className="text-ink-muted mt-4 text-[0.9375rem] leading-relaxed">
              My current work combines a software-engineering background with
              deeper study and experimentation in machine learning, robotics,
              mathematical foundations, and autonomous systems.
            </p>

            <p className="text-ink-subtle mt-6 text-sm">{site.interestLine}</p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <LinkButton href="/research" variant="primary">
                View research
              </LinkButton>
              {cvAvailable() ? (
                <LinkButton href={site.cv.path} download>
                  <DownloadIcon />
                  Download CV
                </LinkButton>
              ) : (
                <LinkButton href="/cv">CV</LinkButton>
              )}
              {site.links.github ? (
                <LinkButton href={site.links.github} variant="quiet">
                  GitHub
                </LinkButton>
              ) : null}
            </div>
          </div>
        </Container>
      </section>

      {/* Current research (spec §8) */}
      <section className="py-16">
        <Container>
          <SectionHeader
            title="Current research"
            description="Work in progress. Status labels describe maturity honestly — exploratory work is labelled as such."
            href="/research"
          />
          {currentResearch.length > 0 ? (
            <div>
              {currentResearch.map((entry) => (
                <ResearchCard
                  key={entry.frontmatter.slug}
                  item={entry.frontmatter}
                />
              ))}
            </div>
          ) : (
            <EmptyState>
              No research entries are published yet. The{" "}
              <Link href="/research" className="text-accent underline">
                research page
              </Link>{" "}
              describes the direction this work is taking.
            </EmptyState>
          )}
        </Container>
      </section>

      {/* Research interests (spec §62) */}
      <section className="border-line border-t py-16">
        <Container>
          <SectionHeader
            title="Research interests"
            description="These are interests, not claims of expertise."
            href="/about"
            linkLabel="More about me"
          />
          <dl className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
            {site.researchInterests.map((interest) => (
              <div key={interest.title}>
                <dt className="text-ink font-medium">{interest.title}</dt>
                <dd className="text-ink-muted mt-1.5 text-[0.9375rem] leading-relaxed">
                  {interest.description}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Selected projects (spec §10) */}
      {projects.length > 0 ? (
        <section className="border-line border-t py-16">
          <Container>
            <SectionHeader
              title="Selected projects"
              description="Implementations, engineering systems, and experimental work — distinct from formal research."
              href="/projects"
            />
            <div className="grid gap-5 sm:grid-cols-2">
              {projects.map((entry) => (
                <ProjectCard
                  key={entry.frontmatter.slug}
                  item={entry.frontmatter}
                />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {/* Latest research notes (spec §11) */}
      {notes.length > 0 ? (
        <section className="border-line border-t py-16">
          <Container>
            <SectionHeader
              title="Latest research notes"
              description="Derivations, implementations, reproductions, and technical write-ups."
              href="/writing"
            />
            <div>
              {notes.map((entry) => (
                <ArticleCard
                  key={entry.frontmatter.slug}
                  item={entry.frontmatter}
                  basePath="/writing"
                  readingMinutes={entry.readingMinutes}
                />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {/* Engineering background (spec §12) — deliberately brief */}
      <section className="border-line border-t py-16">
        <Container>
          <SectionHeader title="Engineering background" />
          <p className="text-ink-muted max-w-2xl text-[0.9375rem] leading-relaxed">
            {engineeringSummary}
          </p>

          {engineeringSystems.length > 0 ? (
            <ul className="mt-8 grid gap-6 sm:grid-cols-2">
              {engineeringSystems.slice(0, 4).map((system) => (
                <li key={system.name} className="border-line border-t pt-5">
                  <h3 className="text-ink font-medium">{system.name}</h3>
                  <p className="text-ink-subtle mt-0.5 text-xs">
                    {system.context} · {system.period}
                  </p>
                  <p className="text-ink-muted mt-2 text-sm leading-relaxed">
                    {system.contribution}
                  </p>
                </li>
              ))}
            </ul>
          ) : null}

          <p className="mt-7">
            <Link
              href="/cv"
              className="text-accent text-sm underline underline-offset-4"
            >
              Full engineering history is on the CV
            </Link>
          </p>
        </Container>
      </section>
    </>
  );
}
