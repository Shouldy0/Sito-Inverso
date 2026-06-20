import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../data/products';
import { useCart } from '../context/CartContext';
import Button from '../components/UI/Button';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const product = getProductById(id);

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
        
        {/* Left column: Image */}
        <div className="product-detail-image-section">
          <div className="product-image-large floating-slow">
            <img src={product.imageUrl} alt={product.title} />
            {product.isUnique && <span className="badge-unique">Pezzo Unico</span>}
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
            <Button variant="primary" onClick={() => addToCart(product)} className="w-full">
              Aggiungi al Carrello
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
            <p><strong>Spedizione:</strong> Calcolata al momento del checkout.</p>
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
