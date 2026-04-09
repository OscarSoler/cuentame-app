"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useMemo } from "react";
import { useLedger, type LedgerType } from "@/lib/context/ledger-context";
import { ChatSuggestions } from "./chat-suggestions";
import { ChatMessages } from "./chat-messages";
import { ChatInput } from "./chat-input";

interface ChatContentProps {
  variant?: "page" | "drawer";
}

export function ChatContent({ variant = "page" }: ChatContentProps) {
  const { activeLedger, setActiveLedger } = useLedger();

  const transport = useMemo(
    () => new DefaultChatTransport({ api: "/api/chat", body: { ledgerType: activeLedger.type } }),
    [activeLedger.type]
  );

  const { messages, sendMessage, addToolOutput, status } = useChat({ transport });

  const isLoading = status === "streaming" || status === "submitted";
  const isDrawer = variant === "drawer";

  const handleLedgerChange = (type: LedgerType) => {
    setActiveLedger({ id: `${type}-default`, type, name: type === "business" ? "Negocio" : "Personal" });
  };

  return (
    <div className="flex flex-col w-full h-full">
      {messages.length === 0 ? (
        <ChatSuggestions
          isDrawer={isDrawer}
          ledgerType={activeLedger.type}
          onSelect={(prompt) => { if (!isLoading) sendMessage({ text: prompt }); }}
        />
      ) : (
        <ChatMessages
          messages={messages}
          isLoading={isLoading}
          onToolOutput={addToolOutput}
        />
      )}
      <ChatInput
        isDrawer={isDrawer}
        isLoading={isLoading}
        activeLedgerType={activeLedger.type}
        onSubmit={(text) => sendMessage({ text })}
        onLedgerChange={handleLedgerChange}
      />
    </div>
  );
}
