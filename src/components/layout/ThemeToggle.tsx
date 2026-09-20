"use client";

import { useTheme } from "@/hooks/useTheme";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const next = theme === "light" ? "dark" : "light";
  return <button type="button" onClick={toggleTheme} aria-label={`Switch to ${next} theme`} className="grid size-9 place-items-center rounded-pill border border-border bg-bg text-primary transition hover:-translate-y-0.5 hover:shadow-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"><span aria-hidden="true">{theme === "light" ? "◐" : "☼"}</span></button>;
}
