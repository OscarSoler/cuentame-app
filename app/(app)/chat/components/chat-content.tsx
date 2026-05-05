"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useLedger } from "@/lib/context/ledger-context";
import {
  getConversationMessagesAction,
  getOrCreateLatestConversationAction,
  replaceMessagesAction,
} from "@/core/conversation/presentation/conversation.actions";
import type { MessageRole } from "@/core/conversation/domain/message.entity";
import { ChatSuggestions } from "./chat-suggestions";
import { ChatMessages } from "./chat-messages";
import { ChatInput } from "./chat-input";
import { ChatQuickPills } from "./chat-quick-pills";
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

  const { messages, sendMessage, setMessages, status } = useChat({
    messages: initialMessages,
    transport,
  });

  const persistMessages = useCallback(
    (next: UIMessage[]) => {
      void replaceMessagesAction({
        conversationId,
        messages: next.map((m) => ({
          role: m.role as MessageRole,
          parts: m.parts,
        })),
      }).then((result) => {
        if (!result.success) {
          console.error("[ChatContent] persist failed:", result.error);
        }
      });
    },
    [conversationId],
  );

  const handleTransactionEdited = useCallback(
    (toolCallId: string, patch: Record<string, unknown>) => {
      setMessages((prev) => {
        const next = applyEditToMessages(prev, toolCallId, patch);
        persistMessages(next);
        return next;
      });
    },
    [setMessages, persistMessages],
  );

  const handleTransactionDeleted = useCallback(
    (toolCallId: string) => {
      setMessages((prev) => {
        const next = removeToolPart(prev, toolCallId);
        persistMessages(next);
        return next;
      });
    },
    [setMessages, persistMessages],
  );

  const isLoading = status === "streaming" || status === "submitted";
  const isDrawer = variant === "drawer";
  const hasMessages = messages.length > 0;

  return (
    <div className="flex flex-col w-full h-full">
      {hasMessages ? (
        <>
          <ChatMessages
            messages={messages}
            isLoading={isLoading}
            onTransactionEdited={handleTransactionEdited}
            onTransactionDeleted={handleTransactionDeleted}
          />
          <ChatQuickPills
            ledgerType={ledgerType}
            isLoading={isLoading}
            onSelect={(prompt) => {
              if (!isLoading) sendMessage({ text: prompt });
            }}
          />
        </>
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
        onSubmit={({ text, attachment }) => {
          if (attachment) {
            const filePart = {
              type: "file" as const,
              mediaType: attachment.mediaType,
              url: attachment.url,
            };
            if (text.trim()) {
              sendMessage({ text, files: [filePart] });
            } else {
              sendMessage({ files: [filePart] });
            }
          } else {
            sendMessage({ text });
          }
        }}
        onLedgerChange={onLedgerChange}
      />
    </div>
  );
}

function applyEditToMessages(
  messages: UIMessage[],
  toolCallId: string,
  patch: Record<string, unknown>,
): UIMessage[] {
  return messages.map((message) => {
    if (message.role !== "assistant") return message;
    let changed = false;
    const parts = message.parts.map((part) => {
      const p = part as { type?: string; toolCallId?: string; output?: unknown };
      if (
        typeof p.type === "string" &&
        p.type.startsWith("tool-") &&
        p.toolCallId === toolCallId &&
        p.output &&
        typeof p.output === "object"
      ) {
        changed = true;
        return {
          ...part,
          output: { ...(p.output as Record<string, unknown>), ...patch },
        };
      }
      return part;
    });
    return changed ? { ...message, parts: parts as typeof message.parts } : message;
  });
}

function removeToolPart(messages: UIMessage[], toolCallId: string): UIMessage[] {
  return messages
    .map((message) => {
      if (message.role !== "assistant") return message;
      const parts = message.parts.filter((part) => {
        const p = part as { toolCallId?: string };
        return p.toolCallId !== toolCallId;
      });
      if (parts.length === message.parts.length) return message;
      return { ...message, parts: parts as typeof message.parts };
    })
    .filter((message) => message.role !== "assistant" || message.parts.length > 0);
}
