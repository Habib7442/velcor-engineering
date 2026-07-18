# Product Requirements Document (PRD)
## Velcor Engineering — Corporate Website

**Domain:** velcorengineering.com
**Document version:** 1.0
**Status:** Draft for build
**Owner:** Velcor Engineering

---

## 1. Overview

### 1.1 Purpose
This document defines the requirements for the Velcor Engineering corporate website — a multidisciplinary engineering and design firm offering Product Design and Plant Engineering services. The site must present Velcor as a credible, technically deep engineering partner and convert qualified B2B visitors into contact/inquiry leads.

### 1.2 Product summary
A fast, responsive, SEO-optimized marketing website with six primary pages (Home, About, Our Expertise, What We Do, Careers, Contact). The site showcases a broad range of engineering capabilities, builds trust through proof (case studies, credentials), and drives inquiries through clear calls-to-action.

### 1.3 Background
The service scope mirrors an established competitor in the space (HEXAD Engineering). This PRD keeps the **same service categories and technical capability lists** (standard, non-proprietary engineering offerings) while requiring **original copy, original branding, and an original design**. It also corrects weaknesses observed in the competitor site: missing proof/case studies, an empty FAQ, thin SEO metadata, placeholder/broken social links, inconsistent addresses, and heavy `.mov` hero video.

### 1.4 Goals
- Establish Velcor as a technically credible, multidisciplinary engineering firm.
- Generate qualified inbound leads (contact form + quote requests).
- Rank for engineering-service and location-based keywords.
- Support recruiting via a Careers page.

### 1.5 Non-goals (v1)
- E-commerce / online payments.
- Client login / project portal.
- Multi-language localization (English only for v1).
- Blog/CMS (deferred to v1.1 — see §14).

### 1.6 Success metrics
| Metric | Target (first 6 months) |
|---|---|
| Contact/quote form submissions | ≥ 20 / month |
| Organic sessions | ≥ 1,500 / month |
| Bounce rate | < 55% |
| Avg. Lighthouse Performance (mobile) | ≥ 90 |
| Core Web Vitals | All "Good" |
| Keyword rankings (target set) | ≥ 10 in top 20 |

---

## 2. Target audience

### 2.1 Primary personas
1. **Procurement / Project Manager (industrial client)** — evaluating engineering vendors for plant projects. Needs proof of technical depth, standards compliance, and delivery track record.
2. **Startup / OEM founder (product design client)** — needs machine design, automation, or embedded product development. Needs to see relevant capability and past work.
3. **Job seeker (engineer)** — evaluating Velcor as an employer via the Careers page.

### 2.2 Audience needs
- Fast confirmation that Velcor covers their specific discipline.
- Evidence of competence (case studies, standards, client logos, numbers).
- An easy, low-friction way to start a conversation or request a quote.

---

## 3. Information architecture / site map

```
Home (/)
├── About (/about)
├── Our Expertise (/our-expertise)
│   └── Anchored sections per sector (#water-treatment, #power, etc.)
├── What We Do (/what-we-do)
│   ├── #product-design
│   └── #plant-engineering
├── Careers (/careers)
│   └── Job listing detail (/careers/[slug])   [v1.1]
└── Contact (/contact)

Global: Header nav, Footer, Cookie/consent notice (if analytics), 404 page
```

### 3.1 Global navigation
- **Header:** Logo (left), nav links (Home, About, Our Expertise, What We Do, Careers, Contact), primary CTA button ("Talk to Us") on the right. Sticky on scroll. Collapses to a hamburger menu on mobile.
- **Footer:** Logo + tagline, Company links, Contact block (email, phone, addresses), Connect (social — **only include live links**), newsletter subscribe, copyright with dynamic current year.

---

## 4. Page-by-page requirements

### 4.1 Home (`/`)

**Sections (in order):**

1. **Hero**
   - Background: short looping muted video **encoded as `.mp4` + `.webm` with a poster image fallback** (NOT `.mov`). Lazy-load; pause on `prefers-reduced-motion`.
   - Headline: transformational value statement (original copy).
   - Subhead: one-line positioning.
   - Two CTAs: primary "Explore Services" → `/what-we-do`; secondary "Talk to Us" → `/contact`.

