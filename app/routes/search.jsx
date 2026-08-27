import {Link, useLoaderData, useNavigation} from 'react-router';
import {
  Image,
  Money,
  Pagination,
  getPaginationVariables,
} from '@shopify/hydrogen';
import {SearchForm} from '~/components/SearchForm';
import {ExperienceIcon} from '~/components/ExperienceIcon';
import {urlWithTrackingParams} from '~/lib/search';
import styles from '~/styles/SearchPage.module.css';

const POPULAR_SEARCHES = [
  'Casas para perro',
  'Camas elevadas',
  'Jaulas plegables',
  'Dispensadores',
];

const POPULAR_CATEGORIES = [
  {
    icon: 'home',
    title: 'Casas',
    copy: 'Refugios para crear una zona cómoda y protegida.',
    to: '/collections/roof-roof-casas',
  },
  {
    icon: 'moon',
    title: 'Camas',
    copy: 'Opciones para mejorar el descanso diario.',
    to: '/collections/roof-roof-camas',
  },
  {
    icon: 'lock',
    title: 'Jaulas y corrales',
    copy: 'Soluciones para delimitar espacios con seguridad.',
    to: '/collections/roof-roof-jaulas',
  },
  {
    icon: 'bowl',
    title: 'Dispensadores',
    copy: 'Organiza agua y alimento con mayor facilidad.',
    to: '/collections/roof-roof-dispensadores',
  },
];

const SEARCH_TYPES = new Set(['all', 'product', 'page']);

export const meta = ({data}) => {
  const term = data?.term ?? '';
  return [
    {title: term ? `Búsqueda: “${term}” — Roof Roof` : 'Buscar — Roof Roof'},
    {
      name: 'description',
      content: term
        ? `Resultados de búsqueda para ${term} en Roof Roof.`
        : 'Busca casas, camas, jaulas, corrales y accesorios para mascotas en Roof Roof.',
    },
    {name: 'robots', content: 'noindex,follow'},
  ];
};

export async function loader({request, context}) {
  const url = new URL(request.url);
  const term = (url.searchParams.get('q') ?? '').trim();
  const requestedType = (url.searchParams.get('type') ?? 'all').toLowerCase();
  const type = SEARCH_TYPES.has(requestedType) ? requestedType : 'all';

  if (!term) {
    return {
      term: '',
      type,
      result: {
        items: {
          products: {nodes: [], pageInfo: {}},
          pages: {nodes: []},
        },
      },
    };
  }

  const paginationVariables = getPaginationVariables(request, {pageBy: 20});
  const data = await context.storefront.query(SEARCH_QUERY, {
    variables: {
      query: term,
      ...paginationVariables,
      country: context.storefront.i18n.country,
      language: context.storefront.i18n.language,
    },
  });

  const products = data?.products ?? {nodes: [], pageInfo: {}};
  const pages = data?.pages ?? {nodes: []};
  const resolvedType =
    (type === 'product' && products.nodes.length === 0) ||
    (type === 'page' && pages.nodes.length === 0)
      ? 'all'
      : type;

  return {
    term,
    type: resolvedType,
    result: {
      items: {products, pages},
    },
  };
}

export default function SearchPage() {
  const {term, type, result} = useLoaderData();
  const navigation = useNavigation();
  const products = result?.items?.products?.nodes ?? [];
  const pages = result?.items?.pages?.nodes ?? [];
  const productPageInfo = result?.items?.products?.pageInfo ?? {};
  const hasProducts = products.length > 0;
  const hasPages = pages.length > 0;
  const hasAny = hasProducts || hasPages;
  const showProducts = type !== 'page' && hasProducts;
  const showPages = type !== 'product' && hasPages;
  const isSearching =
    navigation.state !== 'idle' && navigation.location?.pathname === '/search';
  const resultLabel = getResultLabel(
    products.length,
    pages.length,
    productPageInfo,
  );

  return (
    <main className={styles.page}>
      <SearchHero term={term} isSearching={isSearching} />

      <div className={styles.shell}>
        {!term && <SearchLanding />}

        {term && !hasAny && <NoResults term={term} />}

        {term && hasAny && (
          <>
            <ResultsToolbar
              term={term}
              type={type}
              productCount={products.length}
              pageCount={pages.length}
              resultLabel={resultLabel}
            />

            <div
              className={`${styles.resultsLayout} ${
                showProducts && showPages ? styles.resultsLayoutWithAside : ''
              }`}
            >
              {showProducts && (
                <ProductsSection
                  connection={result.items.products}
                  products={products}
                  term={term}
                />
              )}

              {showPages && <PagesSection pages={pages} term={term} />}
            </div>
          </>
        )}
      </div>
    </main>
  );
}

