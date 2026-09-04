// Usage: node scripts/og/build-og.mjs  -> writes assets/og.png (1200x630)
import { chromium } from 'playwright';
import http from 'http';
import { createReadStream, existsSync } from 'fs';
import { extname, join, dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..', '..');
const MIME = { '.webp': 'image/webp', '.woff2': 'font/woff2', '.png': 'image/png' };
const srv = http.createServer((req, res) => {
  const p = join(ROOT, decodeURIComponent(req.url.split('?')[0]));
  if (!existsSync(p)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'content-type': MIME[extname(p)] || 'application/octet-stream', 'access-control-allow-origin': '*' });
  createReadStream(p).pipe(res);
}).listen(8343);

const b = await chromium.launch();
const pg = await b.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await pg.goto(pathToFileURL(join(HERE, 'og.html')).href, { waitUntil: 'networkidle' });
await pg.evaluate(() => document.fonts.ready);
await pg.waitForTimeout(400);
await pg.screenshot({ path: join(ROOT, 'assets', 'og.png'), type: 'png' });
await b.close(); srv.close();
console.log('og written');
