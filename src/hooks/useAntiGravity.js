import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useAntiGravity = (dependency) => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Idle Floating Animations (Zero-Gravity)
      const floatingElements = [
        { selector: '.floating-slow', y: 18, duration: 5, rotation: 2.5 },
        { selector: '.floating-medium', y: 12, duration: 3.5, rotation: 3.5 },
        { selector: '.floating-fast', y: 8, duration: 2.2, rotation: 1.8 }
      ];

      floatingElements.forEach(({ selector, y, duration, rotation }) => {
        gsap.utils.toArray(selector).forEach((el, index) => {
          // Add a random delay so elements float independently
          const delay = index * 0.15 + Math.random() * 0.4;
          
          // Base float tween
          gsap.to(el, {
            y: `-=${y}`,
            rotation: `+=${rotation}`,
            duration: duration,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: delay
          });
        });
      });

      // 2. Scroll-Triggered Parallax / Lift-up (.anti-gravity-lift)
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
              scrub: 1.5, // Smooth lag transition
            }
          }
        );
      });

      // 3. 3D Spatial Reveal (.reveal-3d)
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

    });

    return () => ctx.revert(); // Cleanup on unmount (prevents StrictMode duplication)
  }, [dependency]);
};
