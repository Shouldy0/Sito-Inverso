import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import Navbar from './Navbar';
import Footer from './Footer';
import CartDrawer from '../Cart/CartDrawer';
import { useCart } from '../../context/CartContext';
import { useMagneticCursor } from '../../hooks/useMagneticCursor';
import useScrollDepth from '../../hooks/useScrollDepth';

const Layout = () => {
  const { isCartOpen, closeCart, toggleCart } = useCart();
  const location = useLocation();
  const mainRef = useRef(null);
  const prevPath = useRef(location.pathname);

  // Sistema profondità: reveal + parallasse su tutta la pagina, riarmato a ogni rotta
  useScrollDepth(location.pathname);
  useMagneticCursor();

  useEffect(() => {
    if (prevPath.current !== location.pathname && mainRef.current) {
      const el = mainRef.current;

      // Transizione pagina: emerge dalla profondità
      gsap.fromTo(el,
        { opacity: 0, y: 26, rotateX: 4, transformPerspective: 1000 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.55,
          ease: "power2.out",
          clearProps: "all",
          onStart: () => {
            window.scrollTo({ top: 0, behavior: 'instant' });
          }
        }
      );
    } else {
      window.scrollTo(0, 0);
    }

    prevPath.current = location.pathname;
  }, [location.pathname]);

  return (
    <div className="app-container">
      <Navbar toggleCart={toggleCart} />
      <CartDrawer isOpen={isCartOpen} closeCart={closeCart} />

      <main className="main-content" ref={mainRef}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
