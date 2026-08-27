import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {Image, Money} from '@shopify/hydrogen';
const ProductComparisonContext = createContext(null);
const STORAGE_KEY = 'roofroof-product-comparison';
const MAX_PRODUCTS = 3;

function normalizeProduct(product) {
  if (!product?.id) return null;

  const featuredImage =
    product.featuredImage ??
    product.images?.nodes?.[0] ??
    product.images?.edges?.[0]?.node ??
    null;

  return {
    id: product.id,
    title: product.title ?? '',
    handle: product.handle ?? '',
    vendor: product.vendor ?? '',
    description: product.description ?? '',
    tags: product.tags ?? [],
    featuredImage,
    priceRange: product.priceRange ?? null,
    variants: product.variants ?? null,
  };
}
export function ProductComparisonProvider({children}) {
  const [compareProducts, setCompareProducts] = useState([]);
  const [showCompare, setShowCompare] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) setCompareProducts(JSON.parse(saved));
    } catch {
      // Ignore invalid persisted state.
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(compareProducts));
    } catch {
      // Storage can be unavailable in private browsing.
    }
  }, [compareProducts]);

  const addToCompare = useCallback((product) => {
    const normalized = normalizeProduct(product);
    if (!normalized) return false;

    let added = false;

    setCompareProducts((current) => {
      if (current.some((item) => item.id === normalized.id)) return current;
      if (current.length >= MAX_PRODUCTS) return current;

      added = true;
      return [...current, normalized];
    });

    return added;
  }, []);

  const removeFromCompare = useCallback((productOrId) => {
    const id = typeof productOrId === 'string' ? productOrId : productOrId?.id;
    setCompareProducts((current) => current.filter((item) => item.id !== id));
  }, []);

  const toggleCompare = useCallback((product) => {
    const id = product?.id;
    if (!id) return;

    setCompareProducts((current) => {
      if (current.some((item) => item.id === id)) {
        return current.filter((item) => item.id !== id);
      }

      if (current.length >= MAX_PRODUCTS) return current;

      const normalized = normalizeProduct(product);
      return normalized ? [...current, normalized] : current;
    });
  }, []);

  const clearCompare = useCallback(() => {
    setCompareProducts([]);
    setShowCompare(false);
  }, []);

  const isCompared = useCallback(
    (id) => compareProducts.some((product) => product.id === id),
    [compareProducts],
  );

  const value = useMemo(
    () => ({
      compareProducts,
      maxProducts: MAX_PRODUCTS,
      showCompare,
      setShowCompare,
      addToCompare,
      removeFromCompare,
      toggleCompare,
      clearCompare,
      isCompared,
    }),
    [
      compareProducts,
      showCompare,
      addToCompare,
      removeFromCompare,
      toggleCompare,
      clearCompare,
      isCompared,
    ],
  );

  return (
    <ProductComparisonContext.Provider value={value}>
      {children}
      <ProductComparisonBar />
      <ProductComparisonModal />
    </ProductComparisonContext.Provider>
  );
}

export function useProductComparison() {
  const context = useContext(ProductComparisonContext);

  if (!context) {
    throw new Error(
      'useProductComparison must be used inside ProductComparisonProvider',
    );
  }

  return context;
}

export function ProductCompareButton({
  product,
  size = 'sm',
  fullWidth = false,
}) {
  const {toggleCompare, isCompared, compareProducts, maxProducts} =
    useProductComparison();

  const compared = isCompared(product?.id);
  const limitReached = compareProducts.length >= maxProducts && !compared;

  return (
    <button
      className="rr-compare-button rr-button rr-button--outline"
      type="button"
      onClick={() => toggleCompare(product)}
      disabled={limitReached}
      aria-pressed={compared}
      aria-label={
        compared
          ? `Quitar ${product?.title ?? 'producto'} del comparador`
          : `Comparar ${product?.title ?? 'producto'}`
      }
      style={{
        width: fullWidth ? '100%' : 'auto',
        border: `3px solid ${compared ? '#F5A623' : '#000000'}`,
        background: compared ? '#fff8ee' : '#000000',
        color: compared ? '#8a5a00' : '#ffffff',
        borderRadius: '10rem',
        padding: size === 'lg' ? '0.75rem 1rem' : '0.55rem 0.75rem',
        fontSize: size === 'lg' ? '0.875rem' : '0.75rem',
        fontWeight: 700,
        cursor: limitReached ? 'not-allowed' : 'pointer',
        opacity: limitReached ? 0.45 : 1,
      }}
    >
      <span className="rr-compare-button__label rr-compare-button__label--full">
        {compared ? '✓ En comparación' : '＋ Comparar producto'}
      </span>
      <span className="rr-compare-button__label rr-compare-button__label--compact">
        {compared ? '✓ Comparando' : '＋ Comparar'}
      </span>
    </button>
  );
}

