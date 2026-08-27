import {Link} from 'react-router';
import {ExperienceIcon} from '~/components/ExperienceIcon';

export const meta = () => [
  {title: 'Roof Roof PRO — Proyectos pet-friendly | Roof Roof'},
  {
    name: 'description',
    content:
      'Una ruta de atención para hoteles, desarrollos, veterinarias, refugios y negocios que buscan equipar espacios pet-friendly.',
  },
];

const SECTORS = [
  {
    icon: 'building',
    title: 'Hoteles y hospitalidad',
    copy: 'Soluciones para habitaciones, áreas comunes o zonas exteriores que reciben mascotas.',
  },
  {
    icon: 'home',
    title: 'Desarrollos y amenidades',
    copy: 'Productos para equipar áreas pet-friendly dentro de fraccionamientos y edificios.',
  },
  {
    icon: 'shield',
    title: 'Veterinarias y cuidado',
    copy: 'Equipamiento funcional para zonas de espera, recuperación o manejo cotidiano.',
  },
  {
    icon: 'heart',
    title: 'Refugios y organizaciones',
    copy: 'Revisión de necesidades, cantidades y prioridades para espacios de cuidado animal.',
  },
];

const PROCESS = [
  {
    title: 'Cuéntanos el proyecto',
    copy: 'Comparte el tipo de espacio, ciudad, cantidades estimadas y fecha objetivo.',
  },
  {
    title: 'Revisamos compatibilidad',
    copy: 'Analizamos medidas, uso, mantenimiento y disponibilidad del catálogo actual.',
  },
  {
    title: 'Preparamos una propuesta',
    copy: 'Cuando el proyecto sea viable, recibirás una recomendación y cotización específica.',
  },
];

export default function RoofProPage() {
  return (
    <div className="rr-brand-page">
      <section className="rr-brand-hero rr-brand-hero--dark">
        <div className="rr-brand-hero__grid">
          <div className="rr-brand-hero__copy">
            <div className="rr-pro-page__eyebrow">
              <span className="rr-kicker rr-kicker--light">Roof Roof PRO</span>
              <span className="rr-coming-soon-badge rr-coming-soon-badge--light">
                Próximamente
              </span>
            </div>
            <h1>Espacios pet-friendly mejor planeados</h1>
            <p>
              Una ruta de atención para proyectos que requieren varias piezas,
              revisión de medidas o una recomendación más específica que una
              compra individual.
            </p>
            <div className="rr-brand-hero__actions">
              <Link
                className="rr-button rr-button--brand"
                to="/pages/contacto-roof-roof-pro"
              >
                Contactar a Roof Roof PRO
              </Link>
              <a className="rr-button rr-button--ghost-light" href="#sectores">
                Ver aplicaciones
              </a>
            </div>
          </div>
          <div className="rr-brand-hero__panel">
            <span className="rr-brand-hero__panel-icon">
              <ExperienceIcon name="building" size={42} />
            </span>
            <strong>
              Del producto aislado a una solución para el espacio.
            </strong>
            <span>
              Medidas, cantidad, circulación, limpieza y contexto de uso se
              revisan como parte de la recomendación.
            </span>
          </div>
        </div>
      </section>

      <section
        className="rr-brand-section rr-brand-section--white"
        id="sectores"
      >
        <div className="rr-brand-page__inner">
          <div className="rr-brand-section__heading">
            <span className="rr-kicker">Aplicaciones</span>
            <h2>Una solución para distintos tipos de proyecto</h2>
          </div>
          <div className="rr-brand-grid rr-brand-grid--4">
            {SECTORS.map((sector) => (
              <article className="rr-brand-card" key={sector.title}>
                <span className="rr-brand-icon">
                  <ExperienceIcon name={sector.icon} />
                </span>
                <h3>{sector.title}</h3>
                <p>{sector.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="rr-brand-section rr-brand-section--cream">
        <div className="rr-brand-page__inner">
          <div className="rr-brand-section__heading">
            <span className="rr-kicker">Proceso</span>
            <h2>Cómo funcionará Roof Roof PRO</h2>
          </div>
          <div className="rr-brand-steps">
            {PROCESS.map((item) => (
              <article className="rr-brand-step" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
          <div className="rr-brand-note">
            <ExperienceIcon name="checklist" />
            <div>
              <strong>Transparencia:</strong> enviar una solicitud no garantiza
              disponibilidad, precio especial ni aceptación del proyecto. Cada
              caso se revisa con base en inventario, alcance y ubicación.
            </div>
          </div>
        </div>
      </section>

      <section className="rr-brand-section rr-brand-section--white">
        <div className="rr-brand-page__inner">
          <div className="rr-brand-cta">
            <div>
              <h2>Conversemos sobre tu espacio</h2>
              <p>
                Incluye medidas, cantidades estimadas, ciudad y fecha objetivo
                para poder orientarte con mayor precisión.
              </p>
            </div>
            <div className="rr-brand-cta__actions">
              <Link
                className="rr-button rr-button--light"
                to="/pages/contacto-roof-roof-pro"
              >
                Contactar a Roof Roof PRO
              </Link>
              <Link
                className="rr-button rr-button--dark"
                to="/collections/roof-roof"
              >
                Ver catálogo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
