import {Link} from 'react-router';
import {useState, useEffect} from 'react';
import {ProductCard} from '~/components/design-system';

/**
 * WeeklyDeals — "Ofertas de la semana"
 * Carrusel/grid de ProductCards con scroll horizontal en mobile
 *
 * Props:
 *   products — array de productos (mismo shape que ProductCard espera)
 *   onAddToCart, favorites (Set de ids), onToggleFavorite
 */
export function WeeklyDeals({products = [], onAddToCart, favorites = new Set(), onToggleFavorite}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);
    const h = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', h);
    return () => mq.removeEventListener('change', h);
  }, []);

  if (!products.length) return null;

  return (
    <section style={{padding: isMobile ? '2rem 0' : '2.5rem 1.5rem'}}>
      <div style={{maxWidth: '1280px', margin: '0 auto'}}>

        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: '1.25rem', padding: isMobile ? '0 1rem' : '0',
        }}>
          <h2 style={{fontSize: isMobile ? '1.125rem' : '1.375rem', fontWeight: 700, color: 'var(--ink)', margin: 0}}>
            Ofertas de la semana
          </h2>
          <Link
            to="/collections/roof-roof"
            style={{fontSize: '0.875rem', fontWeight: 700, color: 'var(--brand-cta-hover)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem', whiteSpace: 'nowrap'}}
          >
            Ver todo
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>

        {/* Grid / scroll horizontal */}
        <div
          style={{
            display: isMobile ? 'flex' : 'grid',
            gridTemplateColumns: isMobile ? undefined : 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '1rem',
            overflowX: isMobile ? 'auto' : 'visible',
            padding: isMobile ? '0 1rem' : '0',
            scrollSnapType: isMobile ? 'x mandatory' : 'none',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              style={{
                flexShrink: 0,
                width: isMobile ? '220px' : 'auto',
                scrollSnapAlign: isMobile ? 'start' : 'none',
              }}
            >
              <ProductCard
                product={product}
                favorited={favorites.has(product.id)}
                onAddToCart={onAddToCart}
                onToggleFavorite={() => onToggleFavorite?.(product.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
