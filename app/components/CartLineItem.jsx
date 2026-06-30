import {CartForm, Image} from '@shopify/hydrogen';
import {useVariantUrl} from '~/lib/variants';
import {Link} from 'react-router';
import {ProductPrice} from './ProductPrice';
import {useAside} from './Aside';
import {IconButton, Button} from '~/components/design-system';

export function CartLineItem({layout, line, childrenMap}) {
  const {id, merchandise} = line;
  const {product, title, image, selectedOptions} = merchandise;
  const lineItemUrl = useVariantUrl(product.handle, selectedOptions);
  const {close} = useAside();
  const lineItemChildren = childrenMap[id];
  const childrenLabelId = `cart-line-children-${id}`;

  return (
    <li style={{
      display: 'flex', flexDirection: 'column', gap: '0.5rem',
      padding: '0.875rem 0', borderBottom: '1px solid var(--border)', listStyle: 'none',
    }}>
      {/* Fila principal: imagen + info */}
      <div style={{display: 'flex', gap: '0.875rem', alignItems: 'flex-start'}}>

        {/* Imagen */}
        {image && (
          <div style={{
            width: '72px', height: '72px', flexShrink: 0,
            borderRadius: '0.5rem', overflow: 'hidden',
            background: 'var(--surface-cool)', border: '1px solid var(--border)',
          }}>
            <Image
              alt={title} aspectRatio="1/1" data={image}
              height={72} width={72} loading="lazy"
              style={{width: '100%', height: '100%', objectFit: 'contain', padding: '4px'}}
            />
          </div>
        )}

        {/* Info */}
        <div style={{flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '0.2rem'}}>

          <p style={{fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--brand-cta)', margin: 0}}>
            Roof Roof
          </p>

          <Link
            prefetch="intent"
            to={lineItemUrl}
            onClick={() => layout === 'aside' && close()}
            style={{textDecoration: 'none'}}
          >
            <p style={{
              fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ink)',
              margin: 0, lineHeight: 1.4,
              overflow: 'hidden', display: '-webkit-box',
              WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
            }}>
              {product.title}
            </p>
          </Link>

          {/* Variantes */}
          {selectedOptions?.filter((o) => o.value !== 'Default Title').length > 0 && (
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.25rem', marginTop: '0.125rem'}}>
              {selectedOptions.filter((o) => o.value !== 'Default Title').map((option) => (
                <span key={option.name} style={{
                  fontSize: '10px', color: 'var(--ink-soft)',
                  background: 'var(--surface-cool)', border: '1px solid var(--border)',
                  borderRadius: '999px', padding: '1px 8px',
                }}>
                  {option.name}: {option.value}
                </span>
              ))}
            </div>
          )}

          <div style={{marginTop: '0.25rem'}}>
            <ProductPrice
              price={line?.cost?.totalAmount}
              style={{fontSize: '0.9375rem', fontWeight: 800, color: 'var(--ink)'}}
            />
          </div>

          <CartLineQuantity line={line}/>
        </div>
      </div>

      {/* Líneas hijo */}
      {lineItemChildren && (
        <div style={{paddingLeft: '5rem'}}>
          <p id={childrenLabelId} className="sr-only">
            Artículos incluidos con {product.title}
          </p>
          <ul aria-labelledby={childrenLabelId} style={{listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
            {lineItemChildren.map((childLine) => (
              <CartLineItem childrenMap={childrenMap} key={childLine.id} line={childLine} layout={layout}/>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}

function CartLineQuantity({line}) {
  if (!line || typeof line?.quantity === 'undefined') return null;
  const {id: lineId, quantity, isOptimistic} = line;
  const prevQuantity = Number(Math.max(0, quantity - 1).toFixed(0));
  const nextQuantity = Number((quantity + 1).toFixed(0));

  return (
    <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.375rem'}}>
      {/* Selector cantidad */}
      <div style={{display: 'flex', alignItems: 'center', border: '1.5px solid var(--border)', borderRadius: '0.5rem', overflow: 'hidden'}}>
        <CartLineUpdateButton lines={[{id: lineId, quantity: prevQuantity}]}>
          <button
            aria-label="Disminuir cantidad"
            disabled={quantity <= 1 || !!isOptimistic}
            style={{
              width: '30px', height: '30px', border: 'none',
              background: 'transparent',
              color: quantity <= 1 ? 'var(--ink-disabled)' : 'var(--ink)',
              cursor: quantity <= 1 ? 'not-allowed' : 'pointer',
              fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            −
          </button>
        </CartLineUpdateButton>

        <span style={{
          minWidth: '28px', textAlign: 'center',
          fontSize: '0.8125rem', fontWeight: 700, color: 'var(--ink)',
          borderLeft: '1px solid var(--border)', borderRight: '1px solid var(--border)',
          padding: '0 0.25rem', lineHeight: '30px',
        }}>
          {quantity}
        </span>

        <CartLineUpdateButton lines={[{id: lineId, quantity: nextQuantity}]}>
          <button
            aria-label="Aumentar cantidad"
            disabled={!!isOptimistic}
            style={{
              width: '30px', height: '30px', border: 'none',
              background: 'transparent', color: 'var(--ink)',
              cursor: isOptimistic ? 'not-allowed' : 'pointer',
              fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            +
          </button>
        </CartLineUpdateButton>
      </div>

      {/* Eliminar */}
      <CartLineRemoveButton lineIds={[lineId]} disabled={!!isOptimistic}/>
    </div>
  );
}

function CartLineRemoveButton({lineIds, disabled}) {
  return (
    <CartForm
      fetcherKey={getUpdateKey(lineIds)}
      route="/cart"
      action={CartForm.ACTIONS.LinesRemove}
      inputs={{lineIds}}
    >
      <Button
        type="submit"
        variant="danger"
        size="sm"
        disabled={disabled}
        icon={
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6l-1 14H6L5 6"/>
            <path d="M10 11v6"/><path d="M14 11v6"/>
            <path d="M9 6V4h6v2"/>
          </svg>
        }
      >
        Eliminar
      </Button>
    </CartForm>
  );
}

function CartLineUpdateButton({children, lines}) {
  const lineIds = lines.map((line) => line.id);
  return (
    <CartForm
      fetcherKey={getUpdateKey(lineIds)}
      route="/cart"
      action={CartForm.ACTIONS.LinesUpdate}
      inputs={{lines}}
    >
      {children}
    </CartForm>
  );
}

function getUpdateKey(lineIds) {
  return [CartForm.ACTIONS.LinesUpdate, ...lineIds].join('-');
}

/** @typedef {OptimisticCartLine<CartApiQueryFragment>} CartLine */
/** @typedef {import('@shopify/hydrogen/storefront-api-types').CartLineUpdateInput} CartLineUpdateInput */
/** @typedef {import('~/components/CartMain').CartLayout} CartLayout */
/** @typedef {import('~/components/CartMain').LineItemChildrenMap} LineItemChildrenMap */
/** @typedef {import('@shopify/hydrogen').OptimisticCartLine} OptimisticCartLine */
/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */