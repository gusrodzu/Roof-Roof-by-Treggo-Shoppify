import * as React from 'react';
import {Pagination} from '@shopify/hydrogen';

export function PaginatedResourceSection({
  connection,
  children,
  ariaLabel,
  resourcesClassName,
}) {
  return (
    <Pagination connection={connection}>
      {({nodes, isLoading, PreviousLink, NextLink}) => {
        const resourcesMarkup = nodes.map((node, index) =>
          children({node, index}),
        );

        return (
          <div>
            {/* Cargar anteriores */}
            <div style={{display: 'flex', justifyContent: 'center', marginBottom: '1.5rem'}}>
              <PreviousLink>
                {isLoading ? (
                  <LoadingSpan />
                ) : (
                  <PaginationSpan>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                      <path d="M12 19l-7-7 7-7"/><path d="M5 12h14"/>
                    </svg>
                    Cargar anteriores
                  </PaginationSpan>
                )}
              </PreviousLink>
            </div>

            {/* Recursos */}
            {resourcesClassName ? (
              <div
                aria-label={ariaLabel}
                className={resourcesClassName}
                role={ariaLabel ? 'region' : undefined}
              >
                {resourcesMarkup}
              </div>
            ) : (
              resourcesMarkup
            )}

            {/* Cargar más */}
            <div style={{display: 'flex', justifyContent: 'center', marginTop: '2rem'}}>
              <NextLink>
                {isLoading ? (
                  <LoadingSpan />
                ) : (
                  <PaginationSpan>
                    Cargar más
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                      <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
                    </svg>
                  </PaginationSpan>
                )}
              </NextLink>
            </div>
          </div>
        );
      }}
    </Pagination>
  );
}

function PaginationSpan({children}) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
        padding: '0.75rem 1.5rem', borderRadius: '999px',
        border: `1.5px solid ${hovered ? '#F5A623' : '#2C1810'}`,
        background: hovered ? '#2C1810' : 'transparent',
        color: hovered ? '#F5A623' : '#2C1810',
        fontWeight: 700, fontSize: '0.9375rem',
        cursor: 'pointer', transition: 'all 0.15s',
        fontFamily: 'inherit',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </span>
  );
}

function LoadingSpan() {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
      padding: '0.75rem 1.5rem', borderRadius: '999px',
      border: '1.5px solid #e8e4dc',
      color: '#b0a49c', fontWeight: 700, fontSize: '0.9375rem', cursor: 'wait',
    }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
        style={{animation: 'spin 0.8s linear infinite'}} aria-hidden="true">
        <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
      </svg>
      Cargando...
    </span>
  );
}