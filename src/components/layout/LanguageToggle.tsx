"use client";

import { useLanguage } from "@/hooks/useLanguage";

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();
  const next = language === "en" ? "Bahasa Indonesia" : "English";
  return <button type="button" onClick={toggleLanguage} aria-label={`Switch to ${next}`} title={`Switch to ${next}`} className="grid h-9 min-w-11 place-items-center rounded-pill border border-border bg-bg px-2 text-[10px] font-extrabold tracking-wider text-primary transition hover:-translate-y-0.5 hover:shadow-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">{language.toUpperCase()}</button>;
}
