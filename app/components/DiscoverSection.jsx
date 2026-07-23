import {Link} from 'react-router';
import {Image} from '@shopify/hydrogen';
import {useState, useEffect} from 'react';
import {Button} from '~/components/design-system';

const PAWS = [
  {x: '3%',  y: '10%', size: 52, rotate: -20, opacity: 0.06},
  {x: '15%', y: '70%', size: 30, rotate: 30,  opacity: 0.04},
  {x: '28%', y: '8%',  size: 22, rotate: -45, opacity: 0.05},
  {x: '42%', y: '80%', size: 58, rotate: 15,  opacity: 0.07},
  {x: '58%', y: '15%', size: 34, rotate: -10, opacity: 0.04},
  {x: '70%', y: '65%', size: 26, rotate: 40,  opacity: 0.06},
  {x: '80%', y: '5%',  size: 46, rotate: -30, opacity: 0.05},
  {x: '92%', y: '75%', size: 20, rotate: 25,  opacity: 0.04},
  {x: '48%', y: '45%', size: 28, rotate: -15, opacity: 0.03},
  {x: '10%', y: '40%', size: 20, rotate: 55,  opacity: 0.04},
];

function PawIcon({style}) {
  return (
    <svg viewBox="0 0 24 24" fill="var(--brand-cta)" style={style} aria-hidden="true">
      <ellipse cx="12" cy="15" rx="5.5" ry="4.5"/>
      <ellipse cx="6.5" cy="7.5" rx="2" ry="2.5"/>
      <ellipse cx="11" cy="5.5" rx="2" ry="2.5"/>
      <ellipse cx="15.5" cy="6" rx="2" ry="2.5"/>
      <ellipse cx="18.5" cy="9" rx="1.8" ry="2.3"/>
    </svg>
  );
}

export function DiscoverSection({
  products = [],
  bannerImage = 'https://cdn.shopify.com/s/files/1/0761/8252/0128/files/IMAGEN_5_BANNER_1.jpg?v=1784647406',
  bannerTo   = '/collections/roof-roof',
  bannerAlt  = 'Promoción Roof Roof',
  subLabel   = '',
  subLink    = {label: 'Conoce más', to: '/collections/roof-roof'},
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const update = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const CARDS = [
    {
      emoji: '🏠',
      title: '¡El refugio que tu mascota merece!',
      cta: 'Ver más',
      to: '/collections/roof-roof-casas',
      product: products[0] ?? null,
    },
    {
      emoji: '🛏️',
      title: '¡Aliméntalos como a tu familia!',
      cta: 'Ver más',
      
      to: '/collections/roof-roof-dispensadores',
      product: products[1] ?? null,
    },
    {
      emoji: '🍽️',
      title: '¡Descubre lo mejor en camas para mascotas!',
      cta: 'Ver más',
     to: '/collections/roof-roof-camas',
      product: products[2] ?? null,
    },
  
  ];

  const cols = isMobile ? 2 : isTablet ? 2 : 3;

  return (
    <section style={{
      position: 'relative',
  
      overflow: 'hidden',
      padding: isMobile ? '1.5rem 1rem 2rem' : '2rem 2rem 2.5rem',
    }}>

      {/* ── Huellas de fondo ── */}
      <div style={{position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none'}}>
        {PAWS.map((p, i) => (
          <PawIcon key={i} style={{
            position: 'absolute',
            left: p.x, top: p.y,
            width: p.size, height: p.size,
            transform: `rotate(${p.rotate}deg)`,
            opacity: p.opacity,
          }}/>
        ))}
      </div>

      <div style={{position: 'relative', zIndex: 2}}>

        {/* ── Sub-label + link ── */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: '0.875rem',
        }}>
          <span style={{fontSize: '0.8125rem', fontWeight: 600, color: 'rgba(0, 0, 0, 0.55)'}}>
            {subLabel}
          </span>
          <Link to={subLink.to} style={{
            fontSize: '0.875rem', fontWeight: 700,
            color: 'var(--brand-cta)', textDecoration: 'none',
            display: 'flex', alignItems: 'center', gap: '0.375rem',
          }}>
            {subLink.label}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>

        {/* ── Banner imagen ── */}
        <Link to={bannerTo} style={{
          display: 'block', borderRadius: '1rem', overflow: 'hidden',
          marginBottom: '1.5rem', lineHeight: 0,
          boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
        }}>
          <img
            src={bannerImage}
            alt={bannerAlt}
            loading="eager"
            style={{
              width: '100%',
              height: isMobile ? '120px' : '200px',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </Link>

        {/* ── Título ── */}
        <h2 style={{
          fontSize: isMobile ? '1.125rem' : '1.375rem',
          fontWeight: 700,
          color: '#000000',
          margin: '0 0 1.25rem',
        }}>
          Descubre lo nuevo
        </h2>

        {/* ── Grid cards ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gap: '0.875rem',
        }}>
          {CARDS.map(({emoji, title, cta, to, product}) => (
            <Card
              key={to}
              emoji={emoji}
              title={title}
              cta={cta}
              to={to}
              product={product}
              isMobile={isMobile}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

function Card({emoji, title, cta, to, product, isMobile}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        borderRadius: '1rem',
        background: 'rgb(255, 255, 255)',
        border: `1.5px solid ${hovered ? 'var(--brand-cta)' : 'rgba(172,195,250,0.25)'}`,
        backdropFilter: 'blur(8px)',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'center',
        padding: isMobile ? '1rem 0.75rem' : '1.25rem',
        gap: isMobile ? '0.75rem' : '1rem',
        transition: 'border-color 0.2s, transform 0.2s',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        minHeight: isMobile ? '160px' : '130px',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Imagen / emoji */}
      <div style={{
        width: isMobile ? '72px' : '110px',
        height: isMobile ? '72px' : '110px',
        flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {product?.featuredImage ? (
          <Image
            data={product.featuredImage}
            sizes={isMobile ? '72px' : '110px'}
            style={{
              width: '100%', height: '100%',
              objectFit: 'contain',
              filter: 'drop-shadow(0 6px 12px rgba(0,0,0,.35))',
              borderRadius: '5rem',
            }}
          />
        ) : (
          <span style={{
            fontSize: isMobile ? '2.5rem' : '4rem',
            filter: 'drop-shadow(0 6px 12px rgba(0,0,0,.35))',
          }}>
            {emoji}
          </span>
        )}
      </div>

      {/* Texto + CTA */}
      <div style={{
        flex: 1, minWidth: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: isMobile ? 'center' : 'flex-start',
        gap: '0.75rem',
        textAlign: isMobile ? 'center' : 'left',
      }}>
        <p style={{
          fontSize: isMobile ? '0.875rem' : '1rem',
          fontWeight: 700,
          color: '#000000',
          margin: 0, lineHeight: 1.4,
        }}>
          {title}
        </p>

        {/* Botón outline blanco estilo imagen de referencia */}
        <Link to={to} style={{textDecoration: 'none', alignSelf: isMobile ? 'center' : 'flex-start'}}>
          <Button size="sm" iconAfter={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
            </svg>
          }>
            {cta}
          </Button>
        </Link>
      </div>
    </div>
  );
}