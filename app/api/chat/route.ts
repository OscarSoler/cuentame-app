import { openai } from "@ai-sdk/openai";
import { streamText, UIMessage, convertToModelMessages } from "ai";
import { requireSession } from "@/core/_shared/action";
import { assertLedgerOwnership } from "@/core/_shared/ownership";
import { DrizzleConversationRepository } from "@/core/conversation/infrastructure/drizzle-conversation.repository";
import {
  AppendMessages,
  GetOrCreateLatest,
} from "@/core/conversation/application";
import type { MessageRole } from "@/core/conversation/domain/message.entity";
import { getSystemPrompt } from "./system-prompt";
import { buildChatTools } from "./tools";

export async function POST(req: Request) {
  const {
    messages,
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

  const session = await requireSession();

  const conversationRepo = new DrizzleConversationRepository();
  let conversationId: string;
  try {
    const [, conversation] = await Promise.all([
      assertLedgerOwnership(session.user.id, ledgerId),
      requestedConversationId
        ? conversationRepo.getByIdForUser(requestedConversationId, session.user.id)
        : new GetOrCreateLatest({ repository: conversationRepo }).execute(ledgerId),
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

  const originalCount = messages.length;

  const result = streamText({
    model: openai("gpt-4.1-nano"),
    system: getSystemPrompt(ledgerType),
    messages: await convertToModelMessages(messages),
    tools: buildChatTools({ ledgerId }),
  });

  return result.toUIMessageStreamResponse({
    originalMessages: messages,
    async onFinish({ messages: finalMessages }) {
      const delta = finalMessages.slice(originalCount - 1);
      if (delta.length === 0) return;

      await new AppendMessages({ repository: conversationRepo }).execute({
        conversationId,
        messages: delta.map((m) => ({
          role: m.role as MessageRole,
          parts: m.parts,
        })),
      });
    },
  });
}
