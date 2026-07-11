# Design

Crisp Cool White — the locked palette family (client spec). Skill passes refine values, tension, and type WITHIN this family; they do not flip it warm or dark.

## Theme
Light only. Physical scene: a recruiter at a desk mid-afternoon, or an SMB owner on a phone in a bright shop — ambient light is high, the page must read like a printed spec sheet, not glow like a screen.

## Color
- `--bg` #FFFFFF — pure white body ground
- `--band` #F4F6F8 / `--band-2` #F3F4F6 — cool gray tonal bands for section rhythm
- `--ink` #111827 (headings) · `--ink-body` #374151 · `--ink-dim` #646D7A (muted, AA on all grounds)
- `--line` #D9DEE3 hairlines · `--line-strong` #D1D5DB interactive borders
- Accent (ONE): `--accent` #0F766E deep teal — indexes, list ticks, status dots, links, one CTA style. Chosen over golden: the Wolf Eyes screenshots carry the client's own orange; teal keeps the site's voice distinct from the artifacts'.
- Shadows: cool slate rgba(15,23,42, …) layered under 10% alpha.
- Strategy: Restrained (tinted neutrals + one accent ≤10%).

## Typography
- Display: Sentient 500/700 (self-hosted woff2) — warm transitional serif, letterhead-professional; chosen by A/B against Clash Display and Author after two client rejections of sans displays. Serif justified per taste-skill: brand words demand warmth the cool palette can't carry; not Fraunces/Instrument.
- Body: General Sans 400/500/600.
- Mono: Fragment Mono 400 — small technical lines only (tech stacks, captions, labels).
- Committed scale (~1.2): 13/15/17/20/25/39/74px tokens (--t-xs … --t-hero). Body measure ≤65ch. Labels are sentence-case sans 600 (eyebrow grammar banned). Mono only for technical content.

## Components
- Card: #FFFFFF on band, 24px radius, 1px `--line` border, 3-layer cool shadow, static (lift only on actionable surfaces: doors, buttons).
- Gallery: horizontal scroll-snap strip of framed screenshots (frame: `--band-2`, 14px radius, hairline, inner hairline on the image); desktop circular arrow buttons; native swipe on touch.
- Buttons: pill; primary = ink-filled; default = white hairline; accent = teal outline → teal fill on hover.
- Status line: teal dot + medium-weight sentence.
- List: hairline-separated rows with a short teal tick, two columns ≥900px.

## Layout
- Content max 64rem; section padding clamp-based; full-bleed band via box-shadow spread.
- Sticky glass nav a half-step cooler than the body.

## Motion
- Entrance: fade + 14px rise, once, 0.65s cubic-bezier(.22,1,.36,1), inline stagger delays; elements visible by default (reveals only when body.js).
- Hover: card lift, button lift, arrow nudge — all ≤450ms, ease-out.
- No pins, no scrub, no parallax. Reduced motion: everything static and complete.
