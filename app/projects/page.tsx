import type { Metadata } from "next";
import Link from "next/link";
import { siteContent } from "@/content/site-content";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { AiAssistantButton } from "@/components/ai/AiAssistantButton";

export const metadata: Metadata = { title: "Projects | Allexa", description: "Explore Allexa's data and AI projects." };

export default function ProjectsPage() {
  return <><header className="fixed inset-x-4 top-3 z-40 mx-auto flex max-w-xl items-center justify-between rounded-pill border border-border bg-bg/90 px-3 py-2 shadow-pill backdrop-blur-md"><Link href="/" className="px-2 text-sm font-extrabold tracking-tight text-primary">PORTFOLIO.</Link><span className="h-4 w-px bg-border" /><Link href="/#projects" className="text-xs font-semibold text-muted transition hover:text-primary">← Back to Portfolio</Link><span className="h-4 w-px bg-border" /><span className="rounded-pill bg-surface px-3 py-1 text-[11px] font-bold text-primary">Projects</span><ThemeToggle /></header>
    <main className="min-h-screen bg-bg/80 px-5 pb-20 pt-24 sm:px-8 lg:px-10"><div className="mx-auto max-w-6xl"><header className="mb-9 pt-4 sm:mb-11"><h1 className="text-heading-black max-w-3xl text-3xl leading-tight sm:text-4xl">All Works &amp; Inventions</h1></header><ProjectGallery projects={siteContent.projects} /></div></main><AiAssistantButton /></>;
}
