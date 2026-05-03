"use client";

import { useTranslations } from "next-intl";
import { Marquee } from "@/components/marquee";

export function MarqueeBar() {
  const t = useTranslations("marquee");
  const items = t.raw("items") as string[];
  return (
    <div className="border-y border-[var(--color-line)] bg-[var(--color-paper-warm)] py-6 font-display text-3xl md:text-5xl uppercase">
      <Marquee items={items} />
    </div>
  );
}
