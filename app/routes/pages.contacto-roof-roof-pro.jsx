import {useState} from 'react';
import {Link} from 'react-router';
import {ExperienceIcon} from '~/components/ExperienceIcon';
import styles from '~/styles/RoofProContactPage.module.css';

const CONTACT_EMAIL = 'soporte@roofroof.mx';

export const meta = () => [
  {title: 'Contactar a Roof Roof PRO | Roof Roof'},
  {
    name: 'description',
    content:
      'Comparte los datos de tu hotel, desarrollo, veterinaria, refugio o espacio pet-friendly para solicitar una revisión preliminar con Roof Roof PRO.',
  },
];

const PROJECT_TYPES = [
  'Hotel u hospitalidad',
  'Desarrollo residencial o amenidad',
  'Veterinaria o espacio de cuidado',
  'Refugio u organización',
  'Restaurante o comercio pet-friendly',
  'Oficina o espacio corporativo',
  'Otro proyecto',
];

const REQUIREMENTS = [
  {
    icon: 'building',
    title: 'Contexto del espacio',
    copy: 'Tipo de proyecto, ciudad y características generales del lugar.',
  },
  {
    icon: 'ruler',
    title: 'Medidas y cantidades',
    copy: 'Dimensiones aproximadas, número de piezas y zonas por equipar.',
  },
  {
    icon: 'checklist',
    title: 'Objetivo y fecha',
    copy: 'Uso esperado, prioridades y fecha tentativa de implementación.',
  },
];

function value(formData, key, fallback = 'No especificado') {
  return String(formData.get(key) || '').trim() || fallback;
}

function buildRequestSummary(formData) {
  return [
    'SOLICITUD PRELIMINAR — ROOF ROOF PRO',
    '',
    'DATOS DE CONTACTO',
    `Nombre: ${value(formData, 'name')}`,
    `Empresa u organización: ${value(formData, 'company')}`,
    `Correo: ${value(formData, 'email')}`,
    `Teléfono: ${value(formData, 'phone')}`,
    '',
    'DATOS DEL PROYECTO',
    `Tipo de proyecto: ${value(formData, 'projectType')}`,
    `Ciudad y estado: ${value(formData, 'location')}`,
    `Cantidad estimada: ${value(formData, 'quantity')}`,
    `Fecha objetivo: ${value(formData, 'targetDate')}`,
    `Presupuesto estimado: ${value(formData, 'budget')}`,
    '',
    'DESCRIPCIÓN',
    value(formData, 'details'),
    '',
    'NECESIDADES O PRODUCTOS DE INTERÉS',
    value(formData, 'products'),
    '',
    'La información se comparte para una revisión preliminar. El envío no garantiza disponibilidad, precio especial ni aceptación del proyecto.',
  ].join('\n');
}

