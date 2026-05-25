import { redirect } from "next/navigation";
import { getUserLedgersAction } from "@/core/ledger/presentation/ledger.actions";
import { getCreditScoreAction } from "@/core/credit-score/presentation/credit-score.actions";
import { isLedgerType } from "@/lib/ledger/types";
import { readStoredLedgerType } from "@/lib/ledger/preference.server";
import { ReportHeader } from "./components/report-header";
import { IndicatorsCard } from "./components/indicators-card";
import { UsageCard } from "./components/usage-card";
import { RiskEvaluation } from "./components/risk-evaluation";

interface CreditReportPageProps {
  searchParams?: Promise<{ ledger?: string; window?: string }>;
}

export default async function CreditReportPage({
  searchParams,
}: CreditReportPageProps) {
  const params = (await searchParams) ?? {};

  const ledgersResult = await getUserLedgersAction();
  if (!ledgersResult.success || ledgersResult.data.length === 0) {
    redirect("/");
  }
  const ledgers = ledgersResult.data;

  const storedType = await readStoredLedgerType();
  const requestedType = isLedgerType(params.ledger)
    ? params.ledger
    : (storedType ?? "business");
  const activeLedger =
    ledgers.find((l) => l.type === requestedType) ??
    ledgers.find((l) => l.type === "business") ??
    ledgers[0];

  const windowMonths = Number.isFinite(Number(params.window))
    ? Number(params.window)
    : 6;

  const scoreResult = await getCreditScoreAction(activeLedger.id, windowMonths);

  if (!scoreResult.success) {
    return (
      <div className="px-4 py-6">
        <p className="text-sm text-destructive">{scoreResult.error}</p>
      </div>
    );
  }

  const { business, indicators, usage, evaluation } = scoreResult.data;

  return (
    <div className="px-4 py-6 space-y-6 pb-20">
      <ReportHeader
        nombreNegocio={business.nombreNegocio}
        tipoNegocio={business.tipoNegocio}
        antiguedadMeses={business.antiguedadMeses}
        ventasUltimoAnio={business.ventasUltimoAnio}
      />

      <IndicatorsCard
        ventasPromedioMensuales={indicators.ventasPromedioMensuales}
        margenOperativoPct={indicators.margenOperativoPct}
        evaluation={evaluation}
      />

      <UsageCard
        scoreConsistenciaDias={usage.scoreConsistenciaDias}
        scoreConsistenciaTotal={usage.scoreConsistenciaTotal}
        registrosDiariosPromedio={usage.registrosDiariosPromedio}
        ventasDiariasPromedio={usage.ventasDiariasPromedio}
      />

      <RiskEvaluation
        utilidadMensualPromedio={indicators.utilidadMensualPromedio}
        cuotaSugeridaMin={indicators.cuotaSugeridaMin}
        cuotaSugeridaMax={indicators.cuotaSugeridaMax}
        margenOperativoPct={indicators.margenOperativoPct}
        antiguedadMeses={business.antiguedadMeses}
        riesgoGlobal={evaluation.riesgoGlobal}
      />
    </div>
  );
}
