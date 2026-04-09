import { tool } from "ai";
import { z } from "zod";

export const registerExpense = tool({
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
      .string()
      .describe("Pilar Kakebo: survival|optional|culture|extras (personal) o operacion|inversion|variable|imprevisto (negocio)"),
  }),
  execute: async ({ amount, category, note, pillar }) => {
    const today = new Date().toISOString().split("T")[0];
    return {
      id: crypto.randomUUID(),
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

export const registerIncome = tool({
  description:
    "Registra un ingreso o venta del negocio. Extrae monto, categoría y nota. Calcula IVA si aplica.",
  inputSchema: z.object({
    amount: z.number().describe("Monto del ingreso en pesos colombianos"),
    category: z
      .enum(["ventas", "servicios", "otros_ingresos"])
      .describe("Tipo de ingreso"),
    note: z
      .string()
      .describe("Descripción breve del ingreso"),
    includesIva: z
      .boolean()
      .describe("Si el monto ya incluye IVA (19%). True por defecto para ventas y servicios."),
  }),
  execute: async ({ amount, category, note, includesIva }) => {
    const today = new Date().toISOString().split("T")[0];
    const ivaAmount = includesIva ? Math.round((amount * 19) / 119) : 0;
    return {
      id: crypto.randomUUID(),
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

export const askEmotion = tool({
  description:
    "Pregunta al usuario cómo se sintió con la transacción que acaba de registrar.",
  inputSchema: z.object({
    expenseId: z.string().describe("ID de la transacción recién registrada"),
    message: z
      .string()
      .describe("Mensaje para preguntar sobre la emoción"),
  }),
});

export const chatTools = {
  registerExpense,
  registerIncome,
  askEmotion,
};
