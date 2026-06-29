import {useLoaderData} from 'react-router';
import {Image, Money, Pagination} from '@shopify/hydrogen';
import {useState, useEffect, useRef} from 'react';
import {Link} from 'react-router';
import {SearchForm} from '~/components/SearchForm';
import {urlWithTrackingParams} from '~/lib/search';

export const meta = ({data}) => {
  const term = data?.term ?? '';
  return [{title: term ? `Búsqueda: "${term}" — Roof Roof` : 'Buscar — Roof Roof'}];
};

export async function loader({request, context}) {
  const url    = new URL(request.url);
  const term   = url.searchParams.get('q') ?? '';
  const type   = url.searchParams.get('type') ?? 'PRODUCT';

  if (!term) return {term: '', result: {total: 0, items: {products: {nodes: [], pageInfo: {}}, articles: {nodes: []}, pages: {nodes: []}}}, type};

  const data = await context.storefront.query(SEARCH_QUERY, {
    variables: {
      query:    term,
      first:    24,
      country:  context.storefront.i18n.country,
      language: context.storefront.i18n.language,
    },
  });

  const result = {
    total:   (data?.products?.nodes?.length ?? 0) +
             (data?.articles?.nodes?.length ?? 0) +
             (data?.pages?.nodes?.length ?? 0),
    items: {
      products: data?.products ?? {nodes: [], pageInfo: {}},
      articles: data?.articles ?? {nodes: []},
      pages:    data?.pages    ?? {nodes: []},
    },
  };

  return {term, result, type};
}

