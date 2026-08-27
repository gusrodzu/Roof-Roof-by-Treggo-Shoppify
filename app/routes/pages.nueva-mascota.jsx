import {Link} from 'react-router';
import {ExperienceIcon} from '~/components/ExperienceIcon';

export const meta = () => [
  {title: 'Checklist para una nueva mascota | Roof Roof'},
  {
    name: 'description',
    content:
      'Una lista práctica para preparar descanso, seguridad, alimentación y adaptación antes de recibir una nueva mascota.',
  },
];

const CHECKLIST = [
  {
    icon: 'moon',
    title: 'Zona de descanso',
    items: [
      'Elige un lugar tranquilo y de fácil acceso.',
      'Mide a tu mascota antes de comprar una cama o casa.',
      'Evita cambios constantes de ubicación durante los primeros días.',
    ],
    to: '/collections/roof-roof-camas',
    cta: 'Ver camas',
  },
  {
    icon: 'lock',
    title: 'Espacio seguro',
    items: [
      'Retira objetos frágiles, cables y plantas potencialmente peligrosas.',
      'Define zonas permitidas y restringidas con anticipación.',
      'Introduce jaulas o corrales de forma gradual y positiva.',
    ],
    to: '/collections/roof-roof-jaulas',
    cta: 'Ver jaulas y corrales',
  },
  {
    icon: 'bowl',
    title: 'Agua y alimentación',
    items: [
      'Mantén agua limpia disponible según sus necesidades.',
      'Confirma con un profesional la dieta y frecuencia adecuadas.',
      'Coloca recipientes en una superficie estable y fácil de limpiar.',
    ],
    to: '/collections/roof-roof-dispensadores',
    cta: 'Ver dispensadores',
  },
  {
    icon: 'heart',
    title: 'Adaptación y cuidado',
    items: [
      'Da tiempo para explorar sin forzar el contacto.',
      'Mantén rutinas sencillas y consistentes.',
      'Agenda una revisión veterinaria cuando corresponda.',
    ],
    to: '/pages/centro-de-cuidado',
    cta: 'Ir al centro de cuidado',
  },
];

export default function NewPetPage() {
  return (
    <div className="rr-brand-page">
      <section className="rr-brand-hero">
        <div className="rr-brand-hero__grid">
          <div className="rr-brand-hero__copy">
            <span className="rr-kicker">Nueva mascota</span>
            <h1>Prepara su llegada con menos improvisación</h1>
            <p>
              Una lista básica para organizar el hogar, elegir lo esencial y
              facilitar los primeros días de adaptación.
            </p>
            <div className="rr-brand-hero__actions">
              <a className="rr-button rr-button--brand" href="#checklist">
                Ver checklist
              </a>
              <Link
                className="rr-button rr-button--outline"
                to="/pages/selector-de-productos"
              >
                Usar selector
              </Link>
            </div>
          </div>
          <div className="rr-brand-hero__panel">
            <span className="rr-brand-hero__panel-icon">
              <ExperienceIcon name="paw" size={42} />
            </span>
            <strong>
              Un espacio preparado ayuda a una transición más tranquila.
            </strong>
            <span>
              Empieza por descanso, seguridad, agua y una rutina fácil de
              mantener.
            </span>
          </div>
        </div>
      </section>

      <section
        className="rr-brand-section rr-brand-section--white"
        id="checklist"
      >
        <div className="rr-brand-page__inner">
          <div className="rr-brand-section__heading">
            <span className="rr-kicker">Antes de recibirla</span>
            <h2>Cuatro áreas que conviene preparar</h2>
          </div>
          <div className="rr-brand-grid rr-brand-grid--2">
            {CHECKLIST.map((section) => (
              <article className="rr-brand-card" key={section.title}>
                <span className="rr-brand-icon">
                  <ExperienceIcon name={section.icon} />
                </span>
                <h3>{section.title}</h3>
                <ul className="rr-brand-list">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <Link className="rr-text-link" to={section.to}>
                  {section.cta}
                  <ExperienceIcon name="arrow" size={18} />
                </Link>
              </article>
            ))}
          </div>
          <div className="rr-brand-note">
            <ExperienceIcon name="shield" />
            <div>
              <strong>Nota:</strong> esta lista es una orientación general. Las
              necesidades cambian según especie, edad, estado de salud y
              antecedentes; consulta a un profesional cuando sea necesario.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
