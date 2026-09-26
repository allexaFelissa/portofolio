"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function ScrollVelocity({ text, duration }: { text: string; duration: number }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const track = trackRef.current;
    if (!track || reducedMotion) return;

    let frame = 0;
    let previousTime = performance.now();
    let previousScrollY = window.scrollY;
    let offset = 0;
    let velocityBoost = 1;

    const onScroll = () => {
      const delta = Math.abs(window.scrollY - previousScrollY);
      previousScrollY = window.scrollY;
      velocityBoost = Math.min(2.25, 1 + delta / 80);
    };

    const animate = (time: number) => {
      const deltaSeconds = Math.min((time - previousTime) / 1000, 0.05);
      previousTime = time;
      const loopWidth = track.scrollWidth / 2;
      const baseSpeed = loopWidth > 0 ? loopWidth / duration : 45;
      offset -= baseSpeed * velocityBoost * deltaSeconds;
      if (loopWidth > 0 && offset <= -loopWidth) offset += loopWidth;
      velocityBoost += (1 - velocityBoost) * 0.075;
      track.style.transform = `translate3d(${offset}px, 0, 0)`;
      frame = requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    frame = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [duration, reducedMotion]);

  if (reducedMotion) {
    return <p data-testid="marquee-static" className="px-6 text-center text-[clamp(1.5rem,4vw,3.75rem)] font-extrabold leading-none tracking-tight text-primary/20">{text}</p>;
  }

  const label = `${text} • `;
  return <div ref={trackRef} data-testid="marquee-track" className="flex w-max whitespace-nowrap text-[clamp(1.5rem,4vw,3.75rem)] font-extrabold leading-none tracking-tight text-primary/20 will-change-transform"><span>{label}</span><span aria-hidden="true">{label}</span></div>;
}
