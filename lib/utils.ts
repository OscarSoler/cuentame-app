import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Une clases de Tailwind resolviendo conflictos entre utilities.
 * Combina `clsx` (condicionales) con `tailwind-merge` (dedupe).
 *
 * @example
 * cn("p-2", isActive && "bg-primary", "p-4") // → "bg-primary p-4"
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formatea un monto en pesos con separadores de miles.
 * Usar cuando el valor exacto importa (transacciones, detalles).
 *
 * @example
 * formatCurrency(15000)    // → "$15.000"
 * formatCurrency(1234567)  // → "$1.234.567"
 */
export function formatCurrency(amount: number): string {
  return `$${amount.toLocaleString("es-CO")}`;
}

/**
 * Formatea un monto en forma compacta (k / M) para espacios reducidos
 * como headers, tarjetas de resumen o etiquetas de gráfico.
 *
 * - ≥ 1.000.000 → `$1.2M` (un decimal)
 * - ≥ 1.000     → `$850k` (sin decimales)
 * - < 1.000     → `$420`
 *
 * @example
 * formatCurrencyCompact(4_500_000) // → "$4.5M"
 * formatCurrencyCompact(850_000)   // → "$850k"
 * formatCurrencyCompact(420)       // → "$420"
 */
export function formatCurrencyCompact(amount: number): string {
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 1_000) return `$${(amount / 1_000).toFixed(0)}k`;
  return `$${amount}`;
}

export const APP_TIMEZONE = "America/Bogota";

export function localDateISO(date: Date = new Date()): string {
  return date.toLocaleDateString("en-CA", { timeZone: APP_TIMEZONE });
}
