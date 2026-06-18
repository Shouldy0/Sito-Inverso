import ProductCard from '../components/UI/ProductCard';
import { useCart } from '../context/CartContext';
import { getProductsByCategory } from '../data/products';
import './CategoryPage.css';

const Originali = () => {
  const { addToCart } = useCart();
  const mockOriginals = getProductsByCategory('originali');

  const handleAddToCart = (id) => {
    const product = mockOriginals.find(p => p.id === id);
    if (product) {
      addToCart(product);
    }
  };

  return (
    <div className="category-page page-transition">
      <div className="category-header">
        <h1>Opere Originali</h1>
        <p>Pezzi unici, realizzati a mano con inchiostro e foglia d'oro. Solo uno di ciascuno esiste al mondo.</p>
      </div>

      <div className="category-grid">
        {mockOriginals.map(original => (
          <ProductCard 
            key={original.id}
            {...original}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default Originali;
