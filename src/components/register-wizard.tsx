"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORIES, COUNTRIES, cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

const schema = z.object({
  clubName: z.string().min(2),
  city: z.string().min(2),
  country: z.string().min(2),
  contact: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(5),
  categories: z.array(z.string()).min(1),
  needsAccommodation: z.boolean(),
  rooms: z.number().int().min(0).optional(),
  nights: z.number().int().min(0).optional(),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export function RegisterWizard() {
  const t = useTranslations("register");
  const steps = (t.raw("steps") as string[]);
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { categories: [], needsAccommodation: false, rooms: 0, nights: 0 },
    mode: "onTouched",
  });

  const onSubmit = async (data: FormData) => {
    setStatus("sending");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const next = async () => {
    const fields: (keyof FormData)[][] = [
      ["clubName", "city", "country", "contact", "email", "phone"],
      ["categories"],
      ["needsAccommodation", "rooms", "nights"],
      [],
    ];
    const ok = await methods.trigger(fields[step]);
    if (ok) setStep((s) => Math.min(s + 1, steps.length - 1));
  };

  if (status === "success") return <SuccessScreen />;

  return (
    <section className="container-edge mx-auto py-16 md:py-24">
      {/* progress */}
      <div className="grid grid-cols-4 gap-2">
        {steps.map((label, i) => (
          <div key={label} className={cn("h-1 transition-colors", i <= step ? "bg-[var(--color-accent)]" : "bg-[var(--color-line-strong)]")} />
        ))}
      </div>
      <div className="mt-4 flex items-baseline justify-between text-eyebrow text-[var(--color-ink)]/55">
        <span>0{step + 1} / 0{steps.length}</span>
        <span className="font-display text-2xl text-[var(--color-ink)]">{steps[step]}</span>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="mt-10">
          <div className="relative min-h-[420px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                {step === 0 && <StepClub />}
                {step === 1 && <StepCategories />}
                {step === 2 && <StepAccommodation />}
                {step === 3 && <StepConfirm />}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-12 flex items-center justify-between border-t border-[var(--color-line-strong)] pt-6">
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(s - 1, 0))}
              disabled={step === 0}
              className="inline-flex items-center gap-2 rounded-[var(--radius-sm)] border border-[var(--color-ink)] px-5 py-3 text-[11px] uppercase tracking-[0.2em] disabled:opacity-30"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> {t("back")}
            </button>
            {step < steps.length - 1 ? (
              <button
                type="button"
                onClick={next}
                className="inline-flex items-center gap-2 rounded-[var(--radius-sm)] bg-[var(--color-accent)] px-6 py-3 text-[11px] uppercase tracking-[0.2em] text-[var(--color-snow)] hover:bg-[var(--color-ink)] transition-colors"
              >
                {t("next")} <ArrowRight className="h-3.5 w-3.5" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex items-center gap-2 rounded-[var(--radius-sm)] bg-[var(--color-ink)] px-6 py-3 text-[11px] uppercase tracking-[0.2em] text-[var(--color-snow)] hover:bg-[var(--color-accent)] transition-colors disabled:opacity-50"
              >
                {status === "sending" ? "…" : t("submit")} <Check className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {status === "error" && <p className="mt-6 text-sm text-[var(--color-accent)]">{t("error")}</p>}
        </form>
      </FormProvider>
    </section>
  );
}

function Field({ name, type = "text", children }: { name: keyof FormData; type?: string; children: React.ReactNode }) {
  const { register, formState: { errors } } = useFormContext<FormData>();
  return (
    <label className="block">
      <span className="text-eyebrow text-[var(--color-ink)]/55">{children}</span>
      <input
        type={type}
        {...register(name, type === "number" ? { valueAsNumber: true } : {})}
        className="mt-2 w-full rounded-[var(--radius-sm)] border border-[var(--color-line-strong)] bg-[var(--color-snow)] px-4 py-3 text-sm focus:border-[var(--color-accent)] outline-none"
      />
      {errors[name] && <span className="mt-1 block text-xs text-[var(--color-accent)]">required</span>}
    </label>
  );
}

function StepClub() {
  const t = useTranslations("register.fields");
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <Field name="clubName">{t("clubName")}</Field>
      <Field name="city">{t("city")}</Field>
      <Field name="country">{t("country")}</Field>
      <Field name="contact">{t("contact")}</Field>
      <Field name="email" type="email">{t("email")}</Field>
      <Field name="phone" type="tel">{t("phone")}</Field>
    </div>
  );
}

