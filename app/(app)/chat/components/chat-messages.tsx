"use client";

import { useRef, useEffect } from "react";
import type { UIMessage } from "ai";
import { ExpenseCard } from "./expense-card";
import { IncomeCard } from "./income-card";

interface ChatMessagesProps {
  messages: UIMessage[];
  isLoading: boolean;
}

function ToolError({ error }: { error: string }) {
  return (
    <div className="flex items-center gap-2 bg-destructive/10 border border-destructive/20 rounded-xl px-3 py-2 text-[12px] text-destructive/80">
      <span className="w-1.5 h-1.5 rounded-full bg-destructive/60" />
      <span>No pude guardarlo: {error}</span>
    </div>
  );
}

export function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderToolPart = (part: any) => {
    if (part.type === "tool-registerExpense" && part.state === "output-available") {
      if (part.output?.status === "error") {
        return <ToolError key={part.toolCallId} error={part.output.error} />;
      }
      const { id, amount, category, note, pillar, date, emotion } = part.output;
      return (
        <ExpenseCard
          key={part.toolCallId}
          id={id}
          amount={amount}
          category={category}
          note={note}
          pillar={pillar}
          date={date}
          emotion={emotion ?? null}
        />
      );
    }
    if (part.type === "tool-registerIncome" && part.state === "output-available") {
      if (part.output?.status === "error") {
        return <ToolError key={part.toolCallId} error={part.output.error} />;
      }
      const { amount, category, note, date, ivaAmount } = part.output;
      return <IncomeCard key={part.toolCallId} amount={amount} category={category} note={note} date={date} ivaAmount={ivaAmount} />;
    }
    if ((part.type === "tool-registerExpense" || part.type === "tool-registerIncome") && part.state === "input-available") {
      return (
        <div key={part.toolCallId} className="flex items-center gap-2 text-xs text-muted-foreground/60">
          <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-pulse" />
          Registrando...
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex-1 overflow-y-auto">
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
                if (part.type.startsWith("tool-")) return renderToolPart(part);
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
    </div>
  );
}
