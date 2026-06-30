import {Link} from 'react-router';

/**
 * ProductTrustBar — estilo Petco
 *
 * Props:
 *   items       — array de { icon, title, desc, cta?, to? }
 *   headline    — texto sobre las cards (opcional)
 *   highlight   — texto destacado debajo del headline (opcional)
 *   bg          — color de fondo de la sección (default: '#e8f4fb')
 *   cardBg      — color de fondo de las cards (default: '#fff')
 *   accentColor — color del ícono circle y CTA (default: 'var(--brand-cta)')
 *   textColor   — color de títulos (default: 'var(--ink)')
 */

const DEFAULT_ITEMS = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <path d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5l8-3z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
    title: 'Garantía en tus compras',
    desc: 'Nuestros productos cuentan con garantías de satisfacción.',
    cta: 'Conoce más →',
    to: '/policies/refund-policy',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <rect x="1" y="3" width="15" height="13" rx="1"/>
        <path d="M16 8h3.5a1 1 0 01.9.55L22 12v4h-6"/>
        <circle cx="6" cy="18" r="2"/>
        <circle cx="18" cy="18" r="2"/>
      </svg>
    ),
    title: 'Envío gratis',
    desc: 'En compras mayores a $599. Entrega en 4-7 días hábiles a todo México.',
    cta: 'Conoce más →',
    to: '/policies/shipping-policy',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <rect x="2" y="5" width="20" height="14" rx="2"/>
        <line x1="2" y1="10" x2="22" y2="10"/>
        <path d="M7 11V7a5 5 0 0110 0v4" opacity="0"/>
        <rect x="3" y="11" width="18" height="7" rx="1" opacity="0"/>
        <path d="M7 15h.01M11 15h4"/>
      </svg>
    ),
    title: '100% seguro',
    desc: 'Todas tus compras en roofroof.mx están protegidas con pagos seguros.',
    cta: null,
    to: null,
  },
];

export function ProductTrustBar({
  items       = DEFAULT_ITEMS,
  headline    = 'Si algún producto no te quedó o no le gustó a tu mascota',
  highlight   = '¡Lo puedes cambiar o te devolvemos el 100% de tu dinero!',
  bg          = '#e8f5fb',
  cardBg      = '#fff',
  accentColor = 'var(--brand-cta)',
  textColor   = 'var(--ink)',
}) {
  return (
    <section style={{background: bg, width: '100%', padding: '2.5rem 1.5rem'}}>

      {/* Headline + highlight */}
      {(headline || highlight) && (
        <div style={{textAlign: 'center', marginBottom: '1.75rem', maxWidth: '680px', margin: '0 auto 1.75rem'}}>
          {headline && (
            <p style={{fontSize: '1.0625rem', fontWeight: 700, color: textColor, margin: '0 0 0.625rem', lineHeight: 1.4}}>
              {headline}
            </p>
          )}
          {highlight && (
            <span style={{
              display: 'inline-block',
              background: accentColor,
              color: textColor,
              fontWeight: 700,
              fontSize: '0.9375rem',
              padding: '0.5rem 1.25rem',
              borderRadius: '0.375rem',
            }}>
              {highlight}
            </span>
          )}
        </div>
      )}

      {/* Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fit, minmax(240px, 1fr))`,
        gap: '1rem',
        maxWidth: '1100px',
        margin: '0 auto',
      }}>
        {items.map(({icon, title, desc, cta, to}) => (
          <div
            key={title}
            style={{
              background: cardBg,
              border: '1px solid rgba(44,24,16,0.08)',
              borderRadius: '0.875rem',
              padding: '1.5rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem',
              boxShadow: '0 2px 8px rgba(44,24,16,0.05)',
            }}
          >
            {/* Ícono en círculo */}
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              background: `${accentColor}18`,
              color: accentColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              {icon}
            </div>

            {/* Texto + CTA */}
            <div style={{flex: 1}}>
              <h3 style={{fontSize: '0.9375rem', fontWeight: 700, color: textColor, margin: '0 0 0.375rem', lineHeight: 1.3}}>
                {title}
              </h3>
              <p style={{fontSize: '0.875rem', color: 'var(--ink-soft)', margin: cta ? '0 0 0.875rem' : 0, lineHeight: 1.6}}>
                {desc}
              </p>
              {cta && to && (
                <Link
                  to={to}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    padding: '0.5rem 1rem',
                    borderRadius: '999px',
                    background: textColor,
                    color: '#fff',
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    transition: 'opacity 0.15s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                >
                  {cta}
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}