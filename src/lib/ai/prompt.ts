import type { KnowledgeBase } from "@/content/types";

export const UNAVAILABLE_ANSWER = "Information not available.";

/** Builds a provider-neutral prompt without exposing environment configuration. */
export function buildGroundedPrompt(knowledgeBase: KnowledgeBase | string, question: string): string {
  const facts = typeof knowledgeBase === "string" ? knowledgeBase : knowledgeBase.facts;

  return [
    "You are the portfolio assistant.",
    "Answer only from the knowledge base below. Do not infer, invent, or use outside knowledge.",
    `If the answer is not in the knowledge base, reply exactly: \"${UNAVAILABLE_ANSWER}\"`,
    "Knowledge base:",
    facts,
    "Visitor question:",
    question,
  ].join("\n\n");
}
