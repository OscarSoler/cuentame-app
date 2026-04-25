import { getPillarsSpentAction } from "@/core/transaction/presentation/transaction.actions";
import { unwrap } from "@/core/_shared/action";
import { buildPillars } from "../../lib/presenters";
import { PillarsRow } from "../pillars-row";

interface PillarsSectionProps {
  ledgerId: string;
  year: number;
  month: number;
  isBusiness: boolean;
}

export async function PillarsSection({
  ledgerId,
  year,
  month,
  isBusiness,
}: PillarsSectionProps) {
  const rows = unwrap(await getPillarsSpentAction(ledgerId, year, month), []);
  const spentByKey = Object.fromEntries(rows.map((p) => [p.pillar, p.spent]));
  return <PillarsRow pillars={buildPillars(isBusiness, spentByKey)} isBusiness={isBusiness} />;
}
