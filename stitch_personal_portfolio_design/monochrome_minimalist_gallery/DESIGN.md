---
name: Monochrome Minimalist Gallery
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#45464d'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#505f76'
  on-secondary: '#ffffff'
  secondary-container: '#d0e1fb'
  on-secondary-container: '#54647a'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#271901'
  on-tertiary-container: '#98805d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#d3e4fe'
  secondary-fixed-dim: '#b7c8e1'
  on-secondary-fixed: '#0b1c30'
  on-secondary-fixed-variant: '#38485d'
  tertiary-fixed: '#fcdeb5'
  tertiary-fixed-dim: '#dec29a'
  on-tertiary-fixed: '#271901'
  on-tertiary-fixed-variant: '#574425'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display:
    fontFamily: Inter
    fontSize: 3.5rem
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.035em
  headline-lg:
    fontFamily: Inter
    fontSize: 2.25rem
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.025em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 1.75rem
    fontWeight: '600'
    lineHeight: '1.25'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 1.5rem
    fontWeight: '500'
    lineHeight: '1.3'
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Inter
    fontSize: 1.125rem
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 0.9375rem
    fontWeight: '400'
    lineHeight: '1.55'
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 0.8125rem
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: 0.005em
  label-md:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: -0.005em
  label-sm:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.04em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system delivers a Swiss-inspired, gallery-grade digital environment designed for editorial poise, portfolio showcases, and high-clarity software. Rooted in disciplined minimalism, it prioritizes content over decoration, treating negative space as an active architectural element.

### Personality & Values
- **Disciplined Precision:** Every alignment, margin, and typography scale adheres to a predictable mathematical cadence.
- **Architectural Restraint:** Rejection of non-functional ornament, decorative gradients, and high-saturation accents.
- **Editorial Legibility:** Razor-sharp typography set against light surfaces ensures reading comfort and visual hierarchy.

### Target Audience & Emotional Response
Created for discerning creative directors, architects, engineers, and high-end portfolios. The interface evokes feelings of composure, trust, effortless utility, and enduring sophistication.

## Colors

The color palette is deliberately restricted to a strict monochrome spectrum, anchored by deep slate-black and illuminated by luminous chalk whites.

### Hierarchy & Functional Roles
- **Canvas Base (`#FFFFFF`):** The primary backdrop, offering maximum contrast and pure negative space.
- **Surface Muted (`#F8FAFC` & `#F1F5F9`):** Secondary structural backgrounds, metadata badges, image mats, and nested card fills.
- **Primary Ink (`#0F172A`):** The foundational color for headlines, primary interactive elements, solid buttons, and core iconography.
- **Secondary Ink (`#64748B`):** Supporting body copy, captions, inactive navigation links, and structural metadata.
- **Subtle Stroke (`#E2E8F0`):** Ultra-refined hairline borders that demarcate structure without introducing visual clutter.

## Typography

Inter serves as the singular typographic voice across headlines, body copy, and UI labels. To achieve an authoritative editorial feel, typographic hierarchy relies on disciplined optical weight shifts and deliberate negative letter-spacing on larger sizes rather than decorative typeface mixing.

### Application Rules
- **Display & Large Headlines:** Keep tracking tight (`-0.025em` to `-0.035em`) to unify word shapes and impart a modern print-publication rhythm.
- **Body & Editorial Paragraphs:** Set in neutral weights (`400`) with generous line-heights (`1.55` to `1.6`) to maintain fluid legibility across long prose blocks.
- **Micro-labels & Meta:** Use `label-sm` with slight positive tracking (`0.04em`) when rendering category tags, status identifiers, and technical metadata.

## Layout & Spacing

Layouts follow a structured 12-column grid system capped at a maximum width of `1280px` for optimal reading comfort. Generous outer margins allow content to breathe in the center of the canvas.

### Grid & Breakpoints
- **Desktop (≥ 1024px):** 12 columns, 24px gutters, and 48px outer margins. Content groups should align to strict vertical rhythms.
- **Tablet (768px – 1023px):** 8 columns, 20px gutters, and 32px outer margins.
- **Mobile (< 768px):** 4 columns, 16px gutters, and 20px outer margins. Multi-column editorial modules collapse into unified single-column vertical stacks.

### Spacing Philosophy
Negative space is treated as a core structural element. Use vertical stacks (`space-xl` and above) between unrelated sections, while reserving compact step values (`space-xs` to `space-sm`) strictly for close contextual associations like labels paired with values.

## Elevation & Depth

This system intentionally departs from heavy, artificial depth. Visual priority is defined through delicate tonal differences, hair-thin outlines, and subtle ambient shadows.

### Depth Mechanics
- **Hairline Dividers:** Primary boundary separation is achieved via `1px` solid strokes colored `#E2E8F0`. Borders establish structure without raising elements off the z-axis.
- **Soft Ambient Shadows:** Applied sparingly to floating elements such as dropdowns, modals, or hovering project cards. Shadows use a diffused footprint (`0 4px 20px -2px rgba(15, 23, 42, 0.04), 0 2px 6px -1px rgba(15, 23, 42, 0.02)`), creating a clean, paper-like presence.
- **Layered Surfaces:** Elevated modals or panels sit on `#FFFFFF` atop an ultra-clean `#F8FAFC` base, bounded by a `1px` structural outline.

## Shapes

The design system employs a refined micro-radius standard (Level 1: Soft). Elements feature slight `0.25rem` (4px) corner softening on interactive components and `0.5rem` (8px) on broader card containers.

This subtle corner rounding retains the sharp architectural structure of Swiss design while removing harsh pixel apexes. Rounded pill-shapes are strictly prohibited except for functional circular avatar masks or status dot indicators.

## Components

### Buttons
- **Primary:** Solid `#0F172A` background with crisp `#FFFFFF` text. Minimal `0.25rem` radius, padding of `0.625rem 1.25rem`. On hover, softens slightly to `#1E293B`.
- **Secondary / Outline:** Pure `#FFFFFF` background with a `1px` `#E2E8F0` border and `#0F172A` text. Hover transitions border to `#0F172A`.
- **Ghost:** Transparent background with `#64748B` text. Hover shifts text color to `#0F172A` and introduces an ultra-light background tint (`#F8FAFC`).

### Cards & Panels
- Constructed with `#FFFFFF` or `#F8FAFC` surface fills and a mandatory `1px` border of `#E2E8F0`.
- Padding set to `1.5rem` (`space-lg`).
- Interactive cards may introduce an ambient hover shadow (`0 8px 30px rgba(15, 23, 42, 0.05)`) accompanied by a subtle border transition to `#CBD5E1`.

### Form Inputs & Controls
- **Text Inputs:** Backed by `#FFFFFF` with a `1px` `#E2E8F0` border, `0.25rem` radius, and `0.625rem 0.875rem` padding. Focus states switch the border to `#0F172A` with no colored outer glows.
- **Checkboxes & Radios:** Sharp `16px` squares (`0.125rem` radius) or circles with an `#E2E8F0` border. Active checked states fill with solid `#0F172A` displaying a pure white checkmark.

### Chips & Badges
- Compact indicators utilizing `#F1F5F9` background, `#0F172A` text, `0.25rem` radius, and `0.25rem 0.625rem` internal padding. Typographic styling locked to `label-sm`.

### Lists & Navigation
- Clean line-item lists separated by `1px` `#F1F5F9` horizontal rules. Active states rely on bolded weights or clean `#0F172A` text transitions rather than colorful pill highlights.