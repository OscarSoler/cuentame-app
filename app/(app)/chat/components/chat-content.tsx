"use client";

import { useChat } from "@ai-sdk/react";
import {
  DefaultChatTransport,
  lastAssistantMessageIsCompleteWithToolCalls,
} from "ai";
import { useMemo } from "react";
import { useLedger } from "@/lib/context/ledger-context";
import { ChatSuggestions } from "./chat-suggestions";
import { ChatMessages } from "./chat-messages";
import { ChatInput } from "./chat-input";

interface ChatContentProps {
  variant?: "page" | "drawer";
}

export function ChatContent({ variant = "page" }: ChatContentProps) {
  const { activeLedger, switchType } = useLedger();

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        body: { ledgerId: activeLedger.id, ledgerType: activeLedger.type },
      }),
    [activeLedger.id, activeLedger.type],
  );

  const { messages, sendMessage, addToolOutput, status } = useChat({
    transport,
    sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls,
  });

  const isLoading = status === "streaming" || status === "submitted";
  const isDrawer = variant === "drawer";

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
        onLedgerChange={switchType}
      />
    </div>
  );
}
