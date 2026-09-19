# Requirements Document

## Introduction

This document specifies the requirements for a single-page portfolio website that recreates a provided reference design exactly. The site presents a personal/professional portfolio with a branded loading intro, floating pill navigation, hero section, about section, work-experience timeline, tech-stack showcase, projects gallery, and contact form. A persistent floating AI assistant lets visitors (primarily recruiters) ask questions about the portfolio owner, answering only from an owner-controlled, editable knowledge base.

For this phase, all textual content and imagery are dummy placeholders structured for easy replacement later. The visual and interaction design must match the reference (minimalist white/near-white background, dark navy/black text, subtle gray borders and soft shadows, rounded UI, restrained micro-interactions and scroll reveals). The reference identity and reference projects are placeholders only; no real person's identity is copied.

## Glossary

- **Portfolio_Site**: The complete single-page portfolio web application, including all sections, navigation, and the AI assistant.
- **Loading_Screen**: The branded intro screen shown on initial load before the hero appears.
- **Navbar**: The floating pill-shaped navigation bar with logo, section links, and theme toggle.
- **Hero_Section**: The top viewport section containing the introduction heading, buttons, social links, portrait, and floating stat cards.
- **About_Section**: The section presenting the owner's bio, approach, and personal details.
- **Experience_Section**: The work-experience section with a vertical timeline and experience cards.
- **Marquee_Banner**: The large horizontally scrolling text band shown between sections.
- **Tech_Stack_Section**: The section listing frontend and backend technologies as icon cards.
- **Projects_Section**: The section presenting selected project cards and a view-more control.
- **Contact_Section**: The section containing the contact form.
- **Contact_Form**: The form within the Contact_Section used to send a message.
- **Theme_Controller**: The component managing light and dark theme state and persistence.
- **AI_Assistant**: The chat feature answering visitor questions about the owner.
- **AI_Assistant_Button**: The persistent floating circular button that opens the AI_Assistant.
- **AI_Assistant_Panel**: The chat panel UI shown when the AI_Assistant is open.
- **Knowledge_Base**: The owner-editable data source containing verified facts the AI_Assistant may use to answer questions.
- **Content_Store**: The editable data source containing all placeholder text and image references rendered across the Portfolio_Site sections.
- **Scroll_Reveal**: The scroll-triggered entrance animation applied to elements as they enter the viewport.
- **Design_Tokens**: The centralized set of color, spacing, radius, and typography values defining the visual system.
- **Visitor**: Any person viewing the Portfolio_Site.
- **Owner**: The person who controls the site content and Knowledge_Base.
- **Reduced_Motion_Preference**: The operating-system or browser setting indicating the Visitor prefers reduced motion.

## Requirements

### Requirement 1: Branded Loading Screen

**User Story:** As a Visitor, I want a branded intro screen while the site loads, so that I get a polished first impression instead of a blank page or generic spinner.

#### Acceptance Criteria

1. WHEN the Portfolio_Site is first loaded, THE Loading_Screen SHALL display a wordmark placeholder, a "PORTFOLIO LOADING" label, an animated underline, and a radial glow background within 100 milliseconds of the initial request, before any Hero_Section content is visible.
2. THE Loading_Screen SHALL NOT display a rotating, oscillating, or indeterminate progress spinner control.
3. WHEN loading completes, THE Loading_Screen SHALL fade out to full transparency and reveal the fully visible Hero_Section within a transition duration between 200 and 600 milliseconds inclusive.
4. WHILE the Loading_Screen is visible, THE Portfolio_Site SHALL prevent vertical and horizontal scrolling of underlying content, such that scroll input produces zero pixels of movement.
5. WHERE the Reduced_Motion_Preference is enabled, THE Loading_Screen SHALL display a static underline and a static glow with zero animation frames in place of the animated underline and radial glow.
6. IF the Loading_Screen remains visible for 5 seconds after the initial request, THEN THE Portfolio_Site SHALL reveal the fully visible Hero_Section within the transition duration between 200 and 600 milliseconds inclusive, regardless of remaining load activity.
7. IF loading fails such that Hero_Section content cannot be retrieved, THEN THE Portfolio_Site SHALL dismiss the Loading_Screen and display an error indication stating that content could not be loaded, while preserving the option to retry.

