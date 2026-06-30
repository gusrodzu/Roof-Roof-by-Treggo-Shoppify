import {useState, useEffect, useRef} from 'react';

const TRUST_ITEMS = [
  {
    label: 'Envío gratis +$599',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="1" y="3" width="15" height="13" rx="1"/>
        <path d="M16 8h3.5a1 1 0 01.9.55L22 12v4h-6"/>
        <circle cx="6" cy="18" r="2"/>
        <circle cx="18" cy="18" r="2"/>
      </svg>
    ),
  },
  {
    label: 'Entrega en 24-72 hrs',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <circle cx="12" cy="12" r="9"/>
        <path d="M12 7v5l3 2"/>
      </svg>
    ),
  },
  {
    label: 'Pagos seguros',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="2" y="5" width="20" height="14" rx="2"/>
        <line x1="2" y1="10" x2="22" y2="10"/>
      </svg>
    ),
  },
  {
    label: 'Garantía incluida',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5l8-3z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
  },
];

export function TrustBar() {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)');
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % TRUST_ITEMS.length);
    }, 2500);
    return () => clearInterval(intervalRef.current);
  }, [isMobile]);

  return (
    <div
      style={{
        background: '#111',
        borderBottom: '1px solid #222',
        padding: '0.875rem 1.5rem',
        borderRadius: '1rem',
        margin: '1rem 0',
      }}
    >
      {/* Desktop: todos visibles */}
      {!isMobile && (
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            gap: '0.5rem 1.5rem',
          }}
        >
          {TRUST_ITEMS.map(({label, icon}) => (
            <TrustItem key={label} label={label} icon={icon} />
          ))}
        </div>
      )}

      {/* Mobile: slide con fade */}
      {isMobile && (
        <div style={{position: 'relative', overflow: 'hidden'}}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '2.5rem',
            }}
          >
            {TRUST_ITEMS.map(({label, icon}, i) => (
              <div
                key={label}
                style={{
                  position: i === 0 ? 'relative' : 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: current === i ? 1 : 0,
                  transition: 'opacity 0.5s ease',
                  pointerEvents: current === i ? 'auto' : 'none',
                }}
              >
                <TrustItem label={label} icon={icon} />
              </div>
            ))}
          </div>

          {/* Dots */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '6px',
              marginTop: '0.625rem',
            }}
          >
            {TRUST_ITEMS.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setCurrent(i);
                  clearInterval(intervalRef.current);
                  intervalRef.current = setInterval(() => {
                    setCurrent((prev) => (prev + 1) % TRUST_ITEMS.length);
                  }, 2500);
                }}
                aria-label={`Ir a item ${i + 1}`}
                style={{
                  width: current === i ? '18px' : '6px',
                  height: '6px',
                  borderRadius: '999px',
                  background: current === i ? 'var(--brand-cta)' : '#444',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  transition: 'width 0.3s ease, background 0.3s ease',
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function TrustItem({label, icon}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        color: '#e5e9f0',
        whiteSpace: 'nowrap',
      }}
    >
      <span style={{display: 'flex', color: '#ffffff', flexShrink: 0}}>{icon}</span>
      <span style={{fontSize: '1.05rem', fontWeight: 700}}>{label}</span>
    </div>
  );
}