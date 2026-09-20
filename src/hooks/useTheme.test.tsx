import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ThemeProvider, useTheme } from "./useTheme";
import { THEME_STORAGE_KEY } from "@/lib/theme";

function ThemeProbe() {
  const { theme, toggleTheme } = useTheme();
  return <button type="button" onClick={toggleTheme}>Current theme: {theme}</button>;
}

describe("ThemeProvider", () => {
  it("toggles, persists, and applies the theme to the document root", async () => {
    window.localStorage.clear();
    render(<ThemeProvider><ThemeProbe /></ThemeProvider>);
    const button = await screen.findByRole("button", { name: "Current theme: light" });
    fireEvent.click(button);
    await waitFor(() => expect(button).toHaveTextContent("Current theme: dark"));
    expect(document.documentElement).toHaveClass("dark");
    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark");
  });

  it("keeps the session theme when storage cannot persist", async () => {
    const getItem = vi.fn(() => null);
    const setItem = vi.fn(() => { throw new Error("Storage unavailable"); });
    const original = window.localStorage;
    Object.defineProperty(window, "localStorage", { configurable: true, value: { getItem, setItem } });

    try {
      render(<ThemeProvider><ThemeProbe /></ThemeProvider>);
      const button = await screen.findByRole("button", { name: "Current theme: light" });
      fireEvent.click(button);
      await waitFor(() => expect(button).toHaveTextContent("Current theme: dark"));
      expect(setItem).toHaveBeenCalledWith(THEME_STORAGE_KEY, "dark");
    } finally {
      Object.defineProperty(window, "localStorage", { configurable: true, value: original });
    }
  });
});
