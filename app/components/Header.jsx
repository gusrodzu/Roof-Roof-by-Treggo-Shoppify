import {Await, Link, useNavigate} from 'react-router';
import {useState, useEffect, useRef, useId, Suspense} from 'react';
import {useAside} from '~/components/Aside';
import {useCartAnimation, CartBadge} from '~/components/CartAnimation';
import {useMediaQuery} from '~/hooks/useMediaQuery';
import logo from '~/assets/logo.png';
import appIcon from '~/assets/favicon.png';

const MEGA_MENU = [
  {
    title: 'Casas',
    to: '/collections/roof-roof-casas',
    items: [
      {label: 'Refugios de exterior', to: '/collections/roof-roof-casas'},
      {label: 'Con protección solar', to: '/collections/roof-roof-casas'},
      {label: 'Madera y plástico', to: '/collections/roof-roof-casas'},
    ],
  },
  {
    title: 'Camas',
    to: '/collections/roof-roof-camas',
    items: [
      {label: 'Camas elevadas', to: '/collections/roof-roof-camas'},
      {label: 'Bordes acolchados', to: '/collections/roof-roof-camas'},
    ],
  },
  {
    title: 'Jaulas y corrales',
    to: '/collections/roof-roof-jaulas',
    items: [
      {label: 'Barreras ajustables', to: '/collections/roof-roof-jaulas'},
      {label: 'Portátiles', to: '/collections/roof-roof-jaulas'},
    ],
  },
  {
    title: 'Dispensadores',
    to: '/collections/roof-roof-dispensadores',
    items: [
      {label: 'Alimento manual', to: '/collections/roof-roof-dispensadores'},
    ],
  },
];

const COMMERCE_NAV = [
  {label: 'Todo', to: '/collections/roof-roof'},
  {label: 'Casas', to: '/collections/roof-roof-casas'},
  {label: 'Camas', to: '/collections/roof-roof-camas'},
  {label: 'Jaulas y corrales', to: '/collections/roof-roof-jaulas'},
  {label: 'Dispensadores', to: '/collections/roof-roof-dispensadores'},
  {
    label: 'Encuentra tu producto',
    to: '/pages/selector-de-productos',
    featured: true,
  },
  {label: 'Guías de cuidado', to: '/pages/centro-de-cuidado'},
];

const TRUST_ITEMS = [
  {
    label: 'Envío gratis +$599',
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <rect x="1" y="3" width="15" height="13" rx="1" />
        <path d="M16 8h3.5a1 1 0 01.9.55L22 12v4h-6" />
        <circle cx="6" cy="18" r="2" />
        <circle cx="18" cy="18" r="2" />
      </svg>
    ),
  },
  {
    label: 'Envíos a todo México',
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    label: 'Pagos seguros',
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    ),
  },
  {
    label: 'Garantía incluida',
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <path d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5l8-3z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
];

const QUICK_LINKS = [
  {
    label: 'Catálogo',
    to: '/collections/roof-roof',
    icon: (
      <svg
        width="20"
        height="20"
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
    label: 'Asesoría',
    to: '/pages/selector-de-productos',
    icon: (
      <svg
        width="20"
        height="20"
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
    label: 'Cuenta',
    to: '/account',
    disabled: true,
    badge: 'Próx.',
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0116 0" />
      </svg>
    ),
  },
];

/* ─── TrustItem ─────────────────────────────────────────────────────────────── */

function TrustItem({label, icon}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        color: '#e5e9f0',
        whiteSpace: 'nowrap',
      }}
    >
      <span style={{display: 'flex', color: '#ffffff', flexShrink: 0}}>
        {icon}
      </span>
      <span style={{fontSize: '1.05rem', fontWeight: 700}}>{label}</span>
    </div>
  );
}

