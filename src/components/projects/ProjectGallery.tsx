"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/content/types";
import { useLanguage } from "@/hooks/useLanguage";
import { GlareHover } from "@/components/react-bits/GlareHover";
import { ClickSpark } from "@/components/react-bits/ClickSpark";
import { ScrambledText } from "@/components/react-bits/ScrambledText";
import { ProjectDetailModal } from "./ProjectDetailModal";

type Filter = "All" | "Data" | "AI" | "Web";

const projectOrder: Partial<Record<Filter, string[]>> = {
  All: ["siaga", "shopee-sales-dashboard", "payflow", "maternal-health-risk", "city-network-traffic-forecasting", "wiki-next-click"],
  Data: ["shopee-sales-dashboard", "city-network-traffic-forecasting", "brazilian-ecommerce"],
  AI: ["siaga", "maternal-health-risk", "wiki-next-click"],
};

export function ProjectGallery({ projects }: { projects: Project[] }) {
  const { language } = useLanguage();
  const id = language === "id";
  const filters: Array<{ value: Filter; label: string }> = id
    ? [{ value: "All", label: "Semua Karya" }, { value: "Data", label: "Data & Analitik" }, { value: "AI", label: "Machine Learning" }, { value: "Web", label: "Aplikasi Web" }]
    : [{ value: "All", label: "All Works" }, { value: "Data", label: "Data & Analytics" }, { value: "AI", label: "Machine Learning" }, { value: "Web", label: "Web Apps" }];
  const [filter, setFilter] = useState<Filter>("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Project>();
  const visible = useMemo(() => {
    const preferred = projectOrder[filter] ?? [];
    const rank = new Map(preferred.map((projectId, index) => [projectId, index]));
    return projects
      .map((project, originalIndex) => ({ project, originalIndex }))
      .filter(({ project }) => (filter === "All" || project.categories?.includes(filter)) && `${project.title} ${project.description ?? ""} ${project.stack?.join(" ") ?? ""}`.toLowerCase().includes(query.trim().toLowerCase()))
      .sort((a, b) => (rank.get(a.project.id) ?? preferred.length + a.originalIndex) - (rank.get(b.project.id) ?? preferred.length + b.originalIndex))
      .map(({ project }) => project);
  }, [filter, projects, query]);
  const count = (value: Filter) => value === "All" ? projects.length : projects.filter(project => project.categories?.includes(value)).length;

  return <>
    <div className="flex flex-col items-start gap-5 border-b border-border pb-12">
      <div role="tablist" aria-label={id ? "Filter proyek" : "Filter projects"} className="flex flex-wrap gap-2">{filters.map(item => <button key={item.value} role="tab" aria-selected={filter === item.value} onClick={() => setFilter(item.value)} className={`rounded-pill border px-4 py-2 text-[11px] font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${filter === item.value ? "border-primary bg-primary text-bg" : "border-border bg-bg text-muted hover:border-primary hover:text-primary"}`}>{item.label} <span className="ml-1 opacity-60">({count(item.value)})</span></button>)}</div>
      <label className="relative block w-full sm:w-72"><span className="sr-only">{id ? "Cari proyek" : "Search projects"}</span><span aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted">⌕</span><input value={query} onChange={event => setQuery(event.target.value)} placeholder={id ? "Cari proyek, teknologi..." : "Search projects, stack..."} className="w-full rounded-pill border border-primary/30 bg-bg py-2.5 pl-10 pr-4 text-xs text-primary placeholder:text-muted outline-none transition-colors hover:border-primary/45 focus:border-primary/60 focus:ring-2 focus:ring-primary/10" /></label>
    </div>
    <div className="mb-7 mt-11 flex items-center gap-3"><span className="h-4 w-1 rounded-pill bg-primary" /><h2 className="text-lg font-extrabold text-primary"><ScrambledText text={id ? "Proyek" : "Projects"} /></h2></div>
    {visible.length === 0 ? <p className="rounded-card border border-dashed border-border py-16 text-center text-body">{id ? "Tidak ada proyek yang cocok." : "No matching projects found."}</p> : <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{visible.map(project => <GlareHover key={project.id} className="h-[470px] rounded-[18px]"><article className="group flex h-[470px] flex-col overflow-hidden rounded-[18px] border border-border bg-bg shadow-card transition duration-300 hover:-translate-y-1.5 hover:shadow-card-hover"><div className="aspect-[43/26] shrink-0 overflow-hidden bg-surface"><img src={project.thumbnail.src} alt={project.thumbnail.alt} onError={event => { event.currentTarget.src = "/placeholder-project.svg"; }} className="size-full object-cover transition duration-500 group-hover:scale-105 motion-reduce:transition-none" /></div><div className="flex min-h-0 flex-1 flex-col p-5"><h3 className="text-heading line-clamp-2 min-h-12 text-lg leading-6">{project.title}</h3>{project.categories?.length ? <p className="text-eyebrow mt-1">{project.categories.join(" · ")} {id ? "proyek" : "project"}</p> : null}{project.stack?.length ? <div className="mt-4 flex max-h-[58px] flex-wrap gap-1.5 overflow-hidden">{project.stack.map(item => <span key={item} className="h-fit rounded-button border border-border bg-surface px-2.5 py-1 text-[10px] font-semibold text-primary">{item}</span>)}</div> : null}<div className="mt-auto border-t border-border pt-4"><ClickSpark className="w-full"><button onClick={() => setSelected(project)} className="w-full rounded-button border border-border px-4 py-2.5 text-[11px] font-extrabold uppercase tracking-wide text-primary transition hover:border-primary hover:bg-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">{id ? "Lihat detail" : "View details"}</button></ClickSpark></div></div></article></GlareHover>)}</div>}
    {selected && <ProjectDetailModal project={selected} onClose={() => setSelected(undefined)} />}
  </>;
}
