"use client";
import { useState, type CSSProperties, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
export function GlareHover({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion(); const [position, setPosition] = useState({ x: 50, y: 50, active: false });
  return <div className={`relative overflow-hidden ${className}`} onPointerMove={event => { if (reduced || event.pointerType === "touch") return; const rect = event.currentTarget.getBoundingClientRect(); setPosition({ x: ((event.clientX - rect.left) / rect.width) * 100, y: ((event.clientY - rect.top) / rect.height) * 100, active: true }); }} onPointerLeave={() => setPosition(value => ({ ...value, active: false }))}>{children}{!reduced && <span aria-hidden="true" className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-500" style={{ opacity: position.active ? .24 : 0, background: `radial-gradient(circle at ${position.x}% ${position.y}%, rgb(var(--color-primary) / .2), rgb(var(--color-muted) / .08) 28%, transparent 52%)` } as CSSProperties} />}</div>;
}
