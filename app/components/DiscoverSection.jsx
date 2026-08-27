import {Image} from '@shopify/hydrogen';
import {Link} from 'react-router';
import styles from '~/styles/DiscoverSection.module.css';

const DISCOVER_ITEMS = [
  {
    title: 'El refugio que tu mascota merece',
    copy: 'Casas funcionales para crear un espacio cómodo, protegido y fácil de integrar en casa.',
    to: '/collections/roof-roof-casas',
  },
  {
    title: 'Alimentación más práctica cada día',
    copy: 'Dispensadores y soluciones para organizar mejor sus rutinas de agua y alimento.',
    to: '/collections/roof-roof-dispensadores',
  },
  {
    title: 'Descanso diseñado para su bienestar',
    copy: 'Camas y superficies cómodas para acompañar cada etapa y estilo de vida.',
    to: '/collections/roof-roof-camas',
  },
];

export function DiscoverSection({products = []}) {
  const cards = DISCOVER_ITEMS.map((item, index) => ({
    ...item,
    product: products[index] ?? null,
  }));

  return (
    <section className={styles.section} aria-labelledby="discover-title">
      <div className={styles.container}>
        <header className={styles.heading}>
          <span className={styles.eyebrow}>Selección Roof Roof</span>
          <h2 id="discover-title">Descubre lo nuevo</h2>
          <p>
            Tres formas de mejorar el espacio, la rutina y el bienestar de tu
            mascota.
          </p>
        </header>

        <div className={styles.grid}>
          {cards.map((card) => (
            <DiscoverCard key={card.to} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DiscoverCard({title, copy, to, product}) {
  return (
    <Link className={styles.card} to={to} prefetch="intent">
      <div className={styles.media}>
        {product?.featuredImage ? (
          <Image
            data={product.featuredImage}
            sizes="(max-width: 899px) 112px, 160px"
            className={styles.image}
          />
        ) : (
          <span className={styles.placeholder} aria-hidden="true">
            🐾
          </span>
        )}
      </div>

      <div className={styles.body}>
        <h3>{title}</h3>
        <p>{copy}</p>
        <span className={styles.cta}>
          Ver más
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            aria-hidden="true"
          >
            <path d="M5 12h14" />
            <path d="m13 6 6 6-6 6" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
