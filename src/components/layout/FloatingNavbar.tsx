"use client";

import { useMemo } from "react";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { ThemeToggle } from "./ThemeToggle";

export interface NavItem { id: string; label: string; }
export interface FloatingNavbarProps { items?: NavItem[]; activeId?: string | null; }

const defaultItems: NavItem[] = [
  { id: "home", label: "Home" }, { id: "about", label: "About" }, { id: "experience", label: "Experience" }, { id: "projects", label: "Projects" }, { id: "contacts", label: "Contacts" },
];

export function FloatingNavbar({ items = defaultItems, activeId }: FloatingNavbarProps) {
  const ids = useMemo(() => items.map((item) => item.id), [items]);
  const observedActiveId = useScrollSpy(ids);
  const active = activeId ?? observedActiveId;
  const scrollToSection = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return <nav aria-label="Primary navigation" className="fixed inset-x-3 top-4 z-40 mx-auto flex max-w-4xl items-center justify-between rounded-pill border border-border bg-bg/90 px-3 py-2 shadow-pill backdrop-blur-md sm:inset-x-6">
    <button type="button" onClick={() => scrollToSection("home")} className="px-2 text-sm font-extrabold tracking-tight text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">PORTFOLIO.</button>
    <div className="hidden items-center gap-1 md:flex">{items.map((item) => <button type="button" key={item.id} onClick={() => scrollToSection(item.id)} aria-current={active === item.id ? "page" : undefined} className={`rounded-pill px-3 py-1.5 text-xs font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${active === item.id ? "bg-primary text-bg" : "text-muted hover:bg-surface hover:text-primary"}`}>{item.label}</button>)}</div>
    <ThemeToggle />
  </nav>;
}

export default FloatingNavbar;
