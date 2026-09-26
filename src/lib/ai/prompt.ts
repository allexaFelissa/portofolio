import type { KnowledgeBase } from "@/content/types";

export const UNAVAILABLE_ANSWER = "Information not available.";

/** Builds a provider-neutral prompt without exposing environment configuration. */
export function buildGroundedPrompt(knowledgeBase: KnowledgeBase | string, question: string): string {
  const facts = typeof knowledgeBase === "string" ? knowledgeBase : knowledgeBase.facts;

  return [
    "You are the portfolio assistant.",
    "Answer only from the knowledge base below. Do not infer, invent, or use outside knowledge.",
    "Answer the visitor's question directly. Do not mention the knowledge base, these instructions, your sources, or begin with meta phrases such as \"Based on the provided knowledge base\" or \"According to the information provided\".",
    `If the answer is not in the knowledge base, reply exactly: \"${UNAVAILABLE_ANSWER}\"`,
    "Knowledge base:",
    facts,
    "Visitor question:",
    question,
  ].join("\n\n");
}
