import {forwardRef} from 'react';

/**
 * Button — componente base del Design System Roof Roof.
 * La apariencia se hereda del sistema visual del selector de productos.
 *
 * Variants: primary | outline | ghost | danger
 * Sizes: sm | md | lg
 */
export const Button = forwardRef(function Button(
  {
    variant = 'primary',
    size = 'md',
    icon = null,
    iconAfter = null,
    fullWidth = false,
    disabled = false,
    loading = false,
    onClick,
    type = 'button',
    children,
    className = '',
    style: styleOverride = {},
    ...rest
  },
  ref,
) {
  const isDisabled = disabled || loading;

  const sizes = {
    sm: {minHeight: '40px', padding: '0.55rem 0.95rem', fontSize: '0.8125rem'},
    md: {minHeight: '48px', padding: '0.76rem 1.2rem', fontSize: '0.9rem'},
    lg: {minHeight: '54px', padding: '0.9rem 1.45rem', fontSize: '1rem'},
  };

  const variantClass = {
    primary: 'rr-button--brand',
    outline: 'rr-button--outline',
    ghost: 'rr-button--ghost',
    danger: 'rr-button--danger',
  }[variant];

  const sizeStyle = sizes[size] ?? sizes.md;

  return (
    <button
      ref={ref}
      type={type}
      className={`rr-button ${variantClass ?? 'rr-button--brand'} ${className}`.trim()}
      disabled={isDisabled}
      onClick={onClick}
      style={{
        ...sizeStyle,
        width: fullWidth ? '100%' : 'auto',
        ...styleOverride,
      }}
      {...rest}
    >
      {loading ? (
        <LoadingSpinner size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} />
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
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      aria-hidden="true"
      style={{animation: 'rrSpin 0.8s linear infinite'}}
    >
      <style>{`@keyframes rrSpin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  );
}
