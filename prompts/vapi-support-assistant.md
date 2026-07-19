# Prompt: Vapi voice support assistant ("Sarah")

## Goal
Add a site-wide floating voice assistant (Vapi Web SDK) that can answer visitor questions about Velcor Engineering — services, sectors, process, contact info — using a comprehensive system prompt built from the real site content already written (no invented facts). Assistant name: **Sarah**.

## What it read
- `https://docs.vapi.ai/quickstart/web` (fetched live) — confirmed: `@vapi-ai/web` npm package, `new Vapi(publicKey)` client init, `vapi.start(assistantId)`/`vapi.stop()`, event listeners (`call-start`, `call-end`, `message`). Assistant creation (system prompt, voice, model) happens via Vapi's **server-side** API using a **private** key — never in client code.
- `lib/data/company.ts`, `lib/data/sectors.ts`, `lib/data/product-design.ts`, `lib/data/plant-engineering.ts`, `components/sections/Faq.tsx` — the real content this assistant's knowledge is built from.
- `.env.local` — no Vapi keys present yet.
- `supabase/README.md` / `supabase/migrations/` — the pattern this reuses: a version-controlled config as source of truth, applied via a one-time script you run with your own credentials, rather than manual dashboard clicking.

## Decisions / assumptions
- **You'll need a Vapi account and two keys** — same situation as hCaptcha earlier, I can write fully correct code against env vars but can't fabricate working credentials:
  - `NEXT_PUBLIC_VAPI_PUBLIC_KEY` — safe client-side, initializes the widget.
  - `VAPI_PRIVATE_API_KEY` — server-only, used **once** by a setup script to create the assistant, never committed, never shipped to the browser.
  - After running the setup script, you'll get an `assistantId` to add as `NEXT_PUBLIC_VAPI_ASSISTANT_ID` (assistant IDs are not secret — they're meant to be referenced client-side, same as a Stripe price ID).
