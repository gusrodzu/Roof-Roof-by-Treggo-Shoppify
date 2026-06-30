import {CartForm} from '@shopify/hydrogen';
import {useCartAnimation} from '~/components/CartAnimation';
import {Button} from '~/components/design-system';

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
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={isLoading}
              disabled={isDisabled}
              onClick={(e) => {
                if (!isDisabled) triggerFly(e.currentTarget);
                onClick?.();
              }}
              style={{borderRadius: '0.75rem'}}
            >
              {isLoading ? 'Agregando...' : children}
            </Button>
          </>
        );
      }}
    </CartForm>
  );
}

/** @typedef {import('react-router').FetcherWithComponents} FetcherWithComponents */
/** @typedef {import('@shopify/hydrogen').OptimisticCartLineInput} OptimisticCartLineInput */
