import { formatDate } from "@/lib/format";
import type { Experiment } from "@/lib/content/schemas";

/**
 * Experiment log rendering (spec §16).
 *
 * Wide on desktop, stacked on mobile — a research table must stay readable at
 * 375px rather than force a horizontal page scroll (spec §37).
 */
export function ExperimentTable({ experiments }: { experiments: Experiment[] }) {
  return (
    <ol className="border-line divide-line divide-y border-y">
      {experiments.map((exp) => (
        <li key={exp.id} className="py-7">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="text-ink font-mono text-sm font-semibold">
              {exp.id}
            </h3>
            <span className="text-ink-subtle text-xs">
              {formatDate(exp.date)}
            </span>
          </div>

          <dl className="mt-4 grid gap-x-8 gap-y-3 text-sm sm:grid-cols-[max-content_1fr]">
            <dt className="text-ink-subtle">Hypothesis</dt>
            <dd className="text-ink mb-1 leading-relaxed sm:mb-0">
              {exp.hypothesis}
            </dd>

            {exp.baseline ? (
              <>
                <dt className="text-ink-subtle">Baseline</dt>
                <dd className="text-ink mb-1 sm:mb-0">{exp.baseline}</dd>
              </>
            ) : null}

            {Object.keys(exp.configuration).length > 0 ? (
              <>
                <dt className="text-ink-subtle">Configuration</dt>
                <dd className="text-ink mb-1 sm:mb-0">
                  <ul className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs">
                    {Object.entries(exp.configuration).map(([key, value]) => (
                      <li key={key} className="text-ink-muted">
                        {key}=<span className="text-ink">{value}</span>
                      </li>
                    ))}
                  </ul>
                </dd>
              </>
            ) : null}

            {Object.keys(exp.metrics).length > 0 ? (
              <>
                <dt className="text-ink-subtle">Metrics</dt>
                <dd className="text-ink mb-1 sm:mb-0">
                  <ul className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs tabular-nums">
                    {Object.entries(exp.metrics).map(([key, value]) => (
                      <li key={key} className="text-ink-muted">
                        {key}=<span className="text-ink">{value}</span>
                      </li>
                    ))}
                  </ul>
                </dd>
              </>
            ) : null}

            <dt className="text-ink-subtle">Result</dt>
            <dd className="text-ink mb-1 leading-relaxed sm:mb-0">
              {exp.result}
            </dd>

            {exp.observations ? (
              <>
                <dt className="text-ink-subtle">Observations</dt>
                <dd className="text-ink-muted mb-1 leading-relaxed sm:mb-0">
                  {exp.observations}
                </dd>
              </>
            ) : null}

            {exp.reproduce ? (
              <>
                <dt className="text-ink-subtle">Reproduce</dt>
                <dd className="text-ink-muted font-mono text-xs break-all">
                  {exp.reproduce}
                </dd>
              </>
            ) : null}
          </dl>
        </li>
      ))}
    </ol>
  );
}
