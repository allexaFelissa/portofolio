"use client";

import { useState } from "react";
import type { AboutContent } from "@/content/types";
import { getPresentPersonalDetails } from "@/lib/content";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PixelDither } from "@/components/visuals/PixelDither";
import { useLanguage } from "@/hooks/useLanguage";

const detailLabels: Record<string, string> = {
  Name: "Nama",
  "Place of Birth": "Tempat Lahir",
  Phone: "Telepon",
  Education: "Pendidikan",
};

export function About({ content }: { content: AboutContent }) {
  const { language } = useLanguage();
  const id = language === "id";
  const [image, setImage] = useState(content.portrait?.src);
  const details = getPresentPersonalDetails(content.personalDetails);

  return <section id="about" className="relative overflow-hidden bg-surface px-5 py-20 transition-colors sm:px-6 sm:py-24">
    <div className="relative mx-auto max-w-5xl">
      <SectionHeading eyebrow={content.eyebrow} heading={content.heading} centered className="mb-10 [&_h2]:text-3xl sm:mb-12 sm:[&_h2]:text-4xl" />
      <div className="grid items-center gap-8 md:grid-cols-[0.72fr_1.28fr] lg:gap-10">
        <ScrollReveal className="relative mx-auto w-full max-w-[320px]">
          <PixelDither density="low" origin="bottom-left" className="absolute -bottom-8 -left-10 z-10 w-32 text-accent opacity-75" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] border border-border bg-bg shadow-card transition-colors">
            {image ? <img src={image} alt={content.portrait?.alt ?? ""} onError={() => setImage(undefined)} className="size-full object-cover" /> : <div className="grid size-full place-items-center text-xs text-muted">{id ? "Foto tidak tersedia" : "Portrait unavailable"}</div>}
          </div>
        </ScrollReveal>
        <ScrollReveal className="space-y-4">
          <div className="rounded-card border border-border bg-bg/70 p-5 transition-colors">
            <h3 className="text-heading text-base">{id ? "Siapa Saya" : "Who Am I"}</h3>
            {content.whoAmI && <p className="text-body mt-2.5 text-sm leading-6">{content.whoAmI}</p>}
          </div>
          <div className="rounded-card border border-border bg-bg/70 p-5 transition-colors">
            <h3 className="text-heading text-base">{id ? "Pendekatan Saya" : "My Approach"}</h3>
            {content.myApproach && <p className="text-body mt-2.5 text-sm leading-6">{content.myApproach}</p>}
          </div>
          {details.length > 0 && <dl className="grid gap-3 sm:grid-cols-2">{details.map(({ key, label, value }) => <div key={key} className="rounded-card border border-border bg-bg/70 p-4 transition-colors">
            <dt className="text-eyebrow">{id ? detailLabels[label] : label}</dt>
            <dd className="mt-1.5 text-sm font-semibold text-primary">{value}</dd>
          </div>)}</dl>}
        </ScrollReveal>
      </div>
    </div>
  </section>;
}
