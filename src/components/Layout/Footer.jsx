import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../UI/Button';
import { Mail, Check, AlertCircle } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setErrorMessage('');

    try {
      // Simula una chiamata API di iscrizione
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // In futuro qui potrai connettere Brevo, Mailchimp, o un endpoint API server
      setStatus('success');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setErrorMessage('Si è verificato un errore. Riprova più tardi.');
    }
  };

  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <h3>DAIANA</h3>
          <p>Ogni storia è una soglia.</p>
        </div>
        
        <div className="footer-links">
          <h4>Esplora</h4>
          <Link to="/universo">Universo</Link>
          <Link to="/biblioteca">Libri</Link>
          <Link to="/galleria">Stampe</Link>
          <Link to="/originali">Opere Originali</Link>
        </div>

        <div className="footer-links">
          <h4>Informazioni</h4>
          <Link to="/info/spedizioni">Spedizioni e Resi</Link>
          <Link to="/info/termini">Termini e Condizioni</Link>
          <Link to="/contatti">Contatti</Link>
        </div>

        <div className="footer-newsletter">
          <h4>Lettere dall'Ombra</h4>
          <p className="newsletter-desc">
            Ricevi in anteprima estratti dei nuovi fumetti, aggiornamenti sui dietro le quinte e l'accesso prioritario alle opere originali.
          </p>
          
          {status === 'success' ? (
            <div className="newsletter-success animate-fade-in">
              <Check className="icon-success" size={18} />
              <span>Ti sei iscritto con successo! A presto.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <div className="input-group">
                <input 
                  type="email" 
                  name="email"
                  id="newsletter-email"
                  placeholder="La tua email..." 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required
                  disabled={status === 'loading'}
                  className="newsletter-input"
                  aria-label="Indirizzo email per newsletter"
                />
                <button type="submit" className="newsletter-submit-btn" disabled={status === 'loading'} aria-label="Iscriviti">
                  <Mail size={18} />
                </button>
              </div>
              {status === 'error' && (
                <div className="newsletter-error">
                  <AlertCircle size={14} />
                  <span>{errorMessage}</span>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} DAIANA. Tutti i diritti riservati.</p>
      </div>
    </footer>
  );
};

export default Footer;
