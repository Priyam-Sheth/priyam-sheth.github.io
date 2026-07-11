// quick quiet-luxury reference study — 3 light-premium sites, hero + card regions
import { chromium } from 'playwright';
import { mkdirSync, statSync, unlinkSync } from 'fs';
import { join } from 'path';

const ROOT = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const OUT = join(ROOT, 'docs/moodboard-light');
mkdirSync(OUT, { recursive: true });

const SITES = [
  ['attio', 'https://attio.com'],
  ['stripe', 'https://stripe.com'],
  ['area17', 'https://area17.com'],
  ['medium-design', 'https://www.instrument.com'],
];

const b = await chromium.launch();
for (const [name, url] of SITES) {
  try {
    const pg = await b.newPage({ viewport: { width: 1440, height: 900 } });
    await pg.goto(url, { timeout: 25000, waitUntil: 'domcontentloaded' });
    await pg.waitForTimeout(4500);
    const f = join(OUT, `${name}-hero.png`);
    await pg.screenshot({ path: f });
    await pg.evaluate(() => window.scrollTo(0, innerHeight * 1.4));
    await pg.waitForTimeout(2200);
    await pg.screenshot({ path: join(OUT, `${name}-cards.png`) });
    await pg.close();
    // prune blanks (JS-walled)
    for (const s of [`${name}-hero.png`, `${name}-cards.png`]) {
      const p = join(OUT, s);
      if (statSync(p).size < 60000) { unlinkSync(p); console.log('pruned blank:', s); }
      else console.log('kept:', s, Math.round(statSync(p).size / 1024) + 'KB');
    }
  } catch (e) { console.log('skip', name, String(e).slice(0, 80)); }
}
await b.close();
