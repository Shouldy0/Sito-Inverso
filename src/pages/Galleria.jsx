import ProductCard from '../components/UI/ProductCard';
import { useCart } from '../context/CartContext';
import { getProductsByCategory } from '../data/products';
import './CategoryPage.css';

const Galleria = () => {
  const { addToCart } = useCart();
  const mockPrints = getProductsByCategory('galleria');

  const handleAddToCart = (id) => {
    const product = mockPrints.find(p => p.id === id);
    if (product) {
      addToCart(product);
    }
  };

  return (
    <div className="category-page page-transition">
      <div className="category-header">
        <h1>Galleria</h1>
        <p>Stampe artistiche di altissima qualità, per portare frammenti dell'universo DAIANA sulle tue pareti.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {mockPrints.map(print => (
          <ProductCard 
            key={print.id}
            {...print}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default Galleria;
