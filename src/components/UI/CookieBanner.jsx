import { useState, useEffect } from 'react';
import './CookieBanner.css';

const CookieBanner = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setShow(true);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem('cookie_consent', 'all');
    setShow(false);
    // In un'implementazione reale, qui abiliteresti gli script di tracciamento
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted',
        'ad_storage': 'granted'
      });
    }
  };

  const rejectAll = () => {
    localStorage.setItem('cookie_consent', 'rejected');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="cookie-banner">
      <div className="cookie-content">
        <h4>Questo sito utilizza i cookie</h4>
        <p>Utilizziamo i cookie per migliorare la tua esperienza e per fini analitici, nel rispetto del GDPR. Scegli se accettare tutti i cookie o solo quelli necessari.</p>
        <div className="cookie-actions">
          <button onClick={rejectAll} className="btn-cookie-reject" aria-label="Rifiuta cookie non essenziali">Solo necessari</button>
          <button onClick={acceptAll} className="btn-cookie-accept" aria-label="Accetta tutti i cookie">Accetta tutti</button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
