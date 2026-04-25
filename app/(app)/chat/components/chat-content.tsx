"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useEffect, useMemo, useState } from "react";
import { useLedger } from "@/lib/context/ledger-context";
import {
  getConversationMessagesAction,
  getOrCreateLatestConversationAction,
} from "@/core/conversation/presentation/conversation.actions";
import { ChatSuggestions } from "./chat-suggestions";
import { ChatMessages } from "./chat-messages";
import { ChatInput } from "./chat-input";
import { ChatSkeleton } from "./chat-skeleton";

interface ChatContentProps {
  variant?: "page" | "drawer";
}

export function ChatContent({ variant = "page" }: ChatContentProps) {
  const { activeLedger, switchType } = useLedger();
  const [state, setState] = useState<
    | { status: "loading" }
    | { status: "ready"; conversationId: string; initialMessages: UIMessage[] }
    | { status: "error"; error: string }
  >({ status: "loading" });

  useEffect(() => {
    let cancelled = false;
    setState({ status: "loading" });

    (async () => {
      const convo = await getOrCreateLatestConversationAction(activeLedger.id);
      if (cancelled) return;
      if (!convo.success) {
        setState({ status: "error", error: convo.error });
        return;
      }

      const withMessages = await getConversationMessagesAction(convo.data.id);
      if (cancelled) return;

      if (!withMessages.success) {
        setState({ status: "error", error: withMessages.error });
        return;
      }

      const initialMessages = withMessages.data.messages.map(
        (m) => ({ id: m.id, role: m.role, parts: m.parts }) as UIMessage,
      );

      setState({
        status: "ready",
        conversationId: convo.data.id,
        initialMessages,
      });
    })();

    return () => {
      cancelled = true;
    };
  }, [activeLedger.id]);

  if (state.status === "loading")
    return <ChatSkeleton isDrawer={variant === "drawer"} />;
  if (state.status === "error") {
    console.error("[ChatContent] hydration error:", state.error);
    return null;
  }

  return (
    <ChatContentReady
      key={state.conversationId}
      conversationId={state.conversationId}
      initialMessages={state.initialMessages}
      variant={variant}
      ledgerId={activeLedger.id}
      ledgerType={activeLedger.type}
      onLedgerChange={switchType}
    />
  );
}

interface ChatContentReadyProps {
  conversationId: string;
  initialMessages: UIMessage[];
  variant: "page" | "drawer";
  ledgerId: string;
  ledgerType: "personal" | "business";
  onLedgerChange: (type: "personal" | "business") => void;
}

function ChatContentReady({
  conversationId,
  initialMessages,
  variant,
  ledgerId,
  ledgerType,
  onLedgerChange,
}: ChatContentReadyProps) {
  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        prepareSendMessagesRequest({ messages }) {
          return {
            body: {
              message: messages[messages.length - 1],
              ledgerId,
              ledgerType,
              conversationId,
            },
          };
        },
      }),
    [ledgerId, ledgerType, conversationId],
  );

  const { messages, sendMessage, status } = useChat({
    messages: initialMessages,
    transport,
  });

  const isLoading = status === "streaming" || status === "submitted";
  const isDrawer = variant === "drawer";
  const hasMessages = messages.length > 0;

  return (
    <div className="flex flex-col w-full h-full">
      {hasMessages ? (
        <ChatMessages messages={messages} isLoading={isLoading} />
      ) : (
        <ChatSuggestions
          isDrawer={isDrawer}
          ledgerType={ledgerType}
          onSelect={(prompt) => {
            if (!isLoading) sendMessage({ text: prompt });
          }}
        />
      )}
      <ChatInput
        isDrawer={isDrawer}
        isLoading={isLoading}
        activeLedgerType={ledgerType}
        onSubmit={(text) => sendMessage({ text })}
        onLedgerChange={onLedgerChange}
      />
    </div>
  );
}
