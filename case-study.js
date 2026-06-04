/* ============================================================
   Julia Mitka — Case Study JS
   ============================================================ */
'use strict';

/* ── CURSOR ── */
const cursor   = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');

if (cursor && follower) {
  let mx = 0, my = 0, fx = 0, fy = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
  });
  (function loop() {
    fx += (mx - fx) * 0.10; fy += (my - fy) * 0.10;
    follower.style.left = fx + 'px'; follower.style.top = fy + 'px';
    requestAnimationFrame(loop);
  })();

  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
      follower.style.width = '48px'; follower.style.height = '48px';
      follower.style.borderColor = 'rgba(17,17,17,0.4)';
    });
    el.addEventListener('mouseleave', () => {
      follower.style.width = '32px'; follower.style.height = '32px';
      follower.style.borderColor = 'rgba(17,17,17,0.2)';
    });
  });

  document.addEventListener('mouseleave', () => { cursor.style.opacity = '0'; follower.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { cursor.style.opacity = '1'; follower.style.opacity = '1'; });
}

/* ── PAGE TRANSITION OUT ── */
const layout = document.querySelector('.cs-layout');

function navigateWithTransition(href) {
  if (!layout) { window.location.href = href; return; }
  layout.classList.add('is-leaving');
  setTimeout(() => { window.location.href = href; }, 350);
}

document.querySelectorAll('a[href="index.html"], a.cs-footer-back').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    navigateWithTransition('index.html');
  });
});

/* ── HERO PARALLAX ── */
const heroBg = document.getElementById('hero-bg');
if (heroBg) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    heroBg.style.transform = `translateY(${y * 0.25}px)`;
  }, { passive: true });
}

/* ── SCROLL REVEAL ── */
const revealEls = document.querySelectorAll('.reveal');

revealEls.forEach((el) => {
  const siblings = Array.from(el.parentElement.querySelectorAll(':scope > .reveal'));
  const idx = siblings.indexOf(el);
  if (idx > 0) el.style.transitionDelay = `${idx * 80}ms`;
});

const revealObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('reveal--visible');
    revealObs.unobserve(entry.target);
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObs.observe(el));

/* ── ANNOTATED CALLOUTS ── */
const annotatedObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('cs-annotated--visible');
    annotatedObs.unobserve(entry.target);
  });
}, { threshold: 0.2 });

document.querySelectorAll('.cs-annotated').forEach(el => annotatedObs.observe(el));

/* ── STICKY NOTE HOVER LIFT ── */
document.querySelectorAll('.cs-sticky').forEach(note => {
  note.addEventListener('mouseenter', () => {
    note.style.zIndex = '10';
    note.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
  });
  note.addEventListener('mouseleave', () => {
    note.style.zIndex = '';
    note.style.boxShadow = '';
  });
});
