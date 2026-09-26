"use client";
import { useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
export function TextPressure({ text, className = "" }: { text: string; className?: string }) {
  const [point, setPoint] = useState<number | null>(null); const reduced = useReducedMotion();
  return <span className={`inline-flex ${className}`} aria-label={text} onPointerMove={event => { if (reduced) return; const rect = event.currentTarget.getBoundingClientRect(); setPoint(((event.clientX - rect.left) / rect.width) * text.length); }} onPointerLeave={() => setPoint(null)}>{text.split("").map((char,index) => { const strength = point === null ? 0 : Math.max(0, 1 - Math.abs(index - point) / 4); return <span aria-hidden="true" key={`${char}-${index}`} className="inline-block transition-transform duration-150" style={{ transform: `scaleX(${1 + strength * .14}) scaleY(${1 + strength * .08})`, fontWeight: Math.round(650 + strength * 150), transformOrigin: "center bottom" }}>{char === " " ? "\u00a0" : char}</span>; })}</span>;
}
