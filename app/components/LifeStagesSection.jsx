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

        {/* ── Banner imagen full-width ── */}
        <Link
          to="/collections/roof-roof"
          style={{
            display: 'block',
            width: '100%',
            marginBottom: '2rem',
            textDecoration: 'none',
            overflow: 'hidden',
            lineHeight: 0,
          }}
        >
          <img
            src="https://cdn.shopify.com/s/files/1/0761/8252/0128/files/BANNER_1_1b7f3085-4a14-45c0-b625-e57bd4147fb3.jpg?v=1771959465"
            alt="Espacios pensados para vidas más felices"
            style={{
              width: '100%',
              height: isMobile ? '140px' : '220px',
              objectFit: 'cover',
              objectPosition: 'center',
              display: 'block',
            }}
          />
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