"use client";

import Link from "next/link";
import { siteContent } from "@/content/site-content";
import { siteContentId } from "@/content/site-content-id";
import { useLanguage } from "@/hooks/useLanguage";
import { ProjectGallery } from "./ProjectGallery";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { LanguageToggle } from "@/components/layout/LanguageToggle";
import { AiAssistantButton } from "@/components/ai/AiAssistantButton";

export function ProjectsPageContent() {
  const { language } = useLanguage();
  const content = language === "id" ? siteContentId : siteContent;
  const id = language === "id";
  return <>
    <header className="fixed inset-x-4 top-3 z-40 mx-auto flex max-w-2xl items-center justify-between rounded-pill border border-border bg-bg/90 px-3 py-2 shadow-pill backdrop-blur-md">
      <Link href="/" className="px-2 text-sm font-extrabold tracking-tight text-primary">ALLEXAFELISSA.</Link><span className="h-4 w-px bg-border" />
      <Link href="/#projects" className="text-xs font-semibold text-muted transition hover:text-primary">← {id ? "Kembali" : "Back to Portfolio"}</Link><span className="hidden h-4 w-px bg-border sm:block" />
      <span className="hidden rounded-pill bg-surface px-3 py-1 text-[11px] font-bold text-primary sm:block">{id ? "Proyek" : "Projects"}</span>
      <div className="flex items-center gap-1.5"><LanguageToggle /><ThemeToggle /></div>
    </header>
    <main className="projects-catalog min-h-screen bg-bg/80 px-5 pb-20 pt-24 dark:bg-bg/55 sm:px-8 lg:px-10"><div className="mx-auto max-w-6xl"><header className="mb-9 pt-4 sm:mb-11"><h1 className="text-heading-black max-w-3xl text-3xl leading-tight sm:text-4xl">{id ? "Semua Karya" : "All Projects"}</h1></header><ProjectGallery projects={content.projects} /></div></main>
    <AiAssistantButton showTryMe={false} />
  </>;
}
