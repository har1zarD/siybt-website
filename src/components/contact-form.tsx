"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Check, Send } from "lucide-react";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(2),
  message: z.string().min(10),
});

type Form = z.infer<typeof schema>;

export function ContactForm() {
  const t = useTranslations("contact.form");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Form>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: Form) => {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("ok");
      reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "ok") {
    return (
      <div className="rounded-[var(--radius-md)] border border-[var(--color-line-strong)] bg-[var(--color-snow)] p-12 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-[var(--radius-md)] bg-[var(--color-accent)] text-[var(--color-snow)]">
          <Check className="h-6 w-6" />
        </div>
        <h3 className="mt-6 text-big text-[var(--color-ink)]">{t("success")}</h3>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 rounded-[var(--radius-md)] border border-[var(--color-line-strong)] bg-[var(--color-snow)] p-8 md:grid-cols-2">
      {(["name", "email", "subject"] as const).map((k) => (
        <label key={k} className={k === "subject" ? "md:col-span-2" : ""}>
          <span className="text-eyebrow text-[var(--color-ink)]/55">{t(k)}</span>
          <input
            type={k === "email" ? "email" : "text"}
            {...register(k)}
            className="mt-2 w-full rounded-[var(--radius-sm)] border border-[var(--color-line-strong)] bg-[var(--color-paper)] px-4 py-3 text-sm focus:border-[var(--color-accent)] outline-none"
          />
          {errors[k] && <span className="mt-1 block text-xs text-[var(--color-accent)]">required</span>}
        </label>
      ))}
      <label className="md:col-span-2">
        <span className="text-eyebrow text-[var(--color-ink)]/55">{t("message")}</span>
        <textarea
          rows={6}
          {...register("message")}
          className="mt-2 w-full rounded-[var(--radius-sm)] border border-[var(--color-line-strong)] bg-[var(--color-paper)] px-4 py-3 text-sm focus:border-[var(--color-accent)] outline-none"
        />
        {errors.message && <span className="mt-1 block text-xs text-[var(--color-accent)]">required</span>}
      </label>
      <button
        type="submit"
        disabled={status === "sending"}
        className="md:col-span-2 mt-2 inline-flex items-center justify-center gap-2 rounded-[var(--radius-sm)] bg-[var(--color-accent)] px-6 py-3.5 text-[11px] uppercase tracking-[0.2em] text-[var(--color-snow)] hover:bg-[var(--color-ink)] transition-colors disabled:opacity-50"
      >
        {status === "sending" ? "…" : t("submit")} <Send className="h-3.5 w-3.5" />
      </button>
      {status === "error" && <p className="md:col-span-2 text-sm text-[var(--color-accent)]">{t("error")}</p>}
    </form>
  );
}
