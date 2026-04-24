import { TransactionRepository } from "../domain/transaction.repository";

interface DeleteTransactionConfig {
  repository: TransactionRepository;
}

export class DeleteTransaction {
  constructor(private config: DeleteTransactionConfig) {}

  async execute(id: string): Promise<void> {
    if (!id?.trim()) throw new Error("El id es requerido");
    await this.config.repository.delete(id);
  }
}
