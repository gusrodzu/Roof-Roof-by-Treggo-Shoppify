import {CartForm} from '@shopify/hydrogen';
import {useCartAnimation} from '~/components/CartAnimation';

/**
 * @param {{
 *   analytics?: unknown;
 *   children: React.ReactNode;
 *   disabled?: boolean;
 *   lines: Array<OptimisticCartLineInput>;
 *   onClick?: () => void;
 * }}
 */
export function AddToCartButton({analytics, children, disabled, lines, onClick}) {
  const {triggerFly} = useCartAnimation();

  return (
    <CartForm route="/cart" inputs={{lines}} action={CartForm.ACTIONS.LinesAdd}>
      {(fetcher) => {
        const isLoading  = fetcher.state !== 'idle';
        const isDisabled = disabled ?? isLoading;

        return (
          <>
            <input name="analytics" type="hidden" value={JSON.stringify(analytics)} />
            <button
              type="submit"
              onClick={(e) => {
                
                // Dispara el punto volador desde el botón hacia el carrito
                if (!isDisabled) triggerFly(e.currentTarget);
                onClick?.();
              }}
              disabled={isDisabled}
              style={{
                width: '100%',
                background: isDisabled ? '#e8e4dc' : '#F5A623',
                color: isDisabled ? '#b0a49c' : '#2C1810',
                border: 'none',
                borderRadius: '0.75rem',
                padding: '1rem 1.5rem',
                fontWeight: 800,
                fontSize: '1rem',
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                fontFamily: 'inherit',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                transition: 'background 0.15s',
                transform: isLoading ? 'scale(0.98)' : 'scale(1)',
                letterSpacing: '0.2px',
              }}
            >
              {isLoading ? (
                <>
                  <LoadingSpinner />
                  Agregando...
                </>
              ) : children}
            </button>
          </>
        );
      }}
    </CartForm>
  );
}

function LoadingSpinner() {
  return (
    <svg
      width="16" height="16" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2.5"
      aria-hidden="true"
      style={{animation: 'spin 0.8s linear infinite'}}
    >
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
    </svg>
  );
}

/** @typedef {import('react-router').FetcherWithComponents} FetcherWithComponents */
/** @typedef {import('@shopify/hydrogen').OptimisticCartLineInput} OptimisticCartLineInput */