export default function RoofProContactPage() {
  const [status, setStatus] = useState('idle');

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const summary = buildRequestSummary(formData);
    const company = value(formData, 'company', 'Proyecto');
    const subject = `Solicitud Roof Roof PRO — ${company}`;

    setStatus('prepared');
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(summary)}`;
  }

  async function handleCopy(event) {
    const form = event.currentTarget.form;
    if (!form) return;

    const summary = buildRequestSummary(new FormData(form));

    try {
      await navigator.clipboard.writeText(summary);
      setStatus('copied');
    } catch {
      setStatus('copy-error');
    }
  }

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <div className={styles.eyebrowRow}>
              <span className="rr-kicker rr-kicker--light">Roof Roof PRO</span>
              <span className="rr-coming-soon-badge rr-coming-soon-badge--light">
                Próximamente
              </span>
            </div>
            <h1>Cuéntanos sobre tu espacio pet-friendly</h1>
            <p>
              Completa una solicitud preliminar para que podamos entender el
              alcance, las medidas y las necesidades de tu proyecto antes de
              preparar una recomendación.
            </p>
            <div className={styles.heroActions}>
              <a className="rr-button rr-button--brand" href="#solicitud-pro">
                Iniciar solicitud
              </a>
              <Link
                className="rr-button rr-button--ghost-light"
                to="/pages/proyectos-roof"
              >
                Conocer Roof Roof PRO
              </Link>
            </div>
          </div>

          <aside
            className={`${styles.heroPanel} rr-ui-card rr-ui-card--dark`}
            aria-label="Información importante"
          >
            <span className={`${styles.heroPanelIcon} rr-ui-icon`}>
              <ExperienceIcon name="support" size={34} />
            </span>
            <div>
              <span className={styles.panelLabel}>Etapa preliminar</span>
              <strong>Primero entendemos el proyecto.</strong>
              <p>
                Esta página prepara un correo con tus datos. Podrás revisarlo en
                tu aplicación de correo antes de enviarlo.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <main className={styles.main} id="solicitud-pro">
        <div className={styles.layout}>
          <section className={`${styles.formCard} rr-ui-card`}>
            <div className={styles.sectionHeading}>
              <span className={styles.stepLabel}>Solicitud preliminar</span>
              <h2>Información del proyecto</h2>
              <p>
                Los campos marcados con * son necesarios para preparar el correo
                de contacto.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <fieldset className={styles.fieldset}>
                <legend>Datos de contacto</legend>
                <div className={styles.formGrid}>
                  <label className={styles.field}>
                    <span>Nombre completo *</span>
                    <input
                      autoComplete="name"
                      name="name"
                      placeholder="Nombre de la persona responsable"
                      required
                      type="text"
                    />
                  </label>

                  <label className={styles.field}>
                    <span>Empresa u organización *</span>
                    <input
                      autoComplete="organization"
                      name="company"
                      placeholder="Nombre del proyecto o empresa"
                      required
                      type="text"
                    />
                  </label>

                  <label className={styles.field}>
                    <span>Correo electrónico *</span>
                    <input
                      autoComplete="email"
                      name="email"
                      placeholder="nombre@empresa.com"
                      required
                      type="email"
                    />
                  </label>

                  <label className={styles.field}>
                    <span>Teléfono *</span>
                    <input
                      autoComplete="tel"
                      inputMode="tel"
                      name="phone"
                      placeholder="Número con lada"
                      required
                      type="tel"
                    />
                  </label>
                </div>
              </fieldset>

              <fieldset className={styles.fieldset}>
                <legend>Alcance del proyecto</legend>
                <div className={styles.formGrid}>
                  <label className={styles.field}>
                    <span>Tipo de proyecto *</span>
                    <select defaultValue="" name="projectType" required>
                      <option disabled value="">
                        Selecciona una opción
                      </option>
                      {PROJECT_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className={styles.field}>
                    <span>Ciudad y estado *</span>
                    <input
                      autoComplete="address-level2"
                      name="location"
                      placeholder="Ej. Monterrey, Nuevo León"
                      required
                      type="text"
                    />
                  </label>

                  <label className={styles.field}>
                    <span>Cantidad estimada</span>
                    <input
                      min="1"
                      name="quantity"
                      placeholder="Ej. 20 piezas"
                      type="number"
                    />
                  </label>

                  <label className={styles.field}>
                    <span>Fecha objetivo</span>
                    <input name="targetDate" type="date" />
                  </label>

                  <label className={styles.fieldWide}>
                    <span>Presupuesto estimado</span>
                    <select defaultValue="" name="budget">
                      <option value="">Aún no está definido</option>
                      <option value="Menos de $25,000 MXN">
                        Menos de $25,000 MXN
                      </option>
                      <option value="$25,000 a $75,000 MXN">
                        $25,000 a $75,000 MXN
                      </option>
                      <option value="$75,000 a $150,000 MXN">
                        $75,000 a $150,000 MXN
                      </option>
                      <option value="Más de $150,000 MXN">
                        Más de $150,000 MXN
                      </option>
                    </select>
                  </label>
                </div>
              </fieldset>

              <fieldset className={styles.fieldset}>
                <legend>Necesidad y contexto</legend>
                <div className={styles.formGrid}>
                  <label className={styles.fieldWide}>
                    <span>Describe el espacio y el objetivo *</span>
                    <textarea
                      name="details"
                      placeholder="Cuéntanos qué zona quieres equipar, quién la utilizará, medidas aproximadas y qué problema necesitas resolver."
                      required
                      rows={6}
                    />
                  </label>

                  <label className={styles.fieldWide}>
                    <span>Productos o categorías de interés</span>
                    <textarea
                      name="products"
                      placeholder="Ej. casas, camas, corrales, comederos, zonas de descanso o equipamiento exterior."
                      rows={4}
                    />
                  </label>
                </div>
              </fieldset>

              <label className={styles.consent}>
                <input name="consent" required type="checkbox" />
                <span>
                  Confirmo que los datos son correctos y entiendo que esta es
                  una solicitud preliminar; no garantiza disponibilidad,
                  cotización ni aceptación del proyecto.
                </span>
              </label>

              <div className={styles.formActions}>
                <button className="rr-button rr-button--dark" type="submit">
                  Preparar correo de solicitud
                  <ExperienceIcon name="arrow" size={18} />
                </button>
                <button
                  className={`${styles.copyButton} rr-button rr-button--outline`}
                  onClick={handleCopy}
                  type="button"
                >
                  Copiar resumen
                </button>
              </div>

              <p className={styles.formNote}>
                El botón abrirá tu aplicación de correo con la información
                capturada. El destinatario será{' '}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
              </p>

              <div aria-live="polite" className={styles.status} role="status">
                {status === 'prepared' &&
                  'La solicitud fue preparada. Revisa tu aplicación de correo para enviarla.'}
                {status === 'copied' &&
                  'El resumen de la solicitud se copió al portapapeles.'}
                {status === 'copy-error' &&
                  'No fue posible copiar automáticamente. Usa el botón principal para preparar el correo.'}
              </div>
            </form>
          </section>

          <aside className={styles.sidebar}>
            <div className={`${styles.sidebarCard} rr-ui-card`}>
              <span className={styles.sidebarEyebrow}>Antes de comenzar</span>
              <h2>Entre más contexto, mejor orientación.</h2>
              <div className={styles.requirements}>
                {REQUIREMENTS.map((item) => (
                  <article
                    className={`${styles.requirement} rr-ui-subcard`}
                    key={item.title}
                  >
                    <span className="rr-ui-icon">
                      <ExperienceIcon name={item.icon} size={22} />
                    </span>
                    <div>
                      <strong>{item.title}</strong>
                      <p>{item.copy}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className={`${styles.sidebarCardAlt} rr-ui-card`}>
              <ExperienceIcon name="shield" size={25} />
              <div>
                <strong>Revisión responsable</strong>
                <p>
                  Cada proyecto se evaluará según ubicación, inventario,
                  alcance, medidas y viabilidad operativa.
                </p>
              </div>
            </div>

            <div className={`${styles.helpCard} rr-ui-card`}>
              <span>¿Buscas una compra individual?</span>
              <strong>Explora el catálogo actual.</strong>
              <Link to="/collections/roof-roof">
                Ver productos
                <ExperienceIcon name="arrow" size={17} />
              </Link>
            </div>
          </aside>
        </div>
      </main>

      <section className={styles.bottomCta}>
        <div>
          <span className={styles.bottomKicker}>Roof Roof PRO</span>
          <h2>Planeemos primero. Equipemos mejor.</h2>
          <p>
            La intención es construir una recomendación adecuada para el
            espacio, no simplemente aumentar el número de productos.
          </p>
        </div>
        <Link className="rr-button rr-button--light" to="/pages/proyectos-roof">
          Volver a Roof Roof PRO
        </Link>
      </section>

      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: 'Contactar a Roof Roof PRO',
            description:
              'Solicitud preliminar para proyectos y espacios pet-friendly.',
            mainEntity: {
              '@type': 'Organization',
              name: 'Roof Roof',
              email: CONTACT_EMAIL,
            },
          }).replace(/</g, '\\u003c'),
        }}
        type="application/ld+json"
      />
    </div>
  );
}
