# Deploy — GitHub Pages (Quiet Luxury final)

## Pre-push prune (one-time, before the first deploy)
```bash
cd C:\Users\priya\portfolio
# retired assets from earlier eras — not referenced by the shipped page:
rm -rf assets/textures assets/diagrams assets/processed assets/donna assets/palak-os assets/studio-onyx assets/wolf-eyes
rm -f "assets/WhatsApp Image 2026-07-11 at 6.14.55 PM.jpeg"
rm -f assets/fonts/boska-* assets/fonts/zodiak-* assets/fonts/clash-display-* \
      assets/fonts/cabinet-grotesk-* assets/fonts/switzer-* assets/fonts/author-600.woff2 assets/fonts/author-700.woff2 \
      assets/fonts/fragment-mono-400-italic.woff2
# keep: sentient-500/700, general-sans-400/500/600, fragment-mono-400, assets/processed2/, assets/og.png
```
Verify after pruning: `node scripts/walkthrough_quiet.mjs` (console CLEAN, no 404s)
and `node ~/.claude/skills/impeccable/scripts/detect.mjs --json index.html` (exit 0).

## One-time setup
```bash
git init
git add .
git commit -m "Portfolio: quiet luxury final"
gh repo create Priyam-Sheth/priyam-sheth.github.io --public --source=. --push
```

## Enable Pages
GitHub → repo → Settings → Pages → Source: **Deploy from a branch** → `main` / `/ (root)` → Save.
Live in ~1 minute. `.nojekyll` is already in place.

## Post-domain migration
When the client moves the platform off the app subdomain, swap the Wolf Eyes live link:
`https://app.b2bwolfeyes.in` → `https://b2bwolfeyes.in` (one href in index.html).

## After the URL exists
- Set the absolute OG image URL in index.html:
  `<meta property="og:image" content="https://priyam-sheth.github.io/assets/og.png">`
  (relative og:image does not resolve on most scrapers)
- Optionally add `<link rel="canonical" href="https://priyam-sheth.github.io/">`

## What ships / what doesn't
- Ships: index.html, src/quiet/, assets/fonts (7 files), assets/processed2/, assets/og.png, .nojekyll
- Dev-only (add to .gitignore or leave; they don't affect the page): node_modules, package*.json,
  scripts/, docs/, PRODUCT.md, DESIGN.md, .impeccable/, .agents/

## Updating later
```bash
git add . && git commit -m "update" && git push
```
Quality gate before every push: `npx impeccable detect` clean (or the script path above).
