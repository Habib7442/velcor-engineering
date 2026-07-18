import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations/contact";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { success: false, errors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const { name, email, company, phone, service, message, honeypot } = parsed.data;

  // Honeypot tripped: pretend success so bots don't learn the field is monitored.
  if (honeypot) {
    return NextResponse.json({ success: true });
  }

  const supabase = createSupabaseServerClient();
  const { error } = await supabase.from("leads").insert({
    name,
    email,
    company: company || null,
    phone: phone || null,
    service_of_interest: service,
    message,
    source_page: "/contact",
  });

  if (error) {
    return NextResponse.json({ success: false, errors: { form: ["Something went wrong. Please try again."] } }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
