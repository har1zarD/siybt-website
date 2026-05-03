"use client";

import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal, SplitWord } from "@/components/reveal";

export function About() {
  const t = useTranslations("about");
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-[var(--color-paper)] py-32 md:py-40">
      <motion.div
        style={{ y }}
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-[-10%] h-[120%] w-[60%] opacity-[0.08]"
      >
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "url(https://images.pexels.com/photos/1080884/pexels-photo-1080884.jpeg?auto=compress&cs=tinysrgb&w=1200)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "grayscale(100%) contrast(1.1)",
          }}
        />
      </motion.div>

      <div className="container-edge relative mx-auto grid gap-16 md:grid-cols-12">
        <div className="md:col-span-6">
          <Reveal>
            <div className="text-eyebrow text-[var(--color-accent)]">{t("eyebrow")}</div>
          </Reveal>
          <h2 className="mt-6 text-giant text-[var(--color-ink)]">
            <SplitWord text={t("title").replace("\n", " ")} />
          </h2>
        </div>
        <div className="md:col-span-6 md:pl-10 lg:pl-20 space-y-6 text-[var(--color-ink)]/75 leading-relaxed text-lg">
          <Reveal delay={0.05}><p>{t("p1")}</p></Reveal>
          <Reveal delay={0.1}><p>{t("p2")}</p></Reveal>
          <Reveal delay={0.15}><p>{t("p3")}</p></Reveal>
        </div>
      </div>
    </section>
  );
}
