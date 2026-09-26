import { ScrambledText } from "@/components/react-bits/ScrambledText";
interface SectionHeadingProps { eyebrow?: string; heading?: string; centered?: boolean; className?: string; }

export function SectionHeading({ eyebrow, heading, centered = false, className = "" }: SectionHeadingProps) {
  if (!eyebrow && !heading) return null;
  return <header className={`${centered ? "text-center" : ""} ${className}`}>{eyebrow && <p className="text-eyebrow mb-2"><ScrambledText text={eyebrow} /></p>}{heading && <h2 className="text-heading-black text-3xl sm:text-4xl">{heading}</h2>}</header>;
}
