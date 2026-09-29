"use client";
import { useState, type CSSProperties, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
export function GlareHover({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion(); const [position, setPosition] = useState({ x: 50, y: 50, active: false });
  const { ref, revealed } = useScrollReveal<HTMLDivElement>();
  return <div ref={ref} className={`relative overflow-hidden transition-[transform,opacity] duration-700 ease-[cubic-bezier(.23,1,.32,1)] will-change-[transform,opacity] motion-reduce:transform-none motion-reduce:transition-none ${revealed ? "translate-y-0 scale-100 opacity-100" : "translate-y-6 scale-[.97] opacity-0"} ${className}`} onPointerMove={event => { if (reduced || event.pointerType === "touch") return; const rect = event.currentTarget.getBoundingClientRect(); setPosition({ x: ((event.clientX - rect.left) / rect.width) * 100, y: ((event.clientY - rect.top) / rect.height) * 100, active: true }); }} onPointerLeave={() => setPosition(value => ({ ...value, active: false }))}>{children}{!reduced && <span aria-hidden="true" className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-500" style={{ opacity: position.active ? .24 : 0, background: `radial-gradient(circle at ${position.x}% ${position.y}%, rgb(var(--color-primary) / .2), rgb(var(--color-muted) / .08) 28%, transparent 52%)` } as CSSProperties} />}</div>;
}
