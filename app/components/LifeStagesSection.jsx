import {Link} from 'react-router';
import {useState, useEffect} from 'react';

export function LifeStagesSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const STAGES = [
    {
      img:   'https://cdn.shopify.com/s/files/1/0761/8252/0128/files/ROOF_ROOF_CACHORRO_86f3acf4-4a12-4e1f-a29b-e62343924a4b.png?v=1781896842',
      line1: 'TIENDA PARA',
      line2: 'CACHORRO',
      label: 'Cachorro',
      to:    '/collections/roof-roof-casas',
    },
    {
      img:   'https://cdn.shopify.com/s/files/1/0761/8252/0128/files/3_27d9d71d-bd55-43d6-9cd3-9c50b40f2beb.png?v=1781897825',
      line1: 'TIENDA PARA',
      line2: 'PERRO SENIOR',
      label: 'Perro senior',
      to:    '/collections/roof-roof-camas',
    },
    {
      img:   'https://cdn.shopify.com/s/files/1/0761/8252/0128/files/4_860540ad-0eef-4207-808c-0100a7045aa1.png?v=1781897825',
      line1: 'TIENDA PARA',
      line2: 'GATITO',
      label: 'Gatito',
      to:    '/collections/roof-roof-casas',
    },
    {
      img:   'https://cdn.shopify.com/s/files/1/0761/8252/0128/files/5_019937a0-b1e7-468e-801b-7a89d46e48fe.png?v=1781897825',
      line1: 'TIENDA PARA',
      line2: 'GATO SENIOR',
      label: 'Gato senior',
      to:    '/collections/roof-roof-camas',
    },
  ];

  return (
    <section style={{background: '#fff', padding: isMobile ? '2rem 0' : '2.5rem 0'}}>
      <div style={{width: '100%'}}>

        {/* ── Banner de marca — ancho 100% ── */}
        <Link
          to="/collections/roof-roof"
          style={{
            display: 'block',
            position: 'relative',
            borderRadius: 0,
            overflow: 'hidden',
            marginBottom: '2rem',
            minHeight: isMobile ? '90px' : '110px',
            border: 'none',
            textDecoration: 'none',
            background: 'linear-gradient(90deg, var(--ink) 0%, var(--ink-hover) 55%, var(--ink) 100%)',
            width: '100%',
          }}
        >
          {/* Contenido — centrado con maxWidth interior */}
          <div style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            gap: isMobile ? '0.75rem' : '1.5rem',
            padding: isMobile ? '1rem' : '1.25rem 2rem',
            minHeight: isMobile ? '90px' : '110px',
          }}>
            {/* Logo badge */}
            <div style={{
              width: isMobile ? '44px' : '56px',
              height: isMobile ? '44px' : '56px',
              borderRadius: '0.625rem',
              background: 'var(--brand-cta)',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: isMobile ? '1.25rem' : '1.5rem',
            }}>
              🐾
            </div>

            <div style={{flexShrink: 0, maxWidth: isMobile ? '100px' : '150px'}}>
              <p style={{
                fontSize: isMobile ? '0.6875rem' : '0.75rem',
                fontWeight: 900,
                color: 'rgba(245,166,35,0.85)',
                margin: 0,
                lineHeight: 1.3,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>
                Hecho con amor,<br/>diseñado para durar
              </p>
            </div>

            <div style={{flex: 1, minWidth: 0}}>
              <h3 style={{
                fontSize: isMobile ? '1rem' : '1.5rem',
                fontWeight: 800,
                color: '#fff',
                margin: 0,
                lineHeight: 1.2,
              }}>
                Espacios pensados para vidas más felices*
              </h3>
              {!isMobile && (
                <p style={{
                  fontSize: '0.875rem',
                  color: 'rgba(232,228,220,0.65)',
                  margin: '0.375rem 0 0',
                }}>
                  *Gracias a materiales resistentes y diseño funcional.
                </p>
              )}
            </div>

            {/* Arrow indicator */}
            {!isMobile && (
              <div style={{
                flexShrink: 0,
                width: '40px', height: '40px',
                borderRadius: '50%',
                border: '2px solid rgba(245,166,35,0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F5A623" strokeWidth="2.5" aria-hidden="true">
                  <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
                </svg>
              </div>
            )}
          </div>
        </Link>

        {/* ── Título ── */}
        <h2 style={{
          fontSize: isMobile ? '1.125rem' : '1.25rem',
          fontWeight: 700,
          color: 'var(--ink)',
          margin: '0 0 1.25rem',
          padding: isMobile ? '0 1rem' : '0 1.5rem',
          maxWidth: '1280px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          Cuidamos cada etapa de su vida contigo
        </h2>

        {/* ── Grid 4 tarjetas ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          gap: isMobile ? '0.75rem' : '1rem',
          maxWidth: '1280px',
          margin: '0 auto',
          padding: isMobile ? '0 1rem' : '0 1.5rem',
        }}>
          {STAGES.map((stage) => (
            <Link
              key={stage.to + stage.label}
              to={stage.to}
              style={{
                display: 'block',
                position: 'relative',
                borderRadius: '0.75rem',
                overflow: 'hidden',
                aspectRatio: '3 / 4',
                border: '1.5px solid var(--border)',
                textDecoration: 'none',
                transition: 'border-color 0.15s, transform 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--brand-cta)';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <img
                src={stage.img}
                alt={stage.label}
                style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover'}}
                onError={(e) => {
                  e.currentTarget.src = `https://placehold.co/300x400/e8e4dc/2C1810?text=${encodeURIComponent(stage.label)}`;
                }}
              />

              {/* Overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(44,24,16,0.88) 0%, rgba(44,24,16,0.15) 50%, transparent 75%)',
              }}/>

              {/* Texto */}
              <div style={{
                position: 'absolute',
                bottom: 0, left: 0, right: 0,
                padding: isMobile ? '0.75rem' : '1rem',
              }}>
                <p style={{
                  fontSize: isMobile ? '0.625rem' : '0.75rem',
                  fontWeight: 600,
                  color: 'rgba(245,166,35,0.85)',
                  margin: 0,
                  lineHeight: 1.3,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}>
                  {stage.line1}
                </p>
                <p style={{
                  fontSize: isMobile ? '0.875rem' : '1rem',
                  fontWeight: 800,
                  color: '#fff',
                  margin: 0,
                  lineHeight: 1.2,
                  textTransform: 'uppercase',
                }}>
                  {stage.line2}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}