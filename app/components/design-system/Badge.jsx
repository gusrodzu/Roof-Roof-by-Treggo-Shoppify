import {useState} from 'react';

/**
 * Badge — pills de estado (no interactivos)
 *
 * Tone: success | danger | warning | info | dark | neutral
 * (mapea a: En stock, -30%, Nuevo, Envío gratis, Más vendido, Sin stock)
 */
export function Badge({
  tone = 'neutral',
  icon,
  children,
  style: styleOverride = {},
}) {
  const TONES = {
    success: {background: '#e3f5e9', color: '#1d7a3d'},
    danger: {background: '#fbe3e0', color: 'var(--danger)'},
    warning: {background: 'var(--surface-cream)', color: '#8a6510'},
    info: {background: '#e3eefb', color: '#1a5fa8'},
    dark: {background: 'var(--ink)', color: 'var(--brand-cta)'},
    neutral: {background: 'var(--border)', color: 'var(--ink-soft)'},
  };
  const t = TONES[tone] ?? TONES.neutral;

  return (
    <span
      className={`rr-badge rr-badge--${tone}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.3rem',
        padding: '0.25rem 0.75rem',
        borderRadius: '999px',
        fontSize: '0.75rem',
        fontWeight: 700,
        ...t,
        ...styleOverride,
      }}
    >
      {icon}
      {children}
    </span>
  );
}

/**
 * FilterTag — tag seleccionable (Perros, Gatos, Aves...) con estado activo y opción de quitar (x)
 */
export function FilterTag({
  active = false,
  onClick,
  onRemove,
  children,
  style: styleOverride = {},
  disabled = false,
  ...rest
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      type="button"
      className={`rr-filter-chip${active ? ' is-active' : ''}`}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      disabled={disabled}
      {...rest}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        padding: '0.5rem 1rem',
        borderRadius: '999px',
        background: active ? 'var(--ink)' : '#fff',
        color: active ? '#fff' : 'var(--ink)',
        border: `1.5px solid ${active ? 'var(--ink)' : hovered ? 'var(--brand-cta)' : 'var(--border)'}`,
        fontSize: '0.875rem',
        fontWeight: active ? 700 : 600,
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontFamily: 'inherit',
        opacity: disabled ? 0.55 : 1,
        transition: 'all 0.15s',
        ...styleOverride,
      }}
    >
      {children}
      {onRemove && (
        <span
          role="button"
          tabIndex={0}
          aria-label="Quitar filtro"
          onClick={(event) => {
            event.stopPropagation();
            onRemove();
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              event.stopPropagation();
              onRemove();
            }
          }}
          style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </span>
      )}
    </button>
  );
}
