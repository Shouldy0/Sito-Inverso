import './Universo.css';

const Universo = () => {
  return (
    <div className="universo-page page-transition">
      <div className="universo-hero">
        <div className="container">
          <h1 className="universo-title">L'Universo DAIANA</h1>
          <p className="universo-subtitle">Non è solo arte, è un portale verso un mondo sommerso.</p>
        </div>
      </div>

      <div className="container mt-5">
        <div className="universo-content">
          <div className="universo-text-block reveal-3d">
            <h2>Il Manifesto</h2>
            <p>
              DAIANA nasce come esplorazione dei confini tra la parola scritta e l'immagine. 
              Ogni opera d'arte, ogni stampa e ogni libro che esce da questo studio è un frammento 
              di una narrazione molto più grande. Un mondo sommerso fatto di ombre, riflessi e rovine antiche.
            </p>
            <p>
              La nostra missione è creare <strong>artefatti fisici</strong> in un'era digitale. 
              Libri da sfogliare, carte pesanti da toccare, inchiostri che riflettono la luce. 
              Crediamo nel valore dell'oggetto libro e dell'opera d'arte tangibile.
            </p>
          </div>



          <div className="universo-text-block mt-4 reveal-3d">
            <h2>L'Artista</h2>
            <p>
              Dietro l'universo di DAIANA c'è la mano e la mente di <strong>Daiana Vaiani</strong>.
              Nata in Colombia nel 2000 e adottata in Italia all'età di nove anni, Daiana esprime la sua complessa sensibilità 
              attraverso diverse forme d'arte: dal disegno a china alla scrittura di racconti e poesie, passando per la fotografia e il pianoforte.
            </p>
            <p>
              Con un percorso di studi che unisce il diploma al Liceo Artistico alla passione per la Psicologia, Daiana riversa 
              nelle sue opere un profondo bisogno di "tirar fuori" e dare forma a pensieri ed emozioni intime. 
              La sua scrittura poetica, già presente in diverse pubblicazioni collettive e raccolte personali (come la sua opera <em>Pensieri dispersi</em>), 
              si fonde con le sue illustrazioni in bianco e nero in un legame indissolubile, creando opere sospese tra l'ombra, il sogno e l'inconscio.
            </p>
          </div>
        </div>
      </div>

      {/* Narrative Fragments Section */}
      <div className="container mt-12 mb-16">
        <div className="universo-narrative-header reveal-3d text-center">
          <h2>Frammenti dell'Abisso</h2>
          <p>
            Frammenti poetici, personaggi e archivi che emergono dall'inchiostro dell'universo DAIANA.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-12">
          <div className="narrative-card reveal-3d">
            <span className="narrative-tag">Frammento 01</span>
            <h3 className="narrative-title">L'Ombra del Tempo</h3>
            <p className="narrative-text">
              Ci sono ore in cui l'inchiostro si fa pesante, e le pagine sembrano respirare il buio dello studio. La penna scivola dove i ricordi si fanno rovine.
            </p>
          </div>

          <div className="narrative-card reveal-3d" data-reveal-delay="0.15">
            <span className="narrative-tag">Personaggio</span>
            <h3 className="narrative-title">Il Custode</h3>
            <p className="narrative-text">
              Colui che abita tra i risvolti delle pagine. Non parla se non attraverso il fruscio della carta cotone, indicando strade incise nella china.
            </p>
          </div>

          <div className="narrative-card reveal-3d">
            <span className="narrative-tag">Archivi</span>
            <h3 className="narrative-title">La Stanza Vetrificata</h3>
            <p className="narrative-text">
              Un luogo sospeso dove la musica del pianoforte si solidifica in riflessi dorati. Chi vi entra, dimentica il proprio nome ma ritrova la propria ombra.
            </p>
          </div>

          <div className="narrative-card reveal-3d" data-reveal-delay="0.15">
            <span className="narrative-tag">Poesia</span>
            <h3 className="narrative-title">Pensieri Dispersi</h3>
            <p className="narrative-text">
              Oltre la nebbia del giorno, dove la coscienza si incrina e lascia filtrare una luce silenziosa. Scrivere è raccogliere i cocci del mattino.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Universo;
