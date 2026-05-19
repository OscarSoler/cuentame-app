export type LedgerKind = "personal" | "business";

export interface StepProps {
  onNext: () => void;
}

export interface NameStepProps extends StepProps {
  name: string;
  onNameChange: (name: string) => void;
}

export interface LedgerTypeStepProps extends StepProps {
  ledgerTypes: LedgerKind[];
  onToggleLedgerType: (type: LedgerKind) => void;
}

export interface BusinessSetupStepProps extends StepProps {
  businessName: string;
  onBusinessNameChange: (name: string) => void;
  businessType: string;
  onBusinessTypeChange: (type: string) => void;
}
