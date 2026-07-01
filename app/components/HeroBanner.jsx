import {Link} from 'react-router';
import {useState, useEffect, useCallback, useRef} from 'react';
import {IconButton} from '~/components/design-system';

/**
 * Cada slide es un banner ya diseñado (imagen completa con su propio
 * texto/CTA integrado). Solo necesita `image` y `to` (a dónde navega al
 * hacer click) y opcionalmente `alt` para accesibilidad.
 */
const SLIDES = [
  {
    to: '/collections/roof-roof',
    image: 'https://cdn.shopify.com/s/files/1/0761/8252/0128/files/BANNER_1_1b7f3085-4a14-45c0-b625-e57bd4147fb3.jpg?v=1771959465',
    alt: '-20% en camas y casas elevadas, válido del 12/06 al 30/06',
  },
   {
    to: '/collections/roof-roof',
    image: 'https://cdn.shopify.com/s/files/1/0761/8252/0128/files/BANNER_1_1b7f3085-4a14-45c0-b625-e57bd4147fb3.jpg?v=1771959465',
    alt: '-20% en camas y casas elevadas, válido del 12/06 al 30/06',
  },
   {
    to: '/collections/roof-roof',
    image: 'https://cdn.shopify.com/s/files/1/0761/8252/0128/files/BANNER_1_1b7f3085-4a14-45c0-b625-e57bd4147fb3.jpg?v=1771959465',
    alt: '-20% en camas y casas elevadas, válido del 12/06 al 30/06',
  },
];

const AUTOPLAY_MS = 5000;

export function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [playing, setPlaying] = useState(true);
  const timerRef = useRef(null);

  const total = SLIDES.length;

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);
  const goTo = useCallback((i) => setCurrent((i + total) % total), [total]);

  useEffect(() => {
    if (!playing) return;
    timerRef.current = setTimeout(next, AUTOPLAY_MS);
    return () => clearTimeout(timerRef.current);
  }, [current, next, playing]);

  const pause = () => clearTimeout(timerRef.current);
  const resume = () => {
    if (!playing) return;
    timerRef.current = setTimeout(next, AUTOPLAY_MS);
  };

  const slide = SLIDES[current];

  return (
    <section style={{padding: isMobile ? '1rem' : '1.5rem 2rem'}}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr',
          gap: '1rem',
        }}
      >
        {/* MAIN SLIDE — solo imagen de banner */}
        <div
          onMouseEnter={pause}
          onMouseLeave={resume}
          style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '1.25rem',
            minHeight: isMobile ? '340px' : '420px',
            border: '1px solid var(--border)',
          }}
        >
          <Link to={slide.to} style={{display: 'block', width: '100%', height: '100%'}}>
            <img
              src={slide.image}
              alt={slide.alt || ''}
              loading="eager"
              style={{
                width: '100%',
                height: isMobile ? '340px' : '420px',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </Link>

          {/* Nav buttons */}
          <span style={{position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', zIndex: 2}}>
            <IconButton
              variant="outline"
              size="md"
              onClick={prev}
              aria-label="Slide anterior"
              style={{background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(4px)'}}
              icon={<span style={{fontSize: '16px', lineHeight: 1}}>‹</span>}
            />
          </span>

          <span style={{position: 'absolute', top: '50%', right: '1rem', transform: 'translateY(-50%)', zIndex: 2}}>
            <IconButton
              variant="outline"
              size="md"
              onClick={next}
              aria-label="Slide siguiente"
              style={{background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(4px)'}}
              icon={<span style={{fontSize: '16px', lineHeight: 1}}>›</span>}
            />
          </span>

          {/* Play/Pause + Dots */}
          <div style={{
            position: 'absolute', bottom: '1rem', left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex', alignItems: 'center', gap: '8px', zIndex: 2,
            background: 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(4px)',
            borderRadius: '999px',
            padding: '6px 10px',
          }}>
            <button
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? 'Pausar carrusel' : 'Reproducir carrusel'}
              style={{
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                color: 'var(--ink)',
                display: 'flex',
                alignItems: 'center',
                padding: 0,
              }}
            >
              {playing ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="5" width="4" height="14" />
                  <rect x="14" y="5" width="4" height="14" />
                </svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            <div style={{display: 'flex', gap: '6px'}}>
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Ir al slide ${i + 1}`}
                  style={{
                    width: current === i ? '20px' : '6px',
                    height: '6px',
                    borderRadius: '999px',
                    border: 'none',
                    background: current === i ? 'var(--brand-cta)' : 'rgba(44,24,16,0.3)',
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'width 0.3s ease, background 0.3s ease',
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* SIDE CARDS — desktop only */}
        {!isMobile && (
          <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
            {/* Card 1 */}
            <div
              style={{
                borderRadius: '1.25rem',
                overflow: 'hidden',
                height: '200px',
                flex: 1,
                position: 'relative',
                backgroundImage: 'linear-gradient(to top, rgba(44,24,16,.85), rgba(44,24,16,.1)), url("https://cdn.shopify.com/s/files/1/0761/8252/0128/files/06_GRIS_M.jpg?v=1773175757")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                border: '1px solid var(--border)',
              }}
            >
              <div style={{
                position: 'absolute',
                bottom: 0, left: 0, right: 0,
                padding: '1.25rem',
              }}>
                <p style={{margin: 0, fontSize: '0.6875rem', fontWeight: 700, color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase', letterSpacing: '0.8px'}}>
                  Para perro senior
                </p>
                <h3 style={{margin: '0.25rem 0 0', fontWeight: 800, color: '#fff', fontSize: '1.0625rem', lineHeight: 1.25}}>
                  Refugios que cuidan sus articulaciones
                </h3>
              </div>
            </div>

            {/* Card 2 */}
            <div
              style={{
                borderRadius: '1.25rem',
                overflow: 'hidden',
                height: '200px',
                flex: 1,
                position: 'relative',
                border: '1px solid var(--border)',
              }}
            >
              <img
                src="../assets/download.jpg"
                alt="Diseñado para durar"
                style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover'}}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(44,24,16,.85), rgba(44,24,16,.05))',
              }}/>
              <div style={{
                position: 'absolute',
                bottom: 0, left: 0, right: 0,
                padding: '1.25rem',
              }}>
                <p style={{margin: 0, fontSize: '0.6875rem', fontWeight: 700, color: 'var(--brand-cta)', textTransform: 'uppercase', letterSpacing: '0.8px'}}>
                  Materiales premium
                </p>
                <h3 style={{margin: '0.25rem 0 0', fontWeight: 800, color: '#fff', fontSize: '1.0625rem', lineHeight: 1.25}}>
                  Diseñado para durar
                </h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}