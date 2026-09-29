"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function ScrollReveal({ children, className = "", ...props }: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  const { ref, revealed } = useScrollReveal<HTMLDivElement>();
  return <div ref={ref} className={`transition-[transform,opacity] duration-700 ease-[cubic-bezier(.23,1,.32,1)] will-change-[transform,opacity] motion-reduce:transform-none motion-reduce:transition-none ${revealed ? "translate-y-0 scale-100 opacity-100" : "translate-y-6 scale-[.97] opacity-0"} ${className}`} {...props}>{children}</div>;
}
