import {Link} from 'react-router';
import {useState, useEffect} from 'react';

export function PromoBanners() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const BANNERS = [
    {
      img: 'https://cdn.shopify.com/s/files/1/0761/8252/0128/files/Covers_Treggo_7.png?v=1764280862',
      badge: 'IMPERDIBLES',
      sub: 'Roof Roof',
      cta: 'Conoce los productos',
      to: '/collections/roof-roof',


    },
    {
      img: 'https://cdn.shopify.com/s/files/1/0761/8252/0128/files/Covers_Treggo_7.png?v=1764280862',
      badge: 'Camas',
      sub: 'Roof Roof',
      cta: 'Conoce los productos',
      to: '/collections/roof-roof-camas',

    },
  ];

  return (
    <section
      style={{
      
        padding: '2.5rem 1.5rem',
      
       
      }}
    >
      <div style={{maxWidth: '1100px', margin: '0 auto'}}>
        {/* Título */}
        <h2
          style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: 'var(--ink)',
            margin: '0 0 1.25rem',
          }}
        >
          Lo que necesita, cuando lo necesita
        </h2>

        {/* Grid — 2 col desktop, 1 col mobile */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: '1rem',
          }}
        >
          {BANNERS.map((b) => (
            <div key={b.to}>

              {/* Card */}
              <div
                style={{
                  borderRadius: '1rem',
                  overflow: 'hidden',
                  position: 'relative',
                  minHeight: isMobile ? '180px' : '220px',
                  background: '#fff',
                  border: '1px solid #e5e9f0',
                  display: 'flex',
                  alignItems: 'flex-end',
                  marginBottom: '1rem',
                  padding: '5px',
                  margin: '20px',
                }}
              >
                {/* Imagen full bleed */}
                <img
                  src={b.img}
                  alt={b.badge}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />

                {/* Overlay gradiente en la parte inferior */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)',
                  }}
                />

                {/* Badge — esquina superior izquierda */}
                <div
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'rgba(255, 255, 255, 0.75)',
                    backdropFilter: 'blur(4px)',
                    borderRadius: '0.375rem',
                    padding: '0.375rem 0.75rem',
                  }}
                >
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      color: '#000000',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      display: 'block',
                    }}
                  >
                    {b.badge}
                  </span>
                  
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: 500,
                      color: 'rgb(0, 0, 0)',
                      textTransform: 'uppercase',
                      letterSpacing: '2px',
                      display: 'block',
                    }}
                  >
                    {b.sub}
                  </span>
                </div>

                {/* Botón CTA — esquina inferior derecha */}
                <div
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    width: '100%',
                    padding: isMobile ? '0.875rem' : '1.25rem',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Link
                    to={b.to}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.375rem',
                      background: 'var(--brand-cta)',
                      color: 'var(--ink)',
                      fontWeight: 700,
                      fontSize: '0.875rem',
                      padding: '0.625rem 1.25rem',
                      borderRadius: '999px',
                      textDecoration: 'none',
                      transition: 'background 0.15s',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = 'var(--brand-cta-hover)')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = 'var(--brand-cta)')
                    }
                  >
                    {b.cta}
                  </Link>
                </div>
              </div>

              {/* Footer */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 0.25rem 0',
                }}
              >
                <span
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: 'var(--ink)',
                  }}
                >
                  {b.footerLabel}
                </span>
                <Link
                  to={b.to}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.375rem',
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    color: 'rgb(172,195,250)',
                    textDecoration: 'none',
                  }}
                >
                  {b.footerCta}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
