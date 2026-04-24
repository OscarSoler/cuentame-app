import { Transaction } from "../domain/transaction.entity";
import {
  TransactionRepository,
  UpdateTransactionData,
} from "../domain/transaction.repository";

interface UpdateTransactionConfig {
  repository: TransactionRepository;
}

export class UpdateTransaction {
  constructor(private config: UpdateTransactionConfig) {}

  async execute(id: string, updates: UpdateTransactionData): Promise<Transaction> {
    if (!id?.trim()) throw new Error("El id es requerido");

    if (updates.amount !== undefined) {
      if (!Number.isFinite(updates.amount) || updates.amount <= 0) {
        throw new Error("El monto debe ser mayor a 0");
      }
    }
    if (updates.type !== undefined && updates.type !== "income" && updates.type !== "expense") {
      throw new Error("El tipo debe ser income o expense");
    }
    if (updates.date !== undefined) {
      if (!(updates.date instanceof Date) || Number.isNaN(updates.date.getTime())) {
        throw new Error("La fecha es inválida");
      }
    }

    return this.config.repository.update(id, updates);
  }
}
