import fc from "fast-check";
import { describe, expect, it } from "vitest";
import { buildGroundedPrompt, UNAVAILABLE_ANSWER } from "./prompt";

describe("buildGroundedPrompt", () => {
  // Feature: portfolio-website, Property 13: Grounded-prompt construction
  it("includes all grounding facts and the fixed unavailable response", () => {
    fc.assert(fc.property(fc.string(), fc.string(), (facts, question) => {
      const prompt = buildGroundedPrompt({ facts }, question);
      expect(prompt).toContain(facts);
      expect(prompt).toContain(question);
      expect(prompt).toContain(UNAVAILABLE_ANSWER);
      expect(prompt).toContain("only from the knowledge base");
      expect(prompt).toContain("Answer the visitor's question directly");
      expect(prompt).toContain("Do not mention the knowledge base");
    }), { numRuns: 100 });
  });
});
