"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Leaf01Icon,
  Plant03Icon,
  Tree06Icon,
  User02Icon,
  CheckmarkCircle02Icon,
  Yoga01Icon,
  Coins01Icon,
  Book01Icon,
  SparklesIcon,
  FlowerPotIcon,
  Home01Icon,
  Store01Icon,
  Wallet01Icon,
  Restaurant01Icon,
  LaptopIcon,
  Briefcase01Icon,
} from "@hugeicons/core-free-icons";

interface StepProps {
  onNext: () => void;
}

interface NameStepProps extends StepProps {
  name: string;
  onNameChange: (name: string) => void;
}

function WelcomeStep({ onNext }: StepProps) {
  return (
    <div className="flex flex-col items-center text-center flex-1 justify-between py-10 px-6">
      <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground/70">
        Cuéntame
      </div>

      <div className="flex flex-col items-center gap-5">
        <h1 className="font-heading text-3xl leading-snug text-foreground">
          Bienvenido a tu
          <br />
          Santuario Financiero
        </h1>

        <div className="flex items-center gap-1.5 bg-accent/40 text-accent-foreground px-3 py-1.5 rounded-full text-xs">
          <HugeiconsIcon icon={Leaf01Icon} size={12} />
          <span>Happy Spending</span>
        </div>

        <div className="relative w-28 h-28 flex items-center justify-center">
          <div className="absolute inset-0 bg-accent/20 rounded-full blur-sm" />
          <HugeiconsIcon
            icon={Tree06Icon}
            size={56}
            className="text-primary relative z-10"
            strokeWidth={1.5}
          />
        </div>

        <p className="text-muted-foreground text-sm max-w-65 leading-relaxed">
          Domina el arte japonés del ahorro. Transforma tus gastos en rituales
          de prosperidad.
        </p>
      </div>

      <Button
        onClick={onNext}
        className="w-full max-w-65 h-11 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 cursor-pointer"
      >
        Empezar Mi Camino
      </Button>
    </div>
  );
}

