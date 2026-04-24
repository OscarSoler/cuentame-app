import { tool } from "ai";
import { z } from "zod";
import {
  createTransactionAction,
  updateTransactionAction,
} from "@/core/transaction/presentation/transaction.actions";

interface ToolContext {
  ledgerId: string;
}

export function buildChatTools({ ledgerId }: ToolContext) {
  const registerExpense = tool({
    description:
      "Registra un gasto/egreso. Extrae monto, categoría, nota y pilar del contexto. Para personal: survival, optional, culture, extras. Para negocio: operacion, inversion, variable, imprevisto.",
    inputSchema: z.object({
      amount: z.number().describe("Monto del gasto en pesos colombianos"),
      category: z
        .string()
        .describe("Categoría corta del gasto (ej: café, arriendo, nómina)"),
      note: z
        .string()
        .describe("Descripción breve del gasto tal como lo dijo el usuario"),
      pillar: z
        .enum(["survival", "optional", "culture", "extras", "operacion", "inversion", "variable", "imprevisto"])
        .describe("Pilar Kakebo: survival|optional|culture|extras (personal) o operacion|inversion|variable|imprevisto (negocio)"),
    }),
    execute: async ({ amount, category, note, pillar }) => {
      const today = new Date().toISOString().split("T")[0];
      const result = await createTransactionAction({
        ledgerId,
        amount,
        type: "expense",
        date: today,
        category,
        note,
        pillar,
      });

      if (!result.success) {
        return { status: "error" as const, error: result.error };
      }

      return {
        id: result.data.id,
        amount,
        type: "expense" as const,
        category,
        note,
        pillar,
        date: today,
        status: "registered" as const,
      };
    },
  });

  const registerIncome = tool({
    description:
      "Registra un ingreso o venta del negocio. Extrae monto, categoría y nota. Calcula IVA si aplica.",
    inputSchema: z.object({
      amount: z.number().describe("Monto del ingreso en pesos colombianos"),
      category: z
        .enum(["ventas", "servicios", "otros_ingresos"])
        .describe("Tipo de ingreso"),
      note: z.string().describe("Descripción breve del ingreso"),
      includesIva: z
        .boolean()
        .describe("Si el monto ya incluye IVA (19%). True por defecto para ventas y servicios."),
    }),
    execute: async ({ amount, category, note, includesIva }) => {
      const today = new Date().toISOString().split("T")[0];
      const ivaAmount = includesIva ? Math.round((amount * 19) / 119) : 0;

      const result = await createTransactionAction({
        ledgerId,
        amount,
        type: "income",
        date: today,
        category,
        note,
        taxType: includesIva ? "iva" : null,
        taxAmount: includesIva ? ivaAmount : null,
      });

      if (!result.success) {
        return { status: "error" as const, error: result.error };
      }

      return {
        id: result.data.id,
        amount,
        type: "income" as const,
        category,
        note,
        date: today,
        ivaAmount,
        status: "registered" as const,
      };
    },
  });

  const askEmotion = tool({
    description:
      "Pregunta al usuario cómo se sintió con la transacción que acaba de registrar.",
    inputSchema: z.object({
      expenseId: z.string().describe("ID de la transacción recién registrada"),
      message: z.string().describe("Mensaje para preguntar sobre la emoción"),
    }),
    outputSchema: z.object({
      emotion: z.enum(["happy", "neutral", "sad"]),
    }),
  });

  const saveEmotion = tool({
    description:
      "Guarda la emoción que el usuario sintió con una transacción ya registrada. Llámala después de que el usuario responda a askEmotion.",
    inputSchema: z.object({
      transactionId: z.string().describe("ID de la transacción a actualizar"),
      emotion: z
        .enum(["happy", "neutral", "sad"])
        .describe("Emoción del usuario: happy|neutral|sad"),
    }),
    execute: async ({ transactionId, emotion }) => {
      const result = await updateTransactionAction(transactionId, { emotion });
      if (!result.success) {
        return { status: "error" as const, error: result.error };
      }
      return { status: "saved" as const, transactionId, emotion };
    },
  });

  return { registerExpense, registerIncome, askEmotion, saveEmotion };
}
