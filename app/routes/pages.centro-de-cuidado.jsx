import {Link} from 'react-router';
import {ExperienceIcon} from '~/components/ExperienceIcon';

export const meta = () => [
  {title: 'Centro de cuidado | Roof Roof'},
  {
    name: 'description',
    content:
      'Guías prácticas para crear zonas de descanso, protección, adaptación y alimentación más funcionales para tu mascota.',
  },
];

const GUIDES = [
  {
    icon: 'moon',
    title: 'Crear una mejor zona de descanso',
    copy: 'Ubicación, ventilación, limpieza y medidas que conviene revisar antes de elegir una cama.',
    to: '/collections/roof-roof-camas',
    cta: 'Explorar camas',
  },
  {
    icon: 'home',
    title: 'Preparar un espacio exterior protegido',
    copy: 'Qué considerar sobre sombra, circulación de aire, humedad y tamaño al instalar una casa.',
    to: '/collections/roof-roof-casas',
    cta: 'Explorar casas',
  },
  {
    icon: 'lock',
    title: 'Introducir una jaula o corral sin presión',
    copy: 'La adaptación gradual y una medida correcta ayudan a que el espacio se perciba seguro.',
    to: '/collections/roof-roof-jaulas',
    cta: 'Explorar jaulas',
  },
  {
    icon: 'bowl',
    title: 'Organizar rutinas de agua y alimento',
    copy: 'Capacidad, estabilidad y limpieza son tan importantes como la frecuencia de uso.',
    to: '/collections/roof-roof-dispensadores',
    cta: 'Ver dispensadores',
  },
  {
    icon: 'ruler',
    title: 'Medir antes de comprar',
    copy: 'Una guía rápida para comparar las dimensiones de tu mascota, el producto y el espacio.',
    to: '/pages/guia-de-tallas',
    cta: 'Abrir guía',
  },
  {
    icon: 'paw',
    title: 'Preparar la llegada de una nueva mascota',
    copy: 'Una lista práctica para organizar descanso, seguridad, alimentación y adaptación.',
    to: '/pages/nueva-mascota',
    cta: 'Ver checklist',
  },
];

const PRINCIPLES = [
  {
    title: 'Observa antes de cambiar',
    copy: 'La edad, tamaño, movilidad, hábitos y entorno cambian lo que resulta cómodo para cada mascota.',
  },
  {
    title: 'Introduce todo gradualmente',
    copy: 'Permite que explore los productos nuevos sin forzar el uso ni convertirlos en una experiencia negativa.',
  },
  {
    title: 'Prioriza limpieza y mantenimiento',
    copy: 'El mejor producto también debe ser viable para tu rutina diaria y para el lugar donde se instalará.',
  },
];

export default function CareCenterPage() {
  return (
    <div className="rr-brand-page rr-care-center-page">
      <section className="rr-brand-hero rr-care-center-hero">
        <div className="rr-brand-hero__grid">
          <div className="rr-brand-hero__copy">
            <span className="rr-kicker">Centro de cuidado</span>
            <h1>Información útil para comprar y usar mejor</h1>
            <p>
              Guías sencillas para tomar decisiones más informadas sobre
              descanso, protección, seguridad y rutinas dentro del hogar.
            </p>
            <div className="rr-brand-hero__actions">
              <a className="rr-button rr-button--brand" href="#guias">
                Explorar guías
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
              <ExperienceIcon name="book" size={40} />
            </span>
            <strong>
              El bienestar también empieza con una buena elección.
            </strong>
            <span>
              Contenido claro, sin promesas exageradas y conectado con el
              catálogo real de Roof Roof.
            </span>
          </div>
        </div>
      </section>

      <section className="rr-brand-section rr-brand-section--white" id="guias">
        <div className="rr-brand-page__inner">
          <div className="rr-brand-section__heading">
            <span className="rr-kicker">Guías por necesidad</span>
            <h2>Empieza por lo que quieres mejorar</h2>
            <p>
              Cada contenido te lleva a una recomendación práctica o a la
              categoría relacionada.
            </p>
          </div>
          <div className="rr-brand-grid rr-brand-grid--3">
            {GUIDES.map((guide) => (
              <Link
                className="rr-brand-card rr-brand-card--link"
                key={guide.title}
                to={guide.to}
                prefetch="intent"
              >
                <span className="rr-brand-icon">
                  <ExperienceIcon name={guide.icon} />
                </span>
                <h3>{guide.title}</h3>
                <p>{guide.copy}</p>
                <span className="rr-text-link">
                  {guide.cta}
                  <ExperienceIcon name="arrow" size={18} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="rr-brand-section rr-brand-section--cream">
        <div className="rr-brand-page__inner">
          <div className="rr-brand-section__heading">
            <span className="rr-kicker">Principios Roof Roof</span>
            <h2>Tres reglas que aplican a casi cualquier producto</h2>
          </div>
          <div className="rr-brand-steps">
            {PRINCIPLES.map((principle) => (
              <article className="rr-brand-step" key={principle.title}>
                <h3>{principle.title}</h3>
                <p>{principle.copy}</p>
              </article>
            ))}
          </div>
          <div className="rr-brand-note">
            <ExperienceIcon name="shield" />
            <div>
              <strong>Nota responsable:</strong> este contenido es informativo y
              no sustituye la evaluación de un médico veterinario, etólogo u
              otro profesional cuando exista una necesidad de salud o conducta.
            </div>
          </div>
        </div>
      </section>

      <section className="rr-brand-section rr-brand-section--white">
        <div className="rr-brand-page__inner">
          <div className="rr-brand-cta">
            <div>
              <h2>¿Necesitas ayuda para elegir?</h2>
              <p>
                Usa el selector para encontrar una categoría o visita el centro
                de ayuda para revisar políticas y preguntas frecuentes.
              </p>
            </div>
            <div className="rr-brand-cta__actions">
              <Link
                className="rr-button rr-button--light"
                to="/pages/selector-de-productos"
              >
                Abrir selector
              </Link>
              <Link className="rr-button rr-button--dark" to="/pages/ayuda">
                Centro de ayuda
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
