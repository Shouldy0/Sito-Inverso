import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/UI/ProductCard';
import { useCart } from '../context/CartContext';
import { allProducts } from '../data/products';
import gsap from 'gsap';
import './Home.css';

const Home = () => {
  const { addToCart } = useCart();
  
  const allBooks = allProducts.filter(p => p.category === 'biblioteca');
  const featuredPrints = allProducts.filter(p => p.category === 'galleria').slice(0, 3);
  const featuredOriginals = allProducts.filter(p => p.category === 'originali').slice(0, 3);

  useEffect(() => {
    // Animazione di emersione dal buio
    gsap.fromTo(".giant-artwork", 
      { opacity: 0, scale: 0.95, filter: "blur(20px)" },
      { opacity: 0.85, scale: 1, filter: "blur(0px)", duration: 4, ease: "power2.out", clearProps: "filter" }
    );

    gsap.fromTo(".hero-manifesto", 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 2, delay: 2, ease: "power2.out" }
    );
  }, []);

  const handleAddToCart = (id) => {
    const product = allProducts.find(p => p.id === id);
    if (product) addToCart(product);
  };

  return (
    <div className="home-page page-transition">
      
      {/* Manifesto Iniziale - Un'opera sola nel buio */}
      <section className="dark-hero-section">
        <div className="giant-artwork-wrapper">
           <img src="/assets/sfiorare_il_buio.webp" alt="Sfiorare il buio" className="giant-artwork" decoding="async" />
        </div>
        <div className="hero-manifesto">
          <h1 className="hero-daiana">DAIANA</h1>
          <p>L'inchiostro è la voce di chi scava nel buio.</p>
        </div>
      </section>

      {/* Opere - Minimal Grid */}
      <section className="dark-showcase container">
        
        {featuredOriginals.length > 0 && (
          <div className="showcase-group reveal-3d">
            <h2 className="showcase-title">Opere Uniche</h2>
            <div className="dark-grid">
              {featuredOriginals.map(product => (
                <ProductCard key={product.id} {...product} onAddToCart={handleAddToCart} />
              ))}
            </div>
            <div className="link-wrapper">
              <Link to="/originali" className="minimal-link">Esplora l'archivio degli originali</Link>
            </div>
          </div>
        )}

        {featuredPrints.length > 0 && (
          <div className="showcase-group reveal-3d">
            <h2 className="showcase-title">Stampe Fine Art</h2>
            <div className="dark-grid">
              {featuredPrints.map(product => (
                <ProductCard key={product.id} {...product} onAddToCart={handleAddToCart} />
              ))}
            </div>
            <div className="link-wrapper">
              <Link to="/galleria" className="minimal-link">Esplora la galleria stampe</Link>
            </div>
          </div>
        )}
        
        {allBooks.length > 0 && (
          <div className="showcase-group reveal-3d">
            <h2 className="showcase-title">Volumi & Pubblicazioni</h2>
            <div className="dark-grid">
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
