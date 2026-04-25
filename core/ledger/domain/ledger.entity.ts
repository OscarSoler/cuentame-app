export interface LedgerConfig {
  id: string;
  userId: string;
  name: string;
  type: "personal" | "business";
  businessName?: string | null;
  businessType?: string | null;
  createdAt?: Date | null;
}

export class Ledger {
  readonly id: string;
  readonly userId: string;
  readonly name: string;
  readonly type: "personal" | "business";
  readonly businessName: string | null;
  readonly businessType: string | null;
  readonly createdAt: Date | null;

  constructor(config: LedgerConfig) {
    this.id = config.id;
    this.userId = config.userId;
    this.name = config.name;
    this.type = config.type as "personal" | "business";
    this.businessName = config.businessName ?? null;
    this.businessType = config.businessType ?? null;
    this.createdAt = config.createdAt ?? null;
  }
}
