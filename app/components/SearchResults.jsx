import {Link} from 'react-router';
import {Image, Money, Pagination} from '@shopify/hydrogen';
import {useState} from 'react';
import {urlWithTrackingParams} from '~/lib/search';

export function SearchResults({term, result, children}) {
  if (!result?.total) return null;
  return children({...result.items, term});
}

SearchResults.Articles = SearchResultsArticles;
SearchResults.Pages    = SearchResultsPages;
SearchResults.Products = SearchResultsProducts;
SearchResults.Empty    = SearchResultsEmpty;

/* ── Productos ── */
function SearchResultsProducts({term, products}) {
  if (!products?.nodes.length) return null;

  return (
    <div style={{marginBottom: '2.5rem'}}>
      <SectionLabel emoji="🏠" label="Productos" count={products.nodes.length} />
      <Pagination connection={products}>
        {({nodes, isLoading, NextLink, PreviousLink}) => (
          <div>
            <PaginationBtn link={PreviousLink} isLoading={isLoading} label="Cargar anteriores" up />
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
              gap: '1rem',
              margin: '0 0 1rem',
            }}>
              {nodes.map((product) => {
                const url     = urlWithTrackingParams({baseUrl: `/products/${product.handle}`, trackingParams: product.trackingParameters, term});
                const price   = product?.selectedOrFirstAvailableVariant?.price;
                const compare = product?.selectedOrFirstAvailableVariant?.compareAtPrice;
                const image   = product?.selectedOrFirstAvailableVariant?.image;
                const discount = compare && price && parseFloat(compare.amount) > parseFloat(price.amount)
                  ? Math.round(((parseFloat(compare.amount) - parseFloat(price.amount)) / parseFloat(compare.amount)) * 100)
                  : null;
                return (
                  <ProductCard
                    key={product.id}
                    url={url}
                    image={image}
                    title={product.title}
                    price={price}
                    compare={compare}
                    discount={discount}
                  />
                );
              })}
            </div>
            <PaginationBtn link={NextLink} isLoading={isLoading} label="Cargar más productos" />
          </div>
        )}
      </Pagination>
    </div>
  );
}

