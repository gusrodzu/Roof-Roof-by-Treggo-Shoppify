import {Link} from 'react-router';
import {useState, useEffect} from 'react';

/**
 * InterestLinks — "Enlaces de interés" al estilo Petco, adaptado a Roof Roof
 *
 * Props:
 *   title  — encabezado de la sección (default: 'Enlaces de interés')
 *   links  — array de { label, to, headline, sub, imgSrc, imgAlt, accentColor, bg }
 */

const DEFAULT_LINKS = [
  {
    label:       'App exclusiva',
    to:          '/collections/roof-roof',
    headline:    '10% de descuento',
    sub:         'en tu primera compra',
    imgSrc:      'https://cdn.shopify.com/s/files/1/0761/8252/0128/files/dog.png?v=1781818470',
    imgAlt:      'Descuento primera compra',
    accentColor: '#000000',
    bg:          'linear-gradient(135deg, #fff8ee 0%, #fdf0d5 100%)',
    badge:       '🐾 Roof Roof',
  },
  {
    label:       '¡Últimas piezas!',
    to:          '/collections/roof-roof',
    headline:    'Outlet',
    sub:         'Todo para tu mascota a los mejores precios',
    imgSrc:      'https://cdn.shopify.com/s/files/1/0761/8252/0128/files/PORTADACOVAGRISCHICA.jpg?v=1752704348',
    imgAlt:      'Outlet Roof Roof',
    accentColor: '#000000',
    bg:          'linear-gradient(135deg, #fdf0ee 0%, #fde8e8 100%)',
    badge:       '🏷️ Outlet',
  },
  {
    label:       'Guías y consejos',
    to:          '/blogs/news',
    headline:    'Aprende con\nRoof Roof',
    sub:         'Consulta nuestros consejos para tu mascota',
    imgSrc:      'https://cdn.shopify.com/s/files/1/0761/8252/0128/files/ROOF_ROOF_CACHORRO_86f3acf4-4a12-4e1f-a29b-e62343924a4b.png?v=1781896842',
    imgAlt:      'Blog Roof Roof',
    accentColor: '#000000',
    bg:          'linear-gradient(135deg, #f0f3fd 0%, #e4eafc 100%)',
    badge:       '📚 Blog',
  },
];

export function InterestLinks({
  title = 'Enlaces de interés',
  links = DEFAULT_LINKS,
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);
    const h = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', h);
    return () => mq.removeEventListener('change', h);
  }, []);

  return (
    <section style={{padding: isMobile ? '1.5rem 1rem' : '2rem 1.5rem', background: '#fff'}}>
      <div style={{maxWidth: '1100px', margin: '0 auto'}}>

        {/* Título */}
        <h2 style={{
          fontSize: '1rem',
          fontWeight: 700,
          color: '#000000',
          margin: '0 0 1rem',
          letterSpacing: '0.2px',
        }}>
          {title}
        </h2>

        {/* Grid de cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile
            ? 'repeat(2, 1fr)'
            : `repeat(${links.length}, 1fr)`,
          gap: isMobile ? '0.75rem' : '1rem',
        }}>
          {links.map((link) => (
            <InterestCard key={link.to + link.label} link={link} />
          ))}
        </div>
      </div>
    </section>
  );
}

function InterestCard({link}) {
  const [hovered, setHovered] = useState(false);
  const {label, to, headline, sub, imgSrc, imgAlt, accentColor, bg, badge} = link;

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
      <Link
        to={to}
        style={{textDecoration: 'none', display: 'block'}}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Card */}
        <div style={{
          background: bg,
          borderRadius: '0.875rem',
          overflow: 'hidden',
          position: 'relative',
          height: '180px',
        
          transition: 'border-color 0.2s, box-shadow 0.2s',
          boxShadow: hovered ? `0 8px 24px ${accentColor}30` : '0 2px 8px rgba(44,24,16,0.06)',
          display: 'flex',
          alignItems: 'stretch',
        }}>

          {/* Blob decorativo top-left */}
          <div style={{
            position: 'absolute', top: '-18px', left: '-18px',
            width: '72px', height: '72px',
            borderRadius: '50%',
            background: `${accentColor}22`,
            pointerEvents: 'none',
          }}/>

          {/* Blob decorativo bottom-right */}
          <div style={{
            position: 'absolute', bottom: '-20px', right: '-20px',
            width: '90px', height: '90px',
            borderRadius: '50%',
            background: `${accentColor}14`,
            pointerEvents: 'none',
          }}/>

          {/* Contenido izquierdo */}
          <div style={{
            flex: 1,
            padding: '1.125rem 0 1.125rem 1.125rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '0.25rem',
            zIndex: 1,
            minWidth: 0,
          }}>
            {/* Badge */}
            <span style={{
              fontSize: '0.6875rem',
              fontWeight: 800,
              color: accentColor,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}>
              {badge}
            </span>

            {/* Headline */}
            <p style={{
              fontSize: '1.0625rem',
              fontWeight: 800,
              color: '#2C1810',
              margin: 0,
              lineHeight: 1.25,
              whiteSpace: 'pre-line',
            }}>
              {headline}
            </p>

            {/* Sub */}
            <p style={{
              fontSize: '0.8125rem',
              color: '#7a6a62',
              margin: 0,
              lineHeight: 1.45,
            }}>
              {sub}
            </p>
          </div>

          {/* Imagen derecha */}
          <div style={{
            width: '44%',
            flexShrink: 0,
            position: 'relative',
            overflow: 'hidden',
          }}>
            <img
              src={imgSrc}
              alt={imgAlt}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top',
                transition: 'transform 0.35s ease',
                transform: hovered ? 'scale(1.06)' : 'scale(1)',
              }}
            />
          </div>
        </div>
      </Link>

      {/* Label debajo de la card — igual que Petco */}
      <Link
        to={to}
        style={{
          fontSize: '0.8125rem',
          fontWeight: 600,
          color: accentColor,
          textDecoration: 'none',
          paddingLeft: '0.25rem',
          transition: 'opacity 0.15s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.75')}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
      >
        {label} →
      </Link>
    </div>
  );
}
