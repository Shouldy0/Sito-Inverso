import { Link } from 'react-router-dom';
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

const Diario = () => {
  return (
    <div className="diario-page page-transition">
      <div className="diario-header">
        <div className="container">
          <h1 className="diario-title">Il Diario</h1>
          <p className="diario-subtitle">Appunti, retroscena e cronache dalla scrivania dell'artista.</p>
        </div>
      </div>

      <div className="container mt-5">
        <div className="blog-grid">
          {blogPosts.map(post => (
            <article key={post.id} className="blog-card">
              <div className="blog-card-meta">
                <span className="blog-category">{post.category}</span>
                <span className="blog-date">{post.date}</span>
              </div>
              <h2 className="blog-card-title">{post.title}</h2>
              <p className="blog-card-excerpt">{post.excerpt}</p>
              <Link to="#" className="blog-read-more">Leggi l'articolo</Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Diario;
