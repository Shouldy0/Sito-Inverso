import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import ProductCard from '../components/UI/ProductCard';
import { useCart } from '../context/CartContext';
import { getUniversoByFandom } from '../data/products';
import { Sparkles, Palette } from 'lucide-react';
import './CategoryPage.css';

const fandomFilters = [
  { id: 'all', label: 'Tutto l\'Universo' },
  { id: 'naruto', label: 'Naruto' },
  { id: 'dragon_ball', label: 'Dragon Ball' },
  { id: 'one_piece', label: 'One Piece' },
  { id: 'original_art', label: 'Stampe Originali' },
];

const Universo = () => {
  const { addToCart } = useCart();
  const [activeFandom, setActiveFandom] = useState('all');
  const titleRef = useRef(null);

  const displayedPrints = getUniversoByFandom(activeFandom);

  useEffect(() => {
    document.body.classList.add('theme-universo');
    return () => document.body.classList.remove('theme-universo');
  }, []);

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
    }
  }, [activeFandom]);

  const handleAddToCart = (id) => {
    const product = displayedPrints.find(p => p.id === id);
    if (product) addToCart(product);
  };

  return (
    <div className="category-page theme-universo-page page-transition">
      {/* Hero Header */}
      <div className="category-hero universo-hero">
        <div className="category-hero-overlay" />
        <div className="category-hero-content container">
          <span className="category-kicker kicker-universo" data-reveal>Pastelli • Colore • Fandom</span>
          <h1 ref={titleRef} className="category-main-title title-universo-heading">Universo</h1>
          <p className="category-description" data-reveal>
            Pop, acceso e accessibile. Stampe Fine Art d'autore, omaggi ai grandi anime e manga e tirature su carte di pregio.
          </p>

          {/* Fandom Filters */}
          <div className="tier-filter-tabs fandom-tabs-container" data-reveal>
            {fandomFilters.map(tab => (
              <button
                key={tab.id}
                className={`filter-tab tab-universo ${activeFandom === tab.id ? 'active' : ''}`}
                onClick={() => setActiveFandom(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quality Fine Art Banner */}
      <div className="container">
        <div className="authenticity-banner banner-universo" data-reveal>
          <div className="banner-icon">
            <Palette size={28} style={{ color: '#e2cfc4' }} />
          </div>
          <div className="banner-text">
            <h4>Stampe Fine Art di Qualità Galleria</h4>
            <p>
              Tutte le stampe dell'Universo vengono realizzate con pigmenti ad alta stabilità su carta Fine Art Velvet 270g, confezionate con cura in busta protettiva rigida.
            </p>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="container category-grid-container">
        {displayedPrints.length > 0 ? (
          <div className="dark-grid category-grid" data-reveal-group>
            {displayedPrints.map(print => (
              <ProductCard
                key={print.id}
                {...print}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="empty-category">
            <p>Nessuna stampa disponibile per questa categoria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Universo;
