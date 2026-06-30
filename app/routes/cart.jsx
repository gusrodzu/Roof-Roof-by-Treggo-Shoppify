import {useLoaderData, data, Link} from 'react-router';
import {CartForm} from '@shopify/hydrogen';
import {CartMain} from '~/components/CartMain';
import {useState, useEffect} from 'react';
import {Button, Badge, Breadcrumb} from '~/components/design-system';

export const meta = () => [{title: 'Carrito — Roof Roof'}];
export const headers = ({actionHeaders}) => actionHeaders;

export async function action({request, context}) {
  const {cart} = context;
  const formData = await request.formData();
  const {action, inputs} = CartForm.getFormInput(formData);
  if (!action) throw new Error('No action provided');

  let status = 200;
  let result;

  switch (action) {
    case CartForm.ACTIONS.LinesAdd:
      result = await cart.addLines(inputs.lines); break;
    case CartForm.ACTIONS.LinesUpdate:
      result = await cart.updateLines(inputs.lines); break;
    case CartForm.ACTIONS.LinesRemove:
      result = await cart.removeLines(inputs.lineIds); break;
    case CartForm.ACTIONS.DiscountCodesUpdate: {
      const formDiscountCode = inputs.discountCode;
      const discountCodes = formDiscountCode ? [formDiscountCode] : [];
      discountCodes.push(...inputs.discountCodes);
      result = await cart.updateDiscountCodes(discountCodes); break;
    }
    case CartForm.ACTIONS.GiftCardCodesAdd: {
      const formGiftCardCode = inputs.giftCardCode;
      const giftCardCodes = formGiftCardCode ? [formGiftCardCode] : [];
      result = await cart.addGiftCardCodes(giftCardCodes); break;
    }
    case CartForm.ACTIONS.GiftCardCodesRemove:
      result = await cart.removeGiftCardCodes(inputs.giftCardCodes); break;
    case CartForm.ACTIONS.BuyerIdentityUpdate:
      result = await cart.updateBuyerIdentity({...inputs.buyerIdentity}); break;
    default:
      throw new Error(`${action} cart action is not defined`);
  }

  const cartId = result?.cart?.id;
  const headers = cartId ? cart.setCartId(result.cart.id) : new Headers();
  const {cart: cartResult, errors, warnings} = result;

  const redirectTo = formData.get('redirectTo') ?? null;
  if (typeof redirectTo === 'string') {
    status = 303;
    headers.set('Location', redirectTo);
  }

  return data(
    {cart: cartResult, errors, warnings, analytics: {cartId}},
    {status, headers},
  );
}

export async function loader({context}) {
  const {cart} = context;
  return await cart.get();
}

