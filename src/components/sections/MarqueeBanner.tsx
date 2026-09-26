"use client";

import type { MarqueeContent } from "@/content/types";
import { siteContent } from "@/content/site-content";
import { ScrollVelocity } from "@/components/react-bits/ScrollVelocity";

export interface MarqueeBannerProps {
  content?: MarqueeContent;
  speedPxPerSecond?: number;
}

export function MarqueeBanner({ content = siteContent.marquee, speedPxPerSecond = 80 }: MarqueeBannerProps) {
  const text = content.text.trim().slice(0, 200);
  if (!text) return null;

  // Approximate glyph width at the responsive display scale, bounded to the specified speed range.
  const speed = Math.min(120, Math.max(20, speedPxPerSecond));
  const duration = Math.max(8, (text.length * 38) / speed);
  return <section aria-label="Portfolio specialties" className="overflow-hidden border-y border-border bg-surface py-5"><ScrollVelocity text={text} duration={duration} /></section>;
}

export default MarqueeBanner;
