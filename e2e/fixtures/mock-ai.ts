import type { Page, Route } from "@playwright/test";

/**
 * Intercepta POST /api/chat y devuelve un stream que imita el wire format del
 * AI SDK (toUIMessageStreamResponse).
 *
 * Notas sobre el formato:
 * - El cliente espera un stream de eventos JSON separados por `\n`. Cada evento
 *   es un objeto con `type` y campos asociados. Los tipos básicos son:
 *     { type: "text-start", id }
 *     { type: "text-delta", id, delta: "..." }
 *     { type: "text-end", id }
 *     { type: "finish" }
 * - Para tool-calls:
 *     { type: "tool-input-start", toolCallId, toolName }
 *     { type: "tool-input-delta", toolCallId, inputTextDelta: "..." }
 *     { type: "tool-input-available", toolCallId, toolName, input: {...} }
 *     { type: "tool-output-available", toolCallId, output: ... }
 *
 * Si el formato cambia con la versión del SDK, ajustar aquí.
 */

export interface MockAiOptions {
  text?: string;
  toolCalls?: Array<{
    name: string;
    input: Record<string, unknown>;
    output?: unknown;
  }>;
}

export async function mockAi(page: Page, opts: MockAiOptions = {}) {
  await page.route("**/api/chat", async (route: Route) => {
    if (route.request().method() !== "POST") {
      return route.continue();
    }
    const body = buildStreamBody(opts);
    await route.fulfill({
      status: 200,
      headers: {
        "content-type": "text/event-stream; charset=utf-8",
        "cache-control": "no-cache",
        "x-vercel-ai-ui-message-stream": "v1",
      },
      body,
    });
  });
}

function buildStreamBody(opts: MockAiOptions): string {
  const events: object[] = [];
  const textId = "txt-1";

  events.push({ type: "start" });
  events.push({ type: "start-step" });

  if (opts.text) {
    events.push({ type: "text-start", id: textId });
    events.push({ type: "text-delta", id: textId, delta: opts.text });
    events.push({ type: "text-end", id: textId });
  }

  for (const [i, tc] of (opts.toolCalls ?? []).entries()) {
    const id = `tc-${i + 1}`;
    events.push({ type: "tool-input-start", toolCallId: id, toolName: tc.name });
    events.push({
      type: "tool-input-available",
      toolCallId: id,
      toolName: tc.name,
      input: tc.input,
    });
    if (tc.output !== undefined) {
      events.push({
        type: "tool-output-available",
        toolCallId: id,
        output: tc.output,
      });
    }
  }

  events.push({ type: "finish-step" });
  events.push({ type: "finish" });

  return events.map((e) => `data: ${JSON.stringify(e)}\n\n`).join("") + "data: [DONE]\n\n";
}
