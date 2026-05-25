import { openai } from "@ai-sdk/openai";
import {
  streamText,
  UIMessage,
  convertToModelMessages,
  validateUIMessages,
  type Tool,
} from "ai";
import { requireSession } from "@/core/_shared/action";
import { assertLedgerOwnership } from "@/core/_shared/ownership";
import { DrizzleConversationRepository } from "@/core/conversation/infrastructure/drizzle-conversation.repository";
import {
  GetOrCreateLatest,
  SaveMessages,
  toSaveMessagesInput,
} from "@/core/conversation/application";
import { getSystemPrompt } from "./system-prompt";
import { buildChatTools } from "./tools";

export async function POST(req: Request) {
  const {
    messages: incomingMessages,
    ledgerId,
    conversationId: requestedConversationId,
    ledgerType = "personal",
  }: {
    messages: UIMessage[];
    ledgerId: string;
    conversationId?: string;
    ledgerType?: "personal" | "business";
  } = await req.json();

  if (!ledgerId) {
    return new Response("ledgerId es requerido", { status: 400 });
  }
  if (!incomingMessages?.length) {
    return new Response("messages es requerido", { status: 400 });
  }

  const session = await requireSession();
  const conversationRepo = new DrizzleConversationRepository();

  let conversationId: string;
  try {
    await assertLedgerOwnership(session.user.id, ledgerId);

    let conversation = requestedConversationId
      ? await conversationRepo.getByIdForUser(
          requestedConversationId,
          session.user.id,
        )
      : null;

    if (conversation && conversation.ledgerId !== ledgerId) {
      conversation = null;
    }

    if (!conversation) {
      conversation = await new GetOrCreateLatest({
        repository: conversationRepo,
      }).execute(ledgerId);
    }

    conversationId = conversation.id;
  } catch (err) {
    return new Response(err instanceof Error ? err.message : "No autorizado", {
      status: 403,
    });
  }

  const tools = buildChatTools({ ledgerId, ledgerType });

  const messages = await validateUIMessages({
    messages: incomingMessages,
    tools: tools as Record<string, Tool<unknown, unknown>>,
  });

  const hasImage = messages.some((m) =>
    m.parts.some((p) => p.type === "file" && p.mediaType?.startsWith("image/")),
  );

  const result = streamText({
    model: openai(hasImage ? "gpt-4o-mini" : "gpt-5.4-nano"),
    system: getSystemPrompt(ledgerType),
    messages: await convertToModelMessages(messages),
    tools,
    onError({ error }) {
      console.error("[/api/chat] streamText error:", {
        conversationId,
        ledgerId,
        ledgerType,
        error: error instanceof Error ? { message: error.message, stack: error.stack } : error,
      });
    },
  });

  result.consumeStream();

  const response = result.toUIMessageStreamResponse({
    originalMessages: messages,
    async onFinish({ messages: finalMessages }) {
      try {
        await new SaveMessages({ repository: conversationRepo }).execute(
          toSaveMessagesInput(conversationId, finalMessages),
        );
      } catch (error) {
        console.error("[/api/chat] onFinish persist failed:", {
          conversationId,
          messageCount: finalMessages.length,
          error: error instanceof Error ? error.message : error,
        });
        throw error;
      }
    },
  });

  response.headers.set("X-Conversation-Id", conversationId);
  return response;
}
