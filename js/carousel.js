class DetoxCarousel {
  constructor(editions) {
    this.editions = editions;
    this.currentIndex = 0;
    this.isTransitioning = false;
    this.autoPlayTimer = null;

    this.slider = document.getElementById('carouselSlider');
    this.dotsContainer = document.getElementById('carouselDots');
    this.decoContainer = document.getElementById('decoContainer');
    this.heroSection = document.getElementById('hero');
    this.prevBtn = document.getElementById('prevBtn');
    this.nextBtn = document.getElementById('nextBtn');
  }

  init() {
    this.renderSlides();
    this.renderDots();
    this.renderDecos(0);
    this.setupListeners();
    this.applyTheme(0);
    this.showSlide(0, false);
    if (this.editions.length <= 1) {
      this.prevBtn.style.display = 'none';
      this.nextBtn.style.display = 'none';
      this.dotsContainer.style.display = 'none';
      document.querySelectorAll('.carousel-nav-mobile').forEach(el => el.style.display = 'none');
      return;
    }
    this.startAutoPlay();
  }

  renderSlides() {
    this.editions.forEach((ed, index) => {
      const slide = document.createElement('div');
      slide.className = 'carousel-slide';
      slide.dataset.index = index;

      slide.innerHTML = `
        <div class="hero-content">
          <div class="hero-product-section">
            <span class="flavor-badge">
              <span class="badge-dot"></span>
              ${ed.badge}
            </span>
            <h2 class="hero-title">${ed.headline}</h2>
            <p class="hero-subtitle">${ed.description}</p>
          </div>
          <ul class="benefits-list">
            ${ed.benefits.map(b => `<li class="benefit-card"><span class="benefit-dot"></span>${b}</li>`).join('')}
          </ul>
          <div class="hero-controls">
            <a href="${ed.link}" class="btn-primary" target="_blank" rel="noopener">
              Comprar Agora
              <span class="btn-arrow">→</span>
            </a>
          </div>
        </div>
        <div class="hero-visual">
          <div class="product-bottle-wrapper">
            <div class="bottle-placeholder" style="background:${ed.bottleColor}">
              <div class="bottle-cap"></div>
              <div class="bottle-neck"></div>
              <div class="bottle-body" style="background:linear-gradient(180deg, ${ed.bottleColor}, ${ed.bottleColor}dd)">
                <div class="bottle-label">
                  <span class="bottle-label-icon">○</span>
                  <span class="bottle-label-text">Detox Fit</span>
                </div>
              </div>
            </div>
            <img class="product-bottle" src="${ed.bottleImg}" alt="${ed.name}" style="display:none">
          </div>
          <div class="fruit-visual-container" data-slide="${index}"></div>
          <div class="carousel-nav-mobile">
            <div class="carousel-arrows-row">
              <button class="carousel-arrow-mobile" data-action="prev" aria-label="Anterior">‹</button>
              <button class="carousel-arrow-mobile" data-action="next" aria-label="Próximo">›</button>
            </div>
            <div class="carousel-dots-mobile"></div>
          </div>
        </div>
      `;

      this.slider.appendChild(slide);
    });
    this.loadBottleImages();
  }

  loadBottleImages() {
    this.slider.querySelectorAll('.product-bottle').forEach(img => {
      img.addEventListener('load', () => {
        const wrapper = img.closest('.product-bottle-wrapper');
        const placeholder = wrapper.querySelector('.bottle-placeholder');
        if (placeholder) placeholder.style.display = 'none';
        img.style.display = 'block';
      });
      if (img.complete && img.naturalWidth > 0) img.dispatchEvent(new Event('load'));
    });
  }

  renderDots() {
    this.editions.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.className = `dot${index === 0 ? ' active' : ''}`;
      dot.dataset.index = index;
      dot.setAttribute('aria-label', `Ir para ${this.editions[index].name}`);
      this.dotsContainer.appendChild(dot.cloneNode(true));
      document.querySelectorAll('.carousel-dots-mobile').forEach(container => {
        container.appendChild(dot.cloneNode(true));
      });
    });
  }

  renderDecos(index) {
    this.decoContainer.innerHTML = '';
    const ed = this.editions[index];
    const colors = [ed.bottleColor, ed.colors.accent, ed.bottleColor, ed.colors.accent];

    colors.forEach((color, i) => {
      const div = document.createElement('div');
      div.className = 'deco-circle';
      div.dataset.slot = i + 1;
      div.style.cssText = `background:${color};opacity:0.12;--deco-delay:${i * 0.8}s;`;
      this.decoContainer.appendChild(div);
    });

    const visualContainer = document.querySelector(`.fruit-visual-container[data-slide="${index}"]`);
    if (!visualContainer) return;
    visualContainer.innerHTML = '';

    if (ed.fruits && ed.fruits.length > 0) {
      ed.fruits.forEach((fruit, i) => {
        const img = document.createElement('img');
        img.className = 'fruit-visual';
        img.src = fruit.src;
        img.alt = '';
        img.draggable = false;
        img.style.cssText = `
          position: absolute;
          ${fruit.x !== undefined ? `left:${fruit.x}px;` : ''}
          ${fruit.y !== undefined ? `top:${fruit.y}px;` : ''}
          ${fruit.right !== undefined ? `right:${fruit.right}px;` : ''}
          ${fruit.bottom !== undefined ? `bottom:${fruit.bottom}px;` : ''}
          width: ${fruit.size || 120}px;
          height: auto;
          --deco-delay: ${i * 0.8}s;
        `;
        visualContainer.appendChild(img);
      });
    }
  }

  setupListeners() {
    this.prevBtn.addEventListener('click', () => this.goToPrev());
    this.nextBtn.addEventListener('click', () => this.goToNext());

    document.addEventListener('click', (e) => {
      const dot = e.target.closest('.dot');
      if (dot) this.goTo(parseInt(dot.dataset.index));
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.goToPrev();
      if (e.key === 'ArrowRight') this.goToNext();
    });

    let touchStartX = 0;
    this.heroSection.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    this.heroSection.addEventListener('touchend', (e) => {
      const diff = touchStartX - e.changedTouches[0].screenX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) this.goToNext();
        else this.goToPrev();
      }
    }, { passive: true });

    this.heroSection.addEventListener('mouseenter', () => this.stopAutoPlay());
    this.heroSection.addEventListener('mouseleave', () => this.startAutoPlay());

    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.carousel-arrow-mobile');
      if (!btn) return;
      if (btn.dataset.action === 'prev') this.goToPrev();
      else this.goToNext();
    });
  }

  applyTheme(index) {
    const ed = this.editions[index];
    const root = document.documentElement;
    root.style.setProperty('--color-bg-primary', ed.colors.bgPrimary);
    root.style.setProperty('--color-bg-gradient', ed.colors.bgGradient);
    root.style.setProperty('--color-accent', ed.colors.accent);
    root.style.setProperty('--color-text-hero', ed.colors.textHero);
    root.style.setProperty('--color-badge', ed.colors.badge);
  }

  showSlide(index, animate) {
    const from = this.slider.children[this.currentIndex];
    const to = this.slider.children[index];
    if (!from || !to) return;

    if (!animate) {
      Array.from(this.slider.children).forEach((s, i) => s.classList.toggle('active', i === index));
      return;
    }
    if (from === to) return;

    this.isTransitioning = true;

    const goingNext = index > this.currentIndex;
    const dir = goingNext ? 1 : -1;
    const slideX = 280;

    const fromContent = from.querySelectorAll('.hero-content > *');
    const fromBottle = from.querySelector('.product-bottle-wrapper');
    const toContent = to.querySelectorAll('.hero-content > *');
    const toBottle = to.querySelector('.product-bottle-wrapper');
    const fromFruits = from.querySelectorAll(`.fruit-visual-container[data-slide="${this.currentIndex}"] .fruit-visual`);
    const toFruits = to.querySelectorAll(`.fruit-visual-container[data-slide="${index}"] .fruit-visual`);
    const hasFromFruits = fromFruits.length > 0;
    const hasToFruits = toFruits.length > 0;

    if (hasToFruits) gsap.set(toFruits, { opacity: 0, x: dir * slideX * 0.5, scale: 0.5 });
    gsap.set(toContent, { opacity: 0, x: dir * slideX * 0.25, filter: 'blur(4px)' });
    gsap.set(toBottle, { opacity: 0, x: dir * slideX, rotationY: dir * -45, scale: 0.8, filter: 'blur(6px)' });
    gsap.set('.deco-circle', { opacity: 0, scale: 0.5 });

    const tl = gsap.timeline({
      defaults: { ease: 'power3.inOut' },
      onComplete: () => {
        gsap.set(toBottle, { filter: 'blur(0px)' });
        gsap.set(toContent, { filter: 'blur(0px)' });
        this.currentIndex = index;
        this.isTransitioning = false;
      },
    });

    tl
      .to(fromContent, { opacity: 0, x: dir * -slideX * 0.25, filter: 'blur(4px)', duration: 0.35, stagger: 0.05, ease: 'power2.in' }, 0)
      .to(fromBottle, { opacity: 0, x: dir * -slideX, rotationY: dir * 45, scale: 0.8, filter: 'blur(6px)', duration: 0.4, ease: 'power2.in' }, 0);

    if (hasFromFruits) tl.to(fromFruits, { opacity: 0, x: dir * -slideX * 0.5, scale: 0.5, duration: 0.3 }, 0);

    tl
      .to('.deco-circle', { opacity: 0, scale: 0.4, duration: 0.2, stagger: 0.03, ease: 'power2.in' }, 0)
      .add(() => {
        gsap.set(fromContent, { x: 0, filter: 'blur(0px)' });
        gsap.set(fromBottle, { x: 0, rotationY: 0, scale: 1, filter: 'blur(0px)' });
        from.classList.remove('active');
        to.classList.add('active');
        this.applyTheme(index);
        this.updateDots();
        this.renderDecos(index);
      })
      .to(toBottle, { opacity: 1, x: 0, rotationY: 0, scale: 1, filter: 'blur(0px)', duration: 0.7, ease: 'power3.out' }, 0.15);

    if (hasToFruits) tl.to(toFruits, { opacity: 1, x: 0, scale: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out' }, 0.2);

    tl
      .to(toContent, { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.55, stagger: 0.07, ease: 'power3.out' }, 0.25)
      .to('.deco-circle', { opacity: 0.12, scale: 1, duration: 0.4, stagger: 0.08, ease: 'back.out(2)' }, 0.3);
  }

  goTo(index) {
    if (this.isTransitioning || index === this.currentIndex) return;
    this.showSlide(index, true);
  }

  goToNext() {
    const next = (this.currentIndex + 1) % this.editions.length;
    this.goTo(next);
  }

  goToPrev() {
    const prev = (this.currentIndex - 1 + this.editions.length) % this.editions.length;
    this.goTo(prev);
  }

  updateDots() {
    document.querySelectorAll('.carousel-dots .dot, .carousel-dots-mobile .dot').forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentIndex);
    });
  }

  startAutoPlay() {
    if (this.autoPlayTimer) return;
    this.autoPlayTimer = setInterval(() => this.goToNext(), 5000);
  }

  stopAutoPlay() {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
  }
}
