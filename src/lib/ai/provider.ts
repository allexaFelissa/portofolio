export interface AiProvider {
  generate(prompt: string): Promise<string>;
}

type GeminiResponse = {
  candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
  error?: { message?: string };
};

export class GeminiProvider implements AiProvider {
  constructor(
    private apiKey = process.env.GEMINI_API_KEY,
    private model = process.env.GEMINI_MODEL ?? "gemini-3.5-flash-lite",
  ) {}

  async generate(prompt: string): Promise<string> {
    if (!this.apiKey) throw new Error("AI provider is not configured.");

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent?key=${this.apiKey}`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.2, maxOutputTokens: 1200 },
        }),
      },
    );

    const data = (await response.json()) as GeminiResponse;
    if (!response.ok) {
      console.error("Gemini API request failed:", response.status, data.error?.message ?? "Unknown provider error");
      throw new Error("AI provider failed.");
    }

    const answer = data.candidates?.[0]?.content?.parts
      ?.map((part) => part.text ?? "")
      .join("")
      .trim();
    if (!answer) throw new Error("AI provider returned no answer.");
    return answer;
  }
}
