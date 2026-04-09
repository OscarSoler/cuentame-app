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
import { authClient } from "@/lib/auth-client";

interface PhoneAuthStepProps {
  onSuccess: () => void;
}

type SubStep = "phone" | "otp";

export function PhoneAuthStep({ onSuccess }: PhoneAuthStepProps) {
  const [subStep, setSubStep] = useState<SubStep>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSendOtp = async () => {
    setError("");
    const normalized = phone.startsWith("+") ? phone : `+${phone}`;
    if (normalized.length < 8) {
      setError("Ingresa un número válido con código de país");
      return;
    }
    setLoading(true);
    const { error: err } = await authClient.phoneNumber.sendOtp({
      phoneNumber: normalized,
    });
    setLoading(false);
    if (err) {
      setError(err.message ?? "No se pudo enviar el código");
      return;
    }
    setPhone(normalized);
    setSubStep("otp");
  };

  const handleVerify = async (code: string) => {
    setError("");
    setLoading(true);
    const { error: err } = await authClient.phoneNumber.verify({
      phoneNumber: phone,
      code,
    });
    setLoading(false);
    if (err) {
      setError(err.message ?? "Código incorrecto");
      setOtp("");
      return;
    }
    onSuccess();
  };

  const handleOtpChange = (val: string) => {
    setOtp(val);
    if (val.length === 6) handleVerify(val);
  };

  if (subStep === "otp") {
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
              <InputOTPSlot index={0} className="size-12 text-xl rounded-xl border" />
              <InputOTPSlot index={1} className="size-12 text-xl rounded-xl border" />
              <InputOTPSlot index={2} className="size-12 text-xl rounded-xl border" />
              <InputOTPSlot index={3} className="size-12 text-xl rounded-xl border" />
              <InputOTPSlot index={4} className="size-12 text-xl rounded-xl border" />
              <InputOTPSlot index={5} className="size-12 text-xl rounded-xl border" />
            </InputOTPGroup>
          </InputOTP>

          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>

        <div className="flex flex-col gap-3 w-full max-w-65">
          {loading && <p className="text-sm text-muted-foreground text-center">Verificando...</p>}
          <Button variant="ghost" onClick={() => { setSubStep("phone"); setOtp(""); setError(""); }} disabled={loading}>
            Cambiar número
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center text-center flex-1 justify-between py-10 px-6">
      <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground/70">
        Tu acceso
      </div>

      <div className="flex flex-col items-center gap-6 w-full">
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

        <input
          type="tel"
          inputMode="tel"
          placeholder="+57 300 123 4567"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          autoFocus
          className="w-full max-w-72 text-center text-3xl font-light tracking-wide bg-transparent border-b-2 border-border focus:border-primary focus:outline-none py-3 text-foreground placeholder:text-muted-foreground/40 transition-colors"
        />

        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>

      <Button
        onClick={handleSendOtp}
        disabled={loading || !phone.trim()}
        className="w-full max-w-65 h-11 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-40 cursor-pointer"
      >
        {loading ? "Enviando..." : "Continuar"}
      </Button>
    </div>
  );
}
