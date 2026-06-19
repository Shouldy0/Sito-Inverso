import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Button from '../components/UI/Button';
import './Checkout.css';

const Checkout = () => {
  const { cartItems, cartTotal } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipcode: '',
    countryCode: 'IT',
    phone: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:3001/api/create-print-job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contact: { email: formData.email },
          shipping: formData,
          items: cartItems
        }),
      });

      const data = await response.json();

      if (data.success) {
        navigate('/success');
      } else {
        throw new Error(data.error || 'Errore durante la creazione dell\'ordine');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-empty">
        <h2>Il tuo carrello è vuoto</h2>
        <Button variant="outline" onClick={() => navigate('/')}>Torna allo Store</Button>
      </div>
    );
  }

  return (
    <div className="checkout-page page-transition">
      <div className="checkout-container">
        
        <div className="checkout-form-section">
          <h1>Checkout</h1>
          <p className="checkout-subtitle">Inserisci i tuoi dati per completare l'ordine.</p>

          {error && <div className="checkout-error">{error}</div>}

          <form onSubmit={handleSubmit} className="checkout-form">
            
            <div className="form-section">
              <h2>1. Informazioni di Contatto</h2>
              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="tu@email.com" />
              </div>
              <div className="form-group">
                <label>Telefono</label>
                <input type="text" name="phone" required value={formData.phone} onChange={handleChange} placeholder="+39 333 1234567" />
              </div>
            </div>

            <div className="form-section">
              <h2>2. Indirizzo di Spedizione</h2>
              <div className="form-row">
                <div className="form-group half">
                  <label>Nome</label>
                  <input type="text" name="firstName" required value={formData.firstName} onChange={handleChange} placeholder="Mario" />
                </div>
                <div className="form-group half">
                  <label>Cognome</label>
                  <input type="text" name="lastName" required value={formData.lastName} onChange={handleChange} placeholder="Rossi" />
                </div>
              </div>
              <div className="form-group">
                <label>Indirizzo</label>
                <input type="text" name="address" required value={formData.address} onChange={handleChange} placeholder="Via Roma, 123" />
              </div>
              <div className="form-row">
                <div className="form-group half">
                  <label>Città</label>
                  <input type="text" name="city" required value={formData.city} onChange={handleChange} placeholder="Roma" />
                </div>
                <div className="form-group half">
                  <label>CAP</label>
                  <input type="text" name="zipcode" required value={formData.zipcode} onChange={handleChange} placeholder="00100" />
                </div>
              </div>
              <div className="form-group">
                <label>Paese (Codice 2 lettere)</label>
                <input type="text" name="countryCode" required value={formData.countryCode} onChange={handleChange} placeholder="IT" maxLength={2} />
              </div>
            </div>

            <Button 
              variant="primary" 
              type="submit" 
              className="w-full submit-btn" 
              disabled={isProcessing}
            >
              {isProcessing ? 'Elaborazione in corso...' : `Paga e Spedisci €${cartTotal.toFixed(2)}`}
            </Button>
          </form>
        </div>

        <div className="checkout-summary-section">
          <div className="summary-card">
            <h2>Riepilogo Ordine</h2>
            <div className="summary-items">
              {cartItems.map(item => (
                <div key={item.id} className="summary-item">
                  <div className="summary-item-image">
                    <img src={item.imageUrl} alt={item.title} />
                  </div>
                  <div className="summary-item-details">
                    <h4>{item.title}</h4>
                    <p>Quantità: {item.quantity}</p>
                  </div>
                  <div className="summary-item-price">
                    €{(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="summary-totals">
              <div className="summary-row">
                <span>Subtotale</span>
                <span>€{cartTotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Spedizione (Lulu)</span>
                <span>Calcolata dopo</span>
              </div>
              <div className="summary-row total">
                <span>Totale (Stima)</span>
                <span>€{cartTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;
