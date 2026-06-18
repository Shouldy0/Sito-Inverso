import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import CartDrawer from '../Cart/CartDrawer';
import { useCart } from '../../context/CartContext';

const Layout = () => {
  const { isCartOpen, closeCart, toggleCart } = useCart();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="app-container">
      <Navbar toggleCart={toggleCart} />
      <CartDrawer isOpen={isCartOpen} closeCart={closeCart} />
      
      <main className="main-content">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
