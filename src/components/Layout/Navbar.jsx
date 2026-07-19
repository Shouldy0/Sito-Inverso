import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import './Navbar.css';

const mainNavLinks = [
  { to: '/', label: 'Home' },
  { to: '/originali', label: 'Originali' },
  { to: '/universo', label: 'Universo' },
  { to: '/biblioteca', label: 'Biblioteca' },
];

const secondaryNavLinks = [
  { to: '/info/chi-sono', label: "L'Artista" },
  { to: '/diario', label: 'Spostamenti' },
];

const Navbar = ({ toggleCart }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const location = useLocation();
  const { cartCount } = useCart();

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsCompact(window.scrollY > 60);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className={`navbar ${isCompact ? 'compact' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/" onClick={closeMobileMenu} className="logo-brand">
            <span className="brand-name">INverso</span>
            <span className="brand-sub">Daiana Vaiani</span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-links">
          {mainNavLinks.map(link => (
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
          {secondaryNavLinks.map(link => (
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
        {[...mainNavLinks, ...secondaryNavLinks].map((link, i) => (
          <Link
            key={link.to}
            to={link.to}
            onClick={closeMobileMenu}
            className="mobile-menu-link"
            style={{ transitionDelay: isMobileMenuOpen ? `${0.05 + i * 0.05}s` : '0s' }}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
