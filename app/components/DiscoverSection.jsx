import {Link} from 'react-router';
import {Image} from '@shopify/hydrogen';
import {useState, useEffect} from 'react';

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
  ];

  return (
    <section
      style={{
      
        padding: isMobile ? '2rem 1rem' : '2.5rem 1.5rem',
       
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
        }}
      >
        <h2
          style={{
            fontSize: isMobile ? '1.15rem' : '1.375rem',
            fontWeight: 700,
            color: '#2C1810',
            margin: '0 0 1.25rem',
          }}
        >
          Descubre lo nuevo
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile
              ? '1fr'
              : isTablet
              ? 'repeat(2,1fr)'
              : 'repeat(3,1fr)',
            gap: '1rem',
          }}
        >
          {CARDS.map(({emoji, title, cta, to, product}) => (
            <div
              key={to}
              style={{
                borderRadius: '0.875rem',
                display: 'flex',
                alignItems: 'center',
                background: '#fff',
                border: '1px solid #e5e9f0',
                minHeight: isMobile ? '140px' : '160px',
                padding: '10px',
              }}
            >
              {/* Imagen izquierda */}
              <div
                style={{
                  width: isMobile ? '100px' : '140px',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {product?.featuredImage ? (
                  <Image
                    data={product.featuredImage}
                    sizes={isMobile ? '90px' : '130px'}
                    style={{
                      width: isMobile ? '90px' : '130px',
                      height: isMobile ? '90px' : '130px',
                      objectFit: 'contain',
                      borderRadius: '50%',
                      filter:
                        'drop-shadow(0 8px 16px rgba(91,88,88,.3))',
                    }}
                  />
                ) : (
                  <span
                    style={{
                      fontSize: isMobile ? '3rem' : '4.5rem',
                      filter:
                        'drop-shadow(0 8px 16px rgba(0,0,0,.3))',
                    }}
                  >
                    {emoji}
                  </span>
                )}
              </div>

              {/* Contenido */}
              <div
                style={{
                  flex: 1,
                  padding: isMobile
                    ? '.75rem'
                    : '1.25rem 1.25rem 1.25rem .75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  gap: '.875rem',
                }}
              >
                <p
                  style={{
                    fontSize: isMobile ? '.875rem' : '1rem',
                    fontWeight: 700,
                    color: '#000',
                    margin: 0,
                    lineHeight: 1.4,
                  }}
                >
                  {title}
                </p>
                                <Link
                  to={to}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: '#F5A623',
                    color: '#2C1810',
                    fontWeight: 700,
                    fontSize: isMobile ? '.8125rem' : '.875rem',
                    padding: isMobile
                      ? '.45rem .9rem'
                      : '.5rem 1.125rem',
                    borderRadius: '999px',
                    textDecoration: 'none',
                    alignSelf: 'flex-start',
                    transition: 'background .15s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#d4891a';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#F5A623';
                  }}
                >
                  {cta}

                  <svg
                    width="14"
                    height="14"
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