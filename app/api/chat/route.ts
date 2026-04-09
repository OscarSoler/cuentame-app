import { openai } from "@ai-sdk/openai";
import { streamText, UIMessage, convertToModelMessages } from "ai";
import { getSystemPrompt } from "./system-prompt";
import { chatTools } from "./tools";

export async function POST(req: Request) {
  const {
    messages,
    ledgerType = "personal",
  }: {
    messages: UIMessage[];
    ledgerType?: "personal" | "business";
  } = await req.json();

  const result = streamText({
    model: openai("gpt-4.1-nano"),
    system: getSystemPrompt(ledgerType),
    messages: await convertToModelMessages(messages),
    tools: chatTools,
  });

  return result.toUIMessageStreamResponse();
}
