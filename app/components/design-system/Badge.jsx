import {useState} from 'react';

/**
 * Badge — pills de estado (no interactivos)
 *
 * Tone: success | danger | warning | info | dark | neutral
 * (mapea a: En stock, -30%, Nuevo, Envío gratis, Más vendido, Sin stock)
 */
export function Badge({tone = 'neutral', icon, children, style: styleOverride = {}}) {
  const TONES = {
    success: {background: '#e3f5e9', color: '#1d7a3d'},
    danger:  {background: '#fbe3e0', color: 'var(--danger)'},
    warning: {background: 'var(--surface-cream)', color: '#8a6510'},
    info:    {background: '#e3eefb', color: '#1a5fa8'},
    dark:    {background: 'var(--ink)', color: 'var(--brand-cta)'},
    neutral: {background: 'var(--border)', color: 'var(--ink-soft)'},
  };
  const t = TONES[tone] ?? TONES.neutral;

  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
      padding: '0.25rem 0.75rem', borderRadius: '999px',
      fontSize: '0.75rem', fontWeight: 700,
      ...t,
      ...styleOverride,
    }}>
      {icon}
      {children}
    </span>
  );
}

/**
 * FilterTag — tag seleccionable (Perros, Gatos, Aves...) con estado activo y opción de quitar (x)
 */
export function FilterTag({active = false, onClick, onRemove, children}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
        padding: '0.5rem 1rem', borderRadius: '999px',
        background: active ? 'var(--ink)' : '#fff',
        color: active ? '#fff' : 'var(--ink)',
        border: `1.5px solid ${active ? 'var(--ink)' : (hovered ? 'var(--brand-cta)' : 'var(--border)')}`,
        fontSize: '0.875rem', fontWeight: active ? 700 : 600,
        cursor: 'pointer', fontFamily: 'inherit',
        transition: 'all 0.15s',
      }}
    >
      {children}
      {onRemove && (
        <span
          onClick={(e) => { e.stopPropagation(); onRemove(); }}
          style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </span>
      )}
    </button>
  );
}
