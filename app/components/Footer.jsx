import {Suspense} from 'react';
import {Await, NavLink, Link} from 'react-router';
import {useState, useEffect} from 'react';
import logo from '~/assets/logo.png';

const FOOTER_COLS = [
  {
    heading: 'Productos',
    links: [
      {label: 'Casas para mascotas', to: '/collections/roof-roof-casas'},
      {label: 'Camas elevadas', to: '/collections/roof-roof-camas'},
      {label: 'Jaulas y corrales', to: '/collections/roof-roof-jaulas'},
      {label: 'Dispensadores', to: '/collections/roof-roof-dispensadores'},
      {label: 'Ver todo', to: '/collections/roof-roof'},
    ],
  },
  {
    heading: 'Ayuda',
    links: [
      {label: 'Preguntas frecuentes', to: '/pages/ayuda'},
      {label: 'Política de envíos', to: '/policies/shipping-policy'},
      {label: 'Cambios y devoluciones', to: '/policies/refund-policy'},
      {label: 'Términos y condiciones', to: '/policies/terms-of-service'},
      {label: 'Privacidad', to: '/policies/privacy-policy'},
    ],
  },
  {
    heading: 'Empresa',
    links: [
      {label: 'Nosotros', to: '/pages/nosotros'},
      {label: 'Blog', to: '/blogs/news'},
      {label: 'Contacto', to: '/pages/contacto'},
    ],
  },
];

const SOCIAL = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/roofroof.mx',
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        aria-hidden="true"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com/roofroof.mx',
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        aria-hidden="true"
      >
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://tiktok.com/@roofroof.mx',
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        aria-hidden="true"
      >
        <path d="M9 12a4 4 0 104 4V4a5 5 0 005 5" />
      </svg>
    ),
  },
];

export function Footer({footer: footerPromise, header, publicStoreDomain}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <footer style={{background: 'var(--ink)', color: '#ffffff'}}>
      {/* Body */}
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: isMobile ? '2.5rem 1.25rem 1.5rem' : '3.5rem 1.5rem 2rem',
        }}
      >
        {/* Top row: brand + cols */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1.6fr 1fr 1fr 1fr',
            gap: isMobile ? '2rem' : '2.5rem',
            paddingBottom: isMobile ? '2rem' : '2.5rem',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          {/* Brand column */}
          <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
            <Link
              to="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                width: '100%',
              }}
            >
              <img
                src={logo}
                alt="Roof Roof"
                style={{
                  width: '140px',
                  height: 'auto',
                  display: 'block',
                  filter: 'brightness(0) invert(1)',
                }}
              />
            </Link>
            {/* <Link to="/" style={{display: 'inline-block', textDecoration: 'none'}}>
              <span style={{
                fontSize: '1.375rem',
                fontWeight: 900,
                color: 'var(--brand-cta)',
                letterSpacing: '-0.02em',
              }}>
                Roof Roof 🐾
              </span>
            </Link> */}

            <p
              style={{
                fontSize: '0.875rem',
                color: 'rgb(255, 255, 255)',
                lineHeight: 1.65,
                margin: 0,
                maxWidth: '260px',
              }}
            >
              Espacios pensados para vidas más felices. Productos de calidad
              para el bienestar de tu mascota.
            </p>

            {/* Social */}
            <div
              style={{display: 'flex', gap: '0.625rem', marginTop: '0.25rem'}}
            >
              {SOCIAL.map(({label, href, icon}) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    border: '1.5px solid rgba(255,255,255,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgb(255, 255, 255)',
                    textDecoration: 'none',
                    transition:
                      'border-color 0.15s, color 0.15s, background 0.15s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--brand-cta)';
                    e.currentTarget.style.color = 'var(--brand-cta)';
                    e.currentTarget.style.background = 'rgba(245,166,35,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.75)';
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>

            {/* Trust chips */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
                marginTop: '0.25rem',
              }}
            >
              {['Envío gratis +$599', 'Pago seguro', 'Garantía incluida'].map(
                (t) => (
                  <span
                    key={t}
                    style={{
                      fontSize: '0.6875rem',
                      fontWeight: 600,
                      color: 'rgb(255, 255, 255)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: '999px',
                      padding: '3px 10px',
                    }}
                  >
                    {t}
                  </span>
                ),
              )}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLS.map((col) => (
            <div key={col.heading}>
              <p
                style={{
                  fontSize: '0.6875rem',
                  fontWeight: 800,
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  color: 'var(--brand-cta)',
                  margin: '0 0 1rem',
                }}
              >
                {col.heading}
              </p>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.625rem',
                }}
              >
                {col.links.map(({label, to}) => (
                  <li key={label}>
                    <Link
                      to={to}
                      style={{
                        fontSize: '0.875rem',
                        color: 'rgb(255, 255, 255)',
                        textDecoration: 'none',
                        transition: 'color 0.15s',
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = 'var(--brand-cta)')
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = 'rgb(255, 255, 255)')
                      }
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'flex-start' : 'center',
            justifyContent: 'space-between',
            gap: '0.75rem',
            paddingTop: '1.5rem',
          }}
        >
          <p
            style={{
              fontSize: '0.75rem',
              color: 'rgb(255, 255, 255)',
              margin: 0,
            }}
          >
            © {new Date().getFullYear()} Roof Roof · Una marca de Treggo ·
            Monterrey, México
          </p>

          {/* Shopify / Hydrogen badge */}
          <Suspense fallback={null}>
            <Await resolve={footerPromise}>
              {(footer) =>
                footer?.menu && header.shop.primaryDomain?.url ? (
                  <FooterLegalLinks
                    menu={footer.menu}
                    primaryDomainUrl={header.shop.primaryDomain.url}
                    publicStoreDomain={publicStoreDomain}
                  />
                ) : null
              }
            </Await>
          </Suspense>
        </div>
      </div>
    </footer>
  );
}

