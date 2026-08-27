import {Link} from 'react-router';
import {Image, Money} from '@shopify/hydrogen';
import {useVariantUrl} from '~/lib/variants';

/**
 * Tarjeta de producto reutilizable para colecciones, búsqueda y recomendaciones.
 */
export function ProductItem({product, loading}) {
  const variantUrl = useVariantUrl(product.handle);
  const image = product.featuredImage;
  const minPrice = product.priceRange?.minVariantPrice ?? null;
  const maxPrice = product.priceRange?.maxVariantPrice ?? null;
  const hasPriceRange =
    minPrice && maxPrice && Number(maxPrice.amount) > Number(minPrice.amount);

  return (
    <Link
      className="rr-product-card-link"
      prefetch="intent"
      to={variantUrl}
      aria-label={`Ver ${product.title}`}
    >
      <article className="rr-product-card">
        <div className="rr-product-card__media">
          {image ? (
            <Image
              alt={image.altText || product.title}
              aspectRatio="1/1"
              data={image}
              loading={loading}
              sizes="(min-width: 75em) 300px, (min-width: 45em) 33vw, 50vw"
            />
          ) : (
            <div className="rr-product-card__placeholder" aria-hidden="true">
              🐾
            </div>
          )}
          <span className="rr-product-card__badge">Compra protegida</span>
        </div>

        <div className="rr-product-card__body">
          <p className="rr-product-card__eyebrow">Roof Roof</p>
          <h3 className="rr-product-card__title">{product.title}</h3>
          <div className="rr-product-card__footer">
            <div>
              {hasPriceRange && (
                <span className="rr-product-card__price-label">Desde </span>
              )}
              {minPrice && <Money data={minPrice} />}
            </div>
            <span className="rr-product-card__cta">
              <span className="sr-only">Ver producto</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
              >
                <path d="M5 12h14" />
                <path d="m13 6 6 6-6 6" />
              </svg>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

/** @typedef {import('storefrontapi.generated').ProductItemFragment} ProductItemFragment */
/** @typedef {import('storefrontapi.generated').CollectionItemFragment} CollectionItemFragment */
/** @typedef {import('storefrontapi.generated').RecommendedProductFragment} RecommendedProductFragment */
