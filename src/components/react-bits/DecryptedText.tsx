"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function DecryptedText({ text, className = "" }: { text: string; className?: string }) {
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(reduced ? text : "");

  useEffect(() => {
    if (reduced) {
      setShown(text);
      return;
    }

    let cancelled = false;
    let timer = 0;
    let index = 0;
    let deleting = false;

    const step = () => {
      if (cancelled) return;
      if (!deleting) {
        index += 1;
        setShown(text.slice(0, index));
        if (index >= text.length) {
          deleting = true;
          timer = window.setTimeout(step, 1800);
          return;
        }
        timer = window.setTimeout(step, 92);
        return;
      }

      index -= 1;
      setShown(text.slice(0, Math.max(0, index)));
      if (index <= 0) {
        deleting = false;
        timer = window.setTimeout(step, 550);
        return;
      }
      timer = window.setTimeout(step, 48);
    };

    timer = window.setTimeout(step, 350);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [reduced, text]);

  return <span className={className} aria-label={text}>{shown}<span aria-hidden="true" className="ml-0.5 inline-block h-[1em] w-px animate-pulse bg-current align-[-0.08em]" /></span>;
}
