/* Priyam Sheth · portfolio v2
   Everything here is enhancement. The page reads complete without it.
   No libraries. ~300 lines: parallax stage, sticky stack, tickers,
   comparison slider, two demos, diagram lighting, copy button. */
(() => {
  'use strict';
  document.body.classList.add('js');
  const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const FINE = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  /* ---------- scroll progress fallback (no scroll-timeline support) ---------- */
  const progress = $('.progress');
  if (progress && !CSS.supports('animation-timeline: scroll()')) {
    const tick = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    };
    addEventListener('scroll', tick, { passive: true }); tick();
  }

  /* ---------- reveals: hide only what is below the fold, once ---------- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  $$('.r').forEach(el => {
    if (REDUCED || el.getBoundingClientRect().top < innerHeight * 0.92) el.classList.add('in');
    else io.observe(el);
  });

  /* ---------- hero stage: cursor tilt (spring lerp) + scroll separation ---------- */
  const stage = $('[data-stage]');
  if (stage && !REDUCED) {
    const inner = $('.stage-inner', stage);
    const planes = $$('.plane', stage).map(p => ({ el: p, depth: parseFloat(p.dataset.depth || '1') }));
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0, sy = 0;
    const render = () => {
      raf = 0;
      cx += (tx - cx) * 0.08; cy += (ty - cy) * 0.08;
      inner.style.transform = `rotateX(${(-cy * 5).toFixed(2)}deg) rotateY(${(cx * 7).toFixed(2)}deg)`;
      planes.forEach(({ el, depth }) => {
        const y = -sy * depth * 0.22;
        const z = (depth - 1) * 90 + cx * depth * 14;
        el.style.setProperty('--y', `${y.toFixed(1)}px`);
        el.style.setProperty('--z', `${z.toFixed(1)}px`);
        el.style.setProperty('--x', `${(cx * depth * 10).toFixed(1)}px`);
      });
      if (Math.abs(tx - cx) > 0.002 || Math.abs(ty - cy) > 0.002) raf = requestAnimationFrame(render);
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(render); };
    if (FINE) {
      const hero = stage.closest('.hero');
      hero.addEventListener('pointermove', e => {
        const r = hero.getBoundingClientRect();
        tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
        ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
        kick();
      });
      hero.addEventListener('pointerleave', () => { tx = 0; ty = 0; kick(); });
    }
    addEventListener('scroll', () => {
      const r = stage.getBoundingClientRect();
      sy = clamp(-r.top + 80, 0, 900);
      kick();
    }, { passive: true });
  }

  /* ---------- the stack: previous sheet scales back as the next covers it ---------- */
  const stack = $('.stack');
  if (stack && !REDUCED) {
    const sheets = $$('.sheet', stack);
    const mq = matchMedia('(min-width: 1000px) and (min-height: 720px)');
    const top = () => parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) + 20;
    const update = () => {
      if (!mq.matches) { stack.classList.remove('stacked'); sheets.forEach(s => s.style.removeProperty('--p')); return; }
      stack.classList.add('stacked');
      const t = top();
      sheets.forEach((s, i) => {
        // a sheet taller than the viewport pins with its bottom in view, so nothing is ever hidden
        const h0 = s.offsetHeight;
        s.style.top = `${Math.min(t, innerHeight - h0 - 16)}px`;
        const next = sheets[i + 1];
        if (!next) { s.style.setProperty('--p', 0); return; }
        const nr = next.getBoundingClientRect();
        const h = s.getBoundingClientRect().height;
        const p = clamp(1 - (nr.top - t) / h, 0, 1);
        s.style.setProperty('--p', p.toFixed(3));
      });
    };
    addEventListener('scroll', update, { passive: true });
    addEventListener('resize', update);
    update();
  }

  /* ---------- number tickers ---------- */
  const fmt = new Intl.NumberFormat('en-IN');
  const tickers = $$('[data-n]');
  if (tickers.length) {
    const run = el => {
      const target = parseFloat(el.dataset.n), suffix = el.dataset.suffix || '', prefix = el.dataset.prefix || '';
      const dec = (el.dataset.n.split('.')[1] || '').length;
      if (REDUCED) { el.textContent = prefix + fmt.format(target) + suffix; return; }
      const t0 = performance.now(), D = 1100;
      const step = now => {
        const p = clamp((now - t0) / D, 0, 1), e = 1 - Math.pow(1 - p, 4);
        const v = target * e;
        el.textContent = prefix + (dec ? v.toFixed(dec) : fmt.format(Math.round(v))) + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const tio = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { run(en.target); tio.unobserve(en.target); } }), { threshold: 0.6 });
    tickers.forEach(el => tio.observe(el));
  }

  /* ---------- diagram: nodes light up in sequence ---------- */
  const diagram = $('.diagram');
  if (diagram) {
    $$('.node', diagram).forEach((n, i) => n.style.setProperty('--d', `${i * 90}ms`));
    const dio = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { diagram.classList.add('on'); dio.disconnect(); } }), { threshold: 0.25 });
    dio.observe(diagram);
    // on phones the diagram scrolls sideways; start it a little in so the story reads left to right
    const scroller = diagram.closest('.diagram-scroll');
    if (scroller && scroller.scrollWidth > scroller.clientWidth) scroller.scrollLeft = 0;
  }

  /* ---------- before / after slider ---------- */
  $$('.compare').forEach(c => {
    const input = $('input', c);
    const set = v => c.style.setProperty('--cut', `${clamp(v, 0, 100)}%`);
    input.addEventListener('input', () => set(input.value));
    let dragging = false;
    const fromX = x => { const r = c.getBoundingClientRect(); const v = ((x - r.left) / r.width) * 100; input.value = v; set(v); };
    c.addEventListener('pointerdown', e => { dragging = true; c.setPointerCapture(e.pointerId); fromX(e.clientX); });
    c.addEventListener('pointermove', e => { if (dragging) fromX(e.clientX); });
    c.addEventListener('pointerup', () => dragging = false);
    c.addEventListener('pointercancel', () => dragging = false);
    set(input.value);
    if (!REDUCED) {
      // a single nudge when it first appears so the reader knows it moves
      const cio = new IntersectionObserver(es => es.forEach(en => {
        if (!en.isIntersecting) return; cio.disconnect();
        const t0 = performance.now();
        const go = now => { const p = clamp((now - t0) / 1400, 0, 1); const e = 1 - Math.pow(1 - p, 3);
          const v = 62 - 24 * Math.sin(e * Math.PI); input.value = v; set(v); if (p < 1) requestAnimationFrame(go); };
        setTimeout(() => requestAnimationFrame(go), 350);
      }), { threshold: 0.5 });
      cio.observe(c);
    }
  });

  /* ---------- ERP allocation demo: pass 1 exact, pass 2 substitute ---------- */
  const alloc = $('[data-alloc]');
  if (alloc) {
    const rows = $$('tbody tr', alloc);
    const bar = $('[data-alloc-status]');
    let timer = [];
    const reset = () => { timer.forEach(clearTimeout); timer = []; rows.forEach(r => { r.dataset.state = ''; $('.res', r).textContent = 'waiting'; $('.pass', r).textContent = '·'; }); if (bar) bar.textContent = 'Example rows · waiting'; };
    const play = () => {
      reset();
      if (REDUCED) { rows.forEach(r => finish(r)); if (bar) bar.textContent = 'Example rows · allocated'; return; }
      let t = 250;
      if (bar) bar.textContent = 'Pass 1 · exact matches';
      rows.forEach(r => { if (r.dataset.final === 'exact') { timer.push(setTimeout(() => finish(r), t)); t += 260; } });
      timer.push(setTimeout(() => { if (bar) bar.textContent = 'Pass 2 · substitutes within ±0.25 D'; }, t)); t += 400;
      rows.forEach(r => { if (r.dataset.final !== 'exact') { timer.push(setTimeout(() => finish(r), t)); t += 300; } });
      timer.push(setTimeout(() => { if (bar) bar.textContent = 'Allocated · 3 exact, 2 substituted, 1 short'; }, t));
    };
    const finish = r => { r.dataset.state = r.dataset.final; $('.res', r).textContent = r.dataset.label; $('.pass', r).textContent = r.dataset.final === 'exact' ? '1' : r.dataset.final === 'sub' ? '2' : '—'; };
    $('[data-alloc-replay]')?.addEventListener('click', play);
    const aio = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { play(); aio.disconnect(); } }), { threshold: 0.5 });
    aio.observe(alloc);
    reset();
  }

  /* ---------- UICS bucket demo: scans sort into expected / excess / unknown ---------- */
  const uics = $('[data-uics]');
  if (uics) {
    const counts = { expected: 0, excess: 0, unknown: 0 };
    const total = { expected: 412, excess: 9, unknown: 3 };
    const seq = [];
    for (let i = 0; i < 40; i++) seq.push(i === 12 || i === 27 || i === 33 ? 'excess' : i === 19 ? 'unknown' : 'expected');
    const els = { expected: $('[data-b="expected"]', uics), excess: $('[data-b="excess"]', uics), unknown: $('[data-b="unknown"]', uics) };
    const code = $('[data-scan-code]', uics), n = $('[data-scan-n]', uics);
    let timer = [];
    const paint = () => Object.keys(counts).forEach(k => {
      $('.k', els[k]).textContent = fmt.format(counts[k]);
      $('.fill', els[k]).style.setProperty('--f', (counts[k] / Math.max(total[k], 1)).toFixed(3));
    });
    const finishAll = () => { Object.assign(counts, total); paint(); if (n) n.textContent = fmt.format(424); if (code) code.textContent = 'done'; };
    const play = () => {
      timer.forEach(clearTimeout); timer = [];
      Object.keys(counts).forEach(k => counts[k] = 0); paint();
      if (REDUCED) { finishAll(); return; }
      let scanned = 0;
      seq.forEach((k, i) => timer.push(setTimeout(() => {
        // each visible scan stands for a burst of real ones so the counters reach the audit totals
        const burst = k === 'expected' ? Math.round(total.expected / 36) : 1;
        counts[k] = Math.min(total[k], counts[k] + burst); scanned += burst;
        if (code) code.textContent = 'WE' + String(18000 + ((i * 37) % 900)).padStart(5, '0') + '-C' + (1 + (i % 3));
        if (n) n.textContent = fmt.format(scanned);
        paint();
        if (i === seq.length - 1) timer.push(setTimeout(finishAll, 300));
      }, 120 + i * 95)));
    };
    $('[data-uics-replay]', uics)?.addEventListener('click', play);
    const uio = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { play(); uio.disconnect(); } }), { threshold: 0.5 });
    uio.observe(uics);
    paint();
  }

  /* ---------- copy email ---------- */
  $$('[data-copy]').forEach(b => b.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(b.dataset.copy); b.dataset.done = '1'; const t = b.textContent; b.textContent = 'Copied'; setTimeout(() => { b.textContent = t; b.dataset.done = ''; }, 1600); }
    catch { location.href = 'mailto:' + b.dataset.copy; }
  }));

  /* ---------- keyboard: sheet links inside the SVG diagram should scroll smoothly ---------- */
  $$('.diagram a').forEach(a => a.addEventListener('click', e => {
    const id = a.getAttribute('href'); const el = id && $(id);
    if (el) { e.preventDefault(); el.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth', block: 'start' }); history.replaceState(null, '', id); }
  }));
})();
