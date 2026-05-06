import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  Leaf02Icon,
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
      className={`group relative w-full text-left overflow-hidden rounded-2xl bg-cream/70 ring-1 ring-primary/15 transition-all hover:ring-primary/30 hover:-translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
        isDrawer ? "px-4 py-4" : "px-5 py-5"
      }`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 bottom-0 w-[3px] bg-primary/70 rounded-r-full"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 w-32 h-32 rounded-full bg-accent/40 blur-2xl opacity-60"
      />

      <div className="relative flex items-start gap-3">
        <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 ring-1 ring-primary/20 flex items-center justify-center">
          <HugeiconsIcon
            icon={action.icon}
            size={17}
            className="text-primary"
            strokeWidth={1.75}
          />
        </div>

        <div className="flex-1 min-w-0">
          <span className="text-[10px] uppercase tracking-[0.22em] text-primary/70 font-semibold">
            Empieza aquí
          </span>
          <h3
            className={`font-heading text-foreground tracking-[-0.01em] mt-1 ${
              isDrawer ? "text-[19px] leading-tight" : "text-[22px] leading-tight"
            }`}
          >
            {action.title}
            <span className="text-primary">.</span>
          </h3>
          <p className="text-[12px] text-muted-foreground/75 mt-1 leading-snug">
            {action.hint}
          </p>
        </div>

        <HugeiconsIcon
          icon={ArrowRight01Icon}
          size={14}
          className="shrink-0 mt-1 text-primary/50 transition-all group-hover:text-primary group-hover:translate-x-0.5"
          strokeWidth={2}
        />
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
