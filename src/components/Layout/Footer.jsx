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
        <div className="footer-brand" data-reveal>
          <h3 className="footer-brand-title">INverso</h3>
          <span className="footer-artist-name">Daiana Vaiani</span>
          <p className="footer-quote">
            "L'inchiostro è la mia voce quando il silenzio si fa troppo grande."
          </p>
        </div>

        <div className="footer-links" data-reveal data-reveal-delay>
          <h4>Mondo INverso</h4>
          <Link to="/originali">Originali (Pezzi Unici)</Link>
          <Link to="/universo">Universo (Fan Art & Stampe)</Link>
          <Link to="/biblioteca">Biblioteca (Albi Cartacei)</Link>
          <Link to="/diario">Spostamenti (Diario)</Link>
        </div>

        <div className="footer-links" data-reveal data-reveal-delay>
          <h4>Informazioni</h4>
          <Link to="/info/chi-sono">L'Artista</Link>
          <Link to="/info/spedizioni">Spedizioni e Certificati</Link>
          <Link to="/info/termini">Termini e Policy</Link>
          <Link to="/contatti">Contatti & Commissioni</Link>
        </div>

        <div className="footer-newsletter" data-reveal data-reveal-delay>
          <h4>Entra nell'INverso</h4>
          <p className="newsletter-desc">
            Iscriviti per ricevere in anteprima gli aggiornamenti sulle nuove opere uniche, i capitoli in uscita e le tirature speciali dell'Universo.
          </p>

          {status === 'success' ? (
            <div className="newsletter-success animate-fade-in">
              <Check className="icon-success" size={18} />
              <span>Ti diamo il benvenuto nell'INverso. A presto.</span>
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
        <p>&copy; {new Date().getFullYear()} INverso — Daiana Vaiani. Tutti i diritti riservati.</p>
      </div>
    </footer>
  );
};

export default Footer;