### Requirement 2: Floating Pill Navigation

**User Story:** As a Visitor, I want a persistent floating navigation bar, so that I can move between sections easily.

#### Acceptance Criteria

1. THE Navbar SHALL display a "PORTFOLIO." logo on the left, section links (Home, About, Experience, Projects, Contacts) in the center, and a theme toggle control on the right.
2. WHILE the Visitor scrolls the page, THE Navbar SHALL remain fixed to the top of the viewport with no change to its position or size.
3. WHEN a Visitor selects a section link, THE Navbar SHALL smooth-scroll the viewport to the corresponding section, completing the scroll within 1000 milliseconds.
4. WHILE a section occupies at least 50 percent of the viewport height, THE Navbar SHALL apply an active-state highlight to the corresponding section link and remove the active-state highlight from all other section links.
5. WHEN a Visitor hovers over a section link, THE Navbar SHALL apply a hover style that changes the link's visual appearance in a manner distinct from its default and active states.
6. THE Navbar SHALL render with a pill shape using a border radius token designated for the Navbar.
7. WHEN a Visitor focuses a Navbar control using a keyboard, THE Navbar SHALL display a visible focus indicator on that control that is distinct from the control's unfocused appearance.

### Requirement 3: Hero Section

**User Story:** As a Visitor, I want an introductory hero section, so that I immediately understand who the owner is and what actions I can take.

#### Acceptance Criteria

1. WHEN the Hero_Section loads, THE Hero_Section SHALL display an eyebrow label, a heading of the form "Hi, I'm [Name]", a role subtitle, and a muted description paragraph sourced from the Content_Store.
2. IF any of the eyebrow label, heading name, role subtitle, or description paragraph is missing from the Content_Store, THEN THE Hero_Section SHALL omit only the missing element and render all available elements without displaying empty placeholders or raw template text.
3. THE Hero_Section SHALL display a primary "Explore Work →" button and an outlined "Download CV ↓" button.
4. WHEN a Visitor selects the "Explore Work →" button, THE Hero_Section SHALL smooth-scroll the viewport so that the top of the Projects_Section is aligned within the visible viewport within 1000 milliseconds.
5. WHEN a Visitor selects the "Download CV ↓" button, THE Hero_Section SHALL initiate a download of the CV file sourced from the Content_Store.
6. IF the CV file is unavailable in the Content_Store when a Visitor selects the "Download CV ↓" button, THEN THE Hero_Section SHALL display an error indication that the CV is unavailable and SHALL remain on the current view without navigating away.
7. THE Hero_Section SHALL display a "CONNECT" group of social icon links sourced from the Content_Store, rendering one link per entry provided and displaying no icons when zero entries are provided.
8. THE Hero_Section SHALL display a circular portrait image sourced from the Content_Store.
9. THE Hero_Section SHALL display exactly three floating glass capability cards that enter with a staggered Scroll_Reveal, where each successive card begins its reveal 100 to 300 milliseconds after the previous card.
10. WHEN a Visitor hovers the pointer over the primary "Explore Work →" button, THE Hero_Section SHALL apply a hover style that changes the button's visual appearance from its default state, and SHALL revert to the default state within 300 milliseconds after the pointer leaves the button.

### Requirement 4: About Section

**User Story:** As a Visitor, I want an about section, so that I can learn background details about the owner.

#### Acceptance Criteria

