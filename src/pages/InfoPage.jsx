import { useParams } from 'react-router-dom';
import ContactForm from '../components/UI/ContactForm';
import { Mail, MapPin, Clock } from 'lucide-react';
import './InfoPage.css';

const infoData = {
  spedizioni: {
    title: "Spedizioni e Resi",
    content: (
      <>
        <h3>Tempistiche di Spedizione</h3>
        <p>Tutti i nostri libri sono stampati on-demand per ridurre gli sprechi e garantire la massima qualità. I tempi di lavorazione richiedono solitamente 3-5 giorni lavorativi. La spedizione standard in Italia impiega ulteriori 2-4 giorni lavorativi.</p>
        <p>Le opere originali richiedono un imballaggio speciale e assicurato, e vengono spedite entro 7 giorni lavorativi dall'acquisto.</p>
        
        <h3>Resi</h3>
        <p>Accettiamo resi entro 14 giorni dalla ricezione dell'ordine, a patto che il prodotto sia nelle sue condizioni originali. Le opere originali e le stampe personalizzate non sono rimborsabili, salvo danni durante il trasporto documentati alla consegna.</p>
      </>
    )
  },
  termini: {
    title: "Termini e Condizioni",
    content: (
      <>
        <h3>Condizioni di Vendita</h3>
        <p>Acquistando sul nostro sito, accetti i nostri termini di servizio. I prezzi indicati sono comprensivi di IVA. DAIANA si riserva il diritto di modificare i prezzi in qualsiasi momento, ma i prodotti verranno fatturati in base alle tariffe in vigore al momento della conferma dell'ordine.</p>
        
        <h3>Proprietà Intellettuale</h3>
        <p>Tutte le immagini, i testi e le opere presenti su questo sito sono di proprietà esclusiva di DAIANA. La riproduzione, anche parziale, senza consenso scritto è severamente vietata e perseguibile a norma di legge.</p>
      </>
    )
  },
  contatti: {
    title: "Contattaci",
    content: null // Custom layout rendered instead
  }
};

const InfoPage = ({ pageId: propPageId }) => {
  const { pageId: paramPageId } = useParams();
  const pageId = propPageId || paramPageId;
  const page = infoData[pageId];

  if (!page) {
    return (
      <div className="info-page container text-center" style={{ padding: '10rem 0' }}>
        <h2>Pagina non trovata</h2>
      </div>
    );
  }

  const isContact = pageId === 'contatti';

  return (
    <div className="info-page page-transition">
      <div className="container">
        <div className={isContact ? "contact-page-container animate-fade-in" : "info-content-wrapper"}>
          <h1 className="info-title">{page.title}</h1>
          
          {isContact ? (
            <div className="contact-grid">
              <div className="contact-details-col">
                <p className="contact-intro-text">
                  Per richieste commerciali, collaborazioni o domande sugli ordini, 
                  compila il modulo a fianco o usa i contatti diretti riportati qui sotto.
                </p>
                
                <div className="contact-cards-list">
                  <div className="contact-detail-card">
                    <div className="detail-icon">
                      <Mail size={20} />
                    </div>
                    <div className="detail-text">
                      <h4>Email</h4>
                      <a href="mailto:info@daianavaiani.it" className="detail-link">info@daianavaiani.it</a>
                    </div>
                  </div>

                  <div className="contact-detail-card">
                    <div className="detail-icon">
                      <MapPin size={20} />
                    </div>
                    <div className="detail-text">
                      <h4>Studio Artistico</h4>
                      <p>Milano, Italia (Solo su appuntamento)</p>
                    </div>
                  </div>

                  <div className="contact-detail-card">
                    <div className="detail-icon">
                      <Clock size={20} />
                    </div>
                    <div className="detail-text">
                      <h4>Tempi di risposta</h4>
                      <p>Solitamente rispondiamo entro 48 ore nei giorni lavorativi.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="contact-form-col">
                <ContactForm />
              </div>
            </div>
          ) : (
            <div className="info-body">
              {page.content}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoPage;
