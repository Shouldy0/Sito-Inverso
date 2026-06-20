import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/UI/Button';
import ProductCard from '../components/UI/ProductCard';
import { useCart } from '../context/CartContext';
import { allProducts } from '../data/products';
import gsap from 'gsap';
import './Home.css';

const Home = () => {
  const { addToCart } = useCart();

  // Seleziona i prodotti in evidenza reali dal catalogo
  const featuredBook = allProducts.find(p => p.id === 'b3');
  const featuredPrints = allProducts.filter(p => p.category === 'galleria').slice(0, 3);

  useEffect(() => {
    // 1. Cinematic Title Reveal (expansion & blur-to-clear)
    gsap.fromTo(".hero-logo-title", 
      { opacity: 0, letterSpacing: "0.5em", filter: "blur(15px)", y: 30 },
      { opacity: 1, letterSpacing: "0.2em", filter: "blur(0px)", y: 0, duration: 2.5, ease: "power3.out" }
    );

    // 2. Subtitle Reveal (blur-to-clear from dark)
    gsap.fromTo(".hero-blur-subtitle", 
      { opacity: 0, filter: "blur(25px)", y: 15 },
      { opacity: 1, filter: "blur(0px)", y: 0, duration: 3.2, ease: "power2.out", delay: 0.8 }
    );

    // 3. Scroll Indicator Fade
    gsap.fromTo(".scroll-indicator",
      { opacity: 0 },
      { opacity: 0.45, duration: 1.5, delay: 2.2, ease: "power1.out" }
    );

    // 4. Zero-Gravity Particles Levitation
    const particles = document.querySelectorAll('.particle');
    particles.forEach((p, i) => {
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
  }, []);

  const handleAddToCart = (id) => {
    const product = allProducts.find(p => p.id === id);
    if (product) {
      addToCart(product);
    }
  };

  if (!featuredBook) {
    return (
      <div className="home-page page-transition container" style={{ padding: '8rem 2rem', textHeight: 'center' }}>
        <h2>Nessun libro disponibile al momento.</h2>
      </div>
    );
  }

  return (
    <div className="home-page page-transition">
      {/* Ambient Parallax background shapes (ink nebulas) */}
      <div className="ambient-glow-1 parallax-bg floating-slow" data-parallax-y="160" />
      <div className="ambient-glow-2 parallax-bg floating-medium" data-parallax-y="-100" />
      <div className="ambient-glow-3 parallax-bg floating-slow" data-parallax-y="130" />
      
      {/* Cinematic Hero Section */}
      <section className="cinematic-hero">
        <div className="particles-container">
          {[...Array(14)].map((_, i) => (
            <div key={i} className="particle" />
          ))}
        </div>
        <div className="hero-center-content">
          <h1 className="hero-logo-title">INverso</h1>
          <p className="hero-blur-subtitle">
            Frammenti di inchiostro, ombre e coscienza.
          </p>
          <div className="scroll-indicator">
            <span className="scroll-text">Scorri per esplorare</span>
            <span className="scroll-arrow">↓</span>
          </div>
        </div>
      </section>

      {/* Poetic Manifesto Quote */}
      <section className="manifesto-quote container reveal-3d">
        <p className="quote-text">
          “L'inchiostro è la mia voce quando il silenzio si fa troppo grande. 
          Disegnare è strappare un pezzo di coscienza all'ombra e fissarlo sulla carta.”
        </p>
        <span className="quote-author">— Daiana Vaiani</span>
      </section>

      {/* Editorial Featured Book Section */}
      <section className="featured-hero container">
        <Link to={`/product/${featuredBook.id}`} className="featured-image-wrapper floating-slow">
          <img src={featuredBook.imageUrl} alt={featuredBook.title} className="featured-image" />
        </Link>
        <div className="featured-content reveal-3d">
          <span className="featured-label">{featuredBook.type}</span>
          <Link to={`/product/${featuredBook.id}`} style={{ textDecoration: 'none' }}>
            <h1 className="featured-title">{featuredBook.title}</h1>
          </Link>
          <p className="featured-desc">{featuredBook.description}</p>
          <div className="featured-actions">
            <span className="featured-price">€{featuredBook.price.toFixed(2)}</span>
            <Button variant="primary" onClick={() => handleAddToCart(featuredBook.id)}>
              Aggiungi al Carrello
            </Button>
          </div>
        </div>
      </section>

      {/* Prints Showcase Section */}
      {featuredPrints.length > 0 && (
        <section className="prints-showcase container">
          <div className="section-header reveal-3d">
            <h2>Stampe Fine Art</h2>
            <Link to="/galleria" className="view-all-link">Esplora la Galleria</Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
            {featuredPrints.map(product => (
              <ProductCard 
                key={product.id}
                {...product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </section>
      )}
      
    </div>
  );
};

export default Home;
