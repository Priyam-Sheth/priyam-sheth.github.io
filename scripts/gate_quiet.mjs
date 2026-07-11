// Quiet Luxury Light gate render — desktop 1440 + mobile 390, console watched.
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
}).listen(8326);

const OUT = join(ROOT, 'docs/renders/quiet-gate');
mkdirSync(OUT, { recursive: true });
const msgs = [];
const b = await chromium.launch();

const pg = await b.newPage({ viewport: { width: 1440, height: 900 } });
pg.on('console', m => msgs.push(['desk', m.type(), m.text()]));
pg.on('pageerror', e => msgs.push(['desk', 'pageerror', String(e)]));
await pg.goto('http://localhost:8326/index.html');
await pg.waitForTimeout(2600);
await pg.screenshot({ path: join(OUT, 'desk-hero.png') });
const cardY = await pg.evaluate(() => document.querySelector('.card').getBoundingClientRect().top + scrollY - 90);
await pg.evaluate(y => window.scrollTo(0, y), cardY);
await pg.waitForTimeout(1300);
await pg.screenshot({ path: join(OUT, 'desk-card-top.png') });
await pg.evaluate(y => window.scrollTo(0, y + 640), cardY);
await pg.waitForTimeout(1300);
await pg.screenshot({ path: join(OUT, 'desk-card-gallery.png') });
// hover the card + gallery arrow check
await pg.evaluate(() => document.querySelector('[data-next]').click());
await pg.waitForTimeout(900);
await pg.screenshot({ path: join(OUT, 'desk-gallery-next.png') });
await pg.close();

const pm = await b.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
pm.on('console', m => msgs.push(['mob', m.type(), m.text()]));
pm.on('pageerror', e => msgs.push(['mob', 'pageerror', String(e)]));
await pm.goto('http://localhost:8326/index.html');
await pm.waitForTimeout(2600);
await pm.screenshot({ path: join(OUT, 'mob-hero.png') });
const mCardY = await pm.evaluate(() => document.querySelector('.card').getBoundingClientRect().top + scrollY - 70);
await pm.evaluate(y => window.scrollTo(0, y), mCardY);
await pm.waitForTimeout(1300);
await pm.screenshot({ path: join(OUT, 'mob-card.png') });
await pm.evaluate(y => window.scrollTo(0, y + 900), mCardY);
await pm.waitForTimeout(1300);
await pm.screenshot({ path: join(OUT, 'mob-gallery.png') });
const swipeOk = await pm.evaluate(() => { const g = document.querySelector('[data-gallery]');
  g.scrollLeft = 300; return g.scrollLeft > 100; });
console.log('mobile gallery native-scrollable:', swipeOk);
await pm.close();

await b.close(); srv.close();
const bad = msgs.filter(([, t]) => ['error', 'pageerror', 'warning'].includes(t));
console.log('CONSOLE:', bad.length ? JSON.stringify(bad) : 'CLEAN');
