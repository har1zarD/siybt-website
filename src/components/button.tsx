import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Magnetic } from "./magnetic";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "ink";
  className?: string;
  showArrow?: boolean;
};

export function Button({ href, children, variant = "primary", className, showArrow = true }: Props) {
  const base = "group relative inline-flex items-center gap-3 rounded-full px-7 py-4 text-sm font-medium tracking-wide uppercase transition-colors duration-300";
  const styles = {
    primary: "bg-[var(--color-accent)] text-[var(--color-snow)] hover:bg-[var(--color-accent-glow)]",
    ghost: "border border-[var(--color-snow)]/40 text-[var(--color-snow)] hover:bg-[var(--color-snow)] hover:text-[var(--color-ink)]",
    ink: "bg-[var(--color-ink)] text-[var(--color-snow)] hover:bg-[var(--color-ink-soft)]",
  } as const;
  return (
    <Magnetic strength={0.3} className="inline-block">
      <Link href={href} className={cn(base, styles[variant], className)}>
        <span className="relative">{children}</span>
        {showArrow && (
          <span className="relative inline-flex h-5 w-5 items-center justify-center overflow-hidden">
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </span>
        )}
      </Link>
    </Magnetic>
  );
}
