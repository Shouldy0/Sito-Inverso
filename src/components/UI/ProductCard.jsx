import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import Button from './Button';
import './ProductCard.css';

const ProductCard = ({
  id,
  title,
  type,
  price,
  imageUrl,
  category,
  tier,
  fandom,
  isUnique = false,
  isPreorder = false,
  microStory,
  onAddToCart
}) => {
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;

      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        transformPerspective: 800,
        duration: 0.4,
        ease: "power2.out",
      });

      if (glowRef.current) {
        gsap.to(glowRef.current, {
          x: x - rect.width / 2,
          y: y - rect.height / 2,
          opacity: 0.15,
          duration: 0.4,
          ease: "power2.out",
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.6)",
      });

      if (glowRef.current) {
        gsap.to(glowRef.current, { opacity: 0, duration: 0.4 });
      }
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const renderBadge = () => {
    if (isUnique) return <span className="badge badge-unique">Pezzo Unico</span>;
    if (tier === 'studio_works') return <span className="badge badge-studio">Studio Work</span>;
    if (tier === 'opere_originali') return <span className="badge badge-original">Opera Originale</span>;
    if (category === 'universo' && fandom && fandom !== 'original_art') {
      return <span className="badge badge-fandom">{fandom.replace('_', ' ').toUpperCase()}</span>;
    }
    if (category === 'universo') return <span className="badge badge-universo">Stampa Fine Art</span>;
    if (isPreorder) return <span className="badge badge-preorder">Pre-ordine</span>;
    return null;
  };

  return (
    <div className={`product-card reveal-3d stagger-child ${category ? `card-${category}` : ''}`} ref={cardRef}>
      <Link to={`/product/${id}`} className="product-image-wrapper">
        <img
          ref={imageRef}
          src={imageUrl}
          alt={title}
          className="product-image"
          loading="lazy"
          decoding="async"
        />
        <div className="product-card-glow" ref={glowRef} />
        {renderBadge()}
      </Link>

      <div className="product-info">
        <div className="product-header-row">
          <span className="product-type">{type}</span>
        </div>
        <Link to={`/product/${id}`} style={{ textDecoration: 'none' }}>
          <h3 className="product-title">{title}</h3>
        </Link>

        {microStory && (
          <p className="product-micro-story">
            {microStory.length > 85 ? `${microStory.substring(0, 85)}...` : microStory}
          </p>
        )}

        <div className="product-footer">
          <span className="product-price">€{price.toFixed(2)}</span>
          <Button variant="outline" onClick={() => onAddToCart(id)}>
            {isPreorder ? 'Pre-ordina' : 'Dettagli & Acquista'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
