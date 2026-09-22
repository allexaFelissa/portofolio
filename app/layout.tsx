import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/hooks/useTheme";

/*
 * Typography (Requirement 18.4): "Plus Jakarta Sans" is the primary typeface
 * with "Inter" as the fallback family. Both are loaded via `next/font/google`
 * so weights are self-hosted, size-adjusted, and free of layout shift.
 *
 * Plus Jakarta Sans ships weights 400–800 (the range the reference uses for
 * body 400–500 and headings 700–800). Inter is exposed as a CSS variable and
 * listed as the fallback so any glyph the primary font lacks degrades cleanly.
 */
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
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
      className={`${plusJakartaSans.variable} ${inter.variable}`}
    >
      <body><ThemeProvider>{children}</ThemeProvider></body>
    </html>
  );
}
