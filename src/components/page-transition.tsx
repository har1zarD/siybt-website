"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <>
      <motion.div
        key={pathname}
        aria-hidden
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: 0.55, ease: [0.65, 0, 0.05, 1] }}
        style={{ transformOrigin: "right center" }}
        className="fixed inset-0 z-[80] bg-[var(--color-accent)] pointer-events-none"
      />
      <motion.div
        key={`${pathname}-content`}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
