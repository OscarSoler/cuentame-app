import type { IconSvgElement } from "@hugeicons/react";
import {
  PiggyBankIcon,
  BulbIcon,
  ShoppingCart01Icon,
  MoneyAdd01Icon,
  BookOpen01Icon,
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
    id: "personal-income",
    icon: MoneyAdd01Icon,
    title: "Recibí un ingreso",
    hint: "Anota un sueldo, pago o regalo",
    prompt: "Quiero registrar un ingreso que acabo de recibir",
    gradient: "from-[#EFE5D2] to-[#DCCBA8]",
    iconColor: "text-[#7A5C3A]",
    accentRing: "bg-[#C8A06C]/20",
    span: "full",
  },
  {
    id: "personal-kakebo",
    icon: BookOpen01Icon,
    title: "¿Qué es Kakebo?",
    hint: "El método japonés del ahorro",
    prompt: "¿Qué es el método Kakebo y cómo funciona?",
    gradient: "from-[#E8EFDD] to-[#D4E4C8]",
    iconColor: "text-[#2D5016]",
    accentRing: "bg-[#8B9E7C]/25",
    span: "half",
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
    id: "business-kakebo",
    icon: BookOpen01Icon,
    title: "¿Qué es Kakebo?",
    hint: "El método aplicado a tu negocio",
    prompt: "¿Qué es el método Kakebo y cómo lo aplico a mi negocio?",
    gradient: "from-[#E8EFDD] to-[#D4E4C8]",
    iconColor: "text-[#2D5016]",
    accentRing: "bg-[#8B9E7C]/25",
    span: "half",
  },
];

export function getQuickActions(ledgerType: LedgerType): QuickAction[] {
  return ledgerType === "business" ? businessActions : personalActions;
}
