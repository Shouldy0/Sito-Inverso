import ProductCard from '../components/UI/ProductCard';
import { useCart } from '../context/CartContext';
import { getProductsByCategory } from '../data/products';
import './CategoryPage.css';

const Biblioteca = () => {
  const { addToCart } = useCart();
  const mockBooks = getProductsByCategory('biblioteca');

  const handleAddToCart = (id) => {
    const product = mockBooks.find(p => p.id === id);
    if (product) {
      addToCart(product);
    }
  };

  return (
    <div className="category-page page-transition">
      <div className="category-header">
        <h1>Biblioteca</h1>
        <p>Tomi e codici stampati on-demand, pronti per arricchire il tuo archivio personale.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {mockBooks.map(book => (
          <ProductCard 
            key={book.id}
            {...book}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default Biblioteca;
