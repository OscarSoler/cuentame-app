import { Ledger } from "@/core/ledger/domain/ledger.entity";
import { LedgerRepository } from "@/core/ledger/domain/ledger.repository";
import { TransactionRepository } from "@/core/transaction/domain/transaction.repository";
import {
  BusinessProfile,
  CreditScore,
  FinancialIndicators,
  QualitativeEvaluation,
  Rating,
  UsageIndicators,
} from "../domain/score.entity";

interface CalculateScoreConfig {
  ledgerRepository: LedgerRepository;
  transactionRepository: TransactionRepository;
}

interface CalculateScoreInput {
  ledgerId: string;
  windowMonths?: number;
}

const CONSISTENCY_WINDOW_DAYS = 7;
const CUOTA_MIN_RATIO = 0.085;
const CUOTA_MAX_RATIO = 0.17;

export class CalculateScore {
  constructor(private readonly config: CalculateScoreConfig) {}

  async execute(input: CalculateScoreInput): Promise<CreditScore> {
    const windowMonths = input.windowMonths ?? 6;
    const ledger = await this.config.ledgerRepository.getById(input.ledgerId);
    if (!ledger) throw new Error("Ledger no encontrado");

    const today = new Date();
    const fromDate = isoDate(addMonths(today, -windowMonths));
    const toDate = isoDate(today);
    const yearAgo = isoDate(addMonths(today, -12));

    const [windowSummary, yearSummary, oldestDate, activeDates] =
      await Promise.all([
        this.config.transactionRepository.getRangeSummary(
          ledger.id,
          fromDate,
          toDate,
        ),
        this.config.transactionRepository.getRangeSummary(
          ledger.id,
          yearAgo,
          toDate,
        ),
        this.config.transactionRepository.getOldestDate(ledger.id),
        this.config.transactionRepository.getActiveDates(
          ledger.id,
          CONSISTENCY_WINDOW_DAYS,
        ),
      ]);

    const business = this.buildBusinessProfile({
      ledger,
      oldestDate,
      ventasUltimoAnio: yearSummary.income,
    });

    const indicators = this.buildIndicators({
      windowMonths,
      income: windowSummary.income,
      expenses: windowSummary.expenses,
    });

    const usage = this.buildUsage({
      activeDaysThisWeek: activeDates.length,
      totalCount: windowSummary.totalCount,
      incomeCount: windowSummary.incomeCount,
      activeDays: windowSummary.activeDays,
    });

    const evaluation = this.buildEvaluation({
      indicators,
      usage,
      antiguedadMeses: business.antiguedadMeses,
      formalizationRatio:
        windowSummary.totalCount > 0
          ? windowSummary.taxedCount / windowSummary.totalCount
          : 0,
    });

    return new CreditScore({
      business,
      indicators,
      usage,
      evaluation,
      windowMonths,
      generatedAt: today,
    });
  }

  private buildBusinessProfile(args: {
    ledger: Ledger;
    oldestDate: string | null;
    ventasUltimoAnio: number;
  }): BusinessProfile {
    const antiguedadMeses = monthsSince(args.oldestDate ?? args.ledger.createdAt);
    return {
      nombreNegocio: args.ledger.businessName ?? args.ledger.name,
      tipoNegocio: args.ledger.businessType,
      antiguedadMeses,
      ventasUltimoAnio: args.ventasUltimoAnio,
    };
  }

  private buildIndicators(args: {
    windowMonths: number;
    income: number;
    expenses: number;
  }): FinancialIndicators {
    const ventasPromedioMensuales = args.income / args.windowMonths;
    const utilidad = args.income - args.expenses;
    const utilidadMensualPromedio = utilidad / args.windowMonths;
    const margenOperativoPct =
      args.income > 0 ? (utilidad / args.income) * 100 : 0;

    return {
      ventasPromedioMensuales,
      margenOperativoPct,
      utilidadMensualPromedio,
      cuotaSugeridaMin: Math.max(0, utilidadMensualPromedio * CUOTA_MIN_RATIO),
      cuotaSugeridaMax: Math.max(0, utilidadMensualPromedio * CUOTA_MAX_RATIO),
    };
  }

