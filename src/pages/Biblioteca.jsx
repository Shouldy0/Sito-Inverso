import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ProductCard from '../components/UI/ProductCard';
import { useCart } from '../context/CartContext';
import { getProductsByCategory } from '../data/products';
import './CategoryPage.css';

const Biblioteca = () => {
  const { addToCart } = useCart();
  const mockBooks = getProductsByCategory('biblioteca');
  const titleRef = useRef(null);

  useEffect(() => {
    if (titleRef.current) {
      const text = titleRef.current.textContent;
      titleRef.current.innerHTML = '';
      text.split('').forEach((char) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        span.style.transform = 'translateY(30px)';
        titleRef.current.appendChild(span);
      });
      gsap.to(titleRef.current.children, {
        opacity: 1, y: 0, duration: 0.7, stagger: 0.04, ease: "power3.out", delay: 0.2,
      });
    }
  }, []);

  const handleAddToCart = (id) => {
    const product = mockBooks.find(p => p.id === id);
    if (product) addToCart(product);
  };

  return (
    <div className="category-page page-transition">
      <div className="category-hero">
        <img src="/assets/library_card.webp" alt="" className="category-hero-bg parallax-bg" loading="lazy" decoding="async" />
        <div className="category-hero-overlay" />
        <div className="category-hero-content">
          <h1 ref={titleRef}>Fumetti</h1>
          <p data-reveal>Romanzi grafici, storie disegnate e libri illustrati — pronti per arricchire il tuo archivio personale.</p>
        </div>
      </div>

      <div className="container category-grid-container">
        <div className="dark-grid category-grid" data-reveal-group>
          {mockBooks.map(book => (
            <ProductCard
              key={book.id}
              {...book}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Biblioteca;
