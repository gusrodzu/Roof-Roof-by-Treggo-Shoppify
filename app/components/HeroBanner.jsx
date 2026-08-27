import {Link} from 'react-router';
import {useState, useEffect, useCallback, useRef} from 'react';
import {IconButton} from '~/components/design-system';

const SLIDES = [
  {
    to: '/collections/roof-roof',
    image:
      'https://cdn.shopify.com/s/files/1/0761/8252/0128/files/IMAGEN_1__1.jpg?v=1784648595',
    alt: '-20% en camas y casas elevadas, válido del 12/06 al 30/06',
  },
  // {
  //   to: '/collections/roof-roof',
  //   image: 'https://cdn.shopify.com/s/files/1/0761/8252/0128/files/IMAGEN_1__1.jpg?v=1784647406',
  //   alt: '-20% en camas y casas elevadas, válido del 12/06 al 30/06',
  // },
];

const SIDE_CARDS = [
  {
    bg: 'linear-gradient(to top, rgba(7, 7, 7, 0.19), rgba(3, 3, 3, 0.39)), url("https://cdn.shopify.com/s/files/1/0761/8252/0128/files/IMAGEN_4_1.jpg?v=1784647406")',
    label: 'Materiales premium',
    title: 'Diseñado para durar',
    labelColor: 'rgb(255, 255, 255)',
    to: '/collections/roof-roof',
  },
  {
    img: 'https://cdn.shopify.com/s/files/1/0761/8252/0128/files/IMAGEN_3_1.jpg?v=1784647406',
    label: 'Para perro senior',
    title: 'Refugios que cuidan sus articulaciones',
    labelColor: 'rgb(255, 255, 255)',
    to: '/collections/roof-roof-casas',
  },
];

const AUTOPLAY_MS = 5000;

export function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);
  const timerRef = useRef(null);
  const total = SLIDES.length;

  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);
  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + total) % total),
    [total],
  );
  const goTo = useCallback((i) => setCurrent((i + total) % total), [total]);

  useEffect(() => {
    if (!playing) return;
    timerRef.current = setTimeout(next, AUTOPLAY_MS);
    return () => clearTimeout(timerRef.current);
  }, [current, next, playing]);

  const pause = () => clearTimeout(timerRef.current);
  const resume = () => {
    if (playing) timerRef.current = setTimeout(next, AUTOPLAY_MS);
  };

  const slide = SLIDES[current];

  return (
    <section className="rr-home-hero" style={{padding: '1.5rem 2rem'}}>
      {/* ── Layout grid ── */}
      <div
        className="rr-home-hero__grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '0.75rem',
        }}
      >
        {/* ── SLIDE PRINCIPAL ── */}
        <div
          className="rr-home-hero__main rr-ui-feature-card"
          onMouseEnter={pause}
          onMouseLeave={resume}
          style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '0.875rem',
            minHeight: '480px',
            border: '1px solid var(--border)',
          }}
        >
          <Link
            to={slide.to}
            style={{display: 'block', width: '100%', height: '100%'}}
          >
            <img
              src={slide.image}
              alt={slide.alt || ''}
              loading="eager"
              style={{
                width: '100%',
                height: '480px',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </Link>

          {total > 1 ? (
            <>
              {/* Nav prev */}
              <span
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '0.75rem',
                  transform: 'translateY(-50%)',
                  zIndex: 2,
                }}
              >
                <IconButton
                  variant="outline"
                  size="md"
                  onClick={prev}
                  aria-label="Slide anterior"
                  style={{
                    background: 'rgba(255,255,255,0.85)',
                    backdropFilter: 'blur(4px)',
                  }}
                  icon={
                    <span style={{fontSize: '16px', lineHeight: 1}}>‹</span>
                  }
                />
              </span>

              {/* Nav next */}
              <span
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '0.75rem',
                  transform: 'translateY(-50%)',
                  zIndex: 2,
                }}
              >
                <IconButton
                  variant="outline"
                  size="md"
                  onClick={next}
                  aria-label="Slide siguiente"
                  style={{
                    background: 'rgba(255,255,255,0.85)',
                    backdropFilter: 'blur(4px)',
                  }}
                  icon={
                    <span style={{fontSize: '16px', lineHeight: 1}}>›</span>
                  }
                />
              </span>

              {/* Play/Pause + Dots */}
              <div
                className="rr-home-hero__controls"
                style={{
                  position: 'absolute',
                  bottom: '0.75rem',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  zIndex: 2,
                  background: 'rgba(255,255,255,0.85)',
                  backdropFilter: 'blur(4px)',
                  borderRadius: '999px',
                  padding: '5px 10px',
                }}
              >
                <button
                  onClick={() => setPlaying((p) => !p)}
                  aria-label={playing ? 'Pausar' : 'Reproducir'}
                  style={{
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    color: 'var(--ink)',
                    display: 'flex',
                    padding: 0,
                  }}
                >
                  {playing ? (
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <rect x="6" y="5" width="4" height="14" />
                      <rect x="14" y="5" width="4" height="14" />
                    </svg>
                  ) : (
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>
                <div style={{display: 'flex', gap: '5px'}}>
                  {SLIDES.map((item, i) => (
                    <button
                      key={item.image}
                      onClick={() => goTo(i)}
                      aria-label={`Slide ${i + 1}`}
                      style={{
                        width: current === i ? '18px' : '6px',
                        height: '6px',
                        borderRadius: '999px',
                        border: 'none',
                        padding: 0,
                        cursor: 'pointer',
                        background:
                          current === i
                            ? 'var(--brand-cta)'
                            : 'rgba(44,24,16,0.3)',
                        transition: 'width 0.3s ease, background 0.3s ease',
                      }}
                    />
                  ))}
                </div>
              </div>
            </>
          ) : null}
        </div>

        {/* ── SIDE CARDS ── */}
        {/* Desktop: columna vertical */}
        <div
          className="rr-home-hero__side"
          style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}
        >
          {SIDE_CARDS.map((card) => (
            <SideCard key={card.title} card={card} height="50%" />
          ))}
        </div>
      </div>

      {/* Mobile: side cards como fila horizontal debajo del slider */}
      <div
        className="rr-home-hero__mobile-side"
        style={{
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '0.75rem',
          marginTop: '0.75rem',
          paddingBottom: '0.75rem',
        }}
      >
        {SIDE_CARDS.map((card) => (
          <SideCard key={card.title} card={card} height="130px" />
        ))}
      </div>
    </section>
  );
}

function SideCard({card, height}) {
  return (
    <Link
      className="rr-home-hero__side-card rr-ui-feature-card"
      to={card.to}
      style={{
        display: 'block',
        position: 'relative',
        borderRadius: '0.875rem',
        overflow: 'hidden',
        height: height ?? '200px',
        flex: 1,
        border: '1px solid var(--border)',
        textDecoration: 'none',
        ...(card.bg
          ? {
              backgroundImage: card.bg,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : {}),
      }}
    >
      {card.img && (
        <>
          <img
            src={card.img}
            alt={card.title}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to top, rgba(44,24,16,.85), rgba(44,24,16,.05))',
            }}
          />
        </>
      )}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '0.875rem',
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: '0.625rem',
            fontWeight: 700,
            color: card.labelColor,
            textTransform: 'uppercase',
            letterSpacing: '0.8px',
          }}
        >
          {card.label}
        </p>
        <h3
          style={{
            margin: '0.2rem 0 0',
            fontWeight: 800,
            color: '#fff',
            fontSize: '0.875rem',
            lineHeight: 1.25,
          }}
        >
          {card.title}
        </h3>
      </div>
    </Link>
  );
}
