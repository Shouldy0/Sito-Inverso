import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/UI/ProductCard';
import { useCart } from '../context/CartContext';
import { allProducts } from '../data/products';
import gsap from 'gsap';
import './Home.css';

const Home = () => {
  const { addToCart } = useCart();
  const heroRef = useRef(null);
  const artworkRef = useRef(null);
  const glowRef = useRef(null);
  const titleRef = useRef(null);

  const allBooks = allProducts.filter(p => p.category === 'biblioteca');
  const featuredPrints = allProducts.filter(p => p.category === 'galleria').slice(0, 3);
  const featuredOriginals = allProducts.filter(p => p.category === 'originali').slice(0, 3);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      // Set final states without animation
      if (artworkRef.current) {
        artworkRef.current.style.opacity = '0.85';
        artworkRef.current.style.transform = 'scale(1)';
        artworkRef.current.style.filter = 'blur(0px)';
      }
      // Set title letters to visible (they are split into spans)
      if (titleRef.current) {
        Array.from(titleRef.current.children).forEach(span => {
          span.style.opacity = '1';
          span.style.transform = 'translateY(0)';
        });
      }
      // Set manifesto paragraph opacity
      const manifestoP = document.querySelector('.hero-manifesto p');
      if (manifestoP) {
        manifestoP.style.opacity = '1';
        manifestoP.style.transform = 'translateY(0)';
      }
      // No need to set up mouse parallax or other animations
      return;
    }

    const ctx = gsap.context(() => {
      // Artwork emergence from darkness — faster
      gsap.fromTo(artworkRef.current,
        { opacity: 0, scale: 0.96, filter: "blur(16px)" },
        { opacity: 0.85, scale: 1, filter: "blur(0px)", duration: 1.5, ease: "power2.out", clearProps: "filter" }
      );

      // Letter stagger for "DAIANA"
      if (titleRef.current) {
        const text = titleRef.current.textContent;
        titleRef.current.innerHTML = '';
        text.split('').forEach((char) => {
          const span = document.createElement('span');
          span.textContent = char;
          span.style.display = 'inline-block';
          span.style.opacity = '0';
          span.style.transform = 'translateY(40px)';
          titleRef.current.appendChild(span);
        });

        gsap.to(titleRef.current.children, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.6,
        });
      }

      // Manifesto subtitle
      gsap.fromTo(".hero-manifesto p",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 1.6, ease: "power2.out" }
      );

      // Mouse parallax on artwork
      const heroEl = heroRef.current;
      if (heroEl && artworkRef.current) {
        const handleMouseMove = (e) => {
          const rect = heroEl.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;

          gsap.to(artworkRef.current, {
            x: x * -20,
            y: y * -15,
            rotateY: x * 3,
            rotateX: y * -3,
            duration: 1,
            ease: "power2.out",
          });

          if (glowRef.current) {
            gsap.to(glowRef.current, {
              x: e.clientX - rect.left,
              y: e.clientY - rect.top,
              opacity: 0.2,
              duration: 0.6,
            });
          }
        };

        const handleMouseLeave = () => {
          gsap.to(artworkRef.current, {
            x: 0, y: 0, rotateY: 0, rotateX: 0,
            duration: 1.2, ease: "elastic.out(1, 0.6)"
          });
          if (glowRef.current) {
            gsap.to(glowRef.current, { opacity: 0, duration: 0.5 });
          }
        };

        heroEl.addEventListener('mousemove', handleMouseMove);
        heroEl.addEventListener('mouseleave', handleMouseLeave);

        return () => {
          heroEl.removeEventListener('mousemove', handleMouseMove);
          heroEl.removeEventListener('mouseleave', handleMouseLeave);
          ctx.revert();
        };
      }
    });

    return () => ctx.revert();
  }, []);

  const handleAddToCart = (id) => {
    const product = allProducts.find(p => p.id === id);
    if (product) addToCart(product);
  };

  return (
    <div className="home-page page-transition">

      {/* Hero — A single artwork in the dark */}
      <section className="dark-hero-section" ref={heroRef}>
        <div className="giant-artwork-wrapper">
          <img
            ref={artworkRef}
            src="/assets/sfiorare_il_buio.webp"
            alt="Sfiorare il buio"
            className="giant-artwork"
            decoding="async"
          />
          <div className="hero-glow" ref={glowRef} />
        </div>
        <div className="hero-manifesto">
          <h1 className="hero-daiana" ref={titleRef}>DAIANA</h1>
          <p>L'inchiostro è la voce di chi scava nel buio.</p>
          <Link to="/biblioteca" className="cta-button">Esplora la collezione</Link>
        </div>
      </section>

      {/* Opere Uniche — Asymmetric grid */}
      <section className="dark-showcase container">
        {featuredOriginals.length > 0 && (
          <div className="showcase-group reveal-3d">
            <h2 className="showcase-title">Opere Uniche</h2>
            <div className="dark-grid asymmetric-grid stagger-in">
              {featuredOriginals.map(product => (
                <ProductCard key={product.id} {...product} onAddToCart={handleAddToCart} />
              ))}
            </div>
            <div className="link-wrapper">
              <Link to="/originali" className="minimal-link">Esplora l'archivio degli originali</Link>
            </div>
          </div>
        )}

        <div className="section-divider" />

        {/* Stampe — Horizontal scroll section */}
        {featuredPrints.length > 0 && (
          <div className="showcase-group reveal-3d">
            <h2 className="showcase-title">Stampe Fine Art</h2>
            <div className="prints-scroll stagger-in">
              {allProducts.filter(p => p.category === 'galleria').map(product => (
                <div className="prints-scroll-item stagger-child" key={product.id}>
                  <ProductCard {...product} onAddToCart={handleAddToCart} />
                </div>
              ))}
            </div>
            <div className="link-wrapper">
              <Link to="/galleria" className="minimal-link">Esplora la galleria stampe</Link>
            </div>
          </div>
        )}

        <div className="section-divider" />

        {allBooks.length > 0 && (
          <div className="showcase-group reveal-3d">
            <h2 className="showcase-title">Volumi & Pubblicazioni</h2>
            <div className="dark-grid stagger-in">
              {allBooks.map(product => (
                <ProductCard key={product.id} {...product} onAddToCart={handleAddToCart} />
              ))}
            </div>
          </div>
        )}

      </section>

    </div>
  );
};

export default Home;