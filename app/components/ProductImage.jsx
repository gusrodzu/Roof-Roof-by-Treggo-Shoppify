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
        background: '#f5f7fa',
        borderRadius: '0.875rem',
        border: '1.5px solid #e8e4dc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '3rem',
        color: '#c8b8b0',
      }}>
        🐾
      </div>
    );
  }

  return (
    <div style={{
      aspectRatio: '1 / 1',
      background: '#faf9f7',
      borderRadius: '0.875rem',
      border: '1.5px solid #e8e4dc',
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
