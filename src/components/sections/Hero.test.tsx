import fc from "fast-check";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { HeroContent } from "@/content/types";
import { heroContentArb } from "@/test/arbitraries";
import { Hero } from "./Hero";

const baseContent: HeroContent = { capabilityBadges: ["One", "Two", "Three"], socialLinks: [] };

describe("Hero", () => {
  // Feature: portfolio-website, Property 4: Hero renders exactly its present fields
  it("renders optional copy only when present", () => {
    fc.assert(fc.property(heroContentArb(), (generated) => {
      const content = generated as HeroContent;
      const { container, unmount } = render(<Hero content={content} />);
      expect(Boolean(container.querySelector("[data-testid='hero-eyebrow']"))).toBe(Boolean(content.eyebrow));
      expect(Boolean(container.querySelector("[data-testid='hero-name']"))).toBe(Boolean(content.name));
      expect(Boolean(container.querySelector("[data-testid='hero-role']"))).toBe(Boolean(content.role));
      expect(Boolean(container.querySelector("[data-testid='hero-description']"))).toBe(Boolean(content.description));
      unmount();
    }), { numRuns: 100 });
  });

  // Feature: portfolio-website, Property 5: Social links map one-to-one
  it("maps every social link once and renders none for an empty list", () => {
    fc.assert(fc.property(heroContentArb(), (generated) => {
      const { container, unmount } = render(<Hero content={generated as HeroContent} />);
      expect(container.querySelectorAll("a[aria-label]")).toHaveLength(generated.socialLinks.length);
      unmount();
    }), { numRuns: 100 });
  });

  it("scrolls to projects and downloads a CV or shows an unavailable state", () => {
    const scrollIntoView = vi.fn();
    render(<><Hero content={{ ...baseContent, cvFile: "/cv.pdf" }} /><section id="projects" ref={(element) => { if (element) element.scrollIntoView = scrollIntoView; }} /></>);
    fireEvent.click(screen.getByRole("button", { name: /Explore Work/ }));
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth", block: "start" });
    expect(screen.getByRole("link", { name: /Download CV/ })).toHaveAttribute("download");

    render(<Hero content={baseContent} />);
    fireEvent.click(screen.getAllByRole("button", { name: /Download CV/ })[0]);
    expect(screen.getByRole("status")).toHaveTextContent("CV unavailable");
  });
});
