"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export interface LoadingScreenProps {
  ready: boolean;
  error?: boolean;
  onRetry?: () => void;
  maxVisibleMs?: number;
}

const FADE_MS = 300;

export function LoadingScreen({ ready, error = false, onRetry, maxVisibleMs = 5000 }: LoadingScreenProps) {
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (!visible) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = originalOverflow; };
  }, [visible]);

  useEffect(() => {
    if (!visible || error) return;
    const startFade = () => {
      if (reducedMotion) setVisible(false);
      else setFading(true);
    };
    const cap = window.setTimeout(startFade, maxVisibleMs);
    if (ready) startFade();
    return () => window.clearTimeout(cap);
  }, [ready, error, maxVisibleMs, reducedMotion, visible]);

  useEffect(() => {
    if (!fading) return;
    const timer = window.setTimeout(() => setVisible(false), FADE_MS);
    return () => window.clearTimeout(timer);
  }, [fading]);

  if (!visible) return null;

  return <div className={`fixed inset-0 z-[100] grid place-items-center bg-bg transition-opacity duration-300 ${fading ? "pointer-events-none opacity-0" : "opacity-100"}`} role="status" aria-live="polite">
    <div className="relative flex flex-col items-center gap-4 text-center">
      <div aria-hidden="true" className="absolute -inset-20 -z-10 rounded-full bg-primary/10 blur-3xl" />
      <p className="text-xl font-extrabold tracking-tight text-primary">PORTFOLIO.</p>
      {error ? <><p className="text-sm text-body">Portfolio content could not load.</p>{onRetry && <button type="button" onClick={onRetry} className="rounded-button border border-border px-4 py-2 text-sm font-semibold text-primary focus-visible:outline focus-visible:outline-2">Retry</button>}</> : <><p className="text-eyebrow">LOADING</p><span aria-label="Loading progress" className={`h-1 w-28 overflow-hidden rounded-pill bg-border ${reducedMotion ? "" : "animate-pulse"}`}><span className="block h-full w-2/3 rounded-pill bg-primary" /></span></>}
    </div>
  </div>;
}

export default LoadingScreen;
