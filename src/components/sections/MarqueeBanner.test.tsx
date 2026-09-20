import fc from "fast-check";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MarqueeBanner } from "./MarqueeBanner";

describe("MarqueeBanner", () => {
  // Feature: portfolio-website, Property 10: Marquee visibility tracks content
  it("renders a banner if and only if its text is nonblank", () => {
    fc.assert(fc.property(fc.string({ maxLength: 250 }), (text) => {
      const { container, unmount } = render(<MarqueeBanner content={{ text }} />);
      expect(Boolean(container.querySelector("section"))).toBe(text.trim().length > 0);
      unmount();
    }), { numRuns: 100 });
  });
});
