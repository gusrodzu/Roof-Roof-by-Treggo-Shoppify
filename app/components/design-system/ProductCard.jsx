import {Link} from 'react-router';
import {Image} from '@shopify/hydrogen';
import {useState} from 'react';
import {Badge} from './Badge';
import {Rating} from './Rating';
import {Button} from './Button';

/**
 * ProductCard — card de producto del Design System
 * Replica: badge descuento/envío, favorito, imagen, marca, título, rating, precio, botón Agregar
 *
 * Props:
 *   product — {id, handle, title, vendor, featuredImage, priceRange, compareAtPriceRange,
 *              rating, reviewCount, freeShipping: boolean, badge: {tone, label}}
 *   onAddToCart — callback al hacer click en "+ Agregar"
 *   favorited, onToggleFavorite
 */
export function ProductCard({product, onAddToCart, favorited = false, onToggleFavorite}) {
  const [hovered, setHovered] = useState(false);

  const price   = product?.priceRange?.minVariantPrice;
  const compare = product?.compareAtPriceRange?.minVariantPrice;
  const hasDiscount = compare && price && parseFloat(compare.amount) > parseFloat(price.amount);
  const discountPct = hasDiscount
    ? Math.round(((parseFloat(compare.amount) - parseFloat(price.amount)) / parseFloat(compare.amount)) * 100)
    : null;

  // Prioridad de badge: descuento > envío gratis > badge custom
  const topBadge = discountPct
    ? {tone: 'danger', label: `-${discountPct}%`}
    : product.freeShipping
    ? {tone: 'info', label: 'Envío gratis', icon: <span style={{width: '6px', height: '6px', borderRadius: '50%', background: '#1a5fa8', display: 'inline-block'}}/>}
    : product.badge ?? null;

  return (
    <div
      style={{
        background: '#fff',
        borderRadius: '1.125rem',
        overflow: 'hidden',
        border: '1.5px solid var(--border)',
        transition: 'border-color 0.2s, transform 0.2s, box-shadow 0.2s',
        borderColor: hovered ? 'var(--brand-cta)' : 'var(--border)',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hovered ? '0 8px 20px rgba(44,24,16,0.1)' : '0 1px 4px rgba(44,24,16,0.05)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Imagen */}
      <Link to={`/products/${product.handle}`} style={{display: 'block', position: 'relative', textDecoration: 'none'}}>
        <div style={{
          aspectRatio: '1', background: 'var(--surface-cream)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          {product.featuredImage ? (
            <Image
              data={product.featuredImage}
              sizes="(min-width: 45em) 20vw, 50vw"
              style={{width: '100%', height: '100%', objectFit: 'contain', padding: '0.75rem'}}
            />
          ) : (
            <PawPlaceholder />
          )}

          {/* Badge — top-left: descuento, envío gratis o custom */}
          {topBadge && (
            <span style={{position: 'absolute', top: '0.75rem', left: '0.75rem'}}>
              <Badge tone={topBadge.tone} icon={topBadge.icon}>{topBadge.label}</Badge>
            </span>
          )}
        </div>
      </Link>

      {/* Favorito — top-right, flotante sobre la imagen */}
      <button
        type="button"
        onClick={(e) => { e.preventDefault(); onToggleFavorite?.(); }}
        aria-label={favorited ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        style={{
          position: 'absolute', top: '0.625rem', right: '0.625rem',
          width: '28px', height: '28px', borderRadius: '50%',
          background: '#fff', border: '1.5px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: favorited ? 'var(--danger)' : 'var(--ink)',
          marginTop: '-100%', transform: 'translateY(calc(-100% - 0.625rem))',
        }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill={favorited ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
        </svg>
      </button>

      {/* Info */}
      <div style={{padding: '0.75rem'}}>
        {product.vendor && (
          <p style={{fontSize: '0.625rem', fontWeight: 800, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.6px', margin: '0 0 0.25rem'}}>
            {product.vendor}
          </p>
        )}

        <Link to={`/products/${product.handle}`} style={{textDecoration: 'none'}}>
          <p style={{
            fontSize: '0.8125rem', fontWeight: 700, color: 'var(--ink)',
            margin: '0 0 0.375rem', lineHeight: 1.3,
            overflow: 'hidden', display: '-webkit-box',
            WebkitLineClamp: 1, WebkitBoxOrient: 'vertical',
          }}>
            {product.title}
          </p>
        </Link>

        {product.rating != null && (
          <div style={{marginBottom: '0.375rem'}}>
            <Rating value={product.rating} count={product.reviewCount} size={11} />
          </div>
        )}

        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.4rem'}}>
          <div style={{display: 'flex', alignItems: 'baseline', gap: '0.3rem', flexWrap: 'wrap'}}>
            <span style={{fontSize: '0.9375rem', fontWeight: 800, color: hasDiscount ? 'var(--danger)' : 'var(--ink)'}}>
              ${price ? parseFloat(price.amount).toLocaleString('es-MX') : '—'}
            </span>
            {hasDiscount && (
              <span style={{fontSize: '0.6875rem', color: 'var(--ink-muted)', textDecoration: 'line-through'}}>
                ${parseFloat(compare.amount).toLocaleString('es-MX')}
              </span>
            )}
          </div>

          <Button
            size="sm"
            iconOnly
            onClick={(e) => { e.preventDefault(); onAddToCart?.(product); }}
            aria-label="Agregar al carrito"
            icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            }
          />
        </div>
      </div>
    </div>
  );
}

function PawPlaceholder() {
  return (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="var(--border)" aria-hidden="true">
      <ellipse cx="12" cy="15" rx="6" ry="5"/>
      <ellipse cx="6.5" cy="7" rx="2.2" ry="2.7"/>
      <ellipse cx="11" cy="5" rx="2.2" ry="2.7"/>
      <ellipse cx="16" cy="5.5" rx="2.2" ry="2.7"/>
      <ellipse cx="19" cy="8.5" rx="2" ry="2.5"/>
    </svg>
  );
}