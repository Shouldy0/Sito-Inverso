import { Link } from 'react-router-dom';
import Button from './Button';
import useTilt3D from '../../hooks/useTilt3D';
import './ProductCard.css';

const ProductCard = ({
  id,
  title,
  type,
  price,
  imageUrl,
  category,
  tier,
  fandom,
  isUnique = false,
  isPreorder = false,
  microStory,
  onAddToCart
}) => {
  const tiltRef = useTilt3D({ max: 10, scale: 1.03, perspective: 900 });

  const renderBadge = () => {
    if (isUnique) return <span className="badge badge-unique">Pezzo Unico</span>;
    if (tier === 'studio_works') return <span className="badge badge-studio">Studio Work</span>;
    if (tier === 'opere_originali') return <span className="badge badge-original">Opera Originale</span>;
    if (category === 'universo' && fandom && fandom !== 'original_art') {
      return <span className="badge badge-fandom">{fandom.replace('_', ' ').toUpperCase()}</span>;
    }
    if (category === 'universo') return <span className="badge badge-universo">Stampa Fine Art</span>;
    if (isPreorder) return <span className="badge badge-preorder">Pre-ordine</span>;
    return null;
  };

  return (
    <div className="product-cell" data-reveal>
      <div className="tilt-scene">
        <div className={`tilt-card product-card ${category ? `card-${category}` : ''}`} ref={tiltRef}>
          {/* Artwork: galleggia sopra la card */}
          <div className="tilt-layer tilt-artwork" style={{ '--depth': '50px' }}>
            <Link to={`/product/${id}`} className="product-image-frame" aria-label={title}>
              <img
                src={imageUrl}
                alt={title}
                className="product-image"
                loading="lazy"
                decoding="async"
              />
            </Link>
            <div className="product-badge-layer" style={{ transform: 'translateZ(34px)' }}>
              {renderBadge()}
            </div>
          </div>

          {/* Info a profondità crescente */}
          <div className="tilt-layer tilt-info" style={{ '--depth': '30px' }}>
            <span className="product-type">{type}</span>
            <Link to={`/product/${id}`} className="product-title-link">
              <h3 className="product-title">{title}</h3>
            </Link>
          </div>

          {microStory && (
            <div className="tilt-layer tilt-story" style={{ '--depth': '18px' }}>
              <p className="product-micro-story">
                {microStory.length > 85 ? `${microStory.substring(0, 85)}...` : microStory}
              </p>
            </div>
          )}

          <div className="tilt-layer tilt-footer" style={{ '--depth': '24px' }}>
            <div className="product-footer">
              <span className="product-price">€{price.toFixed(2)}</span>
              <Button variant="outline" onClick={() => onAddToCart(id)}>
                {isPreorder ? 'Pre-ordina' : 'Dettagli & Acquista'}
              </Button>
            </div>
          </div>

          <div className="tilt-glare" />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