function SearchHero({term, isSearching}) {
  return (
    <section
      className={styles.hero}
      data-theme="dark"
      aria-labelledby="search-page-title"
    >
      <div className={styles.heroDecor} aria-hidden="true" />
      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>
            <span className={styles.eyebrowIcon}>
              <ExperienceIcon name="paw" size={16} />
            </span>
            Búsqueda Roof Roof
          </span>
          <h1 id="search-page-title">
            {term ? (
              <>
                Resultados para <span>“{term}”</span>
              </>
            ) : (
              'Encuentra lo que necesita tu mascota'
            )}
          </h1>
          <p>
            Busca por producto, categoría o necesidad. También puedes comenzar
            con una de nuestras sugerencias.
          </p>
        </div>

        <SearchForm action="/search" method="get" className={styles.form}>
          {({inputRef}) => (
            <div className={styles.searchPanel}>
              <label className={styles.inputWrap}>
                <span className="sr-only">Buscar productos o información</span>
                <span className={styles.searchIcon} aria-hidden="true">
                  <SearchIcon />
                </span>
                <input
                  ref={inputRef}
                  name="q"
                  type="search"
                  defaultValue={term}
                  placeholder="Casas, camas, jaulas, dispensadores..."
                  autoComplete="off"
                  enterKeyHint="search"
                />
                <kbd className={styles.keyboardHint}>⌘ K</kbd>
              </label>
              <button className={styles.submit} type="submit">
                {isSearching ? (
                  <>
                    <span className={styles.spinner} aria-hidden="true" />
                    Buscando
                  </>
                ) : (
                  <>
                    Buscar
                    <ExperienceIcon name="arrow" size={18} />
                  </>
                )}
              </button>
            </div>
          )}
        </SearchForm>

        <div className={styles.quickSearches} aria-label="Búsquedas populares">
          <span className={styles.quickLabel}>Búsquedas populares</span>
          <div className={styles.quickScroller}>
            {POPULAR_SEARCHES.map((suggestion) => (
              <Link
                className={styles.quickChip}
                key={suggestion}
                to={`/search?q=${encodeURIComponent(suggestion)}`}
              >
                {suggestion}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ResultsToolbar({term, type, productCount, pageCount, resultLabel}) {
  const tabs = [
    {value: 'all', label: 'Todo', count: productCount + pageCount},
    {value: 'product', label: 'Productos', count: productCount},
    {value: 'page', label: 'Guías y páginas', count: pageCount},
  ];

  return (
    <header className={styles.resultsToolbar}>
      <div>
        <span className={styles.resultsEyebrow}>Resultados de búsqueda</span>
        <h2>{resultLabel}</h2>
        <p>
          Mostrando coincidencias relacionadas con <strong>“{term}”</strong>.
        </p>
      </div>

      <nav className={styles.typeTabs} aria-label="Filtrar resultados por tipo">
        {tabs.map((tab) => (
          <Link
            aria-current={type === tab.value ? 'page' : undefined}
            className={styles.typeTab}
            key={tab.value}
            to={buildTypeUrl(term, tab.value)}
          >
            <span>{tab.label}</span>
            <small>{tab.count}</small>
          </Link>
        ))}
      </nav>
    </header>
  );
}

function ProductsSection({connection, products, term}) {
  return (
    <section
      className={styles.productsSection}
      aria-labelledby="products-title"
    >
      <SectionHeading
        id="products-title"
        icon="sparkles"
        title="Productos encontrados"
        copy="Explora las coincidencias y abre el producto para revisar medidas, variantes y disponibilidad."
        count={products.length}
      />

      <Pagination connection={connection}>
        {({nodes, isLoading, NextLink, PreviousLink}) => (
          <div className={styles.paginationStack}>
            <PaginationAction
              link={PreviousLink}
              isLoading={isLoading}
              label="Ver productos anteriores"
              direction="previous"
            />

            <div className={styles.productGrid}>
              {nodes.map((product) => (
                <SearchProductCard
                  key={product.id}
                  product={product}
                  term={term}
                />
              ))}
            </div>

            <PaginationAction
              link={NextLink}
              isLoading={isLoading}
              label="Cargar más productos"
              direction="next"
            />
          </div>
        )}
      </Pagination>
    </section>
  );
}

function SearchProductCard({product, term}) {
  const variant = product.selectedOrFirstAvailableVariant;
  const image = product.featuredImage ?? variant?.image;
  const price = variant?.price ?? product.priceRange?.minVariantPrice;
  const compareAtPrice = variant?.compareAtPrice;
  const discount = getDiscount(compareAtPrice, price);
  const url = urlWithTrackingParams({
    baseUrl: `/products/${product.handle}`,
    trackingParams: product.trackingParameters,
    term,
  });

  return (
    <Link
      className={styles.productLink}
      prefetch="intent"
      to={url}
      aria-label={`Ver ${product.title}`}
    >
      <article className={styles.productCard}>
        <div className={styles.productMedia}>
          {image ? (
            <Image
              data={image}
              alt={image.altText || product.title}
              loading="lazy"
              sizes="(min-width: 80rem) 260px, (min-width: 48rem) 28vw, 46vw"
            />
          ) : (
            <span className={styles.productPlaceholder} aria-hidden="true">
              <ExperienceIcon name="paw" size={38} />
            </span>
          )}

          {discount ? (
            <span className={styles.discountBadge}>-{discount}%</span>
          ) : (
            <span className={styles.brandBadge}>Roof Roof</span>
          )}
        </div>

        <div className={styles.productBody}>
          <p className={styles.productEyebrow}>Espacios para mascotas</p>
          <h3>{product.title}</h3>
          <div className={styles.priceRow}>
            <div className={styles.prices}>
              {price && <Money data={price} />}
              {compareAtPrice && discount && (
                <Money className={styles.comparePrice} data={compareAtPrice} />
              )}
            </div>
            <span className={styles.productArrow} aria-hidden="true">
              <ExperienceIcon name="arrow" size={17} />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

function PagesSection({pages, term}) {
  return (
    <aside className={styles.pagesSection} aria-labelledby="pages-title">
      <SectionHeading
        id="pages-title"
        icon="book"
        title="Información útil"
        copy="Guías y páginas que pueden ayudarte a tomar una mejor decisión."
        count={pages.length}
        compact
      />

      <div className={styles.pageList}>
        {pages.map((page) => {
          const url = urlWithTrackingParams({
            baseUrl: `/pages/${page.handle}`,
            trackingParams: page.trackingParameters,
            term,
          });
          return (
            <Link
              className={styles.pageResult}
              key={page.id}
              prefetch="intent"
              to={url}
            >
              <span className={styles.pageIcon}>
                <ExperienceIcon name={getPageIcon(page.handle)} size={21} />
              </span>
              <span className={styles.pageCopy}>
                <strong>{page.title}</strong>
                <small>Ver información</small>
              </span>
              <ExperienceIcon name="arrow" size={17} />
            </Link>
          );
        })}
      </div>

      <div className={styles.selectorCallout}>
        <span className={styles.selectorIcon}>
          <ExperienceIcon name="sparkles" size={23} />
        </span>
        <div>
          <strong>¿Aún tienes dudas?</strong>
          <p>Recibe orientación según tamaño, espacio y necesidad.</p>
          <Link to="/pages/selector-de-productos">Abrir selector</Link>
        </div>
      </div>
    </aside>
  );
}

function SectionHeading({id, icon, title, copy, count, compact = false}) {
  return (
    <div
      className={`${styles.sectionHeading} ${compact ? styles.compact : ''}`}
    >
      <span className={styles.sectionIcon}>
        <ExperienceIcon name={icon} size={22} />
      </span>
      <div>
        <div className={styles.sectionTitleRow}>
          <h2 id={id}>{title}</h2>
          <span>{count}</span>
        </div>
        <p>{copy}</p>
      </div>
    </div>
  );
}

function PaginationAction({link: PaginationLink, isLoading, label, direction}) {
  if (!PaginationLink) return null;

  return (
    <div className={styles.paginationAction}>
      <PaginationLink>
        <span className={styles.paginationButton} aria-busy={isLoading}>
          {isLoading ? (
            <span className={styles.spinnerDark} aria-hidden="true" />
          ) : (
            <span
              className={`${styles.paginationIcon} ${
                direction === 'previous' ? styles.paginationIconPrevious : ''
              }`}
              aria-hidden="true"
            >
              <ExperienceIcon name="arrow" size={17} />
            </span>
          )}
          <span>{isLoading ? 'Cargando productos...' : label}</span>
        </span>
      </PaginationLink>
    </div>
  );
}

function SearchLanding() {
  return (
    <div className={styles.landing}>
      <section className={styles.categorySection}>
        <SectionHeading
          id="popular-categories-title"
          icon="paw"
          title="Explora por categoría"
          copy="Comienza por el tipo de producto que estás buscando."
          count={POPULAR_CATEGORIES.length}
        />
        <div className={styles.categoryGrid}>
          {POPULAR_CATEGORIES.map((category) => (
            <Link
              className={styles.categoryCard}
              key={category.to}
              to={category.to}
            >
              <span className={styles.categoryIcon}>
                <ExperienceIcon name={category.icon} size={27} />
              </span>
              <span className={styles.categoryCopy}>
                <strong>{category.title}</strong>
                <small>{category.copy}</small>
              </span>
              <span className={styles.categoryArrow} aria-hidden="true">
                <ExperienceIcon name="arrow" size={18} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.discoveryBanner}>
        <div className={styles.discoveryIcon}>
          <ExperienceIcon name="checklist" size={30} />
        </div>
        <div className={styles.discoveryCopy}>
          <span>Compra guiada</span>
          <h2>Encuentra una opción según su espacio y necesidad</h2>
          <p>
            Responde tres preguntas y recibe una recomendación para comenzar a
            explorar la categoría adecuada.
          </p>
        </div>
        <Link
          className={styles.discoveryButton}
          to="/pages/selector-de-productos"
        >
          Usar selector
          <ExperienceIcon name="arrow" size={18} />
        </Link>
      </section>
    </div>
  );
}

function NoResults({term}) {
  return (
    <section className={styles.noResults} aria-labelledby="no-results-title">
      <div className={styles.noResultsIcon} aria-hidden="true">
        <SearchIcon />
      </div>
      <span className={styles.noResultsEyebrow}>
        No encontramos coincidencias
      </span>
      <h2 id="no-results-title">Sin resultados para “{term}”</h2>
      <p>
        Revisa la escritura, prueba con una palabra más general o explora una
        categoría directamente.
      </p>

      <div className={styles.noResultsSuggestions}>
        {POPULAR_SEARCHES.map((suggestion) => (
          <Link
            key={suggestion}
            to={`/search?q=${encodeURIComponent(suggestion)}`}
          >
            {suggestion}
          </Link>
        ))}
      </div>

      <div className={styles.noResultsActions}>
        <Link
          className={styles.secondaryButton}
          to="/pages/selector-de-productos"
        >
          Usar selector
        </Link>
        <Link className={styles.primaryButton} to="/collections/roof-roof">
          Ver todos los productos
          <ExperienceIcon name="arrow" size={18} />
        </Link>
      </div>
    </section>
  );
}

function SearchIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </svg>
  );
}

function getDiscount(compareAtPrice, price) {
  const compare = Number(compareAtPrice?.amount ?? 0);
  const current = Number(price?.amount ?? 0);
  if (!compare || !current || compare <= current) return null;
  return Math.round(((compare - current) / compare) * 100);
}

function getPageIcon(handle = '') {
  if (handle.includes('talla') || handle.includes('medida')) return 'ruler';
  if (handle.includes('ayuda') || handle.includes('contacto')) return 'support';
  if (handle.includes('cuidado') || handle.includes('mascota')) return 'heart';
  if (handle.includes('proyecto')) return 'building';
  return 'book';
}

function getResultLabel(productCount, pageCount, pageInfo) {
  const total = productCount + pageCount;
  const hasMore = Boolean(pageInfo?.hasNextPage || pageInfo?.hasPreviousPage);
  if (hasMore) return `${total}+ resultados relacionados`;
  return `${total} resultado${total === 1 ? '' : 's'} relacionado${
    total === 1 ? '' : 's'
  }`;
}

function buildTypeUrl(term, type) {
  const params = new URLSearchParams({q: term});
  if (type !== 'all') params.set('type', type);
  return `/search?${params.toString()}`;
}

const SEARCH_QUERY = `#graphql
  query Search(
    $query: String!
    $first: Int
    $last: Int
    $after: String
    $before: String
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    products: search(
      query: $query
      first: $first
      last: $last
      after: $after
      before: $before
      types: [PRODUCT]
    ) {
      nodes {
        ... on Product {
          id
          title
          handle
          trackingParameters
          featuredImage {
            id
            url
            altText
            width
            height
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          selectedOrFirstAvailableVariant {
            id
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
            image {
              id
              url
              altText
              width
              height
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
    pages: search(query: $query, first: 6, types: [PAGE]) {
      nodes {
        ... on Page {
          id
          title
          handle
          trackingParameters
        }
      }
    }
  }
`;

/** @typedef {import('./+types/search').Route} Route */
/** @typedef {ReturnType<typeof useLoaderData<typeof loader>>} LoaderReturnData */
