import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <h3>INverso</h3>
          <p>Ogni storia è una soglia.</p>
        </div>
        
        <div className="footer-links">
          <h4>Esplora</h4>
          <Link to="/biblioteca">Libri</Link>
          <Link to="/galleria">Stampe</Link>
        </div>

        <div className="footer-links">
          <h4>Informazioni</h4>
          <Link to="/info/spedizioni">Spedizioni e Resi</Link>
          <Link to="/info/termini">Termini e Condizioni</Link>
          <Link to="/info/contatti">Contatti</Link>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} INverso. Tutti i diritti riservati.</p>
      </div>
    </footer>
  );
};

export default Footer;
