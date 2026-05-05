"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

const HERO_IMAGES = {
  tournament: "https://images.pexels.com/photos/1080884/pexels-photo-1080884.jpeg?auto=compress&cs=tinysrgb&w=2400",
  schedule: "/venues/hills-c.jpg",
  venues: "/venues/hills1-b.jpg",
  teams: "https://images.pexels.com/photos/2277981/pexels-photo-2277981.jpeg?auto=compress&cs=tinysrgb&w=2400",
  family: "/family-arena.jpg",
  stay: "/hotels/hills-exterior.jpg",
  sponsors: "https://images.pexels.com/photos/2834914/pexels-photo-2834914.jpeg?auto=compress&cs=tinysrgb&w=2400",
  media: "https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=2400",
  register: "https://images.pexels.com/photos/2961961/pexels-photo-2961961.jpeg?auto=compress&cs=tinysrgb&w=2400",
  contact: "https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=2400",
} as const;

export type HeroVariant = keyof typeof HERO_IMAGES;

export function PageHero({
  eyebrow,
  title,
  lead,
  meta,
  variant,
  index,
  total = 9,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  meta?: ReactNode;
  variant?: HeroVariant;
  index?: number;
  total?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const fade = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  const img = variant ? HERO_IMAGES[variant] : null;
  const indexLabel = (n?: number) => (n ? String(n).padStart(2, "0") : "-");

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden bg-[var(--color-ink)] text-[var(--color-snow)] min-h-[80svh] flex flex-col"
    >
      {/* parallax image */}
      {img ? (
        <motion.div style={{ y, scale }} className="absolute inset-0 -z-10">
          <Image
            src={img}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ filter: "grayscale(100%) brightness(0.4) contrast(1.1)" }}
          />
        </motion.div>
      ) : null}

      {/* layered overlays */}
      <div aria-hidden className="absolute inset-0 -z-10" style={{
        background: "linear-gradient(to bottom, rgba(5,6,8,0.72) 0%, rgba(5,6,8,0.4) 40%, rgba(5,6,8,0.95) 100%)",
      }} />
      <div aria-hidden className="absolute inset-0 -z-10 mix-blend-multiply" style={{
        background: "linear-gradient(135deg, rgba(14,42,68,0.55), rgba(7,24,43,0.2) 60%, rgba(5,6,8,0))",
      }} />
      <div aria-hidden className="absolute inset-0 -z-10" style={{
        background: "radial-gradient(60% 50% at 90% 10%, rgba(244,180,28,0.18), transparent 65%)",
      }} />
      <div aria-hidden className="absolute inset-0 -z-10 grid-court opacity-[0.07]" />
      <div aria-hidden className="absolute inset-0 -z-10 grain" />
      <div aria-hidden className="absolute inset-0 -z-10 vignette" />

      {/* top meta bar */}
      <div className="container-edge relative mx-auto w-full flex items-center justify-between pt-32 md:pt-36 text-eyebrow text-[var(--color-snow)]/60">
        <div className="flex items-center gap-3">
          <span className="text-[var(--color-accent)]">{indexLabel(index)}</span>
          <span className="h-px w-8 bg-[var(--color-snow)]/30" />
          <span>{eyebrow}</span>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <span>SARAJEVO · 28 - 31 / 01 / 2027</span>
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] animate-pulse-dot" />
        </div>
      </div>

      {/* title block */}
      <motion.div style={{ y: titleY, opacity: fade }} className="container-edge relative mx-auto w-full flex-1 flex flex-col justify-center py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <motion.h1
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="text-mega text-[var(--color-snow)] uppercase"
            >
              {title}
            </motion.h1>
          </div>
          <motion.div
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-4"
          >
            <p className="text-base md:text-lg leading-relaxed text-[var(--color-snow)]/80 max-w-md">{lead}</p>
          </motion.div>
        </div>
      </motion.div>

      {/* bottom meta strip */}
      <div className="container-edge relative mx-auto w-full pb-8 md:pb-10">
        <div className="flex items-end justify-between gap-6 border-t border-white/10 pt-6 text-eyebrow text-[var(--color-snow)]/55">
          <div className="flex items-center gap-3">
            <span className="font-mono">{indexLabel(index)} / {String(total).padStart(2, "0")}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden md:inline">N 43°51′ · E 18°25′</span>
            <span className="text-[var(--color-snow)]/30">·</span>
            <span>{eyebrow}</span>
          </div>
        </div>
      </div>

      {/* giant fade page mark */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 -z-10 flex items-center justify-end pr-[3vw] overflow-hidden">
        <span className="font-display text-[clamp(180px,28vw,420px)] tracking-[-0.04em] leading-[0.78] text-white opacity-[0.025] select-none whitespace-nowrap">
          {indexLabel(index)}
        </span>
      </div>
    </section>
  );
}