function PhilosophyStep({ onNext }: StepProps) {
  const pillars = [
    { icon: SparklesIcon, pillar: "Supervivencia", desc: "Lo esencial" },
    { icon: FlowerPotIcon, pillar: "Opcional", desc: "Gustos y caprichos" },
    { icon: Book01Icon, pillar: "Cultura", desc: "Crecimiento personal" },
    { icon: Coins01Icon, pillar: "Extras", desc: "Lo inesperado" },
  ];

  return (
    <div className="flex flex-col items-center text-center flex-1 justify-between py-10 px-6">
      <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground/70">
        Filosofía Kakebo
      </div>

      <div className="flex flex-col items-center gap-5">
        <div className="w-14 h-14 rounded-full bg-accent/40 flex items-center justify-center">
          <HugeiconsIcon
            icon={Yoga01Icon}
            size={28}
            className="text-primary"
            strokeWidth={1.5}
          />
        </div>

        <h2 className="font-heading text-2xl leading-snug text-foreground">
          El método Kakebo
          <br />
          nació en Japón en 1904
        </h2>

        <p className="text-muted-foreground text-sm max-w-65 leading-relaxed">
          Un diario financiero que te invita a reflexionar sobre cada gasto y
          entender tu relación con el dinero.
        </p>

        <div className="flex flex-col gap-2 w-full max-w-65">
          {pillars.map((item) => (
            <div
              key={item.pillar}
              className="flex items-center gap-2.5 bg-card/60 backdrop-blur-sm rounded-lg px-3 py-2.5 text-left"
            >
              <div className="w-7 h-7 rounded-md bg-accent/50 flex items-center justify-center shrink-0">
                <HugeiconsIcon
                  icon={item.icon}
                  size={14}
                  className="text-primary"
                  strokeWidth={1.5}
                />
              </div>
              <div>
                <div className="text-xs font-medium text-foreground">
                  {item.pillar}
                </div>
                <div className="text-[11px] text-muted-foreground">
                  {item.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Button
        onClick={onNext}
        className="w-full max-w-65 h-11 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 cursor-pointer"
      >
        Continuar
      </Button>
    </div>
  );
}

function NameStep({ onNext, name, onNameChange }: NameStepProps) {
  return (
    <div className="flex flex-col items-center text-center flex-1 justify-between py-10 px-6">
      <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground/70">
        Personalización
      </div>

      <div className="flex flex-col items-center gap-5">
        <div className="w-14 h-14 rounded-full bg-accent/40 flex items-center justify-center">
          <HugeiconsIcon
            icon={User02Icon}
            size={28}
            className="text-primary"
            strokeWidth={1.5}
          />
        </div>

        <h2 className="font-heading text-2xl leading-snug text-foreground">
          ¿Cómo te llamamos?
        </h2>

        <p className="text-muted-foreground text-sm max-w-65 leading-relaxed">
          Tu nombre nos ayuda a personalizar tu experiencia.
        </p>

        <Input
          type="text"
          placeholder="Tu nombre"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          className="max-w-65 h-11 rounded-xl bg-card/60 backdrop-blur-sm border-border/50 text-center text-sm placeholder:text-muted-foreground/50"
        />
      </div>

      <Button
        onClick={onNext}
        disabled={!name.trim()}
        className="w-full max-w-65 h-11 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-40 cursor-pointer"
      >
        Continuar
      </Button>
    </div>
  );
}

type LedgerKind = "personal" | "business";

interface LedgerTypeStepProps extends StepProps {
  ledgerTypes: LedgerKind[];
  onToggleLedgerType: (type: LedgerKind) => void;
}

function LedgerTypeStep({
  onNext,
  ledgerTypes,
  onToggleLedgerType,
}: LedgerTypeStepProps) {
  const options = [
    {
      type: "personal" as const,
      icon: Home01Icon,
      title: "Finanzas personales",
      desc: "Controla tus ingresos y gastos del día a día",
    },
    {
      type: "business" as const,
      icon: Store01Icon,
      title: "Negocio o emprendimiento",
      desc: "Gestiona las finanzas de tu negocio",
    },
  ];

  return (
    <div className="flex flex-col items-center text-center flex-1 justify-between py-10 px-6">
      <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground/70">
        Tu perfil
      </div>

      <div className="flex flex-col items-center gap-5">
        <div className="w-14 h-14 rounded-full bg-accent/40 flex items-center justify-center">
          <HugeiconsIcon
            icon={Wallet01Icon}
            size={28}
            className="text-primary"
            strokeWidth={1.5}
          />
        </div>

        <h2 className="font-heading text-2xl leading-snug text-foreground">
          ¿Qué tipo de finanzas
          <br />
          quieres gestionar?
        </h2>

        <p className="text-muted-foreground text-sm max-w-65 leading-relaxed">
          Puedes elegir ambas. Podrás añadir más libretas después.
        </p>

        <div className="flex flex-col gap-2.5 w-full max-w-65">
          {options.map((option) => {
            const selected = ledgerTypes.includes(option.type);
            return (
              <button
                key={option.type}
                type="button"
                onClick={() => onToggleLedgerType(option.type)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3.5 text-left transition-all cursor-pointer ${
                  selected
                    ? "bg-primary/10 ring-1.5 ring-primary"
                    : "bg-card/60 backdrop-blur-sm hover:bg-card/80"
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                    selected ? "bg-primary text-primary-foreground" : "bg-accent/50"
                  }`}
                >
                  <HugeiconsIcon
                    icon={option.icon}
                    size={18}
                    className={selected ? "text-primary-foreground" : "text-primary"}
                    strokeWidth={1.5}
                  />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground">
                    {option.title}
                  </div>
                  <div className="text-[11px] text-muted-foreground">
                    {option.desc}
                  </div>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                    selected
                      ? "border-primary bg-primary"
                      : "border-border"
                  }`}
                >
                  {selected && (
                    <HugeiconsIcon
                      icon={CheckmarkCircle02Icon}
                      size={14}
                      className="text-primary-foreground"
                    />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <Button
        onClick={onNext}
        disabled={ledgerTypes.length === 0}
        className="w-full max-w-65 h-11 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-40 cursor-pointer"
      >
        Continuar
      </Button>
    </div>
  );
}

const businessTypes = [
  { key: "tienda", label: "Tienda", icon: Store01Icon },
  { key: "restaurante", label: "Restaurante", icon: Restaurant01Icon },
  { key: "servicios", label: "Servicios", icon: Briefcase01Icon },
  { key: "freelancer", label: "Freelancer", icon: LaptopIcon },
  { key: "otro", label: "Otro", icon: Coins01Icon },
];

interface BusinessSetupStepProps extends StepProps {
  businessName: string;
  onBusinessNameChange: (name: string) => void;
  businessType: string;
  onBusinessTypeChange: (type: string) => void;
}

function BusinessSetupStep({
  onNext,
  businessName,
  onBusinessNameChange,
  businessType,
  onBusinessTypeChange,
}: BusinessSetupStepProps) {
  return (
    <div className="flex flex-col items-center text-center flex-1 justify-between py-10 px-6">
      <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground/70">
        Tu negocio
      </div>

      <div className="flex flex-col items-center gap-5">
        <div className="w-14 h-14 rounded-full bg-accent/40 flex items-center justify-center">
          <HugeiconsIcon
            icon={Store01Icon}
            size={28}
            className="text-primary"
            strokeWidth={1.5}
          />
        </div>

        <h2 className="font-heading text-2xl leading-snug text-foreground">
          Cuéntanos de
          <br />
          tu negocio
        </h2>

        <Input
          type="text"
          placeholder="Nombre del negocio"
          value={businessName}
          onChange={(e) => onBusinessNameChange(e.target.value)}
          className="max-w-65 h-11 rounded-xl bg-card/60 backdrop-blur-sm border-border/50 text-center text-sm placeholder:text-muted-foreground/50"
        />

        <div className="flex flex-wrap justify-center gap-2 max-w-72">
          {businessTypes.map((bt) => (
            <button
              key={bt.key}
              type="button"
              onClick={() => onBusinessTypeChange(bt.key)}
              className={`flex items-center gap-1.5 rounded-full px-3 py-2 text-left transition-all cursor-pointer ${
                businessType === bt.key
                  ? "bg-primary/10 ring-1.5 ring-primary"
                  : "bg-card/60 backdrop-blur-sm hover:bg-card/80"
              }`}
            >
              <HugeiconsIcon
                icon={bt.icon}
                size={14}
                className={businessType === bt.key ? "text-primary" : "text-muted-foreground/60"}
                strokeWidth={1.5}
              />
              <span
                className={`text-xs font-medium ${
                  businessType === bt.key ? "text-primary" : "text-foreground/70"
                }`}
              >
                {bt.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <Button
        onClick={onNext}
        disabled={!businessName.trim() || !businessType}
        className="w-full max-w-65 h-11 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-40 cursor-pointer"
      >
        Continuar
      </Button>
    </div>
  );
}

function ReadyStep({ name, onStart }: { name: string; onStart: () => void }) {
  return (
    <div className="flex flex-col items-center text-center flex-1 justify-between py-10 px-6">
      <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground/70">
        Todo listo
      </div>

      <div className="flex flex-col items-center gap-5">
        <div className="relative w-28 h-28 flex items-center justify-center">
          <div className="absolute inset-0 bg-accent/20 rounded-full blur-sm" />
          <HugeiconsIcon
            icon={Plant03Icon}
            size={56}
            className="text-primary relative z-10"
            strokeWidth={1.5}
          />
        </div>

        <h2 className="font-heading text-2xl leading-snug text-foreground">
          {name}, tu santuario
          <br />
          está listo
        </h2>

        <p className="text-muted-foreground text-sm max-w-65 leading-relaxed">
          Cada anotación es un paso hacia la consciencia financiera.
        </p>

        <div className="flex items-center gap-1.5 bg-accent/40 text-accent-foreground px-3 py-1.5 rounded-full text-xs">
          <HugeiconsIcon icon={CheckmarkCircle02Icon} size={12} />
          <span>Tu camino comienza hoy</span>
        </div>
      </div>

      <Button
        onClick={onStart}
        className="w-full max-w-65 h-11 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 cursor-pointer"
      >
        Comenzar
      </Button>
    </div>
  );
}

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [ledgerTypes, setLedgerTypes] = useState<LedgerKind[]>([]);
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("");

  const toggleLedgerType = (type: LedgerKind) => {
    setLedgerTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const hasBusiness = ledgerTypes.includes("business");
  const totalSteps = hasBusiness ? 6 : 5;

  const handleLedgerNext = () => {
    if (hasBusiness) {
      setStep(4);
    } else {
      setStep(5);
    }
  };

  const handleStart = () => {
    router.push("/chat");
  };

  return (
    <div className="flex flex-col h-dvh w-full bg-linear-to-b from-[#FAF7F2] via-[#F5F0E8] to-[#E8E0D0]">
      {/* Progress dots */}
      <div className="flex justify-center gap-2 pt-5">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === step
                ? "w-5 bg-primary"
                : i < step
                  ? "w-1.5 bg-primary/30"
                  : "w-1.5 bg-border/60"
            }`}
          />
        ))}
      </div>

      {step === 0 && <WelcomeStep onNext={() => setStep(1)} />}
      {step === 1 && <PhilosophyStep onNext={() => setStep(2)} />}
      {step === 2 && (
        <NameStep
          onNext={() => setStep(3)}
          name={name}
          onNameChange={setName}
        />
      )}
      {step === 3 && (
        <LedgerTypeStep
          onNext={handleLedgerNext}
          ledgerTypes={ledgerTypes}
          onToggleLedgerType={toggleLedgerType}
        />
      )}
      {step === 4 && hasBusiness && (
        <BusinessSetupStep
          onNext={() => setStep(5)}
          businessName={businessName}
          onBusinessNameChange={setBusinessName}
          businessType={businessType}
          onBusinessTypeChange={setBusinessType}
        />
      )}
      {step === 5 && <ReadyStep name={name} onStart={handleStart} />}
    </div>
  );
}
