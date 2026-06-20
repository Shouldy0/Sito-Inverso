import { Link } from 'react-router-dom';
import Button from '../components/UI/Button';
import ProductCard from '../components/UI/ProductCard';
import { useCart } from '../context/CartContext';
import { getFeaturedProducts } from '../data/products';
import './Home.css';

const Home = () => {
  const { addToCart } = useCart();
  const featuredProducts = getFeaturedProducts();
  const featuredBook = featuredProducts[0];
  const newArrivals = featuredProducts.slice(1);

  const handleAddToCart = (id) => {
    const product = featuredProducts.find(p => p.id === id);
    if (product) {
      addToCart(product);
    }
  };

  if (!featuredBook) {
    return (
      <div className="home-page page-transition container" style={{ padding: '8rem 2rem', textHeight: 'center' }}>
        <h2>Nessun libro disponibile al momento.</h2>
      </div>
    );
  }

  return (
    <div className="home-page page-transition">
      
      {/* Editorial Featured Section */}
      <section className="featured-hero container">
        <Link to={`/product/${featuredBook.id}`} className="featured-image-wrapper">
          <img src={featuredBook.imageUrl} alt={featuredBook.title} className="featured-image" />
        </Link>
        <div className="featured-content">
          <span className="featured-label">{featuredBook.type}</span>
          <Link to={`/product/${featuredBook.id}`} style={{ textDecoration: 'none' }}>
            <h1 className="featured-title">{featuredBook.title}</h1>
          </Link>
          <p className="featured-desc">{featuredBook.description}</p>
          <div className="featured-actions">
            <span className="featured-price">€{featuredBook.price.toFixed(2)}</span>
            <Button variant="primary" onClick={() => handleAddToCart(featuredBook.id)}>
              Aggiungi al Carrello
            </Button>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      {newArrivals.length > 0 && (
        <section className="new-arrivals container">
          <div className="section-header">
            <h2>Nuovi Arrivi</h2>
            <Link to="/biblioteca" className="view-all-link">Vedi tutta la collezione</Link>
          </div>
          
          <div className="products-grid">
            {newArrivals.map(product => (
              <ProductCard 
                key={product.id}
                {...product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </section>
      )}
      
    </div>
  );
};

export default Home;
