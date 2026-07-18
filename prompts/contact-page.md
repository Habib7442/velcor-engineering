# Prompt: Contact page (`/contact`) — full form + Supabase + hCaptcha

## Goal
Build the Contact page per PRD §4.6: a working contact form (Name, Company, Email, Phone, Service of interest incl. "Quote Request", Message) with client + server validation, honeypot + hCaptcha spam protection, and a Supabase `leads` insert on success — plus a direct contact block (email, phone, address), an embedded Google Map, and social links. Also complete the Footer's still-missing "Contact block" (§3.1) now that real company facts exist, resolving PRD §16 open question #2.

## What it read
- `AGENTS.md` §3 (architecture — forms/API contract split), §5 (`leads` schema), §6 (API contract), §7 (security — service role key server-only, ask before wiring captcha), §8 (code standards)
- `PRD.md` §3.1 (footer contact block), §4.6 (Contact spec + acceptance), §6.3 (company facts single source), §7 (conversion paths), §11 F-05/F-06 (form + quote path), §13 (legal/consent), §16 open question #2 (target geography — now answered)
- `.env.local` — only `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` is set; **no `NEXT_PUBLIC_SUPABASE_URL`, no `SUPABASE_SERVICE_ROLE_KEY`, no hCaptcha keys**
- `package.json` — no `@supabase/supabase-js`, `zod`, or any hCaptcha package installed yet
- `components/layout/Footer.tsx` — confirmed it still has no contact block (deferred earlier specifically because these facts were unknown)
- User-supplied facts this session: address `331, Khola Pt II, Sribhumi, Assam, 788701, India`, mobile `9957882204`, and a Google Maps embed iframe for that location

## Decisions / assumptions
- **Scope confirmed by you:** wire the real backend now (Supabase insert + hCaptcha), not just a UI stub.
- **hCaptcha** is the chosen provider (your pick over reCAPTCHA).
- **You'll need to supply 4 real values after I implement** — I can write fully correct code against `process.env.*`, but I can't fabricate working secrets:
  - `NEXT_PUBLIC_SUPABASE_URL` — from your Supabase project settings.
  - `SUPABASE_SERVICE_ROLE_KEY` — same place; **server-only**, never exposed to the browser (AGENTS.md §7).
  - `NEXT_PUBLIC_HCAPTCHA_SITE_KEY` — public site key from hcaptcha.com.
  - `HCAPTCHA_SECRET_KEY` — server-only secret, used to verify tokens via hCaptcha's `siteverify` endpoint.
  - I'll also give you the exact `CREATE TABLE` SQL for `leads` (matching AGENTS.md §5) to run in the Supabase SQL editor, since I can't confirm the table already exists without project access.
