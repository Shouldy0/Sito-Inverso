import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../data/products';
import { useCart } from '../context/CartContext';
import Button from '../components/UI/Button';
import useTilt3D from '../hooks/useTilt3D';
import { ShieldCheck, Feather, Truck, ArrowLeft } from 'lucide-react';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const viewerRef = useTilt3D({ max: 8, perspective: 1100 });

  const product = getProductById(id);

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

        {/* Left column: 3D artwork viewer */}
        <div className="product-detail-image-section">
          <div className="tilt-scene viewer-tilt-scene">
            <div className="viewer-scene tilt-card" ref={viewerRef}>
              <div className="viewer-backdrop tilt-layer" style={{ '--depth': '-90px' }} aria-hidden="true" />
              <div className="viewer-frame tilt-layer" style={{ '--depth': '6px' }} aria-hidden="true" />
              <div className="viewer-image-wrap tilt-layer" style={{ '--depth': '36px' }}>
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              {product.isUnique && (
                <span className="badge badge-unique viewer-badge tilt-layer" style={{ '--depth': '58px' }}>Pezzo Unico</span>
              )}
              {product.isPreorder && (
                <span className="badge badge-preorder viewer-badge tilt-layer" style={{ '--depth': '58px' }}>Pre-ordine</span>
              )}
              <div className="tilt-glare" aria-hidden="true" />
            </div>
          </div>
          <p className="viewer-caption" data-reveal>
            {product.technique ? `${product.technique} — ` : ''}{product.dimensions || 'Opera originale'}
          </p>
        </div>

        {/* Right column: floating purchase panel */}
        <div className="product-detail-info-section">
          <div className="purchase-panel" data-reveal>
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
    </div>
  );
};

export default ProductDetail;
