import './Universo.css';

const Universo = () => {
  return (
    <div className="universo-page page-transition">
      <div className="universo-hero">
        <div className="container">
          <h1 className="universo-title">L'Universo INverso</h1>
          <p className="universo-subtitle">Non è solo arte, è un portale verso un mondo sommerso.</p>
        </div>
      </div>

      <div className="container mt-5">
        <div className="universo-content">
          <div className="universo-text-block">
            <h2>Il Manifesto</h2>
            <p>
              INverso nasce come esplorazione dei confini tra la parola scritta e l'immagine. 
              Ogni opera d'arte, ogni stampa e ogni libro che esce da questo studio è un frammento 
              di una narrazione molto più grande. Un mondo sommerso fatto di ombre, riflessi e rovine antiche.
            </p>
            <p>
              La nostra missione è creare <strong>artefatti fisici</strong> in un'era digitale. 
              Libri da sfogliare, carte pesanti da toccare, inchiostri che riflettono la luce. 
              Crediamo nel valore dell'oggetto libro e dell'opera d'arte tangibile.
            </p>
          </div>

          <div className="universo-image-block">
            <img src="/assets/shop_original.png" alt="L'artista al lavoro" className="universo-img" />
            <span className="image-caption">L'inchiostro e l'oro sono i nostri strumenti principali.</span>
          </div>

          <div className="universo-text-block mt-4">
            <h2>L'Artista</h2>
            <p>
              Tutte le opere visive e i testi sono realizzati da un'unica mano. 
              Il processo creativo mescola tecniche tradizionali come l'inchiostro di china e l'applicazione 
              manuale della foglia d'oro, con un'impaginazione editoriale rigorosa e moderna.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Universo;
