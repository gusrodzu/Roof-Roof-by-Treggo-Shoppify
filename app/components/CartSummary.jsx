import {CartForm, Money} from '@shopify/hydrogen';
import {useEffect, useId, useRef, useState} from 'react';
import {useFetcher, Link} from 'react-router';
import {useAside} from '~/components/Aside';
import {Button, TextInput} from '~/components/design-system';

export function CartSummary({cart, layout}) {
  const summaryId           = useId();
  const discountCodeInputId = useId();
  const giftCardInputId     = useId();
  const isAside             = layout === 'aside';

  return (
    <div
      aria-labelledby={summaryId}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0',
        background: '#fff',
        borderRadius: isAside ? '0' : '0.875rem',
        border: isAside ? 'none' : '1px solid var(--border)',
        overflow: 'hidden',
        maxWidth: isAside ? '100%' : '420px',
        marginLeft: isAside ? '0' : 'auto',
        boxShadow: isAside ? 'none' : '0 2px 12px rgba(44,24,16,0.06)',
      }}
    >
      <ShippingBadge />

      <div style={{padding: isAside ? '0 0 1rem' : '1rem 1rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <span style={{fontSize: '0.875rem', color: 'var(--ink-soft)'}}>Subtotal</span>
          <Money data={cart?.cost?.subtotalAmount} style={{fontSize: '0.9375rem', fontWeight: 600, color: 'var(--ink)'}}/>
        </div>

        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <span style={{fontSize: '0.875rem', color: 'var(--ink-soft)'}}>Envío</span>
          <span style={{fontSize: '0.8125rem', color: 'var(--success)', fontWeight: 600}}>Calculado al finalizar</span>
        </div>

        <div style={{height: '1px', background: 'var(--border)', margin: '0.375rem 0'}}/>

        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
          <span style={{fontSize: '1rem', fontWeight: 700, color: 'var(--ink)'}}>Total</span>
          <Money data={cart?.cost?.totalAmount} style={{fontSize: '1.375rem', fontWeight: 800, color: 'var(--ink)'}}/>
        </div>

        <p style={{fontSize: '0.6875rem', color: 'var(--ink-muted)', margin: 0, lineHeight: 1.4}}>
          Impuestos incluidos · Envío calculado en el siguiente paso
        </p>
      </div>

      <div style={{padding: isAside ? '0' : '0 1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
        {isAside && <ViewCartLink />}
        <CartCheckoutActions checkoutUrl={cart?.checkoutUrl} />
      </div>

      <PaymentBadges />

      <div style={{padding: isAside ? '0' : '0 1rem', paddingBottom: '0.5rem'}}>
        <CartDiscounts
          discountCodes={cart?.discountCodes}
          discountCodeInputId={discountCodeInputId}
        />
      </div>

      <div style={{padding: isAside ? '0' : '0 1rem 1rem'}}>
        <CartGiftCard
          giftCardCodes={cart?.appliedGiftCards}
          giftCardInputId={giftCardInputId}
        />
      </div>
    </div>
  );
}

/* ── Ver carrito completo ── */
function ViewCartLink() {
  const {close} = useAside();

  return (
    <Link to="/cart" onClick={close} style={{textDecoration: 'none'}}>
      <Button
        variant="outline"
        fullWidth
        icon={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
        }
      >
        Ver carrito
      </Button>
    </Link>
  );
}

/* ── Shipping badge ── */
function ShippingBadge() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0.75rem 1rem',
      background: 'linear-gradient(90deg, var(--surface-cream) 0%, var(--surface-cream-2) 100%)',
      borderBottom: '1px solid var(--border-gold)',
    }}>
      <div style={{display: 'flex', alignItems: 'center', gap: '0.625rem'}}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F5A623" strokeWidth="1.75" aria-hidden="true">
          <rect x="1" y="3" width="15" height="13" rx="1"/>
          <path d="M16 8h3.5a1 1 0 01.9.55L22 12v4h-6"/>
          <circle cx="6" cy="18" r="2"/>
          <circle cx="18" cy="18" r="2"/>
        </svg>
        <span style={{fontSize: '0.8125rem', fontWeight: 700, color: 'var(--ink)', letterSpacing: '0.1px'}}>
          Envío a domicilio disponible
        </span>
      </div>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2a9d5c" strokeWidth="2.5" aria-hidden="true">
        <path d="M20 6L9 17l-5-5"/>
      </svg>
    </div>
  );
}

