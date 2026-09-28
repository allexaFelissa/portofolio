import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LoadingScreen } from "./LoadingScreen";

describe("LoadingScreen", () => {
  afterEach(() => vi.useRealTimers());

  it("fades out within 200–600ms once ready", () => {
    vi.useFakeTimers();
    const { rerender } = render(<LoadingScreen ready={false} />);
    expect(screen.getByText("LOADING")).toBeInTheDocument();
    rerender(<LoadingScreen ready />);
    expect(screen.getByRole("status")).toHaveClass("opacity-0");
    act(() => vi.advanceTimersByTime(300));
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("force-reveals after the visibility cap and provides retry on error", () => {
    vi.useFakeTimers();
    const { unmount } = render(<LoadingScreen ready={false} maxVisibleMs={5000} />);
    act(() => vi.advanceTimersByTime(5000));
    act(() => vi.advanceTimersByTime(300));
    expect(screen.queryByRole("status")).not.toBeInTheDocument();

    unmount();
    const retry = vi.fn();
    render(<LoadingScreen ready={false} error onRetry={retry} />);
    fireEvent.click(screen.getByRole("button", { name: "Retry" }));
    expect(retry).toHaveBeenCalledOnce();
  });

  it("uses a static loading indicator when reduced motion is preferred", () => {
    const originalMatchMedia = window.matchMedia;
    Object.defineProperty(window, "matchMedia", { configurable: true, value: () => ({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() }) });
    try {
      render(<LoadingScreen ready={false} />);
      expect(screen.getByLabelText("Loading progress")).not.toHaveClass("animate-pulse");
    } finally {
      Object.defineProperty(window, "matchMedia", { configurable: true, value: originalMatchMedia });
    }
  });
});
