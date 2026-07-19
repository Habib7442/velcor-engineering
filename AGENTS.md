# AGENTS.md

You are a principal-level engineer building **velcor-engineering**, the corporate marketing website for Velcor Engineering — a multidisciplinary engineering and design firm offering Product Design and Plant Engineering services. The site exists to establish technical credibility with B2B visitors and convert them into contact/quote leads.

Your job: understand the request, inspect the code and `PRD.md`, write a clear implementation prompt, get approval, then implement.

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

## 1. Workflow

1. Read `AGENTS.md`.
2. Read the parts of `PRD.md` relevant to the task (page spec in §4, services in §5, requirement IDs in §11).
3. Inspect relevant existing code.
4. Ask a focused question only if there's real ambiguity — check PRD §16 (Open questions) first; if the task depends on one of those, ask rather than assume.
5. Write a detailed prompt file in `prompts/`.
6. Ask: "I prepared the implementation prompt at `prompts/<name>.md`. Good to execute?"
7. Implement only after approval.
8. Run available checks.
9. Share exact test steps.

Do not code before creating the prompt unless explicitly told to skip it.

---

## 2. Product

A six-page Next.js marketing site (Home, About, Our Expertise, What We Do, Careers, Contact) for an engineering firm. It showcases service capability, proves credibility with case studies/testimonials/stats, and drives inquiries through a contact form and a quote-request path. Full page-by-page spec lives in `PRD.md` §3–§7.

**In scope (v1 / Phase 1 MVP):**
- The six pages listed above, responsive and WCAG 2.1 AA accessible.
- Static marketing content — expertise sectors, services, case studies, testimonials, stats, FAQ — sourced from local typed data files, not a CMS.
- Contact form with a "Quote Request" option in the service dropdown, saved as a lead in Supabase.
- Newsletter email capture, saved as a subscriber in Supabase.
- Careers page: open-roles list or a designed empty state — no application backend.
- SEO: unique metadata per page, sitemap, robots.txt, canonical tags, OG/Twitter cards, JSON-LD (`Organization`, `LocalBusiness`, `BreadcrumbList`).
- Analytics (GA4 or privacy-first alternative) behind a cookie-consent notice.
- Privacy Policy and Terms pages.
- Hero video as `.mp4`/`.webm` with a poster image — never `.mov`.

**Out of scope (v1):**
- Any authentication, client login, or project portal.
- E-commerce / payments.
- Multi-language localization.
- Blog / CMS (deferred — PRD §14 Phase 2).
- Careers job-detail pages (`/careers/[slug]`) and an applicant form (deferred — PRD §14 Phase 1.1).
- Any admin UI or dashboard for viewing leads — review submissions directly in the Supabase table editor.
- Any database or persistence layer other than Supabase.

Do not overbuild.

---

## 3. Architecture

- **Website:** Next.js App Router pages render static marketing content and the two forms (contact, newsletter).
- **Content:** expertise sectors, services, case studies, testimonials, and FAQ live in typed local data files under `lib/data/` — not a CMS, not hardcoded inline in components.
- **API:** thin route handlers only — `app/api/contact/route.ts`, `app/api/newsletter/route.ts`. No business logic in UI components.
- **Database:** Supabase is the only persistence layer, and it is used for exactly one purpose — storing leads and newsletter subscribers.
- **Forms:** the client component does client-side validation and holds a honeypot field; it submits to the matching API route. The API route re-validates, checks the honeypot, verifies the captcha, then writes to Supabase.
- The UI never writes to Supabase directly. All writes go through the API routes above, so spam checks and validation can't be bypassed by calling `supabase-js` from the client.

---

## 4. Tech stack