  private buildUsage(args: {
    activeDaysThisWeek: number;
    totalCount: number;
    incomeCount: number;
    activeDays: number;
  }): UsageIndicators {
    const registrosDiariosPromedio =
      args.activeDays > 0 ? args.totalCount / args.activeDays : 0;
    const ventasDiariasPromedio =
      args.activeDays > 0 ? args.incomeCount / args.activeDays : 0;

    return {
      scoreConsistenciaDias: Math.min(
        args.activeDaysThisWeek,
        CONSISTENCY_WINDOW_DAYS,
      ),
      scoreConsistenciaTotal: CONSISTENCY_WINDOW_DAYS,
      registrosDiariosPromedio,
      ventasDiariasPromedio,
    };
  }

  private buildEvaluation(args: {
    indicators: FinancialIndicators;
    usage: UsageIndicators;
    antiguedadMeses: number;
    formalizationRatio: number;
  }): QualitativeEvaluation {
    const flujoDiario = rateRange(args.usage.ventasDiariasPromedio, [10, 30]);
    const rotacion = rateRotation(args.usage.registrosDiariosPromedio);
    const margen = rateRange(args.indicators.margenOperativoPct, [15, 30]);
    const capacidadPago = rateCapacidad(args.indicators.utilidadMensualPromedio);
    const formalizacion = rateFormalizacion(args.formalizationRatio);
    const consistenciaRatio =
      args.usage.scoreConsistenciaDias / args.usage.scoreConsistenciaTotal;
    const riesgoOperativo = rateRiesgoOperativo(consistenciaRatio, args.antiguedadMeses);
    const potencialCrecimiento = ratePotencial(
      args.indicators.margenOperativoPct,
      args.antiguedadMeses,
    );
    const riesgoGlobal = rateRiesgoGlobal({
      margen,
      capacidadPago,
      consistenciaRatio,
      antiguedadMeses: args.antiguedadMeses,
    });

    return {
      flujoDiario,
      rotacion,
      riesgoOperativo,
      margen,
      capacidadPago,
      formalizacion,
      potencialCrecimiento,
      riesgoGlobal,
    };
  }
}

function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function addMonths(d: Date, delta: number): Date {
  const result = new Date(d);
  result.setMonth(result.getMonth() + delta);
  return result;
}

function monthsSince(date: Date | string | null): number {
  if (!date) return 0;
  const start = typeof date === "string" ? new Date(date) : date;
  const diffMs = Date.now() - start.getTime();
  return Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24 * 30)));
}

function rateRange(value: number, thresholds: [number, number]): Rating {
  if (value >= thresholds[1]) return "alto";
  if (value >= thresholds[0]) return "medio";
  return "bajo";
}

function rateRotation(registrosDiarios: number): Rating {
  if (registrosDiarios >= 30) return "excelente";
  if (registrosDiarios >= 15) return "alto";
  if (registrosDiarios >= 5) return "medio";
  return "bajo";
}

function rateCapacidad(utilidadMensual: number): Rating {
  if (utilidadMensual >= 3_000_000) return "alto";
  if (utilidadMensual >= 1_000_000) return "bueno";
  if (utilidadMensual >= 300_000) return "medio";
  return "bajo";
}

function rateFormalizacion(ratio: number): Rating {
  if (ratio >= 0.6) return "alto";
  if (ratio >= 0.3) return "medio";
  if (ratio > 0) return "media-baja";
  return "bajo";
}

function rateRiesgoOperativo(consistenciaRatio: number, antiguedadMeses: number): Rating {
  if (consistenciaRatio >= 0.7 && antiguedadMeses >= 12) return "bajo";
  if (consistenciaRatio >= 0.4 || antiguedadMeses >= 6) return "medio";
  return "alto";
}

function ratePotencial(margenPct: number, antiguedadMeses: number): Rating {
  if (margenPct >= 25 && antiguedadMeses >= 12) return "alto";
  if (margenPct >= 15 || antiguedadMeses >= 6) return "medio";
  return "bajo";
}

function rateRiesgoGlobal(args: {
  margen: Rating;
  capacidadPago: Rating;
  consistenciaRatio: number;
  antiguedadMeses: number;
}): Rating {
  let score = 0;
  if (args.margen === "alto") score += 2;
  else if (args.margen === "medio") score += 1;
  if (args.capacidadPago === "alto" || args.capacidadPago === "bueno") score += 2;
  else if (args.capacidadPago === "medio") score += 1;
  if (args.consistenciaRatio >= 0.6) score += 1;
  if (args.antiguedadMeses >= 12) score += 1;

  if (score >= 5) return "bajo";
  if (score >= 3) return "medio-bajo";
  if (score >= 2) return "medio";
  return "alto";
}
