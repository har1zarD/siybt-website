"use client";

import { useEffect, useState } from "react";
import { TOURNAMENT_START } from "@/lib/utils";

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
  useEffect(() => {
    setT(diff(TOURNAMENT_START));
    const id = setInterval(() => setT(diff(TOURNAMENT_START)), 1000);
    return () => clearInterval(id);
  }, []);
  const text = tone === "snow" ? "text-[var(--color-snow)]" : "text-[var(--color-ink)]";
  const sub = tone === "snow" ? "text-[var(--color-snow)]/55" : "text-[var(--color-ink)]/55";
  const items: [string, number][] = [["DANI", t.d], ["SATI", t.h], ["MIN", t.m], ["SEK", t.s]];
  return (
    <div className={`grid grid-cols-4 gap-px bg-current/10 ${text}`}>
      {items.map(([label, n]) => (
        <div key={label} className="bg-transparent px-5 py-4 text-center">
          <div className="font-mono text-3xl md:text-4xl tabular-nums tracking-tight">
            {String(n).padStart(2, "0")}
          </div>
          <div className={`mt-1 text-[10px] tracking-[0.3em] ${sub}`}>{label}</div>
        </div>
      ))}
    </div>
  );
}
