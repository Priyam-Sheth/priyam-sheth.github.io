# Product

## Register

brand

## Platform

web

## Users
**From ~November 2026 the primary audience is French internship/job reviewers — see Audience shift below.** Until then, two audiences, one page. Primary: recruiters and hiring engineers scanning fast — they arrive skeptical, allergic to hype, and decide in under a minute whether this person ships real software. Secondary: Indian SMB owners (often non-technical, often on a phone) who were referred or found Priyam through a client — they need to understand what he could do for *their* business without decoding jargon.

## Product Purpose
A one-page portfolio for Priyam Sheth, an independent AI systems builder in Ahmedabad who ships production software for real businesses. The page exists to convert two kinds of visitors: a recruiter into a "let's talk" email, an SMB owner into a "build me one" email. Success = the work reads as real, the person reads as hireable, and one of the two doors gets clicked.

## Positioning
One independent builder whose systems are already running real Indian businesses in production — not demos, not prototypes, not a methodology pitch.

## Audience shift (recorded 2026-08-17) — READ THIS BEFORE WRITING ANY COPY

Priyam moves to Paris on **28 September 2026** and starts applying for **French internships from
around November/December 2026**. From that point the **primary audience becomes French
internship and job reviewers**, not Indian recruiters and not SMB owners.

**What that changes:**

- **A Paris reviewer does not know Palak Enterprise and cannot verify an Indian SMB relationship.**
  So proof that depends on the reader trusting the client is weak proof for the audience that
  matters next. Copy must stand up to someone who cannot check any of it.
- **This is why the hero is "One person, five production systems, running real businesses. I scope
  it, build it, and stay when it breaks."** It reads senior to a hiring manager in any country and
  signals **end-to-end ownership**, which is what internship reviewers screen for. A rejected
  alternative led with "one client who keeps calling me back" — true, and a real strength today, but
  it risks reading as *narrow experience* to a reviewer who cannot see the client. The one-client
  trust arc still lives in the cards for anyone who scrolls, where it works as depth rather than as
  the headline claim.
- **AVOID GEOGRAPHY-DEPENDENT COPY SITE-WIDE.** Do not anchor Priyam's identity to a city or
  country. His location changes in September, and a reviewer in Paris should not have to discount
  anything. Removed for this reason: the hero kicker, the meta description tagline, and the timeline
  note.
  - **Still fine:** a *client's* geography as a factual detail ("Wolf Eyes sells eyewear to dealers
    across India") — that describes the client's market, not Priyam's positioning.
  - **Open decision:** the footer still reads "Priyam Sheth · Ahmedabad, India". Left in place
    deliberately. A portfolio with no location at all can read evasive, and from late September his
    location becomes Paris, which is an *asset* for French applications rather than a discount.
    Priyam's call whether to drop it, leave it, or update it on arrival.

**Practical rule:** write every claim so it survives a reader who cannot verify the client, does not
know the city, and is deciding in under a minute whether this person ships real software and owns it
end to end.

## Conversion & proof
- Primary CTA: Email (mailto, prefilled subjects "Let's talk" / "Build me one" per door)
- Secondary: LinkedIn / GitHub
- The line a visitor remembers: "One person, five production systems, running real businesses. I scope it, build it, and stay when it breaks." (Updated 2026-08-17 — see Audience shift above for why the previous line and the one-client alternative were both set aside.)
- Belief ladder: (1) this is real shipped software, not claims → (2) it runs businesses like mine / businesses I'd hire for → (3) one person did all of this → (4) I can email him right now.
- Proof on hand: blur-redacted production screenshots (Wolf Eyes B2B platform incl. product page and mobile catalogue, Palak OS dashboards), the real 7:30 PM Telegram business report as delivered, a real before/after product-photo pair (Studio Onyx), repo-derived numbers dated 3 Sep 2026 (2,311 tests, 409 PRs since July, ~102k lines at launch, 47 screens, ~95 endpoints). All in `assets/processed2/`. Licenses in `docs/asset-licenses.md`.

## Brand Personality
Plain, confident, warm. Premium-professional product site — a precision-made object, crisp and airy. The register is understated competence: every claim true and specific, tech names confined to small mono lines, no jargon in body copy. Warmth lives in the copy's voice, never in theatrics.

## Anti-references
- **Revised 3 Sep 2026 (Priyam's directive):** the quiet, static v1 was judged unsatisfying. v2 deliberately adds layered 3D depth, scroll feedback, a sticky case-study stack, live diagrams and demos, in the register of the best 2026 portfolio sites. What stays banned: WebGL fog for its own sake, monumental typography, scroll-hijacking, any motion that hides content, and anything the reader cannot switch off with reduced motion. See `docs/v2-plan.md`.
- Methodology narrative of any kind: how the software gets built (AI team, agents, process) is never the story; what it does for the business is.
- SaaS landing-page clichés: hero-metric blocks, gradient text, icon-card grids, eyebrow kickers on every section.
- Inflated claims. Every sentence must stay literally true.

## Design Principles
1. Proof over polish-talk: real screenshots, real numbers, real status lines do the persuading.
2. A non-technical reader follows every body sentence; the technical reader finds the stack in the mono lines.
3. Two doors, no maze: every path ends at one of two prefilled emails.
4. Engineered depth, honest surface: motion and layering carry the premium feel; every animated element shows real work (real screenshots, real numbers, real architecture). Demos with example data say so on the face.
5. The page is complete without JavaScript; enhancement is additive only.

## Accessibility & Inclusion
WCAG AA minimum on every text/background pair (audited programmatically). `prefers-reduced-motion` gets a fully composed static page. Galleries scroll natively on touch — no hijacked gestures. Keyboard: visible focus states, gallery focusable. CLS 0.
