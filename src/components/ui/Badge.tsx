import type { ReactNode } from "react";

type Tone = "neutral" | "accent" | "active" | "exploring" | "completed" | "paused";

const tones: Record<Tone, string> = {
  neutral: "bg-surface text-ink-muted border-line",
  accent: "bg-accent-soft text-accent border-transparent",
  active: "bg-status-active-soft text-status-active border-transparent",
  exploring:
    "bg-status-exploring-soft text-status-exploring border-transparent",
  completed:
    "bg-status-completed-soft text-status-completed border-transparent",
  paused: "bg-status-paused-soft text-status-paused border-transparent",
};

export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: Tone;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[0.6875rem] font-medium tracking-wide uppercase ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
