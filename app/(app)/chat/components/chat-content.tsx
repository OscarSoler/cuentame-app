"use client";

import { useChat } from "@ai-sdk/react";
import {
  DefaultChatTransport,
  lastAssistantMessageIsCompleteWithToolCalls,
  type UIMessage,
} from "ai";
import { useEffect, useMemo, useState } from "react";
import { useLedger } from "@/lib/context/ledger-context";
import {
  getConversationMessagesAction,
  getOrCreateLatestConversationAction,
} from "@/core/conversation/presentation/conversation.actions";
import { ChatSuggestions } from "./chat-suggestions";
import { ChatMessages } from "./chat-messages";
import { ChatInput } from "./chat-input";

interface ChatContentProps {
  variant?: "page" | "drawer";
}

export function ChatContent({ variant = "page" }: ChatContentProps) {
  const { activeLedger } = useLedger();
  return <ChatContentInner key={activeLedger.id} variant={variant} />;
}

function ChatContentInner({ variant }: ChatContentProps) {
  const { activeLedger, switchType } = useLedger();
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [initialMessages, setInitialMessages] = useState<UIMessage[]>([]);
  const [isHydrating, setIsHydrating] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const convo = await getOrCreateLatestConversationAction(activeLedger.id);
      if (!convo.success || cancelled) {
        if (!cancelled) setIsHydrating(false);
        return;
      }

      const withMessages = await getConversationMessagesAction(convo.data.id);
      if (cancelled) return;

      setConversationId(convo.data.id);
      if (withMessages.success) {
        setInitialMessages(
          withMessages.data.messages.map(
            (m) => ({ id: m.id, role: m.role, parts: m.parts }) as UIMessage,
          ),
        );
      }
      setIsHydrating(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [activeLedger.id]);

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        body: {
          ledgerId: activeLedger.id,
          ledgerType: activeLedger.type,
          conversationId,
        },
      }),
    [activeLedger.id, activeLedger.type, conversationId],
  );

  const { messages, sendMessage, addToolOutput, status } = useChat({
    messages: initialMessages,
    transport,
    sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls,
  });

  if (isHydrating) return null;

  const isLoading = status === "streaming" || status === "submitted";
  const isDrawer = variant === "drawer";
  const hasMessages = messages.length > 0;

  return (
    <div className="flex flex-col w-full h-full">
      {hasMessages ? (
        <ChatMessages
          messages={messages}
          isLoading={isLoading}
          onToolOutput={addToolOutput}
        />
      ) : (
        <ChatSuggestions
          isDrawer={isDrawer}
          ledgerType={activeLedger.type}
          onSelect={(prompt) => {
            if (!isLoading) sendMessage({ text: prompt });
          }}
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
