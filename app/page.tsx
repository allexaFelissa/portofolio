"use client";
import { useEffect, useState } from "react";
import { siteContent } from "@/content/site-content";
import { siteContentId } from "@/content/site-content-id";
import { useLanguage } from "@/hooks/useLanguage";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { FloatingNavbar } from "@/components/layout/FloatingNavbar";
import { Hero } from "@/components/sections/Hero";
import { MarqueeBanner } from "@/components/sections/MarqueeBanner";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";
import { FeatureHint } from "@/components/layout/FeatureHint";

export default function Page() {
  const { language } = useLanguage();
  const content = language === "id" ? siteContentId : siteContent;
  const [ready,setReady] = useState(false); useEffect(() => { const timer = window.setTimeout(() => setReady(true), 900); return () => window.clearTimeout(timer); }, []);
  const featuredProjectIds = ["siaga", "shopee-sales-dashboard", "payflow"];
  const featuredProjects = featuredProjectIds.flatMap(id => {
    const project = content.projects.find(item => item.id === id);
    return project ? [project] : [];
  });
  return <><LoadingScreen ready={ready} /><FloatingNavbar /><main><Hero content={content.hero} /><MarqueeBanner content={content.marquee} /><About content={content.about} /><Experience entries={content.experience} heading={content.sectionHeadings.experience} /><Skills hard={content.hardSkills} soft={content.softSkills} heading={content.sectionHeadings.skills} /><Projects projects={featuredProjects} heading={content.sectionHeadings.projects} /><Contact heading={content.sectionHeadings.contact} /></main><FeatureHint /></>;
}
