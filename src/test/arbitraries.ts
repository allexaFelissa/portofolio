// Shared fast-check arbitraries (content generators) for property-based tests.
//
// These generators mirror the Content_Store data models defined in the design
// (design.md > Data Models). They are intentionally self-contained and do not
// import `src/content/types.ts` yet, so tests can be written before/independently
// of the content-type task. Once `types.ts` exists, these shapes are structurally
// compatible and can be cast where a concrete type is required.
//
// Usage:
//   import fc from "fast-check";
//   import { heroContentArb, projectArb } from "@/test/arbitraries";
//   fc.assert(fc.property(heroContentArb(), (hero) => { ... }), { numRuns: 100 });

import fc from "fast-check";

// ---- Primitive helpers ----

/** Non-empty string containing at least one non-whitespace character. */
export const nonBlankString = (maxLength = 80): fc.Arbitrary<string> =>
  fc
    .string({ minLength: 1, maxLength })
    .filter((s) => s.trim().length > 0);

/** String bounded by an inclusive [min, max] length. */
export const boundedString = (min: number, max: number): fc.Arbitrary<string> =>
  fc.string({ minLength: min, maxLength: max });

/** A plausible URL string (kept simple; not RFC-exhaustive). */
export const urlArb = (): fc.Arbitrary<string> =>
  fc
    .tuple(
      fc.constantFrom("https://", "http://"),
      nonBlankString(20).map((s) => s.replace(/\s+/g, "")),
      fc.constantFrom(".com", ".io", ".dev", ".net", ".org")
    )
    .map(([scheme, host, tld]) => `${scheme}${host || "example"}${tld}`);

/**
 * Arbitrary that yields either a value from the inner arbitrary or `undefined`,
 * mirroring optional (`field?:`) content fields.
 */
export const optional = <T>(arb: fc.Arbitrary<T>): fc.Arbitrary<T | undefined> =>
  fc.option(arb, { nil: undefined });

// ---- Shared content shapes ----

export interface SocialLinkGen {
  platform: string;
  url: string;
  iconAlt: string;
}
export const socialLinkArb = (): fc.Arbitrary<SocialLinkGen> =>
  fc.record({
    platform: nonBlankString(24),
    url: urlArb(),
    iconAlt: nonBlankString(40),
  });

export interface ImageRefGen {
  src: string;
  alt: string; // empty alt => decorative (Req 16.5)
}
export const imageRefArb = (): fc.Arbitrary<ImageRefGen> =>
  fc.record({
    src: nonBlankString(60).map((s) => s.replace(/\s+/g, "")),
    // alt may be empty (decorative) or descriptive.
    alt: fc.oneof(fc.constant(""), nonBlankString(80)),
  });

// ---- Hero ----

export interface HeroContentGen {
  eyebrow?: string;
  name?: string;
  role?: string;
  description?: string;
  portrait?: ImageRefGen;
  capabilityBadges: string[];
  socialLinks: SocialLinkGen[];
  cvFile?: string;
}
export const heroContentArb = (): fc.Arbitrary<HeroContentGen> =>
  fc.record({
    eyebrow: optional(nonBlankString(40)),
    name: optional(nonBlankString(40)),
    role: optional(nonBlankString(60)),
    description: optional(nonBlankString(200)),
    portrait: optional(imageRefArb()),
    capabilityBadges: fc.array(nonBlankString(30), { minLength: 0, maxLength: 6 }),
    socialLinks: fc.array(socialLinkArb(), { minLength: 0, maxLength: 8 }),
    cvFile: optional(nonBlankString(60).map((s) => s.replace(/\s+/g, ""))),
  });

// ---- About ----

export interface PersonalDetailsGen {
  name?: string;
  placeOfBirth?: string;
  phone?: string;
  education?: string;
}
export const personalDetailsArb = (): fc.Arbitrary<PersonalDetailsGen> =>
  fc.record({
    name: optional(nonBlankString(40)),
    placeOfBirth: optional(nonBlankString(40)),
    phone: optional(nonBlankString(24)),
    education: optional(nonBlankString(60)),
  });

