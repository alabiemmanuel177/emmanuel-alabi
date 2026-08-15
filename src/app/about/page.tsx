import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { education } from "@/lib/cv";
import { engineeringSummary, engineeringSystems } from "@/lib/engineering";
import { pageMetadata } from "@/lib/metadata";
import { researchProfile } from "@/lib/research-profile";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Emmanuel Alabi — software engineer working toward AI and robotics research. Background, research interests, current focus, and education.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <Container width="prose">
      <PageHeader title="About" />

      <div className="prose-research py-12">
        <p>
          I am a software engineer working toward research in artificial
          intelligence and robotics. My interest is in systems that have to
          operate in the physical world: agents that perceive an environment,
          build some representation of it, reason about what to do, and then act
          — where being wrong has consequences that a benchmark score does not
          capture.
        </p>

        <p>
          I came to this from building software rather than from a research
          group, and I am explicit about what that means. Engineering gave me the
          ability to build and operate non-trivial systems, which is most of what
          an experimental pipeline turns out to be. It did not give me the
          mathematical and methodological preparation that research requires, so
          I am building that deliberately and in public — implementations I
          wrote, experiments I ran, and notes on the parts I got wrong.
        </p>

        <p>
          This site is the record of that. It is intentionally sparse rather than
          padded: everything on it should lead to code, an experiment, or a
          document you can check.
        </p>

        <h2>Research interests</h2>

        <p>
          These are the areas I am currently exploring. They are interests rather
          than claims of expertise, and I expect them to narrow as the work gives
          me a reason to narrow them.
        </p>

        <dl>
          {researchProfile.currentFocus.map((area) => (
            <div key={area.title} className="mt-4">
              <dt className="text-ink font-medium">{area.title}</dt>
              <dd className="text-ink-muted mt-1">{area.description}</dd>
            </div>
          ))}
        </dl>

        <p className="text-ink-muted text-sm">
          Adjacent territory I read in but am not yet focused on:{" "}
          {researchProfile.broaderInterests.join(", ").toLowerCase()}.
        </p>

        <h2>Current focus</h2>

        <p>
          My current work is the foundational phase of a research programme
          beginning in August 2026: mathematics for intelligent systems, state
          estimation and rigid-body geometry, machine learning implemented from
          first principles, and reproductions of published baselines in
          perception and navigation. The intent is to reach the point where I can
          formulate a research question precisely enough to answer it with
          controlled experiments.
        </p>

        <p>
          For what I am working on this month specifically, see{" "}
          <Link href="/now">what I&rsquo;m doing now</Link>. For the programme
          itself — how I intend to work, and what will be published — see{" "}
          <Link href="/research">Research</Link>.
        </p>

        <h2>Engineering background</h2>

        <p>{engineeringSummary}</p>

        {engineeringSystems.length > 0 ? (
          <ul>
            {engineeringSystems.map((system) => (
              <li key={system.name}>
                <strong>{system.name}</strong>
                {system.role ? ` (${system.role})` : ""} — {system.contribution}
              </li>
            ))}
          </ul>
        ) : null}

        <p>
          The detailed history is on the <Link href="/cv">CV</Link>.
        </p>

        <h2>Education</h2>

        {education.length > 0 ? (
          <ul>
            {education.map((item) => (
              <li key={item.institution}>
                <strong>{item.institution}</strong>
                {item.period ? ` · ${item.period}` : ""}
                <br />
                {item.qualification}
                {item.location ? (
                  <>
                    <br />
                    <span className="text-ink-muted text-sm">
                      {item.location}
                    </span>
                  </>
                ) : null}
                {item.coursework && item.coursework.length > 0 ? (
                  <>
                    <br />
                    <span className="text-ink-muted text-sm">
                      Relevant coursework: {item.coursework.join("; ")}.
                    </span>
                  </>
                ) : null}
              </li>
            ))}
          </ul>
        ) : null}

        <h2>Contact</h2>

        <p>
          I am interested in research collaborations involving embodied AI, robot
          perception, autonomous systems, and multimodal learning. Contact
          details are on the <Link href="/contact">contact page</Link>.
        </p>
      </div>
    </Container>
  );
}
