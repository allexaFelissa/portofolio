import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { clearRateLimits } from "@/lib/rate-limit";
import { POST as contact } from "./contact/route";
function request(path: string, body: unknown) { return new NextRequest(`http://localhost/api/${path}`, { method: "POST", headers: { "content-type": "application/json", "x-forwarded-for": `${path}-${Math.random()}` }, body: JSON.stringify(body) }); }
describe("API routes", () => { beforeEach(() => { clearRateLimits(); process.env.MAIL_API_KEY = "test"; }); afterEach(() => vi.unstubAllGlobals());
  it("validates contact fields and honeypot", async () => { expect((await contact(request("contact", { name: "", subject: "x", email: "a@b.com", message: "x" }))).status).toBe(400); expect((await contact(request("contact", { name: "A", subject: "x", email: "a@b.com", message: "x", website: "bot" }))).status).toBe(400); });
  it("sends valid contact data and controls provider failure", async () => { vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true })); const body = { name: "Alex", subject: "Hello", email: "a@b.com", message: "Hi" }; expect((await contact(request("contact", body))).status).toBe(200); vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false })); expect((await contact(request("contact", body))).status).toBe(503); });
});
