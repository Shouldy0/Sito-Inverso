import { useEffect } from 'react';

const reducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Profondità scroll-driven globale:
 * 1. [data-reveal]  — gli elementi emergono dalla profondità (translateZ -260px → 0)
 *    quando entrano nel viewport; .is-visible viene aggiunto una sola volta.
 *    [data-reveal-group] assegna --reveal-delay a cascata ai figli.
 * 2. [data-parallax] — parallasse verticale: il valore (px) è lo spostamento
 *    totale del layer rispetto alla sezione madre lungo lo scroll.
 *
 * @param {string} dep — chiave di riesecuzione (es. location.pathname):
 *                       a ogni cambio rotta gli osservatori vengono ricollegati.
 */
const useScrollDepth = (dep = '') => {
  useEffect(() => {
    const scope = document;
    const reduced = reducedMotion();

    // ---- 1) Reveal dalla profondità ----
    const revealEls = scope.querySelectorAll('[data-reveal]');
    let ioReveal = null;

    if (reduced) {
      revealEls.forEach((el) => el.classList.add('is-visible'));
    } else {
      ioReveal = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
      );
      revealEls.forEach((el) => ioReveal.observe(el));
    }

    // ---- Stagger a cascata dentro i gruppi ----
    const groups = scope.querySelectorAll('[data-reveal-group]');
    groups.forEach((group) => {
      group.querySelectorAll('[data-reveal]').forEach((el, i) => {
        el.style.setProperty('--reveal-delay', `${i * 90}ms`);
      });
    });

    // ---- 2) Parallasse scroll-driven ----
    const layers = scope.querySelectorAll('[data-parallax]');
    let ioParallax = null;

    if (layers.length && !reduced) {
      ioParallax = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            e.target._depthActive = e.isIntersecting;
          });
        },
        { rootMargin: '25% 0px' }
      );
      layers.forEach((l) => ioParallax.observe(l));

      let ticking = false;
      const update = () => {
        ticking = false;
        const vh = window.innerHeight;
        layers.forEach((el) => {
          if (!el._depthActive) return;
          const range = parseFloat(el.dataset.parallax) || 60;
          const host = el.parentElement || el;
          const rect = host.getBoundingClientRect();
          const progress = (vh - rect.top) / (vh + rect.height); // 0..1
          const offset = (progress - 0.5) * range;
          el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
        });
      };
      const onScroll = () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(update);
        }
      };

      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);
      update();

      // cleanup per parallasse
      return () => {
        if (ioReveal) ioReveal.disconnect();
        ioParallax.disconnect();
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
      };
    }

    // cleanup per reveal (se non c'è parallasse)
    return () => {
      if (ioReveal) ioReveal.disconnect();
    };
  }, [dep]);

  return null;
};

export default useScrollDepth;
