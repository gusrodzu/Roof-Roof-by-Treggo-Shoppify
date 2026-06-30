import {Await, Link, useNavigate} from 'react-router';
import {useState, useEffect, useRef, useId, Suspense} from 'react';
import {useAside} from '~/components/Aside';
import {useCartAnimation, CartBadge} from '~/components/CartAnimation';
import {IconButton, Button} from '~/components/design-system';
import logo from '~/assets/logo.png';

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

const TRUST_ITEMS = [
  {
    label: 'Envío gratis +$599',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="1" y="3" width="15" height="13" rx="1"/>
        <path d="M16 8h3.5a1 1 0 01.9.55L22 12v4h-6"/>
        <circle cx="6" cy="18" r="2"/>
        <circle cx="18" cy="18" r="2"/>
      </svg>
    ),
  },
  {
    label: 'Entrega en 24-72 hrs',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <circle cx="12" cy="12" r="9"/>
        <path d="M12 7v5l3 2"/>
      </svg>
    ),
  },
  {
    label: 'Pagos seguros',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="2" y="5" width="20" height="14" rx="2"/>
        <line x1="2" y1="10" x2="22" y2="10"/>
      </svg>
    ),
  },
  {
    label: 'Garantía incluida',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5l8-3z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
  },
];

const QUICK_LINKS = [
  {
    label: 'Mi tienda',
    to: '/collections/roof-roof',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    label: 'Ayuda',
    to: '/pages/ayuda',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
  },
  {
    label: 'Tu cuenta',
    to: '/account',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
  },
];

/* ─── TrustBar ─────────────────────────────────────────────────────────────── */

function TrustItem({label, icon}) {
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#e5e9f0', whiteSpace: 'nowrap'}}>
      <span style={{display: 'flex', color: '#ffffff', flexShrink: 0}}>{icon}</span>
      <span style={{fontSize: '1.05rem', fontWeight: 700}}>{label}</span>
    </div>
  );
}

