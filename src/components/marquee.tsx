import { cn } from "@/lib/utils";

export function Marquee({
  items,
  speed = "normal",
  className,
  separator = "★",
}: {
  items: string[];
  speed?: "slow" | "normal" | "fast";
  className?: string;
  separator?: string;
}) {
  const speedCls = speed === "slow" ? "animate-marquee-slow" : speed === "fast" ? "animate-marquee-fast" : "animate-marquee";
  const row = (
    <div className="flex shrink-0 items-center gap-10 pr-10">
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-10">
          <span>{it}</span>
          <span className="text-[var(--color-accent)]">{separator}</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      <div className={cn("flex w-max", speedCls)}>
        {row}{row}
      </div>
    </div>
  );
}
