import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/UI/ProductCard';
import { useCart } from '../context/CartContext';
import { allProducts } from '../data/products';
import { Feather, Compass, Sparkles, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useTilt3D from '../hooks/useTilt3D';
import './Home.css';

gsap.registerPlugin(ScrollTrigger);

const DUST_COUNT = 14;

const Home = () => {
  const { addToCart } = useCart();
  const heroRef = useRef(null);
  const sceneRef = useRef(null);
  const artRef = useRef(null);
  const contentRef = useRef(null);
  const bgRef = useRef(null);

  const soulsOriginaliRef = useTilt3D({ max: 8, scale: 1.02, perspective: 1000 });
  const soulsUniversoRef = useTilt3D({ max: 11, scale: 1.03, perspective: 1000 });

  const featuredSelection = allProducts.filter(p => ['o1', 'o2', 'u1', 'u4'].includes(p.id));

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      if (sceneRef.current) sceneRef.current.style.opacity = '1';
      return;
    }

    const ctx = gsap.context(() => {
      // Intro: la scena emerge dalla profondità
      gsap.fromTo(bgRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.4, ease: 'power1.out' }
      );
      gsap.fromTo(artRef.current,
        { opacity: 0, scale: 0.92, filter: 'blur(14px)' },
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.7, ease: 'power2.out' }
      );
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 40, transformPerspective: 1000, z: -80 },
        { opacity: 1, y: 0, z: 0, duration: 1.1, delay: 0.45, ease: 'power3.out' }
      );

      // Scroll: la scena si allontana in profondità
      gsap.to(sceneRef.current, {
        y: 90,
        scale: 1.06,
        opacity: 0.3,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
      gsap.to(artRef.current, {
        y: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    });

    return () => ctx.revert();
  }, []);

  // Parallasse mouse: la scena ruota, gli strati a Z diverse si muovono da soli
  useEffect(() => {
    const heroEl = heroRef.current;
    const scene = sceneRef.current;
    if (!heroEl || !scene) return;

    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reducedMotion) return;

    let raf = null;
    const onMove = (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        const rect = heroEl.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        scene.style.setProperty('--my', `${(x * 3.2).toFixed(2)}deg`);
        scene.style.setProperty('--mx', `${(y * -2.2).toFixed(2)}deg`);
      });
    };
    const onLeave = () => {
      scene.style.setProperty('--my', '0deg');
      scene.style.setProperty('--mx', '0deg');
    };

    heroEl.addEventListener('mousemove', onMove);
    heroEl.addEventListener('mouseleave', onLeave);
    return () => {
      heroEl.removeEventListener('mousemove', onMove);
      heroEl.removeEventListener('mouseleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const handleAddToCart = (id) => {
    const product = allProducts.find(p => p.id === id);
    if (product) addToCart(product);
  };

  return (
    <div className="home-page page-transition">

      {/* 1. HERO — scena a profondità reale */}
      <section className="hero-manifesto-section" ref={heroRef}>
        <div className="hero-3d-scene" ref={sceneRef}>
          {/* Layer fondo — Z -160 */}
          <div className="hero-layer hero-layer-bg" ref={bgRef}>
            <div className="hero-bg-vignette" />
          </div>

          {/* Layer artwork — Z 40 */}
          <div className="hero-layer hero-layer-art" ref={artRef}>
            <div className="hero-art-halo" />
            <img
              src="/assets/volto-del-baratro.png"
              alt="Il Volto del Baratro — Opera Manifesto"
              className="hero-artwork-img"
              decoding="async"
            />
          </div>

          {/* Layer contenuto — Z 90 */}
          <div className="hero-layer hero-layer-content" ref={contentRef}>
            <span className="hero-tagline">Mondo Narrativo & Artworks</span>
            <h1 className="hero-brand-title">INverso</h1>
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

          {/* Polvere dorata sospesa nello spazio */}
          <div className="hero-dust" aria-hidden="true">
            {Array.from({ length: DUST_COUNT }).map((_, i) => (
              <span
                key={i}
                className="dust-particle"
                style={{
                  '--px': `${(Math.random() * 100).toFixed(1)}%`,
                  '--py': `${(Math.random() * 100).toFixed(1)}%`,
                  '--pz': `${Math.round(Math.random() * 220 - 80)}px`,
                  '--delay': `${(Math.random() * 6).toFixed(1)}s`,
                  '--dur': `${(6 + Math.random() * 8).toFixed(1)}s`,
                  '--size': `${(1 + Math.random() * 2).toFixed(1)}px`,
                  '--op': `${(0.15 + Math.random() * 0.4).toFixed(2)}`
                }}
              />
            ))}
          </div>

          <div className="hero-scroll-hint" aria-hidden="true">
            <span className="scroll-hint-line" />
            <span className="scroll-hint-text">scorri</span>
          </div>
        </div>
      </section>

      {/* 2. LE DUE ANIME */}
      <section className="two-souls-section container">
        <div className="section-header text-center" data-reveal>
          <span className="section-kicker">La Filosofia di INverso</span>
          <h2 className="section-title">Le Due Anime</h2>
          <p className="section-subtitle">
            Un unico universo narrativo guidato dalla ricerca sull'identità, espresso attraverso due percorsi visivi distinti.
          </p>
        </div>

        <div className="souls-grid" data-reveal-group>
          <div className="soul-cell" data-reveal>
            <div className="tilt-scene">
              <div className="tilt-card soul-card soul-originali" ref={soulsOriginaliRef}>
                <div className="tilt-layer" style={{ '--depth': '46px' }}>
                  <div className="soul-card-badge">China • Matita • Carboncino</div>
                </div>
                <div className="tilt-layer" style={{ '--depth': '64px' }}>
                  <h3 className="soul-card-title">Originali</h3>
                </div>
                <div className="tilt-layer" style={{ '--depth': '30px' }}>
                  <p className="soul-card-desc">
                    Simbolico, introspettivo, psicologico. Pezzi unici irripetibili, studi d'archivio e tavole originali nate dall'inchiostro di china ad alto contrasto.
                  </p>
                </div>
                <div className="tilt-layer" style={{ '--depth': '22px' }}>
                  <div className="soul-tiers">
                    <span>Studio Works</span>
                    <span className="dot">•</span>
                    <span>Opere Originali</span>
                    <span className="dot">•</span>
                    <span>Pezzi Unici</span>
                  </div>
                </div>
                <div className="tilt-layer" style={{ '--depth': '40px' }}>
                  <Link to="/originali" className="soul-link link-originali">
                    Scopri le Opere Originali <ArrowRight size={16} />
                  </Link>
                </div>
                <div className="tilt-glare" />
              </div>
            </div>
          </div>

          <div className="soul-cell" data-reveal>
            <div className="tilt-scene">
              <div className="tilt-card soul-card soul-universo" ref={soulsUniversoRef}>
                <div className="tilt-layer" style={{ '--depth': '46px' }}>
                  <div className="soul-card-badge badge-universo-color">Pastelli • Colore • Digitale</div>
                </div>
                <div className="tilt-layer" style={{ '--depth': '64px' }}>
                  <h3 className="soul-card-title title-universo">Universo</h3>
                </div>
                <div className="tilt-layer" style={{ '--depth': '30px' }}>
                  <p className="soul-card-desc">
                    Pop, acceso, fandom-friendly. Stampe fine art di qualità galleria, omaggi ad anime e manga (Jujutsu Kaisen, Naruto, Dragon Ball) e tirature d'autore.
                  </p>
                </div>
                <div className="tilt-layer" style={{ '--depth': '22px' }}>
                  <div className="soul-tiers fandom-tags">
                    <span>Jujutsu Kaisen</span>
                    <span className="dot">•</span>
                    <span>Naruto</span>
                    <span className="dot">•</span>
                    <span>Dragon Ball</span>
                    <span className="dot">•</span>
                    <span>One Piece</span>
                  </div>
                </div>
                <div className="tilt-layer" style={{ '--depth': '40px' }}>
                  <Link to="/universo" className="soul-link link-universo">
                    Esplora le Stampe dell'Universo <ArrowRight size={16} />
                  </Link>
                </div>
                <div className="tilt-glare" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container"><div className="section-divider" data-reveal /></div>

      {/* 3. IN EVIDENZA */}
      <section className="featured-section container">
        <div className="section-header" data-reveal>
          <div>
            <span className="section-kicker">Selezione Curata</span>
            <h2 className="section-title">In Evidenza</h2>
          </div>
          <Link to="/originali" className="minimal-link">
            Tutte le opere <ArrowRight size={14} />
          </Link>
        </div>

        <div className="dark-grid showcase-grid" data-reveal-group>
          {featuredSelection.map(product => (
            <ProductCard key={product.id} {...product} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </section>

      <div className="container"><div className="section-divider" data-reveal /></div>

      {/* 4. CHI È DAIANA */}
      <section className="artist-snippet-section container">
        <div className="artist-snippet-wrapper">
          <div className="artist-image-container" data-reveal>
            <div className="artist-frame">
              <img
                src="/assets/artista-daiana.png"
                alt="Daiana Vaiani — L'Artista"
                className="artist-portrait"
                data-parallax="34"
                loading="lazy"
              />
            </div>
          </div>

          <div className="artist-bio-content">
            <span className="section-kicker" data-reveal>L'Autrice</span>
            <h2 className="artist-title" data-reveal>Daiana Vaiani</h2>
            <blockquote className="artist-quote" data-reveal>
              "L'inchiostro è la mia voce quando il silenzio si fa troppo grande."
            </blockquote>
            <p className="artist-text" data-reveal>
              Sono Daiana Vaiani, illustratrice e autrice. Il mio lavoro nasce dal bisogno di dare corpo alle dualità che abitano la nostra mente: l'ombra e la luce, la forza della maschera e la fragilità dell'anima.
            </p>
            <div data-reveal>
              <Link to="/info/chi-sono" className="cta-button outline-cta">
                Leggi la Bio & Manifesto <Compass size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
