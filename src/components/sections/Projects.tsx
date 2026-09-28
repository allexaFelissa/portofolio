"use client";

import { useState } from "react";
import type { Project } from "@/content/types";
import { getProjectsState } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlareHover } from "@/components/react-bits/GlareHover";
import { ClickSpark } from "@/components/react-bits/ClickSpark";
import { ProjectDetailModal } from "@/components/projects/ProjectDetailModal";
import { PixelDither } from "@/components/visuals/PixelDither";
import { useLanguage } from "@/hooks/useLanguage";

export function Projects({ projects, heading }: { projects: Project[]; heading: { eyebrow?: string; heading?: string } }) {
  const { language } = useLanguage();
  const id = language === "id";
  const { isEmpty, projects: items } = getProjectsState(projects);
  const [selected, setSelected] = useState<Project>();

  return <section id="projects" className="relative overflow-hidden px-6 py-24 sm:py-32">
    <PixelDither density="low" origin="top-left" drift="down" className="absolute left-[max(0px,calc(50%-31rem))] top-12 w-32 text-accent opacity-35" />
    <div className="relative mx-auto max-w-6xl">
      <SectionHeading {...heading} centered className="mb-14" />
      {isEmpty ? <p className="text-center text-body">{id ? "Proyek belum tersedia." : "No projects are available yet."}</p> : <>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(project => <GlareHover key={project.id} className="h-[520px] rounded-card">
            <article className="group flex h-[520px] flex-col overflow-hidden rounded-card border border-border bg-bg shadow-card transition duration-200 hover:-translate-y-2 hover:shadow-card-hover">
              <div className="aspect-[43/26] shrink-0 overflow-hidden bg-surface">
                <img src={project.thumbnail.src} alt={project.thumbnail.alt} onError={event => { event.currentTarget.src = "/placeholder-project.svg"; }} className="size-full object-cover transition duration-300 group-hover:scale-105 motion-reduce:transition-none" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-heading line-clamp-2 min-h-14 text-xl leading-7">{project.title}</h3>
                {project.description && <p className="text-body mt-3 line-clamp-3 text-sm leading-6">{project.description}</p>}
                {project.stack?.length ? <div className="mt-4 flex flex-wrap gap-1.5">{project.stack.slice(0, 4).map(item => <span key={item} className="rounded-button border border-border bg-surface px-2.5 py-1 text-[10px] font-semibold text-primary">{item}</span>)}{project.stack.length > 4 && <span className="rounded-button border border-border bg-surface px-2.5 py-1 text-[10px] font-semibold text-muted">+{project.stack.length - 4} more</span>}</div> : null}
                <div className="mt-auto border-t border-border pt-4"><ClickSpark className="w-full"><button onClick={() => setSelected(project)} className="w-full rounded-button border border-border px-4 py-2.5 text-[11px] font-extrabold uppercase tracking-wide text-primary transition hover:border-primary hover:bg-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">{id ? "Lihat detail" : "View details"}</button></ClickSpark></div>
              </div>
            </article>
          </GlareHover>)}
        </div>
        <ClickSpark className="mx-auto mt-10"><a href="/projects" className="flex w-fit rounded-button border border-border px-5 py-3 text-sm font-bold text-primary transition hover:-translate-y-0.5 hover:border-primary">View more projects ↗</a></ClickSpark>
      </>}
    </div>
    {selected && <ProjectDetailModal project={selected} onClose={() => setSelected(undefined)} />}
  </section>;
}
