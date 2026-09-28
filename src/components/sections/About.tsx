"use client";

import { useState } from "react";
import type { AboutContent } from "@/content/types";
import { getPresentPersonalDetails } from "@/lib/content";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PixelDither } from "@/components/visuals/PixelDither";

export function About({ content }: { content: AboutContent }) {
  const [image, setImage] = useState(content.portrait?.src);
  const details = getPresentPersonalDetails(content.personalDetails);
  return <section id="about" className="relative overflow-hidden bg-surface px-5 py-20 transition-colors dark:bg-[#202226] sm:px-6 sm:py-24"><div className="relative mx-auto max-w-5xl">
    <SectionHeading eyebrow={content.eyebrow} heading={content.heading} centered className="mb-10 [&_h2]:text-3xl sm:mb-12 sm:[&_h2]:text-4xl" />
    <div className="grid items-center gap-8 md:grid-cols-[0.72fr_1.28fr] lg:gap-10">
      <ScrollReveal className="relative mx-auto w-full max-w-[320px]"><PixelDither density="low" origin="bottom-left" className="absolute -bottom-8 -left-10 z-10 w-32 text-accent opacity-75" /><div className="relative aspect-[4/5] overflow-hidden rounded-[24px] border border-border bg-bg shadow-card transition-colors dark:border-white/20 dark:bg-[#292c31] dark:shadow-[0_18px_45px_rgb(0_0_0/0.22)]">{image ? <img src={image} alt={content.portrait?.alt ?? ""} onError={() => setImage(undefined)} className="size-full object-cover" /> : <div className="grid size-full place-items-center text-xs text-muted">Portrait unavailable</div>}</div></ScrollReveal>
      <ScrollReveal className="space-y-4"><div className="rounded-card border border-border bg-bg/70 p-5 transition-colors dark:border-white/15 dark:bg-[#292c31]"><h3 className="text-heading text-base">Who Am I</h3>{content.whoAmI && <p className="text-body mt-2.5 text-sm leading-6">{content.whoAmI}</p>}</div><div className="rounded-card border border-border bg-bg/70 p-5 transition-colors dark:border-white/15 dark:bg-[#292c31]"><h3 className="text-heading text-base">My Approach</h3>{content.myApproach && <p className="text-body mt-2.5 text-sm leading-6">{content.myApproach}</p>}</div>{details.length > 0 && <dl className="grid gap-3 sm:grid-cols-2">{details.map(({ key, label, value }) => <div key={key} className="rounded-card border border-border bg-bg/70 p-4 transition-colors dark:border-white/15 dark:bg-[#292c31]"><dt className="text-eyebrow">{label}</dt><dd className="mt-1.5 text-sm font-semibold text-primary">{value}</dd></div>)}</dl>}</ScrollReveal>
    </div>
  </div></section>;
}
