import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/UI/ProductCard';
import { useCart } from '../context/CartContext';
import { allProducts } from '../data/products';
import { Feather, Compass, Sparkles, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import './Home.css';

const Home = () => {
  const { addToCart } = useCart();
  const heroRef = useRef(null);
  const artworkRef = useRef(null);
  const glowRef = useRef(null);
  const titleRef = useRef(null);

  // Mixed selection of 4 flagship items for "In Evidenza"
  const featuredSelection = allProducts.filter(p => ['o1', 'o2', 'u1', 'u4'].includes(p.id));

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      if (artworkRef.current) {
        artworkRef.current.style.opacity = '0.9';
        artworkRef.current.style.transform = 'scale(1)';
      }
      return;
    }

    const ctx = gsap.context(() => {
      // Emergence of Manifesto artwork
      gsap.fromTo(artworkRef.current,
        { opacity: 0, scale: 0.95, filter: "blur(12px)" },
        { opacity: 0.9, scale: 1, filter: "blur(0px)", duration: 1.6, ease: "power2.out" }
      );

      // Hero Title emergence
      gsap.fromTo(".hero-brand-title",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.4, ease: "power3.out" }
      );

      gsap.fromTo(".hero-manifesto-text",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 0.8, ease: "power2.out" }
      );

      // Mouse Parallax on Hero
      const heroEl = heroRef.current;
      if (heroEl && artworkRef.current) {
        const handleMouseMove = (e) => {
          const rect = heroEl.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;

          gsap.to(artworkRef.current, {
            x: x * -18,
            y: y * -12,
            rotateY: x * 2.5,
            rotateX: y * -2.5,
            duration: 1,
            ease: "power2.out",
          });

          if (glowRef.current) {
            gsap.to(glowRef.current, {
              x: e.clientX - rect.left,
              y: e.clientY - rect.top,
              opacity: 0.22,
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

      {/* 1. HERO MANIFESTO */}
      <section className="hero-manifesto-section" ref={heroRef}>
        <div className="hero-artwork-container">
          <img
            ref={artworkRef}
            src="/assets/volto-del-baratro.png"
            alt="Il Volto del Baratro — Opera Manifesto"
            className="hero-artwork-img"
            decoding="async"
          />
          <div className="hero-glow-layer" ref={glowRef} />
        </div>

        <div className="hero-content-overlay">
          <span className="hero-tagline">Mondo Narrativo & Artworks</span>
          <h1 className="hero-brand-title" ref={titleRef}>INverso</h1>
          <p className="hero-manifesto-text">
            "Ogni opera — che nasca dalla china pura o dalla luce dei pastelli — è una soglia tra ciò che si mostra e ciò che si nasconde."
          </p>
          <div className="hero-actions">
            <Link to="/originali" className="cta-button primary-cta">
              Esplora gli Originali <Feather size={16} />
            </Link>
            <Link to="/universo" className="cta-button secondary-cta">
              Entra nell'Universo <Sparkles size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. LE DUE ANIME */}
      <section className="two-souls-section container">
        <div className="section-header text-center">
          <span className="section-kicker">La Filosofia di INverso</span>
          <h2 className="section-title">Le Due Anime</h2>
          <p className="section-subtitle">
            Un unico universo narrativo guidato dalla ricerca sull'identità, espresso attraverso due percorsi visivi distinti.
          </p>
        </div>

        <div className="souls-grid">
          {/* Card Originali */}
          <div className="soul-card soul-originali">
            <div className="soul-card-badge">China • Matita • Carboncino</div>
            <h3 className="soul-card-title">Originali</h3>
            <p className="soul-card-desc">
              Simbolico, introspettivo, psicologico. Pezzi unici irripetibili, studi d'archivio e tavole originali nate dall'inchiostro di china ad alto contrasto.
            </p>
            <div className="soul-tiers">
              <span>Studio Works</span>
              <span className="dot">•</span>
              <span>Opere Originali</span>
              <span className="dot">•</span>
              <span>Pezzi Unici</span>
            </div>
            <Link to="/originali" className="soul-link link-originali">
              Scopri le Opere Originali <ArrowRight size={16} />
            </Link>
          </div>

          {/* Card Universo */}
          <div className="soul-card soul-universo">
            <div className="soul-card-badge badge-universo-color">Pastelli • Colore • Digitale</div>
            <h3 className="soul-card-title title-universo">Universo</h3>
            <p className="soul-card-desc">
              Pop, acceso, fandom-friendly. Stampe fine art di qualità galleria, omaggi ad anime e manga (Jujutsu Kaisen, Naruto, Dragon Ball) e tirature d'autore.
            </p>

            <div className="soul-tiers fandom-tags">
              <span>Jujutsu Kaisen</span>
              <span className="dot">•</span>
              <span>Naruto</span>
              <span className="dot">•</span>
              <span>Dragon Ball</span>
              <span className="dot">•</span>
              <span>One Piece</span>
            </div>
            <Link to="/universo" className="soul-link link-universo">
              Esplora le Stampe dell'Universo <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <div className="container"><div className="section-divider" /></div>

      {/* 3. IN EVIDENZA */}
      <section className="featured-section container">
        <div className="section-header">
          <div>
            <span className="section-kicker">Selezione Curata</span>
            <h2 className="section-title">In Evidenza</h2>
          </div>
          <Link to="/originali" className="minimal-link">
            Tutte le opere <ArrowRight size={14} />
          </Link>
        </div>

        <div className="dark-grid showcase-grid">
          {featuredSelection.map(product => (
            <ProductCard key={product.id} {...product} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </section>

      <div className="container"><div className="section-divider" /></div>

      {/* 4. CHI È DAIANA */}
      <section className="artist-snippet-section container">
        <div className="artist-snippet-wrapper">
          <div className="artist-image-container">
            <img
              src="/assets/artista-daiana.png"
              alt="Daiana Vaiani — L'Artista"
              className="artist-portrait"
              loading="lazy"
            />
          </div>

          <div className="artist-bio-content">
            <span className="section-kicker">L'Autrice</span>
            <h2 className="artist-title">Daiana Vaiani</h2>
            <blockquote className="artist-quote">
              "L'inchiostro è la mia voce quando il silenzio si fa troppo grande."
            </blockquote>
            <p className="artist-text">
              Sono Daiana Vaiani, illustratrice e autrice. Il mio lavoro nasce dal bisogno di dare corpo alle dualità che abitano la nostra mente: l'ombra e la luce, la forza della maschera e la fragilità dell'anima.
            </p>
            <Link to="/info/chi-sono" className="cta-button outline-cta">
              Leggi la Bio & Manifesto <Compass size={16} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;