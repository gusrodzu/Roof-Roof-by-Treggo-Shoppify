import {Pagination} from '@shopify/hydrogen';

export function PaginatedResourceSection({
  connection,
  children,
  ariaLabel,
  resourcesClassName,
}) {
  return (
    <Pagination connection={connection}>
      {({nodes, isLoading, PreviousLink, NextLink}) => (
        <div className="rr-pagination-shell">
          <div className="rr-pagination rr-pagination--previous">
            <PreviousLink className="rr-pagination__link">
              <PaginationButton loading={isLoading} direction="previous" />
            </PreviousLink>
          </div>

          {resourcesClassName ? (
            <div
              aria-label={ariaLabel}
              className={resourcesClassName}
              role={ariaLabel ? 'region' : undefined}
            >
              {nodes.map((node, index) => children({node, index}))}
            </div>
          ) : (
            nodes.map((node, index) => children({node, index}))
          )}

          <div className="rr-pagination rr-pagination--next">
            <NextLink className="rr-pagination__link">
              <PaginationButton loading={isLoading} direction="next" />
            </NextLink>
          </div>
        </div>
      )}
    </Pagination>
  );
}

function PaginationButton({loading, direction}) {
  const previous = direction === 'previous';
  return (
    <span
      className={`rr-pagination__button${loading ? ' rr-pagination__button--loading' : ''}`}
    >
      {loading ? (
        <>
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            aria-hidden="true"
          >
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          </svg>
          Cargando…
        </>
      ) : (
        <>
          {previous && <Arrow previous />}
          {previous ? 'Ver anteriores' : 'Cargar más productos'}
          {!previous && <Arrow />}
        </>
      )}
    </span>
  );
}

function Arrow({previous = false}) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      aria-hidden="true"
    >
      <path d={previous ? 'M19 12H5' : 'M5 12h14'} />
      <path d={previous ? 'm11 18-6-6 6-6' : 'm13 6 6 6-6 6'} />
    </svg>
  );
}
