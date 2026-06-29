import {useOptimisticCart} from '@shopify/hydrogen';
import {Link} from 'react-router';
import {useState} from 'react';
import {useAside} from '~/components/Aside';
import {CartLineItem} from '~/components/CartLineItem';
import {CartSummary} from './CartSummary';

function getLineItemChildrenMap(lines) {
  const children = {};
  for (const line of lines) {
    if ('parentRelationship' in line && line.parentRelationship?.parent) {
      const parentId = line.parentRelationship.parent.id;
      if (!children[parentId]) children[parentId] = [];
      children[parentId].push(line);
    }
    if ('lineComponents' in line) {
      const lineChildren = getLineItemChildrenMap(line.lineComponents);
      for (const [parentId, childIds] of Object.entries(lineChildren)) {
        if (!children[parentId]) children[parentId] = [];
        children[parentId].push(...childIds);
      }
    }
  }
  return children;
}

export function CartMain({layout, cart: originalCart, summaryOnly = false}) {
  const cart = useOptimisticCart(originalCart);

  const lines        = cart?.lines?.nodes ?? [];
  const linesCount   = Boolean(lines.length);
  const cartHasItems = cart?.totalQuantity ? cart.totalQuantity > 0 : false;
  const childrenMap  = getLineItemChildrenMap(lines);
  const isPage       = layout === 'page';

  const rootLines  = lines.filter(
    (l) => !('parentRelationship' in l && l.parentRelationship?.parent),
  );
  const totalItems    = cart?.totalQuantity ?? 0;
  const totalProducts = rootLines.length;

  // Abre por defecto si hay solo 1 producto, cerrado si hay más
  const [itemsOpen, setItemsOpen] = useState(totalProducts <= 1);

  if (summaryOnly) {
    return cartHasItems ? <CartSummary cart={cart} layout={layout}/> : null;
  }

  return (
    <section
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: isPage ? 'auto' : '100%',
        fontFamily: 'inherit',
        overflow: isPage ? 'visible' : 'hidden',
      }}
      aria-label={isPage ? 'Página del carrito' : 'Carrito lateral'}
    >
      <CartEmpty hidden={linesCount} layout={layout} />

      {cartHasItems && (
        <>
          {/* ── Header colapsable — aside y page ── */}
          <button
            type="button"
            onClick={() => setItemsOpen((v) => !v)}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              width: '100%',
              padding: isPage ? '0.875rem 1.25rem' : '0.75rem 1rem',
              background: itemsOpen ? '#f5f7fa' : '#fff',
              border: 'none',
              borderBottom: '1px solid #e8e4dc',
              cursor: 'pointer', fontFamily: 'inherit',
              transition: 'background 0.15s',
            }}
          >
            <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2C1810" strokeWidth="2" aria-hidden="true">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              <span style={{fontSize: isPage ? '0.9375rem' : '0.8125rem', fontWeight: 700, color: '#2C1810'}}>
                {totalProducts} producto{totalProducts !== 1 ? 's' : ''}
              </span>
              <span style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                minWidth: '20px', height: '20px', padding: '0 5px',
                background: '#F5A623', color: '#2C1810',
                borderRadius: '999px', fontSize: '10px', fontWeight: 900,
              }}>
                {totalItems} {totalItems === 1 ? 'unidad' : 'unidades'}
              </span>
            </div>

            <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              {!itemsOpen && (
                <div style={{display: 'flex', alignItems: 'center'}}>
                  {rootLines.slice(0, 3).map((line, i) => {
                    const src = line.merchandise?.image?.url ?? line.merchandise?.image?.src ?? null;
                    return src ? (
                      <div key={line.id} style={{width: '28px', height: '28px', borderRadius: '50%', border: '2px solid #f8b32a', overflow: 'hidden', background: '#f5f7fa', marginLeft: i > 0 ? '-8px' : '0', flexShrink: 0, zIndex: 3 - i, position: 'relative'}}>
                        <img src={src} alt="" width={28} height={28} style={{width: '100%', height: '100%', objectFit: 'contain'}}/>
                      </div>
                    ) : (
                      <div key={line.id} style={{width: '28px', height: '28px', borderRadius: '50%', border: '2px solid #f8b32a', background: '#fff8ee', marginLeft: i > 0 ? '-8px' : '0', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px'}}>🐾</div>
                    );
                  })}
                  {rootLines.length > 3 && (
                    <div style={{width: '28px', height: '28px', borderRadius: '50%', border: '2px solid #f8b32a', background: '#e8e4dc', marginLeft: '-8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: 800, color: '#7a6a62'}}>
                      +{rootLines.length - 3}
                    </div>
                  )}
                </div>
              )}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#7a6a62" strokeWidth="2.5" aria-hidden="true"
                style={{transition: 'transform 0.2s', transform: itemsOpen ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0}}>
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </div>
          </button>

          {/* ── Lista de items ── */}
          {itemsOpen && (
            <div style={{position: 'relative'}}>
              <div
                style={{
                  overflowY: 'auto',
                  padding: isPage ? '0' : '0 1rem',
                  maxHeight: isPage ? 'none' : '320px',
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#e8e4dc transparent',
                }}
              >
                <ul aria-label="Productos en el carrito" style={{listStyle: 'none', padding: 0, margin: 0}}>
                  {rootLines.map((line) => (
                    <CartLineItem key={line.id} line={line} layout={layout} childrenMap={childrenMap}/>
                  ))}
                </ul>
              </div>

              {/* Fade inferior */}
              {!isPage && rootLines.length > 2 && (
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  height: '28px',
                  background: 'linear-gradient(to bottom, transparent, #fff)',
                  pointerEvents: 'none',
                }}/>
              )}
            </div>
          )}

          {/* ── Resumen ── */}
          {!isPage && (
            <div style={{borderTop: '1px solid #e8e4dc', padding: '1rem', background: '#fff', flexShrink: 0}}>
              <CartSummary cart={cart} layout={layout} />
            </div>
          )}
        </>
      )}
    </section>
  );
}

