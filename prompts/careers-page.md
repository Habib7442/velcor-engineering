# Prompt: Careers page (`/careers`) + resume upload backend

## Goal
Build the Careers page per PRD §4.5 (hero + EVP copy, open-roles empty state, benefits, application CTA), plus a working "Send Us Your Resume" form — name/email/phone/message + resume file upload — backed by a new Supabase table and a private Storage bucket.

## What it read
- `PRD.md` §4.5 (Careers spec — note: applicant form is explicitly listed under **v1.1**, not v1 MVP; v1 only requires a "mailto/form" empty-state fallback), §14 (release plan confirms the same phasing), §11 F-09/F-10 (Careers listing = Must, application form = Could/v1.1)
- `AGENTS.md` §3 (architecture — writes only through API routes, never client-side `supabase-js`), §5 (existing `leads`/`newsletter_subscribers` schema as the pattern to extend, not replace), §7 (security — server-only secrets)
- `app/api/contact/route.ts`, `lib/supabase/server.ts`, `lib/validations/contact.ts`, `components/sections/contact/ContactForm.tsx` — the existing working pattern (Zod schema, honeypot, service-role client, controlled form) this reuses
- `supabase/migrations/` — existing numbered-migration convention (`0001_create_leads.sql`, `0002_add_replied_to_leads.sql`)
- `supabase` skill (`.claude/skills/supabase`) — RLS section: enabling RLS with zero client-facing policies is sufficient when a table is only ever touched by the `service_role` key; same story applies to Storage, since `storage.objects` is RLS-governed like any other table, and a private bucket + service-role-only access means no policies are needed there either

## Decisions / assumptions
- **This is a deliberate acceleration of Phase 1.1 into v1**, per your explicit request. I'll update `PRD.md` §4.5 to note that the applicant form shipped early, rather than leaving the document contradicting what's actually live — same approach as documenting the Software Development sector addition earlier.
- **New table `job_applications`** (not reusing `leads` — a resume upload with a file reference is a structurally different record, mixing it into `leads` would make `leads` schema serve two unrelated purposes):
  ```sql
  create table if not exists job_applications (
    id uuid primary key default gen_random_uuid(),
    created_at timestamptz not null default now(),
    name text not null,
    email text not null,
    phone text,
    role_of_interest text,
    message text,
    resume_path text not null,
    resume_filename text not null,
    reviewed boolean not null default false
  );
  alter table job_applications enable row level security;
  -- no client-facing policies -- same posture as `leads`: only the
  -- service_role key (used server-side) can read/write this table.
  ```
  Includes `reviewed boolean default false`, mirroring the `leads.replied` column you asked for earlier, for the same manual-triage-in-the-table-editor workflow.
