import fc from "fast-check";
import { describe, expect, it } from "vitest";
import { resolveInitialTheme } from "./theme";

describe("resolveInitialTheme", () => {
  // Feature: portfolio-website, Property 12: Theme resolution precedence
  it("prefers a valid persisted value, then the OS, then light", () => {
    fc.assert(fc.property(fc.oneof(fc.string(), fc.constant(null), fc.constant(undefined)), fc.constantFrom("light", "dark", null, undefined), (persisted, osPreference) => {
      const expected = persisted === "light" || persisted === "dark"
        ? persisted
        : osPreference === "light" || osPreference === "dark"
          ? osPreference
          : "light";
      expect(resolveInitialTheme(persisted, osPreference)).toBe(expected);
    }), { numRuns: 100 });
  });
});