function CartEmpty({hidden = false}) {
  const {close} = useAside();

  return (
    <div
      hidden={hidden}
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2.5rem 1.5rem',
        textAlign: 'center',
        gap: '1.25rem',
      }}
    >
      <EmptyBowlIllustration />

      <div style={{display: 'flex', flexDirection: 'column', gap: '0.375rem'}}>
        <p style={{fontSize: '1rem', fontWeight: 800, color: '#2C1810', margin: 0}}>
          ¡El plato está vacío!
        </p>
        <p style={{fontSize: '0.875rem', color: '#7a6a62', margin: 0, lineHeight: 1.55, maxWidth: '220px'}}>
          Tu mascota está esperando. Agrega productos para comenzar.
        </p>
      </div>

      <Link
        to="/collections/roof-roof"
        onClick={close}
        prefetch="viewport"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          background: '#F5A623', color: '#2C1810',
          fontWeight: 700, fontSize: '0.875rem',
          padding: '0.75rem 1.5rem', borderRadius: '999px',
          textDecoration: 'none', transition: 'background 0.15s',
          boxShadow: '0 4px 14px rgba(245,166,35,0.3)',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = '#d4891a')}
        onMouseLeave={(e) => (e.currentTarget.style.background = '#F5A623')}
      >
        Ver productos
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
        </svg>
      </Link>
    </div>
  );
}

function EmptyBowlIllustration() {
  return (
    <svg width="200" height="160" viewBox="0 0 160 130" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img">
      <ellipse cx="80" cy="118" rx="48" ry="7" fill="#e8e4dc"/>
      <path d="M28 72 Q28 108 80 108 Q132 108 132 72 Z" fill="#E8E4DC" stroke="#c8b8b0" strokeWidth="1.5"/>
      <path d="M36 72 Q36 100 80 100 Q124 100 124 72 Z" fill="#f5f7fa"/>
      <ellipse cx="80" cy="72" rx="52" ry="12" fill="#E8E4DC" stroke="#c8b8b0" strokeWidth="1.5"/>
      <ellipse cx="80" cy="72" rx="44" ry="9" fill="#edf0f5"/>
      <ellipse cx="64" cy="76" rx="10" ry="3" fill="rgba(255,255,255,0.55)" transform="rotate(-15 64 76)"/>
      <g opacity="0.18" transform="translate(70, 79)">
        <ellipse cx="10" cy="10" rx="6" ry="5" fill="#2C1810"/>
        <ellipse cx="4"  cy="4"  rx="2.5" ry="2" fill="#2C1810"/>
        <ellipse cx="10" cy="2"  rx="2.5" ry="2" fill="#2C1810"/>
        <ellipse cx="16" cy="4"  rx="2.5" ry="2" fill="#2C1810"/>
        <ellipse cx="19" cy="9"  rx="2"   ry="2" fill="#2C1810"/>
      </g>
      <rect x="58" y="108" width="44" height="10" rx="5" fill="#F5A623"/>
      <text x="80" y="117" textAnchor="middle" fontSize="6.5" fontWeight="800" fill="#2C1810" fontFamily="sans-serif">ROOF ROOF</text>
      <g fill="#F5A623" opacity="0.7">
        <polygon points="18,38 19.5,34 21,38 25,38 22,40.5 23,44.5 19.5,42 16,44.5 17,40.5 14,38" transform="scale(0.7) translate(10,10)"/>
        <polygon points="18,38 19.5,34 21,38 25,38 22,40.5 23,44.5 19.5,42 16,44.5 17,40.5 14,38" transform="scale(0.5) translate(218,4)"/>
      </g>
      <text x="136" y="58" fontSize="18" fontWeight="900" fill="#acc3fa" opacity="0.6" fontFamily="sans-serif">?</text>
      <text x="18"  y="62" fontSize="13" fontWeight="900" fill="#acc3fa" opacity="0.45" fontFamily="sans-serif">?</text>
    </svg>
  );
}

/** @typedef {'page' | 'aside'} CartLayout */
/** @typedef {{ cart: CartApiQueryFragment | null; layout: CartLayout; }} CartMainProps */
/** @typedef {{[parentId: string]: CartLine[]}} LineItemChildrenMap */
/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
/** @typedef {import('~/components/CartLineItem').CartLine} CartLine */