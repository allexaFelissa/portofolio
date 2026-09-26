"use client";
import { useEffect, useState } from "react";
import { siteContent } from "@/content/site-content";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { FloatingNavbar } from "@/components/layout/FloatingNavbar";
import { Hero } from "@/components/sections/Hero";
import { MarqueeBanner } from "@/components/sections/MarqueeBanner";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";
import { AiAssistantButton } from "@/components/ai/AiAssistantButton";

export default function Page() {
  const [ready,setReady] = useState(false); useEffect(() => { const timer = window.setTimeout(() => setReady(true), 900); return () => window.clearTimeout(timer); }, []);
  return <><LoadingScreen ready={ready} /><FloatingNavbar /><main><Hero /><MarqueeBanner /><About content={siteContent.about} /><Experience entries={siteContent.experience} heading={siteContent.sectionHeadings.experience} /><Skills hard={siteContent.hardSkills} soft={siteContent.softSkills} heading={siteContent.sectionHeadings.skills} /><Projects projects={siteContent.projects} heading={siteContent.sectionHeadings.projects} /><Contact heading={siteContent.sectionHeadings.contact} /></main><AiAssistantButton /></>;
}
