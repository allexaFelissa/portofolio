"use client";

import { useState } from "react";
import type { HeroContent } from "@/content/types";
import { siteContent } from "@/content/site-content";
import { Button } from "@/components/ui/Button";
import { DecryptedText } from "@/components/react-bits/DecryptedText";
import { ClickSpark } from "@/components/react-bits/ClickSpark";
import { ScrambledText } from "@/components/react-bits/ScrambledText";
import { useLanguage } from "@/hooks/useLanguage";

export interface HeroProps { content?: HeroContent; }

export function Hero({ content = siteContent.hero }: HeroProps) {
  const { language } = useLanguage();
  const id = language === "id";
  const [cvUnavailable, setCvUnavailable] = useState(false);
  const [portraitSrc, setPortraitSrc] = useState(content.portrait?.src);
  const badges = content.capabilityBadges.slice(0, 3);
  const exploreWork = () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" });

  return <section id="home" aria-labelledby="hero-heading" className="relative mx-auto grid min-h-[92vh] max-w-5xl items-center gap-10 overflow-hidden px-6 pb-12 pt-28 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
    <div className="relative z-10 max-w-2xl">
      {content.eyebrow && <p data-testid="hero-eyebrow" className="text-eyebrow mb-4"><ScrambledText text={content.eyebrow} /></p>}
      {content.name && <h1 data-testid="hero-name" id="hero-heading" className="text-heading-black text-4xl leading-[1.05] sm:text-5xl">{id ? "Hai, saya" : "Hi, I'm"} {content.name}</h1>}
      {content.role && <p data-testid="hero-role" className="mt-3 text-lg font-bold tracking-tight text-primary sm:text-xl"><DecryptedText text={content.role} /></p>}
      {content.description && <p data-testid="hero-description" className="text-body mt-5 max-w-lg text-sm leading-relaxed sm:text-[15px]">{content.description}</p>}
      <div className="mt-9 flex flex-wrap gap-3"><Button onClick={exploreWork}>{id ? "Lihat Karya" : "Explore Work"} <span aria-hidden="true">→</span></Button>{content.cvFile ? <ClickSpark><a href={content.cvFile} download className="inline-flex items-center justify-center rounded-button border border-border bg-bg px-4 py-2.5 text-sm font-semibold text-primary transition hover:-translate-y-0.5 hover:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">{id ? "Unduh CV" : "Download CV"} <span aria-hidden="true">↓</span></a></ClickSpark> : <Button variant="outline" onClick={() => setCvUnavailable(true)}>{id ? "Unduh CV" : "Download CV"} <span aria-hidden="true">↓</span></Button>}</div>
      {cvUnavailable && <p role="status" className="mt-3 text-sm text-muted">{id ? "CV tidak tersedia" : "CV unavailable"}</p>}
      {content.socialLinks.length > 0 && <div className="mt-11"><p className="text-eyebrow mb-3">{id ? "Terhubung" : "Connect"}</p><div className="flex gap-2">{content.socialLinks.map((link) => <a key={`${link.platform}-${link.url}`} href={link.url} aria-label={link.iconAlt} target="_blank" rel="noreferrer" className="rounded-card border border-border bg-bg px-3.5 py-2.5 text-sm font-bold text-primary shadow-card transition hover:-translate-y-0.5 hover:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">{link.platform}</a>)}</div></div>}
    </div>
    <div className="relative z-10 mx-auto w-full max-w-sm py-8">
      <div className="aspect-square overflow-hidden rounded-full border border-border bg-surface shadow-card-hover">{portraitSrc ? <img src={portraitSrc} alt={content.portrait?.alt ?? ""} className="size-full object-cover" onError={() => setPortraitSrc("/placeholder-portrait.svg")} /> : <div aria-label="Portrait unavailable" className="grid size-full place-items-center text-sm text-muted">Portrait unavailable</div>}</div>
      {badges.length === 3 && <div className="absolute -bottom-3 -left-2 flex flex-col gap-2 sm:-left-7">{badges.map((badge, index) => <span key={`${badge}-${index}`} style={{ animationDelay: `${index * 120}ms` }} className="animate-[pulse_1s_ease-out_both] rounded-card border border-border bg-bg/90 px-4 py-2 text-xs font-bold text-primary shadow-badge backdrop-blur-sm motion-reduce:animate-none">{badge}</span>)}</div>}
    </div>
  </section>;
}

export default Hero;
