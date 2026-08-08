import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import ProductCard from '../components/UI/ProductCard';
import { useCart } from '../context/CartContext';
import { getOriginaliByTier } from '../data/products';
import { ShieldCheck, Sparkles } from 'lucide-react';
import './CategoryPage.css';

const tierFilters = [
  { id: 'all', label: 'Tutti gli Originali' },
  { id: 'pezzi_unici', label: 'Pezzi Unici (Flagship)' },
  { id: 'opere_originali', label: 'Opere Originali' },
  { id: 'studio_works', label: 'Studio Works (Entry)' },
];

const Originali = () => {
  const { addToCart } = useCart();
  const [activeTier, setActiveTier] = useState('all');
  const titleRef = useRef(null);

  const displayedOriginals = getOriginaliByTier(activeTier);

  useEffect(() => {
    // Add theme class for Originali (scuro inchiostro)
    document.body.classList.add('theme-originali');
    return () => document.body.classList.remove('theme-originali');
  }, []);

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
    }
  }, [activeTier]);

  const handleAddToCart = (id) => {
    const product = displayedOriginals.find(p => p.id === id);
    if (product) addToCart(product);
  };

  return (
    <div className="category-page theme-originali-page page-transition">
      {/* Hero Header */}
      <div className="category-hero originali-hero">
        <div className="category-hero-overlay" />
        <div className="category-hero-content container">
          <span className="category-kicker" data-reveal>China • Matita • Carboncino</span>
          <h1 ref={titleRef} className="category-main-title">Originali</h1>
          <p className="category-description" data-reveal>
            Simbolico, introspettivo, psicologico. Opere uniche irripetibili e bozzetti di studio dove l'inchiostro da figura al silenzio e la materia vive sulla carta cotone.
          </p>

          {/* Tier Filters */}
          <div className="tier-filter-tabs" data-reveal>
            {tierFilters.map(tab => (
              <button
                key={tab.id}
                className={`filter-tab ${activeTier === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTier(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Authenticity Guarantee Banner */}
      <div className="container">
        <div className="authenticity-banner" data-reveal>
          <div className="banner-icon">
            <ShieldCheck size={28} className="text-gold" />
          </div>
          <div className="banner-text">
            <h4>Garanzia di Unicità & Autenticità</h4>
            <p>
              Ogni <strong>Pezzo Unico</strong> viene spedito in custodia d'archivio protetta con Certificato di Autenticità firmato a mano da Daiana Vaiani e sigillo originale in ceralacca.
            </p>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="container category-grid-container">
        {displayedOriginals.length > 0 ? (
          <div className="dark-grid category-grid" data-reveal-group>
            {displayedOriginals.map(original => (
              <ProductCard
                key={original.id}
                {...original}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="empty-category">
            <p>Nessuna opera al momento disponibile per questo livello.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Originali;