- **Assistant config lives in the repo as data (`vapi/assistant-config.ts`)**, not typed into Vapi's dashboard UI — mirrors the `supabase/migrations/` pattern: the system prompt, voice, and model are version-controlled and reviewable, not a one-off manual click-through that's invisible to git history. A one-time script (`scripts/create-vapi-assistant.mjs`) reads this config and POSTs it to Vapi's API using your private key.
- **Model/voice defaults**: `gpt-4o` (OpenAI) for the model, ElevenLabs voice ID `21m00Tcm4TlvDq8ikWAM` ("Rachel") — this is Vapi's own documented example voice, a known-good professional-sounding default, not a guess. Easy to swap later by editing the config and re-running the script (it upserts by assistant name).
- **System prompt is built entirely from real, already-written site content** — company facts, all 13 sectors (with their real descriptions), Product Design's 7 items, Plant Engineering's 5 disciplines, and the 6 FAQ answers already on Home. No fabricated certifications, case studies, pricing, or guaranteed timelines — the assistant is explicitly instructed to say scope/pricing/timeline questions need a scoping call via Contact, matching how the site itself already handles that (FAQ answer #3).
- **Guardrails in the system prompt**: stay on topic (Velcor's services); never invent certifications, past clients, or case studies (none exist yet, per PRD §16); never quote firm prices or delivery dates; redirect quote/project requests to the Contact page and job-seekers to the Careers page; keep responses conversational-length (voice, not a wall of text).
- **Widget placement**: a floating action button, fixed bottom-right, site-wide (rendered in `app/layout.tsx` alongside `Preloader`/`Header`/`Footer`) — same "always available" pattern as a typical chat widget. `z-[90]` (below the preloader's `z-[100]`, above everything else including the header's `z-50`).
- **Scope, not visual richness, for v1**: button toggles call state (idle → connecting → listening → idle), with a small pulsing indicator while live and a visible "End Call" affordance. No full transcript UI yet — that's a reasonable v2 addition once the core flow is proven, not required for "answer visitor questions."
- **This is new scope beyond AGENTS.md's current tech stack** (which doesn't mention Vapi) — same situation as the Software Development sector and the accelerated Careers upload form. Worth a short note added to `AGENTS.md` §4 once this ships, so the stack list stays accurate.

## Files that will change
- **Install** `@vapi-ai/web`
- **Create** `vapi/assistant-config.ts` — the assistant definition (name, first message, system prompt, model, voice)
- **Create** `scripts/create-vapi-assistant.mjs` — one-time setup script (reads the config, calls Vapi's REST API with `VAPI_PRIVATE_API_KEY`, prints the resulting `assistantId`)
- **Create** `components/VapiAssistant.tsx` — the floating widget (client component)
- **Modify** `app/layout.tsx` — render `<VapiAssistant />`
- **Modify** `AGENTS.md` §4 — note Vapi as an added-scope voice assistant provider

## Implementation requirements

**`vapi/assistant-config.ts`**
- Exports a plain object: `{ name: "Sarah", firstMessage: "...", model: { provider: "openai", model: "gpt-4o", temperature: 0.5, messages: [{ role: "system", content: SYSTEM_PROMPT }] }, voice: { provider: "11labs", voiceId: "21m00Tcm4TlvDq8ikWAM" } }`.
- `SYSTEM_PROMPT` (drafted from real content — final wording refined during implementation, but covering exactly this, nothing invented):
  - Identity: "You are Sarah, the voice support assistant for Velcor Engineering, a multidisciplinary product design and plant engineering firm."
  - Company facts: name, email, phone, address (from `lib/data/company.ts`).
  - Services overview: Product Design (7 items from `lib/data/product-design.ts`, one line each) + Plant Engineering (5 disciplines from `lib/data/plant-engineering.ts`, discipline names + a couple of representative deliverables each — not the full exhaustive lists, too long for voice).
  - Sectors: all 13 from `lib/data/sectors.ts` by name, with a short phrase each.
  - Process/engagement/timeline/standards answers: condensed from the 6 FAQ answers already in `components/sections/Faq.tsx`.
  - Careers: no open roles currently; can direct interested engineers to send a resume via the Careers page.
  - Explicit boundaries: no invented certifications/case studies/client names (state honestly that Velcor is a newly established firm if asked); no firm quotes on price or delivery date — always route to a Contact scoping call for that; redirect off-topic questions politely back to what Velcor does; keep answers short and conversational (this is a voice call, not chat).

**`scripts/create-vapi-assistant.mjs`**
- Node script (ESM), reads `VAPI_PRIVATE_API_KEY` from `.env.local` (via `dotenv`, already a transitive dependency, same pattern used for the earlier diagnostic scripts).
- `POST https://api.vapi.ai/assistant` with the config from `vapi/assistant-config.ts`, `Authorization: Bearer ${VAPI_PRIVATE_API_KEY}`.
- Prints the created assistant's `id` clearly, with instructions to add it to `.env.local` as `NEXT_PUBLIC_VAPI_ASSISTANT_ID`.
- Not run automatically by anything — a one-time (or re-run-when-config-changes) manual step, same as applying a Supabase migration.

**`VapiAssistant`** (client component)
- `"use client"`; lazily creates a `Vapi` instance (from `@vapi-ai/web`) using `NEXT_PUBLIC_VAPI_PUBLIC_KEY`.
- If `NEXT_PUBLIC_VAPI_PUBLIC_KEY` or `NEXT_PUBLIC_VAPI_ASSISTANT_ID` is missing, render nothing (graceful no-op, same fallback pattern used for the contact form's captcha-not-configured state) rather than a broken button.
- Fixed bottom-right circular button (`bg-petrol-700`, amber ring on hover, a mic/phone icon from `lucide-react`), toggles `vapi.start(assistantId)` / `vapi.stop()`.
- Listens for `call-start`/`call-end` to drive a simple state machine (`idle` | `connecting` | `active`) reflected in the button's appearance (e.g., a pulsing ring while `active`).
- Cleans up (`vapi.stop()`, removes listeners) on unmount.

## Security requirements
- `VAPI_PRIVATE_API_KEY` used only in `scripts/create-vapi-assistant.mjs`, never imported into any file under `app/` or `components/`, never prefixed `NEXT_PUBLIC_`.
- `NEXT_PUBLIC_VAPI_PUBLIC_KEY` and `NEXT_PUBLIC_VAPI_ASSISTANT_ID` are the only Vapi values that reach the browser — both are designed by Vapi to be public (same trust model as a Stripe publishable key).
- Microphone access is requested by the Vapi SDK itself on `vapi.start()` (standard browser permission prompt) — no custom media handling needed.

## Acceptance criteria
- [ ] `scripts/create-vapi-assistant.mjs` successfully creates the assistant against your real Vapi account and prints a usable `assistantId`.
- [ ] With real keys in `.env.local`, the floating button appears site-wide, starts a call on click, and Sarah answers questions about Velcor's services/sectors/process/contact info using only real site content.
- [ ] Without keys configured, the widget renders nothing (no broken button, no console errors visible to users).
- [ ] `VAPI_PRIVATE_API_KEY` does not appear anywhere in the client bundle (grep build output, same check used for the Supabase service-role key).
- [ ] `npm run typecheck` and `npm run lint` pass; `npm run build` succeeds.

## Checks to run
- `npm run typecheck`
- `npm run lint`
- `npm run build`
- `grep -rl "VAPI_PRIVATE_API_KEY" .next/static` (should return nothing)

## What you'll need to do after I implement
1. Sign up at vapi.ai, get your **Public API Key** and **Private API Key** from the dashboard.
2. Add to `.env.local`:
   ```
   NEXT_PUBLIC_VAPI_PUBLIC_KEY=...
   VAPI_PRIVATE_API_KEY=...
   ```
3. Run `node scripts/create-vapi-assistant.mjs` — copy the printed `assistantId`.
4. Add `NEXT_PUBLIC_VAPI_ASSISTANT_ID=...` to `.env.local`.
5. Restart `npm run dev`.

## Manual test steps
1. After completing the setup steps above: open `http://localhost:3000`, confirm the floating button appears bottom-right.
2. Click it, grant microphone permission, confirm the call connects (button reflects "active" state).
3. Ask Sarah: "What sectors do you work in?", "What's your process like?", "Do you have any case studies?" (should honestly say none yet, not invent one), "How do I get a quote?" (should point to Contact).
4. Click again to end the call, confirm it disconnects cleanly.
5. Temporarily remove the Vapi env vars, reload — confirm the widget doesn't render and no errors appear.
