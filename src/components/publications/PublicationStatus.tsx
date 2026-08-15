import { Badge } from "@/components/ui/Badge";

type Status =
  | "manuscript"
  | "preprint"
  | "submitted"
  | "accepted"
  | "published";

/**
 * Publication status must be unambiguous (spec §9, §17): a manuscript is never
 * allowed to read as peer-reviewed work.
 */
const labels: Record<Status, string> = {
  manuscript: "Manuscript in preparation",
  preprint: "Preprint — not peer reviewed",
  submitted: "Submitted — under review",
  accepted: "Accepted",
  published: "Published — peer reviewed",
};

const tones: Record<Status, "neutral" | "accent" | "exploring" | "completed"> = {
  manuscript: "neutral",
  preprint: "exploring",
  submitted: "exploring",
  accepted: "completed",
  published: "completed",
};

export function PublicationStatus({ status }: { status: Status }) {
  return <Badge tone={tones[status]}>{labels[status]}</Badge>;
}
