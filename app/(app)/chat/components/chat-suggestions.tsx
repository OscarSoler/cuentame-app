import { HugeiconsIcon } from "@hugeicons/react";
import { PiggyBankIcon, Target01Icon, BulbIcon } from "@hugeicons/core-free-icons";

const suggestions = [
  { icon: PiggyBankIcon, text: "Registrar un gasto", prompt: "Quiero registrar un gasto que acabo de hacer" },
  { icon: Target01Icon, text: "Ver mi presupuesto", prompt: "¿Cómo va mi presupuesto este mes?" },
  { icon: BulbIcon, text: "Consejos de ahorro", prompt: "Dame consejos para ahorrar más este mes" },
];

interface ChatSuggestionsProps {
  isDrawer: boolean;
  ledgerType: "personal" | "business";
  onSelect: (prompt: string) => void;
}

export function ChatSuggestions({ isDrawer, ledgerType, onSelect }: ChatSuggestionsProps) {
  return (
    <div className={`flex flex-col items-center justify-center h-full px-6 ${isDrawer ? "py-6" : "pb-4"}`}>
      <div className="flex flex-col items-center gap-3 mb-6">
        <div className={`rounded-full bg-accent/30 flex items-center justify-center ${isDrawer ? "w-12 h-12" : "w-16 h-16"}`}>
          <PiggyBankIcon className={`text-primary ${isDrawer ? "size-6" : "size-8"}`} />
        </div>
        <div className="text-center">
          <p className={`font-heading text-foreground ${isDrawer ? "text-base" : "text-xl"}`}>
            ¿En qué puedo ayudarte?
          </p>
          <p className="text-xs text-muted-foreground/70 mt-1 max-w-52 mx-auto leading-relaxed">
            {ledgerType === "business"
              ? "Registra ventas, gastos o consulta tu flujo de caja."
              : "Pregúntame sobre tus finanzas o elige una opción."}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full max-w-xs">
        {suggestions.map((s) => (
          <button
            key={s.text}
            type="button"
            onClick={() => onSelect(s.prompt)}
            className="flex items-center gap-2.5 bg-card/50 backdrop-blur-sm border border-border/30 rounded-xl px-3.5 py-2.5 text-left transition-colors hover:bg-card/80 cursor-pointer"
          >
            <div className="w-7 h-7 rounded-lg bg-accent/40 flex items-center justify-center shrink-0">
              <HugeiconsIcon icon={s.icon} size={14} className="text-primary" strokeWidth={1.5} />
            </div>
            <span className="text-xs font-medium text-foreground">{s.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
