import type { HTMLAttributes } from "react";

export function Pill({ className = "", ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={`inline-flex items-center rounded-pill border border-border bg-surface px-3 py-1 text-xs font-semibold text-primary ${className}`} {...props} />;
}

export function Chip({ label, className = "" }: { label: string; className?: string }) {
  return <span className={`inline-flex items-center gap-2 rounded-card border border-border bg-bg px-3 py-2 text-sm font-semibold text-primary transition hover:border-primary ${className}`}><span aria-hidden="true" className="size-1.5 rounded-full bg-primary" />{label}</span>;
}
