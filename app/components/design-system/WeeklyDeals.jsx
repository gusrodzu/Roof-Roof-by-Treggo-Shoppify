import {Link} from 'react-router';
import {ProductCard} from '~/components/design-system';

/**
 * WeeklyDeals — "Ofertas de la semana"
 * Carrusel/grid de ProductCards con scroll horizontal en mobile
 *
 * Props:
 *   products — array de productos (mismo shape que ProductCard espera)
 *   onAddToCart, favorites (Set de ids), onToggleFavorite
 */
export function WeeklyDeals({
  products = [],
  onAddToCart,
  favorites = new Set(),
  onToggleFavorite,
}) {
  if (!products.length) return null;

  return (
    <section className="rr-weekly-deals" style={{padding: '2.5rem 1.5rem'}}>
      <div
        className="rr-weekly-deals__inner"
        style={{maxWidth: '1280px', margin: '0 auto'}}
      >
        {/* Header */}
        <div
          className="rr-weekly-deals__header"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.25rem',
            padding: 0,
          }}
        >
          <h2
            className="rr-weekly-deals__title"
            style={{
              fontSize: '1.375rem',
              fontWeight: 700,
              color: 'var(--ink)',
              margin: 0,
            }}
          >
            Ofertas de la semana
          </h2>
          <Link
            to="/collections/roof-roof"
            style={{
              fontSize: '0.875rem',
              fontWeight: 700,
              color: 'var(--brand-cta-hover)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              whiteSpace: 'nowrap',
            }}
          >
            Ver todo
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Grid / scroll horizontal */}
        <div
          className="rr-weekly-deals__grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '1rem',
            overflowX: 'visible',
            padding: 0,
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
          }}
        >
          {products.map((product) => (
            <div className="rr-weekly-deals__item" key={product.id}>
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
