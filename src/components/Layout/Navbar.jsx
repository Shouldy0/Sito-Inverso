import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import './Navbar.css';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/biblioteca', label: 'Fumetti' },
  { to: '/galleria', label: 'Stampe Artistiche' },
];

const secondaryLinks = [
  { to: '/universo', label: "L'Universo" },
];

const Navbar = ({ toggleCart }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const location = useLocation();
  const { cartCount } = useCart();

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsCompact(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className={`navbar ${isCompact ? 'compact' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/" onClick={closeMobileMenu}>DAIANA</Link>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-links">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={location.pathname === link.to ? 'active' : ''}
            >
              {link.label}
              <span className="nav-underline" />
            </Link>
          ))}
          <span className="navbar-divider">|</span>
          {secondaryLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={location.pathname === link.to ? 'active' : ''}
            >
              {link.label}
              <span className="nav-underline" />
            </Link>
          ))}
        </div>

        <div className="navbar-actions">
          <button className="cart-button" onClick={toggleCart} aria-label="Carrello">
            <ShoppingBag size={20} />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </button>

          <button
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        {[...navLinks, ...secondaryLinks].map((link, i) => (
          <Link
            key={link.to}
            to={link.to}
            onClick={closeMobileMenu}
            className="mobile-menu-link"
            style={{ transitionDelay: isMobileMenuOpen ? `${0.05 + i * 0.06}s` : '0s' }}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
