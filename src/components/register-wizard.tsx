"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { CATEGORIES, HOTELS, cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, Check, Loader2, Star, AlertCircle, Pencil } from "lucide-react";
import { Link } from "@/i18n/navigation";

const HOTEL_CHOICES = ["hills", "malak", "hollywood"] as const;

const schema = z.object({
  clubName: z.string().min(2),
  city: z.string().min(2),
  country: z.string().min(2),
  contact: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(5),
  categories: z.array(z.string()).min(1),
  hotelChoice: z.enum(HOTEL_CHOICES),
  rooms: z.number().int().min(0).optional(),
  nights: z.number().int().min(0).optional(),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const STEP_FIELDS: (keyof FormData)[][] = [
  ["clubName", "city", "country", "contact", "email", "phone"],
  ["categories"],
  ["hotelChoice", "rooms", "nights"],
  [],
];

export function RegisterWizard() {
  const t = useTranslations("register");
  const steps = t.raw("steps") as string[];
  const hints = t.raw("stepHints") as string[];
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { categories: [], hotelChoice: "hills", rooms: 4, nights: 3 },
    mode: "onTouched",
  });

  const onSubmit = async (data: FormData) => {
    setStatus("sending");
    try {
      const payload = { ...data, needsAccommodation: true };
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const goNext = async () => {
    const ok = await methods.trigger(STEP_FIELDS[step]);
    if (ok) setStep((s) => Math.min(s + 1, steps.length - 1));
  };
  const goPrev = () => setStep((s) => Math.max(s - 1, 0));
  const goTo = async (target: number) => {
    if (target <= step) return setStep(target);
    for (let i = step; i < target; i++) {
      const ok = await methods.trigger(STEP_FIELDS[i]);
      if (!ok) return setStep(i);
    }
    setStep(target);
  };

  if (status === "success") return <SuccessScreen data={methods.getValues()} />;

  return (
    <section className="container-edge mx-auto py-16 md:py-24">
      <div className="grid gap-10 md:grid-cols-12">
        {/* Sidebar - sticky stepper on desktop, compact on mobile */}
        <aside className="md:col-span-4 lg:col-span-3">
          <div className="md:sticky md:top-24">
            {/* Mobile compact */}
            <div className="md:hidden">
              <div className="flex items-baseline justify-between text-eyebrow text-[var(--color-ink)]/55">
                <span>0{step + 1} / 0{steps.length}</span>
                <span className="font-display text-xl text-[var(--color-ink)]">{steps[step]}</span>
              </div>
              <div className="mt-3 flex gap-1.5">
                {steps.map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "h-1 flex-1 rounded-full transition-colors",
                      i < step ? "bg-[var(--color-accent)]" : i === step ? "bg-[var(--color-accent)]" : "bg-[var(--color-line-strong)]"
                    )}
                  />
                ))}
              </div>
              <p className="mt-3 text-xs text-[var(--color-ink)]/55">{hints[step]}</p>
            </div>

            {/* Desktop vertical */}
            <div className="hidden md:block">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-ink)]/55">{t("title")}</div>
              <ol className="mt-8 relative">
                <span className="absolute left-[15px] top-3 bottom-3 w-px bg-[var(--color-line-strong)]" aria-hidden />
                {steps.map((label, i) => {
                  const state = i < step ? "done" : i === step ? "active" : "pending";
                  return (
                    <li key={label} className="relative">
                      <button
                        type="button"
                        onClick={() => goTo(i)}
                        className="group flex w-full items-center gap-3.5 py-3 text-left"
                      >
                        <span
                          className={cn(
                            "relative grid h-[30px] w-[30px] shrink-0 place-items-center rounded-full border-2 font-mono text-[11px] transition-all bg-[var(--color-paper)]",
                            state === "done" && "border-[var(--color-accent)] bg-[var(--color-accent)] text-[var(--color-snow)]",
                            state === "active" && "border-[var(--color-accent)] text-[var(--color-accent)]",
                            state === "pending" && "border-[var(--color-line-strong)] text-[var(--color-ink)]/45 group-hover:border-[var(--color-ink)]/40",
                          )}
                        >
                          {state === "done" ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : i + 1}
                        </span>
                        <span
                          className={cn(
                            "text-[15px] tracking-tight transition-colors",
                            state === "active" && "font-medium text-[var(--color-ink)]",
                            state === "done" && "text-[var(--color-ink)]/70 group-hover:text-[var(--color-ink)]",
                            state === "pending" && "text-[var(--color-ink)]/40",
                          )}
                        >
                          {label}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
              <p className="mt-8 text-xs leading-relaxed text-[var(--color-ink)]/55 max-w-[260px]">
                {hints[step]}
              </p>
            </div>
          </div>
        </aside>

        {/* Form panel */}
        <div className="md:col-span-8 lg:col-span-9">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
              <div className="rounded-[var(--radius-md)] border border-[var(--color-line-strong)] bg-[var(--color-snow)] shadow-[0_2px_24px_-12px_rgba(0,0,0,0.18)]">
                {/* Header */}
                <div className="border-b border-[var(--color-line)] px-6 py-6 md:px-10 md:py-8">
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-accent)]">
                    Step 0{step + 1} / 0{steps.length}
                  </div>
                  <h3 className="mt-2 font-display text-3xl md:text-4xl leading-tight tracking-tight">
                    {steps[step]}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--color-ink)]/65 md:hidden">{hints[step]}</p>
                </div>

                {/* Body */}
                <div className="px-6 py-7 md:px-10 md:py-10">
                  <div className="relative">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={step}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                      >
                        {step === 0 && <StepClub />}
                        {step === 1 && <StepCategories />}
                        {step === 2 && <StepAccommodation />}
                        {step === 3 && <StepConfirm goTo={setStep} />}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {status === "error" && (
                    <div className="mt-6 flex items-start gap-3 rounded-[var(--radius-sm)] border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                      <span>{t("error")}</span>
                    </div>
                  )}
                </div>

                {/* Footer / nav */}
                <div className="flex items-center justify-between gap-3 border-t border-[var(--color-line)] bg-[var(--color-paper)]/60 px-6 py-4 md:px-10 md:py-5">
                  <button
                    type="button"
                    onClick={goPrev}
                    disabled={step === 0}
                    className="inline-flex items-center gap-2 rounded-[var(--radius-sm)] px-3 py-2.5 text-[11px] uppercase tracking-[0.2em] text-[var(--color-ink)]/70 hover:text-[var(--color-ink)] transition-colors disabled:opacity-30 disabled:hover:text-[var(--color-ink)]/70"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" /> {t("back")}
                  </button>
                  {step < steps.length - 1 ? (
                    <button
                      type="button"
                      onClick={goNext}
                      className="inline-flex items-center gap-2 rounded-[var(--radius-sm)] bg-[var(--color-accent)] px-7 py-3 text-[11px] uppercase tracking-[0.2em] text-[var(--color-snow)] hover:bg-[var(--color-ink)] transition-colors"
                    >
                      {t("next")} <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="inline-flex items-center gap-2 rounded-[var(--radius-sm)] bg-[var(--color-ink)] px-7 py-3 text-[11px] uppercase tracking-[0.2em] text-[var(--color-snow)] hover:bg-[var(--color-accent)] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {status === "sending" ? (
                        <>
                          <Loader2 className="h-3.5 w-3.5 animate-spin" /> {t("sending")}
                        </>
                      ) : (
                        <>
                          {t("submit")} <Check className="h-3.5 w-3.5" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </section>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-ink)]/55">{children}</span>;
}

