# Implementation Plan: Portfolio Website

## Overview

This plan converts the approved design into incremental, test-driven coding steps. It builds bottom-up so every step compiles and is verifiable: scaffolding and theme tokens first, then typed content and knowledge base, then pure logic modules with their property-based tests, then shared UI primitives and hooks, then each section wired to the Content_Store (with edge-case/empty-state handling), then the AI assistant and modal, then the two Route Handlers with mocked-provider integration tests, then accessibility/responsive/reduced-motion passes, and finally deployment config plus wiring everything into `app/page.tsx` and `app/layout.tsx` with a verified production build.

Stack: Next.js (App Router) + React + TypeScript, Tailwind CSS, Framer Motion, deployed to Vercel free tier. Testing: Vitest + fast-check + React Testing Library + jest-axe. All 13 correctness properties from the design map to explicit property-based test sub-tasks (min 100 iterations, tagged `// Feature: portfolio-website, Property N: ...`).

Tasks marked with `*` are optional test sub-tasks and can be skipped for a faster MVP; core implementation sub-tasks are never optional.

## Tasks

- [x] 1. Scaffold project, theme tokens, fonts, and test harness
  - [x] 1.1 Initialize Next.js App Router + TypeScript project and directory structure
    - Create the Next.js App Router project with TypeScript strict mode; add `app/layout.tsx`, `app/page.tsx`, `app/globals.css` skeletons
    - Create the `src/components/{layout,sections,ai,ui}`, `src/content`, `src/lib/{ai,mail}`, `src/hooks`, and `public/` directories per the design's Project Structure
    - Configure path aliases (e.g. `@/`) in `tsconfig.json`
    - _Requirements: 14.1; Design: Project Structure_

  - [x] 1.2 Install and configure Tailwind CSS with the reference Design_Tokens
    - Install Tailwind and wire it into `app/globals.css`
    - Define theme tokens in `tailwind.config`: colors bg `#FFFFFF`, primary near-black `#111315`/`#111827`, pure black `#000000` accents, surface `#FAFAFB`, border `#ECEEF1`/`#E5E7EB`, muted `#6B7280`, body `#4B5563`, AI green `#22C55E`–`#4ADE80`
    - Define border-radius tokens: navbar pill, button (6–10px), card (10–24px), AI panel (14–20px), chat bubble (10–14px)
    - Define elevation shadow tokens (opacity 0.04–0.12, blur 8–24px): pill/card/badge shadows
    - Define light/dark theming via CSS variables driven by a root `class="dark"` / `data-theme` attribute
    - _Requirements: 18.1, 18.2, 18.3, 18.5, 10.6_

  - [x] 1.3 Configure Plus Jakarta Sans via next/font with Inter fallback and typography scale
    - Load "Plus Jakarta Sans" (weights 400–800) via `next/font` with "Inter" fallback in `app/layout.tsx`
    - Define typography utilities: headings 700–800, body 400–500, uppercase eyebrow 11px with 0.1em–0.2em letter-spacing
    - _Requirements: 18.4_

  - [x] 1.4 Set up the test harness (Vitest + fast-check + React Testing Library + jest-axe)
    - Configure Vitest with jsdom environment and a setup file registering `@testing-library/jest-dom` and `jest-axe`
    - Add `fast-check` and a shared arbitraries helper file for content generators
    - Add test scripts using single-run mode (no watch)
    - _Requirements: Design: Testing Strategy_

- [x] 2. Define content types, Content_Store, and Knowledge_Base
  - [x] 2.1 Define content interfaces in `src/content/types.ts`
    - Declare `SocialLink`, `ImageRef`, `HeroContent`, `PersonalDetails`, `AboutContent`, `ExperienceEntry`, `HardSkillCard`, `SoftSkillChip`, `Project`, `MarqueeContent`, `SiteContent`, and `KnowledgeBase` exactly as specified in the design Data Models
    - _Requirements: 14.1, 14.2; Design: Data Models_

  - [x] 2.2 Create the placeholder Content_Store in `src/content/site-content.ts`
    - Populate the typed `SiteContent` with the "Allexa" Data Analyst / Data Scientist profile: capability badges "Data Analytics", "Python • SQL • Power BI", "Machine Learning"; projects SIAGA, Shopee Sales Analytics, PayFlow HR; experience Software Engineer Intern, SASC Mentor, HIMTI Care Manager, S-Class Participant; personal details, about text, marquee tagline, hard/soft skills, section headings/eyebrows, social links, and a placeholder CV reference
    - Reference placeholder images/CV in `public/`
    - _Requirements: 14.2, 14.5, 3.1, 4.5, 5.3, 7.2, 7.3, 8.2, 6.1_

  - [x] 2.3 Create the Knowledge_Base in `src/content/knowledge-base.ts`
    - Export an owner-editable `KnowledgeBase` (`facts` grounding text) describing the Allexa placeholder profile; import it only from server code
    - _Requirements: 13.4, 13.5, 14.5_

