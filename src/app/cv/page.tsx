import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { LinkButton } from "@/components/ui/Button";
import { DownloadIcon } from "@/components/ui/icons";
import { getProjects, getResearch } from "@/lib/content/loader";
import { getPublications } from "@/lib/content/publications";
import { cvAvailable } from "@/lib/cv-file";
import {
  academicProjects,
  independentStudies,
  education,
  experience,
  openSource,
  researchExperience,
  skills,
} from "@/lib/cv";
import { formatDateRange } from "@/lib/format";
import { pageMetadata } from "@/lib/metadata";
import { profileLinks, site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "CV",
  description: `Academic CV for ${site.name}: research interests, education, projects, engineering experience, and technical skills.`,
  path: "/cv",
});

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-line border-t py-8">
      <h2 className="text-ink-subtle mb-5 text-xs font-medium tracking-wider uppercase">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function CvPage() {
  const research = getResearch();
  const projects = getProjects();
  const publications = getPublications();
  const pdfAvailable = cvAvailable();

  return (
    <Container width="prose">
      <header className="pt-14 pb-8">
        <h1 className="text-ink font-serif text-3xl font-semibold tracking-tight">
          {site.name}
        </h1>
        <p className="text-ink-muted mt-2">{site.title}</p>

        <ul className="text-ink-muted mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm">
          <li>
            <a
              href={`mailto:${site.email}`}
              className="hover:text-ink underline underline-offset-4"
            >
              {site.email}
            </a>
          </li>
          {profileLinks().map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="hover:text-ink underline underline-offset-4"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          {pdfAvailable ? (
            <LinkButton href={site.cv.path} variant="primary" download>
              <DownloadIcon />
              Download academic CV (PDF)
            </LinkButton>
          ) : null}
          <span className="text-ink-subtle text-xs">
            {site.cv.version} · Updated {site.cv.updated}
          </span>
        </div>
      </header>

      <Section title="Research interests">
        <ul className="space-y-2 text-[0.9375rem]">
          {site.researchInterests.map((interest) => (
            <li key={interest.title}>
              <span className="text-ink font-medium">{interest.title}</span>
              <span className="text-ink-muted">: {interest.description}</span>
            </li>
          ))}
        </ul>
      </Section>

      {education.length > 0 ? (
        <Section title="Education">
          <ul className="space-y-5">
            {education.map((item) => (
              <li key={item.institution}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="text-ink font-medium">{item.institution}</h3>
                  {item.period ? (
                    <span className="text-ink-subtle text-sm">
                      {item.period}
                    </span>
                  ) : null}
                </div>
                <p className="text-ink-muted text-[0.9375rem]">
                  {item.qualification}
                  {item.grade ? ` · ${item.grade}` : ""}
                </p>
                {item.coursework && item.coursework.length > 0 ? (
                  <p className="text-ink-subtle mt-1 text-sm">
                    Relevant coursework: {item.coursework.join(", ")}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {researchExperience.length > 0 ? (
        <Section title="Research experience">
          <ul className="space-y-5">
            {researchExperience.map((item) => (
              <li key={`${item.organisation}-${item.role}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="text-ink font-medium">
                    {item.role}, {item.organisation}
                  </h3>
                  <span className="text-ink-subtle text-sm">{item.period}</span>
                </div>
                <p className="text-ink-muted mt-1 text-[0.9375rem]">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {independentStudies.length > 0 ? (
        <Section title="Independent Research &amp; Reproduction Studies">
          <ul className="space-y-6">
            {independentStudies.map((item) => (
              <li key={item.title}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="text-ink font-medium">
                    {item.url ? (
                      <Link href={item.url} className="hover:text-accent">
                        {item.title}
                      </Link>
                    ) : (
                      item.title
                    )}
                  </h3>
                  <span className="text-ink-subtle text-sm">{item.period}</span>
                </div>
                <p className="text-ink-muted mt-0.5 text-sm">{item.context}</p>
                <ul className="text-ink-muted mt-2 list-disc space-y-1 pl-5 text-[0.9375rem]">
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
                {item.github ? (
                  <p className="text-ink-subtle mt-1.5 font-mono text-xs break-all">
                    {item.github}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {academicProjects.length > 0 ? (
        <Section title="Selected Academic Projects">
          <ul className="space-y-6">
            {academicProjects.map((item) => (
              <li key={item.title}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="text-ink font-medium">
                    {item.url ? (
                      <Link href={item.url} className="hover:text-accent">
                        {item.title}
                      </Link>
                    ) : (
                      item.title
                    )}
                  </h3>
                  <span className="text-ink-subtle text-sm">{item.period}</span>
                </div>
                <p className="text-ink-muted mt-0.5 text-sm">{item.context}</p>
                <ul className="text-ink-muted mt-2 list-disc space-y-1 pl-5 text-[0.9375rem]">
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {research.length > 0 ? (
        <Section title="Research">
          <ul className="space-y-4">
            {research.map(({ frontmatter: item }) => (
              <li key={item.slug}>
                <h3 className="text-ink font-medium">
                  <Link
                    href={`/research/${item.slug}`}
                    className="hover:text-accent"
                  >
                    {item.title}
                  </Link>
                </h3>
                <p className="text-ink-subtle text-sm">
                  {formatDateRange(item.startDate, item.endDate)} ·{" "}
                  {item.researchAreas.join(", ")}
                </p>
                <p className="text-ink-muted mt-1 text-[0.9375rem]">
                  {item.summary}
                </p>
                <p className="text-ink-subtle mt-1 font-mono text-xs break-all">
                  {site.url.replace(/^https?:\/\//, "")}/research/{item.slug}
                  {item.github ? ` · ${item.github}` : ""}
                </p>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {publications.length > 0 ? (
        <Section title="Publications">
          <ul className="space-y-3">
            {publications.map((item) => (
              <li key={item.slug} className="text-[0.9375rem]">
                <span className="text-ink">{item.authors.join(", ")}</span>.{" "}
                <span className="text-ink font-medium">{item.title}</span>.{" "}
                {item.venue ? <em>{item.venue}</em> : null} {item.year}.{" "}
                <span className="text-ink-subtle">[{item.status}]</span>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {projects.length > 0 ? (
        <Section title="Selected projects">
          <ul className="space-y-4">
            {projects.map(({ frontmatter: item }) => (
              <li key={item.slug}>
                <h3 className="text-ink font-medium">
                  <Link
                    href={`/projects/${item.slug}`}
                    className="hover:text-accent"
                  >
                    {item.title}
                  </Link>
                </h3>
                <p className="text-ink-muted mt-0.5 text-[0.9375rem]">
                  {item.summary}
                </p>
                {item.github ? (
                  <p className="text-ink-subtle mt-1 font-mono text-xs break-all">
                    {item.github}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {experience.length > 0 ? (
        <Section title="Engineering experience">
          <ul className="space-y-6">
            {experience.map((item) => (
              <li key={`${item.organisation}-${item.role}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="text-ink font-medium">
                    {item.role}, {item.organisation}
                  </h3>
                  <span className="text-ink-subtle text-sm">{item.period}</span>
                </div>
                <ul className="text-ink-muted mt-2 list-disc space-y-1 pl-5 text-[0.9375rem]">
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
                {item.technologies && item.technologies.length > 0 ? (
                  <p className="text-ink-subtle mt-2 font-mono text-xs">
                    {item.technologies.join(" · ")}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {openSource.length > 0 ? (
        <Section title="Open source">
          <ul className="space-y-4">
            {openSource.map((item) => (
              <li key={`${item.organisation}-${item.role}`}>
                <h3 className="text-ink font-medium">{item.organisation}</h3>
                <ul className="text-ink-muted mt-1 list-disc space-y-1 pl-5 text-[0.9375rem]">
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {skills.length > 0 ? (
        <Section title="Technical skills">
          <dl className="space-y-2 text-[0.9375rem]">
            {skills.map((group) => (
              <div key={group.group} className="sm:flex sm:gap-4">
                <dt className="text-ink-subtle sm:w-40 sm:shrink-0">
                  {group.group}
                </dt>
                <dd className="text-ink">{group.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </Section>
      ) : null}

      <div className="border-line text-ink-subtle border-t py-8 text-sm">
        {pdfAvailable ? (
          <p>
            {site.cv.version}, updated {site.cv.updated}. The PDF is the
            canonical version:{" "}
            <a
              href={site.cv.path}
              download
              className="text-accent underline underline-offset-4"
            >
              download it here
            </a>
            .
          </p>
        ) : (
          <p>
            A PDF version is not yet available for download. Until it is, this
            page is the current CV, or{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-accent underline underline-offset-4"
            >
              email me
            </a>{" "}
            for a copy.
          </p>
        )}
      </div>
    </Container>
  );
}