2. **Who We Are** — short intro paragraph + supporting image + "Learn More" → `/about`.

3. **Our Expertise (carousel/grid)** — cards for all sectors listed in §5.1, each linking to the matching anchor on `/our-expertise`. Carousel must be swipeable on touch and keyboard-navigable.

4. **What We Do (highlight)** — two feature blocks: Product Design and Plant Engineering, each with a short description, media, and "Learn More" deep link.

5. **Proof / Trust band** *(NEW — not in competitor)* — client logos, key stats (years in operation, projects delivered, disciplines covered), and 1–3 short testimonials. See §7.

6. **Featured case studies** *(NEW)* — 2–3 project cards (thumbnail, title, sector, 1-line result) → case study detail. See §7.

7. **FAQ** — accordion with **real questions AND written answers** (see §6.4). Must not ship with empty answer bodies.

8. **Final CTA band** — "Let's build something great together" + contact CTA.

9. **Footer.**

**Acceptance:** All CTAs resolve to valid routes; carousel accessible; no layout shift on video load; FAQ answers present.

---

### 4.2 About (`/about`)

**Sections:**
1. Hero banner + headline + intro paragraph (company positioning).
2. **Mission & Vision** — two blocks.
3. **Our Promise** — short commitment statement.
4. **Culture & Values** — 6 value cards: Collaborative, Inclusive, Innovative, Excellence, Impact-Driven, Integrity (original descriptions).
5. **Life at Velcor** — culture copy + image(s).
6. **CTA:** "Join Our Growing Team" → `/careers`.
7. Footer.

**Acceptance:** Consistent company facts (name, addresses) match Contact page — no discrepancies.

---

### 4.3 Our Expertise (`/our-expertise`)

- Intro header.
- One anchored section per sector in §5.1, each with: sector image, heading, descriptive paragraph (original), and relevant sub-capabilities.
- Anchor IDs must match the links used on the Home expertise cards.
- CTA to Contact at the bottom.

**Acceptance:** Every Home "Read More" link scrolls to the correct in-page anchor.

---

### 4.4 What We Do (`/what-we-do`)

Single H1 ("What We Do"). Two capability groups:

**A. Product Design** (`#product-design`) — card grid, one card per item in §5.2.
**B. Plant Engineering** (`#plant-engineering`) — discipline blocks with bulleted deliverables per §5.3.

- "Looking for a Custom Solution?" band → "Talk to Us" CTA.

**Acceptance:** Exactly one `<h1>`; all service items from §5.2 and §5.3 present; capability copy matches the industrial B2B tone (not consumer marketing fluff).

---

### 4.5 Careers (`/careers`)

- Hero + EVP (employee value proposition) copy.
- Open roles list (title, location, type, apply link). If no live roles, show a designed empty state + "Send us your resume" mailto/form (never a blank section).
- Benefits/culture highlights.
- Application CTA.

**v1.1:** Individual job detail pages `/careers/[slug]` + applicant form.

---

### 4.6 Contact (`/contact`)

- Contact form: Name, Company, Email, Phone, Service of interest (dropdown), Message. Client + server validation, spam protection (honeypot + reCAPTCHA/hCaptcha), success + error states.
- **Quote request** option in the service dropdown.
- Direct contact block: email, phone(s), operational + registered addresses.
- Embedded map.
- Working social links.

**Acceptance:** Form submits, sends email to Velcor inbox, shows confirmation; invalid states are explained in-line; addresses identical to footer/About.

---

## 5. Services & capabilities specification
> These are the exact service categories to include. Descriptions must be written fresh for Velcor.

### 5.1 Our Expertise — sectors
1. Water Treatment
2. Industrial Automation
3. Oil & Gas
4. Utilities
5. Power
6. Power Distribution Equipment
7. Automotive Engineering
8. Electronic Engineering
9. Mining Engineering
10. Power System Studies
11. Analysis & Simulation
12. Solar Power Plant
13. Software Development — web and mobile application development, plus workflow automation (e.g. n8n). Added as a Velcor service line beyond the original HEXAD-mirrored list in §1.3; not a standard plant-engineering/product-design category, so treat separately from §5.2/§5.3 when scoping the "What We Do" page.

