/* =========================================================
   PHINDI'S BOUTIQUE — script.js
   Handles: mobile nav toggle, sticky navbar shadow,
   scroll-reveal animation, shop category filtering,
   and expanding story cards on the Stories page.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- mobile navigation toggle ---------- */
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navOverlay = document.querySelector('.nav-overlay');

  const closeNav = () => {
    hamburger?.classList.remove('open');
    navLinks?.classList.remove('open');
    navOverlay?.classList.remove('open');
    document.body.style.overflow = '';
  };

  const openNav = () => {
    hamburger?.classList.add('open');
    navLinks?.classList.add('open');
    navOverlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.contains('open');
      isOpen ? closeNav() : openNav();
    });
  }

  navOverlay?.addEventListener('click', closeNav);

  // close the mobile menu whenever a nav link is tapped
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  // close mobile menu on resize back to desktop width
  window.addEventListener('resize', () => {
    if (window.innerWidth > 860) closeNav();
  });

  /* ---------- sticky navbar shadow on scroll ---------- */
  const navbar = document.querySelector('.navbar');
  const handleNavShadow = () => {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 12);
  };
  handleNavShadow();
  window.addEventListener('scroll', handleNavShadow, { passive: true });

  /* ---------- smooth scrolling for in-page anchors ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId.length < 2) return; // ignore bare "#"
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ---------- scroll-reveal animation ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(el => observer.observe(el));
  } else {
    // fallback: just show everything
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  /* ---------- shop page: filter items by category ---------- */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const shopItems = document.querySelectorAll('[data-category]');

  if (filterButtons.length && shopItems.length) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // toggle active state
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.dataset.filter;

        shopItems.forEach(item => {
          const matches = category === 'all' || item.dataset.category === category;
          item.style.display = matches ? '' : 'none';
        });
      });
    });
  }

  /* ---------- stories page: expand / collapse full story ---------- */
  const storyTriggers = document.querySelectorAll('[data-story-toggle]');
  storyTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const storyId = trigger.dataset.storyToggle;
      const storyEl = document.getElementById(storyId);
      if (!storyEl) return;

      const isHidden = storyEl.classList.contains('hidden-story');
      // collapse any other open story first
      document.querySelectorAll('.story-detail').forEach(s => {
        if (s.id !== storyId) s.classList.add('hidden-story');
      });

      storyEl.classList.toggle('hidden-story', !isHidden);

      if (isHidden) {
        storyEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
