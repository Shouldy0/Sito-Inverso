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
  isUnique = false,
  isPreorder = false,
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

  return (
    <div className="product-card reveal-3d stagger-child" ref={cardRef}>
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
        {isUnique && <span className="badge badge-unique">Pezzo Unico</span>}
        {isPreorder && <span className="badge badge-preorder">Pre-ordine</span>}
      </Link>

      <div className="product-info">
        <Link to={`/product/${id}`} style={{ textDecoration: 'none' }}>
          <h3 className="product-title">{title}</h3>
        </Link>
        <span className="product-type">{type}</span>

        <div className="product-footer">
          <span className="product-price">€{price.toFixed(2)}</span>
          <Button variant="outline" onClick={() => onAddToCart(id)}>
            {isPreorder ? 'Pre-ordina' : 'Acquista'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