/* ── Payment badges ── */
function PaymentBadges() {
  // const methods = [
  //   {label: 'Visa',         icon: <VisaIcon />},
  //   {label: 'Mastercard',   icon: <MastercardIcon />},
  //   {label: 'Amex',         icon: <AmexIcon />},
    
  // ];

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
      padding: '0.75rem 1rem',
      borderTop: '1px solid var(--border-soft)', borderBottom: '1px solid var(--border-soft)',
      margin: '0.5rem 0', background: 'var(--surface-warm)',
    }}>
      <div style={{display: 'flex', alignItems: 'center', gap: '0.3rem'}}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#b0a49c" strokeWidth="2.5" aria-hidden="true">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
          <path d="M7 11V7a5 5 0 0110 0v4"/>
        </svg>
        <span style={{fontSize: '0.6875rem', color: 'var(--ink-muted)', fontWeight: 500, letterSpacing: '0.5px', textTransform: 'uppercase'}}>
          Pago seguro
        </span>
      </div>

      {/* <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center'}}>
        {methods.map((m) => (
          <div
            key={m.label}
            aria-label={m.label}
            title={m.label}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: '#fff', border: '1px solid var(--border)',
              borderRadius: '0.375rem', padding: '0.25rem 0.5rem',
              height: '28px', minWidth: '44px',
            }}
          >
            {m.icon}
          </div>
        ))}
      </div> */}
    </div>
  );
}

/* ── Checkout CTA ── */
function CartCheckoutActions({checkoutUrl}) {
  if (!checkoutUrl) return null;

  return (
    <a href={checkoutUrl} target="_self" style={{textDecoration: 'none', display: 'block'}}>
      <Button
        variant="primary"
        size="lg"
        fullWidth
        style={{marginTop: '0.25rem'}}
        icon={
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
        }
      >
        Finalizar compra
      </Button>
    </a>
  );
}

/* ── Descuentos (acordeón) ── */
function CartDiscounts({discountCodes, discountCodeInputId}) {
  const codes = discountCodes?.filter((d) => d.applicable)?.map(({code}) => code) || [];
  const [open, setOpen] = useState(codes.length > 0);

  useEffect(() => {
    if (codes.length > 0) setOpen(true);
  }, [codes.length]);

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '0.375rem'}}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          width: '100%', padding: '0.5rem 0',
          background: 'none', border: 'none', borderTop: '1px solid var(--border-soft)',
          cursor: 'pointer', fontFamily: 'inherit',
        }}
      >
        <span style={{fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: '0.375rem'}}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F5A623" strokeWidth="2.5" aria-hidden="true">
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/>
            <line x1="7" y1="7" x2="7.01" y2="7"/>
          </svg>
          {codes.length > 0 ? `Descuento: ${codes.join(', ')}` : '¿Tienes un código de descuento?'}
        </span>
        <svg
          width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="#b0a49c" strokeWidth="2.5" aria-hidden="true"
          style={{transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)'}}
        >
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      {open && (
        <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingBottom: '0.5rem'}}>
          {codes.length > 0 && (
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              background: 'var(--surface-cream)', border: '1px solid var(--border-gold)',
              borderRadius: '0.5rem', padding: '0.5rem 0.75rem',
            }}>
              <span style={{fontSize: '0.8125rem', fontWeight: 700, color: 'var(--brand-deep)'}}>
                🏷️ {codes.join(', ')}
              </span>
              <UpdateDiscountForm>
                <Button type="submit" variant="ghost" size="sm" style={{padding: 0, color: 'var(--ink-muted)'}}>
                  Quitar
                </Button>
              </UpdateDiscountForm>
            </div>
          )}

          <UpdateDiscountForm discountCodes={codes}>
            <div style={{display: 'flex', gap: '0.5rem'}}>
              <div style={{flex: 1}}>
                <TextInput
                  id={discountCodeInputId}
                  name="discountCode"
                  placeholder="Ej. ROOF10"
                />
              </div>
              <Button type="submit" variant="outline">
                Aplicar
              </Button>
            </div>
          </UpdateDiscountForm>
        </div>
      )}
    </div>
  );
}

function UpdateDiscountForm({discountCodes, children}) {
  return (
    <CartForm route="/cart" action={CartForm.ACTIONS.DiscountCodesUpdate} inputs={{discountCodes: discountCodes || []}}>
      {children}
    </CartForm>
  );
}

