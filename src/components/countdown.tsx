"use client";

import { useEffect, useState } from "react";
import { TOURNAMENT_START } from "@/lib/utils";
import { useTranslations } from "next-intl";

function diff(target: Date) {
  const ms = Math.max(0, target.getTime() - Date.now());
  const d = Math.floor(ms / 86400000);
  const h = Math.floor((ms / 3600000) % 24);
  const m = Math.floor((ms / 60000) % 60);
  const s = Math.floor((ms / 1000) % 60);
  return { d, h, m, s };
}

export function Countdown({ tone = "snow" }: { tone?: "snow" | "ink" }) {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const tCd = useTranslations("countdown");

  useEffect(() => {
    setT(diff(TOURNAMENT_START));
    const id = setInterval(() => setT(diff(TOURNAMENT_START)), 1000);
    return () => clearInterval(id);
  }, []);

  const isSnow = tone === "snow";
  const text = isSnow ? "text-[var(--color-snow)]" : "text-[var(--color-ink)]";
  const sub = isSnow ? "text-[var(--color-snow)]/55" : "text-[var(--color-ink)]/50";
  const divider = isSnow ? "bg-white/15" : "bg-[var(--color-ink)]/15";

  const items: { label: string; pad: number; n: number }[] = [
    { label: tCd("days"), pad: 3, n: t.d },
    { label: tCd("hours"), pad: 2, n: t.h },
    { label: tCd("minutes"), pad: 2, n: t.m },
    { label: tCd("seconds"), pad: 2, n: t.s },
  ];

  return (
    <div className={`flex items-stretch ${text}`}>
      {items.map(({ label, pad, n }, i) => (
        <div key={label} className="flex flex-1 items-stretch">
          <div className="flex-1 text-center">
            <div className="font-display tabular-nums leading-none tracking-tight text-[clamp(40px,9vw,96px)]">
              {String(n).padStart(pad, "0")}
            </div>
            <div className={`mt-3 font-mono text-[10px] tracking-[0.3em] ${sub}`}>{label}</div>
          </div>
          {i < items.length - 1 && <span className={`mx-2 my-2 w-px ${divider}`} aria-hidden />}
        </div>
      ))}
    </div>
  );
}
