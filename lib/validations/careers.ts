import { z } from "zod";

export const RESUME_MAX_BYTES = 5 * 1024 * 1024;

export const RESUME_ACCEPTED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
] as const;

export const careerApplicationSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name."),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z.string().trim().optional().or(z.literal("")),
  roleOfInterest: z.string().trim().optional().or(z.literal("")),
  message: z.string().trim().optional().or(z.literal("")),
  honeypot: z.string().optional().or(z.literal("")),
});

export type CareerApplicationValues = z.infer<typeof careerApplicationSchema>;

export function validateResumeFile(file: File | null): string | null {
  if (!file || file.size === 0) return "Attach your resume.";
  if (!RESUME_ACCEPTED_TYPES.includes(file.type as (typeof RESUME_ACCEPTED_TYPES)[number])) {
    return "Resume must be a PDF, DOC, or DOCX file.";
  }
  if (file.size > RESUME_MAX_BYTES) return "Resume must be under 5MB.";
  return null;
}
