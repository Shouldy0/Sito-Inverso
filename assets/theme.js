document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  initMobileMenu();

  // 2. Initialize Lenis and GSAP animations once libraries are ready
  initAnimations();

  // 3. Initialize Newsletter Forms
  initNewsletters();
});

function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', isOpen);
      
      // Toggle menu icons/hamburger if needed
      const iconMenu = menuBtn.querySelector('.icon-menu');
      const iconClose = menuBtn.querySelector('.icon-close');
      if (iconMenu && iconClose) {
        if (isOpen) {
          iconMenu.style.display = 'none';
          iconClose.style.display = 'block';
        } else {
          iconMenu.style.display = 'block';
          iconClose.style.display = 'none';
        }
      }
    });
    
    // Close menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
      });
    });
  }
}

function initNewsletters() {
  const forms = document.querySelectorAll('.newsletter-form, .links-newsletter-form');
  forms.forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const submitBtn = form.querySelector('button[type="submit"]');
      if (!input || !submitBtn) return;

      const email = input.value;
      const originalBtnHtml = submitBtn.innerHTML;

      // Set loading state
      submitBtn.disabled = true;
      if (submitBtn.classList.contains('links-submit-btn')) {
        submitBtn.textContent = '...';
      } else {
        submitBtn.innerHTML = '...';
      }

      try {
        // Simulate API subscription call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success
        const container = form.parentElement;
        if (form.classList.contains('newsletter-form')) {
          container.innerHTML = `
            <div class="newsletter-success animate-fade-in">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="icon-success"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span>Ti sei iscritto con successo! A presto.</span>
            </div>
          `;
        } else {
          container.innerHTML = `
            <div class="links-newsletter-success">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span>Iscrizione completata con successo!</span>
            </div>
          `;
        }
      } catch (err) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
        // Show error message
        let errorEl = form.nextElementSibling;
        if (!errorEl || (!errorEl.classList.contains('newsletter-error') && !errorEl.classList.contains('links-newsletter-error'))) {
          errorEl = document.createElement('div');
          errorEl.className = form.classList.contains('newsletter-form') ? 'newsletter-error' : 'links-newsletter-error';
          form.appendChild(errorEl);
        }
        errorEl.innerHTML = `<span>Si è verificato un errore. Riprova più tardi.</span>`;
      }
    });
  });
}

function initAnimations() {
  // Check if libraries are loaded
  if (typeof Lenis === 'undefined' || typeof gsap === 'undefined') {
    // If not loaded, wait a bit and retry
    setTimeout(initAnimations, 100);
    return;
  }

  // 1. Initialize Lenis
  const lenis = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 0.95,
  });

  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    lenis.on('scroll', ScrollTrigger.update);
  }

  function updateLenis(time) {
    lenis.raf(time * 1000);
    requestAnimationFrame(updateLenis);
  }
  requestAnimationFrame(updateLenis);

  // 2. Idle Floating (Zero-Gravity)
  const floatingElements = [
    { selector: '.floating-slow', y: 18, duration: 5, rotation: 2.5 },
    { selector: '.floating-medium', y: 12, duration: 3.5, rotation: 3.5 },
    { selector: '.floating-fast', y: 8, duration: 2.2, rotation: 1.8 }
  ];

  floatingElements.forEach(({ selector, y, duration, rotation }) => {
    gsap.utils.toArray(selector).forEach((el, index) => {
      const delay = index * 0.15 + Math.random() * 0.4;
      gsap.to(el, {
        y: `-=${y}`,
        rotation: `+=${rotation}`,
        duration: duration,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: delay
      });
    });
  });

  if (typeof ScrollTrigger === 'undefined') return;

  // 3. Scroll Lift-up (.anti-gravity-lift)
  gsap.utils.toArray('.anti-gravity-lift').forEach((el) => {
    const offset = parseInt(el.getAttribute('data-lift-offset')) || 100;
    gsap.fromTo(el, 
      { y: offset / 2 },
      {
        y: -offset,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        }
      }
    );
  });

  // 4. Parallax scroll layers
  gsap.utils.toArray('.parallax-slow').forEach((el) => {
    const offset = parseInt(el.getAttribute('data-parallax-y')) || 70;
    gsap.fromTo(el,
      { y: 0 },
      {
        y: offset,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      }
    );
  });

  gsap.utils.toArray('.parallax-fast').forEach((el) => {
    const offset = parseInt(el.getAttribute('data-parallax-y')) || -110;
    gsap.fromTo(el,
      { y: 0 },
      {
        y: offset,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      }
    );
  });

  gsap.utils.toArray('.parallax-bg').forEach((el) => {
    const offset = parseInt(el.getAttribute('data-parallax-y')) || 160;
    gsap.fromTo(el,
      { y: -offset / 2 },
      {
        y: offset / 2,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      }
    );
  });

  // 5. 3D Spatial Reveal
  gsap.utils.toArray('.reveal-3d').forEach((el) => {
    const delayAttr = parseFloat(el.getAttribute('data-reveal-delay')) || 0;
    gsap.fromTo(el,
      { 
        opacity: 0,
        y: 70,
        rotationX: 12,
        transformOrigin: "50% 50% -100px",
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1.2,
        delay: delayAttr,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none"
        }
      }
    );
  });

  // 6. Zero-Gravity Particles Levitation on Hero (if container exists)
  initHeroParticles();
}

function initHeroParticles() {
  const container = document.querySelector('.particles-container');
  if (!container) return;

  const particles = container.querySelectorAll('.particle');
  particles.forEach((p) => {
    const colors = ['#c6a267', '#f3f4f6', '#1d1d23', '#4b5563'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    const randomX = Math.random() * 100;
    const randomY = Math.random() * 100;
    const randomScale = 0.4 + Math.random() * 1.6;
    const randomBlur = 1.5 + Math.random() * 6;
    const randomOpacity = 0.04 + Math.random() * 0.18;

    gsap.set(p, {
      xPercent: randomX,
      yPercent: randomY,
      scale: randomScale,
      backgroundColor: randomColor,
      filter: `blur(${randomBlur}px)`,
      opacity: randomOpacity
    });

    const duration = 10 + Math.random() * 14;
    const travelY = 60 + Math.random() * 120;
    const travelX = 30 + Math.random() * 60;

    gsap.to(p, {
      y: `-=${travelY}`,
      x: `+=${travelX}`,
      rotation: Math.random() * 360,
      duration: duration,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: -Math.random() * duration
    });
  });

  // Hero Title & Subtitle Reveals
  gsap.fromTo(".hero-logo-title", 
    { opacity: 0, letterSpacing: "0.5em", filter: "blur(15px)", y: 30 },
    { opacity: 1, letterSpacing: "0.2em", filter: "blur(0px)", y: 0, duration: 2.5, ease: "power3.out" }
  );

  gsap.fromTo(".hero-blur-subtitle", 
    { opacity: 0, filter: "blur(25px)", y: 15 },
    { opacity: 1, filter: "blur(0px)", y: 0, duration: 3.2, ease: "power2.out", delay: 0.8 }
  );

  gsap.fromTo(".scroll-indicator",
    { opacity: 0 },
    { opacity: 0.45, duration: 1.5, delay: 2.2, ease: "power1.out" }
  );
}
