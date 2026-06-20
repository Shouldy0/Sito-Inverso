import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import './Navbar.css';

const Navbar = ({ toggleCart }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { cartCount } = useCart();

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/" onClick={closeMobileMenu}>INverso</Link>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-links">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
          <Link to="/biblioteca" className={location.pathname === '/biblioteca' ? 'active' : ''}>Libri</Link>
          <Link to="/galleria" className={location.pathname === '/galleria' ? 'active' : ''}>Stampe</Link>
          <Link to="/originali" className={location.pathname === '/originali' ? 'active' : ''}>Originali</Link>
          <span className="navbar-divider">|</span>
          <Link to="/universo" className={location.pathname === '/universo' ? 'active' : ''}>L'Universo</Link>
          <Link to="/diario" className={location.pathname === '/diario' ? 'active' : ''}>Diario</Link>
        </div>

        <div className="navbar-actions">
          <button className="cart-button" onClick={toggleCart} aria-label="Carrello">
            <ShoppingBag size={20} />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </button>
          
          <button 
            className="mobile-menu-btn" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <Link to="/" onClick={closeMobileMenu}>Home</Link>
        <Link to="/biblioteca" onClick={closeMobileMenu}>Libri</Link>
        <Link to="/galleria" onClick={closeMobileMenu}>Stampe</Link>
        <Link to="/originali" onClick={closeMobileMenu}>Originali</Link>
        <div className="mobile-divider"></div>
        <Link to="/universo" onClick={closeMobileMenu}>L'Universo</Link>
        <Link to="/diario" onClick={closeMobileMenu}>Diario</Link>
      </div>
    </nav>
  );
};

export default Navbar;
