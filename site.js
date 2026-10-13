(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const btn = document.querySelector('.menu'), nav = document.getElementById('site-nav');
  btn.addEventListener('click', () => {
    const o = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', o); btn.setAttribute('aria-label', o ? 'Close menu' : 'Open menu');
    document.body.classList.toggle('lock', o);
  });
  const els = document.querySelectorAll('.reveal');
  const countUp = el => {
    const end = +el.dataset.count; if (reduce) return;
    let s = null; const dur = 1100;
    const step = ts => { s ??= ts; const p = Math.min(1, (ts - s) / dur); el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  };
  if (reduce || !('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return; }
  const io = new IntersectionObserver(es => es.forEach(x => {
    if (!x.isIntersecting) return;
    x.target.classList.add('in');
    x.target.querySelectorAll('[data-count]').forEach(countUp);
    io.unobserve(x.target);
  }), { threshold: 0.12 });
  els.forEach(e => io.observe(e));
})();
if (matchMedia('(prefers-reduced-motion: reduce)').matches) { document.querySelectorAll('svg').forEach(s => s.pauseAnimations && s.pauseAnimations()); }