- **New private Storage bucket `resumes`** (`public: false`). Resumes are personal data (name, contact info, work history) — no public URLs, no client-side reads. Upload happens **server-side only**, through the API route using the service-role client, exactly mirroring how `leads` writes work. To view/download a resume, you'd do it from the Supabase Storage dashboard directly (authenticated as project owner) — consistent with AGENTS.md's "no admin UI, review directly in Supabase" rule.
- **File constraints**: PDF, DOC, or DOCX only; 5MB max. Enforced both client-side (immediate feedback) and server-side (the check that actually matters — client checks are bypassable, same principle as the contact form's honeypot/validation split).
- **Storage path**: `${crypto.randomUUID()}-${sanitized-original-filename}` — avoids collisions, avoids trusting user-supplied filenames as-is (path traversal / weird character risk), and the API route rejects the request entirely if the upload step fails rather than leaving an orphaned application row with no resume, or vice versa.
- **No captcha** — matches the decision already made for the contact form (honeypot only, for now).
- **No live job listings** — none provided, and PRD explicitly forbids fabricating them. The page ships the "designed empty state" PRD calls for, not fake postings.
- **Benefits section gets its own original copy**, distinct from `LifeAtVelcor.tsx` on the About page (which frames "how we work" for prospective clients) — here it's framed as employee value proposition (why work here), even though the underlying facts overlap (cross-disciplinary teams, direct ownership of projects).
- **Form submits as `multipart/form-data`**, not JSON (it carries a binary file) — `request.formData()` server-side, `FormData` client-side, unlike the JSON-based contact form.

## Files that will change
- **Create** `supabase/migrations/0003_create_job_applications.sql`
- **Create** `supabase/migrations/0004_create_resumes_bucket.sql`
- **Modify** `supabase/README.md` — document both new migrations
- **Create** `lib/validations/careers.ts` — Zod schema for the text fields (name, email, phone, role, message, honeypot); file validated separately (type/size, not a great Zod fit for `FormData` files)
- **Create** `app/api/careers/apply/route.ts`
- **Create** `components/sections/careers/{CareersHero,OpenRolesEmptyState,BenefitsSection,ResumeApplicationForm}.tsx`
- **Create** `app/careers/page.tsx`
- **Modify** `PRD.md` §4.5 — note the v1.1 acceleration

## Implementation requirements

**`app/api/careers/apply/route.ts`**
- Parse `await request.formData()`; extract text fields + the `resume` file entry.
- Validate text fields via the Zod schema; honeypot tripped → fake `200` success, no upload, no insert (same pattern as contact).
- Validate file: present, `type` is one of `application/pdf`, `application/msword`, `application/vnd.openxmlformats-officedocument.wordprocessingml.document`, `size <= 5 * 1024 * 1024`. Reject with a clear field error otherwise.
- Upload to the `resumes` bucket via the service-role client (`lib/supabase/server.ts`, already exists) at a generated path; on upload failure, return a `500` and do **not** insert a row.
- Insert into `job_applications` with the resulting storage path + original filename; on insert failure, best-effort delete the just-uploaded file (avoid orphaned resumes with no application record) and return `500`.
- Return `{ success: true }` or `{ success: false, errors: {...} }`.

**`ResumeApplicationForm`** (client component)
- Controlled inputs (name, email, phone, role — optional select or free text since no live roles exist, message optional), honeypot (same visually-hidden pattern as `ContactForm`), native `<input type="file" accept=".pdf,.doc,.docx">`.
- Client-side file check (type/size) before allowing submit, mirroring the server's rules so users get instant feedback instead of a round-trip.
- Submit builds a `FormData`, POSTs to `/api/careers/apply`, shows the same success/error/pending states pattern as `ContactForm`.

**`CareersHero`**: eyebrow, `<h1>Careers</h1>`, EVP paragraph (original copy — multidisciplinary work, direct project ownership, no fabricated "X open roles" or team-size claims).

**`OpenRolesEmptyState`**: designed empty state (icon + short copy: no open roles right now, but always interested in strong engineers) with a CTA that scrolls to the application form below — not a blank section, per PRD.

**`BenefitsSection`**: 3–4 short original benefit statements, EVP-framed, distinct wording from `LifeAtVelcor.tsx`.

**`app/careers/page.tsx`**: `buildMetadata({ title: "Careers | Velcor Engineering", path: "/careers" })`; renders all four sections in order. Exactly one `<h1>`.

## Security requirements
- `SUPABASE_SERVICE_ROLE_KEY` used only server-side (already enforced by `lib/supabase/server.ts`'s `import "server-only"`).
- Resume bucket is private; no signed URLs generated or returned to the client at any point in this flow.
- File type/size validated server-side regardless of client-side checks (bypassable).
- `job_applications` gets RLS enabled with zero client policies, same as `leads`.

## Acceptance criteria
- [ ] `/careers` renders hero, empty-state roles section, benefits, and the resume application form; exactly one `<h1>`.
- [ ] Submitting a valid application with a valid PDF/DOC/DOCX under 5MB succeeds, uploads to the private `resumes` bucket, and creates a matching `job_applications` row.
- [ ] Oversized or wrong-type files are rejected client-side (before upload attempt) and server-side (if the client check is bypassed).
- [ ] Honeypot-tripped submissions fake-succeed without uploading anything or writing a row.
- [ ] No resume is ever reachable via a public URL.
- [ ] `npm run typecheck` and `npm run lint` pass; `npm run build` succeeds.

## Checks to run
- `npm run typecheck`
- `npm run lint`
- `npm run build`

## What you'll need to do after I implement
Run the two new migrations in your Supabase SQL Editor (`0003_create_job_applications.sql`, `0004_create_resumes_bucket.sql`) — same manual process as the `leads` table and the `replied` column earlier.

## Manual test steps
1. After running the migrations: `npm run dev`, open `http://localhost:3000/careers`.
2. Confirm the empty-state roles section, benefits, and application form all render.
3. Try uploading a >5MB file or a `.txt` file — confirm it's rejected before submit.
4. Submit a valid application with a real small PDF — confirm success state, then check Supabase: a new `job_applications` row and a new object in the `resumes` bucket.
5. Confirm the resume isn't reachable via any public URL (bucket is private).
6. Resize to mobile — confirm the form and file input remain usable.
