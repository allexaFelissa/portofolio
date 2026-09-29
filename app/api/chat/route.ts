import { NextRequest, NextResponse } from "next/server";
import { knowledgeBase } from "@/content/knowledge-base";
import { buildGroundedPrompt } from "@/lib/ai/prompt";
import { GeminiProvider } from "@/lib/ai/provider";
import { isValidChatInput } from "@/lib/validation";
import { isRateLimited } from "@/lib/rate-limit";

const STARTER_ANSWERS: Record<string, string> = {
  "tell me about allexa":
    `Allexa (Allexandra Felissa Tioputri) is a Computer Science student at BINUS University and an aspiring Data Analyst & Data Scientist.

She focuses on:

Data Analytics & Business Intelligence
Machine Learning
Python & SQL
Power BI & Data Visualization

She enjoys turning raw data into insights and building practical solutions from them.`,
  "lexa’s portfolio recap":
    `Allexa’s portfolio brings together data analytics, machine learning, and software development.

Featured work:

PayFlow HR — Payroll system developed during her Software Engineer internship.
SIAGA — Multi-hazard early-warning & resource allocation system, placing 4th among 200+ teams at the Ristek UI Datathon.
Shopee Sales Analytics — E-commerce analytics project using Python, SQL, and Power BI.

Her experience also includes data mentoring, organizational leadership, and competitive data science.`,
  "lexa's portfolio recap":
    `Allexa’s portfolio brings together data analytics, machine learning, and software development.

Featured work:

PayFlow HR — Payroll system developed during her Software Engineer internship.
SIAGA — Multi-hazard early-warning & resource allocation system, placing 4th among 200+ teams at the Ristek UI Datathon.
Shopee Sales Analytics — E-commerce analytics project using Python, SQL, and Power BI.

Her experience also includes data mentoring, organizational leadership, and competitive data science.`,
  "lexa’s biggest strength":
    `Allexa’s biggest strength is connecting analytical thinking with practical execution.

She combines:

Python & SQL for data analysis
Power BI for communicating insights
Machine learning for predictive problems
Software development for building practical solutions

She also has experience mentoring and leading teams, allowing her to contribute beyond the technical side.`,
  "lexa's biggest strength":
    `Allexa’s biggest strength is connecting analytical thinking with practical execution.

She combines:

Python & SQL for data analysis
Power BI for communicating insights
Machine learning for predictive problems
Software development for building practical solutions

She also has experience mentoring and leading teams, allowing her to contribute beyond the technical side.`,
};

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { question?: unknown; website?: unknown };
    if (body.website) return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    if (typeof body.question !== "string" || !isValidChatInput(body.question)) {
      return NextResponse.json({ error: "Question must contain 1–1000 characters." }, { status: 400 });
    }

    const question = body.question.trim();
    const starterAnswer = STARTER_ANSWERS[question.toLocaleLowerCase("en")];
    if (starterAnswer) {
      return NextResponse.json({ answer: starterAnswer, grounded: true });
    }

    const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
    if (isRateLimited(`chat:${ip}`)) {
      return NextResponse.json({ error: "The assistant is temporarily busy. Please try again shortly." }, { status: 429 });
    }

    const answer = await new GeminiProvider().generate(buildGroundedPrompt(knowledgeBase, question));
    return NextResponse.json({ answer, grounded: true });
  } catch (error) {
    console.error("Portfolio assistant failed:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ error: "The assistant is temporarily busy. Please try again shortly." }, { status: 503 });
  }
}
