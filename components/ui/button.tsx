import Link from "next/link";
import { cn } from "@/lib/utils";
import { Magnetic } from "./magnetic";

type Variant = "primary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors duration-200 focus-visible:outline-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-blue text-white shadow-glow-sm hover:bg-blue-bright hover:shadow-glow",
  ghost:
    "border border-line bg-transparent text-white hover:border-blue/50 hover:bg-white/[0.03]",
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  magnetic = true,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  magnetic?: boolean;
}) {
  const link = (
    <Link href={href} className={cn(base, variants[variant], className)}>
      {children}
    </Link>
  );

  if (!magnetic) return link;
  return <Magnetic className="inline-block">{link}</Magnetic>;
}
