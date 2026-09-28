import type { Config } from "tailwindcss";

/**
 * Tailwind theme encoding the reference Design_Tokens (Requirement 18).
 *
 * Themeable colors are driven by CSS variables defined in `app/globals.css`
 * under `:root` (light) and `.dark` / `[data-theme="dark"]` (dark), so a single
 * root class/attribute switch re-themes every surface (Requirement 10.6).
 *
 * Radii, shadows, and the fixed brand accents are static tokens.
 */
const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./src/**/*.{ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Typography (Requirement 18.4): "Plus Jakarta Sans" throughout. Its
      // CSS variable is provided by `next/font` in the root
      // layout; system sans is the final fallback. `sans` is the default body
      // family so every surface inherits the reference typeface.
      fontFamily: {
        sans: [
          "var(--font-plus-jakarta-sans)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
      // Uppercase eyebrow label: 11px with wide tracking (Requirement 18.4).
      fontSize: {
        eyebrow: ["11px", { lineHeight: "1", letterSpacing: "0.15em" }],
      },
      letterSpacing: {
        // Eyebrow tracking range 0.1em–0.2em (Requirement 18.4).
        eyebrow: "0.15em",
        "eyebrow-tight": "0.1em",
        "eyebrow-wide": "0.2em",
      },
      colors: {
        // --- Themeable surface/ink tokens (CSS-variable driven) ---
        // Page background: light #FFFFFF.
        bg: "rgb(var(--color-bg) / <alpha-value>)",
        // Near-black primary ink for headings/solid buttons: #111315 / #111827.
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        // Nested/card surface fill: #FAFAFB.
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        // Hairline border: #ECEEF1 / #E5E7EB.
        border: "rgb(var(--color-border) / <alpha-value>)",
        // Muted meta text: #6B7280.
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        // Body copy: #4B5563.
        body: "rgb(var(--color-body) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",

        // --- Fixed brand accents (not themed) ---
        // Pure-black accents.
        ink: "#3D271B",
        // AI "online" green range 22C55E–4ADE80.
        "ai-green": {
          DEFAULT: "#97B789",
          light: "#B9D3AB",
        },
      },
      borderRadius: {
        // Navbar pill (fully rounded).
        pill: "9999px",
        // Buttons: 6–10px.
        button: "8px",
        // Cards: 10–24px.
        card: "16px",
        "card-lg": "24px",
        // AI panel: 14–20px.
        panel: "18px",
        // Chat bubbles: 10–14px.
        bubble: "12px",
      },
      boxShadow: {
        // Elevation tokens: opacity 0.04–0.12, blur 8–24px.
        // Floating navbar pill.
        pill: "0 8px 30px -4px rgb(61 39 27 / 0.12)",
        // Cards / hovering panels.
        card: "0 12px 24px -8px rgb(61 39 27 / 0.10)",
        "card-hover": "0 16px 30px -8px rgb(61 39 27 / 0.18)",
        // Floating capability badges.
        badge: "0 8px 24px -4px rgb(61 39 27 / 0.14)",
      },
    },
  },
  plugins: [],
};

export default config;
