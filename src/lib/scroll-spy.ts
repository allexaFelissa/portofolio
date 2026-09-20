export type SectionVisibility = Record<string, number>;

/**
 * Returns the most visible section occupying at least half of the viewport.
 * Ties preserve the source object's insertion order for stable navigation.
 */
export function selectActiveSection(visibility: SectionVisibility): string | undefined {
  let activeId: string | undefined;
  let highestRatio = 0.5;

  for (const [id, rawRatio] of Object.entries(visibility)) {
    const ratio = Number.isFinite(rawRatio) ? rawRatio : 0;
    if (ratio >= 0.5 && (activeId === undefined || ratio > highestRatio)) {
      activeId = id;
      highestRatio = ratio;
    }
  }

  return activeId;
}
