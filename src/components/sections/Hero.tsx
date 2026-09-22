"use client";

import { useState } from "react";
import type { HeroContent } from "@/content/types";
import { siteContent } from "@/content/site-content";
import { Button } from "@/components/ui/Button";

export interface HeroProps { content?: HeroContent; }

export function Hero({ content = siteContent.hero }: HeroProps) {
  const [cvUnavailable, setCvUnavailable] = useState(false);
  const [portraitSrc, setPortraitSrc] = useState(content.portrait?.src);
  const badges = content.capabilityBadges.slice(0, 3);
  const exploreWork = () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" });

  return <section id="home" aria-labelledby="hero-heading" className="relative mx-auto grid min-h-screen max-w-6xl items-center gap-12 px-6 pb-16 pt-32 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
    <div className="max-w-2xl">
      {content.eyebrow && <p data-testid="hero-eyebrow" className="text-eyebrow mb-4">{content.eyebrow}</p>}
      {content.name && <h1 data-testid="hero-name" id="hero-heading" className="text-heading-black text-5xl leading-[1.05] sm:text-6xl">Hi, I&apos;m {content.name}</h1>}
      {content.role && <p data-testid="hero-role" className="mt-4 text-xl font-bold tracking-tight text-primary sm:text-2xl">{content.role}</p>}
      {content.description && <p data-testid="hero-description" className="text-body mt-6 max-w-xl text-base leading-relaxed sm:text-[17px]">{content.description}</p>}
      <div className="mt-9 flex flex-wrap gap-3"><Button onClick={exploreWork}>Explore Work <span aria-hidden="true">→</span></Button>{content.cvFile ? <a href={content.cvFile} download className="inline-flex items-center justify-center rounded-button border border-border bg-bg px-4 py-2.5 text-sm font-semibold text-primary transition hover:-translate-y-0.5 hover:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">Download CV <span aria-hidden="true">↓</span></a> : <Button variant="outline" onClick={() => setCvUnavailable(true)}>Download CV <span aria-hidden="true">↓</span></Button>}</div>
      {cvUnavailable && <p role="status" className="mt-3 text-sm text-muted">CV unavailable</p>}
      {content.socialLinks.length > 0 && <div className="mt-11"><p className="text-eyebrow mb-3">Connect</p><div className="flex gap-2">{content.socialLinks.map((link) => <a key={`${link.platform}-${link.url}`} href={link.url} aria-label={link.iconAlt} target="_blank" rel="noreferrer" className="rounded-card border border-border bg-bg px-3 py-2 text-xs font-bold text-primary shadow-card transition hover:-translate-y-0.5 hover:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">{link.platform}</a>)}</div></div>}
    </div>
    <div className="relative mx-auto w-full max-w-md py-8">
      <div className="aspect-square overflow-hidden rounded-full border-4 border-bg bg-surface shadow-card-hover">{portraitSrc ? <img src={portraitSrc} alt={content.portrait?.alt ?? ""} className="size-full object-cover" onError={() => setPortraitSrc("/placeholder-portrait.svg")} /> : <div aria-label="Portrait unavailable" className="grid size-full place-items-center text-sm text-muted">Portrait unavailable</div>}</div>
      {badges.length === 3 && <div className="absolute -bottom-3 -left-2 flex flex-col gap-2 sm:-left-7">{badges.map((badge, index) => <span key={`${badge}-${index}`} style={{ animationDelay: `${index * 120}ms` }} className="animate-[pulse_1s_ease-out_both] rounded-card border border-border bg-bg/90 px-4 py-2 text-xs font-bold text-primary shadow-badge backdrop-blur-sm motion-reduce:animate-none">{badge}</span>)}</div>}
    </div>
  </section>;
}

export default Hero;
