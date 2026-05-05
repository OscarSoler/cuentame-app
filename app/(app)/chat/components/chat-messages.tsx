"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import type { UIMessage } from "ai";
import { ExpenseCard } from "./expense-card";
import { IncomeCard } from "./income-card";

interface ChatMessagesProps {
  messages: UIMessage[];
  isLoading: boolean;
}

function AssistantAvatar() {
  return (
    <div className="shrink-0 w-7 h-7 rounded-full overflow-hidden">
      <Image
        src="/avatar.png"
        alt="Asistente"
        width={28}
        height={28}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

function ToolError({ error }: { error: string }) {
  return (
    <div className="flex items-center gap-2 bg-destructive/10 border border-destructive/20 rounded-2xl px-3 py-2 text-[12px] text-destructive/80">
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
      const { id, amount, category, note, date, ivaAmount } = part.output;
      return <IncomeCard key={part.toolCallId} id={id} amount={amount} category={category} note={note} date={date} ivaAmount={ivaAmount} />;
    }
    if ((part.type === "tool-registerExpense" || part.type === "tool-registerIncome") && part.state === "input-available") {
      return (
        <div
          key={part.toolCallId}
          className="flex items-center gap-2 bg-accent/30 border border-primary/10 rounded-full pl-2.5 pr-3 py-1.5 text-[11px] font-medium text-primary/70 w-fit"
        >
          <span className="relative flex w-1.5 h-1.5">
            <span className="absolute inset-0 rounded-full bg-primary/40 animate-ping" />
            <span className="relative w-1.5 h-1.5 rounded-full bg-primary/70" />
          </span>
          Registrando...
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="flex flex-col gap-5 px-4 py-5">
        {messages.map((message, msgIdx) => {
          const isUser = message.role === "user";
          const prevMessage = messages[msgIdx - 1];
          const isFirstInGroup = !prevMessage || prevMessage.role !== message.role;

          if (isUser) {
            return (
              <div
                key={message.id}
                className="flex justify-end"
              >
                <div className="flex flex-col gap-1.5 items-end max-w-[82%]">
                  {message.parts.map((part, i) => {
                    if (part.type === "file" && part.mediaType?.startsWith("image/")) {
                      return (
                        <div
                          key={`${message.id}-${i}`}
                          className="rounded-2xl overflow-hidden max-w-[260px] shadow-[0_2px_8px_rgba(45,80,22,0.18)]"
                        >
                          <Image
                            src={part.url}
                            alt="Imagen adjunta"
                            width={260}
                            height={260}
                            className="w-full h-auto object-cover"
                            unoptimized
                          />
                        </div>
                      );
                    }
                    if (part.type === "text" && part.text) {
                      return (
                        <div
                          key={`${message.id}-${i}`}
                          className="rounded-2xl rounded-br-md px-4 py-2.5 text-[14px] leading-relaxed bg-gradient-to-br from-primary to-[#3a6a1d] text-primary-foreground shadow-[0_2px_8px_rgba(45,80,22,0.18)]"
                        >
                          <p className="whitespace-pre-wrap break-words">{part.text}</p>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            );
          }

          return (
            <div
              key={message.id}
              className="flex flex-col gap-1.5 items-start max-w-[92%]"
            >
              {isFirstInGroup && <AssistantAvatar />}
              {message.parts.map((part, i) => {
                if (part.type === "text" && part.text) {
                  return (
                    <div
                      key={`${message.id}-${i}`}
                      className="rounded-2xl rounded-tl-md px-4 py-2.5 text-[14px] leading-relaxed bg-cream/80 backdrop-blur-sm text-foreground border border-border/40 shadow-[0_1px_3px_rgba(45,80,22,0.04)]"
                    >
                      <p className="whitespace-pre-wrap break-words">{part.text}</p>
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
          <div className="flex flex-col gap-1.5 items-start">
            <AssistantAvatar />
            <div className="bg-cream/80 backdrop-blur-sm border border-border/40 rounded-2xl rounded-tl-md px-4 py-3 w-fit shadow-[0_1px_3px_rgba(45,80,22,0.04)]">
              <div className="flex gap-1.5 items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
