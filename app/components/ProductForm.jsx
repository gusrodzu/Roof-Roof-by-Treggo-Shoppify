import {Link, useNavigate} from 'react-router';
import {AddToCartButton} from './AddToCartButton';
import {useAside} from './Aside';
import {useState} from 'react';

/**
 * @param {{
 *   productOptions: MappedProductOptions[];
 *   selectedVariant: ProductFragment['selectedOrFirstAvailableVariant'];
 * }}
 */
export function ProductForm({productOptions, selectedVariant}) {
  const navigate = useNavigate();
  const {open} = useAside();

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '1.25rem'}}>

      {/* Opciones de variante */}
      {productOptions.map((option) => {
        if (option.optionValues.length === 1) return null;
        return (
          <div key={option.name} style={{display: 'flex', flexDirection: 'column', gap: '0.625rem'}}>
            <span style={{
              fontSize: '0.8125rem',
              fontWeight: 700,
              color: '#2C1810',
              textTransform: 'uppercase',
              letterSpacing: '0.8px',
            }}>
              {option.name}
            </span>

            <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.5rem'}}>
              {option.optionValues.map((value) => {
                const {
                  name, handle, variantUriQuery, selected,
                  available, exists, isDifferentProduct, swatch,
                } = value;

                const hasSwatch = swatch?.image?.previewImage?.url || swatch?.color;

                const baseStyle = {
                  padding: hasSwatch ? '2px' : '0.5rem 1rem',
                  borderRadius: hasSwatch ? '50%' : '0.5rem',
                  width: hasSwatch ? '36px' : 'auto',
                  height: hasSwatch ? '36px' : 'auto',
                  border: selected
                    ? '2px solid #F5A623'
                    : '1.5px solid #e8e4dc',
                  background: selected ? '#fff8ee' : '#fff',
                  color: selected ? '#2C1810' : '#7a6a62',
                  fontWeight: selected ? 700 : 500,
                  fontSize: '0.875rem',
                  cursor: exists ? 'pointer' : 'not-allowed',
                  opacity: available ? 1 : 0.4,
                  transition: 'border-color 0.15s, background 0.15s',
                  fontFamily: 'inherit',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none',
                  boxSizing: 'border-box',
                };

                if (isDifferentProduct) {
                  return (
                    <Link
                      key={option.name + name}
                      prefetch="intent"
                      preventScrollReset
                      replace
                      to={`/products/${handle}?${variantUriQuery}`}
                      style={baseStyle}
                      onMouseEnter={(e) => { if (!selected) e.currentTarget.style.borderColor = '#acc3fa'; }}
                      onMouseLeave={(e) => { if (!selected) e.currentTarget.style.borderColor = '#e8e4dc'; }}
                    >
                      <ProductOptionSwatch swatch={swatch} name={name} />
                    </Link>
                  );
                }

                return (
                  <button
                    type="button"
                    key={option.name + name}
                    style={baseStyle}
                    disabled={!exists}
                    onClick={() => {
                      if (!selected) {
                        void navigate(`?${variantUriQuery}`, {
                          replace: true,
                          preventScrollReset: true,
                        });
                      }
                    }}
                    onMouseEnter={(e) => { if (!selected && exists) e.currentTarget.style.borderColor = '#acc3fa'; }}
                    onMouseLeave={(e) => { if (!selected) e.currentTarget.style.borderColor = '#e8e4dc'; }}
                  >
                    <ProductOptionSwatch swatch={swatch} name={name} />
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Botón agregar al carrito */}
      <AddToCartButton
        disabled={!selectedVariant || !selectedVariant.availableForSale}
        onClick={() => open('cart')}
        lines={
          selectedVariant
            ? [{merchandiseId: selectedVariant.id, quantity: 1, selectedVariant}]
            : []
        }
      >
        <span style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          width: '100%',
          padding: '1rem 1.5rem',
          borderRadius: '0.75rem',
          background: selectedVariant?.availableForSale ? '#F5A623' : '#e8e4dc',
          color: selectedVariant?.availableForSale ? '#2C1810' : '#b0a49c',
          fontWeight: 800,
          fontSize: '1rem',
          letterSpacing: '0.2px',
          cursor: selectedVariant?.availableForSale ? 'pointer' : 'not-allowed',
          transition: 'background 0.15s',
          fontFamily: 'inherit',
          border: 'none',
        }}>
          {selectedVariant?.availableForSale ? (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              Agregar al carrito
            </>
          ) : (
            'Agotado'
          )}
        </span>
      </AddToCartButton>

      {/* Buy now (optional shortcut) */}
      {selectedVariant?.availableForSale && (
        <Link
          to="/cart"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.875rem 1.5rem',
            borderRadius: '0.75rem',
            border: '1.5px solid #2C1810',
            color: '#2C1810',
            fontWeight: 700,
            fontSize: '0.9375rem',
            textDecoration: 'none',
            background: 'transparent',
            transition: 'background 0.15s, color 0.15s',
            textAlign: 'center',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#2C1810';
            e.currentTarget.style.color = '#F5A623';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#2C1810';
          }}
        >
          Comprar ahora
        </Link>
      )}
    </div>
  );
}

function ProductOptionSwatch({swatch, name}) {
  const image = swatch?.image?.previewImage?.url;
  const color = swatch?.color;

  if (!image && !color) return name;

  return (
    <div
      aria-label={name}
      style={{
        width: '28px',
        height: '28px',
        borderRadius: '50%',
        backgroundColor: color || 'transparent',
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      {!!image && (
        <img
          src={image}
          alt={name}
          style={{width: '100%', height: '100%', objectFit: 'cover'}}
        />
      )}
    </div>
  );
}

/** @typedef {import('@shopify/hydrogen').MappedProductOptions} MappedProductOptions */
/** @typedef {import('@shopify/hydrogen/storefront-api-types').Maybe} Maybe */
/** @typedef {import('@shopify/hydrogen/storefront-api-types').ProductOptionValueSwatch} ProductOptionValueSwatch */
/** @typedef {import('storefrontapi.generated').ProductFragment} ProductFragment */