function ProductCard({url, image, title, price, compare, discount}) {
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
        <div style={{background: '#f5f7fa', aspectRatio: '1/1', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          {image ? (
            <Image
              data={image}
              alt={title}
              sizes="200px"
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
        <div style={{padding: '0.75rem'}}>
          <p style={{fontSize: '0.6875rem', fontWeight: 700, color: '#F5A623', margin: '0 0 0.25rem', textTransform: 'uppercase', letterSpacing: '0.5px'}}>Roof Roof</p>
          <p style={{fontSize: '0.8125rem', fontWeight: 600, color: '#2C1810', margin: '0 0 0.375rem', lineHeight: 1.4, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical'}}>
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

/* ── Artículos ── */
function SearchResultsArticles({term, articles}) {
  if (!articles?.nodes.length) return null;
  return (
    <div style={{marginBottom: '2rem'}}>
      <SectionLabel emoji="📄" label="Artículos" count={articles.nodes.length} />
      <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
        {articles.nodes.map((article) => {
          const url = urlWithTrackingParams({baseUrl: `/blogs/${article.handle}`, trackingParams: article.trackingParameters, term});
          return (
            <ContentRow key={article.id} url={url} title={article.title} emoji="📄" sub={article.blog?.title} />
          );
        })}
      </div>
    </div>
  );
}

/* ── Páginas ── */
function SearchResultsPages({term, pages}) {
  if (!pages?.nodes.length) return null;
  return (
    <div style={{marginBottom: '2rem'}}>
      <SectionLabel emoji="📋" label="Páginas" count={pages.nodes.length} />
      <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
        {pages.nodes.map((page) => {
          const url = urlWithTrackingParams({baseUrl: `/pages/${page.handle}`, trackingParams: page.trackingParameters, term});
          return <ContentRow key={page.id} url={url} title={page.title} emoji="📋" />;
        })}
      </div>
    </div>
  );
}

/* ── Vacío ── */
function SearchResultsEmpty() {
  return (
    <div style={{textAlign: 'center', padding: '3rem 1.5rem'}}>
      <p style={{fontSize: '3rem', margin: '0 0 1rem'}}>🔍</p>
      <h3 style={{fontSize: '1.125rem', fontWeight: 700, color: '#2C1810', margin: '0 0 0.5rem'}}>
        Sin resultados
      </h3>
      <p style={{fontSize: '0.9375rem', color: '#7a6a62', margin: '0 0 1.5rem'}}>
        Intenta con otra búsqueda o explora nuestras categorías.
      </p>
      <Link
        to="/collections/roof-roof"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          padding: '0.75rem 1.5rem', borderRadius: '999px',
          background: '#F5A623', color: '#2C1810',
          fontWeight: 700, fontSize: '0.9375rem', textDecoration: 'none',
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

/* ── Helpers compartidos ── */
function SectionLabel({emoji, label, count}) {
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.875rem'}}>
      <span>{emoji}</span>
      <h2 style={{fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', color: '#F5A623', margin: 0}}>
        {label}
      </h2>
      <span style={{fontSize: '0.75rem', color: '#b0a49c', fontWeight: 500}}>({count})</span>
    </div>
  );
}

function ContentRow({url, title, emoji, sub}) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      prefetch="intent"
      to={url}
      style={{
        display: 'flex', alignItems: 'center', gap: '0.875rem',
        padding: '0.875rem 1rem',
        background: '#fff',
        border: `1.5px solid ${hovered ? '#F5A623' : '#e8e4dc'}`,
        borderRadius: '0.75rem', textDecoration: 'none',
        transition: 'border-color 0.15s',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{width: '40px', height: '40px', background: '#f5f7fa', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '1.125rem'}}>
        {emoji}
      </div>
      <div style={{flex: 1, minWidth: 0}}>
        <p style={{fontSize: '0.9375rem', fontWeight: 600, color: '#2C1810', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{title}</p>
        {sub && <p style={{fontSize: '0.75rem', color: '#7a6a62', margin: 0}}>{sub}</p>}
      </div>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#b0a49c" strokeWidth="2.5" aria-hidden="true" style={{flexShrink: 0}}>
        <polyline points="9 18 15 12 9 6"/>
      </svg>
    </Link>
  );
}

function PaginationBtn({link: PLink, isLoading, label, up}) {
  const [hov, setHov] = useState(false);
  return (
    <div style={{display: 'flex', justifyContent: 'center', margin: up ? '0 0 1rem' : '1rem 0 0'}}>
      <PLink>
        <span
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            padding: '0.625rem 1.25rem', borderRadius: '999px',
            border: `1.5px solid ${hov && !isLoading ? '#F5A623' : isLoading ? '#e8e4dc' : '#2C1810'}`,
            background: hov && !isLoading ? '#2C1810' : 'transparent',
            color: isLoading ? '#b0a49c' : hov ? '#F5A623' : '#2C1810',
            fontSize: '0.875rem', fontWeight: 700, transition: 'all 0.15s', cursor: isLoading ? 'wait' : 'pointer',
          }}
          onMouseEnter={() => setHov(true)}
          onMouseLeave={() => setHov(false)}
        >
          {isLoading ? '...' : label}
        </span>
      </PLink>
    </div>
  );
}

/** @typedef {RegularSearchReturn['result']['items']} SearchItems */
/** @typedef {import('~/lib/search').RegularSearchReturn} RegularSearchReturn */
/**
 * @typedef {Pick<SearchItems, ItemType> & Pick<RegularSearchReturn, 'term'>} PartialSearchResult
 * @template {keyof SearchItems} ItemType
 */
/**
 * @typedef {RegularSearchReturn & {
 *   children: (args: SearchItems & {term: string}) => React.ReactNode;
 * }} SearchResultsProps
 */