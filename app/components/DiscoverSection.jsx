import {Link} from 'react-router';
import {Image} from '@shopify/hydrogen';
import {useState} from 'react';
import {Button} from '~/components/design-system';

const PAWS = [
  {x: '3%', y: '10%', size: 52, rotate: -20, opacity: 0.06},
  {x: '15%', y: '70%', size: 30, rotate: 30, opacity: 0.04},
  {x: '28%', y: '8%', size: 22, rotate: -45, opacity: 0.05},
  {x: '42%', y: '80%', size: 58, rotate: 15, opacity: 0.07},
  {x: '58%', y: '15%', size: 34, rotate: -10, opacity: 0.04},
  {x: '70%', y: '65%', size: 26, rotate: 40, opacity: 0.06},
  {x: '80%', y: '5%', size: 46, rotate: -30, opacity: 0.05},
  {x: '92%', y: '75%', size: 20, rotate: 25, opacity: 0.04},
  {x: '48%', y: '45%', size: 28, rotate: -15, opacity: 0.03},
  {x: '10%', y: '40%', size: 20, rotate: 55, opacity: 0.04},
];

function PawIcon({style}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="var(--brand-cta)"
      style={style}
      aria-hidden="true"
    >
      <ellipse cx="12" cy="15" rx="5.5" ry="4.5" />
      <ellipse cx="6.5" cy="7.5" rx="2" ry="2.5" />
      <ellipse cx="11" cy="5.5" rx="2" ry="2.5" />
      <ellipse cx="15.5" cy="6" rx="2" ry="2.5" />
      <ellipse cx="18.5" cy="9" rx="1.8" ry="2.3" />
    </svg>
  );
}

