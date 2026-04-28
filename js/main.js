/* EcuCoreasur — main.js */

(function () {

  /* ── Navbar scroll ── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  /* ── Burger menu ── */
  const burger  = document.getElementById('burger');
  const navMenu = document.getElementById('navMenu');
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    navMenu.classList.toggle('open');
  });
  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('open');
      navMenu.classList.remove('open');
    });
  });

  /* ── Counter animation ── */
  function animateCounter(el) {
    const target = +el.dataset.to;
    const duration = 1600;
    const step = 16;
    const increment = target / (duration / step);
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = Math.floor(current);
    }, step);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.sb-num[data-to]').forEach(el => counterObserver.observe(el));

  /* ── Scroll reveal ── */
  const revealTargets = [
    '.pcard', '.about-quote-card', '.about-logo-frame', '.mv-card',
    '.seca-card', '.seca-benefits', '.ev-card', '.nw-card',
    '.pt-card', '.geo-card', '.ct-info', '.ct-form-wrap', '.ben-item'
  ];
  revealTargets.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('reveal');
      const delay = el.dataset.delay ? +el.dataset.delay : i * 80;
      el.style.transitionDelay = delay + 'ms';
    });
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ── Countdown timer — 21 May 2026 15:30 ── */
  (function () {
    const target = new Date('2026-05-21T15:30:00');
    const elDias     = document.getElementById('cd-dias');
    const elHoras    = document.getElementById('cd-horas');
    const elMinutos  = document.getElementById('cd-minutos');
    const elSegundos = document.getElementById('cd-segundos');
    const elBlocks   = document.getElementById('cd-blocks');
    const elExpired  = document.getElementById('cd-expired');

    if (!elDias) return;

    function pad(n) { return String(n).padStart(2, '0'); }

    function tick() {
      const diff = target - Date.now();
      if (diff <= 0) {
        elBlocks.style.display  = 'none';
        elExpired.style.display = 'block';
        return;
      }
      const totalSecs = Math.floor(diff / 1000);
      const dias    = Math.floor(totalSecs / 86400);
      const horas   = Math.floor((totalSecs % 86400) / 3600);
      const minutos = Math.floor((totalSecs % 3600) / 60);
      const segs    = totalSecs % 60;

      function update(el, val) {
        const str = pad(val);
        if (el.textContent !== str) {
          el.textContent = str;
          el.classList.remove('tick');
          void el.offsetWidth;
          el.classList.add('tick');
          setTimeout(() => el.classList.remove('tick'), 150);
        }
      }

      update(elDias,    dias);
      update(elHoras,   horas);
      update(elMinutos, minutos);
      update(elSegundos, segs);
    }

    tick();
    setInterval(tick, 1000);
  })();

  /* ── Contact form ── */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = '✓ Mensaje enviado';
      btn.style.background = '#16a34a';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = 'Enviar mensaje';
        btn.style.background = '';
        btn.disabled = false;
        form.reset();
      }, 4000);
    });
  }

})();
