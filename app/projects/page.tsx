import type { Metadata } from "next";
import Link from "next/link";
import { siteContent } from "@/content/site-content";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { AiAssistantButton } from "@/components/ai/AiAssistantButton";

export const metadata: Metadata = { title: "Projects | Allexa", description: "Explore Allexa's data, AI, and web projects." };

export default function ProjectsPage() {
  return <>
    <header className="fixed inset-x-4 top-3 z-40 mx-auto flex max-w-2xl items-center justify-between gap-2 rounded-pill border border-border bg-bg/90 px-3 py-2 shadow-pill backdrop-blur-md">
      <Link href="/" className="px-2 text-sm font-extrabold tracking-tight text-primary">PORTFOLIO.</Link>
      <span className="hidden h-4 w-px bg-border sm:block" />
      <Link href="/#projects" className="text-xs font-semibold text-muted transition-colors hover:text-primary">← Back to portfolio</Link>
      <span className="hidden h-4 w-px bg-border sm:block" />
      <span className="hidden rounded-pill bg-surface px-3 py-1 text-[11px] font-bold text-primary sm:inline-flex">Projects</span>
      <ThemeToggle />
    </header>
    <main className="min-h-screen px-5 pb-24 pt-28 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 border-b border-border pb-9 sm:mb-12 sm:pb-11">
          <p className="text-eyebrow">Project archive</p>
          <div className="mt-4 grid gap-5 md:grid-cols-[minmax(0,1fr)_18rem] md:items-end">
            <h1 className="text-heading-black max-w-3xl text-4xl leading-[1.08] sm:text-5xl">Data work, models, and products.</h1>
            <p className="text-body text-sm leading-6">Browse all {siteContent.projects.length} projects. Filter by discipline, search by tool, and open any project for its complete details and links.</p>
          </div>
        </header>
        <ProjectGallery projects={siteContent.projects} />
      </div>
    </main>
    <AiAssistantButton />
  </>;
}