function Input({
  name,
  type = "text",
  label,
  placeholder,
}: {
  name: keyof FormData;
  type?: string;
  label: string;
  placeholder?: string;
}) {
  const t = useTranslations("register");
  const { register, formState: { errors }, watch } = useFormContext<FormData>();
  const value = watch(name);
  const err = errors[name];
  const hasValue = value !== undefined && value !== "" && value !== 0;

  let message: string | null = null;
  if (err) {
    message = err.type === "invalid_string" || type === "email" ? t("invalidEmail") : t("required");
  }

  return (
    <label className="block">
      <FieldLabel>{label}</FieldLabel>
      <div className="relative mt-2">
        <input
          type={type}
          placeholder={placeholder}
          {...register(name, type === "number" ? { valueAsNumber: true } : {})}
          className={cn(
            "block w-full rounded-[var(--radius-sm)] border bg-[var(--color-paper)]/40 px-4 py-3 text-[15px] outline-none transition-all",
            "placeholder:text-[var(--color-ink)]/35",
            err
              ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200"
              : "border-[var(--color-line-strong)] focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20"
          )}
        />
        {!err && hasValue && (
          <Check className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-accent)]" strokeWidth={2.5} />
        )}
      </div>
      {message && (
        <span className="mt-1.5 inline-flex items-center gap-1 text-xs text-red-600">
          <AlertCircle className="h-3 w-3" /> {message}
        </span>
      )}
    </label>
  );
}

