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

function SocialIcon({ platform }: { platform: string }) {
  const name = platform.toLowerCase();
  if (name === "email") return <svg aria-hidden="true" viewBox="0 0 24 24" className="size-[18px] fill-none stroke-current" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg>;
  if (name === "github") return <svg aria-hidden="true" viewBox="0 0 24 24" className="size-[18px] fill-current"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.87c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.6 9.6 0 0 1 12 6.82a9.6 9.6 0 0 1 2.5.34c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.86v2.76c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" /></svg>;
  if (name === "linkedin") return <svg aria-hidden="true" viewBox="0 0 24 24" className="size-[18px] fill-current"><path d="M6.5 8.25H3.25V21H6.5V8.25ZM4.88 3A1.88 1.88 0 1 0 4.88 6.75 1.88 1.88 0 0 0 4.88 3ZM21 13.69c0-3.84-2.05-5.63-4.79-5.63-2.2 0-3.19 1.21-3.75 2.06V8.25H9.21V21h3.25v-6.31c0-1.66.31-3.27 2.37-3.27 2.03 0 2.06 1.9 2.06 3.38V21H21v-7.31Z" /></svg>;
  if (name === "instagram") return <svg aria-hidden="true" viewBox="0 0 24 24" className="size-[18px] fill-none stroke-current" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>;
  return <svg aria-hidden="true" viewBox="0 0 24 24" className="size-[18px] fill-none stroke-current" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10 14a4.5 4.5 0 0 0 6.4.1l2-2a4.5 4.5 0 0 0-6.4-6.4l-1.1 1.1" /><path d="M14 10a4.5 4.5 0 0 0-6.4-.1l-2 2a4.5 4.5 0 0 0 6.4 6.4l1.1-1.1" /></svg>;
}

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
      <div className="mt-9 flex flex-wrap gap-3"><Button onClick={exploreWork}>{id ? "Lihat Karya" : "Explore Work"}</Button>{content.cvFile ? <ClickSpark><a href={content.cvFile} download className="inline-flex items-center justify-center rounded-button border border-border bg-bg px-4 py-2.5 text-sm font-semibold text-primary transition hover:-translate-y-0.5 hover:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">{id ? "Unduh CV" : "Download CV"}</a></ClickSpark> : <Button variant="outline" onClick={() => setCvUnavailable(true)}>{id ? "Unduh CV" : "Download CV"}</Button>}</div>
      {cvUnavailable && <p role="status" className="mt-3 text-sm text-muted">{id ? "CV tidak tersedia" : "CV unavailable"}</p>}
      {content.socialLinks.length > 0 && <div className="mt-11"><p className="text-eyebrow mb-3">{id ? "Terhubung" : "Connect"}</p><div className="flex flex-wrap gap-2">{content.socialLinks.map((link) => <a key={`${link.platform}-${link.url}`} href={link.url} aria-label={link.iconAlt} title={link.platform} target={link.url.startsWith("mailto:") ? undefined : "_blank"} rel={link.url.startsWith("mailto:") ? undefined : "noreferrer"} className="grid size-10 place-items-center rounded-full border border-border bg-bg text-primary shadow-card transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-primary hover:shadow-card-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"><SocialIcon platform={link.platform} /></a>)}</div></div>}
    </div>
    <div className="relative z-10 mx-auto w-full max-w-sm py-8">
      <div className="aspect-square overflow-hidden rounded-full border border-border bg-surface shadow-card-hover">{portraitSrc ? <img src={portraitSrc} alt={content.portrait?.alt ?? ""} className="size-full object-cover" onError={() => setPortraitSrc("/placeholder-portrait.svg")} /> : <div aria-label="Portrait unavailable" className="grid size-full place-items-center text-sm text-muted">Portrait unavailable</div>}</div>
      {badges.length === 3 && <div className="absolute -bottom-3 -left-2 flex flex-col gap-2 sm:-left-7">{badges.map((badge, index) => <span key={`${badge}-${index}`} style={{ animationDelay: `${index * 120}ms` }} className="animate-[pulse_1s_ease-out_both] rounded-card border border-border bg-bg/90 px-4 py-2 text-xs font-bold text-primary shadow-badge backdrop-blur-sm motion-reduce:animate-none">{badge}</span>)}</div>}
    </div>
  </section>;
}

export default Hero;
