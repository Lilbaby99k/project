/* ============================================
   GOLDAI — script.js
   Sections: Navbar · Mobile Menu · Progress Bar ·
   Card Animations · Smooth Scroll
   ============================================ */

/* ── 1. NAVBAR SCROLL EFFECT ─────────────── */
(function () {
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
})();


/* ── 2. MOBILE MENU TOGGLE ───────────────── */
(function () {
  const toggle    = document.getElementById('menuToggle');
  const navLinks  = document.getElementById('navLinks');

  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
})();


/* ── 3. PROGRESS BAR ANIMATION ───────────── */
(function () {
  const fill    = document.getElementById('progressFill');
  const percent = document.getElementById('progressPercent');

  // ⚙️ EDIT THIS to change the progress percentage
  const TARGET_PERCENT = 67;

  let animated = false;

  function animateProgress () {
    if (animated) return;
    animated = true;

    fill.style.width = TARGET_PERCENT + '%';

    // Count-up animation for the percentage label
    let current = 0;
    const duration = 1800;
    const step     = 16;
    const increment = TARGET_PERCENT / (duration / step);

    const timer = setInterval(() => {
      current += increment;
      if (current >= TARGET_PERCENT) {
        current = TARGET_PERCENT;
        clearInterval(timer);
      }
      percent.textContent = Math.round(current) + '%';
    }, step);
  }

  // Trigger when the section enters the viewport
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) animateProgress();
      });
    },
    { threshold: 0.3 }
  );

  const section = document.querySelector('.progress-section');
  if (section) observer.observe(section);
})();


/* ── 4. CARD SCROLL REVEAL ───────────────── */
(function () {
  const cards = document.querySelectorAll('.card');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, Number(delay));
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  cards.forEach(card => observer.observe(card));
})();


/* ── 5. ROADMAP SCROLL REVEAL ────────────── */
(function () {
  const items = document.querySelectorAll('.roadmap-item:not(.active)');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '0.65';
        }
      });
    },
    { threshold: 0.4 }
  );

  items.forEach(item => observer.observe(item));
})();


/* ── 6. SMOOTH SCROLL FOR NAV LINKS ─────── */
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 70; // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();