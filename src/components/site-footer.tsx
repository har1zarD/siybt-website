import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function SiteFooter() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");

  const links = [
    ["/tournament", "tournament"],
    ["/schedule", "schedule"],
    ["/venues", "venues"],
    ["/stay", "stay"],
    ["/family", "family"],
    ["/sponsors", "sponsors"],
    ["/register", "register"],
  ] as const;

  return (
    <footer className="relative isolate bg-[var(--color-ink)] text-[var(--color-snow)] overflow-hidden">
      <div className="container-edge mx-auto pt-24 pb-10 relative z-10">
        {/* columns */}
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="text-eyebrow text-[var(--color-snow)]/55">{t("tag")}</div>
            <h2 className="mt-6 whitespace-pre-line font-display leading-[1.04] tracking-[-0.008em] text-[clamp(28px,4.6vw,76px)] [hyphens:none]">{t("title")}</h2>
            <p className="mt-8 max-w-md text-sm text-[var(--color-snow)]/65 leading-relaxed">{t("lead")}</p>
          </div>

          <div className="md:col-span-3">
            <div className="text-eyebrow text-[var(--color-snow)]/55">{t("navHeading")}</div>
            <ul className="mt-6 space-y-2 font-display text-2xl leading-tight">
              {links.map(([h, k]) => (
                <li key={h}>
                  <Link href={h} className="group inline-flex items-center gap-2 hover:text-[var(--color-accent)] transition-colors">
                    {nav(k)}
                    <span className="inline-block h-px w-0 bg-[var(--color-accent)] transition-all duration-300 group-hover:w-6" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="text-eyebrow text-[var(--color-snow)]/55">{t("contactHeading")}</div>
            <ul className="mt-6 space-y-3 text-sm text-[var(--color-snow)]/75">
              <li><a href="mailto:info@siybt.ba" className="hover:text-[var(--color-accent)]">info@siybt.ba</a></li>
              <li><a href="mailto:register@siybt.ba" className="hover:text-[var(--color-accent)]">register@siybt.ba</a></li>
              <li><a href="mailto:partners@siybt.ba" className="hover:text-[var(--color-accent)]">partners@siybt.ba</a></li>
              <li className="pt-2 text-[var(--color-snow)]/55">Sarajevo, BiH</li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="text-eyebrow text-[var(--color-snow)]/55">{t("followHeading")}</div>
            <ul className="mt-6 space-y-3 text-sm text-[var(--color-snow)]/75">
              <li><a href="#" className="hover:text-[var(--color-accent)]">Instagram</a></li>
              <li><a href="#" className="hover:text-[var(--color-accent)]">YouTube</a></li>
              <li><a href="#" className="hover:text-[var(--color-accent)]">TikTok</a></li>
              <li><a href="#" className="hover:text-[var(--color-accent)]">LinkedIn</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-[var(--color-snow)]/55 md:flex-row md:items-center md:justify-between">
          <div>© 2026 - 2027 SIYBT. {t("rights")}</div>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-[var(--color-accent)]">{t("privacy")}</Link>
            <Link href="/" className="hover:text-[var(--color-accent)]">{t("terms")}</Link>
            <span className="text-[var(--color-snow)]/40">{t("madeIn")}</span>
          </div>
        </div>
      </div>

      {/* giant wordmark background */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-0 flex justify-center overflow-hidden leading-[0.78]">
        <span className="font-display text-[clamp(180px,30vw,520px)] tracking-[-0.04em] text-white opacity-[0.04] whitespace-nowrap">
          SIYBT · 2027
        </span>
      </div>
    </footer>
  );
}
