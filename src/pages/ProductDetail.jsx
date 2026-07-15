import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { getProductById } from '../data/products';
import { useCart } from '../context/CartContext';
import Button from '../components/UI/Button';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const imageWrapRef = useRef(null);
  const imageRef = useRef(null);

  const product = getProductById(id);
  const [viewers, setViewers] = useState(() => Math.floor(Math.random() * 4) + 2);

  useEffect(() => {
    const interval = setInterval(() => {
      setViewers(prev => {
        const change = Math.floor(Math.random() * 3) - 1;
        let newValue = prev + change;
        if (newValue < 1) newValue = 1;
        if (newValue > 12) newValue = 12;
        return newValue;
      });
    }, 12000);
    return () => clearInterval(interval);
  }, [id]);

  // Tilt 3D on image
  useEffect(() => {
    const wrap = imageWrapRef.current;
    const img = imageRef.current;
    if (!wrap || !img) return;

    const handleMouseMove = (e) => {
      const rect = wrap.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      gsap.to(wrap, {
        rotateX, rotateY,
        transformPerspective: 800,
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(img, {
        scale: 1.03,
        filter: "brightness(1.08)",
        duration: 0.5,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(wrap, {
        rotateX: 0, rotateY: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.6)",
      });
      gsap.to(img, {
        scale: 1, filter: "brightness(1)",
        duration: 0.6,
        ease: "power2.out",
      });
    };

    wrap.addEventListener('mousemove', handleMouseMove);
    wrap.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      wrap.removeEventListener('mousemove', handleMouseMove);
      wrap.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Prodotto non trovato</h2>
        <Button variant="outline" onClick={() => navigate(-1)}>Torna indietro</Button>
      </div>
    );
  }

  return (
    <div className="product-detail-page page-transition">
      <div className="product-detail-container">

        {/* Left column: Image with tilt */}
        <div className="product-detail-image-section">
          <div className="product-image-large floating-slow" ref={imageWrapRef} style={{ perspective: 800 }}>
            <img
              ref={imageRef}
              src={product.imageUrl}
              alt={product.title}
              loading="lazy"
              decoding="async"
            />
            {product.isUnique && <span className="badge badge-unique">Pezzo Unico</span>}
            {product.isPreorder && <span className="badge badge-preorder">Pre-ordine</span>}
          </div>
        </div>

        {/* Right column: Info */}
        <div className="product-detail-info-section reveal-3d">
          <nav className="breadcrumb">
            <button onClick={() => navigate(-1)} className="back-link">
              ← Torna indietro
            </button>
          </nav>

          <span className="product-type-label">{product.type}</span>
          <h1 className="product-detail-title">{product.title}</h1>
          <p className="product-detail-price">€{product.price.toFixed(2)}</p>

          <div className="product-detail-actions">
            {viewers > 0 && (
              <div className="live-viewers-badge">
                <span className="live-dot"></span>
                <span><strong>{viewers}</strong> persone stanno guardando quest'opera ora</span>
              </div>
            )}
            <Button variant="primary" onClick={() => addToCart(product)} className="w-full magnetic-btn">
              {product.isPreorder ? 'Pre-ordina ora' : 'Aggiungi al Carrello'}
            </Button>
          </div>

          <div className="product-description-block">
            <h3>Descrizione</h3>
            <p>{product.description}</p>
          </div>

          {product.details && product.details.length > 0 && (
            <div className="product-details-list">
              <h3>Dettagli</h3>
              <ul>
                {product.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="shipping-info">
            {product.isPreorder ? (
              <p className="text-gold" style={{ fontWeight: '600' }}>
                Pre-ordine: Questo albo verrà stampato e spedito a partire dal {product.releaseDate}.
              </p>
            ) : (
              <p><strong>Spedizione:</strong> Calcolata al momento del checkout.</p>
            )}
            {product.isUnique && (
              <p className="text-burgundy">Spedizione assicurata con corriere speciale per opere d'arte.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetail;
