import type { Metadata } from "next";
import { ProjectsPageContent } from "@/components/projects/ProjectsPageContent";

export const metadata: Metadata = { title: "Projects | Allexa", description: "Explore Allexa's data and AI projects." };

export default function ProjectsPage() {
  return <ProjectsPageContent />;
}