export default function SearchPage() {
  const {term, result} = useLoaderData();
  const [isMobile, setIsMobile] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Auto-focus en el input al cargar si no hay término
  useEffect(() => {
    if (!term && inputRef.current) inputRef.current.focus();
  }, [term]);

  const hasProducts = result?.items?.products?.nodes?.length > 0;
  const hasArticles = result?.items?.articles?.nodes?.length > 0;
  const hasPages    = result?.items?.pages?.nodes?.length > 0;
  const hasAny      = hasProducts || hasArticles || hasPages;

  return (
    <div style={{background: '#f5f7fa', minHeight: '100vh'}}>

      {/* ── HERO BUSCADOR ── */}
      <div style={{
        background: '#2C1810',
        padding: isMobile ? '2rem 1rem 2.5rem' : '3rem 1.5rem 3.5rem',
        textAlign: 'center',
      }}>
        <p style={{fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: '#F5A623', margin: '0 0 0.5rem'}}>
          Roof Roof
        </p>
        <h1 style={{
          fontSize: isMobile ? '1.5rem' : '2rem',
          fontWeight: 800, color: '#fff',
          margin: '0 0 1.5rem', lineHeight: 1.2,
        }}>
          {term ? `Resultados para "${term}"` : '¿Qué estás buscando?'}
        </h1>

        {/* Barra de búsqueda */}
        <SearchForm action="/search" method="get">
          {({inputRef: formInputRef}) => (
            <div style={{
              maxWidth: '560px', margin: '0 auto',
              display: 'flex', gap: '0.5rem',
            }}>
              <div style={{flex: 1, position: 'relative'}}>
                <svg
                  width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="#b0a49c" strokeWidth="2"
                  style={{position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none'}}
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <input
                  ref={(el) => { formInputRef.current = el; if (!term) inputRef.current = el; }}
                  name="q"
                  type="search"
                  defaultValue={term}
                  placeholder="Buscar casas, camas, jaulas..."
                  autoComplete="off"
                  style={{
                    width: '100%',
                    padding: '0.875rem 1rem 0.875rem 2.75rem',
                    border: '2px solid rgba(255,255,255,0.15)',
                    borderRadius: '0.75rem',
                    background: 'rgba(255,255,255,0.1)',
                    color: '#fff',
                    fontSize: '1rem',
                    outline: 'none',
                    fontFamily: 'inherit',
                    backdropFilter: 'blur(4px)',
                    transition: 'border-color 0.15s, background 0.15s',
                    boxSizing: 'border-box',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#F5A623';
                    e.target.style.background = 'rgba(255,255,255,0.15)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255,255,255,0.15)';
                    e.target.style.background = 'rgba(255,255,255,0.1)';
                  }}
                />
              </div>
              <button
                type="submit"
                style={{
                  padding: '0.875rem 1.5rem',
                  background: '#F5A623', color: '#2C1810',
                  border: 'none', borderRadius: '0.75rem',
                  fontSize: '0.9375rem', fontWeight: 800,
                  cursor: 'pointer', fontFamily: 'inherit',
                  whiteSpace: 'nowrap', flexShrink: 0,
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#d4891a')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#F5A623')}
              >
                Buscar
              </button>
            </div>
          )}
        </SearchForm>

        {/* Sugerencias rápidas si no hay término */}
        {!term && (
          <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '1.25rem'}}>
            {['Casas para perro', 'Camas elevadas', 'Jaulas plegables', 'Dispensadores'].map((s) => (
              <a
                key={s}
                href={`/search?q=${encodeURIComponent(s)}`}
                style={{
                  fontSize: '0.8125rem', fontWeight: 600,
                  color: 'rgba(232,228,220,0.85)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '999px', padding: '0.375rem 0.875rem',
                  textDecoration: 'none', background: 'rgba(255,255,255,0.07)',
                  transition: 'border-color 0.15s, color 0.15s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#F5A623'; e.currentTarget.style.color = '#F5A623'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'rgba(232,228,220,0.85)'; }}
              >
                {s}
              </a>
            ))}
          </div>
        )}

        {/* Contador de resultados */}
        {term && (
          <p style={{fontSize: '0.875rem', color: 'rgba(232,228,220,0.6)', marginTop: '1rem', marginBottom: 0}}>
            {result?.total ?? 0} resultado{result?.total !== 1 ? 's' : ''} encontrado{result?.total !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      {/* ── CONTENIDO ── */}
      <div style={{maxWidth: '1100px', margin: '0 auto', padding: isMobile ? '1.5rem 1rem' : '2.5rem 1.5rem'}}>

        {/* Sin búsqueda aún */}
        {!term && (
          <EmptySearch isMobile={isMobile} />
        )}

        {/* Sin resultados */}
        {term && !hasAny && (
          <NoResults term={term} isMobile={isMobile} />
        )}

        {/* Productos */}
        {hasProducts && (
          <section style={{marginBottom: '2.5rem'}}>
            <SectionLabel icon="🏠" label="Productos" count={result.items.products.nodes.length} />
            <Pagination connection={result.items.products}>
              {({nodes, isLoading, NextLink, PreviousLink}) => (
                <div>
                  <PaginationButton link={PreviousLink} isLoading={isLoading} label="Cargar anteriores" up />
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: isMobile ? '0.75rem' : '1rem',
                    margin: '0 0 1rem',
                  }}>
                    {nodes.map((product) => {
                      const url   = urlWithTrackingParams({baseUrl: `/products/${product.handle}`, trackingParams: product.trackingParameters, term});
                      const price = product?.selectedOrFirstAvailableVariant?.price;
                      const image = product?.selectedOrFirstAvailableVariant?.image;
                      const compare = product?.selectedOrFirstAvailableVariant?.compareAtPrice;
                      const discount = compare && parseFloat(compare.amount) > parseFloat(price?.amount ?? '0')
                        ? Math.round(((parseFloat(compare.amount) - parseFloat(price.amount)) / parseFloat(compare.amount)) * 100)
                        : null;
                      return (
                        <SearchProductCard
                          key={product.id}
                          url={url}
                          image={image}
                          title={product.title}
                          price={price}
                          compare={compare}
                          discount={discount}
                          isMobile={isMobile}
                        />
                      );
                    })}
                  </div>
                  <PaginationButton link={NextLink} isLoading={isLoading} label="Cargar más productos" />
                </div>
              )}
            </Pagination>
          </section>
        )}

        {/* Artículos */}
        {hasArticles && (
          <section style={{marginBottom: '2rem'}}>
            <SectionLabel icon="📄" label="Artículos del blog" count={result.items.articles.nodes.length} />
            <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
              {result.items.articles.nodes.map((article) => {
                const url = urlWithTrackingParams({baseUrl: `/blogs/${article.blog?.handle}/${article.handle}`, trackingParams: article.trackingParameters, term});
                return (
                  <Link
                    key={article.id}
                    prefetch="intent"
                    to={url}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.875rem',
                      padding: '0.875rem 1rem',
                      background: '#fff', border: '1.5px solid #e8e4dc', borderRadius: '0.75rem',
                      textDecoration: 'none', transition: 'border-color 0.15s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#F5A623')}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#e8e4dc')}
                  >
                    <div style={{width: '40px', height: '40px', background: '#fff8ee', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '1.125rem'}}>
                      📄
                    </div>
                    <div style={{flex: 1, minWidth: 0}}>
                      <p style={{fontSize: '0.9375rem', fontWeight: 600, color: '#2C1810', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{article.title}</p>
                      {article.blog?.title && <p style={{fontSize: '0.75rem', color: '#7a6a62', margin: 0}}>{article.blog.title}</p>}
                    </div>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#b0a49c" strokeWidth="2.5" aria-hidden="true" style={{flexShrink: 0}}>
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Páginas */}
        {hasPages && (
          <section style={{marginBottom: '2rem'}}>
            <SectionLabel icon="📋" label="Páginas" count={result.items.pages.nodes.length} />
            <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
              {result.items.pages.nodes.map((page) => {
                const url = urlWithTrackingParams({baseUrl: `/pages/${page.handle}`, trackingParams: page.trackingParameters, term});
                return (
                  <Link
                    key={page.id}
                    prefetch="intent"
                    to={url}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.875rem',
                      padding: '0.875rem 1rem',
                      background: '#fff', border: '1.5px solid #e8e4dc', borderRadius: '0.75rem',
                      textDecoration: 'none', transition: 'border-color 0.15s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#F5A623')}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#e8e4dc')}
                  >
                    <div style={{width: '40px', height: '40px', background: '#f0f3fd', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '1.125rem'}}>
                      📋
                    </div>
                    <p style={{flex: 1, fontSize: '0.9375rem', fontWeight: 600, color: '#2C1810', margin: 0}}>{page.title}</p>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#b0a49c" strokeWidth="2.5" aria-hidden="true" style={{flexShrink: 0}}>
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

/* ── Helpers ── */

function SectionLabel({icon, label, count}) {
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.875rem'}}>
      <span style={{fontSize: '1rem'}}>{icon}</span>
      <h2 style={{fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', color: '#F5A623', margin: 0}}>
        {label}
      </h2>
      <span style={{fontSize: '0.75rem', color: '#b0a49c', fontWeight: 500}}>({count})</span>
    </div>
  );
}

function SearchProductCard({url, image, title, price, compare, discount, isMobile}) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      prefetch="intent"
      to={url}
      style={{textDecoration: 'none', display: 'block'}}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        background: '#fff',
        borderRadius: '0.875rem',
        border: `1.5px solid ${hovered ? '#F5A623' : '#e8e4dc'}`,
        overflow: 'hidden',
        transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.2s',
        boxShadow: hovered ? '0 6px 18px rgba(44,24,16,0.09)' : '0 1px 4px rgba(44,24,16,0.04)',
        transform: hovered ? 'translateY(-2px)' : 'none',
      }}>
        {/* Imagen */}
        <div style={{background: '#f5f7fa', aspectRatio: '1/1', overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          {image ? (
            <Image
              data={image}
              alt={title}
              sizes={isMobile ? '50vw' : '200px'}
              style={{width: '100%', height: '100%', objectFit: 'contain', padding: '0.5rem', transition: 'transform 0.3s', transform: hovered ? 'scale(1.04)' : 'scale(1)'}}
            />
          ) : (
            <span style={{fontSize: '2.5rem'}}>🐾</span>
          )}
          {discount && (
            <span style={{position: 'absolute', top: '0.5rem', left: '0.5rem', background: '#c0392b', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '999px'}}>
              {discount}% OFF
            </span>
          )}
        </div>
        {/* Info */}
        <div style={{padding: isMobile ? '0.625rem' : '0.75rem'}}>
          <p style={{fontSize: '0.6875rem', fontWeight: 700, color: '#F5A623', margin: '0 0 0.25rem', textTransform: 'uppercase', letterSpacing: '0.5px'}}>Roof Roof</p>
          <p style={{fontSize: isMobile ? '0.75rem' : '0.8125rem', fontWeight: 600, color: '#2C1810', margin: '0 0 0.375rem', lineHeight: 1.4, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical'}}>
            {title}
          </p>
          <div style={{display: 'flex', alignItems: 'baseline', gap: '0.375rem', flexWrap: 'wrap'}}>
            {price && <Money data={price} style={{fontSize: '1rem', fontWeight: 800, color: '#2C1810'}}/>}
            {compare && parseFloat(compare.amount) > parseFloat(price?.amount ?? '0') && (
              <Money data={compare} style={{fontSize: '0.75rem', color: '#b0a49c', textDecoration: 'line-through'}}/>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

function PaginationButton({link: PaginationLink, isLoading, label, up}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div style={{display: 'flex', justifyContent: 'center', margin: up ? '0 0 1rem' : '0'}}>
      <PaginationLink>
        {isLoading ? (
          <span style={{display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.625rem 1.25rem', borderRadius: '999px', border: '1.5px solid #e8e4dc', color: '#b0a49c', fontSize: '0.875rem', fontWeight: 700}}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{animation: 'spin 0.8s linear infinite'}} aria-hidden="true">
              <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
            </svg>
            Cargando...
          </span>
        ) : (
          <span
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.625rem 1.25rem', borderRadius: '999px',
              border: `1.5px solid ${hovered ? '#F5A623' : '#2C1810'}`,
              background: hovered ? '#2C1810' : 'transparent',
              color: hovered ? '#F5A623' : '#2C1810',
              fontSize: '0.875rem', fontWeight: 700,
              cursor: 'pointer', transition: 'all 0.15s',
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {up && <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M12 19l-7-7 7-7"/><path d="M5 12h14"/></svg>}
            {label}
            {!up && <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>}
          </span>
        )}
      </PaginationLink>
    </div>
  );
}

function EmptySearch({isMobile}) {
  const POPULAR = [
    {label: 'Casas para perro', to: '/collections/roof-roof-casas'},
    {label: 'Camas elevadas',   to: '/collections/roof-roof-camas'},
    {label: 'Jaulas y corrales', to: '/collections/roof-roof-jaulas'},
    {label: 'Dispensadores',    to: '/collections/roof-roof-dispensadores'},
  ];
  return (
    <div style={{textAlign: 'center', paddingTop: '1rem'}}>
      <p style={{fontSize: '0.9375rem', color: '#7a6a62', marginBottom: '2rem'}}>
        Explora nuestras categorías más populares
      </p>
      <div style={{display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: '0.75rem', maxWidth: '640px', margin: '0 auto'}}>
        {POPULAR.map(({label, to}) => (
          <Link
            key={to}
            to={to}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              gap: '0.5rem', padding: '1.25rem 0.75rem',
              background: '#fff', border: '1.5px solid #e8e4dc', borderRadius: '0.875rem',
              textDecoration: 'none', color: '#2C1810',
              fontSize: '0.875rem', fontWeight: 600,
              transition: 'border-color 0.15s, transform 0.15s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#F5A623'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e8e4dc'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <span style={{fontSize: '1.5rem'}}>🐾</span>
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function NoResults({term, isMobile}) {
  const SUGGESTIONS = ['casas', 'camas', 'jaulas', 'dispensadores'];
  return (
    <div style={{textAlign: 'center', padding: isMobile ? '2rem 0' : '3rem 0'}}>
      {/* Ilustración */}
      <div style={{fontSize: '3.5rem', marginBottom: '1rem'}}>🔍</div>
      <h2 style={{fontSize: '1.25rem', fontWeight: 800, color: '#2C1810', margin: '0 0 0.5rem'}}>
        Sin resultados para "{term}"
      </h2>
      <p style={{fontSize: '0.9375rem', color: '#7a6a62', margin: '0 0 0.5rem', lineHeight: 1.6}}>
        Verifica que esté bien escrito o intenta con otra palabra.
      </p>
      <p style={{fontSize: '0.875rem', color: '#b0a49c', margin: '0 0 2rem'}}>
        También puedes buscar: {SUGGESTIONS.map((s, i) => (
          <span key={s}>
            <a href={`/search?q=${s}`} style={{color: '#F5A623', fontWeight: 600, textDecoration: 'none'}}>{s}</a>
            {i < SUGGESTIONS.length - 1 ? ', ' : ''}
          </span>
        ))}
      </p>
      <Link
        to="/collections/roof-roof"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          padding: '0.875rem 1.75rem', borderRadius: '999px',
          background: '#F5A623', color: '#2C1810',
          fontWeight: 700, fontSize: '0.9375rem', textDecoration: 'none',
          boxShadow: '0 4px 14px rgba(245,166,35,0.3)',
          transition: 'background 0.15s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = '#d4891a')}
        onMouseLeave={(e) => (e.currentTarget.style.background = '#F5A623')}
      >
        Ver todos los productos
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
        </svg>
      </Link>
    </div>
  );
}

/* ── QUERY ── */
const SEARCH_QUERY = `#graphql
  query Search(
    $query: String!
    $first: Int!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    products: search(query: $query, first: $first, types: [PRODUCT]) {
      nodes {
        ... on Product {
          id title handle trackingParameters
          selectedOrFirstAvailableVariant {
            price { amount currencyCode }
            compareAtPrice { amount currencyCode }
            image { url altText width height }
          }
        }
      }
      pageInfo { hasNextPage hasPreviousPage startCursor endCursor }
    }
    articles: search(query: $query, first: 5, types: [ARTICLE]) {
      nodes {
        ... on Article {
          id title handle trackingParameters
          blog { handle title }
        }
      }
    }
    pages: search(query: $query, first: 5, types: [PAGE]) {
      nodes {
        ... on Page {
          id title handle trackingParameters
        }
      }
    }
  }
`;

/** @typedef {import('./+types/search').Route} Route */
/** @typedef {ReturnType<typeof useLoaderData<typeof loader>>} LoaderReturnData */