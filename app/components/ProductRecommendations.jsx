import {useRef} from 'react';
import {Link} from 'react-router';

/**
 * Carrusel de productos recomendados.
 * Usa la paleta de marca:
 *  - Brown Oscuro (#2C1810) -> textos primarios / precio
 *  - Canary Yellow (#F5A623) -> CTA / rating (patitas)
 *  - Ivory (#E8E4DC) -> fondos claros / bordes
 *
 * @param {{
 *   title?: string,
 *   products: Array<{
 *     id: string,
 *     brand: string,
 *     title: string,
 *     image: string,
 *     price: number,
 *     compareAtPrice?: number,
 *     rating?: number, // 0 a 5
 *     url: string,
 *     discountPercent?: number,
 *   }>
 * }} props
 */
export function ProductRecommendations({
  title = 'Recomendados especialmente para ti',
  products = [],
}) {
  const scrollerRef = useRef(null);

  const scrollByAmount = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    const cardWidth = el.querySelector('[data-card]')?.offsetWidth || 260;
    el.scrollBy({left: dir * (cardWidth + 24), behavior: 'smooth'});
  };

  if (!products.length) return null;

  return (
    <section
      style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '2.5rem 1.5rem',
        position: 'relative',
      }}
    >
      <h2
        style={{
          fontSize: '1.375rem',
          fontWeight: 800,
          color: 'var(--ink, #2C1810)',
          margin: '0 0 1.5rem',
        }}
      >
        {title}
      </h2>

      <div style={{position: 'relative'}}>
        {/* Flecha izquierda */}
        <button
          type="button"
          aria-label="Anterior"
          onClick={() => scrollByAmount(-1)}
          style={{
            position: 'absolute',
            left: '-18px',
            top: '35%',
            transform: 'translateY(-50%)',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            border: '1px solid #E8E4DC',
            background: '#ffffff',
            color: 'var(--ink, #2C1810)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 2,
            boxShadow: '0 2px 8px rgba(44,24,16,0.12)',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* Track scrollable */}
        <div
          ref={scrollerRef}
          style={{
            display: 'flex',
            gap: '1.5rem',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            paddingBottom: '0.5rem',
            scrollbarWidth: 'none',
          }}
          className="rr-recs-scroller"
        >
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {/* Flecha derecha */}
        <button
          type="button"
          aria-label="Siguiente"
          onClick={() => scrollByAmount(1)}
          style={{
            position: 'absolute',
            right: '-18px',
            top: '35%',
            transform: 'translateY(-50%)',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            border: '1px solid #E8E4DC',
            background: '#ffffff',
            color: 'var(--ink, #2C1810)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 2,
            boxShadow: '0 2px 8px rgba(44,24,16,0.12)',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Oculta scrollbar en navegadores webkit */}
      <style>{`
        .rr-recs-scroller::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}

function ProductCard({product}) {
  const {
    brand,
    title,
    image,
    price,
    compareAtPrice,
    rating = 0,
    url,
    discountPercent,
  } = product;

  return (
    <div
      data-card
      style={{
        flex: '0 0 auto',
        width: '220px',
        scrollSnapAlign: 'start',
        border: '1px solid #E8E4DC',
        borderRadius: '14px',
        background: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Imagen */}
      <div style={{position: 'relative', padding: '1rem 1rem 0'}}>
        {discountPercent ? (
          <span
            style={{
              position: 'absolute',
              top: '0.75rem',
              right: '0.75rem',
              background: '#ef4444',
              color: '#ffffff',
              fontSize: '0.6875rem',
              fontWeight: 700,
              borderRadius: '999px',
              padding: '3px 9px',
            }}
          >
            {discountPercent}% OFF
          </span>
        ) : null}
        <Link to={url} style={{display: 'block'}}>
          <img
            src={image}
            alt={title}
            style={{
              width: '100%',
              height: '140px',
              objectFit: 'contain',
            }}
          />
        </Link>
      </div>

      {/* Info */}
      <div
        style={{
          padding: '0.875rem 1rem 1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.375rem',
          flex: 1,
        }}
      >
        <p
          style={{
            fontSize: '0.75rem',
            fontWeight: 800,
            color: 'var(--ink, #2C1810)',
            margin: 0,
          }}
        >
          {brand}
        </p>

        <Link
          to={url}
          style={{
            fontSize: '0.8125rem',
            color: '#3b4a63',
            textDecoration: 'none',
            lineHeight: 1.4,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: '2.3em',
          }}
        >
          {title}
        </Link>

        {/* Rating (patitas) */}
        <div style={{display: 'flex', gap: '2px', margin: '0.125rem 0'}}>
          {Array.from({length: 5}).map((_, i) => (
            <PawIcon key={i} filled={i < Math.round(rating)} />
          ))}
        </div>

        {/* Precio */}
        <div style={{display: 'flex', alignItems: 'baseline', gap: '0.5rem'}}>
          <span
            style={{
              fontSize: '1.0625rem',
              fontWeight: 800,
              color: 'var(--ink, #2C1810)',
            }}
          >
            ${price.toLocaleString('es-MX')}
          </span>
          {compareAtPrice ? (
            <span
              style={{
                fontSize: '0.8125rem',
                color: '#9aa5b8',
                textDecoration: 'line-through',
              }}
            >
              ${compareAtPrice.toLocaleString('es-MX')}
            </span>
          ) : null}
        </div>

        {/* CTA */}
        <Link
          to={url}
          style={{
            marginTop: '0.5rem',
            textAlign: 'center',
            fontSize: '0.8125rem',
            fontWeight: 700,
            color: 'var(--ink, #2C1810)',
            background: 'var(--brand-cta, #F5A623)',
            borderRadius: '999px',
            padding: '0.625rem 1rem',
            textDecoration: 'none',
            transition: 'filter 0.15s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.filter = 'brightness(0.95)')}
          onMouseLeave={(e) => (e.currentTarget.style.filter = 'brightness(1)')}
        >
          Ver producto
        </Link>
      </div>
    </div>
  );
}

function PawIcon({filled}) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill={filled ? 'var(--brand-cta, #F5A623)' : '#E5E9F0'}
      aria-hidden="true"
    >
      <circle cx="6" cy="9" r="2.3" />
      <circle cx="12" cy="6" r="2.3" />
      <circle cx="18" cy="9" r="2.3" />
      <path d="M12 12c-3.5 0-6.5 2.4-6.5 5.4 0 1.7 1.4 2.9 3.1 2.4.9-.3 1.7-.4 3.4-.4s2.5.1 3.4.4c1.7.5 3.1-.7 3.1-2.4C18.5 14.4 15.5 12 12 12z" />
    </svg>
  );
}
