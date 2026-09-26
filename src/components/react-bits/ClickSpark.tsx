"use client";

import type { ReactNode } from "react";

/** Compatibility wrapper. Click sparks are rendered globally by GlobalClickSpark. */
export function ClickSpark({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`relative inline-flex ${className}`}>{children}</span>;
}
