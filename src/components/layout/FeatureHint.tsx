"use client";

import { useEffect, useState } from "react";
import { FEATURE_HINT_STORAGE_KEY, FEATURE_USED_EVENT, markFeatureUsed } from "@/lib/feature-hint";

export function FeatureHint() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = window.localStorage.getItem(FEATURE_HINT_STORAGE_KEY) === "true";
    } catch {
      // Show the hint when storage is unavailable.
    }

    const showTimer = dismissed ? undefined : window.setTimeout(() => setVisible(true), 1400);
    const dismiss = () => setVisible(false);
    window.addEventListener(FEATURE_USED_EVENT, dismiss);

    return () => {
      if (showTimer !== undefined) window.clearTimeout(showTimer);
      window.removeEventListener(FEATURE_USED_EVENT, dismiss);
    };
  }, []);

  return <aside role="status" aria-live="polite" className={`fixed bottom-5 left-5 z-50 flex max-w-[calc(100vw-2.5rem)] items-start gap-3 rounded-card border border-border bg-bg/85 px-4 py-3 text-primary shadow-card-hover backdrop-blur-md transition-[transform,opacity] duration-200 ease-[cubic-bezier(.23,1,.32,1)] motion-reduce:transform-none motion-reduce:transition-none sm:max-w-xs ${visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"}`}>
    <span aria-hidden="true" className="mt-0.5 text-sm">✦</span>
    <p className="text-xs font-medium leading-5"><strong className="font-extrabold">New here?</strong> Switch themes, change language, or ask the AI to get started!</p>
    <button type="button" onClick={markFeatureUsed} aria-label="Dismiss hint" className="-mr-1 grid size-5 shrink-0 place-items-center rounded-full text-sm text-muted transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">×</button>
  </aside>;
}
