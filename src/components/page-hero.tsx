import { type ReactNode } from "react";
import { SplitWord } from "./reveal";

export function PageHero({
  eyebrow,
  title,
  lead,
  meta,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  meta?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-[var(--color-ink)] text-[var(--color-snow)] pt-44 pb-24 md:pt-56 md:pb-36 grain">
      <div aria-hidden className="absolute inset-0 grid-court opacity-[0.07]" />
      <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(60% 60% at 80% 0%, rgba(42,74,114,0.4), transparent 70%)" }} />
      <div className="container-edge relative mx-auto grid gap-10 md:grid-cols-12">
        <div className="md:col-span-8">
          <div className="text-eyebrow text-[var(--color-accent)]">{eyebrow}</div>
          <h1 className="mt-6 text-giant text-[var(--color-snow)]">
            <SplitWord text={title} />
          </h1>
        </div>
        <div className="md:col-span-4 md:pt-8">
          <p className="text-base leading-relaxed text-[var(--color-snow)]/80">{lead}</p>
          {meta ? <div className="mt-6 text-eyebrow text-[var(--color-snow)]/55">{meta}</div> : null}
        </div>
      </div>
    </section>
  );
}
