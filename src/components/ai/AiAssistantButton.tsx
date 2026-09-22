"use client";
import { useState } from "react";
import { AiAssistantModal } from "./AiAssistantModal";
export function AiAssistantButton() { const [open,setOpen] = useState(false); return <><button onClick={() => setOpen(true)} aria-label="Open portfolio assistant" className="fixed bottom-5 right-5 z-40 grid size-16 place-items-center rounded-full bg-primary text-2xl text-bg shadow-card-hover transition duration-200 hover:scale-110 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2">✦</button><AiAssistantModal open={open} onClose={() => setOpen(false)} /></>; }
