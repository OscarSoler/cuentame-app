"use client";

import { useState } from "react";

const emotions = [
  { value: "happy", emoji: "😊", label: "Feliz" },
  { value: "neutral", emoji: "😐", label: "Neutral" },
  { value: "sad", emoji: "😔", label: "Triste" },
  { value: "guilty", emoji: "😬", label: "Culpable" },
  { value: "proud", emoji: "🤩", label: "Orgulloso" },
] as const;

interface EmotionPickerProps {
  message: string;
  onSelect: (emotion: string) => void;
  disabled?: boolean;
}

export function EmotionPicker({
  message,
  onSelect,
  disabled,
}: EmotionPickerProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (value: string) => {
    if (disabled || selected) return;
    setSelected(value);
    onSelect(value);
  };

  return (
    <div className="bg-white/60 backdrop-blur-sm border border-border/20 rounded-xl p-3.5 max-w-64">
      <p className="text-[13px] text-foreground leading-relaxed mb-3">
        {message}
      </p>
      <div className="flex gap-1.5 justify-center">
        {emotions.map((e) => (
          <button
            key={e.value}
            type="button"
            onClick={() => handleSelect(e.value)}
            disabled={disabled || (selected !== null && selected !== e.value)}
            className={`flex flex-col items-center gap-1 transition-all cursor-pointer ${
              selected === e.value
                ? "scale-110"
                : selected !== null
                  ? "opacity-25 scale-90"
                  : "hover:scale-110"
            }`}
          >
            <span
              className={`w-10 h-10 flex items-center justify-center rounded-full text-lg transition-colors ${
                selected === e.value
                  ? "bg-primary/10 ring-1.5 ring-primary/30"
                  : "bg-accent/20 hover:bg-accent/40"
              }`}
            >
              {e.emoji}
            </span>
            <span className="text-[9px] text-muted-foreground/70">
              {e.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
