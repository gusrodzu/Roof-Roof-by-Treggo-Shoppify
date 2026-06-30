import {useState} from 'react';

/**
 * IconButton — botón circular solo-ícono del Design System
 *
 * Variants:
 *   ghost   — sin fondo, solo ícono (ej. lupa de búsqueda)
 *   outline — borde circular (ej. favorito ♡)
 *   filled  — fondo brand-cta (ej. carrito con badge)
 *
 * Props:
 *   variant, size (sm|md|lg), badge (número opcional), active (favorito marcado)
 */
export function IconButton({
  variant  = 'ghost',
  size     = 'md',
  icon,
  badge,
  active   = false,
  onClick,
  'aria-label': ariaLabel,
  style: styleOverride = {},
  ...rest
}) {
  const [hovered, setHovered] = useState(false);

  const SIZES = {sm: 32, md: 40, lg: 48};
  const px = SIZES[size] ?? SIZES.md;

  const VARIANTS = {
    ghost:   {background: 'transparent', border: 'none', color: 'var(--ink)'},
    outline: {background: '#fff', border: '1.5px solid var(--border)', color: active ? 'var(--danger)' : 'var(--ink)'},
    filled:  {background: 'var(--brand-cta)', border: 'none', color: 'var(--ink)'},
  };

  const base = VARIANTS[variant] ?? VARIANTS.ghost;
  const hoverStyle = variant === 'outline'
    ? {borderColor: 'var(--brand-cta)'}
    : variant === 'filled'
    ? {background: 'var(--brand-cta-hover)'}
    : {background: 'var(--surface-cool)'};

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...base,
        ...(hovered ? hoverStyle : {}),
        width: `${px}px`, height: `${px}px`,
        borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', position: 'relative',
        flexShrink: 0, padding: 0,
        transition: 'background 0.15s, border-color 0.15s, color 0.15s',
        ...styleOverride,
      }}
      {...rest}
    >
      {icon}
      {badge != null && badge > 0 && (
        <span style={{
          position: 'absolute', top: '-4px', right: '-4px',
          minWidth: '18px', height: '18px', padding: '0 4px',
          borderRadius: '999px',
          background: 'var(--danger)', color: '#fff',
          fontSize: '10px', fontWeight: 800,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 0 2px #fff',
        }}>
          {badge > 9 ? '9+' : badge}
        </span>
      )}
    </button>
  );
}
