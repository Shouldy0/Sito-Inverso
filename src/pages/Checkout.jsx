import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Button from '../components/UI/Button';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './Checkout.css';

// Caricamento sicuro di Stripe (evita la pagina bianca se la chiave è sbagliata)
let stripePromise = null;
const stripeKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_TYooMQauvdEDq54NiTphI7jx';

if (stripeKey.startsWith('pk_') || stripeKey.startsWith('rk_')) {
  stripePromise = loadStripe(stripeKey).catch(err => console.error("Errore loadStripe:", err));
}

const CheckoutForm = ({ clientSecret, cartItems, cartTotal }) => {
  const stripe = useStripe();
  const elements = useElements();
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
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setError(null);

    try {
      // 1. Conferma il pagamento con Stripe
      const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.origin + '/success',
          payment_method_data: {
            billing_details: {
              name: `${formData.firstName} ${formData.lastName}`,
              email: formData.email,
              phone: formData.phone,
              address: {
                city: formData.city,
                country: formData.countryCode,
                line1: formData.address,
                postal_code: formData.zipcode
              }
            }
          }
        },
        redirect: 'if_required', // Gestiamo il redirect manualmente
      });

      if (stripeError) {
        throw new Error(stripeError.message);
      }

      if (paymentIntent && paymentIntent.status === 'succeeded') {
        // 2. Pagamento riuscito! Ora diciamo a Lulu di stampare
        const luluResponse = await fetch('/api/create-print-job', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contact: { email: formData.email },
            shipping: formData,
            items: cartItems,
            paymentIntentId: paymentIntent.id // Passiamo l'ID di Stripe al nostro server per verifica!
          }),
        });

        const luluData = await luluResponse.json();

        if (luluData.success) {
          navigate('/success');
        } else {
          throw new Error('Pagamento effettuato, ma errore nell\'ordine di stampa: ' + (luluData.error || 'Errore sconosciuto'));
        }
      } else {
        throw new Error('Lo stato del pagamento non è confermato. Riprova.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <div className="form-section">
        <h2>1. Informazioni di Contatto e Spedizione</h2>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="tu@email.com" />
        </div>
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
          <label>Indirizzo di Spedizione</label>
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
        <div className="form-row">
          <div className="form-group half">
            <label>Paese (Codice 2 lettere)</label>
            <input type="text" name="countryCode" required value={formData.countryCode} onChange={handleChange} placeholder="IT" maxLength={2} />
          </div>
          <div className="form-group half">
            <label>Telefono</label>
            <input type="text" name="phone" required value={formData.phone} onChange={handleChange} placeholder="+39 333 1234567" />
          </div>
        </div>
      </div>

      <div className="form-section stripe-section">
        <h2>2. Pagamento Sicuro</h2>
        <div className="stripe-element-container">
          <PaymentElement />
        </div>
        {error && <div className="checkout-error">{error}</div>}
      </div>

      <Button 
        variant="primary" 
        type="submit" 
        className="w-full submit-btn" 
        disabled={isProcessing || !stripe || !elements}
      >
        {isProcessing ? 'Elaborazione in corso...' : `Paga €${cartTotal.toFixed(2)}`}
      </Button>
    </form>
  );
};

const Checkout = () => {
  const { cartItems, cartTotal } = useCart();
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState('');
  const [loadingError, setLoadingError] = useState('');

  useEffect(() => {
    if (cartTotal > 0) {
      // Crea il PaymentIntent non appena il componente viene caricato
      fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: cartTotal }),
      })
        .then((res) => {
          if (!res.ok) {
            return res.json().then(data => {
              throw new Error(data.error || 'Errore del server');
            });
          }
          return res.json();
        })
        .then((data) => {
          if(data.clientSecret) {
            setClientSecret(data.clientSecret);
          } else {
            throw new Error('Nessun clientSecret ricevuto dal server');
          }
        })
        .catch(err => {
          console.error("Errore recupero PaymentIntent:", err);
          setLoadingError(err.message);
        });
    }
  }, [cartTotal]);

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
          <p className="checkout-subtitle">Paga in sicurezza con Stripe e ricevi il libro a casa.</p>

          {!stripePromise ? (
            <div className="checkout-error" style={{ padding: '2rem', textAlign: 'center' }}>
              <h3>⚠️ Errore di Configurazione Stripe</h3>
              <p>La chiave pubblica inserita in Vercel non è valida.</p>
              <p>Assicurati di inserire la <strong>Publishable key</strong> che inizia con <code>pk_live_...</code> (NON apikey_...).</p>
            </div>
          ) : loadingError ? (
            <div className="checkout-error" style={{ padding: '2rem', textAlign: 'center' }}>
              <h3>⚠️ Errore di Configurazione Stripe</h3>
              <p>Non è stato possibile caricare il modulo di pagamento:</p>
              <p style={{ color: '#ff6b6b', margin: '1rem 0', fontWeight: 'bold' }}>{loadingError}</p>
              <p>Verifica che la chiave segreta (<strong>STRIPE_SECRET_KEY</strong>) inserita su Vercel sia corretta e corrisponda alla chiave pubblica.</p>
            </div>
          ) : clientSecret ? (
            <Elements options={{ clientSecret }} stripe={stripePromise}>
              <CheckoutForm clientSecret={clientSecret} cartItems={cartItems} cartTotal={cartTotal} />
            </Elements>
          ) : (
            <div className="loading-payment">Caricamento modulo di pagamento...</div>
          )}
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
                <span>Inclusa</span>
              </div>
              <div className="summary-row total">
                <span>Totale Da Pagare</span>
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
