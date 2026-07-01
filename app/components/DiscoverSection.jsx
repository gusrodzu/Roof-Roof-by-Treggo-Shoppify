import {Link} from 'react-router';
import {Image} from '@shopify/hydrogen';
import {useState, useEffect} from 'react';
import {Button} from '~/components/design-system';

export function DiscoverSection({products = []}) {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const updateSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
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
      to: '/collections/roof-roof-camas',
      product: products[1] ?? null,
    },
    {
      emoji: '🍽️',
      title: '¡Descubre lo mejor en dispensadores!',
      cta: 'Ver más',
      to: '/collections/roof-roof-dispensadores',
      product: products[2] ?? null,
    },
    {
      emoji: '🪣',
      title: '¡Descubre lo mejor en tapetes!',
      cta: 'Ver más',
      to: '/collections/roof-roof-tapetes',
      product: products[3] ?? null,
    },
  ];

  return (
    <section style={{
      paddingTop: '2rem',
      paddingBottom: '2rem',
      // Sin overflow:hidden — impide el scroll horizontal en mobile
    }}>

      {/* Título */}
      <h2 style={{
        fontSize: isMobile ? '1.15rem' : '1.375rem',
        fontWeight: 700,
        color: 'var(--ink)',
        margin: isMobile ? '0 0 1.25rem 1rem' : '0 0 1.25rem 1.5rem',
      }}>
        Descubre lo nuevo
      </h2>

      {/* ── DESKTOP: grid 4 columnas ── */}
      {!isMobile && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: isTablet ? 'repeat(2,1fr)' : 'repeat(4,1fr)',
          gap: '1rem',
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
        }}>
          {CARDS.map(({emoji, title, cta, to, product}) => (
            <Card key={to} emoji={emoji} title={title} cta={cta} to={to} product={product} isMobile={false} />
          ))}
        </div>
      )}

      {/* ── MOBILE: grid 2 columnas ── */}
      {isMobile && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '0.75rem',
          paddingLeft: '1rem',
          paddingRight: '1rem',
        }}>
          {CARDS.map(({emoji, title, cta, to, product}) => (
            <Card key={to} emoji={emoji} title={title} cta={cta} to={to} product={product} isMobile={true} />
          ))}
        </div>
      )}
    </section>
  );
}

function Card({emoji, title, cta, to, product, isMobile}) {
  return (
    <div style={{
      borderRadius: '0.875rem',
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: isMobile ? 'center' : 'center',
      background: '#fff',
      border: '1px solid var(--border)',
      minHeight: isMobile ? '160px' : '140px',
      padding: '10px',
      width: '100%',
    }}>
      {/* Imagen */}
      <div style={{
        width: isMobile ? '80px' : '140px',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {product?.featuredImage ? (
          <Image
            data={product.featuredImage}
            sizes={isMobile ? '70px' : '130px'}
            style={{
              width: isMobile ? '70px' : '130px',
              height: isMobile ? '70px' : '130px',
              objectFit: 'contain',
              borderRadius: '50%',
              filter: 'drop-shadow(0 8px 16px rgba(91,88,88,.3))',
            }}
          />
        ) : (
          <span style={{
            fontSize: isMobile ? '2.25rem' : '4.5rem',
            filter: 'drop-shadow(0 8px 16px rgba(0,0,0,.3))',
          }}>
            {emoji}
          </span>
        )}
      </div>

      {/* Contenido */}
      <div style={{
        flex: 1,
        padding: isMobile ? '0.625rem' : '1.25rem 1.25rem 1.25rem 0.75rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '0.625rem',
        minWidth: 0,
      }}>
        <p style={{
          fontSize: isMobile ? '0.8125rem' : '1rem',
          fontWeight: 700,
          color: 'var(--ink)',
          margin: 0,
          lineHeight: 1.4,
        }}>
          {title}
        </p>
        <Link to={to} style={{textDecoration: 'none', alignSelf: 'flex-start'}}>
          <Button
            size="sm"
            iconAfter={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
              </svg>
            }
          >
            {cta}
          </Button>
        </Link>
      </div>
    </div>
  );
}