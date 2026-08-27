import {Link} from 'react-router';
import styles from '~/styles/UnavailablePage.module.css';

export function UnavailablePage({
  eyebrow = 'Próximamente',
  title,
  description,
  primaryLabel = 'Volver al inicio',
  primaryTo = '/',
  secondaryLabel = 'Explorar productos',
  secondaryTo = '/collections/roof-roof',
}) {
  return (
    <main className={styles.page}>
      <div className={styles.glow} aria-hidden="true" />
      <section
        className={`${styles.card} rr-ui-card`}
        aria-labelledby="unavailable-title"
      >
        <span className="rr-coming-soon-badge">{eyebrow}</span>
        <span className={`${styles.icon} rr-ui-icon`} aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
          >
            <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
            <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z" />
          </svg>
        </span>
        <p className={styles.kicker}>Estamos preparando algo mejor</p>
        <h1 id="unavailable-title">{title}</h1>
        <p className={styles.description}>{description}</p>
        <div className={styles.actions}>
          <Link className="rr-button rr-button--brand" to={primaryTo}>
            {primaryLabel}
          </Link>
          <Link className="rr-button rr-button--outline" to={secondaryTo}>
            {secondaryLabel}
          </Link>
        </div>
        <p className={styles.note}>
          Esta sección permanece bloqueada mientras terminamos su configuración.
        </p>
      </section>
    </main>
  );
}
