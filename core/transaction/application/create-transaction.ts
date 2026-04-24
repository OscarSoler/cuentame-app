import { Transaction } from "../domain/transaction.entity";
import {
  CreateTransactionData,
  TransactionRepository,
} from "../domain/transaction.repository";

interface CreateTransactionConfig {
  repository: TransactionRepository;
}

export class CreateTransaction {
  constructor(private config: CreateTransactionConfig) {}

  async execute(input: CreateTransactionData): Promise<Transaction> {
    if (!input.ledgerId?.trim()) throw new Error("El ledgerId es requerido");
    if (!Number.isFinite(input.amount) || input.amount <= 0) {
      throw new Error("El monto debe ser mayor a 0");
    }
    if (input.type !== "income" && input.type !== "expense") {
      throw new Error("El tipo debe ser income o expense");
    }
    if (!(input.date instanceof Date) || Number.isNaN(input.date.getTime())) {
      throw new Error("La fecha es inválida");
    }
    if (input.isRecurring && (input.recurringDay == null || input.recurringDay < 1 || input.recurringDay > 31)) {
      throw new Error("El día recurrente debe estar entre 1 y 31");
    }

    return this.config.repository.create(input);
  }
}
