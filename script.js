document.getElementById('year').textContent = new Date().getFullYear();

// Fade sections in as they scroll into view
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// Theme switcher: "default" (Full Stack) or "mobile"
function applyTheme(theme) {
  if (theme === 'mobile') document.documentElement.setAttribute('data-theme', 'mobile');
  else document.documentElement.removeAttribute('data-theme');

  document.querySelectorAll('[data-set-theme]').forEach((btn) => {
    btn.setAttribute('aria-pressed', String(btn.dataset.setTheme === theme));
  });
}

applyTheme(document.documentElement.getAttribute('data-theme') === 'mobile' ? 'mobile' : 'default');

document.querySelectorAll('[data-set-theme]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const theme = btn.dataset.setTheme;
    applyTheme(theme);
    try { localStorage.setItem('theme', theme); } catch (e) {}
    // Elements hidden in the previous theme were never observed as visible
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
  });
});
