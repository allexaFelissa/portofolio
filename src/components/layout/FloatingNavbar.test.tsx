import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "@/hooks/useTheme";
import { FloatingNavbar } from "./FloatingNavbar";

describe("FloatingNavbar", () => {
  it("smooth-scrolls to a link target and exposes exactly one active link", () => {
    const scrollIntoView = vi.fn();
    const { container } = render(<ThemeProvider><><FloatingNavbar activeId="projects" /><section id="projects" ref={(element) => { if (element) element.scrollIntoView = scrollIntoView; }} /></></ThemeProvider>);
    fireEvent.click(screen.getByRole("button", { name: "Projects" }));
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth", block: "start" });
    expect(container.querySelectorAll("[aria-current='page']")).toHaveLength(1);
    expect(screen.getByRole("button", { name: "Projects" })).toHaveClass("focus-visible:outline-2");
  });
});
