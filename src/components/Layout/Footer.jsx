import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Check, AlertCircle } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setErrorMessage('');

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
      setErrorMessage('Si è verificato un errore. Riprova più tardi.');
    }
  };

  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand reveal-3d" data-reveal-delay="0">
          <h3>DAIANA</h3>
          <p>Ogni storia è una soglia.</p>
        </div>

        <div className="footer-links reveal-3d" data-reveal-delay="0.1">
          <h4>Esplora</h4>
          <Link to="/universo">Universo</Link>
          <Link to="/biblioteca">Fumetti</Link>
          <Link to="/galleria">Stampe Artistiche</Link>
          <Link to="/originali">Opere Originali</Link>
        </div>

        <div className="footer-links reveal-3d" data-reveal-delay="0.2">
          <h4>Informazioni</h4>
          <Link to="/info/spedizioni">Spedizioni e Resi</Link>
          <Link to="/info/termini">Termini e Condizioni</Link>
          <Link to="/contatti">Contatti</Link>
        </div>

        <div className="footer-newsletter reveal-3d" data-reveal-delay="0.3">
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
