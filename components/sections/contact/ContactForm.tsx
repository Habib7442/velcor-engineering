"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { contactSchema, SERVICE_OPTIONS, type ContactFormValues } from "@/lib/validations/contact";
import { COUNTRY_CODES } from "@/lib/data/country-codes";

const INITIAL_VALUES: ContactFormValues = {
  name: "",
  email: "",
  company: "",
  phone: "",
  service: "General Inquiry",
  message: "",
  honeypot: "",
};

const DEFAULT_DIAL_CODE = "+91";

function isoToFlagEmoji(iso: string) {
  return iso
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
}

type FieldErrors = Partial<Record<keyof ContactFormValues, string[]>> & { form?: string[] };

export function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(INITIAL_VALUES);
  const [dialCode, setDialCode] = useState(DEFAULT_DIAL_CODE);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  function updateField<K extends keyof ContactFormValues>(field: K, value: ContactFormValues[K]) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const combinedPhone = phoneNumber.trim() ? `${dialCode} ${phoneNumber.trim()}` : "";
    const payload = { ...values, phone: combinedPhone };

    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      setErrors(parsed.error.flatten().fieldErrors);
      return;
    }

    setErrors({});
    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        setErrors(result.errors ?? {});
        setStatus("error");
        return;
      }

      setStatus("success");
      setValues(INITIAL_VALUES);
      setPhoneNumber("");
      setDialCode(DEFAULT_DIAL_CODE);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-start gap-3 rounded-2xl border border-border bg-white p-8">
        <CheckCircle2 className="size-8 text-petrol-700" aria-hidden="true" />
        <h3 className="font-heading text-xl font-semibold text-graphite">Message sent.</h3>
        <p className="text-sm text-muted-foreground">
          Thanks for reaching out — we&apos;ll get back to you shortly.
        </p>
        <Button variant="outline" onClick={() => setStatus("idle")}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-5 rounded-2xl border border-border bg-white p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="e.g. John Carter"
            value={values.name}
            onChange={(e) => updateField("name", e.target.value)}
            aria-invalid={!!errors.name}
            required
          />
          {errors.name && <p className="text-xs text-destructive">{errors.name[0]}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@company.com"
            value={values.email}
            onChange={(e) => updateField("email", e.target.value)}
            aria-invalid={!!errors.email}
            required
          />
          {errors.email && <p className="text-xs text-destructive">{errors.email[0]}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            placeholder="Your company name"
            value={values.company}
            onChange={(e) => updateField("company", e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="phone">Phone</Label>
          <div className="flex gap-2">
            <Select
              id="phone-dial-code"
              aria-label="Country code"
              className="w-[7.5rem] shrink-0"
              value={dialCode}
              onChange={(e) => setDialCode(e.target.value)}
            >
              {COUNTRY_CODES.map((country) => (
                <option key={`${country.iso}-${country.dial}`} value={country.dial}>
                  {isoToFlagEmoji(country.iso)} {country.dial}
                </option>
              ))}
            </Select>
            <Input
              id="phone"
              type="tel"
              placeholder="98765 43210"
              className="flex-1"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="service">Service of interest</Label>
        <Select
          id="service"
          value={values.service}
          onChange={(e) => updateField("service", e.target.value as ContactFormValues["service"])}
        >
          {SERVICE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          placeholder="Tell us about your project, timeline, and any specs you already have."
          value={values.message}
          onChange={(e) => updateField("message", e.target.value)}
          aria-invalid={!!errors.message}
          required
        />
        {errors.message && <p className="text-xs text-destructive">{errors.message[0]}</p>}
      </div>

      {/* Honeypot: visually hidden from sighted users, still reachable by bots that ignore CSS */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={values.honeypot}
          onChange={(e) => updateField("honeypot", e.target.value)}
        />
      </div>

      {errors.form && <p className="text-sm text-destructive">{errors.form[0]}</p>}

      <Button type="submit" size="lg" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
