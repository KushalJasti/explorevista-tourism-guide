'use strict';

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

function initNavbar() {
  const navbar = $('.ev-navbar');
  if (!navbar) return;

  const onScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
      navbar.classList.remove('hero-nav');
    } else {
      navbar.classList.remove('scrolled');
      if (navbar.dataset.hero === 'true') {
        navbar.classList.add('hero-nav');
      }
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  $$('.ev-navbar .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const collapse = $('.navbar-collapse');
      if (collapse && collapse.classList.contains('show')) {
        const toggler = $('.navbar-toggler');
        if (toggler) toggler.click();
      }
    });
  });

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  $$('.ev-navbar .nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

function initHero() {
  const heroBg = $('.ev-hero-bg');
  if (heroBg) {
    const img = new Image();
    img.onload = () => heroBg.classList.add('loaded');
    const bgUrl = getComputedStyle(heroBg).backgroundImage.match(/url\(["']?(.+?)["']?\)/)?.[1];
    if (bgUrl) img.src = bgUrl;
    else heroBg.classList.add('loaded');

    window.addEventListener('scroll', () => {
      const offset = window.scrollY * 0.3;
      heroBg.style.transform = `scale(1) translateY(${offset}px)`;
    }, { passive: true });
  }
}

function initScrollReveal() {
  const items = $$('.fade-in-up');
  if (!items.length) return;

  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced || !('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  items.forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 80}ms`;
    observer.observe(el);
  });
}

function initDestinationFilter() {
  const searchInput = $('#dest-search');
  const filterTabs = $$('.filter-tabs .filter-tab');
  const cards = $$('.dest-card-wrap');

  if (!cards.length) return;

  let activeCategory = 'all';
  let searchQuery = '';

  function applyFilter() {
    let matchCount = 0;
    cards.forEach(card => {
      const name = (card.dataset.name || '').toLowerCase();
      const category = (card.dataset.category || '').toLowerCase();
      const desc = (card.dataset.desc || '').toLowerCase();

      const matchSearch = !searchQuery || name.includes(searchQuery) || desc.includes(searchQuery);
      const matchCategory = activeCategory === 'all' || category === activeCategory;

      if (matchSearch && matchCategory) {
        card.style.display = '';
        card.style.opacity = '1';
        matchCount++;
      } else {
        card.style.display = 'none';
        card.style.opacity = '0';
      }
    });

    const noResults = $('#no-results');
    if (noResults) {
      noResults.style.display = matchCount === 0 ? 'block' : 'none';
    }
  }

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeCategory = tab.dataset.filter || 'all';
      applyFilter();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      searchQuery = searchInput.value.trim().toLowerCase();
      applyFilter();
    });
  }
}

function initGalleryFilter() {
  const filterTabs = $$('.filter-tabs .filter-tab');
  const items = $$('.gallery-card-wrap');
  if (!items.length || !filterTabs.length) return;

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.filter || 'all';

      items.forEach(item => {
        const cat = (item.dataset.category || '').toLowerCase();
        if (filter === 'all' || cat === filter) {
          item.style.display = '';
          item.style.opacity = '1';
        } else {
          item.style.display = 'none';
          item.style.opacity = '0';
        }
      });
    });
  });
}

function initHotelFilter() {
  const filterTabs = $$('.filter-tabs .filter-tab');
  const hotels = $$('.hotel-card-wrap');
  if (!hotels.length || !filterTabs.length) return;

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.filter || 'all';

      hotels.forEach(hotel => {
        const cat = (hotel.dataset.category || '').toLowerCase();
        if (filter === 'all' || cat === filter) {
          hotel.style.display = '';
          hotel.style.opacity = '1';
        } else {
          hotel.style.display = 'none';
          hotel.style.opacity = '0';
        }
      });
    });
  });
}

function initHeroSearch() {
  const form = $('#hero-search-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const val = $('#hero-search-input')?.value.trim();
    if (val) {
      window.location.href = `destinations.html?q=${encodeURIComponent(val)}`;
    }
  });

  if (window.location.pathname.includes('destinations')) {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    if (q) {
      const input = $('#dest-search');
      if (input) {
        input.value = q;
        input.dispatchEvent(new Event('input'));
      }
    }
    const cat = params.get('cat');
    if (cat) {
      const tab = $(`.filter-tab[data-filter="${cat}"]`);
      if (tab) tab.click();
    }
  }
}

