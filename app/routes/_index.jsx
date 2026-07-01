import {useLoaderData, Link} from 'react-router';
import {useEffect, useState} from 'react';
import {HeroBanner} from '~/components/HeroBanner';
import {TrustBar} from '~/components/TrustBar';
import {CategoryTabs} from '~/components/CategoryTabs';
import {AboutSection} from '~/components/AboutSection';
import {DiscoverSection} from '~/components/DiscoverSection';
import {PromoBanners} from '~/components/PromoBanners';
import {LifeStagesSection} from '~/components/LifeStagesSection';
import { ProductRecommendations } from '~/components/ProductRecommendations';
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
    {collection: recommendedCollection},
  ] = await Promise.all([
    context.storefront.query(FEATURED_ROOF_ROOF_QUERY),
    context.storefront.query(CATEGORY_PRODUCTS_QUERY, {variables: {query: "vendor:'ROOF ROOF' AND product_type:'Casas'", first: 1}}),
    context.storefront.query(CATEGORY_PRODUCTS_QUERY, {variables: {query: "vendor:'ROOF ROOF' AND product_type:'Camas'", first: 1}}),
    context.storefront.query(CATEGORY_PRODUCTS_QUERY, {variables: {query: "vendor:'ROOF ROOF' AND product_type:'Jaulas y Corrales'", first: 1}}),
    context.storefront.query(CATEGORY_PRODUCTS_QUERY, {variables: {query: "vendor:'ROOF ROOF' AND product_type:'Dispensadores'", first: 1}}),
    context.storefront.query(RECOMMENDED_PRODUCTS_QUERY),
  ]);

  const collections = [
    {handle: 'roof-roof-casas',         title: 'Casas',             image: casas.nodes[0]?.featuredImage ?? null},
    {handle: 'roof-roof-camas',         title: 'Camas',             image: camas.nodes[0]?.featuredImage ?? null},
    {handle: 'roof-roof-jaulas',        title: 'Jaulas y corrales', image: jaulas.nodes[0]?.featuredImage ?? null},
    {handle: 'roof-roof-dispensadores', title: 'Dispensadores',     image: dispensadores.nodes[0]?.featuredImage ?? null},
  ];

  const recommendedProducts = (recommendedCollection?.products?.nodes ?? []).map(
    mapProductToCard,
  );

  return {featuredProducts: products.nodes, collections, recommendedProducts};
}

function loadDeferredData({context}) {
  return {};
}

/** Convierte un producto de la Storefront API a las props que espera <ProductRecommendations> */
function mapProductToCard(product) {
  const price = Number(product.priceRange?.minVariantPrice?.amount ?? 0);
  const compareAt = Number(
    product.compareAtPriceRange?.minVariantPrice?.amount ?? 0,
  );
  const hasDiscount = compareAt > price;

  return {
    id: product.id,
    brand: product.vendor,
    title: product.title,
    image: product.featuredImage?.url,
    price,
    compareAtPrice: hasDiscount ? compareAt : null,
    discountPercent: hasDiscount
      ? Math.round((1 - price / compareAt) * 100)
      : null,
    rating: 5,
    url: `/products/${product.handle}`,
  };
}

export default function Homepage() {
  const {featuredProducts, collections, recommendedProducts} = useLoaderData();

  return (
    <div className="rr-home">
      <WelcomePopup />
      <TrustBar />
      <HeroBanner />
      <DiscoverSection products={featuredProducts} />
      <CategoryTabs collections={collections ?? []} />
      <PromoBanners />
      <LifeStagesSection />
      <ProductRecommendations
        title="Recomendados especialmente para ti"
        products={recommendedProducts ?? []}
      />
      <InterestLinks/>
      <AboutSection />
      <ProductTrustBar/>
    
    </div>
  );
}

/* ── WELCOME POPUP ── */
const POPUP_KEY = 'rr_welcome_seen';
const POPUP_DELAY_MS = 1500;

function WelcomePopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail]     = useState('');
  const [sent, setSent]       = useState(false);

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
    // Aquí conectas tu integración de email (Klaviyo, Mailchimp, etc.)
    setSent(true);
    setTimeout(close, 2000);
  };

  if (!visible) return null;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={close}
        aria-hidden="true"
        style={{
          position: 'fixed', inset: 0, zIndex: 300,
          background: 'rgba(79, 79, 83, 0.66)',
          backdropFilter: 'blur(3px)',
          animation: 'fadeIn 0.3s ease',
        }}
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Bienvenida a Roof Roof"
        style={{
          position: 'fixed', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 301,
          width: 'min(480px, calc(100vw - 2rem))',
          background: '#fff',
          borderRadius: '1.25rem',
          overflow: 'hidden',
          boxShadow: '0 32px 80px rgb(44, 24, 16)',
          animation: 'popIn 0.35s cubic-bezier(0.34,1.56,0.64,1)',
        }}
      >
        <style>{`
          @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
          @keyframes popIn  { from { opacity: 0; transform: translate(-50%,-48%) scale(0.94) } to { opacity: 1; transform: translate(-50%,-50%) scale(1) } }
        `}</style>

        {/* Botón cerrar */}
        <button
          onClick={close}
          aria-label="Cerrar"
          style={{
            position: 'absolute', top: '0.875rem', right: '0.875rem', zIndex: 1,
            background: 'rgba(255,255,255,0.8)', border: '1px solid #e8e4dc',
            borderRadius: '50%', width: '32px', height: '32px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: '#2C1810',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        {/* Header con imagen de fondo */}
        <div style={{
          background: 'linear-gradient(135deg, #2C1810 0%, #3d2515 100%)',
          padding: '2rem 2rem 1.5rem',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Patas decorativas */}
          <div style={{position: 'absolute', top: '-10px', right: '-10px', fontSize: '5rem', opacity: 0.07, transform: 'rotate(20deg)', userSelect: 'none'}}>🐾</div>
          <div style={{position: 'absolute', bottom: '-15px', left: '-5px', fontSize: '4rem', opacity: 0.07, transform: 'rotate(-15deg)', userSelect: 'none'}}>🐾</div>

          {/* Badge */}
          <span style={{
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
          }}>
            🐾 Bienvenido a Roof Roof
          </span>

          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 800,
            color: '#fff',
            margin: '0 0 0.5rem',
            lineHeight: 1.25,
          }}>
            Tu mascota merece<br/>lo mejor
          </h2>

          <p style={{
            fontSize: '0.9375rem',
            color: 'rgb(255, 255, 255)',
            margin: 0,
            lineHeight: 1.55,
          }}>
            Suscríbete y obtén <strong style={{color: '#F5A623'}}>10% de descuento</strong> en tu primera compra
          </p>
        </div>

        {/* Body */}
        <div style={{padding: '1.5rem 2rem 2rem'}}>
          {sent ? (
            /* Estado de éxito */
            <div style={{textAlign: 'center', padding: '0.5rem 0'}}>
              <div style={{
                width: '52px', height: '52px', borderRadius: '50%',
                background: '#e8faf4', border: '2px solid #b0ecd9',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 1rem', fontSize: '1.5rem',
              }}>
                ✓
              </div>
              <p style={{fontSize: '1rem', fontWeight: 700, color: '#2C1810', margin: '0 0 0.25rem'}}>
                ¡Listo! Revisa tu correo
              </p>
              <p style={{fontSize: '0.875rem', color: '#7a6a62', margin: 0}}>
                Tu código de descuento está en camino.
              </p>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
                <div style={{display: 'flex', gap: '0.5rem'}}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@correo.com"
                    required
                    style={{
                      flex: 1,
                      padding: '0.75rem 1rem',
                      border: '1.5px solid #e8e4dc',
                      borderRadius: '0.625rem',
                      fontSize: '0.9375rem',
                      color: '#2C1810',
                      outline: 'none',
                      fontFamily: 'inherit',
                      background: '#faf9f7',
                      transition: 'border-color 0.15s',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#F5A623')}
                    onBlur={(e) => (e.target.style.borderColor = '#e8e4dc')}
                  />
                  <button
                    type="submit"
                    style={{
                      padding: '0.75rem 1.25rem',
                      background: '#F5A623',
                      color: '#2C1810',
                      border: 'none',
                      borderRadius: '0.625rem',
                      fontSize: '0.9375rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      whiteSpace: 'nowrap',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#d4891a')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = '#F5A623')}
                  >
                    Obtener 10%
                  </button>
                </div>
                <p style={{fontSize: '0.75rem', color: '#b0a49c', margin: 0, textAlign: 'center'}}>
                  Sin spam. Solo ofertas que valen la pena.
                </p>
              </form>

              {/* Divider */}
              <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '1.125rem 0'}}>
                <div style={{flex: 1, height: '1px', background: '#e8e4dc'}}/>
                <span style={{fontSize: '0.75rem', color: '#b0a49c', fontWeight: 500}}>o explora la tienda</span>
                <div style={{flex: 1, height: '1px', background: '#e8e4dc'}}/>
              </div>

              {/* CTA secundario */}
              <Link
                to="/collections/roof-roof"
                onClick={close}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  padding: '0.75rem',
                  border: '1.5px solid #2C1810',
                  borderRadius: '0.625rem',
                  color: '#2C1810',
                  fontWeight: 700,
                  fontSize: '0.9375rem',
                  textDecoration: 'none',
                  transition: 'background 0.15s, color 0.15s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#2C1810'; e.currentTarget.style.color = '#F5A623'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#2C1810'; }}
              >
                Ver productos
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
                </svg>
              </Link>

              {/* Skip */}
              <button
                onClick={close}
                style={{
                  display: 'block', width: '100%', marginTop: '0.75rem',
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: '0.8125rem', color: '#b0a49c',
                  fontFamily: 'inherit', textAlign: 'center',
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

/**
 * Trae los productos de la colección "recomendados".
 * IMPORTANTE: crea esta colección en el admin de Shopify (Colecciones ->
 * Crear colección -> handle "recomendados") y agrégale los productos que
 * quieras mostrar en el carrusel (pueden ser de cualquier vendor: Hill's,
 * Royal Canin, WholeHearted, etc).
 */
const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  query RecommendedProducts($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collection(handle: "recomendados") {
      products(first: 12) {
        nodes {
          id
          title
          handle
          vendor
          featuredImage { id url altText width height }
          priceRange { minVariantPrice { amount currencyCode } }
          compareAtPriceRange { minVariantPrice { amount currencyCode } }
        }
      }
    }
  }
`;

/** @typedef {import('./+types/_index').Route} Route */
/** @typedef {ReturnType<typeof useLoaderData<typeof loader>>} LoaderReturnData */