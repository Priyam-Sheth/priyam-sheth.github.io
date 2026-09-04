# Portfolio v2 plan: "Scrollcraft" rebuild

Written 3 Sep 2026. Goal: a portfolio that makes a recruiter, a French internship reviewer, or an
SMB owner stop scrolling and email Priyam. Built one-shot with Fable 5.1, verified with a
screenshot loop, deployed to GitHub Pages.

## 1. What is wrong with the current page (honest audit)

Screenshots taken today at 1440 and 390 wide. Console clean, contrast AA, claims verified.
It is correct. It is not compelling.

| Problem | Evidence |
|---|---|
| Nothing moves. The only motion is a 14px fade-rise on every block. The reader never feels the page respond to them. | `quiet.js` is 54 lines: reveal + gallery arrows. No parallax, no scroll feedback, no depth. |
| It is the saturated "editorial-typographic" lane: display serif, small mono labels, hairline rules, white cards on grey bands. In 2026 this reads as a template. | DESIGN.md components list is exactly that fingerprint. |
| The proof is buried. The strongest facts (102k lines of TypeScript, 2,311 tests, a report delivered at 7:30 PM every weekday since March, 409 pull requests since July) are not on the page at all. | Cards say "in production", numbers stay in the repo. |
| All six case studies use one layout: heading, paragraph, bullet list, gallery, quote, footer line. Six identical cards is the "identical card grid" tell stretched vertically. | index.html cards 01 to 06. |
| The hero is a name and a paragraph. There is no visual of the work above the fold. | desk-hero.png: portrait plus text. |
| No diagram of how the five systems fit together, which is the actual story (one business, five systems, one builder). | Old SVG schematics exist in assets but were retired. |
| 9,400px tall on desktop, 13,400px on mobile, mostly whitespace and bullets. | desk-full.png |

## 2. Direction

**Design read:** solo AI-systems engineer portfolio for hiring managers, internship reviewers and
SMB owners, with a "precision instrument, in daylight" language: light ground, engineered depth,
scroll that answers the hand, every number true.

**Dials:** DESIGN_VARIANCE 7 · MOTION_INTENSITY 7 · VISUAL_DENSITY 4.

**Aesthetic lane (named):** Linear-clean structure + Fora-style layered parallax + a single dark
"machine room" block for the system diagram. Not editorial-magazine, not terminal-dark, not
SaaS-cream.

**What stays locked (do not relitigate):**
- Every claim on the current page is verified and stays literally true. New numbers come from the
  repos and are dated "as of 3 Sep 2026".
- Two doors: "Let's talk" (hiring) and "Build me one" (business). Prefilled mailto.
- Light theme, cool white ground (the Wolf Eyes screenshots are white UIs; on dark they float).
- Sentient 700 as display serif. Priyam chose it over sans twice. General Sans body stays.
- One accent: deep teal `#0F766E` on light, `#2DD4BF` on the dark block. Client orange is never
  the site's colour.
- Testimonials verbatim, Hinglish, attributed to Tirth Boradia, Palak Enterprise.
- No geography anchoring in the identity copy (Paris move on 28 Sep 2026). Footer location is
  Priyam's call; left as is.
- Page complete without JavaScript. Motion is additive. `prefers-reduced-motion` gets a still,
  finished page.

**What changes:** everything about depth, motion, imagery and proof density.

## 3. Page architecture (top to bottom)

1. **Nav.** Sticky, 64px, glass a half-step cooler than the page. Wordmark, Work, System, About,
   Contact, one "Email" pill. A 2px teal scroll-progress line along the top edge.

