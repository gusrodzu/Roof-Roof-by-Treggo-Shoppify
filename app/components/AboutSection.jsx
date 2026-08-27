import {Link} from 'react-router';
import {ExperienceIcon} from '~/components/ExperienceIcon';
import styles from '~/styles/AboutSection.module.css';

const PRINCIPLES = [
  {
    icon: 'heart',
    title: 'Bienestar primero',
    copy: 'Cada producto parte de una necesidad real: descansar mejor, sentirse seguro o hacer más simple su rutina diaria.',
  },
  {
    icon: 'home',
    title: 'Diseño para la vida real',
    copy: 'Buscamos soluciones funcionales que convivan mejor con tu espacio, tus hábitos y la personalidad de tu mascota.',
  },
  {
    icon: 'checklist',
    title: 'Elegir con claridad',
    copy: 'Medidas, usos y recomendaciones fáciles de entender para que compres con mayor seguridad y menos dudas.',
  },
];

export function AboutSection() {
  return (
    <section className={styles.section} aria-labelledby="roof-philosophy-title">
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.container}>
        <header className={styles.heading}>
          <span className={styles.kicker}>
            <span className={styles.kickerIcon}>
              <ExperienceIcon name="paw" size={15} />
            </span>
            Nuestra filosofía
          </span>

          <div className={styles.headingGrid}>
            <h2 id="roof-philosophy-title">¿Por qué elegir Roof Roof?</h2>
            <p>
              Diseñamos productos pensados para el bienestar, la comodidad y la
              vida diaria de tu mascota, sin dejar de considerar el espacio que
              ambos comparten.
            </p>
          </div>
        </header>

        <div className={styles.contentGrid}>
          <article className={`${styles.statementCard} rr-ui-feature-card`}>
            <div className={styles.statementTop}>
              <span className={styles.statementIcon}>
                <ExperienceIcon name="sparkles" size={28} />
              </span>
              <span className={styles.statementLabel}>
                Nuestra manera de diseñar
              </span>
            </div>

            <div className={styles.statementCopy}>
              <h3>Productos con propósito, no sólo productos bonitos.</h3>
              <p>
                En Roof Roof buscamos que cada pieza aporte algo concreto a su
                día: más descanso, más seguridad, una rutina más sencilla y un
                espacio que también se sienta suyo.
              </p>
            </div>

            <div className={styles.statementSignature}>
              <span>Pensado para ellos.</span>
              <strong>Diseñado para vivir contigo.</strong>
            </div>
          </article>

          <div className={styles.principles}>
            {PRINCIPLES.map((principle) => (
              <article
                className={`${styles.principleCard} rr-ui-card rr-ui-card--interactive`}
                key={principle.title}
              >
                <div className={`${styles.principleIcon} rr-ui-icon`}>
                  <ExperienceIcon name={principle.icon} size={24} />
                </div>
                <div className={styles.principleCopy}>
                  <div className={styles.principleTitleRow}>
                    <h3>{principle.title}</h3>
                  </div>
                  <p>{principle.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className={`${styles.actionBar} rr-ui-card`}>
          <div>
            <span className={styles.actionEyebrow}>
              Encuentra su espacio ideal
            </span>
            <p>
              Explora el catálogo completo o utiliza nuestro selector para
              encontrar una opción según su tamaño, necesidad y entorno.
            </p>
          </div>

          <div className={styles.actions}>
            <Link
              className={`${styles.secondaryButton} rr-button rr-button--outline`}
              to="/pages/selector-de-productos"
            >
              Usar selector
            </Link>
            <Link
              className={`${styles.primaryButton} rr-button rr-button--dark`}
              to="/collections/roof-roof"
            >
              Explorar productos
              <ExperienceIcon name="arrow" size={17} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