1. WHEN the About_Section loads, THE About_Section SHALL display an eyebrow label and a centered heading sourced from the Content_Store.
2. IF the eyebrow label or heading is missing from the Content_Store, THEN THE About_Section SHALL omit only the missing element and render the remaining available elements.
3. THE About_Section SHALL display a portrait image card on the left and two text blocks labeled "Who Am I" and "My Approach" on the right, sourced from the Content_Store.
4. IF the portrait image fails to load, THEN THE About_Section SHALL display a placeholder image in its position and continue rendering the text blocks and personal details.
5. THE About_Section SHALL display a "Personal Details" information grid containing exactly five labeled fields in the order Name, Position, Email, Phone, Location, sourced from the Content_Store.
6. IF a Personal Details field value is missing from the Content_Store, THEN THE About_Section SHALL omit that field from the grid and render the remaining available fields.
7. WHEN the top edge of the About_Section scrolls to within the visible viewport bounds, THE About_Section SHALL play a Scroll_Reveal entrance animation that starts within 100 milliseconds and completes within 1000 milliseconds, playing only once per page load.
8. WHERE the Reduced_Motion_Preference is enabled, THE About_Section SHALL render its content in the final static state without the Scroll_Reveal animation.

### Requirement 5: Work Experience Timeline

**User Story:** As a Visitor, I want a work-experience timeline, so that I can review the owner's career history.

#### Acceptance Criteria

1. THE Experience_Section SHALL display a "CAREER PATH" eyebrow label and a "Work Experience" heading.
2. WHILE at least one experience entry exists in the Content_Store, THE Experience_Section SHALL display a central vertical timeline with one circular marker per experience entry, supporting 1 to 20 entries.
3. WHEN rendering experience entries on viewports 768 pixels wide or wider, THE Experience_Section SHALL display experience cards in an alternating left/right layout, each containing a year, role, company, a description of up to 500 characters, and 0 to 10 technology pill tags sourced from the Content_Store.
4. WHILE rendering on viewports narrower than 768 pixels, THE Experience_Section SHALL display all experience cards in a single-column layout aligned to one side of the timeline.
5. WHEN an experience card enters the viewport, THE Experience_Section SHALL play a Scroll_Reveal for that card, staggering each card's reveal by 100 to 200 milliseconds relative to the previous card.
6. IF the Content_Store returns no experience entries, THEN THE Experience_Section SHALL hide the timeline and display a message indicating no experience entries are available, while still showing the eyebrow label and heading.
7. IF a required field (year, role, or company) is missing for an experience entry, THEN THE Experience_Section SHALL omit that entry from the timeline and render the remaining valid entries.

### Requirement 6: Marquee Banner

**User Story:** As a Visitor, I want a scrolling text banner between sections, so that the layout feels dynamic and reinforces the owner's tagline.

#### Acceptance Criteria

1. THE Marquee_Banner SHALL display a horizontally scrolling text string sourced from the Content_Store with a font size between 32 and 96 pixels and a maximum length of 200 characters.
2. IF the Content_Store returns no text string or an empty string for the Marquee_Banner, THEN THE Marquee_Banner SHALL render no visible banner and SHALL reserve zero vertical layout height.
3. WHILE the Marquee_Banner is visible AND the Reduced_Motion_Preference is disabled, THE Marquee_Banner SHALL continuously translate the text horizontally at a constant speed between 20 and 120 pixels per second in a seamless loop with no visible gap or blank space at the wrap point.
4. WHERE the Reduced_Motion_Preference is enabled, THE Marquee_Banner SHALL display the complete text string statically without horizontal scrolling motion.
5. IF the text string length exceeds the visible viewport width, THEN THE Marquee_Banner SHALL truncate the visible display to the viewport width without altering the scrolling loop content.

### Requirement 7: Tech Stack Section

**User Story:** As a Visitor, I want a tech-stack showcase, so that I can see the technologies the owner uses.

#### Acceptance Criteria

