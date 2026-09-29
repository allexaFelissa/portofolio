"use client";

import { useState, type FormEvent } from "react";
import { CONTACT_FIELD_LIMITS, isValidEmail, validateField } from "@/lib/validation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PixelDither } from "@/components/visuals/PixelDither";
import { useLanguage } from "@/hooks/useLanguage";

type Values = { name: string; subject: string; email: string; message: string };
const empty: Values = { name: "", subject: "", email: "", message: "" };

export function Contact({ heading }: { heading: { eyebrow?: string; heading?: string } }) {
  const { language } = useLanguage();
  const id = language === "id";
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function submit(event: FormEvent) {
    event.preventDefault();
    const next: typeof errors = {};
    (Object.keys(values) as (keyof Values)[]).forEach(key => {
      const result = validateField(values[key], CONTACT_FIELD_LIMITS[key].min, CONTACT_FIELD_LIMITS[key].max);
      if (!result.valid) next[key] = id ? "Kolom ini wajib diisi dengan benar." : result.error;
    });
    if (!next.email && !isValidEmail(values.email.trim())) next.email = id ? "Masukkan alamat email yang valid." : "Enter a valid email address.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("loading");
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 30000);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
        signal: controller.signal,
      });
      if (!response.ok) throw new Error();
      setValues(empty);
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      clearTimeout(timer);
    }
  }

  const labels: Record<"name" | "subject" | "email", string> = id ? { name: "Nama", subject: "Subjek", email: "Email" } : { name: "Name", subject: "Subject", email: "Email" };

  return <section id="contacts" className="relative overflow-hidden bg-surface px-6 py-24 sm:py-32">
    <PixelDither density="strong" origin="bottom-right" drift="up" className="absolute -bottom-8 right-0 w-56 text-accent opacity-55" />
    <div id="contact" className="relative mx-auto max-w-2xl">
      <SectionHeading {...heading} centered className="mb-12" />
      <form onSubmit={submit} noValidate className="rounded-[1.5rem] border border-border bg-bg p-6 shadow-card sm:p-9">
        <h3 className="text-heading text-xl">{id ? "Kirim email secara langsung" : "Send an email directly"}</h3>
        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          {(["name", "subject", "email"] as const).map(key => <label key={key} className={key === "email" ? "sm:col-span-2" : ""}>
            <span className="mb-2 block text-sm font-semibold">{labels[key]}</span>
            <input name={key} type={key === "email" ? "email" : "text"} value={values[key]} onChange={event => setValues({ ...values, [key]: event.target.value })} aria-invalid={!!errors[key]} aria-describedby={`${key}-error`} className="w-full rounded-button border border-border bg-bg px-4 py-3 text-primary outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
            {errors[key] && <span id={`${key}-error`} className="mt-1 block text-xs text-red-600">{errors[key]}</span>}
          </label>)}
        </div>
        <label className="mt-5 block">
          <span className="mb-2 block text-sm font-semibold">{id ? "Pesan" : "Message"}</span>
          <textarea name="message" rows={6} value={values.message} onChange={event => setValues({ ...values, message: event.target.value })} aria-invalid={!!errors.message} aria-describedby="message-error" className="w-full resize-y rounded-button border border-border bg-bg px-4 py-3 text-primary outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
          {errors.message && <span id="message-error" className="mt-1 block text-xs text-red-600">{errors.message}</span>}
        </label>
        <input name="website" aria-label={id ? "Biarkan kolom ini kosong" : "Leave this field empty"} className="hidden" tabIndex={-1} autoComplete="off" />
        <button disabled={status === "loading"} className="mt-6 w-full rounded-button bg-primary px-5 py-3 font-bold text-bg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50">{status === "loading" ? (id ? "Mengirim…" : "Sending…") : (id ? "Kirim pesan" : "Send message")}</button>
        {status === "success" && <p role="status" className="mt-4 text-sm text-green-700">{id ? "Pesan berhasil dikirim." : "Message sent successfully."}</p>}
        {status === "error" && <p role="alert" className="mt-4 text-sm text-red-600">{id ? "Pesan tidak dapat dikirim. Teks Anda tetap tersimpan, silakan coba lagi." : "Message could not be sent. Keep your text and try again."}</p>}
      </form>
    </div>
  </section>;
}
