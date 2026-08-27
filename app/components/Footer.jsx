import {Suspense} from 'react';
import {Await, Link, NavLink} from 'react-router';
import logo from '~/assets/logo.png';

const FOOTER_COLS = [
  {
    heading: 'Comprar',
    links: [
      {label: 'Todos los productos', to: '/collections/roof-roof'},
      {label: 'Casas para mascotas', to: '/collections/roof-roof-casas'},
      {label: 'Camas', to: '/collections/roof-roof-camas'},
      {label: 'Jaulas y corrales', to: '/collections/roof-roof-jaulas'},
      {label: 'Dispensadores', to: '/collections/roof-roof-dispensadores'},
    ],
  },
  {
    heading: 'Te ayudamos a elegir',
    links: [
      {label: 'Selector de productos', to: '/pages/selector-de-productos'},
      {label: 'Guía de medidas', to: '/pages/guia-de-tallas'},
      {label: 'Centro de cuidado', to: '/pages/centro-de-cuidado'},
      {label: 'Nueva mascota', to: '/pages/nueva-mascota'},
      {label: 'Preguntas frecuentes', to: '/pages/ayuda'},
    ],
  },
  {
    heading: 'Roof Roof',
    links: [
      {label: 'Beneficios Roof', to: '/pages/beneficios-roof'},
      {
        label: 'Blog',
        to: '/blogs/news',
        badge: 'Próximamente',
        disabled: true,
      },
      {
        label: 'Contacto',
        to: '/pages/contacto',
        badge: 'Próximamente',
        disabled: true,
      },
      {
        label: 'Mi cuenta',
        to: '/account',
        badge: 'Próximamente',
        disabled: true,
      },
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
  return (
    <footer className="rr-footer">
      <div className="rr-footer__inner">
        <div className="rr-footer__grid">
          <div className="rr-footer__brand">
            <Link to="/" aria-label="Ir al inicio de Roof Roof">
              <img className="rr-footer__logo" src={logo} alt="Roof Roof" />
            </Link>

            <p className="rr-footer__copy">
              Espacios y accesorios para mascotas con herramientas que te ayudan
              a elegir mejor. Compra con información clara, atención cercana,
              envío a todo México y procesos transparentes.
            </p>

            <div className="rr-footer__social" aria-label="Redes sociales">
              {SOCIAL.map(({label, href, icon}) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                >
                  {icon}
                </a>
              ))}
            </div>

            <div className="rr-footer__trust" aria-label="Beneficios de compra">
              <span>Envío gratis desde $599</span>
              <span>Pago seguro</span>
              <span>Garantía incluida</span>
            </div>
          </div>

          {FOOTER_COLS.map((column) => (
            <FooterColumn
              className="rr-footer__desktop-column"
              column={column}
              key={column.heading}
            />
          ))}

          <div className="rr-footer__mobile-columns">
            {FOOTER_COLS.map((column) => (
              <details
                className="rr-footer__mobile-column"
                key={column.heading}
              >
                <summary>
                  <span>{column.heading}</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    aria-hidden="true"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </summary>
                <FooterLinks links={column.links} />
              </details>
            ))}
          </div>
        </div>

        <div className="rr-footer__bottom">
          <p>
            © {new Date().getFullYear()} Roof Roof · Una marca de Treggo ·
            Monterrey, México
          </p>

          <Suspense fallback={null}>
            <Await resolve={footerPromise}>
              {(footer) => (
                <FooterLegalLinks
                  menu={footer?.menu ?? FALLBACK_FOOTER_MENU}
                  primaryDomainUrl={header?.shop?.primaryDomain?.url}
                  publicStoreDomain={publicStoreDomain}
                />
              )}
            </Await>
          </Suspense>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({column, className = ''}) {
  return (
    <div className={className}>
      <h2 className="rr-footer__title">{column.heading}</h2>
      <FooterLinks links={column.links} />
    </div>
  );
}

function FooterLinks({links}) {
  return (
    <ul className="rr-footer__links">
      {links.map(({label, to, badge, disabled}) => (
        <li key={to}>
          {disabled ? (
            <span
              aria-disabled="true"
              className="rr-disabled-link"
              title={`${label} estará disponible próximamente`}
            >
              <span>{label}</span>
              <span className="rr-coming-soon-badge rr-coming-soon-badge--footer">
                {badge}
              </span>
            </span>
          ) : (
            <Link to={to} prefetch="intent">
              <span>{label}</span>
              {badge ? (
                <span className="rr-coming-soon-badge rr-coming-soon-badge--footer">
                  {badge}
                </span>
              ) : null}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}

function FooterLegalLinks({menu, primaryDomainUrl, publicStoreDomain}) {
  return (
    <nav className="rr-footer__legal" aria-label="Información legal">
      {(menu?.items ?? FALLBACK_FOOTER_MENU.items).map((item) => {
        if (!item.url) return null;

        const isStoreUrl =
          item.url.includes('myshopify.com') ||
          (publicStoreDomain && item.url.includes(publicStoreDomain)) ||
          (primaryDomainUrl && item.url.includes(primaryDomainUrl));

        const url = isStoreUrl ? new URL(item.url).pathname : item.url;
        const isExternal = !url.startsWith('/');

        return isExternal ? (
          <a key={item.id} href={url} rel="noopener noreferrer" target="_blank">
            {item.title}
          </a>
        ) : (
          <NavLink key={item.id} end prefetch="intent" to={url}>
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

const FALLBACK_FOOTER_MENU = {
  id: 'footer-fallback',
  items: [
    {id: 'privacy', title: 'Privacidad', url: '/policies/privacy-policy'},
    {id: 'refunds', title: 'Devoluciones', url: '/policies/refund-policy'},
    {id: 'shipping', title: 'Envíos', url: '/policies/shipping-policy'},
    {id: 'terms', title: 'Términos', url: '/policies/terms-of-service'},
  ],
};

/** @typedef {import('storefrontapi.generated').FooterQuery} FooterQuery */
/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