1. THE Tech_Stack_Section SHALL display a "SKILLS & TOOLS" eyebrow label and a "My Tech Stack" heading.
2. THE Tech_Stack_Section SHALL display a "Frontend" category and a "Backend" category, each containing between 1 and 30 technology icon cards sourced from the Content_Store.
3. WHEN a Visitor's pointer enters a technology icon card, THE Tech_Stack_Section SHALL translate that card upward by 4 to 12 pixels over a transition of 100 to 300 milliseconds, and SHALL return the card to its original position within 100 to 300 milliseconds when the pointer leaves the card.
4. WHEN at least 20 percent of the Tech_Stack_Section enters the viewport, THE Tech_Stack_Section SHALL play a Scroll_Reveal entrance animation with a duration between 200 and 1000 milliseconds, and SHALL play the entrance animation only once per page load.
5. IF a category in the Content_Store contains zero technology icon cards, THEN THE Tech_Stack_Section SHALL omit that category from display without rendering an empty category container.
6. IF the Content_Store is unavailable when the Tech_Stack_Section renders, THEN THE Tech_Stack_Section SHALL display a placeholder state indicating the tech stack content could not be loaded, and SHALL preserve the eyebrow label and heading.

### Requirement 8: Projects Section

**User Story:** As a Visitor, I want a projects gallery, so that I can review the owner's selected works.

#### Acceptance Criteria

1. THE Projects_Section SHALL display a "PORTFOLIO" eyebrow label and a "Selected Works" heading.
2. WHILE the viewport width is 1024 pixels or greater, THE Projects_Section SHALL display project cards from the Content_Store in a three-column layout, each card containing a thumbnail, title, description, and a "VIEW DETAILS" button.
3. WHILE the viewport width is between 640 pixels and 1023 pixels, THE Projects_Section SHALL display the project cards in a two-column layout, and WHILE the viewport width is below 640 pixels, THE Projects_Section SHALL display the project cards in a single-column layout.
4. THE Projects_Section SHALL display a "VIEW MORE PROJECT ↗" button.
5. WHEN a Visitor hovers over a project card, THE Projects_Section SHALL, within 300 milliseconds, scale that card's thumbnail to between 103% and 110% of its original size, translate the card upward by 4 to 12 pixels, and increase the card's shadow blur radius by at least 8 pixels relative to its non-hovered state.
6. THE Projects_Section SHALL render project thumbnail images in their original colors without applying a monochrome filter.
7. IF the Content_Store returns zero projects, THEN THE Projects_Section SHALL display an empty-state message indicating that no projects are available and SHALL NOT render any project cards or the "VIEW MORE PROJECT ↗" button.
8. IF a project thumbnail image fails to load, THEN THE Projects_Section SHALL display a placeholder image in that thumbnail's position and SHALL continue to display the card's title, description, and "VIEW DETAILS" button.

### Requirement 9: Contact Form

**User Story:** As a Visitor, I want a contact form, so that I can send the owner a message directly.

#### Acceptance Criteria

1. THE Contact_Section SHALL display a "GET IN TOUCH" eyebrow label, a "Contact Me" heading, and a centered form card labeled "Send an Email directly."
2. THE Contact_Form SHALL display labeled Name (1 to 100 characters), Subject (1 to 150 characters), Email (1 to 254 characters), and Message (1 to 2000 characters) fields and a full-width "SEND MESSAGE" button, with all four fields required.
3. WHEN a Visitor focuses a Contact_Form field, THE Contact_Form SHALL display a focus state on that field that is visually distinct from its unfocused state.
4. WHEN a Visitor submits the Contact_Form with a required field that is empty or contains only whitespace, THE Contact_Form SHALL display a validation message identifying the empty field and SHALL NOT send the message.
5. WHEN a Visitor submits the Contact_Form with an Email value that does not contain a single "@" separating a non-empty local part and a domain part containing at least one dot, THE Contact_Form SHALL display a validation message for the Email field and SHALL NOT send the message.
6. WHILE the Contact_Form submission is in progress, THE Contact_Form SHALL display a loading state and disable the "SEND MESSAGE" button, and IF the submission does not complete within 30 seconds, THEN THE Contact_Form SHALL treat the submission as failed.
7. WHEN a Contact_Form submission succeeds, THE Contact_Form SHALL display a success confirmation message and clear the entered field values.
8. IF a Contact_Form submission fails, THEN THE Contact_Form SHALL display an error message, re-enable the "SEND MESSAGE" button, and retain the entered field values.