### 5.2 What We Do — Product Design
| Service | Short description (rewrite for Velcor) |
|---|---|
| Industrial Automation | Automation solutions to optimize manufacturing processes and efficiency. |
| Machine & Equipment Design (SPMs) | Custom machinery and special-purpose machine design. |
| Control Systems | Precision, reliable, easy-to-operate control systems. |
| Assembly Lines | Streamlined assembly solutions that scale production. |
| Robotic Integration | Integration of robotic systems into production workflows. |
| Power Distribution Equipment | Power solutions tailored for industrial environments. |
| Embedded Products | Embedded systems for real-time control and monitoring. |

### 5.3 What We Do — Plant Engineering (deliverables per discipline)

**Piping**
- P&ID drafting
- Pipe routing & equipment modeling
- GA / Layout
- Isometrics & spool drawing
- Material take-off
- Pipe support design & detailing
- Stress analysis
- Review & validation of stress reports

**Electrical**
- 3D modeling of cable tray
- SLD & 3-line diagrams
- MCC & SWGR schematics
- Specification & datasheet
- Panel GA (internal & external)
- Cable schedule
- Cable & cable tray sizing
- Cable tray & equipment layouts
- Lighting calculation & layout
- Earthing & lightning design
- BOM
- Power system study — short circuit, load flow, earthing, relay coordination, grid code compliance, arc flash

**Mechanical**
- Design specification & datasheets
- Equipment modeling
- Base frame design & detailing
- Shop / fabrication drawing
- BOM
- ASME pressure vessel design (Sec VIII Div 1)
- API storage tank design
- Heat exchangers
- FEA analysis

**Instrumentation & Control**
- Instrument specification & datasheet
- Instrument sizing & selection
- Instrument list
- Interconnection cable schedule
- Location layout
- Control system design
- System architecture
- Schematics
- Control panel GA
- Logic diagram
- Loop drawing
- PLC, HMI & SCADA programming support

**Civil & Structural**
- RCC & steel structure design & detailing
- Plot plan
- Foundation design
- Steel connection design & detail
- Structural analysis

---

## 6. Content requirements

### 6.1 Voice & tone
Professional, technical, confident. B2B — speak to engineers and procurement, not consumers. Avoid generic filler ("innovate & thrive"); be specific about capabilities, standards, and outcomes.

### 6.2 Original copy mandate
All marketing copy (hero, section intros, value descriptions, FAQ answers) must be **written originally for Velcor**. Do not copy competitor sentences verbatim. Service/deliverable list items (§5.3) are standard industry terms and may be reused as-is.

### 6.3 Company facts (single source of truth)
Define once, reuse everywhere (footer, About, Contact). Must be internally consistent:
- Legal name, tagline
- Email, phone(s) — include a local number if targeting a local market
- Operational address, registered address (label each clearly and keep identical across pages)
- Social profiles — **only link profiles that exist**

### 6.4 FAQ (must have written answers)
Provide 6 Q&As with real, useful answers (process, engagement model, timelines, standards, industries served, how to start). Do not ship questions without answers.

---

## 7. Trust & conversion features *(improvements over competitor)*
- **Case studies:** structured project entries (sector, challenge, solution, deliverables, outcome/metrics, images). Min. 3 at launch.
- **Client logos** band (with permission).
- **Testimonials:** 2–3 with name, role, company.
- **Stats:** years in operation, projects delivered, disciplines, geographies.
- **Certifications/standards badges:** e.g., ISO, ASME, API — where applicable.
- **Multiple conversion paths:** general contact, quote request, resume submission.

---

## 8. Design system

### 8.1 Branding & color system

Velcor's palette is **Petrol + Amber** — a deep petrol primary for engineering credibility (deliberately distinct from the competitor's corporate blue) with a single warm amber accent. Original logo and typography required.

**Usage ratio (60 / 30 / 10):** ~60% neutral (bone background + graphite/steel text), ~30% primary petrol (header, footer, headings, icons, section anchors), ~10% amber accent (CTAs, links, active states, key highlights only).

#### Core ramps (light mode)

