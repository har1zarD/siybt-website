"use client";

import { useEffect, useRef, useState } from "react";

type Mode = "idle" | "hover" | "text";

export function CustomCursor() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const modeRef = useRef<Mode>("idle");
  const pressedRef = useRef(false);
  const [mode, setMode] = useState<Mode>("idle");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    document.body.classList.add("has-cursor");

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let scale = 1;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      setVisible((v) => v || true);
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      let next: Mode = "idle";
      if (t.closest("input, textarea, [contenteditable='true']")) next = "text";
      else if (t.closest("a, button, [role='button'], [data-cursor='hover'], label, select, summary")) next = "hover";
      if (modeRef.current !== next) {
        modeRef.current = next;
        setMode(next);
      }
    };
    const onDown = () => { pressedRef.current = true; };
    const onUp = () => { pressedRef.current = false; };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    let raf = 0;
    const tick = () => {
      const target = pressedRef.current ? 0.82 : 1;
      scale += (target - scale) * 0.25;
      if (wrapRef.current) {
        wrapRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale.toFixed(3)})`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.body.classList.remove("has-cursor");
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="fixed left-0 top-0 z-[9999] pointer-events-none"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 200ms ease-out" }}
    >
      {/* Arrow (idle) */}
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        className="absolute left-0 top-0 transition-[opacity,transform] duration-200 ease-out"
        style={{
          opacity: mode === "idle" ? 1 : 0,
          transform: mode === "idle" ? "rotate(0deg)" : "rotate(-12deg)",
          filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.25))",
        }}
      >
        <path
          d="M3 2 L3 16.5 L7.2 12.6 L9.7 18.5 L11.9 17.6 L9.4 11.8 L15.5 11.8 Z"
          fill="var(--color-snow)"
          stroke="var(--color-ink)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <circle cx="3" cy="2" r="1.6" fill="var(--color-accent)" />
      </svg>

      {/* Click ring (hover) */}
      <div
        className="absolute transition-[width,height,opacity,border-color,background-color] duration-[220ms] ease-out rounded-full"
        style={{
          width: mode === "hover" ? 36 : 14,
          height: mode === "hover" ? 36 : 14,
          left: mode === "hover" ? -18 : -7,
          top: mode === "hover" ? -18 : -7,
          opacity: mode === "hover" ? 1 : 0,
          backgroundColor: "var(--color-accent)",
          boxShadow: "0 6px 18px -4px rgba(255,90,31,0.55)",
        }}
      />
      <div
        className="absolute rounded-full transition-opacity duration-200 ease-out"
        style={{
          width: 4,
          height: 4,
          left: -2,
          top: -2,
          backgroundColor: "var(--color-snow)",
          opacity: mode === "hover" ? 1 : 0,
        }}
      />

      {/* I-beam (text) */}
      <div
        className="absolute transition-opacity duration-150 ease-out"
        style={{
          opacity: mode === "text" ? 1 : 0,
          left: -1,
          top: -13,
        }}
      >
        <div
          style={{
            width: 2,
            height: 26,
            backgroundColor: "var(--color-ink)",
            boxShadow: "0 0 0 1px rgba(255,255,255,0.6)",
          }}
        />
      </div>
    </div>
  );
}
