import {Link, useLocation} from 'react-router';
import {Await, useNavigation} from 'react-router';
import {Suspense, useEffect, useState} from 'react';
import {useAside} from '~/components/Aside';
import {useCartAnimation, CartBadge} from '~/components/CartAnimation';
import {useOptimisticCart} from '@shopify/hydrogen';

/**
 * BottomNav — barra de navegación fija en la parte inferior para mobile.
 * Se renderiza solo en mobile desde PageLayout.
 *
 * Props:
 *   cart — Promise del carrito (igual que en Header)
 *   isLoggedIn — Promise<boolean>
 */
export function BottomNav({cart, isLoggedIn}) {
  const {pathname} = useLocation();
  const {open} = useAside();
  const {cartIconRef} = useCartAnimation();

  const NAV = [
    {
      key: 'home',
      label: 'Inicio',
      to: '/',
      exact: true,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      ),
    },
    {
      key: 'cats',
      label: 'Categorías',
      to: '/collections/roof-roof',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <rect x="3" y="3" width="7" height="7" rx="1"/>
          <rect x="14" y="3" width="7" height="7" rx="1"/>
          <rect x="3" y="14" width="7" height="7" rx="1"/>
          <rect x="14" y="14" width="7" height="7" rx="1"/>
        </svg>
      ),
    },
    {
      key: 'cart',
      label: 'Carrito',
      isCart: true,
    },
    {
      key: 'account',
      label: 'Cuenta',
      to: '/account',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      ),
    },
    {
      key: 'more',
      label: 'Más',
      isMenu: true,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <line x1="3" y1="6" x2="21" y2="6"/>
          <line x1="3" y1="12" x2="21" y2="12"/>
          <line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
      ),
    },
  ];

  const isActive = (item) => {
    if (item.exact) return pathname === item.to;
    if (item.to)    return pathname.startsWith(item.to);
    return false;
  };

  return (
    <>
      {/* Espacio reservado para que el contenido no quede tapado */}
      <div style={{height: 'var(--bottom-nav-height, 64px)'}} aria-hidden="true" />

      {/* Barra fija */}
      <nav
        aria-label="Navegación principal"
        style={{
          position: 'fixed',
          bottom: 0, left: 0, right: 0,
          zIndex: 60,
          background: '#fff',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'stretch',
          height: 'var(--bottom-nav-height, 64px)',
          boxShadow: '0 -2px 12px rgba(44,24,16,0.08)',
          paddingBottom: 'env(safe-area-inset-bottom, 0px)', // iPhone notch
        }}
      >
        {NAV.map((item) => {
          if (item.isCart) {
            return (
              <CartNavItem
                key="cart"
                cart={cart}
                cartIconRef={cartIconRef}
                onOpen={() => open('cart')}
              />
            );
          }

          if (item.isMenu) {
            return (
              <NavButton
                key="more"
                label={item.label}
                icon={item.icon}
                active={false}
                onClick={() => open('mobile')}
              />
            );
          }

          const active = isActive(item);
          return (
            <NavLink
              key={item.key}
              to={item.to}
              label={item.label}
              icon={item.icon}
              active={active}
            />
          );
        })}
      </nav>
    </>
  );
}

/* ── Ítem Link ── */
function NavLink({to, label, icon, active}) {
  return (
    <Link
      to={to}
      style={{
        flex: 1,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: '3px',
        textDecoration: 'none',
        color: active ? 'var(--ink)' : 'var(--ink-muted)',
        transition: 'color 0.15s',
        position: 'relative',
        paddingTop: active ? '0' : '0',
      }}
    >
      {/* Indicador activo */}
      {active && (
        <span style={{
          position: 'absolute', top: 0, left: '50%',
          transform: 'translateX(-50%)',
          width: '32px', height: '3px',
          background: 'var(--brand-cta)', borderRadius: '0 0 3px 3px',
        }}/>
      )}
      <span style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: active ? 'var(--brand-cta)' : 'var(--ink-muted)',
      }}>
        {icon}
      </span>
      <span style={{
        fontSize: '10px', fontWeight: active ? 700 : 500,
        letterSpacing: '0.2px',
      }}>
        {label}
      </span>
    </Link>
  );
}

/* ── Ítem Botón (menú) ── */
function NavButton({label, icon, active, onClick}) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: '3px',
        background: 'none', border: 'none', cursor: 'pointer',
        color: active ? 'var(--ink)' : 'var(--ink-muted)',
        fontFamily: 'inherit',
        padding: 0,
      }}
    >
      <span style={{display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink-muted)'}}>
        {icon}
      </span>
      <span style={{fontSize: '10px', fontWeight: 500}}>
        {label}
      </span>
    </button>
  );
}

/* ── Ítem Carrito con badge ── */
function CartNavItem({cart, cartIconRef, onOpen}) {
  return (
    <button
      onClick={onOpen}
      ref={cartIconRef}
      data-cart-icon
      aria-label="Abrir carrito"
      style={{
        flex: 1,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: '3px',
        background: 'none', border: 'none', cursor: 'pointer',
        fontFamily: 'inherit', padding: 0,
        position: 'relative',
      }}
    >
      {/* Círculo amarillo destacado */}
      <span style={{
        width: '44px', height: '44px',
        borderRadius: '50%',
        background: 'var(--brand-cta)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--ink)',
        position: 'relative',
        boxShadow: '0 2px 8px rgba(245,166,35,0.4)',
        marginTop: '-14px', // sobresale hacia arriba
      }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 01-8 0"/>
        </svg>
        <Suspense fallback={null}>
          <Await resolve={cart}>
            {(resolvedCart) => (
              <CartBadge
                count={resolvedCart?.totalQuantity ?? 0}
                shadow="0 0 0 2px #fff"
              />
            )}
          </Await>
        </Suspense>
      </span>
      <span style={{fontSize: '10px', fontWeight: 700, color: 'var(--ink)', marginTop: '2px'}}>
        Carrito
      </span>
    </button>
  );
}