/* ── Gift Cards ── */
function CartGiftCard({giftCardCodes, giftCardInputId}) {
  const giftCardCodeInput  = useRef(null);
  const removeButtonRefs   = useRef(new Map());
  const previousCardIdsRef = useRef([]);
  const giftCardAddFetcher = useFetcher({key: 'gift-card-add'});
  const [removedCardIndex, setRemovedCardIndex] = useState(null);

  useEffect(() => {
    if (giftCardAddFetcher.data && giftCardCodeInput.current) {
      giftCardCodeInput.current.value = '';
    }
  }, [giftCardAddFetcher.data]);

  useEffect(() => {
    const currentCardIds = giftCardCodes?.map((c) => c.id) || [];
    if (removedCardIndex !== null && giftCardCodes) {
      const idx = Math.min(removedCardIndex, giftCardCodes.length - 1);
      const btn = giftCardCodes[idx] ? removeButtonRefs.current.get(giftCardCodes[idx].id) : null;
      (btn || giftCardCodeInput.current)?.focus();
      setRemovedCardIndex(null);
    }
    previousCardIdsRef.current = currentCardIds;
  }, [giftCardCodes, removedCardIndex]);

  if (!giftCardCodes?.length) return null;

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
      {giftCardCodes.map((card) => (
        <div
          key={card.id}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: '#f0f3fd', border: '1px solid #acc3fa',
            borderRadius: '0.5rem', padding: '0.5rem 0.75rem',
          }}
        >
          <span style={{fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ink)'}}>
            🎁 ***{card.lastCharacters} — <Money data={card.amountUsed} as="span"/>
          </span>
          <CartForm route="/cart" action={CartForm.ACTIONS.GiftCardCodesRemove} inputs={{giftCardCodes: [card.id]}}>
            <Button
              type="submit"
              variant="ghost"
              size="sm"
              ref={(el) => { el ? removeButtonRefs.current.set(card.id, el) : removeButtonRefs.current.delete(card.id); }}
              onClick={() => { const idx = previousCardIdsRef.current.indexOf(card.id); if (idx !== -1) setRemovedCardIndex(idx); }}
              style={{padding: 0, color: 'var(--ink-muted)'}}
            >
              Quitar
            </Button>
          </CartForm>
        </div>
      ))}
    </div>
  );
}

/* ── SVG Payment Icons ── */
function VisaIcon() {
  return (
    <svg width="32" height="10" viewBox="0 0 32 10" aria-label="Visa">
      <text x="0" y="9" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="800" fill="#1a1f71" letterSpacing="-0.5">VISA</text>
    </svg>
  );
}

function MastercardIcon() {
  return (
    <svg width="28" height="18" viewBox="0 0 28 18">
      <circle cx="10" cy="9" r="8" fill="#EB001B" opacity="0.9"/>
      <circle cx="18" cy="9" r="8" fill="#F79E1B" opacity="0.9"/>
      <path d="M14 3.5a8 8 0 010 11A8 8 0 0114 3.5z" fill="#FF5F00"/>
    </svg>
  );
}

function AmexIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 24" width="38" height="24" aria-label="American Express">
      <rect width="38" height="24" rx="3" fill="#0071CE"/>
      <path d="M25.8 6.3V3H31l.87 2.53L32.73 3H37v11.2h-.2l-1.93 2.07 1.93 2.09H37v3.07h-3.4l-1.67-1.87-1.73 1.87H19.47v-8.6H16L20.27 3h4.13L25.8 6.3zM20.6 20.27H27v-1.73h-4.33v-1.13h4.2v-1.73h-4.2v-1.13H27V12.8h-6.4v7.47zm9.93-3.73L27 20.27h2.6l2.27-2.4 2.2 2.4h2.67l-3.53-3.8 3.53-3.67h-2.6l-2.27 2.4-2.27-2.4H26l3.53 3.74zM17.67 11.73h2.27l.6-1.53h3.47l.67 1.53H27l-3.33-7.53h-2.67l-3.33 7.53zm5.6-3.27h-2l1-2.47 1 2.47zm10.13 0l-1.67 4.67h-3.2L27 4.2h3.07V6.4l1.93-2.2h2.8v7.47h-2V8.46z" fill="white"/>
    </svg>
  );
}





/** @typedef {{cart: OptimisticCart<CartApiQueryFragment | null>; layout: CartLayout;}} CartSummaryProps */
/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
/** @typedef {import('~/components/CartMain').CartLayout} CartLayout */
/** @typedef {import('@shopify/hydrogen').OptimisticCart} OptimisticCart */