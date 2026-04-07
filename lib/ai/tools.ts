import { tool } from "ai";
import { z } from "zod";

export const registerExpense = tool({
  description:
    "Registra un gasto que el usuario mencionó. Extrae monto, categoría, nota y pilar Kakebo del contexto de la conversación.",
  inputSchema: z.object({
    amount: z.number().describe("Monto del gasto en la moneda local"),
    category: z
      .string()
      .describe("Categoría corta del gasto (ej: café, transporte, mercado)"),
    note: z
      .string()
      .describe("Descripción breve del gasto tal como lo dijo el usuario"),
    pillar: z
      .enum(["survival", "optional", "culture", "extras"])
      .describe("Pilar Kakebo al que pertenece el gasto"),
  }),
  execute: async ({ amount, category, note, pillar }) => {
    // TODO: Save to database via DrizzleExpenseRepository
    const today = new Date().toISOString().split("T")[0];
    return {
      id: crypto.randomUUID(),
      amount,
      category,
      note,
      pillar,
      date: today,
      status: "registered" as const,
    };
  },
});

export const askEmotion = tool({
  description:
    "Pregunta al usuario cómo se sintió con el gasto que acaba de registrar. Muestra opciones de emociones para elegir.",
  inputSchema: z.object({
    expenseId: z.string().describe("ID del gasto recién registrado"),
    message: z
      .string()
      .describe("Mensaje para preguntar sobre la emoción del gasto"),
  }),
  // No execute — handled on client
});

export const chatTools = {
  registerExpense,
  askEmotion,
};
