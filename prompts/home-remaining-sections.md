# Prompt: Home — remaining sections (What We Do highlight, FAQ, Final CTA)

## Goal
Complete the Home page per PRD §4.1, skipping items 5–6 (Proof/Trust band, Case Studies) per explicit decision — no real project/testimonial data exists yet, and PRD §16 now records that. Home becomes: Hero → Who We Are → Our Expertise → **What We Do highlight** → **FAQ** → **Final CTA band** → Footer.

## What it read
- `PRD.md` §4.1 items 4/7/8 (specs), §6.4 (FAQ — 6 real Q&As covering process/engagement model/timelines/standards/industries served/how to start, no empty answers), §16 (now-resolved open questions on certifications/case studies)
- `app/what-we-do/page.tsx` — confirms `#product-design`/`#plant-engineering` anchors already exist to deep-link into
- `components/sections/about/JoinTeamCta.tsx`, `our-expertise/ExpertiseCta.tsx`, `what-we-do/CustomSolutionCta.tsx` — the established CTA-band pattern this reuses
- `node_modules/@base-ui/react/accordion` — confirmed available (Root/Item/Header/Trigger/Panel), same library already used for the mobile nav `Dialog`

## Decisions / assumptions
- **What We Do highlight** uses icons, not photos (no imagery exists for these two categories, same reasoning as every other section this build): `Boxes` for Product Design, `Factory` for Plant Engineering — both link to `/what-we-do#product-design` / `/what-we-do#plant-engineering`.
- **FAQ uses Base UI's `Accordion`** (already a project dependency, same pattern as the mobile-menu `Dialog` in `Header.tsx`) — no new dependency.
- **FAQ copy is original**, 6 questions exactly matching §6.4's required coverage areas (process, engagement model, timelines, standards, industries served, how to start), each with a real written answer — no empty panels, no vague non-answers.
- **Final CTA band copy is exactly what PRD specifies**: "Let's build something great together" + a CTA to Contact, reusing the same visual band pattern as every other CTA on the site (`bg-petrol-700`, bone heading, amber button).
- **No stand-in for the skipped Proof/Trust and Case Studies sections** — Home goes straight from Our Expertise to What We Do highlight, per your decision.

## Files that will change
- **Create** `components/sections/WhatWeDoHighlight.tsx`
- **Create** `components/sections/Faq.tsx`
- **Create** `components/sections/FinalCta.tsx`
- **Modify** `app/page.tsx` — render the three new sections after `<OurExpertise />`

## Implementation requirements

**`WhatWeDoHighlight`**
- Eyebrow "What We Do", `<h2>`, two-column grid (`sm:grid-cols-2`) with one card per category: icon-in-circle, name, 1–2 sentence description, `Button variant="link"` "Learn More" (petrol text, amber arrow — same treatment as every other "Learn More"/"Read More" on the site) linking to the respective anchor.
- Copy:
  - Product Design: "We design the machine — automation, control systems, robotics, embedded products — from concept through a build-ready package."
  - Plant Engineering: "We engineer the facility it runs in — piping, electrical, mechanical, instrumentation, and civil — discipline by discipline, to code."

**`Faq`**
- Eyebrow "FAQ", `<h2>`, `Accordion.Root` (single-open or multi-open — single is the more common UX default) containing 6 `Accordion.Item`s, each with an `Accordion.Trigger` (question + `ChevronDown` that rotates on open) and `Accordion.Panel` (answer).
- Questions/answers (final copy, drafted to match §6.1 tone — no filler, no over-promising):
  1. **Process** — "What's your engagement process like?" / "We start with a scoping call to understand the discipline and scale of work, follow with a written proposal covering deliverables and timeline, then move into design once terms are agreed. You get a single point of contact for the life of the project, not a rotating cast."
  2. **Engagement model** — "Do you work on fixed-price or time-and-materials contracts?" / "Both, depending on scope. Well-defined deliverables typically run fixed-price; open-ended or evolving scopes run time-and-materials with regular progress billing. We agree the model upfront, in writing, before work starts."
  3. **Timelines** — "How long does a typical project take?" / "It depends entirely on scope — a control system design might run a few weeks, a full plant engineering package can run several months. We give you a realistic schedule during scoping and flag risks to it as they come up, not at the deadline."
  4. **Standards** — "What standards and codes do you design to?" / "We work to the codes your project actually requires — ASME, API, IEC, and site-specific standards depending on discipline and geography. Tell us your governing code set during scoping and we'll confirm we can deliver to it before you commit."
  5. **Industries served** — "What industries do you work with?" / "Water treatment, industrial automation, oil & gas, utilities, power, automotive, electronics, mining, and solar, among others — see the full list on our Our Expertise page. If your industry isn't listed, ask us directly; the disciplines usually transfer."
  6. **How to start** — "How do I start a project with Velcor?" / "Send us a message through the contact form with a short description of what you need, or request a quote directly. We'll respond with clarifying questions or a scoping call proposal."

**`FinalCta`**
- `bg-petrol-700` band, `<h2>Let's build something great together</h2>` (bone), short supporting line, `Button variant="accent"` → `/contact`.

## Security requirements
None — static content, no data, no secrets.

## Acceptance criteria
- [ ] Home renders in order: Hero, Who We Are, Our Expertise, What We Do highlight, FAQ, Final CTA, Footer.
- [ ] Both "Learn More" links resolve to the correct `/what-we-do` anchors.
- [ ] All 6 FAQ questions have non-empty, real answers; accordion is keyboard-operable (Base UI handles this, verify it isn't broken by custom styling).
- [ ] No `<h1>` introduced (Home's `<h1>` stays in `Hero`); each new section's own heading is `<h2>`.
- [ ] No fabricated stats, testimonials, or client references anywhere in the new copy.
- [ ] `npm run typecheck` and `npm run lint` pass; `npm run build` succeeds.

## Checks to run
- `npm run typecheck`
- `npm run lint`
- `npm run build`

## Manual test steps
1. `npm run dev`, open `http://localhost:3000`, scroll past Our Expertise.
2. Confirm What We Do highlight renders two cards; click each "Learn More" and confirm it lands on the correct anchor on `/what-we-do`.
3. Confirm the FAQ accordion opens/closes on click, only shows written answers (none empty), and is operable via keyboard (Tab to a question, Enter/Space to toggle).
4. Confirm the Final CTA band renders with the exact PRD copy and its button links to `/contact`.
5. Resize to mobile — confirm the highlight cards stack and the accordion remains usable.
