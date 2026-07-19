import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { getProductById } from '../data/products';
import { useCart } from '../context/CartContext';
import Button from '../components/UI/Button';
import { ShieldCheck, Feather, Truck, ArrowLeft } from 'lucide-react';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const imageWrapRef = useRef(null);
  const imageRef = useRef(null);

  const product = getProductById(id);

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

      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      gsap.to(wrap, {
        rotateX, rotateY,
        transformPerspective: 800,
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(img, {
        scale: 1.02,
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
        scale: 1,
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
      <div className="product-not-found container">
        <h2>Opera o prodotto non trovato</h2>
        <Button variant="outline" onClick={() => navigate(-1)}>Torna indietro</Button>
      </div>
    );
  }

  return (
    <div className={`product-detail-page page-transition ${product.category ? `detail-${product.category}` : ''}`}>
      <div className="container product-detail-container">

        {/* Left column: Artwork presentation */}
        <div className="product-detail-image-section">
          <div className="product-image-large" ref={imageWrapRef} style={{ perspective: 800 }}>
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

        {/* Right column: Narrative and specs */}
        <div className="product-detail-info-section reveal-3d">
          <nav className="breadcrumb">
            <button onClick={() => navigate(-1)} className="back-link">
              <ArrowLeft size={16} /> Torna indietro
            </button>
          </nav>

          <span className="product-type-label">{product.type} {product.year ? `• ${product.year}` : ''}</span>
          <h1 className="product-detail-title">{product.title}</h1>
          <p className="product-detail-price">€{product.price.toFixed(2)}</p>

          {/* Micro-Story Block */}
          {product.microStory && (
            <div className="product-micro-story-box">
              <div className="story-header">
                <Feather size={16} className="text-gold" />
                <span className="story-label">Micro-Storia dell'Opera</span>
              </div>
              <blockquote className="story-text">
                "{product.microStory}"
              </blockquote>
            </div>
          )}

          {/* Actions */}
          <div className="product-detail-actions">
            <Button variant="primary" onClick={() => addToCart(product)} className="w-full primary-buy-btn">
              {product.isPreorder ? 'Pre-ordina ora' : 'Aggiungi al Carrello'}
            </Button>
          </div>

          {/* Specs & Certificate */}
          <div className="product-specs-block">
            <h3>Specifiche dell'Opera</h3>
            <ul className="specs-list">
              {product.technique && <li><strong>Tecnica:</strong> {product.technique}</li>}
              {product.dimensions && <li><strong>Dimensioni:</strong> {product.dimensions}</li>}
              {product.certificate && (
                <li className="certificate-item">
                  <ShieldCheck size={18} className="text-gold inline-icon" />
                  <strong>Certificato:</strong> {product.certificate}
                </li>
              )}
              {product.details && product.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>

          {/* Shipping & Packaging Note */}
          <div className="shipping-info-box">
            <Truck size={18} className="shipping-icon" />
            <div>
              {product.isPreorder ? (
                <p className="shipping-note text-gold">
                  Pre-ordine: Spedizione speciale prevista a partire dal {product.releaseDate}.
                </p>
              ) : product.isUnique ? (
                <p className="shipping-note">
                  <strong>Custodia protettiva:</strong> Spedizione assicurata in imballo d'archivio protetto.
                </p>
              ) : (
                <p className="shipping-note">
                  <strong>Spedizione sicura:</strong> Confezionata con cura in busta protettiva rigida antieghe.
                </p>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ProductDetail;
