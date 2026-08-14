import {useLoaderData, Link} from 'react-router';
import {useEffect, useState} from 'react';
import {HeroBanner} from '~/components/HeroBanner';
import {TrustBar} from '~/components/TrustBar';
import {CategoryTabs} from '~/components/CategoryTabs';
import {AboutSection} from '~/components/AboutSection';
import {DiscoverSection} from '~/components/DiscoverSection';
import {PromoBanners} from '~/components/PromoBanners';
import {LifeStagesSection} from '~/components/LifeStagesSection';
import { ProductTrustBar } from '~/components/ProductTrustBar';
import { InterestLinks } from '~/components/InterestLinks';


export const meta = () => [
  {title: 'Roof Roof — Accesorios premium para mascotas'},
  {name: 'description', content: 'Casas, camas, jaulas y dispensadores diseñados para el bienestar de tu mascota. Envío a todo México.'},
];

export async function loader(args) {
  const deferredData = loadDeferredData(args);
  const criticalData = await loadCriticalData(args);
  return {...deferredData, ...criticalData};
}

async function loadCriticalData({context}) {
  const [
    {products},
    {products: casas},
    {products: camas},
    {products: jaulas},
    {products: dispensadores},
  ] = await Promise.all([
    context.storefront.query(FEATURED_ROOF_ROOF_QUERY),
    context.storefront.query(CATEGORY_PRODUCTS_QUERY, {variables: {query: "vendor:'ROOF ROOF' AND product_type:'Casas'", first: 1}}),
    context.storefront.query(CATEGORY_PRODUCTS_QUERY, {variables: {query: "vendor:'ROOF ROOF' AND product_type:'Camas'", first: 1}}),
    context.storefront.query(CATEGORY_PRODUCTS_QUERY, {variables: {query: "vendor:'ROOF ROOF' AND product_type:'Jaulas y Corrales'", first: 1}}),
    context.storefront.query(CATEGORY_PRODUCTS_QUERY, {variables: {query: "vendor:'ROOF ROOF' AND product_type:'Dispensadores'", first: 1}}),
  ]);

  const collections = [
    {handle: 'roof-roof-casas',         title: 'Casas',             image: casas.nodes[0]?.featuredImage ?? null},
    {handle: 'roof-roof-camas',         title: 'Camas',             image: camas.nodes[0]?.featuredImage ?? null},
    {handle: 'roof-roof-jaulas',        title: 'Jaulas y corrales', image: jaulas.nodes[0]?.featuredImage ?? null},
    {handle: 'roof-roof-dispensadores', title: 'Dispensadores',     image: dispensadores.nodes[0]?.featuredImage ?? null},
  ];

  return {featuredProducts: products.nodes, collections};
}

function loadDeferredData({context}) {
  return {};
}

export default function Homepage() {
  const {featuredProducts, collections} = useLoaderData();

  return (
    <div className="rr-home">
      <WelcomePopup />
      <TrustBar />
      <HeroBanner />
      <DiscoverSection products={featuredProducts} />
      {/* <CategoryTabs collections={collections ?? []} /> */}
      <PromoBanners />
      <LifeStagesSection />
      {/* <InterestLinks/> */}
      <AboutSection />
      {/* <ProductTrustBar/> */}
    
    </div>
  );
}

/* ── WELCOME POPUP ── */
const POPUP_KEY = 'rr_welcome_seen';
const POPUP_DELAY_MS = 1500;

function WelcomePopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  useEffect(() => {
    // Solo mostrar si el usuario no lo ha visto en esta sesión
    if (sessionStorage.getItem(POPUP_KEY)) return;

    const timer = setTimeout(() => setVisible(true), POPUP_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  const close = () => {
    sessionStorage.setItem(POPUP_KEY, '1');
    setVisible(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) return;

    // Aquí conectas tu integración de email
    // Klaviyo, Mailchimp, Shopify Forms, etc.
    setSent(true);

    setTimeout(close, 2000);
  };

  if (!visible) return null;

  return (
    <>
      <style>{`
        @keyframes roofRoofFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes roofRoofPopIn {
          from {
            opacity: 0;
            transform: translate(-50%, -48%) scale(0.94);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }

        .welcome-popup-overlay {
          position: fixed;
          inset: 0;
          z-index: 300;
          background: rgba(79, 79, 83, 0.66);
          backdrop-filter: blur(3px);
          -webkit-backdrop-filter: blur(3px);
          animation: roofRoofFadeIn 0.3s ease;
        }

        .welcome-popup {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 301;

          width: min(480px, calc(100vw - 32px));
          max-height: calc(100dvh - 32px);

          background: #fff;
          border-radius: 1.25rem;
          overflow: hidden;

          box-shadow: 0 32px 80px rgba(44, 24, 16, 0.35);

          animation:
            roofRoofPopIn
            0.35s
            cubic-bezier(0.34, 1.56, 0.64, 1);

          display: flex;
          flex-direction: column;
        }

        .welcome-popup-header {
          background: linear-gradient(
            135deg,
            #2c1810 0%,
            #3d2515 100%
          );

          padding: 2rem 2rem 1.5rem;
          text-align: center;

          position: relative;
          overflow: hidden;

          flex-shrink: 0;
        }

        .welcome-popup-content {
          padding: 1.5rem 2rem 2rem;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }

        .welcome-popup-form {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .welcome-popup-form-row {
          display: flex;
          gap: 0.5rem;
          width: 100%;
        }

        .welcome-popup-input {
          flex: 1;
          min-width: 0;

          padding: 0.75rem 1rem;

          border: 1.5px solid #e8e4dc;
          border-radius: 0.625rem;

          font-size: 0.9375rem;
          color: #2c1810;

          outline: none;
          font-family: inherit;

          background: #faf9f7;

          transition: border-color 0.15s, box-shadow 0.15s;

          box-sizing: border-box;
        }

        .welcome-popup-input:focus {
          border-color: #f5a623;
          box-shadow: 0 0 0 3px rgba(245, 166, 35, 0.12);
        }

        .welcome-popup-submit {
          padding: 0.75rem 1.25rem;

          background: #f5a623;
          color: #2c1810;

          border: none;
          border-radius: 0.625rem;

          font-size: 0.9375rem;
          font-weight: 800;

          cursor: pointer;
          font-family: inherit;

          white-space: nowrap;

          transition:
            background 0.15s,
            transform 0.15s;
        }

        .welcome-popup-submit:hover {
          background: #d4891a;
        }

        .welcome-popup-submit:active {
          transform: scale(0.98);
        }

        .welcome-popup-store {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;

          width: 100%;
          box-sizing: border-box;

          padding: 0.75rem;

          border: 1.5px solid #2c1810;
          border-radius: 0.625rem;

          color: #2c1810;

          font-weight: 700;
          font-size: 0.9375rem;

          text-decoration: none;

          transition:
            background 0.15s,
            color 0.15s;
        }

        .welcome-popup-store:hover {
          background: #2c1810;
          color: #f5a623;
        }

        .welcome-popup-close {
          position: absolute;
          top: 0.875rem;
          right: 0.875rem;

          z-index: 5;

          background: rgba(255, 255, 255, 0.9);

          border: 1px solid #e8e4dc;

          border-radius: 50%;

          width: 32px;
          height: 32px;

          display: flex;
          align-items: center;
          justify-content: center;

          cursor: pointer;

          color: #2c1810;

          padding: 0;
        }

        .welcome-popup-close:hover {
          background: #fff;
        }

        /* =========================
           TABLET
        ========================= */

        @media (max-width: 600px) {
          .welcome-popup {
            width: calc(100vw - 24px);
            max-height: calc(100dvh - 24px);
            border-radius: 1rem;
          }

          .welcome-popup-header {
            padding: 1.75rem 1.25rem 1.25rem;
          }

          .welcome-popup-content {
            padding: 1.25rem;
          }
        }

        /* =========================
           MOBILE
        ========================= */

        @media (max-width: 480px) {
          .welcome-popup {
            width: calc(100vw - 20px);
            max-height: calc(100dvh - 20px);
            border-radius: 0.9rem;
          }

          .welcome-popup-header {
            padding:
              1.5rem
              1rem
              1.25rem;
          }

          .welcome-popup-content {
            padding:
              1.125rem
              1rem
              1.25rem;
          }

          .welcome-popup-close {
            top: 0.625rem;
            right: 0.625rem;

            width: 30px;
            height: 30px;
          }

          .welcome-popup-form-row {
            flex-direction: column;
            gap: 0.625rem;
          }

          .welcome-popup-input,
          .welcome-popup-submit {
            width: 100%;
            min-height: 46px;
          }

          .welcome-popup-submit {
            padding: 0.75rem 1rem;
          }
        }

        /* =========================
           MOBILE PEQUEÑO
        ========================= */

        @media (max-width: 360px) {
          .welcome-popup-header {
            padding:
              1.25rem
              0.875rem
              1rem;
          }

          .welcome-popup-content {
            padding:
              1rem
              0.875rem
              1.125rem;
          }
        }

        /* =========================
           REDUCE MOTION
        ========================= */

        @media (prefers-reduced-motion: reduce) {
          .welcome-popup-overlay,
          .welcome-popup {
            animation: none;
          }

          .welcome-popup-input,
          .welcome-popup-submit,
          .welcome-popup-store {
            transition: none;
          }
        }
      `}</style>

      {/* Overlay */}
      <div
        className="welcome-popup-overlay"
        onClick={close}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className="welcome-popup"
        role="dialog"
        aria-modal="true"
        aria-label="Bienvenida a Roof Roof"
      >
        {/* Botón cerrar */}
        <button
          type="button"
          onClick={close}
          aria-label="Cerrar"
          className="welcome-popup-close"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Header */}
        <div className="welcome-popup-header">
          {/* Patas decorativas */}
          <div
            style={{
              position: 'absolute',
              top: '-10px',
              right: '-10px',
              fontSize: '5rem',
              opacity: 0.07,
              transform: 'rotate(20deg)',
              userSelect: 'none',
              pointerEvents: 'none',
            }}
          >
            🐾
          </div>

          <div
            style={{
              position: 'absolute',
              bottom: '-15px',
              left: '-5px',
              fontSize: '4rem',
              opacity: 0.07,
              transform: 'rotate(-15deg)',
              userSelect: 'none',
              pointerEvents: 'none',
            }}
          >
            🐾
          </div>

          {/* Badge */}
          <span
            style={{
              display: 'inline-block',
              background: '#F5A623',
              color: '#2C1810',
              fontSize: '0.6875rem',
              fontWeight: 800,
              padding: '4px 14px',
              borderRadius: '999px',
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              marginBottom: '0.875rem',
            }}
          >
            🐾 Bienvenido a Roof Roof
          </span>

          <h2
            style={{
              fontSize: 'clamp(1.3rem, 5vw, 1.5rem)',
              fontWeight: 800,
              color: '#fff',
              margin: '0 0 0.5rem',
              lineHeight: 1.25,
            }}
          >
            Tu mascota merece
            <br />
            lo mejor
          </h2>

          <p
            style={{
              fontSize: 'clamp(0.85rem, 3.5vw, 0.9375rem)',
              color: '#fff',
              margin: 0,
              lineHeight: 1.55,
            }}
          >
            Suscríbete y obtén{' '}
            <strong style={{ color: '#F5A623' }}>
              10% de descuento
            </strong>{' '}
            en tu primera compra
          </p>
        </div>

        {/* Body */}
        <div className="welcome-popup-content">
          {sent ? (
            /* Estado de éxito */
            <div
              style={{
                textAlign: 'center',
                padding: '0.5rem 0',
              }}
            >
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  background: '#e8faf4',
                  border: '2px solid #b0ecd9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                  fontSize: '1.5rem',
                  color: '#2C1810',
                }}
              >
                ✓
              </div>

              <p
                style={{
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: '#2C1810',
                  margin: '0 0 0.25rem',
                }}
              >
                ¡Listo! Revisa tu correo
              </p>

              <p
                style={{
                  fontSize: '0.875rem',
                  color: '#7a6a62',
                  margin: 0,
                }}
              >
                Tu código de descuento está en camino.
              </p>
            </div>
          ) : (
            <>
              {/* Formulario */}
              <form
                onSubmit={handleSubmit}
                className="welcome-popup-form"
              >
                <div className="welcome-popup-form-row">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@correo.com"
                    required
                    aria-label="Correo electrónico"
                    className="welcome-popup-input"
                  />

                  <button
                    type="submit"
                    className="welcome-popup-submit"
                  >
                    Obtener 10%
                  </button>
                </div>

                <p
                  style={{
                    fontSize: '0.75rem',
                    color: '#b0a49c',
                    margin: 0,
                    textAlign: 'center',
                  }}
                >
                  Sin spam. Solo ofertas que valen la pena.
                </p>
              </form>

              {/* Divider */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  margin: '1.125rem 0',
                }}
              >
                <div
                  style={{
                    flex: 1,
                    height: '1px',
                    background: '#e8e4dc',
                  }}
                />

                <span
                  style={{
                    fontSize: '0.75rem',
                    color: '#b0a49c',
                    fontWeight: 500,
                    whiteSpace: 'nowrap',
                  }}
                >
                  o explora la tienda
                </span>

                <div
                  style={{
                    flex: 1,
                    height: '1px',
                    background: '#e8e4dc',
                  }}
                />
              </div>

              {/* CTA secundario */}
              <Link
                to="/collections/roof-roof"
                onClick={close}
                className="welcome-popup-store"
              >
                Ver productos

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

              {/* Skip */}
              <button
                type="button"
                onClick={close}
                style={{
                  display: 'block',
                  width: '100%',
                  marginTop: '0.75rem',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.8125rem',
                  color: '#b0a49c',
                  fontFamily: 'inherit',
                  textAlign: 'center',
                  padding: '0.25rem',
                }}
              >
                No, gracias
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

/* ── QUERIES ── */
const FEATURED_ROOF_ROOF_QUERY = `#graphql
  query FeaturedRoofRoof($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 6, query: "vendor:'ROOF ROOF'") {
      nodes {
        id title handle
        priceRange { minVariantPrice { amount currencyCode } }
        featuredImage { id url altText width height }
      }
    }
  }
`;

const CATEGORY_PRODUCTS_QUERY = `#graphql
  query CategoryProducts($query: String!, $first: Int!, $country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: $first, query: $query) {
      nodes {
        featuredImage { id url altText width height }
      }
    }
  }
`;

/** @typedef {import('./+types/_index').Route} Route */
/** @typedef {ReturnType<typeof useLoaderData<typeof loader>>} LoaderReturnData */