### Requirement 10: Theme Toggle

**User Story:** As a Visitor, I want to switch between light and dark themes, so that I can view the site in my preferred appearance.

#### Acceptance Criteria

1. WHEN a Visitor selects the theme toggle control, THE Theme_Controller SHALL switch the Portfolio_Site between light theme and dark theme and complete the visible transition within 500 milliseconds.
2. THE Theme_Controller SHALL persist the selected theme across page reloads and across new browser sessions on the same browser.
3. IF a Visitor selects the theme toggle control and the selected theme cannot be persisted, THEN THE Theme_Controller SHALL apply the selected theme for the current session and retain the previously persisted theme value unchanged.
4. WHEN the Portfolio_Site is first loaded and no theme has been persisted, THE Theme_Controller SHALL apply the theme matching the Visitor's operating-system color-scheme preference.
5. IF the Portfolio_Site is first loaded, no theme has been persisted, and the Visitor's operating-system color-scheme preference cannot be determined, THEN THE Theme_Controller SHALL apply the light theme as the default.
6. WHEN the theme changes, THE Portfolio_Site SHALL apply the corresponding Design_Tokens to every section of the Portfolio_Site with zero sections retaining the prior theme's Design_Tokens.

### Requirement 11: AI Assistant Button

**User Story:** As a Visitor, I want a persistent chat button, so that I can open the AI assistant at any time.

#### Acceptance Criteria

1. THE AI_Assistant_Button SHALL display as a dark navy circular button, 56 to 64 pixels in diameter, containing a chat icon, positioned in the bottom-right of the viewport with a margin of 16 to 24 pixels from the bottom and right edges.
2. THE AI_Assistant_Button SHALL remain fixed in the bottom-right of the viewport and rendered above all other page content at all scroll positions.
3. WHEN a Visitor hovers over the AI_Assistant_Button, THE AI_Assistant_Button SHALL scale to between 105% and 115% of its default size within 300 milliseconds.
4. WHEN a Visitor selects the AI_Assistant_Button, THE AI_Assistant SHALL open the AI_Assistant_Panel within 300 milliseconds.
5. WHEN a Visitor focuses the AI_Assistant_Button using a keyboard, THE AI_Assistant_Button SHALL display a visible focus indicator with a minimum contrast ratio of 3:1 against adjacent colors and a minimum thickness of 2 pixels.
6. IF the AI_Assistant_Panel fails to open within 300 milliseconds of the AI_Assistant_Button being selected, THEN THE AI_Assistant SHALL display an error message indicating the assistant is unavailable and retain the AI_Assistant_Button in its default state.

### Requirement 12: AI Assistant Panel

**User Story:** As a Visitor, I want a chat panel, so that I can converse with the AI assistant about the owner.

#### Acceptance Criteria

