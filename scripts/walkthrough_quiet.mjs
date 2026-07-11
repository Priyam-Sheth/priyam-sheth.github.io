// Full-page walkthrough — desktop 1440 + mobile 390, every section.
import { chromium } from 'playwright';
import http from 'http';
import { createReadStream, existsSync, mkdirSync } from 'fs';
import { extname, join } from 'path';

const ROOT = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const MIME = { '.html':'text/html', '.css':'text/css', '.js':'text/javascript',
  '.webp':'image/webp', '.png':'image/png', '.jpg':'image/jpeg', '.woff2':'font/woff2' };
const srv = http.createServer((req, res) => {
  const p = join(ROOT, decodeURIComponent(req.url.split('?')[0]).replace(/\/$/, '/index.html'));
  if (!existsSync(p)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'content-type': MIME[extname(p)] || 'application/octet-stream' });
  createReadStream(p).pipe(res);
}).listen(8332);

const OUT = join(ROOT, 'docs/renders/final-quiet');
mkdirSync(OUT, { recursive: true });
const msgs = [];
const b = await chromium.launch();

const SECTIONS = ['.hero', '.card:nth-of-type(1)', '.card:nth-of-type(2)', '.card:nth-of-type(3)',
  '.card:nth-of-type(4)', '#experience', '.skills', '#contact', 'footer'];
const NAMES = ['1-hero', '2-wolfeyes', '3-palak', '4-onyx', '5-donna', '6-experience', '7-skills', '8-contact', '9-footer'];

async function shoot(pg, tag, extraWaits = 0) {
  for (let i = 0; i < SECTIONS.length; i++) {
    const y = await pg.evaluate(sel => {
      const el = document.querySelector(sel);
      return el ? el.getBoundingClientRect().top + scrollY - 76 : null;
    }, SECTIONS[i]);
    if (y === null) { console.log('MISSING SECTION:', SECTIONS[i]); continue; }
    await pg.evaluate(v => window.scrollTo(0, Math.max(0, v)), y);
    await pg.waitForTimeout(1100 + extraWaits);
    await pg.screenshot({ path: join(OUT, `${tag}-${NAMES[i]}.png`) });
  }
  // Palak gallery mid-scroll (the report plate)
  await pg.evaluate(() => {
    const g = document.querySelectorAll('[data-gallery]')[1];
    const el = document.querySelector('.card:nth-of-type(2)');
    window.scrollTo(0, el.getBoundingClientRect().top + scrollY + 500);
    g.scrollLeft = 0;
  });
  await pg.waitForTimeout(900);
  await pg.screenshot({ path: join(OUT, `${tag}-3-palak-gallery.png`) });
}

const pg = await b.newPage({ viewport: { width: 1440, height: 900 } });
pg.on('console', m => msgs.push(['desk', m.type(), m.text()]));
pg.on('pageerror', e => msgs.push(['desk', 'pageerror', String(e)]));
await pg.goto('http://localhost:8332/index.html');
await pg.waitForTimeout(2800);
await shoot(pg, 'desk');
await pg.close();

const pm = await b.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
pm.on('console', m => msgs.push(['mob', m.type(), m.text()]));
pm.on('pageerror', e => msgs.push(['mob', 'pageerror', String(e)]));
await pm.goto('http://localhost:8332/index.html');
await pm.waitForTimeout(2800);
await shoot(pm, 'mob', 200);
const swipeOk = await pm.evaluate(() => {
  const g = document.querySelector('[data-gallery]');
  g.scrollLeft = 300; return g.scrollLeft > 100;
});
console.log('mobile gallery native-scrollable:', swipeOk);
// CLS probe
const cls = await pm.evaluate(() => new Promise(res => {
  let total = 0;
  new PerformanceObserver(l => l.getEntries().forEach(e => { if (!e.hadRecentInput) total += e.value; }))
    .observe({ type: 'layout-shift', buffered: true });
  setTimeout(() => res(total.toFixed(4)), 1200);
}));
console.log('CLS (mobile, buffered):', cls);
await pm.close();

await b.close(); srv.close();
const bad = msgs.filter(([, t]) => ['error', 'pageerror', 'warning'].includes(t));
console.log('CONSOLE:', bad.length ? JSON.stringify(bad) : 'CLEAN');
