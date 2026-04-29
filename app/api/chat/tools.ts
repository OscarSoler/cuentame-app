import { tool } from "ai";
import { z } from "zod";
import { createTransactionAction } from "@/core/transaction/presentation/transaction.actions";
import { localDateISO } from "@/lib/utils";

interface ToolContext {
  ledgerId: string;
  ledgerType: "personal" | "business";
}

export function buildChatTools({ ledgerId, ledgerType }: ToolContext) {
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
      const today = localDateISO();
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
      const today = localDateISO();
      const applyIva = ledgerType === "business" && includesIva;
      const ivaAmount = applyIva ? Math.round((amount * 19) / 119) : 0;

      const result = await createTransactionAction({
        ledgerId,
        amount,
        type: "income",
        date: today,
        category,
        note,
        taxType: applyIva ? "iva" : null,
        taxAmount: applyIva ? ivaAmount : null,
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

  return { registerExpense, registerIncome };
}
