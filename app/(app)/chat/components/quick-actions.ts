import type { IconSvgElement } from "@hugeicons/react";
import {
  PiggyBankIcon,
  BulbIcon,
  ChartLineData01Icon,
  ShoppingCart01Icon,
  Coins01Icon,
  Calculator01Icon,
} from "@hugeicons/core-free-icons";
import type { LedgerType } from "@/lib/context/ledger-context";

export interface QuickAction {
  id: string;
  icon: IconSvgElement;
  title: string;
  hint: string;
  prompt: string;
  gradient: string;
  iconColor: string;
  accentRing: string;
  span: "full" | "half";
}

const personalActions: QuickAction[] = [
  {
    id: "personal-expense",
    icon: PiggyBankIcon,
    title: "Registrar gasto",
    hint: "Cuéntame qué compraste",
    prompt: "Quiero registrar un gasto que acabo de hacer",
    gradient: "from-[#2D5016] to-[#4A6B28]",
    iconColor: "text-[#2D5016]",
    accentRing: "bg-white/15",
    span: "full",
  },
  {
    id: "personal-tips",
    icon: BulbIcon,
    title: "Consejos",
    hint: "Tips para ahorrar",
    prompt: "Dame consejos para ahorrar más este mes",
    gradient: "from-[#E8EFDD] to-[#D4E4C8]",
    iconColor: "text-[#2D5016]",
    accentRing: "bg-[#8B9E7C]/25",
    span: "half",
  },
  {
    id: "personal-summary",
    icon: ChartLineData01Icon,
    title: "Resumen del mes",
    hint: "En qué se fue tu plata",
    prompt: "Hazme un resumen de mis gastos este mes",
    gradient: "from-[#EFE5D2] to-[#DCCBA8]",
    iconColor: "text-[#7A5C3A]",
    accentRing: "bg-[#C8A06C]/20",
    span: "full",
  },
];

const businessActions: QuickAction[] = [
  {
    id: "business-sale",
    icon: ShoppingCart01Icon,
    title: "Registrar venta",
    hint: "Anota un ingreso o venta",
    prompt: "Quiero registrar una venta",
    gradient: "from-[#2D5016] to-[#4A6B28]",
    iconColor: "text-[#2D5016]",
    accentRing: "bg-white/15",
    span: "full",
  },
  {
    id: "business-expense",
    icon: PiggyBankIcon,
    title: "Registrar gasto",
    hint: "Operación, inversión o variable",
    prompt: "Quiero registrar un gasto del negocio",
    gradient: "from-[#F5ECD9] to-[#E8DBB8]",
    iconColor: "text-[#A67B5B]",
    accentRing: "bg-[#D4A574]/25",
    span: "half",
  },
  {
    id: "business-cashflow",
    icon: Coins01Icon,
    title: "Flujo de caja",
    hint: "Cómo va tu día",
    prompt: "¿Cómo va mi flujo de caja hoy?",
    gradient: "from-[#E8EFDD] to-[#D4E4C8]",
    iconColor: "text-[#2D5016]",
    accentRing: "bg-[#8B9E7C]/25",
    span: "half",
  },
  {
    id: "business-iva",
    icon: Calculator01Icon,
    title: "IVA del mes",
    hint: "Cuánto llevas acumulado",
    prompt: "¿Cuánto IVA llevo este mes?",
    gradient: "from-[#EFE5D2] to-[#DCCBA8]",
    iconColor: "text-[#7A5C3A]",
    accentRing: "bg-[#C8A06C]/20",
    span: "full",
  },
];

export function getQuickActions(ledgerType: LedgerType): QuickAction[] {
  return ledgerType === "business" ? businessActions : personalActions;
}
