import {Link} from 'react-router';
import {Image, Money} from '@shopify/hydrogen';
import {useVariantUrl} from '~/lib/variants';
import {useState} from 'react';

/**
 * @param {{
 *   product: CollectionItemFragment | ProductItemFragment | RecommendedProductFragment;
 *   loading?: 'eager' | 'lazy';
 * }}
 */
export function ProductItem({product, loading}) {
  const variantUrl = useVariantUrl(product.handle);
  const image = product.featuredImage;
  const [hovered, setHovered] = useState(false);

  const compareAt = product.priceRange?.maxVariantPrice ?? null;
  const minPrice   = product.priceRange?.minVariantPrice ?? null;
  const hasDiscount =
    compareAt && minPrice && parseFloat(compareAt.amount) > parseFloat(minPrice.amount);

  return (
    <Link
      key={product.id}
      prefetch="intent"
      to={variantUrl}
      style={{textDecoration: 'none', display: 'block'}}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <article
        style={{
          background: '#fff',
          borderRadius: '0.875rem',
          border: `1.5px solid ${hovered ? '#F5A623' : '#e8e4dc'}`,
          overflow: 'hidden',
          transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.2s',
          boxShadow: hovered
            ? '0 8px 24px rgba(44,24,16,0.10)'
            : '0 2px 6px rgba(44,24,16,0.04)',
          transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        }}
      >
        {/* Imagen */}
        <div style={{
          position: 'relative',
          background: '#ffffff',
          aspectRatio: '1 / 1',
          overflow: 'hidden',
        }}>
          {image ? (
            <Image
              alt={image.altText || product.title}
              aspectRatio="1/1"
              data={image}
              loading={loading}
              sizes="(min-width: 45em) 400px, 100vw"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                padding: '8px',
                transition: 'transform 0.3s',
                transform: hovered ? 'scale(1.04)' : 'scale(1)',
              }}
            />
          ) : (
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '3rem',
              background: '#ffffff',
            }}>
              🐾
            </div>
          )}

          {/* Descuento badge */}
          {hasDiscount && (
            <span style={{
              position: 'absolute',
              top: '0.625rem',
              left: '0.625rem',
              background: '#c0392b',
              color: '#fff',
              fontSize: '0.6875rem',
              fontWeight: 800,
              padding: '3px 8px',
              borderRadius: '999px',
              letterSpacing: '0.3px',
            }}>
              OFERTA
            </span>
          )}
        </div>

        {/* Info */}
        <div style={{padding: '0.875rem'}}>
          {/* Brand */}
          <p style={{
            fontSize: '10px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            color: '#F5A623',
            margin: '0 0 0.25rem',
          }}>
            Roof Roof
          </p>

          {/* Title */}
          <h4 style={{
            fontSize: '0.875rem',
            fontWeight: 600,
            color: '#2C1810',
            margin: '0 0 0.625rem',
            lineHeight: 1.4,
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}>
            {product.title}
          </h4>

          {/* Price */}
          <div style={{display: 'flex', alignItems: 'baseline', gap: '0.5rem', flexWrap: 'wrap'}}>
            {minPrice && (
              <Money
                data={minPrice}
                style={{fontSize: '1rem', fontWeight: 800, color: '#2C1810'}}
              />
            )}
            {hasDiscount && (
              <Money
                data={compareAt}
                style={{fontSize: '0.8125rem', fontWeight: 500, color: '#b0a49c', textDecoration: 'line-through'}}
              />
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}

/** @typedef {import('storefrontapi.generated').ProductItemFragment} ProductItemFragment */
/** @typedef {import('storefrontapi.generated').CollectionItemFragment} CollectionItemFragment */
/** @typedef {import('storefrontapi.generated').RecommendedProductFragment} RecommendedProductFragment */
