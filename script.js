/* Masthead scroll state */
const mast = document.getElementById('masthead');
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY > 60;
  mast.classList.toggle('scrolled', scrolled);
  document.body.classList.toggle('scrolled', scrolled);
}, { passive: true });

/* Typewriter — calm cadence */
(function () {
  const phrases = [
    'studying Industrial Engineering at BINUS.',
    'designing prototypes in CAD/CAM.',
    'building games in Unity & C#.',
    'optimizing processes with Python & SQL.',
    'looking for what comes next.'
  ];
  const el = document.getElementById('typed');
  if (!el) return;
  let pi = 0, ci = 0, deleting = false;
  function tick () {
    const phrase = phrases[pi];
    if (!deleting) {
      el.textContent = phrase.slice(0, ++ci);
      if (ci === phrase.length) { deleting = true; return setTimeout(tick, 2400); }
    } else {
      el.textContent = phrase.slice(0, --ci);
      if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
    }
    setTimeout(tick, deleting ? 35 : 60);
  }
  setTimeout(tick, 1400);
})();

/* Scroll reveals (Intersection Observer) */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { 
    if (e.isIntersecting) { 
      e.target.classList.add('in'); 
      io.unobserve(e.target); 
    } 
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));