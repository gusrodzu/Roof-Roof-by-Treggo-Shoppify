import {
  createContext, useContext, useEffect, useId,
  useState, useCallback,
} from 'react';

/** @typedef {'search' | 'cart' | 'mobile' | 'closed'} AsideType */

const AsideContext = createContext(/** @type {AsideContextValue | null} */ (null));

/* ─── Config por tipo de aside ─────────────────────────────────────────────── */
const ASIDE_CONFIG = {
  cart:   {heading: 'Tu carrito', side: 'right', width: 'min(420px, 100vw)', noHeader: false, fullScreen: false},
  search: {heading: 'Buscar',     side: 'right', width: 'min(420px, 100vw)', noHeader: false, fullScreen: false},
  mobile: {heading: 'Menú',       side: 'left',  width: '100vw',             noHeader: true,  fullScreen: true},
};

/* ─── Aside ─────────────────────────────────────────────────────────────────── */
export function Aside({children, heading, type}) {
  const {type: activeType, close} = useAside();
  const expanded = activeType === type;
  const id = useId();
  const cfg = ASIDE_CONFIG[type] ?? {heading, side: 'right', width: '420px', noHeader: false};
  const isLeft = cfg.side === 'left';

  /* Escape key */
  useEffect(() => {
    if (!expanded) return;
    const handler = (e) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [expanded, close]);

  /* Body scroll lock */
  useEffect(() => {
    document.body.style.overflow = expanded ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [expanded]);

  return (
    <>
      {/* Overlay oscuro */}
      <div
        onClick={close}
        aria-hidden="true"
        style={{
          position: 'fixed', inset: 0,
          zIndex: 198,
          background: 'rgba(44,24,16,0.45)',
          backdropFilter: 'blur(2px)',
          opacity: expanded ? 1 : 0,
          pointerEvents: expanded ? 'auto' : 'none',
          transition: 'opacity 0.28s ease',
        }}
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={id}
        style={{
          position: 'fixed',
          top: cfg.fullScreen ? 0 : 'var(--header-height, 0px)',
          [isLeft ? 'left' : 'right']: 0,
          bottom: 0,
          zIndex: 199,
          width: cfg.width,
          height: cfg.fullScreen ? '100dvh' : 'auto',
          background: '#fff',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: isLeft
            ? '4px 0 24px rgba(44,24,16,0.15)'
            : '-4px 0 24px rgba(44,24,16,0.15)',
          transform: expanded
            ? 'translateX(0)'
            : isLeft ? 'translateX(-100%)' : 'translateX(100%)',
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'hidden',
        }}
      >
        {/* Header del panel — solo para cart y search */}
        {!cfg.noHeader && (
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '1rem 1.25rem',
            background: '#fff',
            borderBottom: '1px solid var(--border)',
            flexShrink: 0,
          }}>
            <h2
              id={id}
              style={{fontSize: '1rem', fontWeight: 700, color: 'var(--ink)', margin: 0}}
            >
              {cfg.heading}
            </h2>
            <button
              type="button"
              onClick={close}
              aria-label="Cerrar"
              style={{
                width: '32px', height: '32px', borderRadius: '50%',
                background: 'var(--surface-cool)', border: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: 'var(--ink)', fontSize: '1.125rem',
                lineHeight: 1, padding: 0, transition: 'background 0.15s',
                flexShrink: 0,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--border)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--surface-cool)')}
            >
              ×
            </button>
          </div>
        )}

        {/* Contenido scrollable */}
        <div style={{flex: 1, overflowY: 'auto', overflowX: 'hidden', minHeight: 0}}>
          {children}
        </div>
      </div>
    </>
  );
}

/* ─── Provider ──────────────────────────────────────────────────────────────── */
Aside.Provider = function AsideProvider({children}) {
  const [type, setType] = useState(/** @type {AsideType} */ ('closed'));
  const open  = useCallback((t) => setType(t), []);
  const close = useCallback(() => setType('closed'), []);

  return (
    <AsideContext.Provider value={{type, open, close}}>
      {children}
    </AsideContext.Provider>
  );
};

/* ─── Hook ──────────────────────────────────────────────────────────────────── */
export function useAside() {
  const context = useContext(AsideContext);
  if (!context) throw new Error('useAside must be used within an Aside.Provider');
  return context;
}

/**
 * @typedef {{
 *   type: AsideType;
 *   open: (type: AsideType) => void;
 *   close: () => void;
 * }} AsideContextValue
 */