function StepClub() {
  const t = useTranslations("register.fields");
  const tg = useTranslations("register.fieldGroups");
  return (
    <div className="space-y-8">
      <div>
        <div className="mb-4 flex items-center gap-3">
          <span className="h-px flex-1 bg-[var(--color-line-strong)]" />
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-ink)]/45">{tg("club")}</span>
          <span className="h-px flex-1 bg-[var(--color-line-strong)]" />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Input name="clubName" label={t("clubName")} />
          <Input name="city" label={t("city")} placeholder="Sarajevo" />
          <Input name="country" label={t("country")} placeholder="Bosna i Hercegovina" />
        </div>
      </div>
      <div>
        <div className="mb-4 flex items-center gap-3">
          <span className="h-px flex-1 bg-[var(--color-line-strong)]" />
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-ink)]/45">{tg("contact")}</span>
          <span className="h-px flex-1 bg-[var(--color-line-strong)]" />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Input name="contact" label={t("contact")} placeholder="Ime i prezime" />
          <Input name="email" type="email" label={t("email")} placeholder="name@example.com" />
          <Input name="phone" type="tel" label={t("phone")} placeholder="+387 XX XXX XXX" />
        </div>
      </div>
    </div>
  );
}

function StepCategories() {
  const t = useTranslations("register");
  const tFields = useTranslations("register.fields");
  const { register, watch, setValue } = useFormContext<FormData>();
  const selected = watch("categories");
  const allCodes = CATEGORIES.map((c) => c.code);
  const allSelected = selected.length === allCodes.length;

  return (
    <div>
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <FieldLabel>{tFields("categories")}</FieldLabel>
          <div className="mt-1 font-display text-2xl">
            {selected.length} <span className="text-[var(--color-ink)]/55 text-base">/ {CATEGORIES.length}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setValue("categories", allSelected ? [] : allCodes, { shouldValidate: true })}
            className="rounded-[var(--radius-sm)] border border-[var(--color-line-strong)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-ink)]/70 hover:border-[var(--color-ink)] hover:text-[var(--color-ink)] transition-colors"
          >
            {allSelected ? t("clear") : t("selectAll")}
          </button>
        </div>
      </div>
      <ul className="grid grid-cols-2 gap-2.5 md:grid-cols-3 lg:grid-cols-4">
        {CATEGORIES.map((c) => {
          const isOn = selected.includes(c.code);
          return (
            <li key={c.code}>
              <label
                className={cn(
                  "group relative flex h-full cursor-pointer flex-col gap-2 rounded-[var(--radius-md)] border p-4 transition-all",
                  isOn
                    ? "border-[var(--color-accent)] bg-[var(--color-accent)]/8 shadow-[0_4px_18px_-10px_rgba(244,180,28,0.45)]"
                    : "border-[var(--color-line-strong)] bg-[var(--color-paper)]/40 hover:-translate-y-0.5 hover:border-[var(--color-ink)]"
                )}
              >
                <input type="checkbox" value={c.code} {...register("categories")} className="sr-only" />
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[11px] tracking-[0.2em] text-[var(--color-ink)]/55">{c.code}</span>
                  <span
                    className={cn(
                      "grid h-5 w-5 place-items-center rounded-full border transition-colors",
                      isOn ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-[var(--color-snow)]" : "border-[var(--color-line-strong)]"
                    )}
                  >
                    {isOn && <Check className="h-3 w-3" strokeWidth={3} />}
                  </span>
                </div>
                <span className="font-display text-xl leading-tight">{c.label}</span>
                <span className="text-xs text-[var(--color-ink)]/55">{c.year}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function StepAccommodation() {
  const t = useTranslations("register.fields");
  const tStay = useTranslations("register.stay");
  const { register, watch, setValue } = useFormContext<FormData>();
  const choice = watch("hotelChoice");
  const rooms = watch("rooms") ?? 0;
  const nights = watch("nights") ?? 0;
  const hotelOptions = HOTELS.filter((h) => h.kind === "hotel");
  const selectedHotel = hotelOptions.find((h) => h.id === choice);
  const peoplePerRoom = 2;
  const estimatedTotal = selectedHotel?.pricePerPerson
    ? selectedHotel.pricePerPerson * rooms * peoplePerRoom * nights
    : 0;

  return (
    <div className="space-y-8">
      <div>
        <FieldLabel>{tStay("pickHotel")}</FieldLabel>
        <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {hotelOptions.map((h) => {
            const active = choice === h.id;
            return (
              <button
                key={h.id}
                type="button"
                onClick={() => setValue("hotelChoice", h.id as (typeof HOTEL_CHOICES)[number], { shouldValidate: true })}
                className={cn(
                  "group relative overflow-hidden rounded-[var(--radius-md)] border bg-[var(--color-paper)]/40 text-left transition-all hover:-translate-y-0.5",
                  active
                    ? "border-[var(--color-accent)] ring-2 ring-[var(--color-accent)]/30 shadow-[0_8px_32px_-12px_rgba(244,180,28,0.4)]"
                    : "border-[var(--color-line-strong)] hover:border-[var(--color-ink)]"
                )}
              >
                <div className="relative aspect-[16/10]">
                  <Image src={h.images[0]} alt={h.name} fill sizes="33vw" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/85 via-[var(--color-ink)]/15 to-transparent" />
                  {h.stars ? (
                    <div className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-[var(--radius-sm)] bg-[var(--color-snow)]/95 px-2 py-1">
                      {Array.from({ length: h.stars }).map((_, k) => (
                        <Star key={k} className="h-2.5 w-2.5 fill-[var(--color-accent)] text-[var(--color-accent)]" />
                      ))}
                    </div>
                  ) : null}
                  {active && (
                    <div className="absolute top-3 right-3 grid h-7 w-7 place-items-center rounded-full bg-[var(--color-accent)] text-[var(--color-snow)] shadow-lg">
                      <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3 right-3">
                    <h4 className="font-display text-lg leading-tight text-[var(--color-snow)]">{h.name}</h4>
                    <p className="text-[11px] text-[var(--color-snow)]/75">{h.area}</p>
                  </div>
                </div>
                <div className="flex items-end justify-between gap-2 p-4 bg-[var(--color-snow)]">
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--color-ink)]/55">{tStay("from")}</div>
                    <div className="font-mono text-2xl tabular-nums">
                      {h.pricePerPerson} <span className="text-xs text-[var(--color-ink)]/55">{tStay("perPersonNight")}</span>
                    </div>
                  </div>
                  <Link
                    href="/stay"
                    onClick={(e) => e.stopPropagation()}
                    className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-accent)] hover:underline"
                  >
                    {tStay("details")} →
                  </Link>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {selectedHotel && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-[var(--radius-md)] border border-[var(--color-line-strong)] bg-[var(--color-paper)]/60 p-6"
        >
          <div className="grid gap-5 md:grid-cols-3">
            <Input name="rooms" type="number" label={t("rooms")} />
            <Input name="nights" type="number" label={t("nights")} />
            <div className="rounded-[var(--radius-sm)] bg-[var(--color-snow)] p-4 border border-[var(--color-line-strong)]">
              <FieldLabel>{tStay("estimatedTotal")}</FieldLabel>
              <div className="mt-2 font-mono text-3xl tabular-nums leading-none">
                {estimatedTotal > 0 ? estimatedTotal.toLocaleString("de-DE") : "-"}{" "}
                <span className="text-sm text-[var(--color-ink)]/55">KM</span>
              </div>
              <p className="mt-2 text-[11px] text-[var(--color-ink)]/55 leading-snug">{tStay("estimatedNote")}</p>
            </div>
          </div>
        </motion.div>
      )}

      <label className="block">
        <FieldLabel>{t("notes")}</FieldLabel>
        <textarea
          {...register("notes")}
          rows={4}
          className="mt-2 w-full rounded-[var(--radius-sm)] border border-[var(--color-line-strong)] bg-[var(--color-paper)]/40 px-4 py-3 text-sm focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 outline-none"
        />
      </label>
    </div>
  );
}

function StepConfirm({ goTo }: { goTo: (i: number) => void }) {
  const t = useTranslations("register");
  const tFields = useTranslations("register.fields");
  const tStay = useTranslations("register.stay");
  const { watch } = useFormContext<FormData>();
  const v = watch();
  const hotel = HOTELS.find((h) => h.id === v.hotelChoice);

  return (
    <div className="space-y-5">
      <SummaryBlock title={tFields("clubName")} step={0} goTo={goTo}>
        <div className="font-display text-2xl">{v.clubName || "-"}</div>
        <div className="mt-1 text-sm text-[var(--color-ink)]/65">
          {[v.city, v.country].filter(Boolean).join(", ") || "-"}
        </div>
      </SummaryBlock>

      <SummaryBlock title={tFields("contact")} step={0} goTo={goTo}>
        <div className="text-sm">{v.contact || "-"}</div>
        <div className="mt-1 text-sm text-[var(--color-ink)]/65">
          {v.email || "-"} · {v.phone || "-"}
        </div>
      </SummaryBlock>

      <SummaryBlock title={tFields("categories")} step={1} goTo={goTo}>
        {v.categories.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {v.categories.map((c) => (
              <span key={c} className="rounded-[2px] border border-[var(--color-line-strong)] bg-[var(--color-paper)] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em]">
                {c}
              </span>
            ))}
          </div>
        ) : (
          <span className="text-sm text-[var(--color-ink)]/55">-</span>
        )}
      </SummaryBlock>

      <SummaryBlock title={tStay("hotel")} step={2} goTo={goTo}>
        <div className="font-display text-xl">{hotel?.name ?? "-"}</div>
        <div className="mt-1 text-sm text-[var(--color-ink)]/65">
          {v.rooms ?? 0} {tFields("rooms").toLowerCase()} · {v.nights ?? 0} {tFields("nights").toLowerCase()}
        </div>
      </SummaryBlock>

      {v.notes && (
        <SummaryBlock title={tFields("notes")} step={2} goTo={goTo}>
          <p className="text-sm text-[var(--color-ink)]/80 leading-relaxed whitespace-pre-line">{v.notes}</p>
        </SummaryBlock>
      )}

      <div className="rounded-[var(--radius-sm)] border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/5 px-4 py-3 text-sm text-[var(--color-ink)]/75">
        {t("confirm.eyebrow")} - {t("successBody").split(".")[0]}.
      </div>
    </div>
  );
}

function SummaryBlock({
  title,
  step,
  goTo,
  children,
}: {
  title: string;
  step: number;
  goTo: (i: number) => void;
  children: React.ReactNode;
}) {
  const t = useTranslations("register");
  return (
    <div className="group relative rounded-[var(--radius-sm)] border border-[var(--color-line-strong)] bg-[var(--color-paper)]/40 px-5 py-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <FieldLabel>{title}</FieldLabel>
          <div className="mt-2">{children}</div>
        </div>
        <button
          type="button"
          onClick={() => goTo(step)}
          className="inline-flex shrink-0 items-center gap-1 rounded-[var(--radius-sm)] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-ink)]/55 hover:bg-[var(--color-ink)] hover:text-[var(--color-snow)] transition-colors"
        >
          <Pencil className="h-3 w-3" /> {t("edit")}
        </button>
      </div>
    </div>
  );
}

function SuccessScreen({ data }: { data: FormData }) {
  const t = useTranslations("register");
  const tStay = useTranslations("register.stay");
  const tFields = useTranslations("register.fields");
  const hotel = HOTELS.find((h) => h.id === data.hotelChoice);
  return (
    <section className="container-edge mx-auto py-20 md:py-28">
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[var(--color-accent)] text-[var(--color-snow)] shadow-[0_8px_24px_-8px_rgba(244,180,28,0.6)]"
        >
          <Check className="h-6 w-6" strokeWidth={2.5} />
        </motion.div>

        <div className="mt-8 text-center">
          <h2 className="mt-3 font-display text-4xl md:text-5xl leading-[1.05] tracking-[-0.01em] text-[var(--color-ink)]">
            {t("successTitle")}
          </h2>
          <p className="mt-5 text-[var(--color-ink)]/70 leading-relaxed">{t("successBody")}</p>
        </div>

        <div className="mt-10 rounded-[var(--radius-md)] border border-[var(--color-line-strong)] bg-[var(--color-snow)] p-6 md:p-8">
          <div className="text-eyebrow text-[var(--color-ink)]/55">{t("successSummary")}</div>
          <h3 className="mt-2 font-display text-2xl">{data.clubName}</h3>
          <dl className="mt-4 grid gap-2 text-sm md:grid-cols-2">
            <SummaryRow k={tFields("country")} v={data.country} />
            <SummaryRow k={tFields("email")} v={data.email} />
            <SummaryRow k={tFields("categories")} v={data.categories.join(", ")} />
            <SummaryRow k={tStay("hotel")} v={hotel?.name ?? "-"} />
          </dl>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-[var(--radius-sm)] border border-[var(--color-ink)] px-6 py-3 text-[11px] uppercase tracking-[0.2em] text-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-snow)] transition-colors"
          >
            {t("backHome")}
          </Link>
          <Link
            href="/stay"
            className="inline-flex items-center gap-2 rounded-[var(--radius-sm)] bg-[var(--color-ink)] px-6 py-3 text-[11px] uppercase tracking-[0.2em] text-[var(--color-snow)] hover:bg-[var(--color-accent)] transition-colors"
          >
            {t("seeStay")} →
          </Link>
        </div>
      </div>
    </section>
  );
}

function SummaryRow({ k, v }: { k: string; v?: string | number | null }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-[var(--color-line)] py-2">
      <dt className="text-[var(--color-ink)]/55">{k}</dt>
      <dd className="text-right">{v || "-"}</dd>
    </div>
  );
}
