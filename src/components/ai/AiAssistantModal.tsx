"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Modal } from "@/components/ui/Modal";
import { StatusDot } from "@/components/ui/StatusDot";
import { isValidChatInput } from "@/lib/validation";

type Message = { role: "visitor" | "assistant"; text: string; time: string };

const STARTER_PROMPTS = [
  "Tell Me About Allexa",
  "Lexa’s Portfolio Recap",
  "Lexa’s Biggest Strength",
] as const;

const stamp = () => new Intl.DateTimeFormat("en", { hour: "2-digit", minute: "2-digit" }).format(new Date());

export function AiAssistantModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [question, setQuestion] = useState("");
  const [typing, setTyping] = useState(false);
  const bottom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && !messages.length) setMessages([{ role: "assistant", text: "Hi! I’m a personal AI assistant designed to help you explore Allexa’s portfolio, experience, skills, and projects. What would you like to know?", time: stamp() }]);
  }, [open, messages.length]);

  useEffect(() => {
    if (typeof bottom.current?.scrollIntoView === "function") bottom.current.scrollIntoView();
  }, [messages, typing]);

  async function sendQuestion(rawQuestion: string) {
    if (typing || !isValidChatInput(rawQuestion)) return;
    const text = rawQuestion.trim();
    setMessages((current) => [...current, { role: "visitor", text, time: stamp() }]);
    setQuestion("");
    setTyping(true);

    try {
      const response = await fetch("/api/chat", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ question: text }) });
      const data = (await response.json()) as { answer?: string; error?: string };
      if (!response.ok || !data.answer) throw new Error(data.error ?? "Assistant unavailable");
      setMessages((current) => [...current, { role: "assistant", text: data.answer!, time: stamp() }]);
    } catch (error) {
      const message = error instanceof Error && error.message
        ? error.message
        : "The assistant is temporarily busy. Please try again shortly.";
      setMessages((current) => [...current, { role: "assistant", text: message, time: stamp() }]);
    } finally {
      setTyping(false);
    }
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    void sendQuestion(question);
  }

  return (
    <Modal open={open} onClose={onClose} labelledBy="assistant-title" variant="bottom-sheet">
      <div className="flex h-[min(680px,90vh)] flex-col">
        <header className="flex items-center justify-between border-b border-border p-5">
          <div>
            <div className="flex items-center gap-2"><StatusDot /><h2 id="assistant-title" className="text-heading">Portfolio assistant</h2></div>
            <p className="mt-1 text-xs text-muted">Answers from the portfolio only</p>
          </div>
          <button onClick={onClose} aria-label="Close assistant" className="rounded-button p-2 text-xl focus-visible:outline focus-visible:outline-2">×</button>
        </header>
        <div className="flex-1 space-y-4 overflow-y-auto bg-surface p-5" aria-live="polite">
          {messages.map((message, index) => <div key={index} className={`flex ${message.role === "visitor" ? "justify-end" : "justify-start"}`}><div className={`max-w-[85%] rounded-bubble px-4 py-3 text-sm ${message.role === "visitor" ? "bg-primary text-bg" : "border border-border bg-bg text-primary"}`}><p className="whitespace-pre-line leading-relaxed">{message.text}</p><time className="mt-1 block text-[10px] opacity-60">{message.time}</time></div></div>)}
          {typing && <div aria-label="Assistant is typing" className="w-fit rounded-bubble border border-border bg-bg px-4 py-3 text-muted">•••</div>}
          <div ref={bottom} />
        </div>
        <div className="border-t border-border bg-bg px-4 pt-3" aria-label="Suggested questions">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-muted">Try asking</p>
          <div className="flex flex-wrap gap-2">{STARTER_PROMPTS.map((prompt) => <button key={prompt} type="button" disabled={typing} onClick={() => void sendQuestion(prompt)} className="rounded-pill border border-border bg-surface px-3 py-2 text-left text-xs font-semibold text-primary transition hover:-translate-y-0.5 hover:border-primary disabled:cursor-not-allowed disabled:opacity-50">{prompt}</button>)}</div>
        </div>
        <form onSubmit={submit} className="flex gap-2 bg-bg p-4">
          <input aria-label="Ask a question" maxLength={1000} value={question} onChange={(event) => setQuestion(event.target.value)} className="min-w-0 flex-1 rounded-pill border border-border bg-bg px-4 py-3 text-sm text-primary placeholder:text-muted outline-none focus:border-primary" placeholder="Ask about this portfolio…" />
          <button disabled={typing} className="rounded-pill bg-primary px-5 text-sm font-bold text-bg disabled:opacity-50">Send</button>
        </form>
      </div>
    </Modal>
  );
}
