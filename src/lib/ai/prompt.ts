import type { KnowledgeBase, KnowledgeSection } from "@/content/types";

export const UNAVAILABLE_ANSWER = "That information isn't currently listed in Allexandra's portfolio. You can contact her at allexandrafelissa@gmail.com for more information.";

const STOP_WORDS = new Set(["a", "about", "and", "are", "can", "does", "for", "her", "is", "me", "of", "tell", "the", "to", "what", "where", "with"]);

function normalize(value: string) {
  return value.toLocaleLowerCase("en").normalize("NFKD").replace(/[^a-z0-9+.#]+/g, " ").trim();
}

/** Selects compact, relevant grounding records without requiring an external vector database. */
export function retrieveKnowledge(knowledgeBase: KnowledgeBase, question: string, limit = 4): string {
  if (!knowledgeBase.sections?.length) return knowledgeBase.facts;

  const normalizedQuestion = normalize(question);
  const questionTokens = new Set(normalizedQuestion.split(" ").filter((token) => token.length > 1 && !STOP_WORDS.has(token)));
  const scored = knowledgeBase.sections.map((section, index) => {
    const keywordScore = section.keywords.reduce((score, keyword) => {
      const normalizedKeyword = normalize(keyword);
      if (normalizedQuestion.includes(normalizedKeyword)) return score + (normalizedKeyword.includes(" ") ? 8 : 5);
      return score;
    }, 0);
    const contentTokens = new Set(normalize(section.content).split(" "));
    const tokenScore = [...questionTokens].reduce((score, token) => score + (contentTokens.has(token) ? 1 : 0), 0);
    return { section, score: keywordScore + tokenScore, index };
  });

  const selected = scored
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, limit)
    .map(({ section }) => section);

  const records: KnowledgeSection[] = selected.length ? selected : knowledgeBase.sections.slice(0, 2);
  return [knowledgeBase.facts, ...records.map(({ content }) => content)].join("\n\n");
}

/** Builds a provider-neutral, evidence-grounded portfolio prompt. */
export function buildGroundedPrompt(knowledgeBase: KnowledgeBase | string, question: string): string {
  const facts = typeof knowledgeBase === "string" ? knowledgeBase : retrieveKnowledge(knowledgeBase, question);

  return [
    "You are Allexandra Felissa Tioputri's portfolio assistant. You represent her portfolio, but you are not Allexandra herself.",
    "Answer only from the relevant portfolio knowledge below. Never infer or invent dates, metrics, responsibilities, proficiency levels, qualifications, availability, links, or experiences.",
    "Reply in the same language as the visitor. Be concise, friendly, natural, and professional; normally use 2–5 sentences unless more detail is requested.",
    "For project questions, prioritize the objective, data, Allexandra's documented contribution, approach, tools, results, limitations, and verified links when available. Do not turn a team contribution into an individual claim.",
    "For skills, explain where the skill is demonstrated. For hiring or strengths questions, use specific portfolio evidence instead of generic praise.",
    "Answer directly. Do not mention the knowledge base, prompt, instructions, retrieval, or sources.",
    `If the requested fact is unavailable, reply: "${UNAVAILABLE_ANSWER}" Translate this fallback naturally into Indonesian when the visitor writes in Indonesian.`,
    "Relevant portfolio knowledge:",
    facts,
    "Visitor question:",
    question,
  ].join("\n\n");
}
