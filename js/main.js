gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  const carousel = new DetoxCarousel(ebookEditions);
  carousel.init();

  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  const navLinks = document.querySelectorAll('.navbar-links a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  ScrollTrigger.batch('.volume-card', {
    start: 'top 88%',
    once: true,
    onEnter: batch => gsap.from(batch, {
      opacity: 0, y: 40, duration: 0.5, stagger: 0.1, ease: 'power3.out',
      immediateRender: false,
    }),
  });

  ScrollTrigger.batch('.benefit-card-large', {
    start: 'top 88%',
    once: true,
    onEnter: batch => gsap.from(batch, {
      opacity: 0, y: 40, duration: 0.6, stagger: 0.12, ease: 'power3.out',
      immediateRender: false,
    }),
  });

  ScrollTrigger.batch('.step-card', {
    start: 'top 88%',
    once: true,
    onEnter: batch => gsap.from(batch, {
      opacity: 0, y: 30, duration: 0.5, stagger: 0.15, ease: 'power3.out',
      immediateRender: false,
    }),
  });

  ScrollTrigger.batch('.testimonial-card', {
    start: 'top 88%',
    once: true,
    onEnter: batch => gsap.from(batch, {
      opacity: 0, y: 30, duration: 0.5, stagger: 0.12, ease: 'power3.out',
      immediateRender: false,
    }),
  });

  gsap.to('.parallax-bg', {
    scrollTrigger: {
      trigger: '.parallax-section',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1.2,
    },
    y: '18%',
    ease: 'none',
  });

  gsap.from('.pain-inner', {
    scrollTrigger: { trigger: '.pain-section', start: 'top 85%', once: true },
    opacity: 0, y: 30, duration: 0.6, ease: 'power3.out',
    immediateRender: false,
  });

  gsap.from('.guarantee-inner', {
    scrollTrigger: { trigger: '.guarantee-section', start: 'top 85%', once: true },
    opacity: 0, y: 30, duration: 0.6, ease: 'power3.out',
    immediateRender: false,
  });

  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isActive = item.classList.contains('active');
      document.querySelectorAll('.faq-item.active').forEach(el => el.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });

  // --- Floating fruits across sections ---
  const fruitImages = [
    'kiwi.webp', 'limao.webp', 'laranja.webp', 'cenoura.webp', 'morango.webp', 'roma.webp'
  ];
  const fruitPath = 'assets/images/fruits/';

  const fruitThemes = {
    'kiwi':    { bgPrimary: '#D4EDDA', bgGradient: '#A8D5A2', accent: '#2E7D32', textHero: '#1B5E20', badge: '#66BB6A' },
    'limao':   { bgPrimary: '#D4EDDA', bgGradient: '#A8D5A2', accent: '#2E7D32', textHero: '#1B5E20', badge: '#66BB6A' },
    'morango': { bgPrimary: '#FFEBEE', bgGradient: '#EF9A9A', accent: '#C62828', textHero: '#B71C1C', badge: '#EF5350' },
    'roma':    { bgPrimary: '#FFEBEE', bgGradient: '#EF9A9A', accent: '#C62828', textHero: '#B71C1C', badge: '#EF5350' },
    'laranja': { bgPrimary: '#FFF3E0', bgGradient: '#FFCC80', accent: '#E65100', textHero: '#BF360C', badge: '#FF7043' },
    'cenoura': { bgPrimary: '#FFF3E0', bgGradient: '#FFCC80', accent: '#E65100', textHero: '#BF360C', badge: '#FF7043' },
  };
  const fruitToEdition = { 'kiwi': 0, 'limao': 0, 'morango': 1, 'roma': 1, 'laranja': 2, 'cenoura': 2 };

  document.querySelectorAll('.section-deco').forEach(container => {
    const count = 3 + Math.floor(Math.random() * 2);
    const positions = [
      { top: '3%', left: '2%' },
      { top: '2%', right: '3%' },
      { bottom: '5%', left: '4%' },
      { bottom: '4%', right: '2%' },
    ];

    for (let i = 0; i < count && i < positions.length; i++) {
      const img = document.createElement('img');
      const idx = Math.floor(Math.random() * fruitImages.length);
      img.src = fruitPath + fruitImages[idx];
      img.alt = '';
      img.className = 'deco-fruit';
      img.loading = 'lazy';

      const pos = positions[i];
      const size = 80 + Math.floor(Math.random() * 40);
      const delay = (Math.random() * 4).toFixed(1);
      Object.assign(img.style, {
        width: size + 'px',
        animationDelay: delay + 's',
        ...pos,
      });

      container.appendChild(img);
    }
  });

  // --- Click fruit to change theme ---
  document.addEventListener('click', e => {
    const fruit = e.target.closest('.deco-fruit');
    if (!fruit) return;
    const src = fruit.getAttribute('src');
    const name = src.split('/').pop().replace('.webp', '');
    const theme = fruitThemes[name];
    if (!theme) return;
    const root = document.documentElement;
    root.style.setProperty('--color-bg-primary', theme.bgPrimary);
    root.style.setProperty('--color-bg-gradient', theme.bgGradient);
    root.style.setProperty('--color-accent', theme.accent);
    root.style.setProperty('--color-text-hero', theme.textHero);
    root.style.setProperty('--color-badge', theme.badge);
    const edIdx = fruitToEdition[name];
    if (edIdx !== undefined && carousel.currentIndex !== edIdx) {
      carousel.goTo(edIdx);
    }
  });

  ScrollTrigger.refresh();
});
