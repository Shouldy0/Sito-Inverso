import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/UI/Button';
import './InfoPage.css'; // Possiamo riusare il CSS di InfoPage

const Termini = () => {
  const navigate = useNavigate();

  return (
    <div className="info-page page-transition">
      <div className="info-container">
        <nav className="breadcrumb">
          <button onClick={() => navigate(-1)} className="back-link">
            ← Torna indietro
          </button>
        </nav>
        
        <h1 className="info-title">Termini e Condizioni</h1>
        
        <div className="info-content">
          <p><em>Ultimo aggiornamento: 28 Giugno 2026</em></p>
          
          <h2>1. Introduzione</h2>
          <p>Le presenti Condizioni Generali di Vendita regolano l'acquisto dei prodotti sul sito www.daianavaiani.it, conformemente alle disposizioni del Codice del Consumo (D.lgs. 206/2005) in materia di vendite a distanza e del D.lgs. 70/2003 in materia di commercio elettronico.</p>
          
          <h2>2. Accettazione delle condizioni di vendita</h2>
          <p>Effettuando un ordine sul sito, il Cliente dichiara di aver preso visione di tutte le indicazioni fornite durante la procedura di acquisto e di accettare integralmente le presenti condizioni generali.</p>
          
          <h2>3. Prezzi e Pagamenti</h2>
          <p>Tutti i prezzi di vendita dei prodotti indicati sul sito sono espressi in Euro e sono comprensivi di IVA e di ogni altra imposta. I costi di spedizione sono calcolati al momento del checkout. I pagamenti sono sicuri e gestiti tramite piattaforma certificata (es. Stripe).</p>
          
          <h2>4. Diritto di Recesso</h2>
          <p>Ai sensi dell'art. 52 del Codice del Consumo, il Cliente ha il diritto di recedere dal contratto stipulato, senza alcuna penalità e senza specificarne il motivo, entro il termine di 14 (quattordici) giorni lavorativi decorrenti dal giorno del ricevimento del prodotto. Le spese di restituzione sono a carico del cliente.</p>
          
          <h2>5. Proprietà Intellettuale</h2>
          <p>Tutte le illustrazioni, stampe, libricini fatti a mano e contenuti presenti sul sito sono proprietà intellettuale di Daiana Vaiani e non possono essere riprodotti senza esplicito consenso.</p>
          
          <h2>6. Reclami e Assistenza</h2>
          <p>Ogni eventuale reclamo dovrà essere rivolto a Daiana Vaiani tramite i canali di contatto forniti sul sito web.</p>
          
          <div className="mt-8 text-center">
            <Button variant="outline" onClick={() => navigate('/contatti')}>Contattaci per ulteriori dettagli</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Termini;
