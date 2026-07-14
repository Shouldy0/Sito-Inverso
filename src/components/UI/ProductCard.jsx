import { Link } from 'react-router-dom';
import Button from './Button';
import './ProductCard.css';

const ProductCard = ({ 
  id, 
  title, 
  type, 
  description, 
  price, 
  imageUrl, 
  isUnique = false,
  isPreorder = false,
  onAddToCart
}) => {
  return (
    <div className="product-card reveal-3d">
      <Link to={`/product/${id}`} className="product-image-wrapper">
        <img src={imageUrl} alt={title} className="product-image" loading="lazy" decoding="async" />
        {isUnique && <span className="badge-unique">Pezzo Unico</span>}
        {isPreorder && <span className="badge-preorder">Pre-ordine</span>}
      </Link>
      
      <div className="product-info">
        <Link to={`/product/${id}`} style={{ textDecoration: 'none' }}>
          <h3 className="product-title">{title}</h3>
        </Link>
        <span className="product-type">{type}</span>
        
        <div className="product-footer">
          <span className="product-price">€{price.toFixed(2)}</span>
          <Button variant="outline" onClick={() => onAddToCart(id)}>
            {isPreorder ? 'Pre-ordina' : 'Acquista'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
