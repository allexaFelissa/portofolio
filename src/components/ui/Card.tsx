import type { HTMLAttributes } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> { hover?: boolean; }

export function Card({ hover = false, className = "", ...props }: CardProps) {
  return <div className={`rounded-card border border-border bg-bg shadow-card ${hover ? "transition duration-200 hover:-translate-y-1 hover:shadow-card-hover" : ""} ${className}`} {...props} />;
}
