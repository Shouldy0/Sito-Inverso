import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Check, AlertCircle, BookOpen, Image, Heart, Award, ArrowRight } from 'lucide-react';
import './Links.css';

const Links = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
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
    } catch (err) {
      setStatus('error');
      setErrorMessage('Si è verificato un errore. Riprova più tardi.');
    }
  };

  return (
    <div className="links-page">
      {/* Background ambient glows */}
      <div className="links-glow-1" />
      <div className="links-glow-2" />

      <div className="links-container">
        {/* Profile Header */}
        <header className="links-header">
          <div className="links-avatar">
            <img src="/assets/noi_siamo_persona.jpg" alt="Daiana Vaiani Avatar" />
          </div>
          <h1 className="links-title">DAIANA</h1>
          <p className="links-subtitle">Frammenti di inchiostro, ombre e coscienza.</p>
        </header>

        {/* Links List */}
        <main className="links-list">
          {/* Primary Featured Link (Preorder) */}
          <Link to="/product/b5" className="link-item featured-link pulse-animation">
            <span className="link-icon"><BookOpen size={20} /></span>
            <div className="link-content">
              <span className="link-label">Pre-ordina "Noi siamo persona"</span>
              <span className="link-sub">Il nuovo fumetto sul Disturbo Dissociativo dell'Identità</span>
            </div>
            <span className="link-arrow"><ArrowRight size={18} /></span>
          </Link>

          {/* Other Links */}
          <Link to="/biblioteca" className="link-item">
            <span className="link-icon"><BookOpen size={20} /></span>
            <div className="link-content">
              <span className="link-label">La Biblioteca</span>
              <span className="link-sub">Tutti i fumetti e gli albi illustrati</span>
            </div>
            <span className="link-arrow"><ArrowRight size={18} /></span>
          </Link>

          <Link to="/galleria" className="link-item">
            <span className="link-icon"><Image size={20} /></span>
            <div className="link-content">
              <span className="link-label">Stampe Fine Art</span>
              <span className="link-sub">Esplora la Galleria di illustrazioni a china</span>
            </div>
            <span className="link-arrow"><ArrowRight size={18} /></span>
          </Link>

          <Link to="/originali" className="link-item">
            <span className="link-icon"><Heart size={20} /></span>
            <div className="link-content">
              <span className="link-label">Opere Originali</span>
              <span className="link-sub">Pezzi unici realizzati a mano con foglia d'oro</span>
            </div>
            <span className="link-arrow"><ArrowRight size={18} /></span>
          </Link>

          <Link to="/universo" className="link-item">
            <span className="link-icon"><Award size={20} /></span>
            <div className="link-content">
              <span className="link-label">L'Universo DAIANA</span>
              <span className="link-sub">Chi sono, il manifesto e la mia storia</span>
            </div>
            <span className="link-arrow"><ArrowRight size={18} /></span>
          </Link>

          <Link to="/" className="link-item">
            <span className="link-icon"><ArrowRight size={20} /></span>
            <div className="link-content">
              <span className="link-label">Sito Ufficiale</span>
              <span className="link-sub">Visita la homepage principale</span>
            </div>
            <span className="link-arrow"><ArrowRight size={18} /></span>
          </Link>
        </main>

        {/* Links Newsletter Section */}
        <section className="links-newsletter">
          <h3>Unisciti alle Lettere dall'Ombra</h3>
          <p>Ricevi estratti gratuiti e aggiornamenti sui dietro le quinte.</p>

          {status === 'success' ? (
            <div className="links-newsletter-success">
              <Check size={18} />
              <span>Iscrizione completata con successo!</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="links-newsletter-form">
              <input
                type="email"
                placeholder="La tua email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={status === 'loading'}
                className="links-input"
              />
              <button type="submit" disabled={status === 'loading'} className="links-submit-btn">
                {status === 'loading' ? '...' : 'Iscriviti'}
              </button>
              {status === 'error' && (
                <div className="links-newsletter-error">
                  <AlertCircle size={14} />
                  <span>{errorMessage}</span>
                </div>
              )}
            </form>
          )}
        </section>

        {/* Social Icons shortcuts */}
        <footer className="links-footer">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="tiktok-icon">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
            </svg>
          </a>
          <a href="mailto:info@daianavaiani.it" aria-label="Email">
            <Mail size={20} />
          </a>
          <p className="footer-copyright">&copy; {new Date().getFullYear()} DAIANA</p>
        </footer>
      </div>
    </div>
  );
};

export default Links;