function FooterLegalLinks({menu, primaryDomainUrl, publicStoreDomain}) {
  return (
    <nav
      style={{display: 'flex', flexWrap: 'wrap', gap: '0.5rem 1.25rem'}}
      role="navigation"
      aria-label="Legal"
    >
      {(menu || FALLBACK_FOOTER_MENU).items.map((item) => {
        if (!item.url) return null;
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        const isExternal = !url.startsWith('/');
        const linkStyle = {
          fontSize: '0.75rem',
          color: 'rgb(255, 255, 255)',
          textDecoration: 'none',
          transition: 'color 0.15s',
        };
        return isExternal ? (
          <a
            key={item.id}
            href={url}
            rel="noopener noreferrer"
            target="_blank"
            style={linkStyle}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--brand-cta)')}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = 'rgba(232,228,220,0.45)')
            }
          >
            {item.title}
          </a>
        ) : (
          <NavLink
            key={item.id}
            end
            prefetch="intent"
            to={url}
            style={({isActive}) => ({
              ...linkStyle,
              color: isActive ? 'var(--brand-cta)' : 'rgb(255, 255, 255)',
            })}
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

const FALLBACK_FOOTER_MENU = {
  id: 'gid://shopify/Menu/199655620664',
  items: [
    {
      id: '1',
      title: 'Privacidad',
      type: 'SHOP_POLICY',
      url: '/policies/privacy-policy',
      items: [],
    },
    {
      id: '2',
      title: 'Devoluciones',
      type: 'SHOP_POLICY',
      url: '/policies/refund-policy',
      items: [],
    },
    {
      id: '3',
      title: 'Envíos',
      type: 'SHOP_POLICY',
      url: '/policies/shipping-policy',
      items: [],
    },
    {
      id: '4',
      title: 'Términos',
      type: 'SHOP_POLICY',
      url: '/policies/terms-of-service',
      items: [],
    },
  ],
};

/** @typedef {Object} FooterProps
 * @property {Promise<FooterQuery|null>} footer
 * @property {HeaderQuery} header
 * @property {string} publicStoreDomain
 */
/** @typedef {import('storefrontapi.generated').FooterQuery} FooterQuery */
/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
