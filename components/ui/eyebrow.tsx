import { cn } from "@/lib/utils";

// The small uppercase mono label above headings — a core "agency" signal.
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[0.8125rem] uppercase tracking-[0.15em] text-fg-muted",
        className,
      )}
    >
      <span className="h-px w-6 bg-blue/60" aria-hidden />
      {children}
    </span>
  );
}