- [x] 3. Implement pure logic modules with property-based tests
  - [x] 3.1 Implement `src/lib/validation.ts` (email + contact field validation + chat-input guard)
    - Implement `isValidEmail` (exactly one "@", non-empty local part, domain containing at least one dot)
    - Implement a field validator taking value + min/max that reports valid iff the value has ≥1 non-whitespace char and trimmed length is within inclusive bounds (Name 1–100, Subject 1–150, Email 1–254, Message 1–2000)
    - Implement a chat-input guard accepting a question iff it has 1–1000 non-whitespace-only characters
    - _Requirements: 9.2, 9.4, 9.5, 12.11, 13.6_

  - [x]* 3.2 Write property test for email validity predicate
    - **Property 1: Email validity predicate**
    - **Validates: Requirements 9.5**

  - [x]* 3.3 Write property test for contact field validation
    - **Property 2: Contact field validation**
    - **Validates: Requirements 9.2, 9.4**

  - [x]* 3.4 Write property test for chat-input guard
    - **Property 3: Chat-input guard**
    - **Validates: Requirements 12.11, 13.6**

  - [x] 3.5 Implement `src/lib/scroll-spy.ts` (active-section selection, pure)
    - Implement a selector taking per-section viewport-visibility ratios and returning at most one active section id, only for a section occupying ≥50% of viewport height
    - _Requirements: 2.4_

  - [x]* 3.6 Write property test for scroll-spy selection
    - **Property 11: Scroll-spy selects at most one section**
    - **Validates: Requirements 2.4**

  - [x] 3.7 Implement `src/lib/theme.ts` (theme resolution + persistence helpers)
    - Implement `resolveInitialTheme(persisted, osPreference)`: persisted valid theme wins, else OS preference when determinable, else light
    - Implement persistence read/write helpers that tolerate storage failure (apply for session, leave persisted value unchanged)
    - _Requirements: 10.2, 10.3, 10.4, 10.5_

  - [x]* 3.8 Write property test for theme resolution precedence
    - **Property 12: Theme resolution precedence**
    - **Validates: Requirements 10.2, 10.4, 10.5**

  - [x] 3.9 Implement content mapping helpers for section rendering (pure)
    - Add helpers used by sections: filter experience entries to those with year+role+company present; filter hard-skill cards to those with ≥1 pill; select present personal-detail fields in fixed order (Name, Place of Birth, Phone, Education); map social links one-to-one; determine marquee visibility from non-whitespace content; determine projects empty-state
    - _Requirements: 3.2, 3.7, 4.5, 4.6, 5.2, 5.7, 6.2, 7.7, 8.7_

  - [x] 3.10 Implement `src/lib/ai/prompt.ts` grounded-prompt builder (pure)
    - Build a system prompt that includes the complete Knowledge_Base text plus instructions to answer only from it and return a fixed "not available" message otherwise; never include any API key or server secret
    - _Requirements: 13.2, 13.3_

  - [x]* 3.11 Write property test for grounded-prompt construction
    - **Property 13: Grounded-prompt construction**
    - **Validates: Requirements 13.2, 13.3**

