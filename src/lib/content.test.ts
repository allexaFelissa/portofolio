import { describe, expect, it } from "vitest";
import fc from "fast-check";
import { filterHardSkillCards, filterValidExperience, getPresentPersonalDetails, getProjectsState } from "./content";

describe("content section properties", () => {
  // Feature: portfolio-website, Property 6: Personal Details omits absent fields in fixed order
  it("keeps present personal details in their fixed order", () => fc.assert(fc.property(fc.record({ name: fc.option(fc.string(), { nil: undefined }), placeOfBirth: fc.option(fc.string(), { nil: undefined }), phone: fc.option(fc.string(), { nil: undefined }), education: fc.option(fc.string(), { nil: undefined }) }), details => {
    const output = getPresentPersonalDetails(details); expect(output.map(item => item.key)).toEqual(["name","placeOfBirth","phone","education"].filter(key => details[key as keyof typeof details]?.trim()));
  }), { numRuns: 100 }));

  // Feature: portfolio-website, Property 7: Experience filters invalid entries
  it("keeps only experience with year, role, and company", () => fc.assert(fc.property(fc.array(fc.record({ id: fc.uuid(), year: fc.option(fc.string(), { nil: undefined }), role: fc.option(fc.string(), { nil: undefined }), company: fc.option(fc.string(), { nil: undefined }), description: fc.option(fc.string(), { nil: undefined }), techTags: fc.array(fc.string()) })), entries => {
    expect(filterValidExperience(entries).every(entry => [entry.year,entry.role,entry.company].every(value => value?.trim()))).toBe(true);
  }), { numRuns: 100 }));

  // Feature: portfolio-website, Property 8: Skills omits empty categories
  it("omits skill cards without pills", () => fc.assert(fc.property(fc.array(fc.record({ id: fc.uuid(), icon: fc.string(), title: fc.string(), description: fc.string(), skills: fc.array(fc.string()) })), cards => {
    expect(filterHardSkillCards(cards)).toEqual(cards.filter(card => card.skills.length > 0));
  }), { numRuns: 100 }));

  // Feature: portfolio-website, Property 9: Projects empty-state consistency
  it("reports the project empty state consistently", () => fc.assert(fc.property(fc.array(fc.record({ id: fc.uuid(), title: fc.string(), description: fc.string(), thumbnail: fc.record({ src: fc.string(), alt: fc.string() }) })), projects => {
    const state = getProjectsState(projects); expect(state.isEmpty).toBe(projects.length === 0); expect(state.projects).toEqual(projects);
  }), { numRuns: 100 }));
});
