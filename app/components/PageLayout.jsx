import {Await, Link} from 'react-router';
import {Suspense, useId, useEffect, useState} from 'react';
import {Aside} from '~/components/Aside';
import {Footer} from '~/components/Footer';
import {Header, HeaderMenu} from '~/components/Header';
import {CartMain} from '~/components/CartMain';
import {SEARCH_ENDPOINT, SearchFormPredictive} from '~/components/SearchFormPredictive';
import {SearchResultsPredictive} from '~/components/SearchResultsPredictive';
import {CartAnimationProvider} from '~/components/CartAnimation';
import {BottomNav} from '~/components/BottomNav';

export function PageLayout({cart, children = null, footer, header, isLoggedIn, publicStoreDomain}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);
    const h = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', h);
    // Setea la variable CSS para el padding-bottom del main
    document.documentElement.style.setProperty('--bottom-nav-height', '64px');
    return () => mq.removeEventListener('change', h);
  }, []);
  return (
    <CartAnimationProvider>
      <Aside.Provider>
        {/* Empuja el drawer de carrito/búsqueda debajo del header sticky */}
        <style>{`
          .overlay aside {
            top: var(--header-height, 0px) !important;
            height: calc(100vh - var(--header-height, 0px)) !important;
          }
          .overlay .close-outside {
            top: var(--header-height, 0px) !important;
          }
        `}</style>
        <CartAside cart={cart} />
        <SearchAside />
        <MobileMenuAside header={header} publicStoreDomain={publicStoreDomain} />
        {header && (
          <Header
            header={header}
            cart={cart}
            isLoggedIn={isLoggedIn}
            publicStoreDomain={publicStoreDomain}
          />
        )}
        <main style={{paddingBottom: isMobile ? 'var(--bottom-nav-height, 64px)' : '0'}}>
          {children}
        </main>
        {!isMobile && <Footer footer={footer} header={header} publicStoreDomain={publicStoreDomain} />}
        {isMobile && <BottomNav cart={cart} isLoggedIn={isLoggedIn} />}
      </Aside.Provider>
    </CartAnimationProvider>
  );
}

/* ── Cart aside ── */
function CartAside({cart}) {
  return (
    <Aside type="cart" heading="Tu carrito">
      <Suspense fallback={
        <div style={{padding: '2rem', textAlign: 'center', color: '#7a6a62', fontSize: '0.875rem'}}>
          Cargando carrito...
        </div>
      }>
        <Await resolve={cart}>
          {(cart) => <CartMain cart={cart} layout="aside" />}
        </Await>
      </Suspense>
    </Aside>
  );
}

/* ── Search aside ── */
function SearchAside() {
  const queriesDatalistId = useId();

  return (
    <Aside type="search" heading="Buscar">
      <div style={{display: 'flex', flexDirection: 'column', height: '100%', padding: '1rem'}}>

        {/* Input de búsqueda */}
        <SearchFormPredictive>
          {({fetchResults, goToSearch, inputRef}) => (
            <div style={{display: 'flex', gap: '0.5rem', marginBottom: '1rem'}}>
              <div style={{flex: 1, position: 'relative'}}>
                <svg
                  width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="#b0a49c" strokeWidth="2"
                  style={{position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none'}}
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <input
                  name="q"
                  onChange={fetchResults}
                  onFocus={fetchResults}
                  placeholder="Buscar productos..."
                  ref={inputRef}
                  type="search"
                  list={queriesDatalistId}
                  style={{
                    width: '100%', padding: '0.625rem 0.75rem 0.625rem 2.25rem',
                    border: '1.5px solid #e8e4dc', borderRadius: '0.5rem',
                    fontSize: '0.875rem', color: '#2C1810',
                    fontFamily: 'inherit', outline: 'none',
                    background: '#faf9f7', transition: 'border-color 0.15s',
                    boxSizing: 'border-box',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#acc3fa')}
                  onBlur={(e) => (e.target.style.borderColor = '#e8e4dc')}
                />
              </div>
              <button
                onClick={goToSearch}
                style={{
                  padding: '0.625rem 1rem',
                  background: '#F5A623', color: '#2C1810',
                  border: 'none', borderRadius: '0.5rem',
                  fontWeight: 700, fontSize: '0.875rem',
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
        </SearchFormPredictive>

        {/* Resultados predictivos */}
        <div style={{flex: 1, overflowY: 'auto'}}>
          <SearchResultsPredictive>
            {({items, total, term, state, closeSearch}) => {
              const {articles, collections, pages, products, queries} = items;

              if (state === 'loading' && term.current) {
                return (
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', gap: '0.5rem', color: '#7a6a62', fontSize: '0.875rem'}}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                      style={{animation: 'spin 0.8s linear infinite', flexShrink: 0}} aria-hidden="true">
                      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                    </svg>
                    Buscando...
                  </div>
                );
              }

              if (!total) {
                return <SearchResultsPredictive.Empty term={term} />;
              }

              return (
                <div style={{display: 'flex', flexDirection: 'column', gap: '0.25rem'}}>
                  <SearchResultsPredictive.Queries
                    queries={queries}
                    queriesDatalistId={queriesDatalistId}
                  />
                  <SearchResultsPredictive.Products
                    products={products}
                    closeSearch={closeSearch}
                    term={term}
                  />
                  <SearchResultsPredictive.Collections
                    collections={collections}
                    closeSearch={closeSearch}
                    term={term}
                  />
                  <SearchResultsPredictive.Pages
                    pages={pages}
                    closeSearch={closeSearch}
                    term={term}
                  />
                  <SearchResultsPredictive.Articles
                    articles={articles}
                    closeSearch={closeSearch}
                    term={term}
                  />

                  {term.current && total > 0 && (
                    <Link
                      onClick={closeSearch}
                      to={`${SEARCH_ENDPOINT}?q=${encodeURIComponent(term.current)}`}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '0.375rem',
                        marginTop: '0.75rem', padding: '0.625rem 0.75rem',
                        fontSize: '0.875rem', fontWeight: 700,
                        color: '#acc3fa', textDecoration: 'none',
                        borderTop: '1px solid #f0ece6',
                        transition: 'color 0.15s',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#F5A623')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#acc3fa')}
                    >
                      Ver todos los resultados de "{term.current}"
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                        <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
                      </svg>
                    </Link>
                  )}
                </div>
              );
            }}
          </SearchResultsPredictive>
        </div>
      </div>
    </Aside>
  );
}

/* ── Mobile menu aside ── */
function MobileMenuAside({header, publicStoreDomain}) {
  return (
    header.menu &&
    header.shop.primaryDomain?.url && (
      <Aside type="mobile" heading="Menú">
        <HeaderMenu
          menu={header.menu}
          viewport="mobile"
          primaryDomainUrl={header.shop.primaryDomain.url}
          publicStoreDomain={publicStoreDomain}
        />
      </Aside>
    )
  );
}

/**
 * @typedef {Object} PageLayoutProps
 * @property {Promise<CartApiQueryFragment|null>} cart
 * @property {Promise<FooterQuery|null>} footer
 * @property {HeaderQuery} header
 * @property {Promise<boolean>} isLoggedIn
 * @property {string} publicStoreDomain
 * @property {React.ReactNode} [children]
 */
/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
/** @typedef {import('storefrontapi.generated').FooterQuery} FooterQuery */
/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */