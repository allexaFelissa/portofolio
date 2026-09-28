"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Language = "en" | "id";
type LanguageContextValue = { language: Language; setLanguage: (language: Language) => void; toggleLanguage: () => void };

const LanguageContext = createContext<LanguageContextValue>({ language: "en", setLanguage: () => undefined, toggleLanguage: () => undefined });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  useEffect(() => { const saved = window.localStorage.getItem("portfolio-language"); if (saved === "en" || saved === "id") setLanguage(saved); }, []);
  useEffect(() => { document.documentElement.lang = language; window.localStorage.setItem("portfolio-language", language); }, [language]);
  const value = useMemo(() => ({ language, setLanguage, toggleLanguage: () => setLanguage(current => current === "en" ? "id" : "en") }), [language]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => useContext(LanguageContext);
