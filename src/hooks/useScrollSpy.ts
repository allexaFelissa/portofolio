"use client";

import { useEffect, useState } from "react";
import { selectActiveSection, type SectionVisibility } from "@/lib/scroll-spy";

export function useScrollSpy(sectionIds: string[], threshold = 0.5): string | undefined {
  const [activeSection, setActiveSection] = useState<string>();

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const ratios: SectionVisibility = {};
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) ratios[entry.target.id] = entry.intersectionRatio;
      setActiveSection(selectActiveSection(ratios));
    }, { threshold: [threshold] });

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [sectionIds, threshold]);

  return activeSection;
}
