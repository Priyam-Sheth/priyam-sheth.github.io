# Stage 2 — Code-Native Asset Inventory (The Operator's Ledger)

Every visual on the site, its source, and its status. Nothing stock, nothing generated — all authored by code.

## Built this stage

| Asset | File | Status |
|---|---|---|
| Design constitution (tokens as constraints) | `src/styles/tokens.css` | ✅ Built — red budget, type rules, motion caps, space scale |
| Palak OS system schematic (FIG. 01) | `assets/palak-os/palak-os-schematic.svg` | ✅ Built — engineering-sheet conventions, animated flows, reduced-motion safe, a11y titled |

## Specified this stage, built in Stage 3 (they inherit the schematic's drawing language once it's approved)

| Asset | Treatment |
|---|---|
| **Wolf Eyes figure (FIG. 02)** | Account-hierarchy + approval-chain schematic: distributors → reps → dealers as a ruled tree; the channel-routing decision drawn as a switch; server-side redaction drawn as a filter mark on the pricing flow. Evidence tags: `~1,600-item catalogue`, `draft SOs → live Zoho books`, `W1–W6 shipped`. |
| **Donna figure (FIG. 03)** | Memory-palace schematic: retrieval path with LLM-rerank stage (`~$0.001/query`), the correction ledger drawn as tombstone marks (corrections scar, not scrub), the agent fleet as worker/critic pair with confirm-gate. Evidence tags: `retrieval 20/20`, `0 personal-life leaks`, `first mission $0.35`. |
| **Studio Onyx figure (FIG. 04)** | Batch state-machine strip: pre_submit → uploading → polling → post_processing → complete, drawn as stations on a rule; the MPO byte-level catch marked as an inspection stamp. Evidence tags: `idea → installed in 7 days`, `136 images / 1 overnight batch`. |
| **Paper grain** | Inline SVG `feTurbulence` filter at ~2% opacity on `--paper`. No image file. Test on cheap panels — kill it if it bands. |
| **Section stamps** | Type-only: Zodiak numerals in a 1.5px ink circle, red only on the active section. Arrive via `--t-stamp` steps() timing. |
| **Evidence tags** | Component: Fragment Mono, `--type-tag`, bracketed, graphite; red variant obeys red budget. |
| **Live-status strip (the B-steal)** | One thin mono strip, hairline-ruled top+bottom, placed once (below hero, above section 01). Content pattern: `LAST SHIPPED — <project> · <month>` ` / ` `CURRENTLY — <status>` ` / ` `LOCATION — AHMEDABAD, IN`. Values are build-time constants in one config block — Priyam edits one file to update. No JS ticker, no fake "live" cosplay: it's honest, dated status, which IS the Ledger register. |
| **Monogram / mark** | Type-set "PS." in Zodiak as the nav mark — unless Priyam supplies a preferred mark. |

## Screenshot slots (Priyam-supplied, framed as exhibits)

| Slot | Drop location | Fallback if never supplied |
|---|---|---|
| Wolf Eyes B2B — 2–4 screenshots (dealer catalogue, order flow, admin) | `assets/wolf-eyes/` | Figure 02 carries the section alone — layout reserves no dead space |
| Palak OS — 2–3 screenshots (dashboard, report in Telegram) | `assets/palak-os/` | Exhibit frames render as labeled empty plates ("EXHIBIT B — WITHHELD") — intentional, still in-language |

## Fonts (Stage 3 fetch, self-hosted woff2)

Zodiak + General Sans (Fontshare, free license) · Fragment Mono (Google/OFL). Subsetted, `font-display: swap`, preloaded display weights only.
