import { NextResponse } from "next/server";
import { careerApplicationSchema, validateResumeFile } from "@/lib/validations/careers";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const RESUMES_BUCKET = "resumes";

function sanitizeFilename(filename: string): string {
  return filename.replace(/[^a-zA-Z0-9.\-_]/g, "_").slice(-100);
}

export async function POST(request: Request) {
  const formData = await request.formData().catch(() => null);
  if (!formData) {
    return NextResponse.json({ success: false, errors: { form: ["Invalid submission."] } }, { status: 400 });
  }

  // FormData.get() returns null for a field that wasn't sent at all,
  // not undefined -- normalize to "" so optional fields validate the
  // same way whether they were sent empty or omitted entirely.
  const parsed = careerApplicationSchema.safeParse({
    name: formData.get("name") ?? "",
    email: formData.get("email") ?? "",
    phone: formData.get("phone") ?? "",
    roleOfInterest: formData.get("roleOfInterest") ?? "",
    message: formData.get("message") ?? "",
    honeypot: formData.get("honeypot") ?? "",
  });

  if (!parsed.success) {
    return NextResponse.json(
      { success: false, errors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const { name, email, phone, roleOfInterest, message, honeypot } = parsed.data;

  // Honeypot tripped: pretend success so bots don't learn the field is monitored.
  if (honeypot) {
    return NextResponse.json({ success: true });
  }

  const resumeFile = formData.get("resume");
  const file = resumeFile instanceof File ? resumeFile : null;
  const fileError = validateResumeFile(file);
  if (fileError || !file) {
    return NextResponse.json({ success: false, errors: { resume: [fileError ?? "Attach your resume."] } }, { status: 400 });
  }

  const supabase = createSupabaseServerClient();
  const storagePath = `${crypto.randomUUID()}-${sanitizeFilename(file.name)}`;

  const { error: uploadError } = await supabase.storage.from(RESUMES_BUCKET).upload(storagePath, file, {
    contentType: file.type,
  });

  if (uploadError) {
    return NextResponse.json(
      { success: false, errors: { form: ["Could not upload resume. Please try again."] } },
      { status: 500 },
    );
  }

  const { error: insertError } = await supabase.from("job_applications").insert({
    name,
    email,
    phone: phone || null,
    role_of_interest: roleOfInterest || null,
    message: message || null,
    resume_path: storagePath,
    resume_filename: file.name,
  });

  if (insertError) {
    // Avoid an orphaned resume with no matching application record.
    await supabase.storage.from(RESUMES_BUCKET).remove([storagePath]);
    return NextResponse.json(
      { success: false, errors: { form: ["Something went wrong. Please try again."] } },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}
