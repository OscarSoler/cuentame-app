"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState, useRef, useEffect, useMemo } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowUp02Icon,
  Leaf01Icon,
  PiggyBankIcon,
  Target01Icon,
  BulbIcon,
  Home01Icon,
  Store01Icon,
  ArrowDown01Icon,
} from "@hugeicons/core-free-icons";
import { ExpenseCard } from "@/app/(app)/chat/chat/expense-card";
import { IncomeCard } from "@/app/(app)/chat/chat/income-card";
import { EmotionPicker } from "@/app/(app)/chat/chat/emotion-picker";
import { useLedger } from "@/lib/context/ledger-context";

const suggestions = [
  {
    icon: PiggyBankIcon,
    text: "Registrar un gasto",
    prompt: "Quiero registrar un gasto que acabo de hacer",
  },
  {
    icon: Target01Icon,
    text: "Ver mi presupuesto",
    prompt: "¿Cómo va mi presupuesto este mes?",
  },
  {
    icon: BulbIcon,
    text: "Consejos de ahorro",
    prompt: "Dame consejos para ahorrar más este mes",
  },
];

const ledgerOptions = [
  {
    id: "personal-default",
    type: "personal" as const,
    label: "Personal",
    icon: Home01Icon,
  },
  {
    id: "business-default",
    type: "business" as const,
    label: "Negocio",
    icon: Store01Icon,
  },
];

interface ChatContentProps {
  variant?: "page" | "drawer";
}