- [x] 4. Checkpoint - pure logic verified
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Implement shared UI primitives
  - [x] 5.1 Implement `Modal` primitive (backdrop blur, focus trap, Escape, focus restore)
    - Create `src/components/ui/Modal.tsx` with `open/onClose/labelledBy/variant` props; backdrop blur (not opaque black), `centered` and `bottom-sheet` variants, focus trap, Escape-to-close, and focus restoration to the trigger
    - _Requirements: 8.9, 8.10, 12.1, 12.9, 15.4_

  - [x]* 5.2 Write component tests for the Modal primitive
    - Opens/closes via control and Escape, traps focus, restores focus to trigger, applies backdrop blur
    - _Requirements: 8.9, 8.10, 12.1, 12.9_

  - [x] 5.3 Implement Button, Card, SectionHeading, Pill/Chip, StatusDot primitives
    - Button variants `primary|outline|ghost` with 2–8px hover lift and visible focus; Card with surface/hairline border/soft shadow + optional hover; SectionHeading (eyebrow + heading); Pill and Chip (dot + label); StatusDot (AI green)
    - _Requirements: 17.2, 16.4, 18.5, 18.4, 5.3, 7.2, 7.3, 12.2, 18.2_

  - [x] 5.4 Implement `ScrollReveal` primitive (IntersectionObserver, reduced-motion aware)
    - Apply fade/translate(≤24px)/scale(0.95–1.0) once per load; no-op rendering final static state under reduced motion
    - _Requirements: 17.1, 17.4_

- [x] 6. Implement hooks
  - [x] 6.1 Implement `useReducedMotion` and `useScrollReveal`
    - `useReducedMotion` reads `prefers-reduced-motion`; `useScrollReveal` wraps IntersectionObserver play-once logic used by ScrollReveal
    - _Requirements: 17.4, 4.7, 7.6_

  - [x] 6.2 Implement `useScrollSpy` and `useFocusTrap`
    - `useScrollSpy` observes section elements and feeds ratios into `lib/scroll-spy.ts` to expose the single active id; `useFocusTrap` powers the Modal primitive's focus trapping
    - _Requirements: 2.4, 12.9, 8.10_

  - [x] 6.3 Implement `useTheme` + `ThemeProvider`
    - Provide `theme/toggle/setTheme` context; initialize via `lib/theme.ts`, persist to localStorage, apply root `class="dark"`/`data-theme`, transition ≤500ms, fall back to `prefers-color-scheme` then light
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6_

  - [x]* 6.4 Write unit tests for theme toggle behavior
    - Toggle transition ≤500ms, localStorage persistence, and the persistence-failure session-only path
    - _Requirements: 10.1, 10.2, 10.3_

- [x] 7. Implement layout shell (LoadingScreen + FloatingNavbar + ThemeToggle)
  - [x] 7.1 Implement `LoadingScreen`
    - Render wordmark placeholder, "PORTFOLIO LOADING" label, animated underline, radial glow within 100ms; block scroll while visible; fade out (200–600ms) on ready or after 5s cap; static underline/glow under reduced motion; retry-capable error when content cannot load
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7_

  - [x]* 7.2 Write unit tests for LoadingScreen timing and states
    - Fade timing 200–600ms, 5s cap force-reveal, reduced-motion static state, error+retry path
    - _Requirements: 1.3, 1.5, 1.6, 1.7_

  - [x] 7.3 Implement `ThemeToggle` and `FloatingNavbar` (scroll-spy wired)
    - FloatingNavbar: fixed pill, "PORTFOLIO." logo, center links (Home, About, Experience, Projects, Contacts), ThemeToggle right; active link from `useScrollSpy`; hover style; smooth-scroll ≤1000ms; visible keyboard focus
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7_

  - [x]* 7.4 Write component tests for FloatingNavbar
    - Link click smooth-scrolls; scroll-spy applies active state to exactly one link; keyboard focus indicator visible
    - _Requirements: 2.3, 2.4, 2.5, 2.7_

- [x] 8. Implement Hero section
  - [x] 8.1 Implement `Hero` wired to Content_Store
    - Eyebrow, "Hi, I'm [Name]" heading, role subtitle, muted description (omit only missing elements, no empty placeholders); primary "Explore Work →" (smooth-scroll to Projects ≤1000ms) and outlined "Download CV ↓" (download CV or show "CV unavailable" without navigating); CONNECT social links (one per entry, none when empty); circular portrait; exactly three floating glass capability badges with staggered reveal 100–300ms apart; primary button hover state reverting within 300ms
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 3.10; Property 4, 5_

  - [x]* 8.2 Write property test for Hero present-fields rendering
    - **Property 4: Hero renders exactly its present fields**
    - **Validates: Requirements 3.2**

  - [x]* 8.3 Write property test for social links one-to-one mapping
    - **Property 5: Social links map one-to-one**
    - **Validates: Requirements 3.7**

  - [x]* 8.4 Write component tests for Hero buttons
    - Explore Work scrolls to Projects; Download CV triggers download or shows unavailable message
    - _Requirements: 3.4, 3.5, 3.6_

