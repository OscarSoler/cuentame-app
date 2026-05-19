import { HugeiconsIcon } from "@hugeicons/react";
import {
  SparklesIcon,
  ChartUpIcon,
  FireIcon,
} from "@hugeicons/core-free-icons";
import {
  getActivityStatsAction,
  getMonthSummaryAction,
} from "@/core/transaction/presentation/transaction.actions";
import type { Ledger } from "@/lib/ledger/types";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);
}

export async function AppRightPanel({ ledger }: { ledger: Ledger }) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  const [statsResult, summaryResult] = await Promise.all([
    getActivityStatsAction(ledger.id),
    getMonthSummaryAction(ledger.id, year, month),
  ]);

  const score = statsResult.success ? statsResult.data.score : 0;
  const streak = statsResult.success ? statsResult.data.currentStreak : 0;
  const activeDays = statsResult.success
    ? statsResult.data.activeDaysThisWeek
    : [];

  const income = summaryResult.success ? summaryResult.data.income : 0;
  const expenses = summaryResult.success ? summaryResult.data.expenses : 0;
  const net = income - expenses;
  const netLabel = net >= 0 ? "Ahorro neto" : "Déficit";

  const monthName = new Intl.DateTimeFormat("es-CO", {
    month: "long",
  }).format(now);

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-[320px] bg-white lg:shrink-0 lg:px-5 lg:py-6 lg:border-l lg:border-border/30">
      <div className="flex items-center gap-3 mb-6">
        <span className="font-mono text-[11px] tracking-[0.25em] tabular-nums text-foreground/45">
          AHORA
        </span>
        <span className="block w-8 h-px bg-foreground/20" />
        <span className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground">
          {monthName}
        </span>
      </div>

      <div className="bg-cream/60 border border-border/40 rounded-2xl p-5">
        <div className="flex items-center gap-2">
          <HugeiconsIcon
            icon={ChartUpIcon}
            size={16}
            strokeWidth={1.5}
            className="text-primary"
          />
          <span className="text-[11px] tracking-[0.2em] uppercase text-primary/70">
            {netLabel}
          </span>
        </div>
        <p className="mt-3 font-heading text-2xl text-foreground tabular-nums">
          {formatCurrency(Math.abs(net))}
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
          <div>
            <div className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground/70">
              Ingresos
            </div>
            <div className="mt-1 font-medium text-foreground tabular-nums">
              {formatCurrency(income)}
            </div>
          </div>
          <div>
            <div className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground/70">
              Gastos
            </div>
            <div className="mt-1 font-medium text-foreground tabular-nums">
              {formatCurrency(expenses)}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 bg-primary/[0.04] border border-primary/15 rounded-2xl p-5">
        <div className="flex items-center gap-2">
          <HugeiconsIcon
            icon={FireIcon}
            size={14}
            strokeWidth={1.5}
            className="text-primary"
          />
          <span className="text-[11px] tracking-[0.2em] uppercase text-primary/70">
            Racha
          </span>
        </div>
        <p className="mt-3 font-heading text-3xl text-foreground tabular-nums">
          {streak}{" "}
          <span className="text-base text-muted-foreground font-normal">
            {streak === 1 ? "día" : "días"}
          </span>
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          registrando sin saltar ninguno.
        </p>

        <div className="mt-4 flex items-center gap-1.5">
          {["L", "M", "M", "J", "V", "S", "D"].map((d, i) => {
            const isActive = activeDays.includes(i);
            return (
              <div
                key={i}
                className="flex-1 flex flex-col items-center gap-1.5"
              >
                <span className="text-[9px] tracking-wider uppercase text-muted-foreground/60">
                  {d}
                </span>
                <span
                  className={`w-2 h-2 rounded-full ${
                    isActive ? "bg-accent" : "bg-foreground/12"
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-5 bg-cream/60 border border-border/40 rounded-2xl p-5">
        <div className="flex items-center gap-2">
          <HugeiconsIcon
            icon={SparklesIcon}
            size={14}
            strokeWidth={1.5}
            className="text-primary"
          />
          <span className="text-[11px] tracking-[0.2em] uppercase text-primary/70">
            Score consciente
          </span>
        </div>
        <p className="mt-3 font-heading text-3xl text-foreground tabular-nums">
          {score}
          <span className="text-base text-muted-foreground font-normal">
            {" "}
            / 850
          </span>
        </p>
        <div className="mt-3 relative h-1.5 rounded-full bg-foreground/8 overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-primary rounded-full"
            style={{ width: `${Math.min(100, (score / 850) * 100)}%` }}
          />
        </div>
      </div>

      <div className="mt-auto pt-6 border-t border-border/30">
        <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground/60 mb-2">
          家計簿
        </div>
        <p className="text-xs text-muted-foreground/85 leading-relaxed italic font-heading">
          “No mide cuánto tienes. Mide qué tan consciente eres de lo que haces
          con tu dinero.”
        </p>
      </div>
    </aside>
  );
}