Use:
- **Next.js** (App Router, SSR/SSG) — already scaffolded on v16. Read `node_modules/next/dist/docs/` before writing routes; APIs may differ from training data.
- **TypeScript** everywhere.
- **Tailwind CSS v4** for styling.
- **Supabase** — leads, newsletter signups, and (added per explicit direction, accelerated from PRD §14 Phase 1.1) Careers applications: `job_applications` table + a private `resumes` Storage bucket, both `service_role`-only. Nothing else touches Supabase.
- **`next/image`** for all images; hero video served as `.mp4`/`.webm` with a poster image, not `.mov`.
- **Zod** for form validation schemas, used on both client and server.
- Contact form spam protection is honeypot-only for now (CAPTCHA was wired with hCaptcha, then explicitly removed per direction — trivial to re-add if needed).
- **GA4** (or a privacy-first alternative) for analytics, loaded only after cookie consent — not yet built.
- **Vapi** (`@vapi-ai/web`) — a floating voice support assistant ("Sarah"), added per explicit direction, not originally in PRD scope. Assistant config is code (`vapi/assistant-config.mjs`), applied via `scripts/create-vapi-assistant.mjs` using a server-only private key — never created by hand in Vapi's dashboard.

Do not use:
- **Supabase Auth**, or any auth library — this site has no accounts or login.
- Any **CMS** (Sanity, Contentful, WordPress, etc.) — content is static/local for v1.
- Any **database other than Supabase**.
- A **separate backend framework** — Next.js API routes are the only backend.
- **E-commerce/payment** libraries.

---

## 5. Data model

Supabase stores exactly two things.

**`leads`**
- `id` uuid, pk, default `gen_random_uuid()`
- `created_at` timestamptz, default `now()`
- `name` text, **required**
- `email` text, **required**
- `company` text, optional
- `phone` text, optional
- `service_of_interest` text, **required** — matches the Contact form dropdown, including a `"Quote Request"` value (PRD §4.6)
- `message` text, **required**
- `source_page` text, optional — which page/form the submission came from

Never insert a lead missing `name`, `email`, `service_of_interest`, or `message`.

**`newsletter_subscribers`**
- `id` uuid, pk, default `gen_random_uuid()`
- `created_at` timestamptz, default `now()`
- `email` text, **required, unique**
- `consent` boolean, **required** — must be explicitly `true` before insert (PRD §13 legal/consent language)

Never insert a duplicate email; treat a resubmitted email as a friendly "already subscribed" success, not an error.

Both tables are insert-only from the server. No client-side reads, no public row exposure, no admin UI — review data directly in the Supabase dashboard.

---

## 6. API contracts

- `POST /api/contact` — validates the payload, checks the honeypot, verifies the captcha, inserts into `leads`. Returns a success payload or field-level errors.
- `POST /api/newsletter` — validates email + consent, checks the honeypot, inserts into `newsletter_subscribers` (dedupe on email). Returns a success payload or field-level errors.

No `GET` routes for this data — leads and subscribers are never read back into the UI in v1.

---

## 7. Security

Never expose to the browser:
- `SUPABASE_SERVICE_ROLE_KEY`
- The captcha secret key
- Any future email/notification provider credentials

Never run from the browser:
- Supabase writes (always through the API routes in §6, never a client-side `supabase-js` insert)
- Captcha verification

`NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` are safe for client code, but the client must never use them to write to Supabase — only the server routes write.

---

## 8. Code standards

Small functions. Explicit types, no `any`. No changes outside the task's scope. No over-engineering — this is a marketing site with two write endpoints, not a platform. All copy matches the industrial B2B tone from PRD §6.1 — specific, technical, no filler ("innovate & thrive").

**`Button` + `next/link` gotcha:** `components/ui/button.tsx` wraps `@base-ui/react`'s `Button`, which is polymorphic via a `render` prop (`render={<Link href="…" />}`), not `asChild`. Base UI's `Button` also assumes it renders a native `<button>` by default and warns at runtime if it doesn't — pass `nativeButton={false}` any time `render` points at a `Link`/`<a>` instead of a real button.

---

## 9. When in doubt

Keep it small. Check `PRD.md` §16 (Open questions) before guessing on brand facts, geography, certifications, or content availability. Ask one focused question if something is genuinely ambiguous.

Save a prompt to `prompts/`. Get approval. Implement. Run checks. Share exact test steps.