- [x] 9. Implement MarqueeBanner
  - [x] 9.1 Implement `MarqueeBanner`
    - Horizontally scrolling tagline (32–96px, ≤200 chars) at constant 20–120px/s seamless loop; render nothing with zero reserved height when empty; static full text under reduced motion
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

  - [x]* 9.2 Write property test for marquee visibility
    - **Property 10: Marquee visibility tracks content**
    - **Validates: Requirements 6.2**

- [ ] 10. Implement About section
  - [~] 10.1 Implement `About` wired to Content_Store
    - Eyebrow + centered heading (omit missing); portrait card left with `onError` placeholder fallback; "Who Am I"/"My Approach" text blocks right; Personal Details grid with fields in fixed order (Name, Place of Birth, Phone, Education), omitting absent fields; scroll-reveal once per load; static under reduced motion
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8; Property 6_

  - [ ]* 10.2 Write property test for Personal Details omission/order
    - **Property 6: Personal Details omits absent fields in fixed order**
    - **Validates: Requirements 4.5, 4.6**

- [ ] 11. Implement Experience timeline
  - [~] 11.1 Implement `Experience` wired to Content_Store
    - "experience" eyebrow + "What I've Done" heading; central vertical timeline, one marker per valid entry (1–20); alternating left/right cards ≥768px, single-column left-aligned <768px; each card year/role/company/description(≤500 chars)/0–10 tech pills; staggered reveal 100–200ms; omit entries missing year/role/company; empty list shows "no experience" message while keeping eyebrow/heading
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7; Property 7_

  - [ ]* 11.2 Write property test for experience filtering
    - **Property 7: Experience filters invalid entries**
    - **Validates: Requirements 5.2, 5.7**

- [ ] 12. Implement Skills section
  - [~] 12.1 Implement `Skills` wired to Content_Store
    - "SKILLS & TOOLS" eyebrow + "Skills & Expertise" heading; Hard Skills category cards (1–12; icon/title/description/1–15 pills) with 4–12px hover lift (100–300ms) returning on leave; Soft Skills chips (1–20; dot+label) with border-darken hover; reveal once when ≥20% visible; omit categories with zero pills; unavailable content shows placeholder while keeping eyebrow/heading
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7, 7.8; Property 8_

  - [ ]* 12.2 Write property test for skills empty-category omission
    - **Property 8: Skills omits empty categories**
    - **Validates: Requirements 7.7**

- [ ] 13. Implement Projects section + Project_Detail_Modal
  - [~] 13.1 Implement `Projects` wired to Content_Store
    - "PORTFOLIO" eyebrow + "Selected Works" heading; responsive grid (3-col ≥1024, 2-col 640–1023, 1-col <640); each card thumbnail(original colors)/title/description/"VIEW DETAILS"; "VIEW MORE PROJECT ↗" button; hover scales thumbnail 103–110%, lifts 4–12px, +≥8px shadow blur; thumbnail `onError` placeholder keeping title/description/button; zero projects → empty message, no cards and no VIEW MORE
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7, 8.8; Property 9_

  - [~] 13.2 Implement `Project_Detail_Modal` using the shared Modal primitive
    - VIEW DETAILS opens a centered modal (backdrop blur) showing title/description/details from Content_Store with a close control; close via control or Escape
    - _Requirements: 8.9, 8.10_

  - [ ]* 13.3 Write property test for projects empty-state consistency
    - **Property 9: Projects empty-state consistency**
    - **Validates: Requirements 8.7**

- [~] 14. Checkpoint - sections render from Content_Store
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 15. Implement Contact form (client)
  - [~] 15.1 Implement `Contact` section and form with validation states
    - "GET IN TOUCH" eyebrow, "Contact Me" heading, "Send an Email directly" card; labeled Name/Subject/Email/Message fields (all required) + full-width "SEND MESSAGE"; focus states; validation messages (empty/whitespace, invalid email) via `lib/validation.ts` blocking send; loading state disabling the button with 30s failure cap; success shows confirmation and clears fields; failure shows error, re-enables button, retains values
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7, 9.8, 16.3_

  - [ ]* 15.2 Write unit/component tests for Contact form behavior
    - Success clears fields; failure retains values; 30s timeout treated as failure; empty/invalid-email validation blocks send
    - _Requirements: 9.4, 9.5, 9.6, 9.7, 9.8_

