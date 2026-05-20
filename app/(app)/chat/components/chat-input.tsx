"use client";

import { useRef, useEffect, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowUp02Icon,
  ArrowDown01Icon,
  Home01Icon,
  Store01Icon,
  PlusSignIcon,
  Cancel01Icon,
  Camera01Icon,
  Image01Icon,
} from "@hugeicons/core-free-icons";
import type { LedgerType } from "@/lib/context/ledger-context";

const ledgerOptions = [
  { id: "personal-default", type: "personal" as const, label: "Personal", icon: Home01Icon },
  { id: "business-default", type: "business" as const, label: "Negocio", icon: Store01Icon },
];

export interface AttachedImage {
  url: string;
  mediaType: string;
}

interface ChatInputProps {
  isDrawer: boolean;
  isLoading: boolean;
  activeLedgerType: LedgerType;
  onSubmit: (payload: { text: string; attachment: AttachedImage | null }) => void;
  onLedgerChange: (type: LedgerType) => void;
}

export function ChatInput({ isDrawer, isLoading, activeLedgerType, onSubmit, onLedgerChange }: ChatInputProps) {
  const [input, setInput] = useState("");
  const [ledgerOpen, setLedgerOpen] = useState(false);
  const [attachOpen, setAttachOpen] = useState(false);
  const [attached, setAttached] = useState<AttachedImage | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const canSubmit = (input.trim().length > 0 || attached !== null) && !isLoading && !uploading;

  const handleSubmit = (e?: { preventDefault?: () => void }) => {
    e?.preventDefault?.();
    if (!canSubmit) return;
    onSubmit({ text: input, attachment: attached });
    setInput("");
    clearAttachment();
  };

  const clearAttachment = () => {
    setAttached(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setUploadError(null);
    if (cameraInputRef.current) cameraInputRef.current.value = "";
    if (galleryInputRef.current) galleryInputRef.current.value = "";
  };

  const handleFilePick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError(null);
    const localPreview = URL.createObjectURL(file);
    setPreviewUrl(localPreview);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Error al subir la imagen");
      }
      setAttached({ url: json.data.url, mediaType: json.data.mediaType });
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Error al subir");
      URL.revokeObjectURL(localPreview);
      setPreviewUrl(null);
      if (cameraInputRef.current) cameraInputRef.current.value = "";
      if (galleryInputRef.current) galleryInputRef.current.value = "";
    } finally {
      setUploading(false);
    }
  };

  const activeLedgerOption = ledgerOptions.find((l) => l.type === activeLedgerType) ?? ledgerOptions[0];

  return (
    <div className={`px-4 pt-2 ${isDrawer ? "pb-3" : "pb-[calc(0.75rem+env(safe-area-inset-bottom))]"}`}>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 rounded-xl px-3 py-2.5 bg-white/50 backdrop-blur-xl shadow-[0_0_0_1px_rgba(45,80,22,0.08),0_2px_8px_rgba(45,80,22,0.04)] transition-shadow focus-within:shadow-[0_0_0_1px_rgba(45,80,22,0.2),0_4px_16px_rgba(45,80,22,0.06)]"
      >
        {(previewUrl || uploadError) && (
          <div className="flex items-center gap-2">
            {previewUrl && (
              <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-border/40">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={previewUrl} alt="adjunto" className="w-full h-full object-cover" />
                {uploading && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <span className="w-3 h-3 rounded-full bg-white/80 animate-pulse" />
                  </div>
                )}
                <button
                  type="button"
                  onClick={clearAttachment}
                  className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-black/60 text-white flex items-center justify-center cursor-pointer"
                  aria-label="Quitar imagen"
                >
                  <HugeiconsIcon icon={Cancel01Icon} size={11} strokeWidth={2.5} />
                </button>
              </div>
            )}
            {uploadError && (
              <span className="text-[11px] text-destructive/80">{uploadError}</span>
            )}
          </div>
        )}
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
          placeholder={activeLedgerType === "business" ? "Registra una venta o gasto..." : "Escribe un mensaje..."}
          rows={1}
          className="flex-1 bg-transparent text-base text-foreground placeholder:text-muted-foreground/40 resize-none outline-none max-h-30 py-1 px-1 [font-size:16px]"
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                type="button"
                onClick={() => setLedgerOpen(!ledgerOpen)}
                className="flex items-center gap-2 bg-white border border-primary/25 hover:border-primary/50 hover:bg-primary/[0.04] rounded-full pl-2 pr-3 py-1.5 transition-colors cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-primary/12 flex items-center justify-center">
                  <HugeiconsIcon icon={activeLedgerOption.icon} size={13} className="text-primary" strokeWidth={1.8} />
                </div>
                <span className="text-[12.5px] font-medium text-primary">{activeLedgerOption.label}</span>
                <HugeiconsIcon
                  icon={ArrowDown01Icon}
                  size={11}
                  className={`text-primary/60 transition-transform ${ledgerOpen ? "rotate-180" : ""}`}
                />
              </button>
              {ledgerOpen && (
                <div className="absolute bottom-full left-0 mb-2 bg-white/95 backdrop-blur-xl rounded-xl shadow-[0_8px_28px_rgba(45,80,22,0.12)] border border-border/20 overflow-hidden min-w-36 z-50">
                  {ledgerOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        onLedgerChange(opt.type);
                        setLedgerOpen(false);
                      }}
                      className={`flex items-center gap-2.5 w-full px-3 py-2.5 text-left transition-colors cursor-pointer ${
                        activeLedgerType === opt.type ? "bg-primary/5" : "hover:bg-accent/20"
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${activeLedgerType === opt.type ? "bg-primary text-primary-foreground" : "bg-accent/40"}`}>
                        <HugeiconsIcon icon={opt.icon} size={13} className={activeLedgerType === opt.type ? "text-primary-foreground" : "text-primary"} strokeWidth={1.6} />
                      </div>
                      <span className={`text-[12.5px] font-medium ${activeLedgerType === opt.type ? "text-primary" : "text-foreground/80"}`}>
                        {opt.label}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="relative">
              <button
                type="button"
                onClick={() => setAttachOpen((v) => !v)}
                disabled={uploading || isLoading}
                className="w-9 h-9 rounded-full bg-white border border-primary/25 hover:border-primary/50 hover:bg-primary/[0.04] flex items-center justify-center cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                aria-label="Adjuntar foto"
                aria-expanded={attachOpen}
              >
                <HugeiconsIcon
                  icon={PlusSignIcon}
                  size={16}
                  className={`text-primary transition-transform duration-200 ${attachOpen ? "rotate-45" : ""}`}
                  strokeWidth={2}
                />
              </button>
              {attachOpen && (
                <>
                  <button
                    type="button"
                    aria-hidden
                    onClick={() => setAttachOpen(false)}
                    className="fixed inset-0 z-40 cursor-default"
                  />
                  <div className="absolute bottom-full left-0 mb-2 bg-white/95 backdrop-blur-xl rounded-xl shadow-[0_8px_28px_rgba(45,80,22,0.12)] border border-border/20 overflow-hidden min-w-44 z-50">
                    <button
                      type="button"
                      onClick={() => {
                        setAttachOpen(false);
                        cameraInputRef.current?.click();
                      }}
                      className="flex items-center gap-2.5 w-full px-3 py-2.5 text-left transition-colors cursor-pointer hover:bg-accent/20"
                    >
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <HugeiconsIcon icon={Camera01Icon} size={13} className="text-primary" strokeWidth={1.6} />
                      </div>
                      <span className="text-[12.5px] font-medium text-foreground/80">
                        Tomar foto
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setAttachOpen(false);
                        galleryInputRef.current?.click();
                      }}
                      className="flex items-center gap-2.5 w-full px-3 py-2.5 text-left transition-colors cursor-pointer hover:bg-accent/20"
                    >
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <HugeiconsIcon icon={Image01Icon} size={13} className="text-primary" strokeWidth={1.6} />
                      </div>
                      <span className="text-[12.5px] font-medium text-foreground/80">
                        Elegir de galería
                      </span>
                    </button>
                  </div>
                </>
              )}
            </div>
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFilePick}
              className="hidden"
            />
            <input
              ref={galleryInputRef}
              type="file"
              accept="image/*"
              onChange={handleFilePick}
              className="hidden"
            />
          </div>
          <button
            type="submit"
            disabled={!canSubmit}
            className="w-9 h-9 rounded-full bg-accent text-accent-foreground flex items-center justify-center shrink-0 disabled:opacity-15 transition-opacity cursor-pointer"
          >
            <HugeiconsIcon icon={ArrowUp02Icon} size={16} strokeWidth={2} />
          </button>
        </div>
      </form>
    </div>
  );
}
