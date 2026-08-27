import {Link} from 'react-router';

export function LifeStagesSection() {
  const STAGES = [
    {
      img: 'https://cdn.shopify.com/s/files/1/0761/8252/0128/files/LOS_FAVORITOS.jpg?v=1784647406',
      // line1: '',
      // line2: 'Favoritos',
      // label: 'Favoritos',
      to: '/collections/roof-roof-casas',
    },
    {
      img: 'https://cdn.shopify.com/s/files/1/0761/8252/0128/files/IMAGEN___GATITO_1.jpg?v=1784647406',
      // line1: 'TIENDA PARA',
      // line2: 'PERRO SENIOR',
      // label: 'Perro senior',
      to: '/collections/roof-roof-camas',
    },
    {
      img: 'https://cdn.shopify.com/s/files/1/0761/8252/0128/files/IMAGEN___PERRITO_1.jpg?v=1784647406',
      // line1: 'TIENDA PARA',
      // line2: 'GATITO',
      // label: 'Gatito',
      to: '/collections/roof-roof-casas',
    },
    {
      img: 'https://cdn.shopify.com/s/files/1/0761/8252/0128/files/LO_NUEVO.jpg?v=1784647405',
      // line1: 'TIENDA PARA',
      // line2: 'GATO SENIOR',
      // label: 'Gato senior',
      to: '/collections/roof-roof-camas',
    },
  ];

  return (
    <section
      className="rr-life-stages"
      style={{background: '#fff', padding: '2.5rem 0'}}
    >
      <div className="rr-life-stages__inner" style={{width: '100%'}}>
        {/* ── Banner imagen full-width ── */}
        <Link
          className="rr-life-stages__banner rr-ui-feature-card"
          to="/collections/roof-roof"
          style={{
            display: 'block',
            width: '100%',
            marginBottom: '2rem',
            textDecoration: 'none',
            overflow: 'hidden',
            lineHeight: 0,
          }}
        >
          <img
            src="https://cdn.shopify.com/s/files/1/0761/8252/0128/files/IMAGEN_5_BANNER_1.jpg?v=1784647406"
            alt="Espacios pensados para vidas más felices"
            style={{
              width: '100%',
              height: '220px',
              objectFit: 'cover',
              objectPosition: 'center',
              display: 'block',
            }}
          />
        </Link>

        {/* ── Título ── */}
        <h2
          className="rr-life-stages__title"
          style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: 'var(--ink)',
            margin: '0 0 1.25rem',
            padding: '0 1.5rem',
            maxWidth: '1280px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          Cuidamos cada etapa de su vida contigo
        </h2>

        {/* ── Grid 4 tarjetas ── */}
        <div
          className="rr-life-stages__grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
            gap: '1rem',
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 1.5rem',
          }}
        >
          {STAGES.map((stage) => (
            <Link
              className="rr-life-stage-card rr-ui-card rr-ui-card--interactive"
              key={stage.to + stage.label}
              to={stage.to}
              style={{
                display: 'block',
                position: 'relative',
                borderRadius: '0.75rem',
                overflow: 'hidden',
                aspectRatio: '3 / 4',
                border: '1.5px solid var(--border)',
                textDecoration: 'none',
                transition: 'border-color 0.15s, transform 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--brand-cta)';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <img
                src={stage.img}
                alt={stage.label}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
                onError={(e) => {
                  e.currentTarget.src = `https://placehold.co/300x400/e8e4dc/2C1810?text=${encodeURIComponent(stage.label)}`;
                }}
              />

              {/* Overlay */}
              {/* <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(44,24,16,0.88) 0%, rgba(44,24,16,0.15) 50%, transparent 75%)',
              }}/> */}

              {/* Texto */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '1rem',
                }}
              >
                <p
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: 'rgba(245,166,35,0.85)',
                    margin: 0,
                    lineHeight: 1.3,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  {stage.line1}
                </p>
                <p
                  style={{
                    fontSize: '1rem',
                    fontWeight: 800,
                    color: '#fff',
                    margin: 0,
                    lineHeight: 1.2,
                    textTransform: 'uppercase',
                  }}
                >
                  {stage.line2}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
