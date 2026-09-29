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

// Journey: map scroll through the pinned section to
//   --prog  0..1  overall progress (progress bar, stage text)
//   --m     0..1  morph from mobile to full stack (device shape + page colors)
const root = document.documentElement;
const journey = document.querySelector('.journey');
const stages = document.querySelectorAll('.stage');
const clamp = (v) => Math.min(1, Math.max(0, v));
let ticking = false;

function updateJourney() {
  ticking = false;
  const scrollable = journey.offsetHeight - window.innerHeight;
  const prog = clamp(-journey.getBoundingClientRect().top / scrollable);
  const m = clamp((prog - 0.3) / 0.45);

  root.style.setProperty('--prog', prog.toFixed(3));
  root.style.setProperty('--m', m.toFixed(3));

  const active = prog < 0.12 ? 0 : prog < 0.38 ? 1 : prog < 0.66 ? 2 : 3;
  stages.forEach((s, i) => s.classList.toggle('is-active', i === active));
}

function requestUpdate() {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(updateJourney);
  }
}

window.addEventListener('scroll', requestUpdate, { passive: true });
window.addEventListener('resize', requestUpdate);
updateJourney();
