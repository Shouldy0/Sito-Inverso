import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Button from '../components/UI/Button';
import './Checkout.css';

const Checkout = () => {
  const { cartItems, cartTotal } = useCart();
  const navigate = useNavigate();
  
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
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

  const dropInRef = useRef(null);

  // 1. Carica lo script di Airwallex all'avvio
  useEffect(() => {
    const scriptId = 'airwallex-components-sdk-script';
    let script = document.getElementById(scriptId);

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://static.airwallex.com/components/sdk/v1/index.js';
      script.async = true;
      script.onload = () => {
        setSdkLoaded(true);
      };
      script.onerror = () => {
        setError('Impossibile caricare il modulo di pagamento Airwallex. Controlla la connessione internet.');
      };
      document.body.appendChild(script);
    } else {
      setSdkLoaded(true);
    }

    // Cleanup: distrugge l'elemento se l'utente esce dalla pagina
    return () => {
      if (dropInRef.current) {
        try {
          dropInRef.current.destroy();
        } catch (e) {
          console.error('Error destroying Airwallex dropIn:', e);
        }
      }
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const requiredFields = ['email', 'firstName', 'lastName', 'address', 'city', 'zipcode', 'phone'];
    for (const field of requiredFields) {
      if (!formData[field] || formData[field].trim() === '') {
        return false;
      }
    }
    return true;
  };

  // 2. Chiamato quando l'utente clicca su "Procedi al pagamento"
  const handleProceedToPayment = async (e) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      setError('Per favore, compila tutti i campi di spedizione obbligatori prima di procedere.');
      return;
    }

    if (!sdkLoaded || !window.AirwallexComponentsSDK) {
      setError('Il sistema di pagamento non è ancora pronto. Riprova tra qualche istante.');
      return;
    }

    setIsProcessing(true);

    try {
      // a. Crea il PaymentIntent sul nostro server
      const response = await fetch('/api/create-airwallex-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: cartTotal }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Errore durante la creazione del pagamento su Airwallex');
      }

      const { id: intentId, clientSecret } = data;

      // b. Inizializza l'SDK di Airwallex
      const env = import.meta.env.VITE_AIRWALLEX_ENV || 'demo';
      await window.AirwallexComponentsSDK.init({
        env: env,
        enabledElements: ['payments'],
      });

      // c. Se c'è un elemento precedente, lo distruggiamo per sicurezza
      if (dropInRef.current) {
        dropInRef.current.destroy();
      }

      // d. Crea il componente Drop-in
      const dropIn = window.AirwallexComponentsSDK.createElement('dropIn', {
        intent_id: intentId,
        client_secret: clientSecret,
        currency: 'EUR',
      });

      dropInRef.current = dropIn;

      // e. Mostra la sezione del pagamento ed esegui il mount
      setIsSubmitted(true);
      
      // Ritardo millimetrico per permettere al div di diventare visibile
      setTimeout(() => {
        dropIn.mount('airwallex-dropin-container');

        // Ascolta l'evento di successo del pagamento
        dropIn.on('success', async (event) => {
          setIsProcessing(true);
          setError(null);
          
          try {
            // Invia l'ordine a Lulu dopo che il pagamento è stato effettuato
            const printResponse = await fetch('/api/create-print-job-airwallex', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                paymentIntentId: intentId,
                contact: { email: formData.email },
                shipping: formData,
                items: cartItems
              }),
            });

            const printData = await printResponse.json();

            if (!printResponse.ok) {
              throw new Error(printData.error || 'Errore durante l\'invio dell\'ordine di stampa');
            }

            if (printData.success) {
              navigate('/success');
            } else {
              throw new Error('Pagamento completato, ma errore nell\'invio a Lulu: ' + (printData.error || 'Errore sconosciuto'));
            }
          } catch (err) {
            console.error('Lulu submit error:', err);
            setError(err.message);
            setIsProcessing(false);
          }
        });

        // Ascolta eventuali errori di pagamento
        dropIn.on('error', (event) => {
          const { error: paymentErr } = event.detail || {};
          console.error('Airwallex payment error:', paymentErr);
          setError(paymentErr?.message || 'Si è verificato un errore durante la transazione. Per favore riprova.');
        });
      }, 50);

    } catch (err) {
      console.error(err);
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
          <p className="checkout-subtitle">Paga in sicurezza con Airwallex (Carte di Credito/Debito) e ricevi il libro a casa.</p>

          {error && <div className="checkout-error" style={{ marginBottom: '1.5rem' }}>{error}</div>}

          {isProcessing && (
            <div className="loading-payment" style={{ marginBottom: '1.5rem' }}>
              Elaborazione in corso... Per favore non chiudere o ricaricare la pagina.
            </div>
          )}

          <form onSubmit={handleProceedToPayment} className="checkout-form">
            <div className="form-section">
              <h2>1. Informazioni di Contatto e Spedizione</h2>
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  name="email" 
                  required 
                  disabled={isSubmitted}
                  value={formData.email} 
                  onChange={handleChange} 
                  placeholder="tu@email.com" 
                />
              </div>
              <div className="form-row">
                <div className="form-group half">
                  <label>Nome</label>
                  <input 
                    type="text" 
                    name="firstName" 
                    required 
                    disabled={isSubmitted}
                    value={formData.firstName} 
                    onChange={handleChange} 
                    placeholder="Mario" 
                  />
                </div>
                <div className="form-group half">
                  <label>Cognome</label>
                  <input 
                    type="text" 
                    name="lastName" 
                    required 
                    disabled={isSubmitted}
                    value={formData.lastName} 
                    onChange={handleChange} 
                    placeholder="Rossi" 
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Indirizzo di Spedizione</label>
                <input 
                  type="text" 
                  name="address" 
                  required 
                  disabled={isSubmitted}
                  value={formData.address} 
                  onChange={handleChange} 
                  placeholder="Via Roma, 123" 
                />
              </div>
              <div className="form-row">
                <div className="form-group half">
                  <label>Città</label>
                  <input 
                    type="text" 
                    name="city" 
                    required 
                    disabled={isSubmitted}
                    value={formData.city} 
                    onChange={handleChange} 
                    placeholder="Roma" 
                  />
                </div>
                <div className="form-group half">
                  <label>CAP</label>
                  <input 
                    type="text" 
                    name="zipcode" 
                    required 
                    disabled={isSubmitted}
                    value={formData.zipcode} 
                    onChange={handleChange} 
                    placeholder="00100" 
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group half">
                  <label>Paese (Codice 2 lettere)</label>
                  <input 
                    type="text" 
                    name="countryCode" 
                    required 
                    disabled={isSubmitted}
                    value={formData.countryCode} 
                    onChange={handleChange} 
                    placeholder="IT" 
                    maxLength={2} 
                  />
                </div>
                <div className="form-group half">
                  <label>Telefono</label>
                  <input 
                    type="text" 
                    name="phone" 
                    required 
                    disabled={isSubmitted}
                    value={formData.phone} 
                    onChange={handleChange} 
                    placeholder="+39 333 1234567" 
                  />
                </div>
              </div>

              {!isSubmitted && (
                <Button 
                  variant="primary" 
                  type="submit" 
                  className="w-full submit-btn" 
                  disabled={isProcessing || !sdkLoaded}
                >
                  Procedi al Pagamento
                </Button>
              )}
            </div>
          </form>

          {/* Sezione del modulo di pagamento Airwallex */}
          <div 
            className="form-section airwallex-section" 
            style={{ 
              display: isSubmitted ? 'block' : 'none',
              marginTop: '2rem',
              padding: '1.5rem',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '8px'
            }}
          >
            <h2>2. Pagamento Sicuro con Carta</h2>
            
            {/* Contenitore in cui verrà montato l'iframe di Airwallex */}
            <div 
              id="airwallex-dropin-container" 
              style={{ 
                marginTop: '1.5rem',
                minHeight: '200px'
              }}
            ></div>

            <Button 
              variant="outline" 
              className="mt-4" 
              onClick={() => {
                setIsSubmitted(false);
                if (dropInRef.current) {
                  dropInRef.current.destroy();
                  dropInRef.current = null;
                }
              }}
              disabled={isProcessing}
            >
              Modifica Dati Spedizione
            </Button>
          </div>
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
