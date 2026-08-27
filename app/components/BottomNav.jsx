import {Await, Link, useLocation} from 'react-router';
import {Suspense} from 'react';
import {useAside} from '~/components/Aside';
import {useCartAnimation, CartBadge} from '~/components/CartAnimation';

/**
 * BottomNav — barra de navegación fija en la parte inferior para mobile.
 * Se renderiza solo en mobile desde PageLayout.
 *
 * Props:
 *   cart — Promise del carrito (igual que en Header)
 *   isLoggedIn — Promise<boolean>
 */
export function BottomNav({cart}) {
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
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden="true"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
    {
      key: 'cats',
      label: 'Categorías',
      to: '/collections/roof-roof',
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden="true"
        >
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      ),
    },
    {
      key: 'cart',
      label: 'Carrito',
      isCart: true,
    },
    {
      key: 'selector',
      label: 'Selector',
      to: '/pages/selector-de-productos',
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden="true"
        >
          <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
          <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z" />
        </svg>
      ),
    },
    {
      key: 'more',
      label: 'Más',
      isMenu: true,
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden="true"
        >
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      ),
    },
  ];

  const isActive = (item) => {
    if (item.exact) return pathname === item.to;
    if (item.to) return pathname.startsWith(item.to);
    return false;
  };

  return (
    <>
      {/* Espacio reservado para que el contenido no quede tapado */}
      <div
        className="rr-bottom-nav-spacer"
        style={{height: 'var(--bottom-nav-height, 64px)'}}
        aria-hidden="true"
      />

      {/* Barra fija */}
      <nav className="rr-bottom-nav" aria-label="Navegación principal">
        <div className="rr-bottom-nav__inner">
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
                  variant="menu"
                />
              );
            }

            if (item.disabled) {
              return (
                <NavButton
                  key={item.key}
                  label={item.label}
                  icon={item.icon}
                  active={false}
                  disabled
                  badge={item.badge}
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
        </div>
      </nav>
    </>
  );
}

/* ── Ítem Link ── */
function NavLink({to, label, icon, active}) {
  return (
    <Link
      className={`rr-bottom-nav__item${active ? ' is-active' : ''}`}
      to={to}
    >
      {active ? <span className="rr-bottom-nav__active-indicator" /> : null}
      <span className="rr-bottom-nav__icon">{icon}</span>
      <span className="rr-bottom-nav__label">{label}</span>
    </Link>
  );
}

/* ── Ítem Botón (menú) ── */
function NavButton({
  label,
  icon,
  active,
  onClick,
  disabled = false,
  badge,
  variant,
}) {
  const className = [
    'rr-bottom-nav__item',
    variant === 'menu' ? 'rr-bottom-nav__menu' : '',
    active ? 'is-active' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={className}
      aria-label={disabled ? `${label}, próximamente` : label}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      <span className="rr-bottom-nav__icon">{icon}</span>
      {badge ? (
        <span className="rr-coming-soon-badge rr-coming-soon-badge--mobile rr-bottom-nav__badge">
          {badge}
        </span>
      ) : null}
      <span className="rr-bottom-nav__label">{label}</span>
    </button>
  );
}

/* ── Ítem Carrito con badge ── */
function CartNavItem({cart, cartIconRef, onOpen}) {
  return (
    <button
      className="rr-bottom-nav__item rr-bottom-nav__cart"
      onClick={onOpen}
      ref={cartIconRef}
      data-cart-icon
      aria-label="Abrir carrito"
      type="button"
    >
      <span className="rr-bottom-nav__cart-icon">
        <svg
          width="21"
          height="21"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 01-8 0" />
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
      <span className="rr-bottom-nav__label rr-bottom-nav__cart-label">
        Carrito
      </span>
    </button>
  );
}
