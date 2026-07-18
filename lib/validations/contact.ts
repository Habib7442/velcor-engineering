import { z } from "zod";

export const SERVICE_OPTIONS = [
  "Product Design",
  "Plant Engineering",
  "Software Development",
  "General Inquiry",
  "Quote Request",
] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name."),
  email: z.string().trim().email("Enter a valid email address."),
  company: z.string().trim().optional().or(z.literal("")),
  phone: z.string().trim().optional().or(z.literal("")),
  service: z.enum(SERVICE_OPTIONS, { message: "Select a service of interest." }),
  message: z.string().trim().min(10, "Message must be at least 10 characters."),
  honeypot: z.string().optional().or(z.literal("")),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
