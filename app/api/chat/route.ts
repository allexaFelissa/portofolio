import { NextRequest, NextResponse } from "next/server";
import { knowledgeBase } from "@/content/knowledge-base";
import { buildGroundedPrompt } from "@/lib/ai/prompt";
import { GeminiProvider } from "@/lib/ai/provider";
import { isValidChatInput } from "@/lib/validation";
import { isRateLimited } from "@/lib/rate-limit";
export async function POST(request: NextRequest) { try { const body = await request.json() as { question?: unknown; website?: unknown }; if (body.website) return NextResponse.json({ error: "Invalid request." }, { status: 400 }); if (typeof body.question !== "string" || !isValidChatInput(body.question)) return NextResponse.json({ error: "Question must contain 1–1000 characters." }, { status: 400 }); const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown"; if (isRateLimited(`chat:${ip}`)) return NextResponse.json({ error: "Too many requests." }, { status: 429 }); const answer = await new GeminiProvider().generate(buildGroundedPrompt(knowledgeBase, body.question.trim())); return NextResponse.json({ answer, grounded: true }); } catch { return NextResponse.json({ error: "Assistant unavailable." }, { status: 503 }); } }
