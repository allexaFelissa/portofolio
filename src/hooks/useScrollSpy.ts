"use client";

import { useEffect, useState } from "react";

export function useScrollSpy(sectionIds: string[]): string | undefined {
  const [activeSection, setActiveSection] = useState<string>();

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);
    if (elements.length === 0) return;

    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const marker = window.innerHeight * 0.38;
        const current = elements.find((element) => {
          const rect = element.getBoundingClientRect();
          return rect.top <= marker && rect.bottom > marker;
        });

        if (current) {
          setActiveSection(current.id);
          return;
        }

        const nearest = elements.reduce((best, element) => {
          const distance = Math.abs(element.getBoundingClientRect().top - marker);
          return distance < best.distance ? { element, distance } : best;
        }, { element: elements[0], distance: Number.POSITIVE_INFINITY });
        setActiveSection(nearest.element.id);
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [sectionIds]);

  return activeSection;
}
