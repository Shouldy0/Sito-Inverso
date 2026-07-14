import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export const useAntiGravity = (dependency) => {
  useEffect(() => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      smoothWheel: true,
      wheelMultiplier: 0.95,
    });

    // Synchronize Lenis with ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      // 1. Idle Floating Animations (Zero-Gravity)
      const floatingElements = [
        { selector: '.floating-slow', y: 18, duration: 5, rotation: 2.5 },
        { selector: '.floating-medium', y: 12, duration: 3.5, rotation: 3.5 },
        { selector: '.floating-fast', y: 8, duration: 2.2, rotation: 1.8 }
      ];

      floatingElements.forEach(({ selector, y, duration, rotation }) => {
        gsap.utils.toArray(selector).forEach((el, index) => {
          // Force GPU layer to avoid repaint
          el.style.willChange = 'transform';
          const delay = index * 0.15 + Math.random() * 0.4;
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

      // 3. Multi-layer Asynchronous Parallax
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

      // 4. 3D Spatial Reveal (.reveal-3d)
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
              toggleActions: "play none none none",
              once: true,   // non ripete ad ogni scroll
            }
          }
        );
      });

    });

    return () => {
      ctx.revert();
      lenis.destroy();
      gsap.ticker.remove(updateLenis);
    };
  }, [dependency]);
};
