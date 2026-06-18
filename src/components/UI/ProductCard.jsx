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
  onAddToCart
}) => {
  return (
    <div className="product-card">
      <Link to={`/product/${id}`} className="product-image-wrapper">
        <img src={imageUrl} alt={title} className="product-image" />
        {isUnique && <span className="badge-unique">Pezzo Unico</span>}
      </Link>
      
      <div className="product-info">
        <Link to={`/product/${id}`} style={{ textDecoration: 'none' }}>
          <h3 className="product-title">{title}</h3>
        </Link>
        <span className="product-type">{type}</span>
        
        <div className="product-footer">
          <span className="product-price">€{price.toFixed(2)}</span>
          <Button variant="outline" onClick={() => onAddToCart(id)}>
            Acquista
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
