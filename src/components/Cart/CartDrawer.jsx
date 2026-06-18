import { X, Trash2, Plus, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../UI/Button';
import { useCart } from '../../context/CartContext';
import './CartDrawer.css';

const CartDrawer = ({ isOpen, closeCart }) => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    alert("Questa funzione sarà collegata al checkout reale di Stripe appena verranno inserite le chiavi API.");
  };

  return (
    <>
      <div className={`cart-overlay ${isOpen ? 'open' : ''}`} onClick={closeCart}></div>
      <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
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
            <div className="cart-items">
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
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                            <Minus size={14} />
                          </button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
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
              className="checkout-btn"
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
