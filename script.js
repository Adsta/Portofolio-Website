/* Navbar border once the page scrolls */
const header = document.getElementById('siteHeader');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* Light/dark switch: system preference until the visitor picks one */
const root = document.documentElement;
const themeSwitch = document.getElementById('themeSwitch');
const systemDark = window.matchMedia('(prefers-color-scheme: dark)');
const isDark = () => root.dataset.theme ? root.dataset.theme === 'dark' : systemDark.matches;
const syncSwitch = () => themeSwitch.setAttribute('aria-checked', String(isDark()));
themeSwitch.addEventListener('click', () => {
  const next = isDark() ? 'light' : 'dark';
  root.dataset.theme = next;
  try { localStorage.setItem('theme', next); } catch (e) {}
  syncSwitch();
});
systemDark.addEventListener('change', syncSwitch);
syncSwitch();

/* Close the mobile menu after picking a link */
const navCollapse = document.getElementById('siteNav');
navCollapse.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  if (navCollapse.classList.contains('show')) bootstrap.Collapse.getOrCreateInstance(navCollapse).hide();
}));

/* One-time reveal on scroll */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
