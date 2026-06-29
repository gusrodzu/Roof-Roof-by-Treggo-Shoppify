import {Money} from '@shopify/hydrogen';

/**
 * @param {{
 *   price?: MoneyV2;
 *   compareAtPrice?: MoneyV2 | null;
 *   style?: React.CSSProperties;
 * }}
 */
export function ProductPrice({price, compareAtPrice, style}) {
  return (
    <div
      aria-label="Precio"
      role="group"
      style={{display: 'flex', alignItems: 'baseline', gap: '0.5rem', flexWrap: 'wrap'}}
    >
      {compareAtPrice ? (
        <>
          {price && (
            <Money
              data={price}
              style={{fontSize: '1rem', fontWeight: 800, color: '#2C1810', ...style}}
            />
          )}
          <Money
            data={compareAtPrice}
            style={{fontSize: '0.875rem', fontWeight: 500, color: '#b0a49c', textDecoration: 'line-through'}}
          />
          {price && compareAtPrice && parseFloat(compareAtPrice.amount) > parseFloat(price.amount) && (
            <span style={{
              fontSize: '0.6875rem',
              fontWeight: 800,
              color: '#c0392b',
              background: '#fdf0ee',
              border: '1px solid #f5c6bb',
              borderRadius: '999px',
              padding: '2px 7px',
            }}>
              {Math.round((1 - parseFloat(price.amount) / parseFloat(compareAtPrice.amount)) * 100)}% OFF
            </span>
          )}
        </>
      ) : price ? (
        <Money
          data={price}
          style={{fontSize: '1rem', fontWeight: 800, color: '#2C1810', ...style}}
        />
      ) : (
        <span>&nbsp;</span>
      )}
    </div>
  );
}

/** @typedef {import('@shopify/hydrogen/storefront-api-types').MoneyV2} MoneyV2 */