function StepCategories() {
  const t = useTranslations("register.fields");
  const { register, watch } = useFormContext<FormData>();
  const selected = watch("categories");
  return (
    <div>
      <div className="text-eyebrow text-[var(--color-ink)]/55">{t("categories")} — {selected.length}</div>
      <ul className="mt-6 grid grid-cols-2 gap-2 md:grid-cols-4">
        {CATEGORIES.map((c) => {
          const isOn = selected.includes(c.code);
          return (
            <li key={c.code}>
              <label className={cn("flex h-full cursor-pointer flex-col gap-2 rounded-[var(--radius-md)] border p-4 transition-all hover:-translate-y-1", isOn ? "border-[var(--color-accent)] bg-[var(--color-accent)]/8" : "border-[var(--color-line-strong)] bg-[var(--color-snow)]")}>
                <input type="checkbox" value={c.code} {...register("categories")} className="sr-only" />
                <span className="font-mono text-[11px] tracking-[0.2em] text-[var(--color-ink)]/55">{c.code}</span>
                <span className="font-display text-2xl">{c.label}</span>
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
  const { register, watch } = useFormContext<FormData>();
  const needs = watch("needsAccommodation");
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <label className="md:col-span-2 inline-flex items-center gap-3 rounded-[var(--radius-md)] border border-[var(--color-line-strong)] bg-[var(--color-snow)] px-5 py-4">
        <input type="checkbox" {...register("needsAccommodation")} className="accent-[var(--color-accent)]" />
        <span>{t("needsAccommodation")}</span>
      </label>
      {needs && (
        <>
          <Field name="rooms" type="number">{t("rooms")}</Field>
          <Field name="nights" type="number">{t("nights")}</Field>
        </>
      )}
      <label className="md:col-span-2">
        <span className="text-eyebrow text-[var(--color-ink)]/55">{t("notes")}</span>
        <textarea {...register("notes")} rows={5} className="mt-2 w-full rounded-[var(--radius-sm)] border border-[var(--color-line-strong)] bg-[var(--color-snow)] px-4 py-3 text-sm focus:border-[var(--color-accent)] outline-none" />
      </label>
    </div>
  );
}

function StepConfirm() {
  const t = useTranslations("register");
  const { watch } = useFormContext<FormData>();
  const v = watch();
  return (
    <div className="grid gap-3 rounded-[var(--radius-md)] border border-[var(--color-line-strong)] bg-[var(--color-snow)] p-8">
      <div className="text-eyebrow text-[var(--color-accent)]">{t("confirm.eyebrow")}</div>
      <h3 className="text-big text-[var(--color-ink)]">{v.clubName || "—"}</h3>
      <dl className="mt-4 grid gap-2 text-sm md:grid-cols-2">
        <Row k={t("fields.city")} v={v.city} />
        <Row k={t("fields.country")} v={v.country} />
        <Row k={t("fields.contact")} v={v.contact} />
        <Row k={t("fields.email")} v={v.email} />
        <Row k={t("fields.phone")} v={v.phone} />
        <Row k={t("fields.categories")} v={v.categories.join(", ")} />
        <Row k={t("fields.needsAccommodation")} v={v.needsAccommodation ? "✓" : "—"} />
        {v.needsAccommodation && <Row k={`${t("fields.rooms")} / ${t("fields.nights")}`} v={`${v.rooms} / ${v.nights}`} />}
      </dl>
    </div>
  );
}
function Row({ k, v }: { k: string; v?: string | number | null }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-[var(--color-line)] py-2">
      <dt className="text-[var(--color-ink)]/55">{k}</dt>
      <dd className="text-right">{v || "—"}</dd>
    </div>
  );
}
function SuccessScreen() {
  const t = useTranslations("register");
  return (
    <section className="container-edge mx-auto py-32 text-center">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-[var(--radius-md)] bg-[var(--color-accent)] text-[var(--color-snow)]">
        <Check className="h-7 w-7" />
      </div>
      <h2 className="mt-8 text-big text-[var(--color-ink)]">{t("success")}</h2>
    </section>
  );
}
