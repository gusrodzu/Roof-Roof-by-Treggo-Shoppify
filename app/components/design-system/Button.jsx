import {useState, forwardRef} from 'react';

/**
 * Button — componente base del Design System Roof Roof
 * Estilo "sticker": sombra sutil debajo que da efecto de elevación/pegatina
 *
 * Variants:
 *   primary  — fondo brand-cta, texto ink, sticker-shadow (ej. "Agregar al carrito")
 *   outline  — borde ink grueso, fondo blanco (ej. "Ver detalle")
 *   ghost    — sin fondo ni borde, solo texto (ej. "Cancelar")
 *   danger   — fondo danger, texto blanco, sticker-shadow (ej. "Eliminar")
 *   disabled — fondo gris, no clickeable (ej. "Agotado")
 *
 * Sizes: sm | md | lg
 */
export const Button = forwardRef(function Button({
  variant   = 'primary',
  size      = 'md',
  icon      = null,
  iconAfter = null,
  fullWidth = false,
  disabled  = false,
  loading   = false,
  onClick,
  type      = 'button',
  children,
  style: styleOverride = {},
  ...rest
}, ref) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const isDisabled = disabled || loading;

  const SIZES = {
    sm: {padding: '0.5rem 1.125rem',  fontSize: '0.8125rem', gap: '0.375rem', iconSize: 14},
    md: {padding: '0.75rem 1.625rem', fontSize: '0.9375rem', gap: '0.5rem',   iconSize: 16},
    lg: {padding: '0.9375rem 1.875rem', fontSize: '1rem',    gap: '0.5rem',   iconSize: 18},
  };
  const s = SIZES[size] ?? SIZES.md;

  // Sombra "sticker" — da el efecto de pegatina elevada que se ve en el Design System
  const stickerShadow  = '0 5px 0 rgb(0, 0, 0)';
  const stickerShadowPressed = '0 1px 0 rgba(44,24,16,0.18)';

  const VARIANTS = {
    primary: {
      base:     {background: 'var(--brand-cta)', color: 'var(--ink)', border: 'none', boxShadow: stickerShadow},
      hover:    {background: 'var(--brand-cta-hover)'},
      disabled: {background: 'var(--border)', color: 'var(--ink-muted)', boxShadow: 'none'},
    },
    outline: {
      base:     {background: '#fff', color: 'var(--ink)', border: '2px solid var(--ink)', boxShadow: 'none'},
      hover:    {background: 'var(--ink)', color: 'var(--brand-cta)'},
      disabled: {background: '#fff', color: 'var(--ink-muted)', border: '2px solid var(--border)'},
    },
    ghost: {
      base:     {background: 'transparent', color: 'var(--ink)', border: 'none', boxShadow: 'none'},
      hover:    {color: 'var(--brand-cta-hover)'},
      disabled: {color: 'var(--ink-muted)'},
    },
    danger: {
      base:     {background: 'var(--danger)', color: '#fff', border: 'none'},
      hover:    {background: '#a8311f'},
      disabled: {background: 'var(--border)', color: 'var(--ink-muted)', boxShadow: 'none'},
    },
  };

  const v = VARIANTS[variant] ?? VARIANTS.primary;
  let activeStyle = isDisabled ? v.disabled : (hovered ? {...v.base, ...v.hover} : v.base);

  // Efecto press: la sombra se reduce y el botón "baja" 2px al hacer click
  const hasSticker = (variant === 'primary' || variant === 'danger') && !isDisabled;
  if (hasSticker && pressed) {
    activeStyle = {...activeStyle, boxShadow: variant === 'primary' ? stickerShadowPressed : '0 1px 0 rgba(150,40,25,0.35)'};
  }

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        ...activeStyle,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: s.gap,
        padding: s.padding,
        fontSize: s.fontSize,
        fontWeight: 800,
        borderRadius: '999px',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        fontFamily: 'inherit',
        width: fullWidth ? '100%' : 'auto',
        transition: 'background 0.15s, color 0.15s, transform 0.1s, box-shadow 0.1s',
        letterSpacing: '0.1px',
        transform: hasSticker && pressed ? 'translateY(2px)' : 'translateY(0)',
        ...styleOverride,
      }}
      {...rest}
    >
      {loading ? (
        <LoadingSpinner size={s.iconSize} />
      ) : (
        <>
          {icon}
          {children}
          {iconAfter}
        </>
      )}
    </button>
  );
});

function LoadingSpinner({size = 16}) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2.5"
      aria-hidden="true"
      style={{animation: 'rrSpin 0.8s linear infinite'}}
    >
      <style>{`@keyframes rrSpin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
    </svg>
  );
}