export function TrustBar() {
  const [current, setCurrent] = useState(0);
  const isMobile = useMediaQuery('(max-width: 640px)');
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isMobile) return;
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % TRUST_ITEMS.length);
    }, 2500);
    return () => clearInterval(intervalRef.current);
  }, [isMobile]);

  const restartInterval = (index) => {
    setCurrent(index);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % TRUST_ITEMS.length);
    }, 2500);
  };

  return (
    <div
      style={{
        background: '#111',
        borderBottom: '1px solid #222',
        padding: '0.875rem 1.5rem',
        borderRadius: '1rem',
      }}
    >
      {!isMobile && (
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            gap: '0.5rem 1.5rem',
          }}
        >
          {TRUST_ITEMS.map(({label, icon}) => (
            <TrustItem key={label} label={label} icon={icon} />
          ))}
        </div>
      )}
      {isMobile && (
        <div style={{position: 'relative', overflow: 'hidden'}}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '2.5rem',
            }}
          >
            {TRUST_ITEMS.map(({label, icon}, i) => (
              <div
                key={label}
                style={{
                  position: i === 0 ? 'relative' : 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: current === i ? 1 : 0,
                  transition: 'opacity 0.5s ease',
                  pointerEvents: current === i ? 'auto' : 'none',
                }}
              >
                <TrustItem label={label} icon={icon} />
              </div>
            ))}
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '6px',
              marginTop: '0.625rem',
            }}
          >
            {TRUST_ITEMS.map(({label}, i) => (
              <button
                key={label}
                onClick={() => restartInterval(i)}
                aria-label={`Ir a item ${i + 1}`}
                style={{
                  width: current === i ? '18px' : '6px',
                  height: '6px',
                  borderRadius: '999px',
                  background: current === i ? 'var(--brand-cta)' : '#444',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  transition: 'width 0.3s ease, background 0.3s ease',
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Header ────────────────────────────────────────────────────────────────── */

export function Header({cart}) {
  const navigate = useNavigate();
  const {open} = useAside();
  const searchId = useId();
  const headerRef = useRef(null);

  useEffect(() => {
    const element = headerRef.current;
    if (!element) return undefined;

    const setHeight = () => {
      document.documentElement.style.setProperty(
        '--header-height',
        `${element.offsetHeight}px`,
      );
    };

    setHeight();
    const observer = new ResizeObserver(setHeight);
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = e.currentTarget.q.value.trim();
    if (query) navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const SearchBar = ({id}) => (
    <form
      className="rr-header-search-form"
      onSubmit={handleSearchSubmit}
      role="search"
      style={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        maxWidth: 'none',
        background: '#ffffff',
        border: '2px solid #FFB000',
        borderRadius: '999px',
        padding: '4px',
        boxSizing: 'border-box',
        overflow: 'hidden',
        boxShadow: '0 6px 20px rgba(255, 121, 0, 0.12)',
      }}
    >
      <label
        htmlFor={id}
        style={{
          position: 'absolute',
          width: '10px',
          height: 1,
          padding: 1,
          margin: 1,
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          border: 0,
        }}
      >
        Buscar productos
      </label>

      <input
        id={id}
        className="rr-header-search-input"
        name="q"
        type="search"
        placeholder="¿Qué necesita tu mascota?"
        style={{
          flex: '1 1 auto',
          minWidth: 0,
          width: 'auto',
          background: 'transparent',
          border: 'none',
          outline: 'none',
          margin: 0,
          padding: '0.875rem 1rem',
          color: '#000000',
          fontSize: '0.9rem',
          fontWeight: 500,
          boxSizing: 'border-box',
        }}
      />

      <button
        className="rr-header-search-submit"
        type="submit"
        aria-label="Buscar productos"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.4rem',

          flex: '0 0 auto',

          background: 'var(--brand-cta)',

          color: '#000000',

          border: 'none',
          borderRadius: '999px',

          margin: 0,
          padding: '0.7rem 1.1rem',

          fontSize: '0.875rem',
          fontWeight: 800,

          cursor: 'pointer',

          boxShadow: '0 4px 12px rgba(255, 121, 0, 0.22)',

          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>

        <span>Buscar</span>
      </button>
    </form>
  );

  return (
    <header
      className="rr-site-header"
      ref={headerRef}
      style={{position: 'sticky', top: 0, zIndex: 50}}
    >
      {/* Barra superior */}
      <div
        className="rr-announcement-bar"
        style={{
          background: '#000000',
          color: '#fff',
          textAlign: 'center',
          fontSize: '12px',
          fontWeight: 600,
          padding: '6px 1rem',
          letterSpacing: '.5px',
        }}
      >
        Envío gratis en pedidos desde $599 · Compra protegida con Shopify
      </div>

      {/* Barra principal */}
      <div
        className="rr-header-main"
        style={{background: 'var(--brand)', padding: '0.75rem clamp(0.75rem, 2vw, 1.25rem)'}}
      >
        <>
          {/* ── MOBILE ── */}
          <div className="rr-mobile-header">
            <div className="rr-mobile-header__brand-row">
              <Link
                aria-label="Ir al inicio de Roof Roof"
                className="rr-mobile-header__identity"
                to="/"
              >
                <span className="rr-mobile-header__logo">
                  <img src={appIcon} alt="" />
                </span>
                <span className="rr-mobile-header__copy">
                  <strong>Roof Roof</strong>
                  <small>Todo para su espacio</small>
                </span>
              </Link>

              <div className="rr-mobile-header__actions">
                <Link
                  aria-label="Abrir preguntas frecuentes"
                  className="rr-mobile-header__action"
                  to="/pages/ayuda"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M9.7 9a2.5 2.5 0 014.8.9c0 1.8-2.5 2-2.5 3.6" />
                    <path d="M12 17h.01" />
                  </svg>
                </Link>
                <button
                  aria-label="Abrir menú"
                  className="rr-mobile-header__action"
                  onClick={() => open('mobile')}
                  type="button"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="M4 7h16M4 12h16M4 17h16" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="rr-mobile-header__search">
              <SearchBar id={searchId + '-mobile'} />
            </div>
          </div>
          {/* ── DESKTOP ── */}
          <div
            className="rr-header-desktop"
            style={{maxWidth: '1280px', margin: '0 auto'}}
          >
            <div style={{display: 'flex', alignItems: 'center', gap: '1.5rem'}}>
              {/* Logo */}
              <Link
                className="rr-header-logo"
                to="/"
                style={{display: 'flex', alignItems: 'center', flexShrink: 0}}
              >
                <img
                  src={logo}
                  alt="Roof Roof"
                  style={{
                    width: '160px',
                    height: 'auto',
                    display: 'block',
                    filter:
                      'brightness(0) saturate(100%) invert(9%) sepia(33%) saturate(1200%) hue-rotate(340deg) brightness(0.85)',
                  }}
                />
              </Link>

              {/* Buscador */}
              <div style={{flex: 1, maxWidth: '100%'}}>
                <SearchBar id={searchId} />
              </div>

              {/* Nav links + carrito */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  marginLeft: 'auto',
                  flexShrink: 0,
                }}
              >
                {QUICK_LINKS.map(({label, to, icon, disabled, badge}) => {
                  const content = (
                    <>
                      <span
                        className="rr-header-quick-link__icon"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '52px',
                          height: '52px',
                          borderRadius: '50%',
                          background: '#fff',
                          color: 'var(--ink)',
                          flexShrink: 0,
                          boxShadow: '0 1px 4px rgba(44,24,16,0.12)',
                          position: 'relative',
                        }}
                      >
                        {icon}
                        {badge ? (
                          <span
                            className="rr-coming-soon-badge rr-coming-soon-badge--nav"
                            style={{
                              position: 'absolute',
                              top: '-5px',
                              right: '-12px',
                              marginLeft: 0,
                            }}
                          >
                            {badge}
                          </span>
                        ) : null}
                      </span>
                      {label}
                    </>
                  );

                  const sharedStyle = {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.25rem',
                    padding: '0.375rem 0.625rem',
                    border: 0,
                    borderRadius: '0.625rem',
                    background: 'transparent',
                    textDecoration: 'none',
                    color: 'var(--ink)',
                    fontFamily: 'inherit',
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    minWidth: '64px',
                    textAlign: 'center',
                    transition: 'background 0.15s',
                  };

                  return disabled ? (
                    <button
                      aria-label={`${label}, próximamente`}
                      className="rr-header-quick-link rr-disabled-action"
                      disabled
                      key={label}
                      style={sharedStyle}
                      type="button"
                    >
                      {content}
                    </button>
                  ) : (
                    <Link
                      className="rr-header-quick-link"
                      key={label}
                      to={to}
                      style={sharedStyle}
                      onMouseEnter={(event) =>
                        (event.currentTarget.style.background =
                          'rgba(44,24,16,0.08)')
                      }
                      onMouseLeave={(event) =>
                        (event.currentTarget.style.background = 'transparent')
                      }
                    >
                      {content}
                    </Link>
                  );
                })}

                {/* CartButton */}
                <div
                  className="rr-header-cart-wrap"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.25rem',
                    padding: '0.375rem 0.625rem',
                  }}
                >
                  <CartButton
                    cart={cart}
                    badgeShadow="0 0 0 2px var(--brand)"
                  />
                  <span
                    style={{
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      color: 'var(--ink)',
                    }}
                  >
                    Carrito
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      </div>

      <nav
        className="rr-commerce-nav"
        aria-label="Categorías y servicios Roof Roof"
      >
        <div className="rr-commerce-nav__inner">
          {COMMERCE_NAV.map((item) => (
            <Link
              className={
                item.featured ? 'rr-commerce-nav__featured' : undefined
              }
              key={item.to}
              to={item.to}
              prefetch="intent"
            >
              <span>{item.label}</span>
              {item.badge ? (
                <span className="rr-coming-soon-badge rr-coming-soon-badge--nav">
                  {item.badge}
                </span>
              ) : null}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}

/* ─── CartButton ────────────────────────────────────────────────────────────── */

function CartButton({cart, badgeShadow}) {
  const {open} = useAside();
  const {cartIconRef} = useCartAnimation();

  return (
    <button
      className="rr-header-cart-button rr-icon-button"
      ref={cartIconRef}
      data-cart-icon
      onClick={() => open('cart')}
      aria-label="Abrir carrito"
      style={{
        width: '52px',
        height: '52px',
        borderRadius: '50%',
        background: '#fff',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color: 'var(--ink)',
        position: 'relative',
        flexShrink: 0,
        boxShadow: '0 1px 4px rgba(44,24,16,0.12)',
        transition: 'background 0.15s',
      }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
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
              shadow={badgeShadow}
            />
          )}
        </Await>
      </Suspense>
    </button>
  );
}

/* ─── HeaderMenu (mobile aside) ─────────────────────────────────────────────── */

export function HeaderMenu() {
  const {close} = useAside();

  return (
    <div
      className="rr-mobile-menu"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: 'var(--surface-cool)',
      }}
    >
      {/* Header con logo + botón cerrar */}
      <div
        className="rr-mobile-menu__header"
        style={{
          background: 'var(--brand)',
          padding: '0.875rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}
      >
        <img
          src={logo}
          alt="Roof Roof"
          style={{
            width: '120px',
            height: 'auto',
            filter:
              'brightness(0) saturate(100%) invert(9%) sepia(33%) saturate(1200%) hue-rotate(340deg) brightness(0.85)',
          }}
        />
        <button
          className="rr-icon-button rr-mobile-menu__close"
          onClick={close}
          aria-label="Cerrar menú"
          style={{
            background: 'rgba(255, 255, 255, 0.57)',
            border: 'none',
            borderRadius: '50%',
            width: '38px',
            height: '38px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--ink)',
            flexShrink: 0,
          }}
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Links scrolleables */}
      <nav style={{flex: 1, overflowY: 'auto', padding: '1rem'}}>
        {/* Accesos rápidos — grid 2x2 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: '0.625rem',
            marginBottom: '1rem',
          }}
        >
          {QUICK_LINKS.map(({label, to, icon, disabled, badge}) => {
            const content = (
              <>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: 'var(--surface-cream)',
                    color: 'var(--ink)',
                    position: 'relative',
                  }}
                >
                  {icon}
                  {badge ? (
                    <span
                      className="rr-coming-soon-badge rr-coming-soon-badge--mobile"
                      style={{
                        position: 'absolute',
                        top: '-7px',
                        right: '-12px',
                      }}
                    >
                      {badge}
                    </span>
                  ) : null}
                </span>
                {label}
              </>
            );

            const sharedStyle = {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              minHeight: '96px',
              padding: '0.75rem 0.4rem',
              background: '#fff',
              border: '1px solid #e5e9f0',
              borderRadius: '0.75rem',
              textDecoration: 'none',
              color: 'var(--ink)',
              fontFamily: 'inherit',
              fontSize: '0.8125rem',
              fontWeight: 600,
              textAlign: 'center',
            };

            return disabled ? (
              <button
                aria-label={`${label}, próximamente`}
                className="rr-disabled-action"
                disabled
                key={label}
                style={sharedStyle}
                type="button"
              >
                {content}
              </button>
            ) : (
              <Link key={label} to={to} onClick={close} style={sharedStyle}>
                {content}
              </Link>
            );
          })}
        </div>

        {/* Card de categorías */}
        <div
          style={{
            background: '#fff',
            border: '1px solid var(--border)',
            borderRadius: '0.75rem',
            overflow: 'hidden',
            marginBottom: '0.75rem',
          }}
        >
          <div
            style={{
              padding: '0.625rem 1rem',
              background: 'var(--surface-cool)',
              borderBottom: '1px solid var(--border)',
            }}
          >
            <span
              style={{
                fontSize: '0.6875rem',
                fontWeight: 700,
                color: 'var(--ink-soft)',
                letterSpacing: '0.8px',
                textTransform: 'uppercase',
              }}
            >
              Categorías
            </span>
          </div>
          {MEGA_MENU.map((cat, idx) => (
            <Link
              key={cat.title}
              to={cat.to}
              onClick={close}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.875rem 1rem',
                fontSize: '0.9375rem',
                fontWeight: 600,
                color: 'var(--ink)',
                textDecoration: 'none',
                borderTop: idx > 0 ? '1px solid var(--border)' : 'none',
                background: '#fff',
              }}
            >
              {cat.title}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#F5A623"
                strokeWidth="2.5"
                aria-hidden="true"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </Link>
          ))}
        </div>

        {/* Ver todo — destacado */}
        <Link
          to="/collections/roof-roof"
          onClick={close}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.875rem 1rem',
            background: 'var(--surface-cream)',
            border: '1px solid var(--brand-cta)',
            borderRadius: '0.75rem',
            fontSize: '0.9375rem',
            fontWeight: 700,
            color: 'var(--ink)',
            textDecoration: 'none',
          }}
        >
          <span style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
            <span style={{fontSize: '1rem'}}>🐾</span>
            Ver todos los productos
          </span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#F5A623"
            strokeWidth="2.5"
            aria-hidden="true"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </Link>

        {/* ── Contenido del footer ── */}
        <div
          style={{
            marginTop: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.625rem',
          }}
        >
          {/* Columnas de links */}
          {[
            {
              heading: 'Guías y ayuda',
              links: [
                {
                  label: 'Selector de productos',
                  to: '/pages/selector-de-productos',
                },
                {label: 'Guía de medidas', to: '/pages/guia-de-tallas'},
                {label: 'Centro de cuidado', to: '/pages/centro-de-cuidado'},
                {label: 'Preguntas frecuentes', to: '/pages/ayuda'},
                {
                  label: 'Cambios y devoluciones',
                  to: '/policies/refund-policy',
                },
                {
                  label: 'Aviso de privacidad',
                  to: '/policies/privacy-policy',
                },
                {
                  label: 'Términos del servicio',
                  to: '/policies/terms-of-service',
                },
              ],
            },
            {
              heading: 'Roof Roof',
              links: [
                {label: 'Beneficios Roof', to: '/pages/beneficios-roof'},
                {label: 'Nueva mascota', to: '/pages/nueva-mascota'},
                {
                  label: 'Blog',
                  to: '/blogs/news',
                  disabled: true,
                  badge: 'Próximamente',
                },
                {
                  label: 'Contacto',
                  to: '/pages/contacto',
                  disabled: true,
                  badge: 'Próximamente',
                },
              ],
            },
          ].map((col) => (
            <div
              key={col.heading}
              style={{
                background: '#fff',
                border: '1px solid var(--border)',
                borderRadius: '0.75rem',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  padding: '0.625rem 1rem',
                  background: 'var(--surface-cool)',
                  borderBottom: '1px solid var(--border)',
                }}
              >
                <span
                  style={{
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    color: 'var(--ink-soft)',
                    letterSpacing: '0.8px',
                    textTransform: 'uppercase',
                  }}
                >
                  {col.heading}
                </span>
              </div>
              {col.links.map(({label, to, badge, disabled}, idx) => {
                const content = (
                  <>
                    <span
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        minWidth: 0,
                      }}
                    >
                      {label}
                      {badge ? (
                        <span className="rr-coming-soon-badge rr-coming-soon-badge--mobile">
                          {badge}
                        </span>
                      ) : null}
                    </span>
                    {!disabled ? (
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#b0a49c"
                        strokeWidth="2.5"
                        aria-hidden="true"
                      >
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    ) : null}
                  </>
                );
                const sharedStyle = {
                  display: 'flex',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  fontSize: '0.9375rem',
                  color: 'var(--ink)',
                  textDecoration: 'none',
                  border: 0,
                  borderTop: idx > 0 ? '1px solid var(--border-soft)' : 'none',
                  background: '#fff',
                  fontFamily: 'inherit',
                  textAlign: 'left',
                };

                return disabled ? (
                  <button
                    aria-label={`${label}, próximamente`}
                    className="rr-disabled-link"
                    disabled
                    key={label}
                    style={sharedStyle}
                    type="button"
                  >
                    {content}
                  </button>
                ) : (
                  <Link key={label} onClick={close} style={sharedStyle} to={to}>
                    {content}
                  </Link>
                );
              })}
            </div>
          ))}

          {/* Social */}
          <div
            style={{
              background: 'var(--ink)',
              borderRadius: '0.75rem',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}
          >
            <p
              style={{
                fontSize: '0.6875rem',
                fontWeight: 700,
                color: 'var(--brand-cta)',
                letterSpacing: '0.8px',
                textTransform: 'uppercase',
                margin: 0,
              }}
            >
              Síguenos
            </p>
            <div style={{display: 'flex', gap: '0.75rem'}}>
              {[
                {
                  label: 'Instagram',
                  href: 'https://instagram.com/roofroof.mx',
                  path: 'M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z',
                  extra: (
                    <>
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </>
                  ),
                },
                {
                  label: 'Facebook',
                  href: 'https://facebook.com/roofroof.mx',
                  path: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z',
                },
                {
                  label: 'TikTok',
                  href: 'https://tiktok.com/@roofroof.mx',
                  path: 'M9 12a4 4 0 104 4V4a5 5 0 005 5',
                },
              ].map(({label, href, path, extra}) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--border)',
                    textDecoration: 'none',
                    transition: 'background 0.15s',
                  }}
                >
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    aria-hidden="true"
                  >
                    {extra}
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
            <p
              style={{
                fontSize: '0.75rem',
                color: 'rgba(232,228,220,0.5)',
                margin: 0,
              }}
            >
              © {new Date().getFullYear()} Roof Roof · Todos los derechos
              reservados
            </p>
          </div>
        </div>
      </nav>

      {/* Footer sticky */}
      <div
        style={{
          padding: '1rem 1.25rem',
          background: '#fff',
          borderTop: '1px solid var(--border)',
          flexShrink: 0,
        }}
      >
        <button
          onClick={close}
          style={{
            width: '100%',
            background: 'var(--ink)',
            color: 'var(--brand-cta)',
            border: 'none',
            borderRadius: '0.625rem',
            padding: '0.875rem',
            fontSize: '0.9375rem',
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: 'inherit',
            letterSpacing: '0.3px',
          }}
        >
          Cerrar menú
        </button>
      </div>
    </div>
  );
}
