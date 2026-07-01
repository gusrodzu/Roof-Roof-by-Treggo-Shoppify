import {Link} from 'react-router';
import {useState, useEffect} from 'react';
import {Button} from '~/components/design-system';

const VALUES = [
  {
    title: 'Garantía en tus compras',
    desc: 'Nuestros productos cuentan con garantías de satisfacción.',
    to: '/pages/ayuda',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <path d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5l8-3z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
  },
  {
    title: 'Envío gratis',
    desc: 'En compras mayores a $599. Entrega en 4-7 días hábiles a todo México.',
    to: '/policies/shipping-policy',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <rect x="1" y="3" width="15" height="13" rx="1"/>
        <path d="M16 8h3.5a1 1 0 01.9.55L22 12v4h-6"/>
        <circle cx="6" cy="18" r="2"/>
        <circle cx="18" cy="18" r="2"/>
      </svg>
    ),
  },
  {
    title: '100% seguro',
    desc: 'Todas tus compras en roofroof.mx están protegidas con pagos seguros.',
    to: '/policies/privacy-policy',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <rect x="2" y="5" width="20" height="14" rx="2"/>
        <line x1="2" y1="10" x2="22" y2="10"/>
      </svg>
    ),
  },
];

export function ProductTrustBar() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <section style={{
      background: '#e3b67670',
      padding: isMobile ? '2.5rem 1rem' : '3.5rem 1.5rem',
    }}>
      <div style={{maxWidth: '1100px', margin: '0 auto'}}>

        {/* ── Headline + CTA garantía ── */}
        <div style={{textAlign: 'center', marginBottom: isMobile ? '2rem' : '2.5rem'}}>
          <p style={{
            fontSize: isMobile ? '1rem' : '1.125rem',
            fontWeight: 600,
            color: 'var(--ink)',
            margin: '0 0 1rem',
            lineHeight: 1.5,
          }}>
            Si algún producto no te quedó o no le gustó a tu mascota
          </p>

          <Link to="/policies/refund-policy" style={{textDecoration: 'none', display: 'inline-block'}}>
            <Button
              variant="primary"
              size="lg"
              style={{
                borderRadius: '0.625rem',
                boxShadow: '0 4px 16px rgba(245,166,35,0.35)',
              }}
            >
              ¡Lo puedes cambiar o te devolvemos el 100% de tu dinero!
            </Button>
          </Link>
        </div>

        {/* ── Cards de valores ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: '1rem',
        }}>
          {VALUES.map(({title, desc, to, icon}) => (
            <ValueCard key={title} title={title} desc={desc} to={to} icon={icon} />
          ))}
        </div>

      </div>
    </section>
  );
}

function ValueCard({title, desc, to, icon}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        background: '#fff',
        borderRadius: '1rem',
        padding: '1.5rem',
        border: `1.5px solid ${hovered ? 'var(--brand-cta)' : 'transparent'}`,
        boxShadow: hovered
          ? '0 8px 24px rgba(44,24,16,0.1)'
          : '0 2px 8px rgba(44,24,16,0.06)',
        transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.2s',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Ícono */}
      <div style={{
        width: '48px', height: '48px',
        borderRadius: '0.75rem',
        background: 'var(--surface-cream)',
        border: '1px solid var(--border-gold)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--brand-cta)',
        flexShrink: 0,
      }}>
        {icon}
      </div>

      {/* Texto */}
      <div>
        <h3 style={{
          fontSize: '1rem', fontWeight: 700,
          color: 'var(--ink)', margin: '0 0 0.375rem',
        }}>
          {title}
        </h3>
        <p style={{
          fontSize: '0.875rem', color: 'var(--ink-soft)',
          lineHeight: 1.6, margin: 0,
        }}>
          {desc}
        </p>
      </div>

      {/* CTA */}
      {to && (
        <div style={{marginTop: 'auto', paddingTop: '0.5rem'}}>
          <Link to={to} style={{textDecoration: 'none'}}>
            <Button variant="ghost" size="sm" style={{
              background: 'var(--ink)',
              color: 'var(--brand-cta)',
              padding: '0.5rem 1.25rem',
              borderRadius: '999px',
            }}>
              Conocer más →
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}