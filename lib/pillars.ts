import type { IconSvgElement } from "@hugeicons/react";
import {
  SparklesIcon,
  FlowerPotIcon,
  Book01Icon,
  Coins01Icon,
  Building01Icon,
  ChartLineData01Icon,
  Package01Icon,
  Alert02Icon,
} from "@hugeicons/core-free-icons";
import type {
  PersonalPillar,
  BusinessPillar,
  TransactionPillar,
} from "@/core/transaction/domain/transaction.entity";

export interface PillarMeta {
  key: TransactionPillar;
  label: string;
  icon: IconSvgElement;
  color: string;
}

const PERSONAL_META: Record<PersonalPillar, PillarMeta> = {
  survival: { key: "survival", label: "Supervivencia", icon: SparklesIcon, color: "#2D5016" },
  optional: { key: "optional", label: "Opcional", icon: FlowerPotIcon, color: "#8B9E7C" },
  culture: { key: "culture", label: "Cultura", icon: Book01Icon, color: "#D4A574" },
  extras: { key: "extras", label: "Extras", icon: Coins01Icon, color: "#A67B5B" },
};

const BUSINESS_META: Record<BusinessPillar, PillarMeta> = {
  operacion: { key: "operacion", label: "Operación", icon: Building01Icon, color: "#2D5016" },
  inversion: { key: "inversion", label: "Inversión", icon: ChartLineData01Icon, color: "#8B9E7C" },
  variable: { key: "variable", label: "Variable", icon: Package01Icon, color: "#D4A574" },
  imprevisto: { key: "imprevisto", label: "Imprevisto", icon: Alert02Icon, color: "#A67B5B" },
};

export const PILLAR_META: Record<TransactionPillar, PillarMeta> = {
  ...PERSONAL_META,
  ...BUSINESS_META,
};

export function getPillarMetaFor(isBusiness: boolean): PillarMeta[] {
  return Object.values(isBusiness ? BUSINESS_META : PERSONAL_META);
}
