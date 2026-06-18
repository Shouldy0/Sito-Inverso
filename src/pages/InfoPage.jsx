import { useParams } from 'react-router-dom';
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
        <p>Acquistando sul nostro sito, accetti i nostri termini di servizio. I prezzi indicati sono comprensivi di IVA. INverso si riserva il diritto di modificare i prezzi in qualsiasi momento, ma i prodotti verranno fatturati in base alle tariffe in vigore al momento della conferma dell'ordine.</p>
        
        <h3>Proprietà Intellettuale</h3>
        <p>Tutte le immagini, i testi e le opere presenti su questo sito sono di proprietà esclusiva di INverso. La riproduzione, anche parziale, senza consenso scritto è severamente vietata e perseguibile a norma di legge.</p>
      </>
    )
  },
  contatti: {
    title: "Contattaci",
    content: (
      <>
        <p>Per richieste commerciali, collaborazioni o domande sugli ordini, puoi scriverci direttamente.</p>
        <div className="contact-info">
          <p><strong>Email:</strong> info@inverso-art.com</p>
          <p><strong>Studio:</strong> (Solo su appuntamento)</p>
          <p>Rispondiamo solitamente entro 48 ore lavorative.</p>
        </div>
      </>
    )
  }
};

const InfoPage = () => {
  const { pageId } = useParams();
  const page = infoData[pageId];

  if (!page) {
    return (
      <div className="info-page container text-center" style={{ padding: '10rem 0' }}>
        <h2>Pagina non trovata</h2>
      </div>
    );
  }

  return (
    <div className="info-page page-transition">
      <div className="container">
        <div className="info-content-wrapper">
          <h1 className="info-title">{page.title}</h1>
          <div className="info-body">
            {page.content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;
