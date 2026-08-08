import { useEffect, useRef } from 'react';

const finePointer = () => window.matchMedia('(pointer: fine)').matches;
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Tilt 3D al mouse — puro CSS var.
 * Imposta --rx/--ry/--gx/--gy/--tilt-scale sull'elemento;
 * il CSS (.tilt-card) compone la trasformazione 3D.
 *
 * @param {Object} opts
 * @param {number} opts.max       inclinazione massima in gradi (default 10)
 * @param {number} opts.perspective  prospettiva px (default 900)
 * @param {number} opts.scale     scala al hover (default 1.02)
 * @param {boolean} opts.glare    bagliore che segue il mouse (default true)
 * @returns {Ref} da agganciare all'elemento .tilt-card
 */
const useTilt3D = ({ max = 10, perspective = 900, scale = 1.02, glare = true } = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !finePointer() || reducedMotion()) return;

    el.style.setProperty('--persp', `${perspective}px`);

    let raf = null;

    const onMove = (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;

        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        const rx = (0.5 - py) * max;
        const ry = (px - 0.5) * max;

        el.style.setProperty('--rx', `${rx.toFixed(2)}deg`);
        el.style.setProperty('--ry', `${ry.toFixed(2)}deg`);
        el.style.setProperty('--tilt-scale', scale.toFixed(3));

        if (glare) {
          el.style.setProperty('--gx', `${(px * 100).toFixed(1)}%`);
          el.style.setProperty('--gy', `${(py * 100).toFixed(1)}%`);
          el.style.setProperty('--glare-o', '1');
        }

        el.classList.add('is-tilting');
      });
    };

    const onLeave = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = null;
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
      el.style.setProperty('--tilt-scale', '1');
      el.style.setProperty('--glare-o', '0');
      el.classList.remove('is-tilting');
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);

    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [max, perspective, scale, glare]);

  return ref;
};

export default useTilt3D;
