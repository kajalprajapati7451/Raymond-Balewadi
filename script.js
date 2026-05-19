/* ── Navbar scroll ── */
(function () {
  const nav = document.getElementById('mainNav');

  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ── Hero BG load ── */
window.addEventListener('load', function () {
  const bg = document.querySelector('.hero-bg');

  if (bg) {
    setTimeout(() => {
      bg.classList.add('loaded');
    }, 100);
  }
});

/* ── Hamburger / Mobile Menu ── */
(function () {
  const btn = document.getElementById('hamburgerBtn');
  const menu = document.getElementById('mobileMenu');
  const overlay = document.getElementById('menuOverlay');
  const close = document.getElementById('menuClose');
  const links = document.querySelectorAll('.menu-link');

  function openMenu() {
    btn.classList.add('open');
    menu.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    btn.classList.remove('open');
    menu.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  btn.addEventListener('click', openMenu);
  close.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);

  links.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
})();

/* ── Footer year ── */
document.getElementById('year').textContent =
  new Date().getFullYear();

/* ── Form submit ── */
function handleFormSubmit(btn) {
  const card = btn.closest(
    '.lead-form-card, .contact-form-card, .row'
  );

  const inputs = card
    ? card.querySelectorAll(
        'input[required], input[type="tel"]'
      )
    : [];

  let valid = true;

  inputs.forEach(inp => {
    inp.style.borderColor = '';

    if (!inp.value.trim()) {
      inp.style.borderColor = '#e05555';
      valid = false;
    }
  });

  if (!valid) {
    btn.style.animation = 'shake 0.4s ease';

    btn.addEventListener(
      'animationend',
      () => {
        btn.style.animation = '';
      },
      { once: true }
    );

    return;
  }

  btn.disabled = true;

  const orig = btn.textContent.trim();

  btn.textContent = 'Sending…';

  setTimeout(() => {
    btn.textContent = '✓ Request Received!';
    btn.classList.add('success');

    setTimeout(() => {
      btn.disabled = false;
      btn.classList.remove('success');
      btn.textContent = orig;
    }, 4000);
  }, 1200);
}

/* ── Shake keyframe ── */
(function () {
  const s = document.createElement('style');

  s.textContent = `
    @keyframes shake{
      0%,100%{transform:translateX(0)}
      20%{transform:translateX(-6px)}
      40%{transform:translateX(6px)}
      60%{transform:translateX(-4px)}
      80%{transform:translateX(4px)}
    }
  `;

  document.head.appendChild(s);
})();

/* ── Intersection Observer fade-in ── */
(function () {

  if (!('IntersectionObserver' in window)) {
    document
      .querySelectorAll('.fade-in')
      .forEach(el => el.classList.add('visible'));

    return;
  }

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {

        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }

      });
    },
    {
      threshold: 0.12
    }
  );

  document
    .querySelectorAll('.fade-in')
    .forEach(el => obs.observe(el));

})();

/* ── Smooth scroll with navbar offset ── */
document
  .querySelectorAll('a[href^="#"]')
  .forEach(link => {

    link.addEventListener('click', function (e) {

      const target = document.querySelector(
        this.getAttribute('href')
      );

      if (!target) return;

      e.preventDefault();

      const offset =
        document.getElementById('mainNav').offsetHeight + 20;

      window.scrollTo({
        top:
          target.getBoundingClientRect().top +
          window.scrollY -
          offset,
        behavior: 'smooth'
      });

    });

  });