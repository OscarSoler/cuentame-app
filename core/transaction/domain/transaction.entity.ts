export type TransactionType = "income" | "expense";
export type PersonalPillar = "survival" | "optional" | "culture" | "extras";
export type BusinessPillar = "operacion" | "inversion" | "variable" | "imprevisto";
export type TransactionPillar = PersonalPillar | BusinessPillar;
export type TransactionEmotion = "happy" | "neutral" | "sad";
export type TransactionTaxType = "iva" | "retefuente" | "ica";

export interface TransactionConfig {
  id: string;
  ledgerId: string;
  amount: number;
  type: TransactionType;
  date: Date;
  pillar?: TransactionPillar | null;
  category?: string | null;
  emotion?: TransactionEmotion | null;
  note?: string | null;
  isRecurring?: boolean;
  recurringDay?: number | null;
  taxType?: TransactionTaxType | null;
  taxAmount?: number | null;
  createdAt?: Date | null;
}

export class Transaction {
  readonly id: string;
  readonly ledgerId: string;
  readonly amount: number;
  readonly type: TransactionType;
  readonly date: Date;
  readonly pillar: TransactionPillar | null;
  readonly category: string | null;
  readonly emotion: TransactionEmotion | null;
  readonly note: string | null;
  readonly isRecurring: boolean;
  readonly recurringDay: number | null;
  readonly taxType: TransactionTaxType | null;
  readonly taxAmount: number | null;
  readonly createdAt: Date | null;

  constructor(config: TransactionConfig) {
    this.id = config.id;
    this.ledgerId = config.ledgerId;
    this.amount = config.amount;
    this.type = config.type;
    this.date = config.date;
    this.pillar = config.pillar ?? null;
    this.category = config.category ?? null;
    this.emotion = config.emotion ?? null;
    this.note = config.note ?? null;
    this.isRecurring = config.isRecurring ?? false;
    this.recurringDay = config.recurringDay ?? null;
    this.taxType = config.taxType ?? null;
    this.taxAmount = config.taxAmount ?? null;
    this.createdAt = config.createdAt ?? null;
  }

  isIncome(): boolean {
    return this.type === "income";
  }

  isExpense(): boolean {
    return this.type === "expense";
  }

  withinMonth(year: number, month: number): boolean {
    return this.date.getFullYear() === year && this.date.getMonth() + 1 === month;
  }

  signedAmount(): number {
    return this.isIncome() ? this.amount : -this.amount;
  }
}
