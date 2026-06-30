import {createContext, useContext, useRef, useState, useCallback, useEffect} from 'react';

const CartAnimationContext = createContext(null);

export function useCartAnimation() {
  const ctx = useContext(CartAnimationContext);
  if (!ctx) return {triggerFly: () => {}, cartIconRef: {current: null}};
  return ctx;
}

/* ─────────────────────────────────────────────────────────────
   Provider — monta el punto volador sobre el DOM
───────────────────────────────────────────────────────────── */
export function CartAnimationProvider({children}) {
  const cartIconRef = useRef(null);
  const [dots, setDots] = useState([]);
  const idRef = useRef(0);

  const triggerFly = useCallback((originEl) => {
    if (!originEl) return;

    // Intentar obtener el destino: ref registrado o fallback por data-attr
    const targetEl =
      cartIconRef.current ??
      document.querySelector('[data-cart-icon]');

    if (!targetEl) return;

    const oRect = originEl.getBoundingClientRect();
    const tRect = targetEl.getBoundingClientRect();

    const id = ++idRef.current;
    const dot = {
      id,
      startX: oRect.left + oRect.width / 2,
      startY: oRect.top  + oRect.height / 2,
      endX:   tRect.left + tRect.width / 2,
      endY:   tRect.top  + tRect.height / 2,
    };

    setDots((prev) => [...prev, dot]);
    setTimeout(() => setDots((prev) => prev.filter((d) => d.id !== id)), 700);
  }, []);

  return (
    <CartAnimationContext.Provider value={{triggerFly, cartIconRef}}>
      {children}
      {dots.map((d) => <FlyingDot key={d.id} {...d} />)}
    </CartAnimationContext.Provider>
  );
}

/* ─────────────────────────────────────────────────────────────
   Punto que vuela con arco parabólico
───────────────────────────────────────────────────────────── */
function FlyingDot({startX, startY, endX, endY}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const dx = endX - startX;
    const dy = endY - startY;
    // Altura del arco: 30% de la distancia vertical, mínimo 80px
    const arc = Math.max(80, Math.abs(dy) * 0.35);

    el.animate(
      [
        { transform: 'translate(0px, 0px) scale(1)',                                    opacity: 1,   offset: 0    },
        { transform: `translate(${dx*0.45}px, ${dy*0.45 - arc}px) scale(0.9)`,         opacity: 1,   offset: 0.4  },
        { transform: `translate(${dx}px, ${dy}px) scale(0.35)`,                        opacity: 0,   offset: 1    },
      ],
      { duration: 620, easing: 'cubic-bezier(0.22, 0.61, 0.36, 1)', fill: 'forwards' },
    );
  }, []); // eslint-disable-line

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: startY - 15,
        left: startX - 15,
        width: 30,
        height: 30,
        borderRadius: '50%',
        background: 'var(--brand-cta)',
        zIndex: 99999,
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 3px 10px rgba(245,166,35,0.55)',
      }}
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2C1810" strokeWidth="2.5" aria-hidden="true">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <path d="M16 10a4 4 0 01-8 0"/>
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Badge animado
───────────────────────────────────────────────────────────── */
export function CartBadge({count, shadow}) {
  const prevRef  = useRef(count);
  const [pop, setPop] = useState(false);

  useEffect(() => {
    if (count > prevRef.current) {
      setPop(true);
      const t = setTimeout(() => setPop(false), 420);
      return () => clearTimeout(t);
    }
    prevRef.current = count;
  }, [count]);

  if (!count) return null;

  return (
    <>
      <style>{`
        @keyframes rrBadgePop {
          0%   { transform: scale(1); }
          35%  { transform: scale(1.65); }
          65%  { transform: scale(0.85); }
          100% { transform: scale(1); }
        }
      `}</style>
      <span
        aria-label={`${count} producto${count !== 1 ? 's' : ''} en el carrito`}
        style={{
          position: 'absolute',
          top: '-6px', right: '-6px',
          minWidth: '20px', height: '20px',
          borderRadius: '999px',
          background: 'var(--danger)',
          color: '#fff',
          fontSize: '11px', fontWeight: 800,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          lineHeight: 1, padding: '0 5px',
          boxShadow: shadow || '0 0 0 2px #fff',
          animation: pop ? 'rrBadgePop 0.42s cubic-bezier(0.34,1.56,0.64,1)' : 'none',
          willChange: 'transform',
        }}
      >
        {count > 9 ? '9+' : count}
      </span>
    </>
  );
}