- [ ] 16. Implement AI assistant (button + modal, client)
  - [~] 16.1 Implement `AiAssistantButton`
    - Near-black circular button (56–64px) with chat icon fixed bottom-right (16–24px margins) above all content; hover scale 105–115% within 300ms; visible keyboard focus (≥3:1, ≥2px); opens panel within 300ms or shows "assistant unavailable" error
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 11.6_

  - [~] 16.2 Implement `AiAssistantModal` using the shared Modal primitive
    - Centered modal (backdrop blur, not opaque) with header (green status dot, assistant name, close); initial assistant message within 1s; visitor bubbles dark/right + timestamp, assistant bubbles light/left + timestamp; three-dot typing indicator while generating; rounded input (1–2000 chars) + dark send; scrollable list; close transition 200–350ms; keyboard nav across input/send/close; reject empty/whitespace submissions retaining text; on failure remove indicator and show error assistant message while retaining visitor message; POSTs `{question, history}` to `/api/chat`
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.6, 12.7, 12.8, 12.9, 12.10, 12.11, 12.12_

  - [ ]* 16.3 Write unit/component tests for AI assistant interactions
    - Initial message within 1s; empty-input rejection retains text; failure path removes indicator and shows error while retaining visitor message
    - _Requirements: 12.3, 12.11, 12.12_

- [ ] 17. Implement server Route Handlers with provider abstractions
  - [~] 17.1 Implement `AiProvider` interface + `GeminiProvider` and `/api/chat` route
    - Define `AiProvider` in `src/lib/ai/`; implement `GeminiProvider` reading `GEMINI_API_KEY` server-side only; `app/api/chat/route.ts` validates question length (1–1000), builds grounded prompt from Knowledge_Base via `lib/ai/prompt.ts`, calls `AiProvider.generate`, returns `{answer, grounded}`; on failure returns controlled error; enforces honeypot + per-IP throttle
    - _Requirements: 13.1, 13.2, 13.3, 13.5, 13.6, 12.12_

  - [ ]* 17.2 Write integration tests for `/api/chat` (mocked AiProvider)
    - Grounded prompt built from Knowledge_Base; unanswerable returns fixed "not available"; provider failure yields controlled error; over-length/empty rejected
    - _Requirements: 13.1, 13.2, 13.3, 13.6, 12.12_

  - [~] 17.3 Implement `MailProvider` interface + provider impl and `/api/contact` route
    - Define `MailProvider` in `src/lib/mail/`; implement provider reading `MAIL_API_KEY` server-side only; `app/api/contact/route.ts` applies honeypot + per-IP throttle, server-side validation mirroring the client, then `MailProvider.send`, returning success/failure
    - _Requirements: 9.2, 9.4, 9.5, 9.7, 9.8_

  - [ ]* 17.4 Write integration tests for `/api/contact` (mocked MailProvider)
    - Server-side validation, honeypot rejection, per-IP throttle, success/failure responses
    - _Requirements: 9.2, 9.4, 9.5, 9.7, 9.8_

- [~] 18. Checkpoint - full feature behavior verified
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 19. Accessibility, responsive, and reduced-motion passes
  - [~] 19.1 Apply semantic structure, focus indicators, and image alt handling site-wide
    - Single `<h1>` with no skipped heading levels; semantic landmarks; visible focus indicators ≥3:1 and ≥2px; descriptive alt for content images and empty alt for decorative images; body-text contrast ≥4.5:1 via tokens
    - _Requirements: 16.1, 16.2, 16.3, 16.4, 16.5, 16.6_

  - [ ]* 19.2 Write accessibility tests (jest-axe)
    - Heading hierarchy, form labels, roles; focus-indicator contrast (≥3:1) and body-text contrast (≥4.5:1) against Design_Tokens
    - _Requirements: 16.1, 16.3, 16.4, 16.6_

  - [~] 19.3 Implement responsive breakpoints and reduced-motion final-state rendering
    - Desktop ≥1024, tablet 768–1023, mobile 320–767: Hero single column, Projects single column, Skills wrap, Experience timeline left-aligned, AI panel bottom-sheet ≥90% viewport height on mobile; breakpoint transitions apply within 500ms without losing scroll position; disable ScrollReveal/marquee/hover motion under reduced motion, rendering final static state
    - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5, 17.4, 17.5, 4.8, 6.4, 1.5_

  - [ ]* 19.4 Write responsive and reduced-motion tests
    - Viewport snapshots for the three breakpoint ranges incl. AI bottom-sheet on mobile; reduced-motion renders ScrollReveal/marquee in final static state
    - _Requirements: 15.1, 15.2, 15.3, 15.4, 1.5, 4.8, 6.4, 17.4_

