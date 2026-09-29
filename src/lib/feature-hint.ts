export const FEATURE_HINT_STORAGE_KEY = "portfolio-feature-hint-dismissed-v2";
export const FEATURE_USED_EVENT = "portfolio-feature-used";

export function markFeatureUsed() {
  try {
    window.localStorage.setItem(FEATURE_HINT_STORAGE_KEY, "true");
  } catch {
    // The in-page event still dismisses the hint when storage is unavailable.
  }
  window.dispatchEvent(new Event(FEATURE_USED_EVENT));
}
