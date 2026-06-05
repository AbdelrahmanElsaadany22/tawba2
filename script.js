// Nav scroll effect
  const navbar = document.getElementById('navbar');
  const siteBrand = document.querySelector('.site-brand');
  const navToggle = document.getElementById('navToggle');
  const primaryNav = document.getElementById('primaryNav');

  function closeMobileMenu() {
    if (!navbar) return;
    navbar.classList.remove('menu-open');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
  }

  if (navToggle && navbar) {
    navToggle.addEventListener('click', () => {
      const isOpen = navbar.classList.toggle('menu-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  if (primaryNav) {
    primaryNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      closeMobileMenu();
    }
  });

  window.addEventListener('scroll', () => {
    const isScrolled = window.scrollY > 50;
    navbar.classList.toggle('scrolled', isScrolled);
    if (siteBrand) {
      siteBrand.classList.toggle('shrink', isScrolled);
    }
    if (isScrolled) {
      closeMobileMenu();
    }
  });

  // Tab switching
  function switchTab(id, evt) {
    document.querySelectorAll('.plans-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('tab-' + id).classList.add('active');
    if (evt && evt.currentTarget) {
      evt.currentTarget.classList.add('active');
    }
  }

  // Category switching (3 months vs monthly)
  function switchPlanCategory(category, evt) {
    document.querySelectorAll('.plan-category-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.plan-tabs-group .tabs').forEach(tabs => tabs.classList.remove('active'));

    if (evt && evt.currentTarget) {
      evt.currentTarget.classList.add('active');
    }

    const targetTabs = document.querySelector(`.plan-tabs-group .tabs[data-category="${category}"]`);
    if (!targetTabs) return;

    targetTabs.classList.add('active');

    const firstTab = targetTabs.querySelector('.tab-btn');
    if (firstTab) {
      firstTab.click();
    }
  }

  // Intersection Observer for reveal
  const revealEls = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => revealObs.observe(el));

  // Counter animation for stats
  function animateCounter(el, target, suffix = '') {
    let start = 0;
    const duration = 2000;
    const startTime = performance.now();
    const isPercent = suffix === '%';

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const statsObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        const target = parseInt(el.dataset.target);
        const suffix = el.dataset.target === '96' ? '%' : '+';
        animateCounter(el, target, el.dataset.target === '5' ? '+' : suffix);
        statsObs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-target]').forEach(el => statsObs.observe(el));

  // Send selected plan inquiry to WhatsApp
  const WHATSAPP_NUMBER = '201118341567';

  function getPlanText(btn) {
    const card = btn.closest('.plan-card');
    const panel = btn.closest('.plans-panel');

    const sectionTitle = panel?.querySelector('.plans-section-title')?.textContent?.trim() || '';
    const sessions = card?.querySelector('.plan-sessions')?.textContent?.replace(/\s+/g, ' ').trim() || '';
    const price = card?.querySelector('.plan-price')?.textContent?.replace(/\s+/g, ' ').trim() || '';

    const details = [sectionTitle, sessions].filter(Boolean).join(' - ');
    if (price) {
      return `${details}\nالسعر: ${price}`;
    }
    return details || 'خطة الاشتراك';
  }

  document.querySelectorAll('.plan-cta').forEach((btn) => {
    btn.addEventListener('click', function () {
      const planText = getPlanText(this);
      const message = `السلام عليكم، أريد الاستفسار عن الخطة التالية:\n${planText}`;
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      window.location.href = whatsappUrl;
    });
  });
