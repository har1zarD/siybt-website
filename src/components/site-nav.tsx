"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Magnetic } from "./magnetic";
import { LanguageSwitcher } from "./language-switcher";
import Image from "next/image";

const NAV = [
  { href: "/tournament" as const, key: "tournament" },
  { href: "/schedule" as const, key: "schedule" },
  { href: "/venues" as const, key: "venues" },
  { href: "/teams" as const, key: "teams" },
  { href: "/family" as const, key: "family" },
  { href: "/sponsors" as const, key: "sponsors" },
  { href: "/media" as const, key: "media" },
  { href: "/contact" as const, key: "contact" },
];

export function SiteNav() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Every page sits on a dark hero at the top — keep the navbar in "snow" tone
  // until the user scrolls past it, then switch to "ink" once the paper backdrop kicks in.
  const tone = scrolled ? "ink" : "snow";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-[var(--color-paper)]/85 backdrop-blur-2xl border-b border-[var(--color-line)]"
          : "bg-gradient-to-b from-[rgba(0,0,0,0.45)] via-[rgba(0,0,0,0.18)] to-transparent"
      )}
    >
      <div className={cn("container-edge mx-auto flex items-center justify-between transition-all", scrolled ? "py-3" : "py-5")}>
        <Link href="/" className={cn("flex items-center gap-3 transition-colors", tone === "snow" ? "text-[var(--color-snow)]" : "text-[var(--color-ink)]")} aria-label="SIYBT — home">
          <Image src="/logo.png" alt="SIYBT" width={40} height={40} priority className="h-9 w-9 object-contain" />
          <span className="font-display text-base tracking-[0.06em]">SIYBT 2027</span>
        </Link>

        <nav className={cn("hidden lg:flex items-center gap-7 text-sm transition-colors", tone === "snow" ? "text-[var(--color-snow)]" : "text-[var(--color-ink)]")}>
          {NAV.map((n) => {
            const active = pathname === n.href;
            return (
              <Magnetic key={n.href} strength={0.18}>
                <Link href={n.href} className="group relative inline-flex items-center py-1">
                  <span className={cn("transition-opacity", active ? "opacity-100" : "opacity-85 group-hover:opacity-60")}>{t(n.key)}</span>
                  <span
                    className={cn(
                      "absolute -bottom-0.5 left-0 h-px bg-[var(--color-accent)] transition-all duration-300 ease-out",
                      active ? "w-full" : "w-0 group-hover:w-full"
                    )}
                  />
                </Link>
              </Magnetic>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher tone={tone} />
          <Magnetic strength={0.22}>
            <Link
              href="/register"
              className="hidden md:inline-flex items-center gap-2 rounded-[var(--radius-sm)] border border-transparent bg-[var(--color-accent)] px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--color-snow)] transition-all hover:border-[var(--color-ink)] hover:bg-[var(--color-ink)]"
            >
              {t("register")}
            </Link>
          </Magnetic>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={t("menu")}
            className={cn(
              "lg:hidden inline-flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-[var(--radius-sm)] border",
              tone === "snow" ? "border-white/30 text-[var(--color-snow)]" : "border-[var(--color-line-strong)] text-[var(--color-ink)]"
            )}
          >
            <span className={cn("h-px w-5 bg-current transition-transform", open && "translate-y-[3px] rotate-45")} />
            <span className={cn("h-px w-5 bg-current transition-transform", open && "-translate-y-[3px] -rotate-45")} />
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-[var(--color-line)] bg-[var(--color-paper)]">
          <nav className="container-edge mx-auto flex flex-col py-4 text-[var(--color-ink)]">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="border-b border-[var(--color-line)] py-3 font-display text-2xl">
                {t(n.key)}
              </Link>
            ))}
            <Link href="/register" onClick={() => setOpen(false)} className="mt-4 inline-flex items-center justify-center rounded-[var(--radius-sm)] bg-[var(--color-accent)] px-5 py-3 text-[11px] uppercase tracking-[0.18em] text-[var(--color-snow)]">
              {t("register")}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
