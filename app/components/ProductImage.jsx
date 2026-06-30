import {Image} from '@shopify/hydrogen';

/**
 * @param {{
 *   image: ProductVariantFragment['image'];
 * }}
 */
export function ProductImage({image}) {
  if (!image) {
    return (
      <div style={{
        aspectRatio: '1 / 1',
        background: 'var(--surface-cool)',
        borderRadius: '0.875rem',
        border: '1.5px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '3rem',
        color: 'var(--ink-disabled)',
      }}>
        🐾
      </div>
    );
  }

  return (
    <div style={{
      aspectRatio: '1 / 1',
      background: 'var(--surface-warm)',
      borderRadius: '0.875rem',
      border: '1.5px solid var(--border)',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Image
        alt={image.altText || 'Imagen del producto'}
        aspectRatio="1/1"
        data={image}
        key={image.id}
        sizes="(min-width: 45em) 50vw, 100vw"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          padding: '12px',
        }}
      />
    </div>
  );
}

/** @typedef {import('storefrontapi.generated').ProductVariantFragment} ProductVariantFragment */
