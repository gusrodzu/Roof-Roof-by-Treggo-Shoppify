import {Link} from 'react-router';
import {useState, useEffect} from 'react';

const VALUES = [
  {
    title: 'Envío rápido',
    desc: 'Entrega ágil a todo México para que tu mascota no espere.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <rect x="1" y="3" width="15" height="13" rx="1"/>
        <path d="M16 8h3.5a1 1 0 01.9.55L22 12v4h-6"/>
        <circle cx="6" cy="18" r="2"/>
        <circle cx="18" cy="18" r="2"/>
      </svg>
    ),
    accent: '#F5A623',
    bg: '#fff8ee',
    border: '#f0d490',
  },
  {
    title: 'Calidad asegurada',
    desc: 'Productos seleccionados para durar y disfrutarse por mucho tiempo.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <path d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5l8-3z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
    accent: '#acc3fa',
    bg: '#f0f3fd',
    border: '#acc3fa',
  },
  {
    title: 'Soporte excepcional',
    desc: 'Asesoría experta para que tu compra sea siempre la correcta.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
      </svg>
    ),
    accent: '#A8B4E8',
    bg: '#eef0fb',
    border: '#c8d0f0',
  },
];

export function AboutSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <section
      style={{
        padding: isMobile ? '2.5rem 1rem' : '4rem 1.5rem',
    
   
      }}
    >
      <div style={{maxWidth: '1100px', margin: '0 auto'}}>

        {/* Header */}
        <div style={{textAlign: 'center', marginBottom: isMobile ? '1.75rem' : '2.5rem'}}>
          <p style={{
            fontSize: '11px',
            fontWeight: 800,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: '#F5A623',
            marginBottom: '0.5rem',
            margin: '0 0 0.5rem',
          }}>
            Nuestra filosofía
          </p>

          <h2 style={{
            fontSize: isMobile ? '1.375rem' : '1.875rem',
            fontWeight: 800,
            color: '#2C1810',
            margin: '0 0 0.875rem',
            letterSpacing: '-0.02em',
          }}>
            ¿Por qué elegir Roof Roof?
          </h2>

          <p style={{
            fontSize: '0.9375rem',
            color: '#7a6a62',
            maxWidth: '560px',
            margin: '0 auto 1.5rem',
            lineHeight: 1.6,
          }}>
            Diseñamos productos pensados para el bienestar, comodidad y vida diaria de tu mascota.
          </p>

          <Link
            to="/collections/roof-roof"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              borderRadius: '999px',
              background: '#2C1810',
              color: '#F5A623',
              fontWeight: 700,
              fontSize: '0.875rem',
              textDecoration: 'none',
              transition: 'background 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#3d2515')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#2C1810')}
          >
            Explorar productos
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>

       




      </div>
    </section>
  );
}
