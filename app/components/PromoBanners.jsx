import {Link} from 'react-router';

const BANNERS = [
  {
    img: 'https://cdn.shopify.com/s/files/1/0761/8252/0128/files/IMAGEN_2_1.jpg?v=1784647406',
    badge: 'Imperdibles',
    sub: 'Roof Roof',
    cta: 'Conoce los productos',
    to: '/collections/roof-roof',
  },
  {
    img: 'https://cdn.shopify.com/s/files/1/0761/8252/0128/files/IMAGEN_4_1.jpg?v=1784647406',
    badge: 'Camas',
    sub: 'Roof Roof',
    cta: 'Conoce los productos',
    to: '/collections/roof-roof-camas',
  },
];

export function PromoBanners() {
  return (
    <section className="rr-promo-section" aria-labelledby="rr-promo-title">
      <div className="rr-promo-section__inner">
        <h2 className="rr-promo-section__title" id="rr-promo-title">
          Lo que necesita, cuando lo necesita
        </h2>

        <div className="rr-promo-grid rr-promo-grid--two">
          {BANNERS.map((banner) => (
            <Link
              aria-label={`${banner.badge}: ${banner.cta}`}
              className="rr-promo-card rr-ui-feature-card"
              key={banner.to}
              prefetch="intent"
              to={banner.to}
            >
              <img
                alt={banner.badge}
                className="rr-promo-card__image"
                loading="lazy"
                src={banner.img}
              />

              <span className="rr-promo-card__overlay" aria-hidden="true" />

              <span className="rr-promo-card__badge rr-badge">
                <strong>{banner.badge}</strong>
                <span>{banner.sub}</span>
              </span>

              <span className="rr-promo-card__cta rr-button rr-button--brand">
                {banner.cta}
                <svg
                  aria-hidden="true"
                  fill="none"
                  height="18"
                  viewBox="0 0 24 24"
                  width="18"
                >
                  <path d="M5 12h14" stroke="currentColor" strokeWidth="2.25" />
                  <path
                    d="m13 6 6 6-6 6"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.25"
                  />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
