import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  Leaf02Icon,
  SparklesIcon,
} from "@hugeicons/core-free-icons";
import { getQuickActions, type QuickAction } from "./quick-actions";

interface ChatSuggestionsProps {
  isDrawer: boolean;
  ledgerType: "personal" | "business";
  onSelect: (prompt: string) => void;
}

const MONTH_ES = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export function ChatSuggestions({
  isDrawer,
  ledgerType,
  onSelect,
}: ChatSuggestionsProps) {
  const actions = getQuickActions(ledgerType);
  const [hero, ...rest] = actions;

  const greeting =
    ledgerType === "business" ? "Listo para hoy" : "Tu día, en orden";
  const subtitle =
    ledgerType === "business"
      ? "Registra ventas, gastos o consulta tu flujo."
      : "Pregúntame algo o empieza por una de estas.";

  const today = new Date();
  const dayNum = String(today.getDate()).padStart(2, "0");
  const monthLabel = MONTH_ES[today.getMonth()];

  return (
    <div
      className={`relative flex flex-col h-full w-full overflow-hidden ${
        isDrawer ? "px-5 pt-5 pb-4" : "px-6 pt-8 pb-6"
      }`}
    >
      {!isDrawer && (
        <>
          <span
            aria-hidden
            className="pointer-events-none absolute -top-32 -right-24 w-72 h-72 rounded-full bg-accent/40 blur-[80px] opacity-70"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-40 -left-20 w-80 h-80 rounded-full bg-[#D4A574]/15 blur-[90px]"
          />
        </>
      )}

      <header
        className={`relative flex items-start justify-between gap-4 ${
          isDrawer ? "mb-5" : "mb-7"
        }`}
      >
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <span
              aria-hidden
              className="block w-5 h-px bg-primary/40"
            />
            <HugeiconsIcon
              icon={Leaf02Icon}
              size={11}
              className="text-primary/60 -rotate-12"
              strokeWidth={1.6}
            />
            <span className="text-[10px] uppercase tracking-[0.22em] text-primary/70 font-semibold">
              Cuéntame
            </span>
          </div>

          <h2
            className={`font-heading text-foreground tracking-[-0.02em] ${
              isDrawer
                ? "text-[24px] leading-[1.05]"
                : "text-[34px] leading-[1.0]"
            }`}
          >
            {greeting}
            <span className="text-primary">.</span>
          </h2>
          <p
            className={`text-foreground/55 leading-relaxed mt-2 ${
              isDrawer
                ? "text-[12.5px] max-w-[18rem]"
                : "text-[13.5px] max-w-[22rem]"
            }`}
          >
            {subtitle}
          </p>
        </div>

        {!isDrawer && (
          <div className="shrink-0 flex flex-col items-end pt-1">
            <span className="font-heading text-[44px] leading-none text-foreground/90 tracking-[-0.03em] tabular-nums">
              {dayNum}
            </span>
            <span className="text-[9.5px] uppercase tracking-[0.24em] text-muted-foreground/65 font-medium mt-1">
              {monthLabel}
            </span>
          </div>
        )}
      </header>

      <HeroCard action={hero} isDrawer={isDrawer} onSelect={onSelect} />

      <div
        className={`relative ${isDrawer ? "mt-4" : "mt-5"} flex-1 min-h-0`}
      >
        <ul className="flex flex-col">
          {rest.map((action, i) => (
            <li
              key={action.id}
              className={i > 0 ? "border-t border-foreground/8" : ""}
            >
              <MenuRow
                action={action}
                index={i + 1}
                total={rest.length}
                isDrawer={isDrawer}
                onSelect={onSelect}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

interface HeroCardProps {
  action: QuickAction;
  isDrawer: boolean;
  onSelect: (prompt: string) => void;
}

function HeroCard({ action, isDrawer, onSelect }: HeroCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(action.prompt)}
      className="group relative w-full overflow-hidden rounded-[28px] text-left cursor-pointer transition-all duration-500 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.995] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      style={{
        background:
          "linear-gradient(135deg, #1F3A0F 0%, #2D5016 35%, #3A5D1F 70%, #4A6B28 100%)",
        boxShadow:
          "0 1px 0 0 rgba(255,255,255,0.08) inset, 0 24px 48px -16px rgba(31,58,15,0.5), 0 4px 12px -4px rgba(31,58,15,0.3)",
      }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-soft-light"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 0.6px, transparent 0)",
          backgroundSize: "10px 10px",
        }}
      />

      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
        }}
      />

      <span
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 w-72 h-72 rounded-full bg-[#D4A574]/20 blur-3xl transition-all duration-700 group-hover:bg-[#D4A574]/30 group-hover:scale-110"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -left-12 -bottom-16 w-56 h-56 rounded-full bg-[#8B9E7C]/15 blur-3xl"
      />

      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
      />

      <div
        className={`relative flex flex-col ${
          isDrawer
            ? "px-5 pt-5 pb-4 min-h-[140px]"
            : "px-7 pt-6 pb-5 min-h-[172px]"
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <span
              aria-hidden
              className="relative flex h-1.5 w-1.5"
            >
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#D4A574] opacity-60 animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#D4A574]" />
            </span>
            <span className="text-[9.5px] uppercase tracking-[0.28em] text-[#D4A574] font-semibold">
              Empieza aquí
            </span>
          </div>

          <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-2xl bg-white/8 ring-1 ring-white/15 backdrop-blur-sm transition-all duration-500 group-hover:bg-white/15 group-hover:ring-white/30 group-hover:rotate-[-4deg]">
            <HugeiconsIcon
              icon={action.icon}
              size={18}
              className="text-white"
              strokeWidth={1.7}
            />
          </div>
        </div>

        <h3
          className={`font-heading text-white tracking-[-0.025em] mt-auto pt-6 ${
            isDrawer
              ? "text-[26px] leading-[1.0]"
              : "text-[36px] leading-[0.98]"
          }`}
        >
          {action.title}
          <span className="text-[#D4A574]">.</span>
        </h3>

        <div
          className={`flex items-end justify-between gap-3 ${
            isDrawer ? "mt-2.5" : "mt-3"
          }`}
        >
          <p
            className={`text-white/65 leading-snug ${
              isDrawer ? "text-[12px] max-w-[14rem]" : "text-[13px] max-w-[16rem]"
            }`}
          >
            {action.hint}
          </p>

          <span className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/10 ring-1 ring-white/15 text-[10.5px] font-medium text-white tracking-wide backdrop-blur-sm transition-all duration-300 group-hover:bg-[#D4A574] group-hover:ring-[#D4A574] group-hover:text-[#1F3A0F]">
            <HugeiconsIcon
              icon={SparklesIcon}
              size={11}
              strokeWidth={2}
              className="transition-transform duration-500 group-hover:rotate-12"
            />
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              size={11}
              strokeWidth={2.2}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </span>
        </div>
      </div>
    </button>
  );
}

interface MenuRowProps {
  action: QuickAction;
  index: number;
  total: number;
  isDrawer: boolean;
  onSelect: (prompt: string) => void;
}

function MenuRow({ action, index, isDrawer, onSelect }: MenuRowProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(action.prompt)}
      className={`group relative w-full flex items-center gap-4 cursor-pointer text-left transition-all duration-300 ease-out hover:bg-cream/60 active:scale-[0.995] rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
        isDrawer ? "py-2.5 px-2" : "py-3.5 px-2.5"
      }`}
    >
      <span
        aria-hidden
        className="absolute left-0 top-1/2 -translate-y-1/2 h-0 w-[2px] bg-primary rounded-full transition-all duration-300 group-hover:h-6"
      />

      <span
        className={`shrink-0 font-mono tabular-nums text-muted-foreground/40 group-hover:text-primary/70 transition-colors duration-300 ${
          isDrawer ? "text-[10px]" : "text-[10.5px]"
        }`}
      >
        {String(index).padStart(2, "0")}
      </span>

      <div
        className={`shrink-0 relative flex items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-105 ${
          isDrawer ? "w-9 h-9" : "w-10 h-10"
        }`}
        style={{
          background:
            "linear-gradient(135deg, rgba(212,228,200,0.55) 0%, rgba(212,228,200,0.25) 100%)",
          boxShadow: "inset 0 0 0 1px rgba(45,80,22,0.07)",
        }}
      >
        <HugeiconsIcon
          icon={action.icon}
          size={isDrawer ? 15 : 16}
          className="text-primary transition-transform duration-500 group-hover:scale-110"
          strokeWidth={1.7}
        />
      </div>

      <div className="flex-1 min-w-0 flex items-baseline gap-2">
        <span
          className={`font-medium text-foreground tracking-[-0.005em] shrink-0 ${
            isDrawer ? "text-[13.5px]" : "text-[14.5px]"
          }`}
        >
          {action.title}
        </span>
        <span
          aria-hidden
          className="flex-1 h-[2px] translate-y-[-2px] text-foreground/20 group-hover:text-primary/40 transition-colors duration-300"
          style={{
            backgroundImage:
              "radial-gradient(circle, currentColor 0.9px, transparent 0.9px)",
            backgroundSize: "5px 2px",
            backgroundRepeat: "repeat-x",
            backgroundPosition: "left center",
          }}
        />
        <span
          className={`text-foreground/45 truncate text-right ${
            isDrawer ? "text-[11px] max-w-[8rem]" : "text-[11.5px] max-w-[10rem]"
          }`}
        >
          {action.hint}
        </span>
      </div>

      <HugeiconsIcon
        icon={ArrowRight01Icon}
        size={13}
        className="shrink-0 text-foreground/25 transition-all duration-300 group-hover:text-primary group-hover:translate-x-1"
        strokeWidth={2}
      />
    </button>
  );
}
