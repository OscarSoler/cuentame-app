"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { HugeiconsIcon } from "@hugeicons/react";
import { SmartPhone01Icon } from "@hugeicons/core-free-icons";
import { sendPhoneOtpAction } from "@/core/auth/presentation/auth.actions";
import { validateColombianMobile } from "@/lib/phone";

export type VerifyResult =
  | { success: true; hasLedgers?: boolean }
  | { success: false; error: string };

interface PhoneAuthFormProps {
  onVerify: (
    phoneNumber: string,
    code: string,
  ) => Promise<VerifyResult | void>;
  onSuccess?: (result: { hasLedgers?: boolean }) => Promise<void> | void;
}

type SubStep = "phone" | "otp";

export function PhoneAuthForm({ onVerify, onSuccess }: PhoneAuthFormProps) {
  const [subStep, setSubStep] = useState<SubStep>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSendOtp = async () => {
    if (loading) return;
    setError("");
    const validation = validateColombianMobile(`+57${phone.replace(/\D/g, "")}`);
    if (!validation.valid) {
      setError(validation.error);
      return;
    }
    setLoading(true);
    const result = await sendPhoneOtpAction(validation.e164);
    setLoading(false);
    if (!result.success) {
      setError(result.error);
      return;
    }
    setPhone(validation.e164);
    setSubStep("otp");
  };

  const handleVerify = async (code: string) => {
    if (loading) return;
    setError("");
    setLoading(true);
    const result = await onVerify(phone, code);

    if (!result) return;

    if (!result.success) {
      setLoading(false);
      setError(
        result.error === "Invalid OTP"
          ? "Código incorrecto o expirado"
          : result.error,
      );
      setOtp("");
      return;
    }

    if (onSuccess) {
      await onSuccess({ hasLedgers: result.hasLedgers });
    }
  };

  const handleOtpChange = (val: string) => {
    if (loading) return;
    setOtp(val);
    if (val.length === 6) handleVerify(val);
  };

  if (subStep === "otp") {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center flex-1 gap-6">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin" />
          </div>
          <p className="text-base text-muted-foreground">Verificando...</p>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center text-center flex-1 justify-between py-10 px-6">
        <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground/70">
          Verificación
        </div>

        <div className="flex flex-col items-center gap-6">
          <div className="w-14 h-14 rounded-full bg-accent/40 flex items-center justify-center">
            <HugeiconsIcon icon={SmartPhone01Icon} size={28} className="text-primary" strokeWidth={1.5} />
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="font-heading text-2xl leading-snug text-foreground">
              Código de verificación
            </h2>
            <p className="text-muted-foreground text-sm max-w-65 leading-relaxed">
              Enviamos un código a {phone}
            </p>
          </div>

          <InputOTP maxLength={6} value={otp} onChange={handleOtpChange} disabled={loading}>
            <InputOTPGroup className="gap-2">
              {Array.from({ length: 6 }, (_, i) => (
                <InputOTPSlot key={i} index={i} className="size-12 text-xl rounded-xl border" />
              ))}
            </InputOTPGroup>
          </InputOTP>

          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>

        <Button
          variant="ghost"
          className="w-full max-w-65"
          onClick={() => {
            setSubStep("phone");
            setOtp("");
            setError("");
            setPhone(phone.replace(/^\+57/, ""));
          }}
        >
          Cambiar número
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center text-center flex-1 justify-between py-10 px-6">
      <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground/70">
        Tu acceso
      </div>

      <form onSubmit={(e) => { e.preventDefault(); handleSendOtp(); }} className="flex flex-col items-center gap-6 w-full">
        <div className="w-14 h-14 rounded-full bg-accent/40 flex items-center justify-center">
          <HugeiconsIcon icon={SmartPhone01Icon} size={28} className="text-primary" strokeWidth={1.5} />
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="font-heading text-2xl leading-snug text-foreground">
            ¿Cuál es tu WhatsApp?
          </h2>
          <p className="text-muted-foreground text-sm max-w-65 leading-relaxed">
            Te enviaremos un código para confirmar tu acceso
          </p>
        </div>

        <div className="w-full max-w-72 flex items-center justify-center gap-2 border-b-2 border-border focus-within:border-primary py-3 transition-colors">
          <span className="text-3xl font-light tracking-wide text-muted-foreground select-none">
            +57
          </span>
          <input
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            placeholder="300 123 4567"
            value={phone}
            onChange={(e) => {
              const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
              setPhone(digits);
            }}
            maxLength={10}
            autoFocus
            className="flex-1 min-w-0 text-center text-3xl font-light tracking-wide bg-transparent focus:outline-none text-foreground placeholder:text-muted-foreground/40"
          />
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}
      </form>

      <Button onClick={handleSendOtp} disabled={loading || phone.length !== 10} className="w-full">
        {loading ? "Enviando..." : "Continuar"}
      </Button>
    </div>
  );
}
