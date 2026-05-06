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
  AppendMessages,
  GetConversation,
  GetOrCreateLatest,
} from "@/core/conversation/application";
import type { MessageRole } from "@/core/conversation/domain/message.entity";
import { getSystemPrompt } from "./system-prompt";
import { buildChatTools } from "./tools";

export async function POST(req: Request) {
  const {
    message,
    ledgerId,
    conversationId: requestedConversationId,
    ledgerType = "personal",
  }: {
    message: UIMessage;
    ledgerId: string;
    conversationId?: string;
    ledgerType?: "personal" | "business";
  } = await req.json();

  if (!ledgerId) {
    return new Response("ledgerId es requerido", { status: 400 });
  }
  if (!message) {
    return new Response("message es requerido", { status: 400 });
  }

  const session = await requireSession();
  const conversationRepo = new DrizzleConversationRepository();

  let conversationId: string;
  try {
    const [, conversation] = await Promise.all([
      assertLedgerOwnership(session.user.id, ledgerId),
      requestedConversationId
        ? conversationRepo.getByIdForUser(
            requestedConversationId,
            session.user.id,
          )
        : new GetOrCreateLatest({ repository: conversationRepo }).execute(
            ledgerId,
          ),
    ]);

    if (!conversation) {
      return new Response("Conversación no autorizada", { status: 403 });
    }
    conversationId = conversation.id;
  } catch (err) {
    return new Response(err instanceof Error ? err.message : "No autorizado", {
      status: 403,
    });
  }

  const tools = buildChatTools({ ledgerId, ledgerType });
  const previous = await new GetConversation({
    repository: conversationRepo,
  }).byIdWithMessages(conversationId);
  const previousMessages = (previous?.messages ?? []).map(
    (m) => ({ id: m.id, role: m.role, parts: m.parts }) as UIMessage,
  );

  const messages = await validateUIMessages({
    messages: [...previousMessages, message],
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
  });

  result.consumeStream();

  return result.toUIMessageStreamResponse({
    originalMessages: messages,
    async onFinish({ responseMessage }) {
      await new AppendMessages({ repository: conversationRepo }).execute({
        conversationId,
        messages: [message, responseMessage].map((m) => ({
          role: m.role as MessageRole,
          parts: m.parts,
        })),
      });
    },
  });
}