export interface AboutContentGen {
  eyebrow?: string;
  heading?: string;
  portrait?: ImageRefGen;
  whoAmI?: string;
  myApproach?: string;
  personalDetails: PersonalDetailsGen;
}
export const aboutContentArb = (): fc.Arbitrary<AboutContentGen> =>
  fc.record({
    eyebrow: optional(nonBlankString(40)),
    heading: optional(nonBlankString(60)),
    portrait: optional(imageRefArb()),
    whoAmI: optional(nonBlankString(300)),
    myApproach: optional(nonBlankString(300)),
    personalDetails: personalDetailsArb(),
  });

// ---- Experience ----

export interface ExperienceEntryGen {
  id: string;
  year?: string;
  role?: string;
  company?: string;
  description?: string;
  techTags: string[];
}
export const experienceEntryArb = (): fc.Arbitrary<ExperienceEntryGen> =>
  fc.record({
    id: fc.uuid(),
    year: optional(nonBlankString(12)),
    role: optional(nonBlankString(60)),
    company: optional(nonBlankString(60)),
    description: optional(boundedString(0, 500)),
    techTags: fc.array(nonBlankString(20), { minLength: 0, maxLength: 10 }),
  });

// ---- Skills ----

export interface HardSkillCardGen {
  id: string;
  icon: string;
  title: string;
  description: string;
  skills: string[];
}
export const hardSkillCardArb = (): fc.Arbitrary<HardSkillCardGen> =>
  fc.record({
    id: fc.uuid(),
    icon: nonBlankString(20),
    title: nonBlankString(40),
    description: nonBlankString(120),
    // 0..15 so tests can exercise the "zero => card omitted" edge case.
    skills: fc.array(nonBlankString(24), { minLength: 0, maxLength: 15 }),
  });

export interface SoftSkillChipGen {
  id: string;
  label: string;
}
export const softSkillChipArb = (): fc.Arbitrary<SoftSkillChipGen> =>
  fc.record({
    id: fc.uuid(),
    label: nonBlankString(30),
  });

// ---- Projects ----

export interface ProjectGen {
  id: string;
  title: string;
  description: string;
  thumbnail: ImageRefGen;
  detailBody?: string;
  role?: string;
  stack?: string[];
  links?: SocialLinkGen[];
}
export const projectArb = (): fc.Arbitrary<ProjectGen> =>
  fc.record({
    id: fc.uuid(),
    title: nonBlankString(60),
    description: nonBlankString(200),
    thumbnail: imageRefArb(),
    detailBody: optional(nonBlankString(400)),
    role: optional(nonBlankString(40)),
    stack: optional(fc.array(nonBlankString(24), { minLength: 0, maxLength: 12 })),
    links: optional(fc.array(socialLinkArb(), { minLength: 0, maxLength: 6 })),
  });

// ---- Marquee ----

export interface MarqueeContentGen {
  text: string;
}
export const marqueeContentArb = (): fc.Arbitrary<MarqueeContentGen> =>
  fc.record({
    // Allow blank/whitespace text so "empty => no banner" can be exercised.
    text: fc.oneof(
      fc.constant(""),
      fc.constant("   "),
      boundedString(1, 200)
    ),
  });

// ---- Content_Store root ----

export interface SiteContentGen {
  hero: HeroContentGen;
  about: AboutContentGen;
  experience: ExperienceEntryGen[];
  marquee: MarqueeContentGen;
  hardSkills: HardSkillCardGen[];
  softSkills: SoftSkillChipGen[];
  projects: ProjectGen[];
  sectionHeadings: Record<string, { eyebrow?: string; heading?: string }>;
}
export const siteContentArb = (): fc.Arbitrary<SiteContentGen> =>
  fc.record({
    hero: heroContentArb(),
    about: aboutContentArb(),
    experience: fc.array(experienceEntryArb(), { minLength: 0, maxLength: 20 }),
    marquee: marqueeContentArb(),
    hardSkills: fc.array(hardSkillCardArb(), { minLength: 0, maxLength: 12 }),
    softSkills: fc.array(softSkillChipArb(), { minLength: 0, maxLength: 20 }),
    projects: fc.array(projectArb(), { minLength: 0, maxLength: 12 }),
    sectionHeadings: fc.dictionary(
      nonBlankString(20),
      fc.record({
        eyebrow: optional(nonBlankString(40)),
        heading: optional(nonBlankString(60)),
      })
    ),
  });
