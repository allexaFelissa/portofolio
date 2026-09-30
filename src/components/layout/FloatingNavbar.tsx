"use client";

import { useMemo } from "react";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { useLanguage } from "@/hooks/useLanguage";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";

export interface NavItem { id: string; label: string; }
export interface FloatingNavbarProps { items?: NavItem[]; activeId?: string | null; }

const navItems = {
  en: [{ id: "home", label: "Home" }, { id: "about", label: "About" }, { id: "experience", label: "Experience" }, { id: "projects", label: "Projects" }, { id: "contacts", label: "Contacts" }],
  id: [{ id: "home", label: "Beranda" }, { id: "about", label: "Tentang" }, { id: "experience", label: "Pengalaman" }, { id: "projects", label: "Proyek" }, { id: "contacts", label: "Kontak" }],
} satisfies Record<string, NavItem[]>;

export function FloatingNavbar({ items, activeId }: FloatingNavbarProps) {
  const { language } = useLanguage();
  const resolvedItems = items ?? navItems[language];
  const ids = useMemo(() => resolvedItems.map(item => item.id), [resolvedItems]);
  const observedActiveId = useScrollSpy(ids);
  const active = activeId ?? observedActiveId;
  const scrollToSection = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return <nav aria-label={language === "id" ? "Navigasi utama" : "Primary navigation"} className="nav-enter fixed inset-x-3 top-4 z-40 mx-auto flex max-w-3xl items-center justify-between rounded-pill border border-border bg-bg/90 px-2.5 py-1.5 shadow-pill backdrop-blur-md sm:inset-x-6">
    <button type="button" onClick={() => scrollToSection("home")} className="px-2 text-xs font-extrabold tracking-tight text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">ALLEXAFELISSA.</button>
    <div className="hidden items-center gap-1 md:flex">{resolvedItems.map(item => <button type="button" key={item.id} onClick={() => scrollToSection(item.id)} aria-current={active === item.id ? "page" : undefined} className={`rounded-pill px-2.5 py-1 text-[11px] font-semibold transition-[color,background-color,transform,box-shadow] duration-500 ease-[cubic-bezier(.22,1,.36,1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${active === item.id ? "scale-[1.03] bg-primary text-bg shadow-sm" : "text-muted hover:bg-surface hover:text-primary"}`}>{item.label}</button>)}</div>
    <div className="flex items-center gap-1.5"><LanguageToggle /><ThemeToggle /></div>
  </nav>;
}

export default FloatingNavbar;
