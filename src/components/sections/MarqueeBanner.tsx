"use client";

import type { MarqueeContent } from "@/content/types";
import { siteContent } from "@/content/site-content";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export interface MarqueeBannerProps {
  content?: MarqueeContent;
  speedPxPerSecond?: number;
}

export function MarqueeBanner({ content = siteContent.marquee, speedPxPerSecond = 80 }: MarqueeBannerProps) {
  const reducedMotion = useReducedMotion();
  const text = content.text.trim().slice(0, 200);
  if (!text) return null;

  // Approximate glyph width at the responsive display scale, bounded to the specified speed range.
  const speed = Math.min(120, Math.max(20, speedPxPerSecond));
  const duration = Math.max(8, (text.length * 38) / speed);
  const label = `${text} • `;

  if (reducedMotion) {
    return <section aria-label="Portfolio specialties" className="overflow-hidden border-y border-border bg-surface py-8"><p data-testid="marquee-static" className="px-6 text-center text-[clamp(2rem,7vw,6rem)] font-extrabold leading-none tracking-tight text-primary/20">{text}</p></section>;
  }

  return <section aria-label="Portfolio specialties" className="overflow-hidden border-y border-border bg-surface py-8"><div data-testid="marquee-track" className="flex w-max whitespace-nowrap text-[clamp(2rem,7vw,6rem)] font-extrabold leading-none tracking-tight text-primary/20" style={{ animation: `portfolio-marquee ${duration}s linear infinite` }}><span>{label}</span><span aria-hidden="true">{label}</span></div></section>;
}

export default MarqueeBanner;
