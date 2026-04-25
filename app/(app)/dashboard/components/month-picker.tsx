"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  ArrowDown01Icon,
} from "@hugeicons/core-free-icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MONTHS_ES_ABBR } from "@/lib/months";
import { cn } from "@/lib/utils";

export function isFuturePeriod(
  year: number,
  month: number,
  currentYear: number,
  currentMonth: number,
) {
  return year * 12 + month > currentYear * 12 + currentMonth;
}

interface MonthPickerProps {
  month: number;
  year: number;
  currentYear: number;
  currentMonth: number;
  onChange: (year: number, month: number) => void;
}

export function MonthPicker({
  month,
  year,
  currentYear,
  currentMonth,
  onChange,
}: MonthPickerProps) {
  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState(year);

  const forwardYearDisabled = viewYear >= currentYear;

  return (
    <Popover
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (nextOpen) setViewYear(year);
      }}
    >
      <PopoverTrigger
        render={
          <button
            type="button"
            className="text-[11px] font-medium text-muted-foreground inline-flex items-center gap-0.5 cursor-pointer hover:bg-accent/30 rounded-full px-2 py-0.5 transition-colors"
          >
            {MONTHS_ES_ABBR[month]} {year}
            <HugeiconsIcon
              icon={ArrowDown01Icon}
              size={10}
              className="text-muted-foreground/70"
            />
          </button>
        }
      />
      <PopoverContent align="center" sideOffset={6} className="w-64 p-3 rounded-2xl">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setViewYear((v) => v - 1)}
            className="w-6 h-6 rounded-full flex items-center justify-center cursor-pointer hover:bg-accent/30 transition-colors"
            aria-label="Año anterior"
          >
            <HugeiconsIcon
              icon={ArrowLeft01Icon}
              size={12}
              className="text-muted-foreground/70"
            />
          </button>
          <span className="text-sm font-semibold text-foreground">{viewYear}</span>
          <button
            type="button"
            disabled={forwardYearDisabled}
            onClick={() => setViewYear((v) => v + 1)}
            className="w-6 h-6 rounded-full flex items-center justify-center cursor-pointer hover:bg-accent/30 transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
            aria-label="Año siguiente"
          >
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              size={12}
              className="text-muted-foreground/70"
            />
          </button>
        </div>

        <div className="grid grid-cols-4 gap-1 mt-2">
          {MONTHS_ES_ABBR.map((label, i) => {
            const future = isFuturePeriod(viewYear, i, currentYear, currentMonth);
            const selected = viewYear === year && i === month;
            return (
              <button
                key={i}
                type="button"
                disabled={future}
                onClick={() => {
                  onChange(viewYear, i);
                  setOpen(false);
                }}
                aria-label={`${label} ${viewYear}`}
                className={cn(
                  "h-9 rounded-lg text-xs font-medium transition-colors cursor-pointer",
                  selected && "bg-primary text-primary-foreground",
                  !selected && !future && "text-foreground hover:bg-accent/30",
                  future && "text-muted-foreground/30 cursor-not-allowed",
                )}
              >
                {label}
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
