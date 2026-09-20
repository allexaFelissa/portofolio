import type {
  ExperienceEntry,
  HardSkillCard,
  MarqueeContent,
  PersonalDetails,
  Project,
  SocialLink,
} from "@/content/types";

export interface PersonalDetailField {
  key: keyof PersonalDetails;
  label: "Name" | "Place of Birth" | "Phone" | "Education";
  value: string;
}

const personalDetailOrder: Array<{ key: keyof PersonalDetails; label: PersonalDetailField["label"] }> = [
  { key: "name", label: "Name" },
  { key: "placeOfBirth", label: "Place of Birth" },
  { key: "phone", label: "Phone" },
  { key: "education", label: "Education" },
];

const hasText = (value: string | undefined): value is string => Boolean(value?.trim());

export function filterValidExperience(entries: ExperienceEntry[]): ExperienceEntry[] {
  return entries.filter((entry) => hasText(entry.year) && hasText(entry.role) && hasText(entry.company));
}

export function filterHardSkillCards(cards: HardSkillCard[]): HardSkillCard[] {
  return cards.filter((card) => card.skills.length > 0);
}

export function getPresentPersonalDetails(details: PersonalDetails): PersonalDetailField[] {
  return personalDetailOrder.flatMap(({ key, label }) => {
    const value = details[key];
    return hasText(value) ? [{ key, label, value }] : [];
  });
}

/** Returns a new array so rendering cannot mutate the owner-managed store. */
export function mapSocialLinks(links: SocialLink[]): SocialLink[] {
  return [...links];
}

export function isMarqueeVisible(content: MarqueeContent): boolean {
  return content.text.trim().length > 0;
}

export function getProjectsState(projects: Project[]): { isEmpty: boolean; projects: Project[] } {
  return { isEmpty: projects.length === 0, projects: [...projects] };
}