| Token | Hex | Use |
|---|---|---|
| `--petrol-900` | `#071E25` | Darkest — active states, deep backgrounds |
| `--petrol-800` | `#0A2C36` | Primary button hover |
| `--petrol-700` | `#0E3A46` | **Primary base** — header, footer, headings |
| `--petrol-500` | `#1C6B7E` | Info, secondary accents, links on light |
| `--petrol-100` | `#D6E4E7` | Tints, hover fills |
| `--petrol-50`  | `#EEF4F5` | Subtle section backgrounds |
| `--amber-700`  | `#B96D14` | Accent active |
| `--amber-600`  | `#D07C1C` | Accent hover |
| `--amber-500`  | `#E8912D` | **Accent base** — primary CTA, highlights |
| `--amber-100`  | `#FBE6CA` | Accent tint / badge background |
| `--graphite-900` | `#1F2A2E` | **Primary text**; text on amber |
| `--steel-500`  | `#5B6B70` | **Secondary text**, captions |
| `--steel-200`  | `#C7CFD1` | Borders, dividers |
| `--bone`       | `#F7F6F2` | **Page background** |
| `--white`      | `#FFFFFF` | Cards / surfaces |

#### Interactive states

| Element | Default | Hover | Active | Text on fill |
|---|---|---|---|---|
| Primary button | `#0E3A46` | `#0A2C36` | `#071E25` | `#FFFFFF` |
| Accent button (CTA) | `#E8912D` | `#D07C1C` | `#B96D14` | `#1F2A2E` (dark — see A11y) |
| Text link | `#1C6B7E` | `#0E3A46` | — | — |
| Card border | `#C7CFD1` | `#5B6B70` | — | — |

#### Semantic colors

| Token | Hex | Background tint |
|---|---|---|
| Success | `#2E7D5B` | `#E4F0EA` |
| Error | `#C0392B` | `#FBEAE8` |
| Warning | `#D98A0B` | `#FBEED6` |
| Info | `#1C6B7E` | `#E1EDEF` |

#### Dark mode

| Role | Hex |
|---|---|
| Page background | `#0B191F` |
| Surface / card | `#12262E` |
| Primary text | `#F1F3F2` |
| Secondary text | `#A9B4B7` |
| Accent (CTA / link) | `#F0A64F` (brightened amber for contrast) |
| Border | `#274049` |

#### Accessibility rules (must enforce)
- **Amber `#E8912D` is a large-element color only.** Never use it for body copy or thin links on white/bone — it fails WCAG AA for small text. Amber CTAs use **dark graphite `#1F2A2E` text**, not white.
- Petrol `#0E3A46` on bone/white and graphite `#1F2A2E` on bone both pass AA — use these for text.
- All interactive elements need a visible focus ring (petrol `#1C6B7E`, 2px).
- Verify every text/background pair at AA (4.5:1 normal, 3:1 large) in both light and dark modes before launch.

#### Governance
- **One accent only.** Do not introduce a second bright color; amber is the sole accent.
- Ship all values above as CSS custom properties / design tokens with light + dark values, not hardcoded hex in components.

### 8.2 Typography
- Distinct display + body pairing with a defined type scale, weights, and spacing.

### 8.3 Components
Header/nav, footer, buttons (primary/secondary), cards (expertise, service, case study), accordion (FAQ), carousel, form fields + validation states, tags/badges, empty states.

### 8.4 Responsiveness & accessibility (quality floor)
- Fully responsive: mobile, tablet, desktop.
- WCAG 2.1 AA: color contrast, visible keyboard focus, alt text on all images, semantic landmarks, labeled form fields.
- Respect `prefers-reduced-motion`.

---

## 9. Technical requirements

### 9.1 Stack (recommended)
- Framework: Next.js (React) with SSR/SSG for SEO.
- Image optimization: `next/image` (responsive sizes; avoid serving 3840px assets to mobile).
- Media hosting: CDN (e.g., Cloudinary); hero video as `.mp4`/`.webm` + poster, **not `.mov`**.
- Hosting: Vercel/Netlify or equivalent; HTTPS enforced.
- Forms: serverless function / form service with email delivery + spam protection.

### 9.2 Performance
- Lighthouse (mobile) ≥ 90 across Performance/Best Practices/SEO/Accessibility.
- Core Web Vitals "Good": LCP < 2.5s, CLS < 0.1, INP < 200ms.
- Compressed, correctly sized images; lazy-loading below the fold; no CLS from media.