function ProductComparisonBar() {
  const {compareProducts, clearCompare, setShowCompare} =
    useProductComparison();

  if (!compareProducts.length) return null;

  return (
    <div
      className="rr-compare-bar rr-ui-card"
      role="region"
      aria-label="Comparador de productos"
      style={{
        position: 'fixed',
        left: '50%',
        bottom: '1rem',
        transform: 'translateX(-50%)',
        zIndex: 100,
        width: 'min(680px, calc(100vw - 2rem))',
        background: '#ffffff',
        color: '#000000',
        borderRadius: '10rem',
        padding: '0.875rem 1rem',
        boxShadow: '0 16px 40px rgba(44,24,16,0.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.75rem',
      }}
    >
      <div className="rr-compare-bar__summary" style={{minWidth: 0}}>
        <strong style={{fontSize: '0.875rem'}}>Comparar productos</strong>
        <span
          style={{fontSize: '0.75rem', opacity: 0.75, marginLeft: '0.5rem'}}
        >
          {compareProducts.length}/3 seleccionados
        </span>
      </div>

      <div
        className="rr-compare-bar__actions"
        style={{display: 'flex', gap: '0.5rem', flexShrink: 0}}
      >
        <button
          className="rr-button rr-button--outline"
          type="button"
          onClick={clearCompare}
          style={{
            border: '1px solid rgba(0, 0, 0, 0.35)',
            background: 'transparent',
            color: '#000000',
            borderRadius: '10rem',
            padding: '0.55rem 0.75rem',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          Limpiar
        </button>

        <button
          className="rr-button rr-button--brand"
          type="button"
          onClick={() => setShowCompare(true)}
          disabled={compareProducts.length < 2}
          style={{
            border: 0,
            background: '#F5A623',
            color: '#2C1810',
            borderRadius: '10rem',
            padding: '0.55rem 0.9rem',
            fontWeight: 800,
            cursor: compareProducts.length < 2 ? 'not-allowed' : 'pointer',
            opacity: compareProducts.length < 2 ? 0.5 : 1,
          }}
        >
          Comparar
        </button>
      </div>
    </div>
  );
}

function ProductComparisonModal() {
  const {compareProducts, showCompare, setShowCompare, removeFromCompare} =
    useProductComparison();

  if (!showCompare) return null;

  return (
    <div
      className="rr-compare-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-comparison-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 110,
        background: 'rgba(44,24,16,0.58)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <button
        type="button"
        aria-label="Cerrar comparador"
        onClick={() => setShowCompare(false)}
        style={{
          position: 'absolute',
          inset: 0,
          border: 0,
          background: 'transparent',
          cursor: 'default',
        }}
      />
      <div
        className="rr-compare-modal rr-ui-card"
        style={{
          position: 'relative',
          zIndex: 1,
          width: 'min(1000px, 100%)',
          maxHeight: '90vh',
          overflow: 'auto',
          background: '#fff',
          borderRadius: '1rem',
          padding: '1.5rem',
          boxShadow: '0 24px 70px rgba(0,0,0,0.25)',
        }}
      >
        <div
          className="rr-compare-modal__header"
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '1rem',
            marginBottom: '1.25rem',
          }}
        >
          <div>
            <p
              style={{
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '2px',
                color: '#000000',
                margin: '0 0 0.35rem',
              }}
            >
              Comparador
            </p>
            <h2
              id="product-comparison-title"
              style={{
                fontSize: '1.5rem',
                fontWeight: 800,
                color: '#2C1810',
                margin: 0,
              }}
            >
              Compara tus productos
            </h2>
          </div>

          <button
            className="rr-icon-button"
            type="button"
            onClick={() => setShowCompare(false)}
            aria-label="Cerrar comparador"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              border: '1px solid #e8e4dc',
              background: '#fff',
              color: '#2C1810',
              cursor: 'pointer',
              fontSize: '1.25rem',
            }}
          >
            ×
          </button>
        </div>

        <div
          className="rr-compare-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${Math.max(compareProducts.length, 1)}, minmax(0, 1fr))`,
            gap: '0.75rem',
          }}
        >
          {compareProducts.map((product) => (
            <CompareCard
              key={product.id}
              product={product}
              onRemove={() => removeFromCompare(product.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function CompareCard({product, onRemove}) {
  const price = product.priceRange?.minVariantPrice;
  const available =
    product.variants?.nodes?.some((variant) => variant.availableForSale) ??
    false;

  return (
    <article
      className="rr-compare-card rr-ui-card"
      style={{
        border: '1px solid #e8e4dc',
        borderRadius: '0.75rem',
        overflow: 'hidden',
        background: '#fff',
        minWidth: 0,
      }}
    >
      <div
        className="rr-compare-card__media"
        style={{
          height: '150px',
          background: '#f5f7fa',
          position: 'relative',
        }}
      >
        {product.featuredImage ? (
          <Image
            data={product.featuredImage}
            alt={product.featuredImage.altText || product.title}
            sizes="(min-width: 768px) 280px, 45vw"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              padding: '0.75rem',
            }}
          />
        ) : (
          <div
            aria-hidden="true"
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#9a8d85',
              fontSize: '0.75rem',
              fontWeight: 700,
            }}
          >
            Sin imagen
          </div>
        )}

        <button
          className="rr-icon-button"
          type="button"
          onClick={onRemove}
          aria-label={`Quitar ${product.title} del comparador`}
          style={{
            position: 'absolute',
            top: '0.5rem',
            right: '0.5rem',
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            border: '1px solid #e8e4dc',
            background: '#fff',
            color: '#2C1810',
            cursor: 'pointer',
            fontSize: '1rem',
          }}
        >
          ×
        </button>
      </div>

      <div className="rr-compare-card__body" style={{padding: '0.875rem'}}>
        <h3
          style={{
            fontSize: '0.875rem',
            fontWeight: 800,
            color: '#2C1810',
            lineHeight: 1.35,
            margin: '0 0 0.75rem',
          }}
        >
          {product.title}
        </h3>

        {price && (
          <div
            style={{
              fontSize: '1rem',
              fontWeight: 800,
              color: '#2C1810',
              marginBottom: '0.75rem',
            }}
          >
            <Money data={price} />
          </div>
        )}

        <CompareRow label="Marca" value={product.vendor || '—'} />
        <CompareRow
          label="Disponibilidad"
          value={available ? 'Disponible' : 'Agotado'}
        />
        <CompareRow
          label="Descripción"
          value={
            product.description
              ? `${product.description.slice(0, 110)}${product.description.length > 110 ? '…' : ''}`
              : '—'
          }
        />

        {product.handle && (
          <a
            href={`/products/${product.handle}`}
            style={{
              display: 'block',
              marginTop: '0.875rem',
              color: '#000000',
              fontSize: '0.75rem',
              fontWeight: 800,
              textDecoration: 'none',
            }}
          >
            Ver producto →
          </a>
        )}
      </div>
    </article>
  );
}

function CompareRow({label, value}) {
  return (
    <div
      className="rr-compare-row"
      style={{
        paddingTop: '0.55rem',
        marginTop: '0.55rem',
        borderTop: '1px solid #f0ece7',
      }}
    >
      <div
        style={{
          fontSize: '0.6875rem',
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          color: '#9a8d85',
          marginBottom: '0.2rem',
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: '0.75rem',
          color: '#4f4038',
          lineHeight: 1.45,
        }}
      >
        {value}
      </div>
    </div>
  );
}
