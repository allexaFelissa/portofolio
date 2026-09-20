import fc from "fast-check";
import { describe, expect, it } from "vitest";
import { selectActiveSection } from "./scroll-spy";

describe("selectActiveSection", () => {
  // Feature: portfolio-website, Property 11: Scroll-spy selects at most one section
  it("returns no id or one whose ratio is at least half", () => {
    fc.assert(fc.property(fc.dictionary(fc.string({ minLength: 1, maxLength: 12 }), fc.double({ noNaN: true, noDefaultInfinity: true })), (visibility) => {
      const active = selectActiveSection(visibility);
      expect(active === undefined || visibility[active] >= 0.5).toBe(true);
    }), { numRuns: 100 });
  });
});
