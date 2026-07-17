import { useEffect } from 'react';
import gsap from 'gsap';

export const useMagneticCursor = () => {
  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      // Disable magnetic cursor for users who prefer reduced motion
      return;
    }

    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    document.body.appendChild(dot);

    const ring = document.createElement('div');
    ring.className = 'cursor-ring';
    document.body.appendChild(ring);

    const handleMouseMove = (e) => {
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out',
      });

      gsap.to(ring, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.35,
        ease: 'power2.out',
      });
    };

    const handleMouseEnterInteractive = () => {
      gsap.to(ring, {
        width: 48,
        height: 48,
        borderColor: 'rgba(201, 169, 110, 0.5)',
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeaveInteractive = () => {
      gsap.to(ring, {
        width: 32,
        height: 32,
        borderColor: 'rgba(255, 255, 255, 0.5)',
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    document.addEventListener('mousemove', handleMouseMove);

    const interactiveElements = document.querySelectorAll('a, button, .product-card');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnterInteractive);
      el.addEventListener('mouseleave', handleMouseLeaveInteractive);
    });

    // Observe for new elements added to DOM
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1) {
            if (node.matches?.('a, button, .product-card')) {
              node.addEventListener('mouseenter', handleMouseEnterInteractive);
              node.addEventListener('mouseleave', handleMouseLeaveInteractive);
            }
            node.querySelectorAll?.('a, button, .product-card').forEach(el => {
              el.addEventListener('mouseenter', handleMouseEnterInteractive);
              el.addEventListener('mouseleave', handleMouseLeaveInteractive);
            });
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnterInteractive);
        el.removeEventListener('mouseleave', handleMouseLeaveInteractive);
      });
      observer.disconnect();
      dot.remove();
      ring.remove();
    };
  }, []);
};