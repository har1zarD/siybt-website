"use client";

import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import GB from "country-flag-icons/react/3x2/GB";
import BA from "country-flag-icons/react/3x2/BA";

const LOCALES = [
  { code: "en", label: "EN", Flag: GB },
  { code: "bs", label: "BS", Flag: BA },
] as const;

export function LanguageSwitcher({ tone = "snow" }: { tone?: "snow" | "ink" }) {
  const t = useTranslations("languageSwitcher");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const [pending, start] = useTransition();

  const switchTo = (next: string) => {
    if (next === locale) return;
    document.cookie = `NEXT_LOCALE=${next};path=/;max-age=31536000;samesite=lax`;
    start(() => {
      router.replace(
        // @ts-expect-error pathnames typing
        { pathname, params },
        { locale: next as (typeof LOCALES)[number]["code"] }
      );
    });
  };

  return (
    <div
      role="group"
      aria-label={t("label")}
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full border p-[2px] text-[10px] font-mono uppercase tracking-[0.18em] backdrop-blur-md",
        tone === "snow"
          ? "border-white/25 bg-white/5 text-[var(--color-snow)]"
          : "border-[var(--color-line-strong)] bg-[var(--color-snow)]/60 text-[var(--color-ink)]"
      )}
    >
      {LOCALES.map(({ code, label, Flag }) => {
        const active = locale === code;
        return (
          <button
            key={code}
            onClick={() => switchTo(code)}
            disabled={pending}
            aria-pressed={active}
            aria-label={label}
            className={cn(
              "group relative inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 transition-all",
              active
                ? tone === "snow"
                  ? "bg-[var(--color-snow)] text-[var(--color-ink)] shadow-[0_2px_10px_-3px_rgba(0,0,0,0.35)]"
                  : "bg-[var(--color-ink)] text-[var(--color-snow)] shadow-[0_2px_10px_-3px_rgba(0,0,0,0.35)]"
                : "opacity-70 hover:opacity-100"
            )}
          >
            <span
              className={cn(
                "relative inline-block h-4 w-4 overflow-hidden rounded-full ring-1 transition-all",
                active ? "ring-black/15" : "ring-white/30 group-hover:ring-white/60",
                tone === "ink" && !active && "ring-black/20 group-hover:ring-black/40"
              )}
              aria-hidden
            >
              <Flag className="absolute left-1/2 top-1/2 h-full w-auto min-w-[150%] -translate-x-1/2 -translate-y-1/2" />
            </span>
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