- **Company facts centralized in `lib/data/company.ts`** — single source of truth per §6.3, consumed by both the Contact page and the Footer, so the two can never drift out of sync (the exact failure mode §4.6's acceptance criterion warns about).
- **One address, not two.** PRD §3.1/§6.3 ask for operational + registered addresses labeled separately; only one address was provided. Using it as a single labeled "Address" rather than inventing a second one.
- **Phone formatting:** stored/linked as `+919957882204` (tel: link, E.164), displayed as `+91 99578 82204`.
- **PRD §4.6's acceptance criterion says the form "sends email to Velcor inbox."** AGENTS.md's architecture (§3, §6) only specifies a Supabase insert — no email/notification provider is in the approved tech stack (§4), and §7 only lists Supabase + captcha secrets as things to protect, not an email API key. Adding transactional email (Resend/SendGrid/SES) would mean another credential we don't have and isn't in AGENTS.md's stack list. **Skipping email delivery for this pass** — leads land in the Supabase `leads` table, reviewed directly in the table editor (exactly how AGENTS.md §2 says leads should be reviewed — "no admin UI... review submissions directly in the Supabase table editor"). Flagging this gap explicitly rather than silently dropping the PRD line; can revisit if you want email notifications added as a follow-up.
- **Map:** the provided iframe's fixed `width="600" height="450"` doesn't scale well on mobile. Rendering it in a responsive `aspect-video`-ish container (`w-full`, fixed height per breakpoint) instead, keeping `loading="lazy"` and `referrerPolicy`, and adding a `title` attribute (currently missing — needed for a11y, PRD §8.4).
- **Service-of-interest dropdown options:** "Product Design", "Plant Engineering", "Software Development" (mirrors the site's actual service lines, including the sector we added earlier), "General Inquiry", and "Quote Request" (required by §4.6).
- **Form implementation stays dependency-light:** plain controlled inputs + `useState` (no `react-hook-form` — nothing in the codebase uses a form library yet, and one field set doesn't justify adding one). Zod schema shared between client (`safeParse` before submit) and server (re-validated in the API route — AGENTS.md §3: "the API route re-validates... spam checks and validation can't be bypassed").
- **`@hcaptcha/react-hcaptcha`** added as a new dependency — it's small, handles script loading/cleanup correctly, and is safer than hand-rolling hCaptcha's script tag.

## Files that will change
- **Create** `lib/data/company.ts` — name, tagline, email, phone (display + tel href), address, Google Maps embed URL, map iframe title
- **Create** `lib/validations/contact.ts` — Zod schema (name, email, company optional, phone optional, service enum incl. "Quote Request", message, honeypot field, hCaptcha token)
- **Create** `lib/supabase/server.ts` — server-only Supabase client factory using the service role key (never imported by client components)
- **Create** `app/api/contact/route.ts` — validates payload, checks honeypot, verifies hCaptcha token server-side via `https://hcaptcha.com/siteverify`, inserts into `leads`, returns success or field-level errors
- **Create** `components/sections/contact/ContactHero.tsx`
- **Create** `components/sections/contact/ContactForm.tsx` (client component)
- **Create** `components/sections/contact/ContactInfo.tsx` (contact block + social icons)
- **Create** `components/sections/contact/ContactMap.tsx`
- **Create** `app/contact/page.tsx`
- **Modify** `components/layout/Footer.tsx` — add the Contact block (email, phone, address) using `lib/data/company.ts`
- **Modify** `PRD.md` §16 — mark open question #2 as resolved with the real address/phone
- **Install** `zod`, `@supabase/supabase-js`, `@hcaptcha/react-hcaptcha`

## Implementation requirements

**`lib/data/company.ts`**
```ts
export const company = {
  name: "Velcor Engineering",
  email: "info@velcorengineering.com",
  phone: { display: "+91 99578 82204", href: "tel:+919957882204" },
  address: "331, Khola Pt II, Sribhumi, Assam, 788701, India",
  mapEmbedUrl: "<the provided Google Maps embed src>",
  mapTitle: "Velcor Engineering — office location",
};
```

**`lib/validations/contact.ts`**
- `z.object({ name: z.string().min(2), email: z.string().email(), company: z.string().optional(), phone: z.string().optional(), service: z.enum([...]), message: z.string().min(10), honeypot: z.string().max(0), captchaToken: z.string().min(1) })`.

**`app/api/contact/route.ts`**
- `POST` handler: parse JSON body, `schema.safeParse`; on failure return `400` with field errors.
- If `honeypot` is non-empty, return a **fake success** (`200`) without inserting — standard honeypot behavior, don't tip off bots.
- Verify `captchaToken` via a server-side `fetch` to `https://hcaptcha.com/siteverify` with `secret=process.env.HCAPTCHA_SECRET_KEY`; on failure return `400`.
- Insert into `leads` via the server Supabase client (`name`, `email`, `company`, `phone`, `service_of_interest: service`, `message`, `source_page: "/contact"`); never insert if `name`/`email`/`service_of_interest`/`message` are missing (AGENTS.md §5).
- Return `{ success: true }` or `{ success: false, errors: {...} }`.

**`ContactForm`**
- Controlled inputs for all fields; hidden honeypot input (visually hidden, not `display:none` — real bots skip `display:none` detection sometimes, but a visually-hidden-off-screen text input is the more robust honeypot pattern) with a human-irrelevant name like `website`.
- hCaptcha widget via `@hcaptcha/react-hcaptcha`, `sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY}`.
- On submit: client-side `safeParse`, show field errors inline; POST to `/api/contact`; show a success state (checkmark + confirmation copy) or a server error message; disable the submit button while pending.
- Service dropdown uses the existing `Button`/native `<select>` styled to match the design system (no dropdown primitive currently in `components/ui/`, so a styled native `<select>` — simplest, fully accessible, no new dependency).

**`ContactInfo`**
- Email (`mailto:`), phone (`tel:`), address as plain text — all from `lib/data/company.ts`.
- Reuses the same social-icon row pattern already in `Footer.tsx` (Facebook/Instagram/LinkedIn/WhatsApp, no links, per the earlier established decision — still no verified profile URLs).

**`ContactMap`**
- Responsive wrapper (`w-full`, `h-80 sm:h-96`, `rounded-2xl overflow-hidden`), iframe `className="h-full w-full border-0"`, `title={company.mapTitle}`, `loading="lazy"`, `referrerPolicy="strict-origin-when-cross-origin"`.

**`app/contact/page.tsx`**
- `buildMetadata({ title: "Contact Velcor Engineering | ...", path: "/contact" })`.
- Renders `ContactHero`, then a two-column section (`ContactForm` left, `ContactInfo` right), then `ContactMap` full-width below.
- Exactly one `<h1>` (in `ContactHero`).

**`Footer.tsx`**
- Add a "Contact" column: email, phone, address from `lib/data/company.ts`, positioned alongside the existing logo/nav columns.

## Security requirements
- `SUPABASE_SERVICE_ROLE_KEY` and `HCAPTCHA_SECRET_KEY` used **only** in `app/api/contact/route.ts` and `lib/supabase/server.ts` — never imported into a client component, never prefixed `NEXT_PUBLIC_`.
- The UI never calls `supabase-js` directly; all writes go through `/api/contact` (AGENTS.md §3).
- Server re-validates everything the client already validated — a bypassed/scripted client-side call still can't skip honeypot/captcha/Zod checks.

## Acceptance criteria
- [ ] `/contact` renders hero, form, contact info, and map; exactly one `<h1>`.
- [ ] Submitting valid data with a filled honeypot silently "succeeds" without a DB row (verify by checking Supabase after testing).
- [ ] Submitting without solving the captcha is rejected server-side even if the client check is bypassed (test via direct `curl`/fetch to `/api/contact`).
- [ ] A valid submission (once you've added real env vars) creates a row in `leads` with all required fields populated.
- [ ] Footer now shows the same email/phone/address as the Contact page (§4.6 acceptance: "addresses identical to footer/About").
- [ ] No `SUPABASE_SERVICE_ROLE_KEY` or `HCAPTCHA_SECRET_KEY` appears in any client bundle (grep build output).
- [ ] `npm run typecheck` and `npm run lint` pass; `npm run build` succeeds.

## Checks to run
- `npm run typecheck`
- `npm run lint`
- `npm run build`

## What you'll need to do after I implement
1. Add to `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=...
   SUPABASE_SERVICE_ROLE_KEY=...
   NEXT_PUBLIC_HCAPTCHA_SITE_KEY=...
   HCAPTCHA_SECRET_KEY=...
   ```
2. Run this in your Supabase SQL editor if the table doesn't exist yet:
   ```sql
   create table leads (
     id uuid primary key default gen_random_uuid(),
     created_at timestamptz default now(),
     name text not null,
     email text not null,
     company text,
     phone text,
     service_of_interest text not null,
     message text not null,
     source_page text
   );
   ```
3. Restart `npm run dev` so the new env vars load.

## Manual test steps
1. After adding real env vars: `npm run dev`, open `http://localhost:3000/contact`.
2. Fill the form with valid data, solve the captcha, submit — confirm the success state renders and a row appears in Supabase's `leads` table.
3. Submit with an invalid email — confirm inline field error, no request sent.
4. Confirm the map renders and is draggable/zoomable.
5. Confirm the Footer and Contact page show identical email/phone/address.
6. Resize to mobile — confirm the form/info columns stack and the map stays full-width and legible.
