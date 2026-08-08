import { Link } from 'react-router-dom';
import useTilt3D from '../hooks/useTilt3D';
import './Diario.css';

const blogPosts = [
  {
    id: 1,
    title: "La tecnica dietro 'Cuore d'Orologio'",
    date: "12 Ottobre 2023",
    category: "Dietro le Quinte",
    excerpt: "Un'analisi dettagliata dei materiali utilizzati per l'ultima opera originale. Dalla scelta della carta cotone 600g fino all'applicazione millimetrica della foglia d'oro 24k."
  },
  {
    id: 2,
    title: "Rilegatura Artigianale: Il Codice del Crepuscolo",
    date: "28 Settembre 2023",
    category: "Editoria",
    excerpt: "Ogni edizione speciale viene cucita a mano. Scopri il processo di rilegatura e i materiali che rendono ogni tomo unico nel suo genere."
  },
  {
    id: 3,
    title: "Mostra: Frammenti dell'Abisso",
    date: "05 Settembre 2023",
    category: "Eventi",
    excerpt: "Le stampe fine-art saranno esposte per la prima volta al pubblico in una galleria dedicata all'arte fantastica e oscura."
  }
];

const BlogCard = ({ post }) => {
  const tiltRef = useTilt3D({ max: 9, scale: 1.015 });

  return (
    <div className="tilt-scene">
      <article ref={tiltRef} className="blog-card tilt-card">
        <div className="blog-card-inner">
          <div className="blog-card-meta tilt-layer" style={{ '--depth': '18px' }}>
            <span className="blog-category">{post.category}</span>
            <span className="blog-date">{post.date}</span>
          </div>
          <h2 className="blog-card-title tilt-layer" style={{ '--depth': '42px' }}>{post.title}</h2>
          <p className="blog-card-excerpt tilt-layer" style={{ '--depth': '26px' }}>{post.excerpt}</p>
          <Link to="#" className="blog-read-more tilt-layer" style={{ '--depth': '34px' }}>
            Leggi l'articolo <span className="blog-read-arrow" aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="tilt-glare" aria-hidden="true" />
      </article>
    </div>
  );
};

const Diario = () => {
  return (
    <div className="diario-page page-transition">
      <header className="diario-header">
        <div className="container diario-header-inner">
          <p className="diario-kicker depth-s" data-reveal>Appunti dalla scrivania</p>
          <h1 className="diario-title depth-m" data-reveal>Il Diario</h1>
          <p className="diario-subtitle depth-l" data-reveal>
            Retroscena, cronache e frammenti di processo — come pagine di un quaderno lasciato aperto.
          </p>
        </div>
        <div className="diario-header-fade" aria-hidden="true" />
      </header>

      <div className="container mt-5">
        <div className="blog-grid" data-reveal-group>
          {blogPosts.map(post => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Diario;
