/**
 * Read-only content shapes consumed by the portfolio sections.
 * Keep copy and asset references in site-content.ts rather than components.
 */

export interface SocialLink {
  platform: string;
  url: string;
  iconAlt: string;
}

/** An empty alt marks an image as decorative. */
export interface ImageRef {
  src: string;
  alt: string;
}

export interface HeroContent {
  eyebrow?: string;
  name?: string;
  role?: string;
  description?: string;
  portrait?: ImageRef;
  capabilityBadges: string[];
  socialLinks: SocialLink[];
  cvFile?: string;
}

export interface PersonalDetails {
  name?: string;
  placeOfBirth?: string;
  phone?: string;
  education?: string;
}

export interface AboutContent {
  eyebrow?: string;
  heading?: string;
  portrait?: ImageRef;
  whoAmI?: string;
  myApproach?: string;
  personalDetails: PersonalDetails;
}

export interface ExperienceEntry {
  id: string;
  year?: string;
  role?: string;
  company?: string;
  description?: string;
  techTags: string[];
}

export interface HardSkillCard {
  id: string;
  icon: string;
  title: string;
  description: string;
  skills: string[];
}

export interface SoftSkillChip {
  id: string;
  label: string;
}

export interface Project {
  id: string;
  title: string;
  description?: string;
  thumbnail: ImageRef;
  detailBody?: string;
  role?: string;
  stack?: string[];
  links?: SocialLink[];
  externalUrl?: string;
  repositoryUrl?: string;
  demoUrl?: string;
  categories?: Array<"Data" | "AI" | "Web">;
  proof?: string;
}

export interface MarqueeContent {
  text: string;
}

export interface SiteContent {
  hero: HeroContent;
  about: AboutContent;
  experience: ExperienceEntry[];
  marquee: MarqueeContent;
  hardSkills: HardSkillCard[];
  softSkills: SoftSkillChip[];
  projects: Project[];
  sectionHeadings: Record<string, { eyebrow?: string; heading?: string }>;
}

/** Server-side grounding text for the AI assistant. */
export interface KnowledgeBase {
  facts: string;
  sections?: KnowledgeSection[];
}

export interface KnowledgeSection {
  id: string;
  keywords: string[];
  content: string;
}
