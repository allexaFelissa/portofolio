export function StatusDot({ label = "Online" }: { label?: string }) {
  return <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-ai-green"><span className="size-2 rounded-full bg-ai-green" aria-hidden="true" />{label}</span>;
}
