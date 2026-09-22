export interface AiProvider { generate(prompt: string): Promise<string>; }
export class GeminiProvider implements AiProvider {
  constructor(private apiKey = process.env.GEMINI_API_KEY) {}
  async generate(prompt: string): Promise<string> {
    if (!this.apiKey) throw new Error("AI provider is not configured.");
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${this.apiKey}`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }) });
    if (!response.ok) throw new Error("AI provider failed."); const data = await response.json() as { candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }> }; const answer = data.candidates?.[0]?.content?.parts?.[0]?.text; if (!answer) throw new Error("AI provider returned no answer."); return answer;
  }
}