export function ChatContent({ variant = "page" }: ChatContentProps) {
  const { activeLedger, setActiveLedger } = useLedger();

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        body: { ledgerType: activeLedger.type },
      }),
    [activeLedger.type],
  );

  const { messages, sendMessage, addToolOutput, status } = useChat({
    transport,
  });
  const [input, setInput] = useState("");
  const [ledgerOpen, setLedgerOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  const isLoading = status === "streaming" || status === "submitted";

  const handleSubmit = (e?: { preventDefault?: () => void }) => {
    e?.preventDefault?.();
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input });
    setInput("");
  };

  const handleSuggestion = (prompt: string) => {
    if (isLoading) return;
    sendMessage({ text: prompt });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderToolPart = (part: any) => {
    if (
      part.type === "tool-registerExpense" &&
      part.state === "output-available"
    ) {
      const { amount, category, note, pillar, date } = part.output;
      return (
        <ExpenseCard
          key={part.toolCallId}
          amount={amount}
          category={category}
          note={note}
          pillar={pillar}
          date={date}
        />
      );
    }

    if (
      part.type === "tool-registerIncome" &&
      part.state === "output-available"
    ) {
      const { amount, category, note, date, ivaAmount } = part.output;
      return (
        <IncomeCard
          key={part.toolCallId}
          amount={amount}
          category={category}
          note={note}
          date={date}
          ivaAmount={ivaAmount}
        />
      );
    }

    if (part.type === "tool-askEmotion" && part.state === "input-available") {
      return (
        <EmotionPicker
          key={part.toolCallId}
          message={part.input.message}
          onSelect={(emotion) => {
            addToolOutput({
              tool: "askEmotion",
              toolCallId: part.toolCallId,
              output: JSON.stringify({ emotion }),
            });
          }}
        />
      );
    }

    if (part.type === "tool-askEmotion" && part.state === "output-available") {
      const emotion = JSON.parse(part.output).emotion;
      const emojiMap: Record<string, string> = {
        happy: "😊",
        neutral: "😐",
        sad: "😔",
        guilty: "😬",
        proud: "🤩",
      };
      return (
        <div
          key={part.toolCallId}
          className="flex items-center gap-2 bg-accent/30 rounded-full px-3 py-1.5 w-fit"
        >
          <span className="text-base">{emojiMap[emotion] ?? "😊"}</span>
          <span className="text-[11px] text-accent-foreground font-medium">
            Emoción registrada
          </span>
        </div>
      );
    }

    if (
      (part.type === "tool-registerExpense" ||
        part.type === "tool-registerIncome") &&
      part.state === "input-available"
    ) {
      return (
        <div
          key={part.toolCallId}
          className="flex items-center gap-2 text-xs text-muted-foreground/60"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-pulse" />
          Registrando...
        </div>
      );
    }

    return null;
  };

  const isDrawer = variant === "drawer";
  const activeLedgerOption =
    ledgerOptions.find((l) => l.type === activeLedger.type) ?? ledgerOptions[0];

  return (
    <div className={`flex flex-col w-full ${isDrawer ? "h-full" : "h-full"}`}>
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <div
            className={`flex flex-col items-center justify-center h-full px-6 ${isDrawer ? "py-6" : "pb-4"}`}
          >
            <div className="flex flex-col items-center gap-3 mb-6">
              <div
                className={`rounded-full bg-accent/30 flex items-center justify-center ${isDrawer ? "w-12 h-12" : "w-16 h-16"}`}
              >
                <HugeiconsIcon
                  icon={Leaf01Icon}
                  size={isDrawer ? 24 : 32}
                  className="text-primary"
                  strokeWidth={1.5}
                />
              </div>
              <div className="text-center">
                <p
                  className={`font-heading text-foreground ${isDrawer ? "text-base" : "text-xl"}`}
                >
                  ¿En qué puedo ayudarte?
                </p>
                <p className="text-xs text-muted-foreground/70 mt-1 max-w-52 mx-auto leading-relaxed">
                  {activeLedger.type === "business"
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
                  onClick={() => handleSuggestion(s.prompt)}
                  className="flex items-center gap-2.5 bg-card/50 backdrop-blur-sm border border-border/30 rounded-xl px-3.5 py-2.5 text-left transition-colors hover:bg-card/80 cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-lg bg-accent/40 flex items-center justify-center shrink-0">
                    <HugeiconsIcon
                      icon={s.icon}
                      size={14}
                      className="text-primary"
                      strokeWidth={1.5}
                    />
                  </div>
                  <span className="text-xs font-medium text-foreground">
                    {s.text}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4 px-5 py-4">
            {messages.map((message) => {
              const isUser = message.role === "user";
              return (
                <div
                  key={message.id}
                  className={`flex flex-col gap-2 ${isUser ? "items-end" : "items-start"} max-w-[95%] ${isUser ? "ml-auto" : "mr-auto"}`}
                >
                  {message.parts.map((part, i) => {
                    if (part.type === "text" && part.text) {
                      return (
                        <div
                          key={`${message.id}-${i}`}
                          className={`rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                            isUser
                              ? "bg-primary text-primary-foreground rounded-br-sm"
                              : "bg-card/60 backdrop-blur-sm text-foreground border border-border/20 rounded-bl-sm"
                          }`}
                        >
                          <p className="whitespace-pre-wrap">{part.text}</p>
                        </div>
                      );
                    }
                    if (part.type.startsWith("tool-")) {
                      return renderToolPart(part);
                    }
                    return null;
                  })}
                </div>
              );
            })}

            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <div className="bg-card/60 backdrop-blur-sm border border-border/20 rounded-2xl rounded-bl-sm px-4 py-3 w-fit">
                <div className="flex gap-1.5 items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce [animation-delay:0ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce [animation-delay:150ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input area */}
      <div
        className={`px-4 pt-2 ${isDrawer ? "pb-3" : "pb-[calc(0.75rem+env(safe-area-inset-bottom))]"}`}
      >
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
            placeholder={
              activeLedger.type === "business"
                ? "Registra una venta o gasto..."
                : "Escribe un mensaje..."
            }
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
                  <HugeiconsIcon
                    icon={activeLedgerOption.icon}
                    size={11}
                    className="text-primary"
                    strokeWidth={1.5}
                  />
                </div>
                <span className="text-[11px] font-medium text-foreground/70">
                  {activeLedgerOption.label}
                </span>
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
                        setActiveLedger({
                          id: opt.id,
                          type: opt.type,
                          name: opt.label,
                        });
                        setLedgerOpen(false);
                      }}
                      className={`flex items-center gap-2 w-full px-3 py-2 text-left transition-colors cursor-pointer ${
                        activeLedger.type === opt.type
                          ? "bg-primary/5"
                          : "hover:bg-accent/20"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          activeLedger.type === opt.type
                            ? "bg-primary text-primary-foreground"
                            : "bg-accent/40"
                        }`}
                      >
                        <HugeiconsIcon
                          icon={opt.icon}
                          size={11}
                          className={
                            activeLedger.type === opt.type
                              ? "text-primary-foreground"
                              : "text-primary"
                          }
                          strokeWidth={1.5}
                        />
                      </div>
                      <span
                        className={`text-[11px] font-medium ${
                          activeLedger.type === opt.type
                            ? "text-primary"
                            : "text-foreground/70"
                        }`}
                      >
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
    </div>
  );
}