1. WHEN the AI_Assistant_Panel opens, THE AI_Assistant_Panel SHALL apply a backdrop blur behind the panel without applying a fully opaque black overlay.
2. THE AI_Assistant_Panel SHALL display a header containing a green online status dot, the assistant name, and a close control.
3. WHEN the AI_Assistant_Panel opens, THE AI_Assistant_Panel SHALL display an initial assistant message within 1 second of the panel becoming visible.
4. THE AI_Assistant_Panel SHALL display Visitor messages as dark navy bubbles aligned to the right, each with a timestamp, and assistant messages as light bubbles aligned to the left, each with a timestamp.
5. WHILE the AI_Assistant is generating a response, THE AI_Assistant_Panel SHALL display a three-dot typing indicator and SHALL remove the indicator when the response is displayed or a failure is indicated.
6. THE AI_Assistant_Panel SHALL display a composer containing a rounded text input that accepts between 1 and 2000 characters and a dark send control.
7. WHEN the message list exceeds the visible area, THE AI_Assistant_Panel SHALL make the message list scrollable.
8. WHEN a Visitor selects the close control, THE AI_Assistant SHALL close the AI_Assistant_Panel with a transition duration between 200 and 350 milliseconds.
9. WHILE the AI_Assistant_Panel is open, THE AI_Assistant_Panel SHALL support keyboard navigation across the input, send control, and close control.
10. WHEN a Visitor selects the send control with a text input containing at least 1 non-whitespace character, THE AI_Assistant_Panel SHALL display the submitted text as a Visitor message, clear the text input, and request a response from the AI_Assistant.
11. IF a Visitor selects the send control while the text input is empty or contains only whitespace, THEN THE AI_Assistant_Panel SHALL reject the submission, retain any text input content, and add no new message to the message list.
12. IF the AI_Assistant fails to produce a response after a request, THEN THE AI_Assistant_Panel SHALL remove the typing indicator and display an assistant message indicating the response could not be generated, while retaining the previously submitted Visitor message in the message list.

### Requirement 13: AI Assistant Grounded Responses

**User Story:** As an Owner, I want the AI assistant to answer only from a knowledge base I control, so that it never invents facts about me.

#### Acceptance Criteria

1. WHEN a Visitor submits a question of 1 to 1,000 characters, THE AI_Assistant SHALL generate a response using only facts contained in the Knowledge_Base and SHALL return that response within 10 seconds.
2. IF a Visitor's question cannot be answered from the Knowledge_Base, THEN THE AI_Assistant SHALL return a message indicating that the information is not available and SHALL NOT include any factual claim absent from the Knowledge_Base.
3. THE AI_Assistant SHALL NOT state any qualification, project, employer, award, or metric that is absent from the Knowledge_Base.
4. THE Knowledge_Base SHALL be stored in an editable data source that the Owner can update without modifying application code.
5. WHEN the Owner updates the Knowledge_Base, THE AI_Assistant SHALL use the updated facts for every response generated after the update completes.
6. IF a Visitor submits a question that is empty or exceeds 1,000 characters, THEN THE AI_Assistant SHALL reject the question and return a message indicating the allowed length range while preserving the existing Knowledge_Base unchanged.

### Requirement 14: Editable Placeholder Content

**User Story:** As an Owner, I want all site content stored as replaceable placeholders, so that I can swap in real content later without rebuilding the site.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL source all section text and image references from the Content_Store, with no section text or image reference hardcoded in component code.
2. THE Content_Store SHALL contain placeholder text and placeholder image references for every section rendered by the Portfolio_Site, such that no rendered section resolves its content from a source other than the Content_Store.
3. WHEN the Content_Store is updated and the Portfolio_Site is reloaded, THE Portfolio_Site SHALL render the updated text and image references while producing identical layout structure and component code to the pre-update state.
4. IF a section referenced by the Portfolio_Site has no corresponding entry in the Content_Store, THEN THE Portfolio_Site SHALL render a visible placeholder indicator for that section and SHALL continue rendering all remaining sections without failure.
5. THE Content_Store SHALL NOT contain the reference person's real name, contact details, or biographical identity information, containing only non-identifying placeholder values.

### Requirement 15: Responsive Layout

**User Story:** As a Visitor on any device, I want the layout to adapt to my screen, so that the site is usable on desktop, tablet, and mobile.

#### Acceptance Criteria

