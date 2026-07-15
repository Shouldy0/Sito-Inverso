import { useRef, useEffect } from 'react';
import { X, Trash2, Plus, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import Button from '../UI/Button';
import { useCart } from '../../context/CartContext';
import './CartDrawer.css';

const CartDrawer = ({ isOpen, closeCart }) => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();
  const drawerRef = useRef(null);
  const overlayRef = useRef(null);
  const itemsRef = useRef(null);

  useEffect(() => {
    if (!drawerRef.current) return;

    if (isOpen) {
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, ease: "power2.out" });
      gsap.fromTo(drawerRef.current,
        { x: '100%' },
        { x: '0%', duration: 0.6, ease: "elastic.out(1, 0.8)" }
      );

      // Stagger items
      if (itemsRef.current) {
        const items = itemsRef.current.querySelectorAll('.cart-item');
        if (items.length > 0) {
          gsap.fromTo(items,
            { opacity: 0, x: 30 },
            { opacity: 1, x: 0, duration: 0.4, stagger: 0.08, ease: "power2.out", delay: 0.3 }
          );
        }
      }
    } else {
      gsap.to(drawerRef.current, { x: '100%', duration: 0.35, ease: "power2.in" });
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.25 });
    }
  }, [isOpen]);

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  const handleQuantityChange = (id, newQty, isUnique) => {
    if (isUnique) return;
    updateQuantity(id, newQty);
  };

  return (
    <>
      <div
        className="cart-overlay"
        ref={overlayRef}
        style={{ opacity: 0, pointerEvents: 'none' }}
        onClick={closeCart}
      />
      <div className="cart-drawer" ref={drawerRef} style={{ transform: 'translateX(100%)' }}>
        <div className="cart-header">
          <h2>Carrello</h2>
          <button className="close-btn" onClick={closeCart} aria-label="Chiudi">
            <X size={24} />
          </button>
        </div>

        <div className="cart-body">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <p>Il tuo carrello è vuoto.</p>
              <Button variant="outline" onClick={closeCart} className="mt-4">
                Continua lo shopping
              </Button>
            </div>
          ) : (
            <div className="cart-items" ref={itemsRef}>
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-image">
                    <img src={item.imageUrl} alt={item.title} />
                  </div>
                  <div className="cart-item-details">
                    <h4>{item.title}</h4>
                    <p className="cart-item-type">{item.type}</p>
                    <p className="cart-item-price">€{item.price.toFixed(2)}</p>

                    <div className="cart-item-actions">
                      {!item.isUnique ? (
                        <div className="quantity-controls">
                          <button onClick={() => handleQuantityChange(item.id, item.quantity - 1, item.isUnique)} disabled={item.quantity <= 1}>
                            <Minus size={14} />
                          </button>
                          <span className="quantity-value">{item.quantity}</span>
                          <button onClick={() => handleQuantityChange(item.id, item.quantity + 1, item.isUnique)}>
                            <Plus size={14} />
                          </button>
                        </div>
                      ) : (
                        <span className="unique-label">Pezzo Unico</span>
                      )}

                      <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Totale</span>
              <span>€{cartTotal.toFixed(2)}</span>
            </div>
            <Button
              variant="primary"
              className="checkout-btn magnetic-btn"
              onClick={handleCheckout}
            >
              Procedi al Checkout
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