2. **Hero: the layered stack.** Left: the locked line, re-broken into a two-line headline
   ("One person. Five production systems.") and a sub-line ("Running real businesses. I scope it,
   build it, and stay when it breaks."). Two CTAs. Right: five real production screenshots on
   five glass planes in CSS 3D perspective (Wolf Eyes product page in a laptop frame, the
   Telegram 7:30 report in a phone frame, Onyx after-shot, Palak OS operations, admin dashboard).
   The planes separate on scroll (each at its own rate: the Fora layering) and tilt to the cursor
   through a spring-smoothed lerp. On touch they drift on scroll only. Reduced motion: a flat
   composed collage.

3. **Status board.** One marquee (the only one on the page) of dated, true status lines in the
   register of a departures board: "Wolf Eyes B2B · live since 11 Jun 2026 · 409 PRs merged since
   Jul", "Palak OS · 7:30 PM report · every weekday since Mar 2026", "2,311 automated tests",
   "102k lines of TypeScript", "136 photos, one overnight run", "3 days to 4 hours". Pauses on
   hover, scrolls linearly, static wrapped list under reduced motion.

4. **The system (signature section, the one dark block).** An animated SVG diagram of how Palak
   Enterprise actually runs on the five systems: Dealers → Wolf Eyes platform → Zoho Books ←
   Palak OS → Telegram → Founders; Studio Onyx → catalogue images → platform; UICS and the ERP →
   stock truth → Zoho. Packets travel the paths continuously (SVG `offset-path`), nodes light up
   in sequence as the section enters, each node is a link that scrolls to its case study. This
   is the "more diagrams" ask, and it is the real architecture, not decoration.

5. **Case studies as a sticky stack.** Five sheets pin at the top and scale back as the next one
   slides over (the card-stack effect from the AIS site), desktop only; on mobile they flow
   normally. Each sheet has its own layout family so no two look alike:
   - Wolf Eyes B2B: wide screenshot strip (catalogue, order with audit trail, owner dashboard,
     sign-in), the numbers (47 screens at launch, ~95 API endpoints, 21 tables, 1,760 tests at
     launch, 2,311 today), Live Commerce line, live link, quote.
   - Palak OS: the phone with the real report on the left; on the right "a weekday with
     Palak OS" as a vertical timeline (founder messages on Telegram → Zoho entry done → 7:30 PM
     report), the quote, the accent CTA "Want one trained on your business?".
   - Studio Onyx: a real before/after comparison slider (drag, clip-path) with the actual output
     pair, three lines of what it does, quote.
   - Inventory Reconciliation ERP: an animated two-pass allocation demo (example rows, labelled
     "example data"), exact match first, ±0.25 dioptre substitute second, the two real numbers.
   - UICS: three buckets (expected, excess, unknown) filling from a scanning counter (example),
     the 3 days → 4 hours result.
   - Donna: a quiet, narrower plate after the stack, personal register.

6. **How I work: Scope. Build. Stay.** A real three-step sequence (numbering earned): discovery
   and locked decisions; tests at ~40% of the codebase, green gate before every merge, verifier
   agent on money paths; runbooks a non-technical owner can follow, Telegram alerts, backups with
   verified restore. Short. Three columns on desktop, stacked on mobile.

7. **About.** Portrait, four sentences, timeline (Freelance 2025–now, Axisray internship
   Oct 2024–Jul 2025, B.Tech May 2024 CGPA 8.55), skills in three grouped chunks, no hairline
   spec sheet.

8. **Contact: two doors.** Full-width closing panel where the hero's glass planes return in the
   background at low opacity (the layering "comes back in" at the CTA). Two doors, prefilled
   mailto, copy-email button, LinkedIn, GitHub.

9. **Footer.** Name, email, "No trackers, no cookies · 2026".

## 4. Motion system

- Native CSS scroll-driven animations (`animation-timeline: view()` / `scroll()`) for the sticky
  stack, the progress line and the plane separation, wrapped in `@supports`; IntersectionObserver
  fallback for reveals; a small vanilla script for cursor parallax (rAF + lerp), number
  tickers, the comparison slider, the diagram packet flows and the two demos. No frameworks, no
  CDN dependency, nothing to break on GitHub Pages.
- Easing: `cubic-bezier(0.22,1,0.36,1)` (quint) for entrances, linear for the marquee and packets,
  ease for hover. UI feedback ≤250ms. Entrances 500–800ms. No bounce, no elastic.
- Only transform, opacity, clip-path and filter animate. `will-change` only on the planes.
- Reduced motion: marquee becomes a wrapped list, stack becomes flow, planes are static, tickers
  show the final number, packets are still dots.

## 5. Inspiration sources and what is borrowed (from the video, applied)

The video's seven principles, mapped to this build:

1. **Brand guidelines** → DESIGN.md palette and type stay; this document is the v2 brief.
2. **Three Ps** → Pain: SMBs run on humans doing robot jobs; recruiters cannot tell who really
   ships. Person: hiring manager / internship reviewer / SMB owner. Promise: one person who
   scopes, builds and stays.
