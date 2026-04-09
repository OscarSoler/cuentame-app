"use client";

import { useRef, useEffect, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUp02Icon, ArrowDown01Icon, Home01Icon, Store01Icon } from "@hugeicons/core-free-icons";
import type { LedgerType } from "@/lib/context/ledger-context";

const ledgerOptions = [
  { id: "personal-default", type: "personal" as const, label: "Personal", icon: Home01Icon },
  { id: "business-default", type: "business" as const, label: "Negocio", icon: Store01Icon },
];

interface ChatInputProps {
  isDrawer: boolean;
  isLoading: boolean;
  activeLedgerType: LedgerType;
  onSubmit: (text: string) => void;
  onLedgerChange: (type: LedgerType) => void;
}

export function ChatInput({ isDrawer, isLoading, activeLedgerType, onSubmit, onLedgerChange }: ChatInputProps) {
  const [input, setInput] = useState("");
  const [ledgerOpen, setLedgerOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  const handleSubmit = (e?: { preventDefault?: () => void }) => {
    e?.preventDefault?.();
    if (!input.trim() || isLoading) return;
    onSubmit(input);
    setInput("");
  };

  const activeLedgerOption = ledgerOptions.find((l) => l.type === activeLedgerType) ?? ledgerOptions[0];

  return (
    <div className={`px-4 pt-2 ${isDrawer ? "pb-3" : "pb-[calc(0.75rem+env(safe-area-inset-bottom))]"}`}>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 rounded-xl px-3 py-2.5 bg-white/50 backdrop-blur-xl shadow-[0_0_0_1px_rgba(45,80,22,0.08),0_2px_8px_rgba(45,80,22,0.04)] transition-shadow focus-within:shadow-[0_0_0_1px_rgba(45,80,22,0.2),0_4px_16px_rgba(45,80,22,0.06)]"
      >
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
          placeholder={activeLedgerType === "business" ? "Registra una venta o gasto..." : "Escribe un mensaje..."}
          rows={1}
          className="flex-1 bg-transparent text-[13px] text-foreground placeholder:text-muted-foreground/40 resize-none outline-none max-h-30 py-1 px-1"
        />
        <div className="flex items-center justify-between">
          <div className="relative">
            <button
              type="button"
              onClick={() => setLedgerOpen(!ledgerOpen)}
              className="flex items-center gap-1.5 bg-accent/30 hover:bg-accent/50 rounded-full pl-1.5 pr-2 py-1 transition-colors cursor-pointer"
            >
              <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                <HugeiconsIcon icon={activeLedgerOption.icon} size={11} className="text-primary" strokeWidth={1.5} />
              </div>
              <span className="text-[11px] font-medium text-foreground/70">{activeLedgerOption.label}</span>
              <HugeiconsIcon
                icon={ArrowDown01Icon}
                size={10}
                className={`text-muted-foreground/50 transition-transform ${ledgerOpen ? "rotate-180" : ""}`}
              />
            </button>
            {ledgerOpen && (
              <div className="absolute bottom-full left-0 mb-1.5 bg-white/90 backdrop-blur-xl rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-border/20 overflow-hidden min-w-32 z-50">
                {ledgerOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      onLedgerChange(opt.type);
                      setLedgerOpen(false);
                    }}
                    className={`flex items-center gap-2 w-full px-3 py-2 text-left transition-colors cursor-pointer ${
                      activeLedgerType === opt.type ? "bg-primary/5" : "hover:bg-accent/20"
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${activeLedgerType === opt.type ? "bg-primary text-primary-foreground" : "bg-accent/40"}`}>
                      <HugeiconsIcon icon={opt.icon} size={11} className={activeLedgerType === opt.type ? "text-primary-foreground" : "text-primary"} strokeWidth={1.5} />
                    </div>
                    <span className={`text-[11px] font-medium ${activeLedgerType === opt.type ? "text-primary" : "text-foreground/70"}`}>
                      {opt.label}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 disabled:opacity-15 transition-opacity cursor-pointer"
          >
            <HugeiconsIcon icon={ArrowUp02Icon} size={16} strokeWidth={2} />
          </button>
        </div>
      </form>
    </div>
  );
}
