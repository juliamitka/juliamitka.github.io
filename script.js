/* ============================================================
   Julia Mitka Portfolio — JS v2
   ============================================================ */

'use strict';

/* ──────────────────────────────────────────────
   CUSTOM CURSOR
────────────────────────────────────────────── */
const cursor   = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');

if (cursor && follower) {
  let mx = 0, my = 0, fx = 0, fy = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  (function loop() {
    fx += (mx - fx) * 0.10;
    fy += (my - fy) * 0.10;
    follower.style.left = fx + 'px';
    follower.style.top  = fy + 'px';
    requestAnimationFrame(loop);
  })();

  // Grow on interactive elements
  const hoverEls = document.querySelectorAll('a, button, .skill, .proj-link');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => {
      follower.style.width       = '48px';
      follower.style.height      = '48px';
      follower.style.borderColor = 'rgba(17,17,17,0.4)';
    });
    el.addEventListener('mouseleave', () => {
      follower.style.width       = '32px';
      follower.style.height      = '32px';
      follower.style.borderColor = 'rgba(17,17,17,0.2)';
    });
  });

  // Invert cursor on dark project items
  const darkProjs = document.querySelectorAll('.proj--dark .proj-link');
  darkProjs.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.background    = '#fff';
      follower.style.borderColor = 'rgba(255,255,255,0.4)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.background    = '';
      follower.style.borderColor = 'rgba(17,17,17,0.2)';
    });
  });

  document.addEventListener('mouseleave', () => {
    cursor.style.opacity   = '0';
    follower.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity   = '1';
    follower.style.opacity = '1';
  });
}

/* ──────────────────────────────────────────────
   PROJECT COUNTER (left column)
   Updates 01 / 02 / 03 as you scroll
────────────────────────────────────────────── */
const projCur    = document.getElementById('proj-cur');
const projItems  = document.querySelectorAll('.proj');
const counterEl  = projCur ? projCur.closest('.proj-progress') : null;
const aboutEl    = document.getElementById('about');

if (projCur && projItems.length) {
  const projObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        projCur.textContent = String(entry.target.dataset.num);
      }
    });
  }, { threshold: 0.5 });

  projItems.forEach(p => projObserver.observe(p));
}

if (counterEl) {
  const skillsEl = document.querySelector('.skills-section');
  const hideEls  = [aboutEl, skillsEl].filter(Boolean);

  const hideSet = new Set();

  const hideObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) hideSet.add(entry.target);
      else hideSet.delete(entry.target);
      counterEl.style.opacity       = hideSet.size > 0 ? '0' : '1';
      counterEl.style.pointerEvents = hideSet.size > 0 ? 'none' : '';
    });
  }, { threshold: 0.5 });

  hideEls.forEach(el => hideObserver.observe(el));
}

/* ──────────────────────────────────────────────
   PROJECT CLICK — navigate to case study (with transition)
────────────────────────────────────────────── */
const splitEl = document.querySelector('.split');

function navigateWithTransition(href) {
  if (!splitEl) { window.location.href = href; return; }
  splitEl.classList.add('is-leaving');
  setTimeout(() => { window.location.href = href; }, 350);
}

projItems.forEach(proj => {
  proj.addEventListener('click', e => {
    const link = proj.querySelector('.proj-link');
    const href = link?.getAttribute('href');
    if (href && href !== '#') {
      e.preventDefault();
      navigateWithTransition(href);
    }
  });
});

// Force reload when restored from bfcache so all JS re-initialises
window.addEventListener('pageshow', e => {
  if (e.persisted) window.location.reload();
});

/* ──────────────────────────────────────────────
   SMOOTH ANCHOR SCROLL
────────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const id     = link.getAttribute('href');
    const target = id === '#' ? null : document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

/* ──────────────────────────────────────────────
   REVEAL ON SCROLL
────────────────────────────────────────────── */
const revealEls = document.querySelectorAll('.about-body p, .skills-block');

revealEls.forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${i * 60}ms`;
});

const revealObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('reveal--visible');
    revealObs.unobserve(entry.target);
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObs.observe(el));
