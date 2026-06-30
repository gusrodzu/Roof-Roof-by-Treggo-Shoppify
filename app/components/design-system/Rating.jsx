/**
 * Rating — estrellas + número + contador de reseñas
 *
 * Props:
 *   value      — rating 0-5 (acepta decimales, ej. 4.5)
 *   count      — número de reseñas (opcional)
 *   showValue  — muestra el número decimal antes de las estrellas
 *   size       — tamaño de las estrellas en px (default: 14)
 */
export function Rating({value = 0, count, showValue = false, size = 14}) {
  const stars = Array.from({length: 5}, (_, i) => {
    const filled = value - i;
    if (filled >= 1)      return 'full';
    if (filled >= 0.5)    return 'half';
    return 'empty';
  });

  return (
    <div style={{display: 'inline-flex', alignItems: 'center', gap: '0.3rem'}}>
      {showValue && (
        <span style={{fontSize: '0.875rem', fontWeight: 800, color: 'var(--ink)'}}>
          {value.toFixed(1)}
        </span>
      )}
      <div style={{display: 'flex', gap: '1px'}}>
        {stars.map((type, i) => (
          <Star key={i} type={type} size={size} />
        ))}
      </div>
      {count != null && (
        <span style={{fontSize: '0.8125rem', color: 'var(--ink-muted)'}}>
          ({count})
        </span>
      )}
    </div>
  );
}

function Star({type, size}) {
  const id = `half-${Math.random().toString(36).slice(2, 8)}`;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      {type === 'half' && (
        <defs>
          <linearGradient id={id} x1="0" x2="1" y1="0" y2="0">
            <stop offset="50%" stopColor="var(--brand-cta)" />
            <stop offset="50%" stopColor="var(--border)" />
          </linearGradient>
        </defs>
      )}
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14l-5-4.87 6.91-1.01z"
        fill={type === 'full' ? 'var(--brand-cta)' : type === 'half' ? `url(#${id})` : 'var(--border)'}
      />
    </svg>
  );
}
