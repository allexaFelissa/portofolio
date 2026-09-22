const visits = new Map<string, number[]>();
export function isRateLimited(key: string, limit = 10, windowMs = 60_000): boolean {
  const now = Date.now(); const recent = (visits.get(key) ?? []).filter(time => now - time < windowMs);
  recent.push(now); visits.set(key, recent); return recent.length > limit;
}
export function clearRateLimits() { visits.clear(); }
