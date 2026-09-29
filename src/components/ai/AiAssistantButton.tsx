"use client";

import { useEffect, useState } from "react";
import { markFeatureUsed } from "@/lib/feature-hint";
import { AiAssistantModal } from "./AiAssistantModal";

const BADGE_STORAGE_KEY = "portfolio-ai-try-me-dismissed-v2";

export function AiAssistantButton({ showTryMe = true }: { showTryMe?: boolean }) {
  const [open, setOpen] = useState(false);
  const [showBadge, setShowBadge] = useState(false);

  useEffect(() => {
    try {
      setShowBadge(showTryMe && window.localStorage.getItem(BADGE_STORAGE_KEY) !== "true");
    } catch {
      setShowBadge(showTryMe);
    }
  }, [showTryMe]);

  const openAssistant = () => {
    setOpen(true);
    setShowBadge(false);
    markFeatureUsed();
    try {
      window.localStorage.setItem(BADGE_STORAGE_KEY, "true");
    } catch {
      // The badge still disappears for this visit when storage is unavailable.
    }
  };

  return <>
    <div className="fixed bottom-5 right-5 z-40 size-16">
      {showBadge && <button type="button" onClick={openAssistant} aria-label="Try the portfolio AI assistant" className="absolute right-12 top-1/2 z-0 flex -translate-y-1/2 items-center gap-2 whitespace-nowrap rounded-pill border border-border bg-bg/95 py-2 pl-3 pr-5 text-xs font-bold text-primary shadow-card backdrop-blur-md transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-[55%] hover:border-primary hover:shadow-card-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
        <span aria-hidden="true" className="size-2 rounded-full bg-accent animate-pulse motion-reduce:animate-none" />
        Try me
      </button>}
      <button type="button" onClick={openAssistant} aria-label="Open portfolio assistant" className="relative z-10 grid size-16 place-items-center rounded-full bg-primary text-2xl text-bg shadow-card-hover transition-transform duration-200 hover:scale-110 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2">✦</button>
    </div>
    <AiAssistantModal open={open} onClose={() => setOpen(false)} />
  </>;
}
