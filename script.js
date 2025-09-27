// Smooth in-view reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// Active nav on scroll
const sections = Array.from(document.querySelectorAll('section[id]'));
const navLinks = Array.from(document.querySelectorAll('nav a[href^="#"]'));

function setActiveLink() {
  const scrollPos = window.scrollY + 120;
  let currentId = '';
  for (const section of sections) {
    if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
      currentId = section.id;
      break;
    }
  }
  navLinks.forEach((a) => {
    const hrefId = a.getAttribute('href').slice(1);
    a.classList.toggle('active', hrefId === currentId);
  });
}
window.addEventListener('scroll', setActiveLink, { passive: true });
setActiveLink();

// Smooth scroll behavior for same-page anchors (fallback for browsers without CSS smooth-scroll)
navLinks.forEach((a) => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (id.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(id);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Tilt effect for elements with data-tilt
const tiltElements = Array.from(document.querySelectorAll('[data-tilt]'));
tiltElements.forEach((el) => {
  const strength = 12;
  function onMove(e) {
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    const rx = (py * strength).toFixed(2);
    const ry = (-px * strength).toFixed(2);
    el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
  }
  function reset() {
    el.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateZ(0)';
  }
  el.addEventListener('mousemove', onMove);
  el.addEventListener('mouseleave', reset);
});

// Ripple effect for buttons with .ripple
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.ripple');
  if (!btn) return;
  const rect = btn.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;
  btn.style.setProperty('--x', x + '%');
  btn.style.setProperty('--y', y + '%');
  btn.classList.remove('is-rippling');
  // Force reflow to restart animation
  void btn.offsetWidth;
  btn.classList.add('is-rippling');
  setTimeout(() => btn.classList.remove('is-rippling'), 650);
});



