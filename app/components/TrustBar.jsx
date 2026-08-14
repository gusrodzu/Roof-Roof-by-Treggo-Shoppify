import {useEffect, useRef, useState} from 'react';

const TRUST_ITEMS = [
  {
    label: 'Envío gratis +$599',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <rect x="1" y="3" width="15" height="13" rx="1" />
        <path d="M16 8h3.5a1 1 0 01.9.55L22 12v4h-6" />
        <circle cx="6" cy="18" r="2" />
        <circle cx="18" cy="18" r="2" />
      </svg>
    ),
  },
  {
    label: 'Envíos en menos de 24 hrs',
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
    label: 'Pago seguro con Mercado Pago',
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
    label: 'Garantía Roof Roof',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <path d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5l8-3z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
];

const AUTOPLAY_TIME = 3500;

export function TrustBar() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);

  const startAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % TRUST_ITEMS.length);
    }, AUTOPLAY_TIME);
  };

  useEffect(() => {
    startAutoplay();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const goTo = (index) => {
    setCurrent(index);
    startAutoplay();
  };

  return (
    <>
      <style>{`
        .trust-bar {
          width: min(1200px, calc(100% - 32px));
          margin: 16px auto;

          background: #111;
          border: 1px solid #242424;
          border-radius: 16px;

          box-sizing: border-box;
          overflow: hidden;
        }

        .trust-bar-inner {
          width: 100%;
          min-height: 72px;

          display: flex;
          align-items: center;
          justify-content: center;

          padding: 12px 20px;
          box-sizing: border-box;
        }

        /* =========================
           DESKTOP
        ========================= */

        .trust-desktop {
          width: 100%;

          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));

          align-items: center;

          gap: 16px;
        }

        .trust-desktop .trust-item {
          justify-content: center;
        }

        /* =========================
           MOBILE
        ========================= */

        .trust-mobile {
          display: none;
          width: 100%;
        }

        .trust-mobile-slider {
          position: relative;

          width: 100%;
          min-height: 44px;

          display: flex;
          align-items: center;
          justify-content: center;

          overflow: hidden;
        }

        .trust-mobile-item {
          position: absolute;
          inset: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          opacity: 0;
          transform: translateY(6px);

          transition:
            opacity 0.4s ease,
            transform 0.4s ease;

          pointer-events: none;
        }

        .trust-mobile-item.is-active {
          opacity: 1;
          transform: translateY(0);

          pointer-events: auto;
        }

        /* =========================
           TRUST ITEM
        ========================= */

        .trust-item {
          display: flex;
          align-items: center;

          gap: 9px;

          min-width: 0;

          color: #e8e8e8;
        }

        .trust-icon {
          width: 22px;
          height: 22px;

          display: flex;
          align-items: center;
          justify-content: center;

          flex: 0 0 22px;

          color: #fff;
        }

        .trust-icon svg {
          width: 100%;
          height: 100%;

          display: block;
        }

        .trust-label {
          min-width: 0;

          color: #e8e8e8;

          font-size: 15px;
          font-weight: 700;

          line-height: 1.25;

          white-space: nowrap;
        }

        /* =========================
           DOTS
        ========================= */

        .trust-dots {
          display: flex;
          align-items: center;
          justify-content: center;

          gap: 6px;

          margin-top: 8px;
        }

        .trust-dot {
          width: 6px;
          height: 6px;

          margin: 0;
          padding: 0;

          border: 0;
          border-radius: 999px;

          background: #444;

          cursor: pointer;

          transition:
            width 0.25s ease,
            background 0.25s ease;
        }

        .trust-dot:hover {
          background: #666;
        }

        .trust-dot.is-active {
          width: 18px;
          background: var(--brand-cta, #fff);
        }

        .trust-dot:focus-visible {
          outline: 2px solid #fff;
          outline-offset: 3px;
        }

        /* =========================
           TABLET
        ========================= */

        @media (max-width: 1024px) {
          .trust-bar {
            width: calc(100% - 24px);
          }

          .trust-bar-inner {
            min-height: 64px;

            padding: 10px 14px;
          }

          .trust-desktop {
            gap: 10px;
          }

          .trust-item {
            gap: 7px;
          }

          .trust-icon {
            width: 19px;
            height: 19px;
            flex-basis: 19px;
          }

          .trust-label {
            font-size: 13px;
          }
        }

        /* =========================
           MOBILE
        ========================= */

        @media (max-width: 767px) {
          .trust-bar {
            width: calc(100% - 20px);

            margin: 12px auto;

            border-radius: 14px;
          }

          .trust-bar-inner {
            min-height: 72px;

            padding: 10px 12px;
          }

          .trust-desktop {
            display: none;
          }

          .trust-mobile {
            display: block;
          }

          .trust-mobile-slider {
            min-height: 42px;
          }

          .trust-mobile-item {
            padding: 0 8px;
            box-sizing: border-box;
          }

          .trust-item {
            width: 100%;

            justify-content: center;

            gap: 8px;
          }

          .trust-icon {
            width: 20px;
            height: 20px;
            flex-basis: 20px;
          }

          .trust-label {
            max-width: calc(100% - 32px);

            font-size: 14px;
            line-height: 1.25;

            text-align: center;

            white-space: normal;
          }

          .trust-dots {
            margin-top: 6px;
          }
        }

        /* =========================
           MOBILE PEQUEÑO
        ========================= */

        @media (max-width: 380px) {
          .trust-bar {
            width: calc(100% - 16px);
            border-radius: 12px;
          }

          .trust-bar-inner {
            padding: 9px 8px;
          }

          .trust-mobile-slider {
            min-height: 40px;
          }

          .trust-label {
            font-size: 12.5px;
          }

          .trust-icon {
            width: 18px;
            height: 18px;
            flex-basis: 18px;
          }

          .trust-item {
            gap: 6px;
          }

          .trust-dots {
            gap: 5px;
          }

          .trust-dot {
            width: 5px;
            height: 5px;
          }

          .trust-dot.is-active {
            width: 15px;
          }
        }

        /* =========================
           REDUCE MOTION
        ========================= */

        @media (prefers-reduced-motion: reduce) {
          .trust-mobile-item,
          .trust-dot {
            transition: none;
          }
        }
      `}</style>

      <div className="trust-bar">
        <div className="trust-bar-inner">

          {/* DESKTOP / TABLET */}

          <div className="trust-desktop">
            {TRUST_ITEMS.map(({label, icon}) => (
              <TrustItem
                key={label}
                label={label}
                icon={icon}
              />
            ))}
          </div>

          {/* MOBILE */}

          <div
            className="trust-mobile"
            aria-label="Beneficios de Roof Roof"
          >
            <div
              className="trust-mobile-slider"
              aria-live="polite"
            >
              {TRUST_ITEMS.map(({label, icon}, index) => (
                <div
                  key={label}
                  className={`trust-mobile-item ${
                    current === index ? 'is-active' : ''
                  }`}
                  aria-hidden={current !== index}
                >
                  <TrustItem
                    label={label}
                    icon={icon}
                  />
                </div>
              ))}
            </div>

            <div className="trust-dots">
              {TRUST_ITEMS.map((item, index) => (
                <button
                  key={item.label}
                  type="button"
                  className={`trust-dot ${
                    current === index ? 'is-active' : ''
                  }`}
                  onClick={() => goTo(index)}
                  aria-label={`Mostrar beneficio: ${item.label}`}
                  aria-current={current === index ? 'true' : undefined}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

function TrustItem({label, icon}) {
  return (
    <div className="trust-item">
      <span className="trust-icon">
        {icon}
      </span>

      <span className="trust-label">
        {label}
      </span>
    </div>
  );
}