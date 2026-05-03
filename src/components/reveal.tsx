"use client";

import { motion, type Variants } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";

const v: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

const vLight: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

function useLightMotion() {
  const [light, setLight] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce), (max-width: 767px)");
    const update = () => setLight(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return light;
}

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const light = useLightMotion();
  return (
    <motion.div
      variants={light ? vLight : v}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ delay: light ? 0 : delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function RevealStagger({ children, className, gap = 0.06 }: { children: ReactNode; className?: string; gap?: number }) {
  const light = useLightMotion();
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: light ? 0 : gap } } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  const light = useLightMotion();
  return (
    <motion.div variants={light ? vLight : v} className={className}>
      {children}
    </motion.div>
  );
}

export function SplitWord({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.22em] last:mr-0">
          <motion.span
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.95, ease: [0.65, 0, 0.05, 1], delay: i * 0.05 }}
            className="inline-block"
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
