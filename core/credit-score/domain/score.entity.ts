export type Rating = "alto" | "medio" | "bajo" | "excelente" | "bueno" | "medio-bajo" | "media-baja";

export interface QualitativeEvaluation {
  flujoDiario: Rating;
  rotacion: Rating;
  riesgoOperativo: Rating;
  margen: Rating;
  capacidadPago: Rating;
  formalizacion: Rating;
  potencialCrecimiento: Rating;
  riesgoGlobal: Rating;
}

export interface FinancialIndicators {
  ventasPromedioMensuales: number;
  margenOperativoPct: number;
  utilidadMensualPromedio: number;
  cuotaSugeridaMin: number;
  cuotaSugeridaMax: number;
}

export interface UsageIndicators {
  scoreConsistenciaDias: number;
  scoreConsistenciaTotal: number;
  registrosDiariosPromedio: number;
  ventasDiariasPromedio: number;
}

export interface BusinessProfile {
  nombreNegocio: string | null;
  tipoNegocio: string | null;
  antiguedadMeses: number;
  ventasUltimoAnio: number;
}

export interface CreditScoreConfig {
  business: BusinessProfile;
  indicators: FinancialIndicators;
  usage: UsageIndicators;
  evaluation: QualitativeEvaluation;
  windowMonths: number;
  generatedAt: Date;
}

export class CreditScore {
  readonly business: BusinessProfile;
  readonly indicators: FinancialIndicators;
  readonly usage: UsageIndicators;
  readonly evaluation: QualitativeEvaluation;
  readonly windowMonths: number;
  readonly generatedAt: Date;

  constructor(config: CreditScoreConfig) {
    this.business = config.business;
    this.indicators = config.indicators;
    this.usage = config.usage;
    this.evaluation = config.evaluation;
    this.windowMonths = config.windowMonths;
    this.generatedAt = config.generatedAt;
  }
}
