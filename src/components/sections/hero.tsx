"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ChevronDown } from "lucide-react";
import { Magnetic } from "@/components/magnetic";
import { Countdown } from "@/components/countdown";
import { SplitWord } from "@/components/reveal";

export function Hero() {
  const t = useTranslations("hero");
  const c = useTranslations("common");
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section ref={ref} className="relative min-h-svh w-full overflow-hidden bg-[var(--color-ink)] text-[var(--color-snow)]">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/hero-poster.jpg"
          className="h-full w-full object-cover"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* gradient overlay */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.85))",
        }}
      />
      {/* cold blue cast */}
      <div aria-hidden className="absolute inset-0 mix-blend-multiply" style={{ background: "linear-gradient(180deg, rgba(14,42,68,0.35), rgba(7,24,43,0.55))" }} />
      {/* vignette */}
      <div aria-hidden className="absolute inset-0 vignette" />
      {/* grain */}
      <div aria-hidden className="absolute inset-0 grain" />
      {/* court grid */}
      <div aria-hidden className="absolute inset-0 grid-court opacity-[0.07]" />

      <motion.div style={{ opacity }} className="relative z-10 container-edge mx-auto flex min-h-svh flex-col justify-between pt-32 pb-12">
        <div className="flex items-center justify-between text-eyebrow text-[var(--color-snow)]/65">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex items-center gap-3 text-[var(--color-accent)]"
          >
            <span className="inline-block h-1.5 w-1.5 bg-[var(--color-accent)] animate-pulse-dot" />
            {t("eyebrow")}
          </motion.span>
          <span className="hidden md:inline">N 43°51′ · E 18°25′</span>
        </div>

        <div className="flex flex-col gap-10">
          <h1 className="text-mega text-[var(--color-snow)]">
            <span className="block"><SplitWord text={t("line1")} /></span>
            <span className="block text-[var(--color-accent)]"><SplitWord text={t("line2")} /></span>
          </h1>

          <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.6 }}
              className="lg:col-span-5 max-w-md text-base text-[var(--color-snow)]/80 leading-relaxed"
            >
              {t("subheadline")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.7 }}
              className="lg:col-span-4"
            >
              <Countdown tone="snow" />
            </motion.div>

            <div className="lg:col-span-3 flex flex-wrap items-center gap-3 lg:justify-end">
              <Magnetic>
                <Link
                  href="/register"
                  className="group inline-flex items-center gap-3 rounded-[var(--radius-sm)] border border-[var(--color-accent)] bg-[var(--color-accent)] px-7 py-4 text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--color-snow)] hover:bg-transparent hover:text-[var(--color-accent)] transition-colors"
                >
                  {t("ctaPrimary")}
                </Link>
              </Magnetic>
              <Magnetic>
                <Link
                  href="/schedule"
                  className="inline-flex items-center gap-2 rounded-[var(--radius-sm)] border border-white/40 px-5 py-4 text-[11px] font-medium uppercase tracking-[0.2em] hover:bg-[var(--color-snow)] hover:text-[var(--color-ink)] transition-colors"
                >
                  {t("ctaGhost")}
                </Link>
              </Magnetic>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16 flex items-center justify-between text-eyebrow text-[var(--color-snow)]/55"
        >
          <span className="hidden md:inline">{t("tagline")}</span>
          <span className="flex items-center gap-3">
            {c("scroll")}
            <ChevronDown className="h-4 w-4 animate-bounce" />
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
