import { useParams } from 'react';
import ContactForm from '../components/UI/ContactForm';
import { Mail, MapPin, Clock, Feather } from 'lucide-react';
import './InfoPage.css';

const infoData = {
  'chi-sono': {
    title: "L'Artista — Daiana Vaiani",
    content: (
      <div className="artist-bio-wrapper">
        <div className="artist-bio-hero">
          <blockquote className="bio-manifesto-quote">
            "L'inchiostro è la mia voce quando il silenzio si fa troppo grande."
          </blockquote>
        </div>

        <div className="bio-sections">
          <div className="bio-paragraph">
            <h3>Chi Sono</h3>
            <p>
              Mi chiamo Daiana Vaiani. Sono un'illustratrice e autrice che lavora tra l'Italia e la narrazione visiva. Nata in Colombia e cresciuta in Italia, ho imparato presto a osservare i mondi intermedi — lo spazio sottile dove la parola incontra la linea d'inchiostro.
            </p>
          </div>

          <div className="bio-paragraph">
            <h3>Il Manifesto Visivo & Narrativo</h3>
            <p>
              INverso non nasce come un semplice catalogo di disegni, ma come la mappa d'archivio del mio inconscio. L'intera mia produzione è sorretta da un unico filo conduttore: <strong>l'identità, la dualità e la soglia tra ciò che si mostra al mondo e ciò che si custodisce nel profondo</strong>.
            </p>
            <p>
              Questa ricerca si divide naturalmente in due anime:
            </p>
            <ul>
              <li><strong>Originali</strong>: opere in china pura, matita e carboncino dove il bianco e nero scava nei paesaggi interiori, nella solitudine e nella psicologia delle maschere.</li>
              <li><strong>Universo</strong>: stampe d'arte a colori, pastelli e fan art (dedicate alle opere che hanno nutrito la mia immaginazione, come Naruto, Dragon Ball e la cultura manga) dove la luce si fa pop e accessibile.</li>
            </ul>
          </div>

          <div className="bio-paragraph">
            <h3>Certificato di Unicità</h3>
            <p>
              Ogni opera catalogata come <em>Pezzo Unico</em> è un reperto originale irripetibile. Viene consegnata accompagnata da un Certificato di Autenticità sigillato in ceralacca con la mia firma autografa.
            </p>
          </div>
        </div>
      </div>
    )
  },
  spedizioni: {
    title: "Spedizioni e Certificati",
    content: (
      <>
        <h3>Tempistiche di Lavorazione & Spedizione</h3>
        <p>Tutti gli albi della Biblioteca e le stampe dell'Universo vengono confezionati con cura in imballi rigidi antieghe. La lavorazione richiede 2-4 giorni lavorativi, seguita da spedizione tracciata con corriere espresso (2-3 giorni per l'Italia).</p>

        <h3>Opere Originali & Pezzi Unici</h3>
        <p>I Pezzi Unici richiedono un imballaggio d'archivio speciale con custodia protettiva e vengono spediti con corriere assicurato speciale per opere d'arte. Ogni confezione include il Certificato di Autenticità firmato a mano e sigillato in ceralacca.</p>

        <h3>Resi e Garanzia</h3>
        <p>Accettiamo resi per gli articoli stampati entro 14 giorni dalla consegna. I Pezzi Unici originali non sono soggetti a reso, salvo eventuali danni dovuti al trasporto documentati alla consegna.</p>
      </>
    )
  },
  termini: {
    title: "Termini e Policy",
    content: (
      <>
        <h3>Condizioni di Vendita</h3>
        <p>I prezzi di ciascuna opera sono espressi in Euro (€) e comprensivi di imposte. INverso garantisce l'autenticità di tutte le opere pubblicate e firmate da Daiana Vaiani.</p>

        <h3>Proprietà Intellettuale & Diritti d'Autore</h3>
        <p>Tutte le immagini, le illustrazioni, i testi e i concetti narrativi presenti su questo sito sono di proprietà esclusiva di Daiana Vaiani. La riproduzione non autorizzata per scopi commerciali è vietata a norma di legge.</p>
      </>
    )
  },
  contatti: {
    title: "Contattaci",
    content: null
  }
};

const InfoPage = ({ pageId: propPageId }) => {
  const { pageId: paramPageId } = useParams();
  const pageId = propPageId || paramPageId || 'chi-sono';
  const page = infoData[pageId] || infoData['chi-sono'];

  const isContact = pageId === 'contatti';

  return (
    <div className="info-page page-transition">
      <div className="container">
        <div className={isContact ? "contact-page-container animate-fade-in" : "info-content-wrapper"}>
          <h1 className="info-title" data-reveal>{page.title}</h1>

          {isContact ? (
            <div className="contact-grid">
              <div className="contact-details-col">
                <p className="contact-intro-text" data-reveal>
                  Per commissioni private, informazioni sulle opere o collaborazioni editoriali, 
                  compila il modulo a fianco o scrivi direttamente allo studio.
                </p>

                <div className="contact-cards-list" data-reveal-group>
                  <div className="contact-detail-card" data-reveal>
                    <div className="detail-icon">
                      <Mail size={20} />
                    </div>
                    <div className="detail-text">
                      <h4>Email Studio</h4>
                      <a href="mailto:info@daianavaiani.it" className="detail-link">info@daianavaiani.it</a>
                    </div>
                  </div>

                  <div className="contact-detail-card">
                    <div className="detail-icon">
                      <MapPin size={20} />
                    </div>
                    <div className="detail-text">
                      <h4>Studio Artistico</h4>
                      <p>Italia (Ricevimento su appuntamento)</p>
                    </div>
                  </div>

                  <div className="contact-detail-card">
                    <div className="detail-icon">
                      <Clock size={20} />
                    </div>
                    <div className="detail-text">
                      <h4>Risposta</h4>
                      <p>Entro 48 ore nei giorni lavorativi.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="contact-form-col" data-reveal>
                <ContactForm />
              </div>
            </div>
          ) : (
            <div className="info-body" data-reveal>
              {page.content}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoPage;