export function DiscoverSection({
  products = [],
  bannerImage = 'https://cdn.shopify.com/s/files/1/0761/8252/0128/files/IMAGEN_5_BANNER_1.jpg?v=1784647406',
  bannerTo = '/collections/roof-roof',
  bannerAlt = 'Promoción Roof Roof',
  subLabel = '',
  subLink = {
    label: 'Conoce más',
    to: '/collections/roof-roof',
  },
}) {
  const CARDS = [
    {
      title: '¡El refugio que tu mascota merece!',
      cta: 'Ver más',
      to: '/collections/roof-roof-casas',
      product: products[0] ?? null,
    },
    {
      title: '¡Aliméntalos como a tu familia!',
      cta: 'Ver más',
      to: '/collections/roof-roof-dispensadores',
      product: products[1] ?? null,
    },
    {
      title: '¡Descubre lo mejor en camas para mascotas!',
      cta: 'Ver más',
      to: '/collections/roof-roof-camas',
      product: products[2] ?? null,
    },
  ];

  return (
    <>
      <style>{`
        .discover-section {
          position: relative;
          overflow: hidden;
          padding: 2rem 2rem 2.5rem;
        }

        .discover-container {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
        }

        /* =========================
           SUB HEADER
        ========================= */

        .discover-subheader {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 0.875rem;
        }

        .discover-sublabel {
          font-size: 0.8125rem;
          font-weight: 600;
          color: rgba(0, 0, 0, 0.55);
          min-width: 0;
        }

        .discover-sublink {
          display: flex;
          align-items: center;
          gap: 0.375rem;

          font-size: 0.875rem;
          font-weight: 700;

          color: var(--brand-cta);
          text-decoration: none;

          white-space: nowrap;

          transition: opacity 0.2s ease;
        }

        .discover-sublink:hover {
          opacity: 0.75;
        }

        /* =========================
           BANNER
        ========================= */

        .discover-banner {
          display: block;
          width: 100%;

          margin-bottom: 1.5rem;

          border-radius: 1rem;
          overflow: hidden;

          line-height: 0;

          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35);

          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease;
        }

        .discover-banner:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 36px rgba(0, 0, 0, 0.4);
        }

        .discover-banner-image {
          width: 100%;
          height: 200px;

          object-fit: cover;
          object-position: center;

          display: block;

          transition: transform 0.4s ease;
        }

        .discover-banner:hover .discover-banner-image {
          transform: scale(1.02);
        }

        /* =========================
           TITLE
        ========================= */

        .discover-title {
          font-size: 1.375rem;
          font-weight: 700;

          color: #000;

          margin: 0 0 1.25rem;
        }

        /* =========================
           CARDS GRID
        ========================= */

        .discover-grid {
          display: grid;

          grid-template-columns: repeat(3, minmax(0, 1fr));

          gap: 0.875rem;
        }

        /* =========================
           PAWS
        ========================= */

        .discover-paws {
          position: absolute;
          inset: 0;

          z-index: 1;

          pointer-events: none;
        }

        /* =========================
           TABLET
        ========================= */

        @media (max-width: 1023px) {
          .discover-section {
            padding: 1.75rem 1.5rem 2.25rem;
          }

          .discover-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .discover-banner-image {
            height: 180px;
          }
        }

        /* =========================
           MOBILE
        ========================= */

        @media (max-width: 767px) {
          .discover-section {
            padding: 1.5rem 1rem 2rem;
          }

          .discover-subheader {
            margin-bottom: 0.75rem;
          }

          .discover-sublabel {
            font-size: 0.75rem;
          }

          .discover-sublink {
            font-size: 0.8125rem;
          }

          .discover-banner {
            border-radius: 0.875rem;
            margin-bottom: 1.25rem;
          }

          .discover-banner-image {
            height: 130px;
          }

          .discover-title {
            font-size: 1.125rem;
            margin-bottom: 1rem;
          }

          .discover-grid {
            grid-template-columns: 1fr;
            gap: 0.75rem;
          }
        }

        /* =========================
           MOBILE PEQUEÑO
        ========================= */

        @media (max-width: 480px) {
          .discover-section {
            padding:
              1.25rem
              0.75rem
              1.75rem;
          }

          .discover-subheader {
            gap: 0.5rem;
          }

          .discover-sublabel {
            font-size: 0.6875rem;
          }

          .discover-sublink {
            font-size: 0.75rem;
          }

          .discover-banner {
            border-radius: 0.75rem;
          }

          .discover-banner-image {
            height: 105px;
          }

          .discover-title {
            font-size: 1.05rem;
          }
        }

        /* =========================
           ACCESIBILIDAD
        ========================= */

        @media (prefers-reduced-motion: reduce) {
          .discover-banner,
          .discover-banner-image,
          .discover-sublink {
            transition: none;
          }
        }
      `}</style>

      <section className="discover-section">
        {/* Huellas de fondo */}
        <div className="discover-paws">
          {PAWS.map((p, i) => (
            <PawIcon
              key={i}
              style={{
                position: 'absolute',
                left: p.x,
                top: p.y,
                width: p.size,
                height: p.size,
                transform: `rotate(${p.rotate}deg)`,
                opacity: p.opacity,
              }}
            />
          ))}
        </div>

        <div className="discover-container">
          {/* Sub-label + link */}
          <div className="discover-subheader">
            {subLabel ? (
              <span className="discover-sublabel">
                {subLabel}
              </span>
            ) : (
              <span />
            )}

            <Link
              to={subLink.to}
              className="discover-sublink"
            >
              {subLink.label}

              <svg
                width="13"
                height="13"
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

          {/* Banner */}
          <Link
            to={bannerTo}
            className="discover-banner"
            aria-label={bannerAlt}
          >
            <img
              src={bannerImage}
              alt={bannerAlt}
              loading="eager"
              className="discover-banner-image"
            />
          </Link>

          {/* Título */}
          <h2 className="discover-title">
            Descubre lo nuevo
          </h2>

          {/* Cards */}
          <div className="discover-grid">
            {CARDS.map(
              ({title, cta, to, product}) => (
                <Card
                  key={to}
                  title={title}
                  cta={cta}
                  to={to}
                  product={product}
                />
              ),
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function Card({
  title,
  cta,
  to,
  product,
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      style={{
        borderRadius: '1rem',
        background: '#fff',

        border: `1.5px solid ${
          hovered
            ? 'var(--brand-cta)'
            : 'rgba(172,195,250,0.25)'
        }`,

        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',

        display: 'flex',
        flexDirection: 'row',

        alignItems: 'center',

        padding: '1.25rem',
        gap: '1rem',

        transition:
          'border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease',

        transform: hovered
          ? 'translateY(-2px)'
          : 'translateY(0)',

        boxShadow: hovered
          ? '0 8px 24px rgba(0,0,0,0.08)'
          : '0 2px 8px rgba(0,0,0,0.03)',

        minWidth: 0,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Imagen */}
      <div
        style={{
          width: '110px',
          height: '110px',

          flexShrink: 0,

          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {product?.featuredImage ? (
          <Image
            data={product.featuredImage}
            sizes="(max-width: 767px) 90px, 110px"
            style={{
              width: '100%',
              height: '100%',

              objectFit: 'contain',

              filter:
                'drop-shadow(0 6px 12px rgba(0,0,0,.35))',

              borderRadius: '5rem',
            }}
          />
        ) : null}
      </div>

      {/* Texto + CTA */}
      <div
        style={{
          flex: 1,
          minWidth: 0,

          display: 'flex',
          flexDirection: 'column',

          alignItems: 'flex-start',

          gap: '0.75rem',

          textAlign: 'left',
        }}
      >
        <p
          style={{
            fontSize: '1rem',
            fontWeight: 700,

            color: '#000',

            margin: 0,

            lineHeight: 1.4,

            overflowWrap: 'break-word',
          }}
        >
          {title}
        </p>

        <Link
          to={to}
          style={{
            textDecoration: 'none',
            display: 'inline-flex',
          }}
        >
          <Button
            size="sm"
            iconAfter={
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
            }
          >
            {cta}
          </Button>
        </Link>
      </div>
    </article>
  );
}