import {useEffect, useState} from 'react';

const TRUST_ITEMS = [
  {
    label: 'Envío gratis desde $599',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <rect x="1" y="3" width="15" height="13" rx="1" />
        <path d="M16 8h3.5a1 1 0 0 1 .9.55L22 12v4h-6" />
        <circle cx="6" cy="18" r="2" />
        <circle cx="18" cy="18" r="2" />
      </svg>
    ),
  },
  {
    label: 'Envíos según cobertura',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    label: 'Pago protegido',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    ),
  },
  {
    label: 'Compra con respaldo',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <path d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5l8-3z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
];

export function TrustBar() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TRUST_ITEMS.length);
    }, 2600);

    return () => window.clearInterval(interval);
  }, []);

  const activeItem = TRUST_ITEMS[currentIndex] ?? TRUST_ITEMS[0];

  return (
    <section
      className="trust-bar"
      aria-label="Beneficios de comprar en Roof Roof"
    >
      <div className="trust-bar-inner trust-bar-inner--desktop">
        {TRUST_ITEMS.map(({label, icon}) => (
          <div className="trust-item" key={label}>
            <span className="trust-icon">{icon}</span>
            <span className="trust-label">{label}</span>
          </div>
        ))}
      </div>

      <div className="trust-mobile-slider" aria-live="polite">
        <div className="trust-mobile-slide" key={activeItem.label}>
          <span className="trust-icon">{activeItem.icon}</span>
          <span className="trust-label">{activeItem.label}</span>
        </div>
      </div>
    </section>
  );
}
