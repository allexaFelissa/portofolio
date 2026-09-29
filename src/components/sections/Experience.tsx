"use client";
import { useEffect, useRef, useState } from "react";
import type { ExperienceEntry } from "@/content/types";
import { filterValidExperience } from "@/lib/content";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { PixelDither } from "@/components/visuals/PixelDither";

export function Experience({ entries, heading }: { entries: ExperienceEntry[]; heading: { eyebrow?: string; heading?: string } }) {
  const valid = filterValidExperience(entries).slice(0, 20); const timelineRef = useRef<HTMLOListElement>(null); const [progress, setProgress] = useState(0); const reducedMotion = useReducedMotion();
  useEffect(() => { if (reducedMotion) { setProgress(1); return; } let frame = 0; const update = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(() => { const timeline = timelineRef.current; if (!timeline) return; const rect = timeline.getBoundingClientRect(); const cursor = window.innerHeight * .55; setProgress(Math.max(0, Math.min(1, (cursor - rect.top) / rect.height))); }); }; update(); window.addEventListener("scroll", update, { passive: true }); window.addEventListener("resize", update); return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", update); window.removeEventListener("resize", update); }; }, [reducedMotion]);
  return <section id="experience" className="atmospheric-blur-section relative overflow-hidden px-6 py-24 sm:py-32"><PixelDither density="low" origin="top-right" drift="up" className="absolute right-0 top-28 w-24 text-accent opacity-40" /><div className="relative mx-auto max-w-5xl"><SectionHeading {...heading} centered className="mb-16" />
    {valid.length === 0 ? <p className="text-center text-body">No experience is available yet.</p> : <ol ref={timelineRef} className="relative space-y-8">
      <span aria-hidden="true" className="absolute bottom-0 left-2 top-0 w-px bg-border md:left-1/2" />
      <span aria-hidden="true" data-testid="timeline-progress" className="absolute left-2 top-0 w-[2px] bg-primary will-change-[height] md:left-1/2" style={{ height: `${progress * 100}%` }} />
      {valid.map((entry, index) => <li key={entry.id} className={`relative pl-10 md:w-1/2 md:pl-0 ${index % 2 ? "md:ml-auto md:pl-10" : "md:pr-10"}`}>
        <span className={`absolute left-0 top-7 z-10 size-4 rounded-full border-4 border-bg ${index === 1 ? "bg-accent" : "bg-primary"} ${index % 2 ? "md:left-0 md:-translate-x-1/2" : "md:left-auto md:right-0 md:translate-x-1/2"}`} />
        <ScrollReveal style={{ transitionDelay: `${index * 120}ms` }} className="rounded-card border border-border bg-bg p-6 shadow-card"><p className="text-eyebrow">{entry.year}</p><h3 className="text-heading mt-2 text-lg">{entry.role}</h3><p className="mt-1 text-sm font-semibold text-muted">{entry.company}</p>{entry.description && <p className="text-body mt-4 text-sm leading-6">{entry.description.slice(0, 500)}</p>}<div className="mt-5 flex flex-wrap gap-2">{entry.techTags.slice(0, 10).map(tag => <span key={tag} className="rounded-pill bg-surface px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-primary">{tag}</span>)}</div></ScrollReveal>
      </li>)}
    </ol>}
  </div></section>;
}
