import { Badge } from "@/components/ui/Badge";

type Status = "exploring" | "active" | "completed" | "paused";

/**
 * Status labels are deliberately literal (spec §4.5, §55): the site must never
 * imply a result, a manuscript, or a publication that does not exist.
 */
const labels: Record<Status, string> = {
  exploring: "Exploratory research",
  active: "Active research",
  completed: "Completed",
  paused: "Paused",
};

export function ResearchStatus({ status }: { status: Status }) {
  return <Badge tone={status}>{labels[status]}</Badge>;
}

export const researchStatusLabel = (status: Status) => labels[status];
