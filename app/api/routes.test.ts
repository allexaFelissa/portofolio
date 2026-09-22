import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { clearRateLimits } from "@/lib/rate-limit";
import { POST as chat } from "./chat/route";
import { POST as contact } from "./contact/route";
function request(path: string, body: unknown) { return new NextRequest(`http://localhost/api/${path}`, { method: "POST", headers: { "content-type": "application/json", "x-forwarded-for": `${path}-${Math.random()}` }, body: JSON.stringify(body) }); }
describe("API routes", () => { beforeEach(() => { clearRateLimits(); process.env.GEMINI_API_KEY = "test"; process.env.MAIL_API_KEY = "test"; }); afterEach(() => vi.unstubAllGlobals());
  it("rejects empty and overlength chat questions", async () => { expect((await chat(request("chat", { question: " " }))).status).toBe(400); expect((await chat(request("chat", { question: "x".repeat(1001) }))).status).toBe(400); });
  it("sends the complete grounded prompt and returns an answer", async () => { const fetcher = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ candidates: [{ content: { parts: [{ text: "Python and SQL." }] } }] }) }); vi.stubGlobal("fetch", fetcher); const response = await chat(request("chat", { question: "What skills?" })); expect(response.status).toBe(200); const sent = JSON.parse(fetcher.mock.calls[0][1].body); expect(sent.contents[0].parts[0].text).toContain("Allexandra Felissa Tioputri"); expect(await response.json()).toEqual({ answer: "Python and SQL.", grounded: true }); });
  it("turns provider failures into a controlled response", async () => { vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error())); expect((await chat(request("chat", { question: "What skills?" }))).status).toBe(503); });
  it("validates contact fields and honeypot", async () => { expect((await contact(request("contact", { name: "", subject: "x", email: "a@b.com", message: "x" }))).status).toBe(400); expect((await contact(request("contact", { name: "A", subject: "x", email: "a@b.com", message: "x", website: "bot" }))).status).toBe(400); });
  it("sends valid contact data and controls provider failure", async () => { vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true })); const body = { name: "Alex", subject: "Hello", email: "a@b.com", message: "Hi" }; expect((await contact(request("contact", body))).status).toBe(200); vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false })); expect((await contact(request("contact", body))).status).toBe(503); });
});