function initLightbox() {
  const items = $$('.gallery-item[data-src]');
  const lightbox = $('#ev-lightbox');
  if (!items.length || !lightbox) return;

  const img = $('#lightbox-img');
  const caption = $('#lightbox-caption');
  const closeBtn = $('#lightbox-close');
  const prevBtn = $('#lightbox-prev');
  const nextBtn = $('#lightbox-next');

  let current = 0;
  let activeSources = [];
  let triggerElement = null;

  function getVisibleSources() {
    const visibleItems = items.filter(el => el.style.display !== 'none');
    return (visibleItems.length ? visibleItems : items).map(el => ({
      el,
      src: el.dataset.src,
      caption: el.dataset.caption || ''
    }));
  }

  function open(index, originEl = null) {
    activeSources = getVisibleSources();
    current = Math.max(0, Math.min(index, activeSources.length - 1));
    triggerElement = originEl || document.activeElement;
    img.src = activeSources[current].src;
    caption.textContent = activeSources[current].caption;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    closeBtn?.focus();
  }

  function close() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    if (triggerElement && typeof triggerElement.focus === 'function') {
      triggerElement.focus();
    }
  }

  function prev() {
    if (!activeSources.length) return;
    current = (current - 1 + activeSources.length) % activeSources.length;
    img.src = activeSources[current].src;
    caption.textContent = activeSources[current].caption;
  }

  function next() {
    if (!activeSources.length) return;
    current = (current + 1) % activeSources.length;
    img.src = activeSources[current].src;
    caption.textContent = activeSources[current].caption;
  }

  items.forEach(item => {
    const triggerOpen = () => {
      const sources = getVisibleSources();
      const idx = sources.findIndex(s => s.el === item);
      open(idx >= 0 ? idx : 0, item);
    };

    item.addEventListener('click', triggerOpen);
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        triggerOpen();
      }
    });
  });

  closeBtn?.addEventListener('click', close);
  prevBtn?.addEventListener('click', prev);
  nextBtn?.addEventListener('click', next);

  lightbox.addEventListener('click', e => { if (e.target === lightbox) close(); });

  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });
}

function initContactForm() {
  const form = $('#contact-form');
  if (!form) return;

  const successAlert = $('#form-success');

  function getErrorEl(field) {
    const key = field.id.replace('contact-', '');
    return $(`#${key}-error`);
  }

  function validate(field) {
    const val = field.value.trim();
    let ok = true;
    const errorEl = getErrorEl(field);

    if (field.required && !val) ok = false;
    if (field.type === 'email' && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) ok = false;

    if (!ok) {
      field.classList.add('is-invalid');
      field.setAttribute('aria-invalid', 'true');
      if (errorEl) errorEl.style.display = 'block';
    } else {
      field.classList.remove('is-invalid');
      field.setAttribute('aria-invalid', 'false');
      if (errorEl) errorEl.style.display = 'none';
    }
    return ok;
  }

  $$('input, textarea, select', form).forEach(field => {
    field.addEventListener('blur', () => validate(field));
    field.addEventListener('input', () => {
      if (field.classList.contains('is-invalid')) validate(field);
    });
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const fields = $$('input[required], textarea[required], select[required]', form);
    const allValid = fields.map(f => validate(f)).every(Boolean);

    if (!allValid) {
      fields.find(f => f.classList.contains('is-invalid'))?.focus();
      return;
    }

    const submitBtn = $('#form-submit');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="bi bi-hourglass-split me-2" aria-hidden="true"></i>Sending…';
    }

    setTimeout(() => {
      form.reset();
      fields.forEach(f => {
        f.classList.remove('is-invalid');
        f.setAttribute('aria-invalid', 'false');
        const err = getErrorEl(f);
        if (err) err.style.display = 'none';
      });

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="bi bi-send me-2" aria-hidden="true"></i>Send Message';
      }
      if (successAlert) {
        successAlert.classList.add('show');
        successAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        setTimeout(() => successAlert.classList.remove('show'), 8000);
      }
    }, 1200);
  });
}

function initScrollTop() {
  const btn = $('#scroll-top-btn');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

function initSmoothScroll() {
  $$('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href === '#' || href === '') return;
      const target = $(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

function initStatCounter() {
  const stats = $$('.stat-num[data-target]');
  if (!stats.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetStr = el.dataset.target;
        const isFloat = targetStr.includes('.');
        const target = parseFloat(targetStr);
        const suffix = el.dataset.suffix || '';
        const duration = 1400;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          if (isFloat) {
            el.textContent = current.toFixed(1) + suffix;
          } else {
            el.textContent = Math.floor(current).toLocaleString() + suffix;
          }
          if (current >= target) clearInterval(timer);
        }, 16);

        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(el => observer.observe(el));
}

function initNavCollapse() {
  document.addEventListener('click', e => {
    const collapse = $('.navbar-collapse');
    const toggler = $('.navbar-toggler');
    if (collapse && collapse.classList.contains('show')) {
      if (!collapse.contains(e.target) && !toggler.contains(e.target)) {
        toggler.click();
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHero();
  initScrollReveal();
  initDestinationFilter();
  initGalleryFilter();
  initHotelFilter();
  initHeroSearch();
  initLightbox();
  initContactForm();
  initScrollTop();
  initSmoothScroll();
  initStatCounter();
  initNavCollapse();
});
