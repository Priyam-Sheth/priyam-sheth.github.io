/* Quiet Luxury Light — the only JS on the page.
   Soft entrance reveals (once, short, easeOut) + gallery arrows.
   No libraries. The page is complete without this file. */

document.body.classList.add('js');
const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;

// reveals: elements marked .r rise in once as they arrive
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (!en.isIntersecting) return;
    en.target.classList.add('in');
    io.unobserve(en.target);
  });
}, { threshold: 0.18, rootMargin: '0px 0px -4% 0px' });
document.querySelectorAll('.r').forEach(el => {
  // anything already in view on load reveals immediately (no pop-in on refresh mid-page)
  const rect = el.getBoundingClientRect();
  if (rect.top < innerHeight * 0.9) el.classList.add('in');
  else io.observe(el);
});

// gallery arrows (desktop nicety; touch scrolls natively)
document.querySelectorAll('[data-gallery-nav]').forEach(nav => {
  const gallery = nav.closest('.gallery-wrap').querySelector('[data-gallery]');
  const step = () => {
    const shot = gallery.querySelector('.shot');
    return shot ? shot.getBoundingClientRect().width + 16 : gallery.clientWidth * 0.8;
  };
  const prev = nav.querySelector('[data-prev]');
  const next = nav.querySelector('[data-next]');
  prev.addEventListener('click', () =>
    gallery.scrollBy({ left: -step(), behavior: REDUCED ? 'auto' : 'smooth' }));
  next.addEventListener('click', () =>
    gallery.scrollBy({ left: step(), behavior: REDUCED ? 'auto' : 'smooth' }));
  // arrows dim at the ends — the strip is not bottomless
  const setEnds = () => {
    prev.disabled = gallery.scrollLeft <= 4;
    next.disabled = gallery.scrollLeft >= gallery.scrollWidth - gallery.clientWidth - 4;
  };
  gallery.addEventListener('scroll', setEnds, { passive: true });
  setEnds();
});

// keyboard: focused galleries pan with arrow keys (no animation on keyboard actions)
document.querySelectorAll('[data-gallery]').forEach(gallery => {
  gallery.addEventListener('keydown', e => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    e.preventDefault();
    const shot = gallery.querySelector('.shot');
    const step = shot ? shot.getBoundingClientRect().width + 16 : gallery.clientWidth * 0.8;
    gallery.scrollBy({ left: e.key === 'ArrowRight' ? step : -step });
  });
});
