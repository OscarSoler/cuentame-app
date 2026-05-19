import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { StyleSection } from "./style-section";

export function InputShowcase() {
  return (
    <StyleSection
      title="Inputs"
      description="Campos de texto y código OTP con estados focus, invalid y disabled."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4 rounded-xl bg-card p-6 ring-1 ring-foreground/10">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Default</label>
            <Input placeholder="ejemplo@correo.com" />
            <code className="font-mono text-xs text-muted-foreground">
              {`<Input placeholder="..." />`}
            </code>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">Invalid</label>
            <Input
              aria-invalid="true"
              defaultValue="correo-invalido"
              readOnly
            />
            <code className="font-mono text-xs text-muted-foreground">
              {`aria-invalid="true"`}
            </code>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">Disabled</label>
            <Input disabled defaultValue="No editable" />
            <code className="font-mono text-xs text-muted-foreground">
              disabled
            </code>
          </div>
        </div>

        <div className="space-y-4 rounded-xl bg-card p-6 ring-1 ring-foreground/10">
          <div className="space-y-2">
            <label className="text-sm font-medium">InputOTP — 6 dígitos</label>
            <InputOTP maxLength={6}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <code className="font-mono text-xs text-muted-foreground">
              {`<InputOTP maxLength={6}> ... </InputOTP>`}
            </code>
          </div>
        </div>
      </div>
    </StyleSection>
  );
}