- [ ] 20. Deployment config and env var documentation
  - [~] 20.1 Add deployment config files and env var documentation
    - Add `vercel.json` (if needed), a `.env.example` documenting server-only `GEMINI_API_KEY` and `MAIL_API_KEY` (and provider config such as a Resend "from" address), and README/notes documenting the required Vercel environment variables; ensure no key is prefixed with `NEXT_PUBLIC_` or referenced from client code
    - _Requirements: 13.4; Design: Deployment & Free-Tier Strategy, Security_

- [ ] 21. Final integration - wire the page and verify production build
  - [~] 21.1 Compose `app/page.tsx` and `app/layout.tsx` and verify the production build
    - Wire `ThemeProvider` + fonts + metadata in `app/layout.tsx`; compose LoadingScreen, FloatingNavbar, Hero, MarqueeBanner, About, Experience, Skills, Projects, Contact, and AiAssistantButton in `app/page.tsx`, all sourced from the Content_Store; ensure per-section placeholder indicator for any missing Content_Store entry without breaking other sections; run the production build and fix any errors
    - _Requirements: 14.1, 14.2, 14.3, 14.4; Design: Component Hierarchy_

  - [ ]* 21.2 Run the full test suite and confirm all property, unit, component, integration, and a11y tests pass
    - Execute the complete Vitest suite in single-run mode
    - _Requirements: Design: Testing Strategy_

## Notes

- Tasks marked with `*` are optional test sub-tasks and can be skipped for a faster MVP; core implementation sub-tasks are never optional.
- Each task references specific requirement clauses and/or design properties for traceability.
- Checkpoints ensure incremental validation at logical breaks.
- Property-based tests (fast-check, min 100 iterations, tagged `// Feature: portfolio-website, Property N: ...`) validate the 13 universal correctness properties; unit/component/integration tests cover examples, interactions, and mocked external boundaries.
- No deployment/ops tasks requiring manual action are included; task 20 only adds config files and documents the required environment variables.

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["1.2", "1.3", "1.4"] },
    { "id": 2, "tasks": ["2.1"] },
    { "id": 3, "tasks": ["2.2", "2.3"] },
    { "id": 4, "tasks": ["3.1", "3.5", "3.7", "3.9", "3.10"] },
    { "id": 5, "tasks": ["3.2", "3.3", "3.4", "3.6", "3.8", "3.11"] },
    { "id": 6, "tasks": ["5.1", "5.3", "5.4"] },
    { "id": 7, "tasks": ["5.2", "6.1", "6.2", "6.3"] },
    { "id": 8, "tasks": ["6.4", "7.1", "7.3"] },
    { "id": 9, "tasks": ["7.2", "7.4", "8.1", "9.1", "10.1", "11.1", "12.1"] },
    { "id": 10, "tasks": ["8.2", "8.3", "8.4", "9.2", "10.2", "11.2", "12.2", "13.1"] },
    { "id": 11, "tasks": ["13.2", "13.3", "15.1", "16.1"] },
    { "id": 12, "tasks": ["15.2", "16.2", "17.1", "17.3"] },
    { "id": 13, "tasks": ["16.3", "17.2", "17.4"] },
    { "id": 14, "tasks": ["19.1", "19.3", "20.1"] },
    { "id": 15, "tasks": ["19.2", "19.4"] },
    { "id": 16, "tasks": ["21.1"] },
    { "id": 17, "tasks": ["21.2"] }
  ]
}
```
