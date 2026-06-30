import {Link, useFetcher} from 'react-router';
import {Image, Money} from '@shopify/hydrogen';
import React, {useRef, useEffect, useState} from 'react';
import {getEmptyPredictiveSearchResult, urlWithTrackingParams} from '~/lib/search';
import {useAside} from './Aside';

export function SearchResultsPredictive({children}) {
  const aside = useAside();
  const {term, inputRef, fetcher, total, items} = usePredictiveSearch();

  function resetInput() {
    if (inputRef.current) {
      inputRef.current.blur();
      inputRef.current.value = '';
    }
  }

  function closeSearch() {
    resetInput();
    aside.close();
  }

  return children({items, closeSearch, inputRef, state: fetcher.state, term, total});
}

SearchResultsPredictive.Articles    = SearchResultsPredictiveArticles;
SearchResultsPredictive.Collections = SearchResultsPredictiveCollections;
SearchResultsPredictive.Pages       = SearchResultsPredictivePages;
SearchResultsPredictive.Products    = SearchResultsPredictiveProducts;
SearchResultsPredictive.Queries     = SearchResultsPredictiveQueries;
SearchResultsPredictive.Empty       = SearchResultsPredictiveEmpty;

/* ── Productos ── */
function SearchResultsPredictiveProducts({term, products, closeSearch}) {
  if (!products.length) return null;
  return (
    <div style={{marginBottom: '1rem'}}>
      <PredictiveLabel>Productos</PredictiveLabel>
      <ul style={{listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '2px'}}>
        {products.map((product) => {
          const url   = urlWithTrackingParams({baseUrl: `/products/${product.handle}`, trackingParams: product.trackingParameters, term: term.current});
          const price = product?.selectedOrFirstAvailableVariant?.price;
          const image = product?.selectedOrFirstAvailableVariant?.image;
          return (
            <li key={product.id}>
              <PredictiveRow to={url} onClick={closeSearch}>
                {image ? (
                  <div style={{width: '44px', height: '44px', flexShrink: 0, borderRadius: '0.375rem', overflow: 'hidden', background: 'var(--surface-cool)', border: '1px solid var(--border)'}}>
                    <Image data={image} alt={product.title} width={44} height={44} style={{width: '100%', height: '100%', objectFit: 'contain'}}/>
                  </div>
                ) : (
                  <div style={{width: '44px', height: '44px', flexShrink: 0, borderRadius: '0.375rem', background: 'var(--surface-cool)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem'}}>🐾</div>
                )}
                <div style={{flex: 1, minWidth: 0}}>
                  <p style={{fontSize: '0.875rem', fontWeight: 600, color: 'var(--ink)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                    {product.title}
                  </p>
                  {price && <Money data={price} style={{fontSize: '0.8125rem', fontWeight: 700, color: 'var(--ink-soft)'}}/>}
                </div>
                <Chevron />
              </PredictiveRow>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ── Colecciones ── */
function SearchResultsPredictiveCollections({term, collections, closeSearch}) {
  if (!collections.length) return null;
  return (
    <div style={{marginBottom: '1rem'}}>
      <PredictiveLabel>Colecciones</PredictiveLabel>
      <ul style={{listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '2px'}}>
        {collections.map((collection) => {
          const url = urlWithTrackingParams({baseUrl: `/collections/${collection.handle}`, trackingParams: collection.trackingParameters, term: term.current});
          return (
            <li key={collection.id}>
              <PredictiveRow to={url} onClick={closeSearch}>
                {collection.image?.url ? (
                  <div style={{width: '36px', height: '36px', flexShrink: 0, borderRadius: '0.375rem', overflow: 'hidden', background: 'var(--surface-cool)'}}>
                    <Image alt={collection.image.altText ?? ''} src={collection.image.url} width={36} height={36} style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
                  </div>
                ) : (
                  <div style={{width: '36px', height: '36px', flexShrink: 0, borderRadius: '0.375rem', background: '#f0f3fd', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem'}}>📦</div>
                )}
                <span style={{fontSize: '0.875rem', fontWeight: 600, color: 'var(--ink)', flex: 1}}>{collection.title}</span>
                <Chevron />
              </PredictiveRow>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ── Artículos ── */
function SearchResultsPredictiveArticles({term, articles, closeSearch}) {
  if (!articles.length) return null;
  return (
    <div style={{marginBottom: '1rem'}}>
      <PredictiveLabel>Artículos</PredictiveLabel>
      <ul style={{listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '2px'}}>
        {articles.map((article) => {
          const url = urlWithTrackingParams({baseUrl: `/blogs/${article.blog.handle}/${article.handle}`, trackingParams: article.trackingParameters, term: term.current ?? ''});
          return (
            <li key={article.id}>
              <PredictiveRow to={url} onClick={closeSearch}>
                <span style={{fontSize: '1.125rem', flexShrink: 0}}>📄</span>
                <span style={{fontSize: '0.875rem', fontWeight: 600, color: 'var(--ink)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{article.title}</span>
                <Chevron />
              </PredictiveRow>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ── Páginas ── */
function SearchResultsPredictivePages({term, pages, closeSearch}) {
  if (!pages.length) return null;
  return (
    <div style={{marginBottom: '1rem'}}>
      <PredictiveLabel>Páginas</PredictiveLabel>
      <ul style={{listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '2px'}}>
        {pages.map((page) => {
          const url = urlWithTrackingParams({baseUrl: `/pages/${page.handle}`, trackingParams: page.trackingParameters, term: term.current});
          return (
            <li key={page.id}>
              <PredictiveRow to={url} onClick={closeSearch}>
                <span style={{fontSize: '1.125rem', flexShrink: 0}}>📋</span>
                <span style={{fontSize: '0.875rem', fontWeight: 600, color: 'var(--ink)', flex: 1}}>{page.title}</span>
                <Chevron />
              </PredictiveRow>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ── Queries datalist ── */
function SearchResultsPredictiveQueries({queries, queriesDatalistId}) {
  if (!queries.length) return null;
  return (
    <datalist id={queriesDatalistId}>
      {queries.map((s) => s ? <option key={s.text} value={s.text} /> : null)}
    </datalist>
  );
}

/* ── Vacío ── */
function SearchResultsPredictiveEmpty({term}) {
  if (!term.current) return null;
  return (
    <div style={{textAlign: 'center', padding: '1.5rem 1rem'}}>
      <p style={{fontSize: '1.75rem', margin: '0 0 0.5rem'}}>🔍</p>
      <p style={{fontSize: '0.9375rem', fontWeight: 600, color: 'var(--ink)', margin: '0 0 0.25rem'}}>
        Sin resultados
      </p>
      <p style={{fontSize: '0.875rem', color: 'var(--ink-soft)', margin: 0}}>
        No encontramos nada para "{term.current}"
      </p>
    </div>
  );
}

/* ── Helpers de UI ── */
function PredictiveLabel({children}) {
  return (
    <p style={{
      fontSize: '0.6875rem', fontWeight: 800,
      textTransform: 'uppercase', letterSpacing: '1px',
      color: 'var(--brand-cta)', margin: '0 0 0.375rem',
    }}>
      {children}
    </p>
  );
}

function PredictiveRow({to, onClick, children}) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      to={to}
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: '0.625rem',
        padding: '0.5rem 0.625rem', borderRadius: '0.5rem',
        textDecoration: 'none',
        background: hovered ? 'var(--surface-cream)' : 'transparent',
        border: `1px solid ${hovered ? 'var(--border-gold)' : 'transparent'}`,
        transition: 'background 0.15s, border-color 0.15s',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </Link>
  );
}

function Chevron() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c8b8b0" strokeWidth="2.5" aria-hidden="true" style={{flexShrink: 0}}>
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  );
}

/* ── Hook ── */
function usePredictiveSearch() {
  const fetcher  = useFetcher({key: 'search'});
  const term     = useRef('');
  const inputRef = useRef(null);

  if (fetcher?.state === 'loading') {
    term.current = String(fetcher.formData?.get('q') || '');
  }

  useEffect(() => {
    if (!inputRef.current) {
      inputRef.current = document.querySelector('input[type="search"]');
    }
  }, []);

  const {items, total} = fetcher?.data?.result ?? getEmptyPredictiveSearchResult();
  return {items, total, inputRef, term, fetcher};
}

/** @typedef {PredictiveSearchReturn['result']['items']} PredictiveSearchItems */
/** @template T @typedef {import('react-router').Fetcher<T>} Fetcher */
/** @typedef {import('~/lib/search').PredictiveSearchReturn} PredictiveSearchReturn */