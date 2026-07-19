"use client";

import { useRef, useState } from "react";
import { CheckCircle2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { careerApplicationSchema, validateResumeFile, type CareerApplicationValues } from "@/lib/validations/careers";

const INITIAL_VALUES: CareerApplicationValues = {
  name: "",
  email: "",
  phone: "",
  roleOfInterest: "",
  message: "",
  honeypot: "",
};

type FieldErrors = Partial<Record<keyof CareerApplicationValues, string[]>> & {
  form?: string[];
  resume?: string[];
};

export function ResumeApplicationForm() {
  const [values, setValues] = useState<CareerApplicationValues>(INITIAL_VALUES);
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  function updateField<K extends keyof CareerApplicationValues>(field: K, value: CareerApplicationValues[K]) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0] ?? null;
    const fileError = validateResumeFile(selected);
    if (fileError) {
      setErrors((prev) => ({ ...prev, resume: [fileError] }));
      setFile(null);
      return;
    }
    setErrors((prev) => ({ ...prev, resume: undefined }));
    setFile(selected);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const parsed = careerApplicationSchema.safeParse(values);
    const fileError = validateResumeFile(file);

    if (!parsed.success || fileError || !file) {
      setErrors({
        ...(parsed.success ? {} : parsed.error.flatten().fieldErrors),
        ...(fileError ? { resume: [fileError] } : {}),
      });
      return;
    }

    setErrors({});
    setStatus("submitting");

    const formData = new FormData();
    Object.entries(parsed.data).forEach(([key, value]) => formData.append(key, value ?? ""));
    formData.append("resume", file);

    try {
      const response = await fetch("/api/careers/apply", { method: "POST", body: formData });
      const result = await response.json();

      if (!response.ok || !result.success) {
        setErrors(result.errors ?? {});
        setStatus("error");
        return;
      }

      setStatus("success");
      setValues(INITIAL_VALUES);
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <section id="apply" className="scroll-mt-24 bg-bone">
        <div className="mx-auto max-w-3xl px-6 py-14 sm:px-10 sm:py-16">
          <div className="flex flex-col items-start gap-3 rounded-2xl border border-border bg-white p-8">
            <CheckCircle2 className="size-8 text-petrol-700" aria-hidden="true" />
            <h3 className="font-heading text-xl font-semibold text-graphite">Application received.</h3>
            <p className="text-sm text-muted-foreground">
              Thanks for reaching out — we&apos;ll be in touch if there&apos;s a fit.
            </p>
            <Button variant="outline" onClick={() => setStatus("idle")}>
              Submit another application
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="apply" className="scroll-mt-24 bg-bone">
      <div className="mx-auto max-w-3xl px-6 py-14 sm:px-10 sm:py-16">
        <span className="text-xs font-medium tracking-wide text-petrol uppercase">Apply</span>
        <h2 className="font-heading mt-3 text-3xl leading-[1.15] font-semibold text-graphite sm:text-4xl">
          Send Us Your Resume
        </h2>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="mt-8 flex flex-col gap-5 rounded-2xl border border-border bg-white p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="e.g. Priya Sharma"
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
                placeholder="you@example.com"
                value={values.email}
                onChange={(e) => updateField("email", e.target.value)}
                aria-invalid={!!errors.email}
                required
              />
              {errors.email && <p className="text-xs text-destructive">{errors.email[0]}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Optional"
                value={values.phone}
                onChange={(e) => updateField("phone", e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="roleOfInterest">Role or area of interest</Label>
              <Input
                id="roleOfInterest"
                placeholder="e.g. Piping design, automation"
                value={values.roleOfInterest}
                onChange={(e) => updateField("roleOfInterest", e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Anything you'd like us to know — optional."
              value={values.message}
              onChange={(e) => updateField("message", e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="resume">Resume (PDF, DOC, or DOCX — max 5MB)</Label>
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="size-4" aria-hidden="true" />
                Choose File
              </Button>
              <span className="truncate text-sm text-muted-foreground">
                {file ? file.name : "No file chosen"}
              </span>
            </div>
            <input
              ref={fileInputRef}
              id="resume"
              type="file"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={handleFileChange}
              className="sr-only"
            />
            {errors.resume && <p className="text-xs text-destructive">{errors.resume[0]}</p>}
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
            {status === "submitting" ? "Submitting..." : "Submit Application"}
          </Button>
        </form>
      </div>
    </section>
  );
}
