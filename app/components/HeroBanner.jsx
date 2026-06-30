import {Link} from 'react-router';
import {useState, useEffect, useCallback, useRef} from 'react';
import {Button, IconButton} from '~/components/design-system';

const SLIDES = [
  {
    badge: '-20%',
    badgeBg: 'var(--danger)',
    title: 'En camas y casas elevadas',
    subtitle: 'Válido del 12/06 al 30/06 · Solo en roofroof.mx',
    cta: 'Comprar ahora',
    to: '/collections/roof-roof',
    image: 'https://cdn.shopify.com/s/files/1/0761/8252/0128/files/PORTADACOVAGRISCHICA.jpg?v=1752704348',
    bg: 'linear-gradient(135deg, var(--surface-cream) 0%, #fdf0d5 100%)',
  },
  {
    badge: 'Nuevo',
    badgeBg: 'var(--success)',
    title: 'Jaulas y corrales portátiles',
    subtitle: 'Seguridad y libertad para tu mascota',
    cta: 'Ver jaulas',
    to: '/collections/roof-roof-jaulas',
    image: 'https://cdn.shopify.com/s/files/1/0761/8252/0128/files/PORTADA_M.jpg?v=1761848374',
    bg: 'linear-gradient(135deg, #f0f3fd 0%, #e4eafc 100%)',
  },
  {
    badge: 'Envío gratis',
    badgeBg: 'var(--brand-cta)',
    badgeColor: 'var(--ink)',
    title: 'En compras desde $599',
    subtitle: 'Aplica en toda la colección Roof Roof',
    cta: 'Ver colección',
    to: '/collections/roof-roof',
    image: 'https://cdn.shopify.com/s/files/1/0761/8252/0128/files/1_fdd0a705-26c7-433c-877e-5853bcaf9a2a.jpg?v=1746035399',
    bg: 'linear-gradient(135deg, #eef0fb 0%, #dde3f8 100%)',
  },
];

const AUTOPLAY_MS = 5000;

export function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
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
    timerRef.current = setTimeout(next, AUTOPLAY_MS);
    return () => clearTimeout(timerRef.current);
  }, [current, next]);

  const pause = () => clearTimeout(timerRef.current);
  const resume = () => { timerRef.current = setTimeout(next, AUTOPLAY_MS); };

  const slide = SLIDES[current];

  return (
    <section style={{padding: isMobile ? '1rem' : '1.5rem 2rem'}}>
      <div
        onMouseEnter={pause}
        onMouseLeave={resume}
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr',
          gap: '1rem',
        }}
      >
        {/* MAIN SLIDE */}
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '1.25rem',
            minHeight: isMobile ? '340px' : '420px',
            padding: isMobile ? '1.75rem 1.5rem' : '3rem 2.5rem',
            background: slide.bg,
            border: '1px solid var(--border)',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            transition: 'background 0.4s ease',
          }}
        >
          {/* Copy */}
          <div style={{zIndex: 1, maxWidth: isMobile ? '100%' : '340px'}}>
            <span style={{
              display: 'inline-flex',
              background: slide.badgeBg,
              color: slide.badgeColor ?? '#fff',
              padding: '5px 14px',
              borderRadius: '999px',
              fontWeight: 800,
              marginBottom: '1rem',
              fontSize: '0.875rem',
              letterSpacing: '0.3px',
            }}>
              {slide.badge}
            </span>

            <h2 style={{
              fontSize: isMobile ? '1.5rem' : '2rem',
              lineHeight: 1.1,
              color: 'var(--ink)',
              margin: '0 0 0.875rem',
              fontWeight: 800,
              letterSpacing: '-0.02em',
            }}>
              {slide.title}
            </h2>

            <p style={{
              fontSize: '0.9375rem',
              color: 'var(--ink-soft)',
              margin: '0 0 1.5rem',
              lineHeight: 1.55,
            }}>
              {slide.subtitle}
            </p>

            <Link
              to={slide.to}
              style={{textDecoration: 'none', display: 'inline-block'}}
            >
              <Button
                variant="primary"
                size="lg"
                iconAfter={
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
                  </svg>
                }
                style={{boxShadow: '0 8px 24px rgba(245,166,35,0.3)'}}
              >
                {slide.cta}
              </Button>
            </Link>
          </div>

          {/* Product image */}
          <img
            src={slide.image}
            alt={slide.title}
            loading="lazy"
            style={{
              width: isMobile ? '200px' : '340px',
              height: isMobile ? '200px' : '340px',
              objectFit: 'cover',
              borderRadius: '1rem',
              flexShrink: 0,
              boxShadow: '0 20px 50px rgba(44,24,16,0.14)',
              alignSelf: isMobile ? 'center' : 'auto',
            }}
          />

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

          {/* Dots */}
          <div style={{
            position: 'absolute', bottom: '1rem', left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex', gap: '6px', zIndex: 2,
          }}>
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
                backgroundImage: 'linear-gradient(to top, rgba(44,24,16,.85), rgba(44,24,16,.1)), url("https://cdn.shopify.com/s/files/1/0761/8252/0128/files/WhatsApp_Image_2026-01-12_at_2.22.35_PM_177222520669a202b690d334996.jpg?v=1772225208")',
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
                src="https://cdn.shopify.com/s/files/1/0761/8252/0128/files/dog.png?v=1781818470"
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
