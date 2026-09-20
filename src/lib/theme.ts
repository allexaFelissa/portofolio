export type Theme = "light" | "dark";
export type ThemePreference = Theme | null | undefined;

export const THEME_STORAGE_KEY = "portfolio-theme";

export function isTheme(value: unknown): value is Theme {
  return value === "light" || value === "dark";
}

export function resolveInitialTheme(persisted: unknown, osPreference: unknown): Theme {
  if (isTheme(persisted)) return persisted;
  return isTheme(osPreference) ? osPreference : "light";
}

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

/** Reads persisted theme safely; unavailable storage simply produces no value. */
export function readPersistedTheme(storage: StorageLike | null | undefined): Theme | undefined {
  try {
    const value = storage?.getItem(THEME_STORAGE_KEY);
    return isTheme(value) ? value : undefined;
  } catch {
    return undefined;
  }
}

/** Returns false on a storage failure while leaving the active session theme usable. */
export function persistTheme(theme: Theme, storage: StorageLike | null | undefined): boolean {
  try {
    storage?.setItem(THEME_STORAGE_KEY, theme);
    return Boolean(storage);
  } catch {
    return false;
  }
}