1. WHERE the viewport width is 1024 pixels or greater, THE Portfolio_Site SHALL render the layout composition matching the reference design without horizontal scrolling.
2. WHERE the viewport width is from 768 pixels to 1023 pixels, THE Portfolio_Site SHALL adapt each section to fit within the available width without horizontal scrolling and without content overflowing its container.
3. WHERE the viewport width is from 320 pixels to 767 pixels, THE Hero_Section SHALL stack its content vertically in a single column, THE Projects_Section SHALL render project cards in a single column, THE Tech_Stack_Section SHALL wrap technology cards so that no card overflows the viewport width, and THE Experience_Section SHALL render the timeline left-aligned.
4. WHERE the viewport width is from 320 pixels to 767 pixels, THE AI_Assistant_Panel SHALL render as a bottom-sheet or modal occupying at least 90 percent of the viewport height.
5. IF the viewport width transitions across a breakpoint boundary at 768 pixels or 1024 pixels, THEN THE Portfolio_Site SHALL apply the layout for the new viewport range within 500 milliseconds without loss of the visitor's current scroll position.

### Requirement 16: Accessibility

**User Story:** As a Visitor using assistive technology or a keyboard, I want the site to be accessible, so that I can navigate and use it.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL use a semantic heading hierarchy with a single top-level heading and no skipped heading levels across all sections.
2. THE Navbar and AI_Assistant SHALL be fully operable using keyboard navigation, including opening and closing the AI_Assistant and closing it with the Escape key.
3. THE Contact_Form SHALL programmatically associate a text label with each input field.
4. WHEN a Visitor focuses any interactive control using a keyboard, THE Portfolio_Site SHALL display a visible focus indicator on that control with a minimum contrast ratio of 3:1 against adjacent colors.
5. THE Portfolio_Site SHALL provide descriptive alternative text for every content image and an empty alternative text attribute for every decorative image.
6. THE Design_Tokens SHALL define text and background color pairings that meet a contrast ratio of at least 4.5 to 1 for body text.

### Requirement 17: Animation Philosophy

**User Story:** As a Visitor, I want restrained, tasteful animations, so that the experience feels polished rather than distracting.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL limit entrance animations to fade (opacity 0 to 1), translate (maximum 24 pixels displacement), stagger (delay between 50 and 150 milliseconds per item), and scale (between 0.95 and 1.0), with each entrance animation completing within 600 milliseconds.
2. WHEN a Visitor hovers over an interactive card or button, THE Portfolio_Site SHALL apply a hover lift effect that translates the element upward by 2 to 8 pixels within 300 milliseconds.
3. WHEN a Visitor moves the pointer away from a hovered interactive card or button, THE Portfolio_Site SHALL return the element to its resting position within 300 milliseconds.
4. WHERE the Reduced_Motion_Preference is enabled, THE Portfolio_Site SHALL disable Scroll_Reveal and marquee motion and render all affected content in its final static state at full opacity and final position with zero animation duration.
5. THE Portfolio_Site SHALL NOT use bouncing, spinning (rotation), parallax exceeding 24 pixels of differential movement, or 3D transform animations.

### Requirement 18: Visual Design System

**User Story:** As an Owner, I want a centralized design system, so that the site matches the reference palette and styling consistently.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL define Design_Tokens for background (#FFFFFF), primary dark/navy (#0B1220–#111827), body text (#4B5563), muted text (#6B7280), border (#E5E7EB), and light surface (#F8FAFC).
2. THE Design_Tokens SHALL define an AI online status indicator color of bright green (#22C55E–#4ADE80).
3. THE Design_Tokens SHALL define border-radius values for the Navbar pill, buttons (6–10px), cards (10–16px), the AI_Assistant_Panel (14–20px), and chat bubbles (10–14px).
4. THE Portfolio_Site SHALL apply a geometric sans-serif typeface with headings at font-weight 700, body text at font-weight 500, and uppercase eyebrow labels at font-size 11–13px with letter-spacing 0.05em–0.1em.
5. WHEN a surface is elevated above the base background, THE Portfolio_Site SHALL apply a shadow with opacity between 0.04 and 0.12 and blur radius between 8px and 24px.