export default function Cart() {
  const cart = useLoaderData();
  const isEmpty = !cart?.totalQuantity || cart.totalQuantity === 0;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <div style={{background: '#f5f7fa', minHeight: '100vh', fontFamily: 'inherit'}}>

      {/* Breadcrumb */}
      <div style={{background: '#fff', borderBottom: '1px solid var(--border)', padding: '0.625rem 1.5rem'}}>
        <div style={{maxWidth: '1100px', margin: '0 auto'}}>
          <Breadcrumb items={[{label: 'Inicio', to: '/'}, {label: 'CARRITO'}]} />
        </div>
      </div>

      <div style={{maxWidth: '1100px', margin: '0 auto', padding: isMobile ? '1.25rem 0' : '2rem 1.5rem'}}>

        {/* Header */}
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem', padding: isMobile ? '0 1rem' : '0'}}>
          <h1 style={{fontSize: isMobile ? '1.375rem' : '1.75rem', fontWeight: 800, color: 'var(--ink)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.625rem'}}>
            Tu carrito
            {cart?.totalQuantity > 0 && (
              <Badge tone="warning">
                {cart.totalQuantity} {cart.totalQuantity === 1 ? 'artículo' : 'artículos'}
              </Badge>
            )}
          </h1>
          <Link
            to="/collections/roof-roof"
            style={{fontSize: '0.875rem', color: 'var(--ink-soft)', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.375rem', transition: 'color 0.15s'}}
            onMouseOver={(e) => (e.currentTarget.style.color = 'var(--brand-cta-hover)')}
            onMouseOut={(e) => (e.currentTarget.style.color = 'var(--ink-soft)')}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/>
            </svg>
            Seguir comprando
          </Link>
        </div>

        {isEmpty ? (
          /* ── ESTADO VACÍO ── */
          <div style={{
            background: '#fff',
            border: '1.5px solid #e8e4dc',
            borderRadius: '1.25rem',
            padding: isMobile ? '3rem 1.5rem' : '4rem 2rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.25rem',
          }}>
            <EmptyBowlIllustration />

            <div style={{display: 'flex', flexDirection: 'column', gap: '0.375rem'}}>
              <h2 style={{fontSize: '1.25rem', fontWeight: 800, color: '#2C1810', margin: 0}}>
                ¡El plato está vacío!
              </h2>
              <p style={{fontSize: '0.9375rem', color: '#7a6a62', margin: 0, lineHeight: 1.6, maxWidth: '300px'}}>
                Tu mascota está esperando. Agrega algo para consentirla.
              </p>
            </div>

            <Link to="/collections/roof-roof" style={{textDecoration: 'none'}}>
              <Button
                variant="primary"
                size="lg"
                iconAfter={
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
                  </svg>
                }
              >
                Ver productos
              </Button>
            </Link>

            {/* Sugerencias de categoría */}
            <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '0.25rem'}}>
              {[
                {label: '🏠 Casas', to: '/collections/roof-roof-casas'},
                {label: '🛏️ Camas', to: '/collections/roof-roof-camas'},
                {label: '🔒 Jaulas', to: '/collections/roof-roof-jaulas'},
                {label: '🍽️ Dispensadores', to: '/collections/roof-roof-dispensadores'},
              ].map(({label, to}) => (
                <Link key={to} to={to} style={{textDecoration: 'none'}}>
                  <Button variant="outline" size="sm">{label}</Button>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          /* ── GRID: productos + resumen ── */
          <div style={{
            display: isMobile ? 'flex' : 'grid',
            flexDirection: 'column',
            gridTemplateColumns: isMobile ? undefined : '1fr 380px',
            gap: isMobile ? '0.75rem' : '1.5rem',
            alignItems: 'start',
            width: '100%',
            padding: isMobile ? '0' : '0',
          }}>

            {/* Columna izquierda — lista */}
            <div style={{
              background: '#fff',
              borderTop: '1px solid #e8e4dc',
              borderBottom: '1px solid #e8e4dc',
              borderLeft: isMobile ? 'none' : '1.5px solid #e8e4dc',
              borderRight: isMobile ? 'none' : '1.5px solid #e8e4dc',
              borderRadius: isMobile ? 0 : '1rem',
              overflow: 'hidden',
              width: '100%',
            }}>
              <CartMain layout="page" cart={cart}/>
            </div>

            {/* Columna derecha — resumen */}
            <div style={{
              position: isMobile ? 'static' : 'sticky',
              top: '1.5rem',
              width: '100%',
            }}>
              <div style={{
                background: '#2C1810',
                borderRadius: isMobile ? 0 : '1rem 1rem 0 0',
                padding: '1rem 1.25rem',
              }}>
                <h2 style={{fontSize: '1rem', fontWeight: 700, color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F5A623" strokeWidth="2" aria-hidden="true">
                    <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
                  </svg>
                  Resumen del pedido
                </h2>
              </div>
              <div style={{
                background: '#fff',
                borderTop: 'none',
                borderBottom: '1px solid #e8e4dc',
                borderLeft: isMobile ? 'none' : '1.5px solid #e8e4dc',
                borderRight: isMobile ? 'none' : '1.5px solid #e8e4dc',
                borderRadius: isMobile ? 0 : '0 0 1rem 1rem',
                padding: '1.25rem',
              }}>
                <CartMain layout="aside" cart={cart} summaryOnly/>
              </div>
            </div>
          </div>
        )}

        {/* Trust bar inferior */}
        {!isEmpty && (
          <div style={{
            marginTop: '1.5rem',
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: '0.75rem',
          }}>
            {[
              {
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F5A623" strokeWidth="1.8" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>,
                title: 'Compra segura',
                desc: 'Protegida con Shopify',
              },
              {
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F5A623" strokeWidth="1.8" aria-hidden="true"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h3.5a1 1 0 01.9.55L22 12v4h-6"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></svg>,
                title: 'Envío a todo México',
                desc: 'Entrega en 4-7 días hábiles',
              },
              {
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F5A623" strokeWidth="1.8" aria-hidden="true"><path d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5l8-3z"/><path d="M9 12l2 2 4-4"/></svg>,
                title: 'Garantía incluida',
                desc: 'Cambios sin complicaciones',
              },
            ].map(({icon, title, desc}) => (
              <div key={title} style={{
                background: '#fff', border: '1.5px solid #e8e4dc', borderRadius: '0.75rem',
                padding: '0.875rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem',
              }}>
                <span style={{flexShrink: 0}}>{icon}</span>
                <div>
                  <p style={{fontSize: '0.8125rem', fontWeight: 700, color: '#2C1810', margin: 0}}>{title}</p>
                  <p style={{fontSize: '0.75rem', color: '#7a6a62', margin: 0}}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Ilustración SVG: plato de perro vacío ── */
function EmptyBowlIllustration() {
  return (
    <svg
      width="280"
      height="220"
      viewBox="0 0 160 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Sombra */}
      <ellipse cx="80" cy="118" rx="48" ry="7" fill="#e8e4dc"/>

      {/* Cuenco exterior */}
      <path d="M28 72 Q28 108 80 108 Q132 108 132 72 Z" fill="#E8E4DC" stroke="#c8b8b0" strokeWidth="1.5"/>

      {/* Cuenco interior */}
      <path d="M36 72 Q36 100 80 100 Q124 100 124 72 Z" fill="#f5f7fa"/>

      {/* Borde superior */}
      <ellipse cx="80" cy="72" rx="52" ry="12" fill="#E8E4DC" stroke="#c8b8b0" strokeWidth="1.5"/>
      <ellipse cx="80" cy="72" rx="44" ry="9" fill="#edf0f5"/>

      {/* Reflejo */}
      <ellipse cx="64" cy="76" rx="10" ry="3" fill="rgba(255,255,255,0.55)" transform="rotate(-15 64 76)"/>

      {/* Huella de pata sutil */}
      <g opacity="0.18" transform="translate(70, 79)">
        <ellipse cx="10" cy="10" rx="6"   ry="5"   fill="#2C1810"/>
        <ellipse cx="4"  cy="4"  rx="2.5" ry="2"   fill="#2C1810"/>
        <ellipse cx="10" cy="2"  rx="2.5" ry="2"   fill="#2C1810"/>
        <ellipse cx="16" cy="4"  rx="2.5" ry="2"   fill="#2C1810"/>
        <ellipse cx="19" cy="9"  rx="2"   ry="2"   fill="#2C1810"/>
      </g>

      {/* Placa collar */}
      <rect x="58" y="108" width="44" height="10" rx="5" fill="#F5A623"/>
      <text x="80" y="117" textAnchor="middle" fontSize="6.5" fontWeight="800" fill="#2C1810" fontFamily="sans-serif">
        ROOF ROOF
      </text>

      {/* Estrellitas */}
      <g fill="#F5A623" opacity="0.7">
        <polygon points="18,38 19.5,34 21,38 25,38 22,40.5 23,44.5 19.5,42 16,44.5 17,40.5 14,38" transform="scale(0.7) translate(10,10)"/>
        <polygon points="18,38 19.5,34 21,38 25,38 22,40.5 23,44.5 19.5,42 16,44.5 17,40.5 14,38" transform="scale(0.5) translate(218,4)"/>
      </g>

      {/* Signos ? */}
      <text x="136" y="58" fontSize="18" fontWeight="900" fill="#acc3fa" opacity="0.6" fontFamily="sans-serif">?</text>
      <text x="18"  y="62" fontSize="13" fontWeight="900" fill="#acc3fa" opacity="0.45" fontFamily="sans-serif">?</text>
    </svg>
  );
}

/** @typedef {import('react-router').HeadersFunction} HeadersFunction */
/** @typedef {import('./+types/cart').Route} Route */
/** @typedef {import('@shopify/hydrogen').CartQueryDataReturn} CartQueryDataReturn */
/** @typedef {ReturnType<typeof useLoaderData<typeof loader>>} LoaderReturnData */
/** @typedef {ReturnType<typeof useActionData<typeof action>>} ActionReturnData */