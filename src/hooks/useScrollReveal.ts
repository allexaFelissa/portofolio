"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

export function useScrollReveal<T extends Element>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const reducedMotion = useReducedMotion();
  const [revealed, setRevealed] = useState(reducedMotion);

  useEffect(() => {
    if (reducedMotion) {
      setRevealed(true);
      return;
    }

    const element = ref.current;
    if (!element || !("IntersectionObserver" in window)) {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry) setRevealed(entry.isIntersecting);
    }, { threshold, rootMargin: "-4% 0px" });

    observer.observe(element);
    return () => observer.disconnect();
  }, [reducedMotion, threshold]);

  return { ref, revealed, reducedMotion };
}
