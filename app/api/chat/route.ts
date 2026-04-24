import { openai } from "@ai-sdk/openai";
import { streamText, UIMessage, convertToModelMessages } from "ai";
import { getSystemPrompt } from "./system-prompt";
import { buildChatTools } from "./tools";

export async function POST(req: Request) {
  const {
    messages,
    ledgerId,
    ledgerType = "personal",
  }: {
    messages: UIMessage[];
    ledgerId: string;
    ledgerType?: "personal" | "business";
  } = await req.json();

  if (!ledgerId) {
    return new Response("ledgerId es requerido", { status: 400 });
  }

  const result = streamText({
    model: openai("gpt-4.1-nano"),
    system: getSystemPrompt(ledgerType),
    messages: await convertToModelMessages(messages),
    tools: buildChatTools({ ledgerId }),
  });

  return result.toUIMessageStreamResponse();
}
