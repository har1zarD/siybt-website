"use client";

import { animate, useInView, useMotionValue, useTransform, motion } from "framer-motion";
import { useEffect, useRef } from "react";

export function NumberTicker({ value, duration = 1.6, className }: { value: number; duration?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const mv = useMotionValue(0);
  const out = useTransform(mv, (v) => Math.floor(v).toLocaleString("bs-BA"));
  useEffect(() => {
    if (inView) {
      const c = animate(mv, value, { duration, ease: [0.16, 1, 0.3, 1] });
      return () => c.stop();
    }
  }, [inView, value, duration, mv]);
  return <motion.span ref={ref} className={className}>{out}</motion.span>;
}
