import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/hooks/useTheme";
import { GlobalClickSpark } from "@/components/react-bits/GlobalClickSpark";
import { InteractiveCurrent } from "@/components/layout/InteractiveCurrent";
import { LanguageProvider } from "@/hooks/useLanguage";
import { FeatureHint } from "@/components/layout/FeatureHint";

/*
 * Typography (Requirement 18.4): "Plus Jakarta Sans" is used throughout the
 * portfolio and loaded via `next/font/google` for a stable, self-hosted render.
 *
 * Plus Jakarta Sans ships weights 400–800 (the range the reference uses for
 * body 400–500 and headings 700–800).
 */
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Allexa | Data Analyst Portfolio",
  description: "Data analytics, business intelligence, and machine learning work by Allexa.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={plusJakartaSans.variable}
    >
      <body><InteractiveCurrent /><ThemeProvider><LanguageProvider>{children}<FeatureHint /><GlobalClickSpark /></LanguageProvider></ThemeProvider></body>
    </html>
  );
}
