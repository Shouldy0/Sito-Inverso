import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export const useAntiGravity = (dependency) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
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

      // 2. Scroll-Triggered Parallax / Lift-up
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

      // 4. 3D Spatial Reveal
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
              once: true,
            }
          }
        );
      });

      // 5. Stagger-in animations for grids and lists
      gsap.utils.toArray('.stagger-in').forEach((container) => {
        const children = container.querySelectorAll('.stagger-child');
        if (children.length === 0) return;

        gsap.fromTo(children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: container,
              start: "top 85%",
              toggleActions: "play none none none",
              once: true,
            }
          }
        );
      });

      // 6. Section divider animation — lines that expand on scroll
      gsap.utils.toArray('.section-divider').forEach((el) => {
        gsap.fromTo(el,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none none",
              once: true,
            }
          }
        );
      });

      // 7. Magnetic button hover effect
      gsap.utils.toArray('.magnetic-btn').forEach((el) => {
        const strength = 0.3;
        const textStrenght = 0.7;

        el.addEventListener('mousemove', (e) => {
          const rect = el.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          gsap.to(el, {
            x: x * strength,
            y: y * strength,
            duration: 0.4,
            ease: "power2.out",
          });

          const text = el.querySelector('.btn-content');
          if (text) {
            gsap.to(text, {
              x: x * textStrenght,
              y: y * textStrenght,
              duration: 0.4,
              ease: "power2.out",
            });
          }
        });

        el.addEventListener('mouseleave', () => {
          gsap.to(el, {
            x: 0,
            y: 0,
            duration: 0.7,
            ease: "elastic.out(1, 0.5)",
          });

          const text = el.querySelector('.btn-content');
          if (text) {
            gsap.to(text, {
              x: 0,
              y: 0,
              duration: 0.7,
              ease: "elastic.out(1, 0.5)",
            });
          }
        });
      });

    });

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, [dependency]);
};
