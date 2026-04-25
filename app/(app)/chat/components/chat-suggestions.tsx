import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";
import {
  PiggyBankIcon,
  Target01Icon,
  BulbIcon,
  ChartLineData01Icon,
} from "@hugeicons/core-free-icons";

interface Suggestion {
  icon: IconSvgElement;
  title: string;
  hint: string;
  prompt: string;
  gradient: string;
  iconColor: string;
  accentRing: string;
  span: "full" | "half";
}

const suggestions: Suggestion[] = [
  {
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
    icon: Target01Icon,
    title: "Mi presupuesto",
    hint: "Cómo voy este mes",
    prompt: "¿Cómo va mi presupuesto este mes?",
    gradient: "from-[#F5ECD9] to-[#E8DBB8]",
    iconColor: "text-[#A67B5B]",
    accentRing: "bg-[#D4A574]/25",
    span: "half",
  },
  {
    icon: BulbIcon,
    title: "Consejos",
    hint: "Tips para ahorrar",
    prompt: "Dame consejos para ahorrar más este mes",
    gradient: "from-[#E8EFDD] to-[#D4E4C8]",
    iconColor: "text-[#2D5016]",
    accentRing: "bg-[#8B9E7C]/25",
    span: "half",
  },
];

interface ChatSuggestionsProps {
  isDrawer: boolean;
  ledgerType: "personal" | "business";
  onSelect: (prompt: string) => void;
}

export function ChatSuggestions({
  isDrawer,
  ledgerType,
  onSelect,
}: ChatSuggestionsProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center h-full px-5 ${isDrawer ? "py-6" : "pb-4"}`}
    >
      <div className="flex flex-col items-center gap-3 mb-7">
        <div
          className={`relative rounded-full bg-gradient-to-br from-accent/50 to-accent/20 flex items-center justify-center ${isDrawer ? "w-12 h-12" : "w-16 h-16"}`}
        >
          <HugeiconsIcon
            icon={ChartLineData01Icon}
            size={isDrawer ? 22 : 30}
            className="text-primary"
            strokeWidth={1.5}
          />
          <span className="absolute -right-0.5 -bottom-0.5 w-3 h-3 rounded-full bg-[#D4A574] ring-2 ring-background" />
        </div>
        <div className="text-center">
          <p
            className={`font-heading text-foreground ${isDrawer ? "text-base" : "text-xl"}`}
          >
            ¿En qué puedo ayudarte?
          </p>
          <p className="text-xs text-muted-foreground/70 mt-1 max-w-52 mx-auto leading-relaxed">
            {ledgerType === "business"
              ? "Registra ventas, gastos o consulta tu flujo de caja."
              : "Pregúntame sobre tus finanzas o elige una opción."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5 w-full max-w-sm">
        {suggestions.map((s) => {
          const isDark = s.span === "full";
          return (
            <button
              key={s.title}
              type="button"
              onClick={() => onSelect(s.prompt)}
              className={`${s.span === "full" ? "col-span-2" : "col-span-1"} group relative overflow-hidden rounded-2xl bg-gradient-to-br ${s.gradient} p-4 text-left shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] cursor-pointer`}
            >
              {/* Decorative ring */}
              <span className={`absolute -right-6 -top-6 w-20 h-20 rounded-full ${s.accentRing}`} />
              <span className={`absolute -right-2 -top-2 w-10 h-10 rounded-full ${s.accentRing} opacity-60`} />

              <div className="relative flex flex-col gap-3">
                <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-sm shrink-0">
                  <HugeiconsIcon
                    icon={s.icon}
                    size={17}
                    className={s.iconColor}
                    strokeWidth={1.75}
                  />
                </div>
                <div className="min-w-0">
                  <p className={`text-[13px] font-semibold leading-tight ${isDark ? "text-white" : "text-foreground"}`}>
                    {s.title}
                  </p>
                  <p className={`text-[10.5px] mt-0.5 leading-snug ${isDark ? "text-white/70" : "text-foreground/55"}`}>
                    {s.hint}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
