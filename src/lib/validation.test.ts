import fc from "fast-check";
import { describe, expect, it } from "vitest";
import { isValidChatInput, isValidEmail, validateField } from "./validation";

describe("validation", () => {
  // Feature: portfolio-website, Property 1: Email validity predicate
  it("accepts exactly the specified email shape", () => {
    fc.assert(fc.property(fc.string(), (value) => {
      const parts = value.split("@");
      expect(isValidEmail(value)).toBe(parts.length === 2 && parts[0].length > 0 && parts[1].includes("."));
    }), { numRuns: 100 });
  });

  // Feature: portfolio-website, Property 2: Contact field validation
  it("uses trimmed inclusive field boundaries", () => {
    fc.assert(fc.property(fc.string(), fc.integer({ min: 0, max: 30 }), fc.integer({ min: 0, max: 30 }), (value, first, second) => {
      const min = Math.min(first, second);
      const max = Math.max(first, second);
      const length = value.trim().length;
      expect(validateField(value, min, max).valid).toBe(length > 0 && length >= min && length <= max);
    }), { numRuns: 100 });
  });

  // Feature: portfolio-website, Property 3: Chat-input guard
  it("accepts only a nonblank question up to 1000 trimmed characters", () => {
    fc.assert(fc.property(fc.string({ maxLength: 1200 }), (question) => {
      const length = question.trim().length;
      expect(isValidChatInput(question)).toBe(length >= 1 && length <= 1000);
    }), { numRuns: 100 });
  });
});
