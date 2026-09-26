"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export function ScrambledText({ text, className = "" }: { text: string; className?: string }) {
  const [shown, setShown] = useState(text);
  const elementRef = useRef<HTMLSpanElement>(null);
  const timer = useRef<number | undefined>(undefined);
  const hasEntered = useRef(false);
  const reduced = useReducedMotion();

  const play = useCallback(() => {
    if (reduced) return;
    window.clearInterval(timer.current);
    let frame = 0;
    timer.current = window.setInterval(() => {
      frame += 1;
      setShown(text.split("").map((char, index) => char === " " || index < frame / 3 ? char : CHARS[Math.floor(Math.random() * CHARS.length)]).join(""));
      if (frame >= text.length * 3) {
        window.clearInterval(timer.current);
        setShown(text);
      }
    }, 48);
  }, [reduced, text]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || reduced || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting && !hasEntered.current) {
        hasEntered.current = true;
        play();
        observer.disconnect();
      }
    }, { threshold: 0.55 });
    observer.observe(element);
    return () => observer.disconnect();
  }, [play, reduced]);

  useEffect(() => () => window.clearInterval(timer.current), []);

  return <span ref={elementRef} className={className} onMouseEnter={play} onFocus={play} aria-label={text}>{shown}</span>;
}
