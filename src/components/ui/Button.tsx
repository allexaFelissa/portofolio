import type { ButtonHTMLAttributes } from "react";
import { ClickSpark } from "@/components/react-bits/ClickSpark";

type ButtonVariant = "primary" | "outline" | "ghost";
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { variant?: ButtonVariant; }

const styles: Record<ButtonVariant, string> = {
  primary: "bg-primary text-bg hover:-translate-y-0.5 hover:shadow-card-hover",
  outline: "border border-border bg-bg text-primary hover:-translate-y-0.5 hover:border-primary",
  ghost: "text-primary hover:-translate-y-0.5 hover:bg-surface",
};

export function Button({ variant = "primary", className = "", type = "button", ...props }: ButtonProps) {
  return <ClickSpark><button type={type} className={`inline-flex items-center justify-center rounded-button px-4 py-2.5 text-sm font-semibold transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50 ${styles[variant]} ${className}`} {...props} /></ClickSpark>;
}
