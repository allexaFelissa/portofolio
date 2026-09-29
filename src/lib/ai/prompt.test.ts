import fc from "fast-check";
import { describe, expect, it } from "vitest";
import { buildGroundedPrompt, retrieveKnowledge, UNAVAILABLE_ANSWER } from "./prompt";

describe("buildGroundedPrompt", () => {
  // Feature: portfolio-website, Property 13: Grounded-prompt construction
  it("includes all grounding facts and the fixed unavailable response", () => {
    fc.assert(fc.property(fc.string(), fc.string(), (facts, question) => {
      const prompt = buildGroundedPrompt({ facts }, question);
      expect(prompt).toContain(facts);
      expect(prompt).toContain(question);
      expect(prompt).toContain(UNAVAILABLE_ANSWER);
      expect(prompt).toContain("Answer only from the relevant portfolio knowledge");
      expect(prompt).toContain("Answer directly");
      expect(prompt).toContain("Do not mention the knowledge base");
    }), { numRuns: 100 });
  });

  it("retrieves the records that match the visitor's question", () => {
    const facts = "Allexandra profile";
    const sections = [
      { id: "siaga", keywords: ["siaga", "flood"], content: "SIAGA uses XGBoost for flood risk." },
      { id: "contact", keywords: ["email", "contact"], content: "Email: example@example.com" },
    ];
    const result = retrieveKnowledge({ facts, sections }, "Tell me about SIAGA");
    expect(result).toContain("XGBoost");
    expect(result).not.toContain("example@example.com");
  });
});