3. **Scroll feedback** → planes separate, stack pins, diagram lights, numbers tick, progress
   line grows. The reader feels in control at every section.
4. **Inspiration** → Fora (layered hero that separates on scroll), the AIS site (stacked cards,
   locked-text tab switch), Lemon/Glido (animations that feel like using the product: the
   Telegram timeline and the allocation demo), Linear (structure and restraint).
5. **Components** → 21st.dev patterns rebuilt in vanilla: container-scroll (laptop that tilts
   into place), number ticker, sticky card stack, comparison slider, animated beam/path.
   Godly/awwwards/motion sites were surveyed for categories (hero, CTA, footer, backgrounds);
   nothing is copied, no assets are scraped.
6. **Mobile** → verified at 390px; stack degrades to flow, planes drift on scroll only, marquee
   stays.
7. **Verification loop** → Playwright screenshots at 8 scroll positions on desktop and mobile,
   reduced-motion pass, console clean, impeccable detector clean, contrast checked, CLS 0.

## 6. The one-shot build prompt (reusable)

> Rebuild `index.html` for Priyam Sheth's portfolio as a scroll-crafted, layered, light-theme
> page. Keep every existing claim literally true and keep the two prefilled mailto doors. Keep
> Sentient 700 display, General Sans body, teal accent, cool white ground. Hero: headline left,
> five real production screenshots on CSS 3D glass planes right, planes separate on scroll at
> different rates and tilt to the cursor with a spring lerp. Below: one marquee of dated, true
> status lines. Then one dark block: an animated SVG system diagram of how the five systems run
> Palak Enterprise, packets moving along paths, nodes linking to case studies. Then five case
> studies as a sticky stack on desktop (flow on mobile), each with a different layout family:
> screenshot strip, phone + timeline, before/after slider, allocation demo, bucket demo. Then
> Scope / Build / Stay, About, and a two-door contact panel where the hero planes return faintly.
> No frameworks. Native scroll-driven animations with @supports and IntersectionObserver
> fallback. Reduced motion gets a finished static page. Verify with Playwright screenshots at
> desktop and mobile, fix what looks wrong, repeat until clean.

## 7. Assets and repos used

- `assets/processed2/*` (blur-redacted, client-permitted) reused.
- Two new exhibits from `b2b-wolfeyes-site/portfolio-screenshots`: the product page (dealer
  price blurred) and the mobile catalogue (dealer prices blurred), converted to webp.
- Numbers from `b2b-wolfeyes-site/deliverables/1-executive-summary.md` (as of 6 Jul 2026) and
  from the repo today (commits, PRs, tests, screens).
- Palak OS, Onyx, ERP and UICS facts from `business-os-lab/knowledge/projects/*`.
- Donna facts from `donna/DONNA_PRD_v2.md` (memory, correction, receipts).
- Higgsfield: zero credits on the free plan, so no generated imagery. All graphics are code.

## 8. Open decisions for Priyam

- Footer location: keep "Ahmedabad, India", drop it, or switch to Paris on arrival.
- Push to GitHub Pages: the build is committed on a branch; pushing is a one-line command left
  to Priyam.

---

## Addendum, 4 Sep 2026: v3 replaced v2

Priyam reviewed v2 and rejected it as "nothing new or innovative", asked for a from-scratch
redesign that would impress top UI/UX designers, and named heylemon.ai as the reference from the
video. v3 borrows Lemon's *language* and keeps our own palette, objects and copy:

- Painted panels with big radii, painted in code (`scripts/paint.py`, numpy + Pillow: colour
  fields, brushed displacement, hill silhouettes, horizontal streaks, grain).
- One light serif (Sentient 300/400 with italics, pulled from Fontshare) with italic emphasis.
- Small mono chapter marks with dots, used at the top of each plate.
- The Lemon device: "you say it" dark bar plus a real app window where the result appears.
  For Priyam that became an interactive Telegram simulation of Palak OS in the hero, and a
  tabbed "See it work" stage with five real windows (production screenshot, before/after slider,
  allocation demo, bucket demo).
- By-hand vs the-system comparison, a pill marquee inside a screen frame, a night plate of
  numbers, a wall of the client's words with marigold highlights, and a rose close.

The v2 planes, diagram and sticky stack are gone. Files: `src/v3/`, `assets/paint/`,
`scripts/paint.py`, `scripts/og/`.
