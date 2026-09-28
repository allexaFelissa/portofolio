import type { ReactNode } from "react";
import type { HardSkillCard, SoftSkillChip } from "@/content/types";
import { filterHardSkillCards } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TextPressure } from "@/components/react-bits/TextPressure";
import { ScrambledText } from "@/components/react-bits/ScrambledText";
import { PixelDither } from "@/components/visuals/PixelDither";

const icons: Record<string, ReactNode> = {
  code: <><path d="m8 9-3 3 3 3"/><path d="m16 9 3 3-3 3"/><path d="m14 5-4 14"/></>,
  chart: <><path d="M5 20v-7h4v7"/><path d="M10 20V8h4v12"/><path d="M15 20V4h4v16"/></>,
  spark: <path d="m13 2-8 11h7l-1 9 8-12h-7z"/>,
  database: <><ellipse cx="12" cy="5" rx="7" ry="3"/><path d="M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5"/><path d="M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/></>,
};

function SectionLabel({ children, note }: { children: ReactNode; note?: string }) {
  const label = String(children); return <div className="flex items-center gap-3 border-b border-border pb-4"><span aria-hidden="true" className="h-5 w-1 rounded-pill bg-primary" /><h3 className="text-lg font-extrabold tracking-tight text-primary"><ScrambledText text={label} /></h3>{note && <span className="font-mono text-[11px] font-medium tracking-wide text-muted">{note}</span>}</div>;
}

export function Skills({ hard, soft, heading }: { hard: HardSkillCard[]; soft: SoftSkillChip[]; heading: { eyebrow?: string; heading?: string } }) {
  const cards = filterHardSkillCards(hard).slice(0, 12);
  return <section id="skills" className="relative overflow-hidden bg-surface px-5 py-24 sm:px-6 sm:py-28"><PixelDither density="medium" origin="bottom-left" drift="up" className="absolute -left-12 top-1/3 w-52 text-accent opacity-45" /><div className="relative mx-auto max-w-6xl"><SectionHeading {...heading} centered className="mb-14 sm:mb-16" /><SectionLabel>Hard Skills</SectionLabel>
    {cards.length === 0 ? <p className="py-14 text-center text-body">Skills are being updated.</p> : <div className="grid gap-5 py-10 sm:grid-cols-2 lg:grid-cols-4">{cards.map(card => <ScrollReveal key={card.id} className="flex min-h-[260px] flex-col rounded-[20px] border border-border bg-bg p-5 shadow-card transition duration-200 hover:-translate-y-1.5 hover:shadow-card-hover sm:p-6"><div className="mb-4 grid size-9 place-items-center rounded-full border border-border bg-surface text-primary" aria-hidden="true"><svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{icons[card.icon] ?? icons.code}</svg></div><h4 className="text-[15px] font-extrabold tracking-tight text-primary"><TextPressure text={card.title} /></h4><p className="text-body mt-2 text-[11px] leading-[1.65]">{card.description}</p><div className="mt-auto flex flex-wrap gap-1.5 pt-6">{card.skills.slice(0, 15).map(skill => <span key={skill} className="rounded-button border border-border bg-surface px-2.5 py-1 text-[10px] font-semibold leading-none text-primary"><TextPressure text={skill} /></span>)}</div></ScrollReveal>)}</div>}
    {soft.length > 0 && <div className="mt-1"><SectionLabel>Soft Skills</SectionLabel><div className="flex flex-wrap gap-2.5 pt-6">{soft.slice(0, 20).map(skill => <span key={skill.id} className="flex items-center gap-2.5 rounded-[13px] border border-border bg-bg px-3.5 py-2.5 text-xs font-semibold text-primary shadow-[0_2px_5px_rgb(0_0_0/0.03)] transition hover:border-primary"><span className="size-1.5 rounded-full bg-primary" />{skill.label}</span>)}</div></div>}
  </div></section>;
}