export function TrustBar() {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)');
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

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
    <div style={{background: '#111', borderBottom: '1px solid #222', padding: '0.875rem 1.5rem', borderRadius: '1rem'}}>
      {!isMobile && (
        <div style={{maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexWrap: 'wrap', gap: '0.5rem 1.5rem'}}>
          {TRUST_ITEMS.map(({label, icon}) => <TrustItem key={label} label={label} icon={icon} />)}
        </div>
      )}
      {isMobile && (
        <div style={{position: 'relative', overflow: 'hidden'}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '2.5rem'}}>
            {TRUST_ITEMS.map(({label, icon}, i) => (
              <div
                key={label}
                style={{position: i === 0 ? 'relative' : 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: current === i ? 1 : 0, transition: 'opacity 0.5s ease', pointerEvents: current === i ? 'auto' : 'none'}}
              >
                <TrustItem label={label} icon={icon} />
              </div>
            ))}
          </div>
          <div style={{display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '0.625rem'}}>
            {TRUST_ITEMS.map((_, i) => (
              <button
                key={i}
                onClick={() => restartInterval(i)}
                aria-label={`Ir a item ${i + 1}`}
                style={{width: current === i ? '18px' : '6px', height: '6px', borderRadius: '999px', background: current === i ? '#F5A623' : '#444', border: 'none', padding: 0, cursor: 'pointer', transition: 'width 0.3s ease, background 0.3s ease'}}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Header ────────────────────────────────────────────────────────────────── */

export function Header({header, cart, isLoggedIn, publicStoreDomain}) {
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const searchId = useId();
  const {open} = useAside();

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = e.currentTarget.q.value.trim();
    if (query) navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const iconCircleStyle = {
    background: 'rgb(255, 255, 255)',
    border: 'none',
    borderRadius: '50%',
    width: '60px',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: 'var(--ink)',
    flexShrink: 0,
  };

  const SearchBar = ({id}) => {
    const inputRef = useRef(null);
    const [focused, setFocused] = useState(false);
    const [value, setValue] = useState('');

    // Atajo de teclado: Cmd/Ctrl + K enfoca el buscador
    useEffect(() => {
      const handler = (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
          e.preventDefault();
          inputRef.current?.focus();
        }
      };
      window.addEventListener('keydown', handler);
      return () => window.removeEventListener('keydown', handler);
    }, []);

    const clearSearch = () => {
      setValue('');
      inputRef.current?.focus();
    };

    return (
      <form onSubmit={handleSearchSubmit} role="search" 

      style={{display: 'flex', alignItems: 'center', position: 'relative', width: '100%'     }}>
        <label htmlFor={id} style={{position: 'absolute', width: 1, height: 1, overflow: 'hidden'}}>Buscar productos</label>

        {/* Ícono lupa a la izquierda */}
        <span style={{
          position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)',
          color: focused ? 'var(--brand-cta)' : 'var(--ink-soft)',
          display: 'flex', pointerEvents: 'none', transition: 'color 0.15s',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </span>

        <input
          ref={inputRef}
          id={id}
          name="q"
          type="search"
          placeholder="Croquetas, juguetes…"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          autoComplete="off"
          style={{
            width: '100%',
            background: '#fff',
            border: `1.5px solid ${focused ? 'var(--brand-cta)' : 'var(--border-gold)'}`,
            borderRadius: '999px',
            padding: '0.75rem 2.75rem 0.75rem 2.75rem',
            color: 'black',
            fontSize: '0.9375rem',
            outline: 'none',
            boxSizing: 'border-box',
            boxShadow: focused ? '0 0 0 3px rgba(245,166,35,0.18)' : 'none',
            transition: 'border-color 0.15s, box-shadow 0.15s',
          }}
        />

        {/* Botón limpiar — solo visible con texto */}
        {value && (
          <button
            type="button"
            onClick={clearSearch}
            aria-label="Limpiar búsqueda"
            style={{
              position: 'absolute', right: '2.75rem', top: '50%', transform: 'translateY(-50%)',
              width: '20px', height: '20px', borderRadius: '50%',
              background: 'var(--border)', border: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'var(--ink-soft)', padding: 0,
            }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        )}

        <button type="submit" aria-label="Buscar" style={{position: 'absolute', right: '0.5rem', top: '50%', transform: 'translateY(-50%)', width: '32px', height: '32px', border: 'none', background: 'transparent', cursor: 'pointer'}} />
      </form>
    );
  };

  return (
    <header
      ref={(el) => {
        if (el) {
          const setHeight = () => {
            document.documentElement.style.setProperty('--header-height', el.offsetHeight + 'px');
          };
          setHeight();
          const ro = new ResizeObserver(setHeight);
          ro.observe(el);
        }
      }}
      style={{position: 'sticky', top: 0, zIndex: 50}}
    >

      {/* Barra superior */}
      <div style={{background: '#000000', color: '#fff', textAlign: 'center', fontSize: '12px', fontWeight: 600, padding: '6px 1rem', letterSpacing: '.5px'}}>
        Envío gratis en pedidos desde $599 · Compra protegida con Shopify
      </div>

      {/* Barra principal */}
      <div style={{background: '#f8b32a', padding: '0.75rem 1rem'}}>
        {isMobile ? (
          /* ── MOBILE: solo buscador ── */
          <div style={{display: 'flex', alignItems: 'center'}}>
            <div style={{flex: 1}}>
              <SearchBar id={searchId + '-mobile'} />
            </div>
          </div>
        ) : (
          /* ── DESKTOP ── */
          <div style={{maxWidth: '1280px', margin: '0 auto'}}>

            <div style={{display: 'flex', alignItems: 'center', gap: '1.5rem'}}>

              {/* Logo */}
              <Link to="/" style={{display: 'flex', alignItems: 'center', flexShrink: 0}}>
                <img src={logo} alt="Roof Roof" style={{width: '160px', height: 'auto', display: 'block', filter: 'brightness(0) saturate(100%) invert(9%) sepia(33%) saturate(1200%) hue-rotate(340deg) brightness(0.85)'}}/>
              </Link>

              {/* Buscador */}
              <div style={{flex: 1, maxWidth: '560px'}}>
                <SearchBar id={searchId} />
              </div>

              {/* Nav links + carrito */}
              <div style={{display: 'flex', alignItems: 'center', gap: '0.25rem', marginLeft: 'auto', flexShrink: 0}}>
                {QUICK_LINKS.map(({label, to, icon}) => (
                  <Link
                    key={label}
                    to={to}
                    style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem',
                      padding: '0.375rem 0.625rem', borderRadius: '0.625rem',
                      textDecoration: 'none', color: '#2C1810',
                      fontSize: '0.6875rem', fontWeight: 700,
                      minWidth: '64px', textAlign: 'center',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(44,24,16,0.08)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <span style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      width: '52px', height: '52px', borderRadius: '50%',
                      background: '#fff',
                      color: '#2C1810', flexShrink: 0,
                      boxShadow: '0 1px 4px rgba(44,24,16,0.12)',
                    }}>
                      {icon}
                    </span>
                    {label}
                  </Link>
                ))}

                {/* CartButton */}
                <div style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem',
                  padding: '0.375rem 0.625rem',
                }}>
                  <CartButton cart={cart} badgeShadow="0 0 0 2px #fff" />
                  <span style={{fontSize: '0.6875rem', fontWeight: 700, color: '#2C1810'}}>Carrito</span>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>

    </header>
  );
}

/* ─── CartButton ────────────────────────────────────────────────────────────── */

function CartButton({cart, circleStyle, badgeShadow}) {
  const {open} = useAside();
  const {cartIconRef} = useCartAnimation();

  return (
    <button
      ref={cartIconRef}
      data-cart-icon
      onClick={() => open('cart')}
      aria-label="Abrir carrito"
      style={{
        width: '52px', height: '52px',
        borderRadius: '50%',
        background: '#fff',
        border: 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer',
        color: '#2C1810',
        position: 'relative',
        flexShrink: 0,
        boxShadow: '0 1px 4px rgba(44,24,16,0.12)',
        transition: 'background 0.15s',
      }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <path d="M16 10a4 4 0 01-8 0"/>
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

export function HeaderMenu({menu, primaryDomainUrl, viewport, publicStoreDomain}) {
  const {close} = useAside();

  return (
    <div style={{display: 'flex', flexDirection: 'column', height: '100%', background: '#f5f7fa'}}>

      {/* Header con logo + botón cerrar */}
      <div style={{background: '#f8b32a', padding: '0.875rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0}}>
        <img
          src={logo}
          alt="Roof Roof"
          style={{width: '120px', height: 'auto', filter: 'brightness(0) saturate(100%) invert(9%) sepia(33%) saturate(1200%) hue-rotate(340deg) brightness(0.85)'}}
        />
        <IconButton
          variant="outline"
          size="md"
          onClick={close}
          aria-label="Cerrar menú"
          style={{background: 'rgba(255, 255, 255, 0.57)', border: 'none'}}
          icon={
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          }
        />
      </div>

      {/* Links scrolleables */}
      <nav style={{flex: 1, overflowY: 'auto', padding: '1rem'}}>

        {/* Accesos rápidos — grid 2x2 */}
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.625rem', marginBottom: '1rem'}}>
          {QUICK_LINKS.map(({label, to, icon}) => (
            <Link
              key={label}
              to={to}
              onClick={close}
              style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '1rem 0.5rem', background: '#fff', border: '1px solid #e5e9f0', borderRadius: '0.75rem', textDecoration: 'none', color: '#2C1810', fontSize: '0.8125rem', fontWeight: 600, textAlign: 'center'}}
            >
              <span style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '44px', height: '44px', borderRadius: '50%', background: '#fff8ee', color: '#2C1810'}}>
                {icon}
              </span>
              {label}
            </Link>
          ))}
        </div>

        {/* Card de categorías */}
        <div style={{background: '#fff', border: '1px solid #e8e4dc', borderRadius: '0.75rem', overflow: 'hidden', marginBottom: '0.75rem'}}>
          <div style={{padding: '0.625rem 1rem', background: '#f5f7fa', borderBottom: '1px solid #e8e4dc'}}>
            <span style={{fontSize: '0.6875rem', fontWeight: 700, color: '#7a6a62', letterSpacing: '0.8px', textTransform: 'uppercase'}}>
              Categorías
            </span>
          </div>
          {MEGA_MENU.map((cat, idx) => (
            <Link
              key={cat.title}
              to={cat.to}
              onClick={close}
              style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.875rem 1rem', fontSize: '0.9375rem', fontWeight: 600, color: '#2C1810', textDecoration: 'none', borderTop: idx > 0 ? '1px solid #e8e4dc' : 'none', background: '#fff'}}
            >
              {cat.title}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F5A623" strokeWidth="2.5" aria-hidden="true">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </Link>
          ))}
        </div>

        {/* Ver todo — destacado */}
        <Link
          to="/collections/roof-roof"
          onClick={close}
          style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.875rem 1rem', background: '#fff8ee', border: '1px solid #F5A623', borderRadius: '0.75rem', fontSize: '0.9375rem', fontWeight: 700, color: '#2C1810', textDecoration: 'none'}}
        >
          <span style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
            <span style={{fontSize: '1rem'}}>🐾</span>
            Ver todos los productos
          </span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F5A623" strokeWidth="2.5" aria-hidden="true">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </Link>

        {/* ── Contenido del footer ── */}
        <div style={{marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.625rem'}}>

          {/* Columnas de links */}
          {[
            {
              heading: 'Productos',
              links: [
                {label: 'Casas para mascotas',  to: '/collections/roof-roof-casas'},
                {label: 'Camas elevadas',        to: '/collections/roof-roof-camas'},
                {label: 'Jaulas y corrales',     to: '/collections/roof-roof-jaulas'},
                {label: 'Dispensadores',         to: '/collections/roof-roof-dispensadores'},
              ],
            },
            {
              heading: 'Ayuda',
              links: [
                {label: 'Preguntas frecuentes',    to: '/pages/ayuda'},
                {label: 'Política de envíos',      to: '/policies/shipping-policy'},
                {label: 'Cambios y devoluciones',  to: '/policies/refund-policy'},
                {label: 'Términos y condiciones',  to: '/policies/terms-of-service'},
                {label: 'Privacidad',              to: '/policies/privacy-policy'},
              ],
            },
            {
              heading: 'Empresa',
              links: [
                {label: 'Nosotros', to: '/pages/nosotros'},
                {label: 'Blog',     to: '/blogs/news'},
                {label: 'Contacto', to: '/pages/contacto'},
              ],
            },
          ].map((col) => (
            <div key={col.heading} style={{background: '#fff', border: '1px solid #e8e4dc', borderRadius: '0.75rem', overflow: 'hidden'}}>
              <div style={{padding: '0.625rem 1rem', background: '#f5f7fa', borderBottom: '1px solid #e8e4dc'}}>
                <span style={{fontSize: '0.6875rem', fontWeight: 700, color: '#7a6a62', letterSpacing: '0.8px', textTransform: 'uppercase'}}>
                  {col.heading}
                </span>
              </div>
              {col.links.map(({label, to}, idx) => (
                <Link
                  key={label}
                  to={to}
                  onClick={close}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    fontSize: '0.9375rem', color: '#2C1810', textDecoration: 'none',
                    borderTop: idx > 0 ? '1px solid #f0ece6' : 'none',
                    background: '#fff',
                  }}
                >
                  {label}
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#b0a49c" strokeWidth="2.5" aria-hidden="true">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </Link>
              ))}
            </div>
          ))}

          {/* Social */}
          <div style={{background: '#2C1810', borderRadius: '0.75rem', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
            <p style={{fontSize: '0.6875rem', fontWeight: 700, color: '#F5A623', letterSpacing: '0.8px', textTransform: 'uppercase', margin: 0}}>
              Síguenos
            </p>
            <div style={{display: 'flex', gap: '0.75rem'}}>
              {[
                {label: 'Instagram', href: 'https://instagram.com/roofroof.mx', path: 'M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z', extra: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></>},
                {label: 'Facebook',  href: 'https://facebook.com/roofroof.mx',  path: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z'},
                {label: 'TikTok',    href: 'https://tiktok.com/@roofroof.mx',   path: 'M9 12a4 4 0 104 4V4a5 5 0 005 5'},
              ].map(({label, href, path, extra}) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#e8e4dc', textDecoration: 'none',
                    transition: 'background 0.15s',
                  }}
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                    {extra}
                    <path d={path}/>
                  </svg>
                </a>
              ))}
            </div>
            <p style={{fontSize: '0.75rem', color: 'rgba(232,228,220,0.5)', margin: 0}}>
              © {new Date().getFullYear()} Roof Roof · Todos los derechos reservados
            </p>
          </div>

        </div>

      </nav>

      {/* Footer sticky */}
      <div style={{padding: '1rem 1.25rem', background: '#fff', borderTop: '1px solid #e8e4dc', flexShrink: 0}}>
        <Button
          variant="ghost"
          fullWidth
          onClick={close}
          style={{
            background: 'var(--ink)',
            color: 'var(--brand-cta)',
            borderRadius: '0.625rem',
            padding: '0.875rem',
          }}
        >
          Cerrar menú
        </Button>
      </div>

    </div>
  );
}