### 9.3 Browser support
Latest 2 versions of Chrome, Safari, Firefox, Edge; iOS & Android mobile browsers.

---

## 10. SEO requirements *(improvements over competitor)*
- Unique, keyword-rich `<title>` and meta description per page (include service + location targeting; avoid thin descriptions like "Learn about our designs").
- Exactly one `<h1>` per page; logical heading hierarchy.
- Semantic HTML5, descriptive alt text, descriptive link text.
- Clean URLs (already reflected in site map).
- `sitemap.xml`, `robots.txt`, canonical tags.
- Open Graph + Twitter Card metadata with share images.
- Structured data (JSON-LD): `Organization`, `LocalBusiness`, `BreadcrumbList`; `JobPosting` for careers (v1.1).
- Local SEO: consistent NAP (name/address/phone) across site + Google Business Profile.
- Target keyword set defined and mapped to pages before launch.

---

## 11. Functional requirements

| ID | Requirement | Priority |
|---|---|---|
| F-01 | Sticky responsive header with mobile hamburger menu | Must |
| F-02 | Hero video with poster fallback, reduced-motion pause | Must |
| F-03 | Expertise carousel — touch + keyboard accessible | Must |
| F-04 | FAQ accordion with written answers | Must |
| F-05 | Contact form with validation, spam protection, email delivery | Must |
| F-06 | Quote request path | Must |
| F-07 | Newsletter subscribe (email capture + confirmation) | Should |
| F-08 | Case study listing + detail | Must |
| F-09 | Careers listing + empty state | Must |
| F-10 | Careers job detail + application form | Could (v1.1) |
| F-11 | Working, verified social links only | Must |
| F-12 | Dynamic copyright year | Should |
| F-13 | Custom 404 page | Should |
| F-14 | Cookie/consent notice (if analytics used) | Must if analytics |

---

## 12. Analytics & tracking
- Web analytics (GA4 or privacy-first alternative).
- Event tracking: CTA clicks, form submissions, quote requests, outbound social clicks.
- Google Search Console verified; sitemap submitted.
- Conversion goals configured for lead forms.

---

## 13. Legal & compliance
- Privacy Policy and Terms pages linked in footer.
- Cookie consent if tracking is used (region-dependent).
- Newsletter consent language compliant with applicable law.
- All imagery/video properly licensed or owned.

---

## 14. Release plan

**Phase 1 — MVP (launch)**
Home, About, Our Expertise, What We Do, Careers (listing + empty state), Contact (form). SEO, analytics, responsive + accessible, ≥3 case studies, working FAQ. Legal pages.

**Phase 1.1**
Career job detail pages + application form; testimonials expansion; client logo program.

**Phase 2**
Blog/Insights (CMS) for content SEO; multi-language; case study filtering by sector.

---

## 15. Acceptance criteria (launch gate)
- [ ] All six pages built, responsive, and cross-browser verified.
- [ ] All navigation and CTA links resolve; no dead/`#` links.
- [ ] FAQ answers written and rendered.
- [ ] ≥3 case studies + trust band live.
- [ ] Contact form delivers email, validates, and shows success/error states.
- [ ] Company facts (name, addresses, phone) consistent site-wide.
- [ ] Only live social profiles linked.
- [ ] Hero media is `.mp4`/`.webm` with poster; no CLS.
- [ ] Unique title/meta + single H1 per page; sitemap, robots, OG tags present.
- [ ] Lighthouse mobile ≥ 90; Core Web Vitals "Good."
- [ ] WCAG 2.1 AA checks pass (contrast, focus, alt text, labels).
- [ ] All copy original; no verbatim competitor text.
- [ ] Privacy Policy + Terms live; analytics + Search Console configured.

---

## 16. Open questions
1. Final legal entity name, logo, and brand colors for Velcor?
2. ~~Target geography/market (for local SEO + phone number)?~~ **Resolved:** Sribhumi, Assam, India. Address `331, Khola Pt II, Sribhumi, Assam, 788701, India`, phone `+91 99578 82204`. Single source of truth in `lib/data/company.ts`, consumed by Footer and `/contact`.
3. Which certifications/standards can Velcor legitimately display?
4. Available case studies / client logos with permission to publish?
5. CMS needed at launch, or static content acceptable for v1?