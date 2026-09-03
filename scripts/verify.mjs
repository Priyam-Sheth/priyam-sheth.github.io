// Usage: node scripts/verify.mjs [outdir] [desk|mob|rm|nojs|lap]
// Verification loop: serve the portfolio, screenshot desktop + mobile at every section,
// plus a reduced-motion pass and a no-JS pass. Reports console errors, 404s, CLS, overflow.
import { chromium } from 'playwright';
import http from 'http';
import { createReadStream, existsSync, mkdirSync } from 'fs';
import { extname, join } from 'path';

const ROOT = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const OUT = process.argv[2] || join(ROOT, 'docs/renders');
const ONLY = process.argv[3] || '';
mkdirSync(OUT, { recursive: true });
const MIME = { '.html':'text/html', '.css':'text/css', '.js':'text/javascript', '.webp':'image/webp', '.png':'image/png', '.jpg':'image/jpeg', '.svg':'image/svg+xml', '.woff2':'font/woff2' };
const srv = http.createServer((req, res) => {
  const p = join(ROOT, decodeURIComponent(req.url.split('?')[0]).replace(/\/$/, '/index.html'));
  if (!existsSync(p)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'content-type': MIME[extname(p)] || 'application/octet-stream' });
  createReadStream(p).pipe(res);
}).listen(8342);

const SECTIONS = ['.hero', '.board', '#system', '#wolf-eyes', '#palak-os', '#studio-onyx', '#erp', '#uics', '#donna', '#method', '#about', '#contact'];
const b = await chromium.launch();

async function pass(tag, opts, { fullPage = true, sections = true } = {}) {
  const ctx = await b.newContext(opts);
  const pg = await ctx.newPage();
  const errs = [], missing = [];
  pg.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') errs.push(m.type() + ': ' + m.text()); });
  pg.on('response', r => { if (r.status() >= 400) missing.push(r.status() + ' ' + r.url()); });
  if (opts.javaScriptEnabled !== false) await pg.addInitScript(() => {
    window.__cls = 0;
    new PerformanceObserver(l => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value; }).observe({ type: 'layout-shift', buffered: true });
  });
  await pg.goto('http://localhost:8342/', { waitUntil: 'networkidle' });
  await pg.waitForTimeout(600);
  await pg.screenshot({ path: join(OUT, `${tag}-00-fold.png`) });
  if (sections) {
    for (let i = 0; i < SECTIONS.length; i++) {
      const y = await pg.evaluate(sel => { const el = document.querySelector(sel); return el ? el.getBoundingClientRect().top + scrollY - 64 : null; }, SECTIONS[i]);
      if (y === null) { console.log('MISSING', SECTIONS[i]); continue; }
      await pg.evaluate(v => scrollTo({ top: Math.max(0, v), behavior: 'instant' }), y);
      await pg.waitForTimeout(1400);
      await pg.screenshot({ path: join(OUT, `${tag}-${String(i + 1).padStart(2, '0')}-${SECTIONS[i].replace(/[#.]/g, '')}.png`) });
    }
  }
  // stack mid-transition sample (desktop): halfway between sheet 1 and 2
  if (tag === 'desk') {
    const y = await pg.evaluate(() => { const a = document.querySelector('#palak-os'); return a.getBoundingClientRect().top + scrollY - innerHeight * 0.55; });
    await pg.evaluate(v => scrollTo({ top: v, behavior: 'instant' }), y);
    await pg.waitForTimeout(600);
    await pg.screenshot({ path: join(OUT, `${tag}-stack-mid.png`) });
  }
  if (fullPage) {
    try { await pg.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 500) { scrollTo(0, y); await new Promise(r => setTimeout(r, 40)); } scrollTo(0, 0); }); } catch {}
    await pg.waitForTimeout(800);
    await pg.screenshot({ path: join(OUT, `${tag}-full.png`), fullPage: true });
  }
  let info = 'n/a';
  try { info = await pg.evaluate(() => ({
    height: document.documentElement.scrollHeight,
    overflow: document.documentElement.scrollWidth > innerWidth ? (document.documentElement.scrollWidth - innerWidth) : 0,
    cls: window.__cls,
    wide: [...document.querySelectorAll('body *')].filter(el => { const r = el.getBoundingClientRect(); return r.right > innerWidth + 2 && getComputedStyle(el).position !== 'fixed' && !el.closest('.stage, .echo, .track-wrap, .diagram-scroll'); }).slice(0, 6).map(el => el.tagName + '.' + el.className),
  })); } catch (e) { info = 'evaluate skipped: ' + String(e.message).slice(0, 80); }
  console.log(`[${tag}]`, JSON.stringify(info), 'errors:', errs.length ? errs : 'none', 'missing:', missing.length ? missing : 'none');
  await ctx.close();
}

if (!ONLY || ONLY === 'desk') await pass('desk', { viewport: { width: 1440, height: 900 } });
if (!ONLY || ONLY === 'mob') await pass('mob', { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
if (!ONLY || ONLY === 'rm') await pass('rm', { viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' }, { fullPage: true, sections: false });
if (!ONLY || ONLY === 'nojs') await pass('nojs', { viewport: { width: 1440, height: 900 }, javaScriptEnabled: false }, { fullPage: true, sections: false });
if (!ONLY || ONLY === 'lap') await pass('lap', { viewport: { width: 1280, height: 720 } }, { fullPage: false, sections: true });
await b.close(); srv.close();
