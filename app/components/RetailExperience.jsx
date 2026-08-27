import {Link} from 'react-router';
import {ExperienceIcon} from '~/components/ExperienceIcon';

const TOOLS = [
  {
    icon: 'sparkles',
    eyebrow: 'Compra guiada',
    title: 'Encuentra el producto ideal',
    copy: 'Responde tres preguntas y recibe una recomendación según tamaño, espacio y necesidad.',
    to: '/pages/selector-de-productos',
    cta: 'Iniciar selector',
    tone: 'orange',
  },
  {
    icon: 'ruler',
    eyebrow: 'Compra con certeza',
    title: 'Guía de medidas y tallas',
    copy: 'Aprende a medir a tu mascota y el espacio disponible antes de elegir.',
    to: '/pages/guia-de-tallas',
    cta: 'Ver guía',
    tone: 'purple',
  },
  {
    icon: 'book',
    eyebrow: 'Información útil',
    title: 'Centro de cuidado',
    copy: 'Consejos prácticos para descanso, seguridad, adaptación y bienestar en casa.',
    to: '/pages/centro-de-cuidado',
    cta: 'Explorar contenidos',
    tone: 'green',
  },
  {
    icon: 'account',
    eyebrow: 'Tu experiencia Roof',
    title: 'Beneficios de tu cuenta',
    copy: 'Consulta pedidos, administra direcciones y vuelve a comprar con menos pasos.',
    to: '/pages/beneficios-roof',
    cta: 'Conocer beneficios',
    tone: 'blue',
  },
];

const NEEDS = [
  {
    icon: 'moon',
    title: 'Mejor descanso',
    copy: 'Camas y soluciones para crear una zona cómoda y fácil de mantener.',
    to: '/collections/roof-roof-camas',
  },
  {
    icon: 'home',
    title: 'Protección exterior',
    copy: 'Casas para sombra, resguardo y comodidad en espacios abiertos.',
    to: '/collections/roof-roof-casas',
  },
  {
    icon: 'lock',
    title: 'Espacios seguros',
    copy: 'Jaulas, corrales y barreras para delimitar zonas con funcionalidad.',
    to: '/collections/roof-roof-jaulas',
  },
  {
    icon: 'bowl',
    title: 'Rutinas de alimentación',
    copy: 'Dispensadores que ayudan a organizar agua y alimento cada día.',
    to: '/collections/roof-roof-dispensadores',
  },
];

export function RetailExperience() {
  return (
    <>
      <section
        className="rr-experience rr-experience--tools"
        aria-labelledby="rr-tools-title"
      >
        <div className="rr-experience__inner">
          <div className="rr-section-heading rr-section-heading--split">
            <div>
              <span className="rr-kicker">
                Una tienda que te ayuda a elegir
              </span>
              <h2 id="rr-tools-title">
                Más orientación, menos compras a ciegas
              </h2>
            </div>
            <p>
              Roof Roof combina una experiencia de compra completa con la
              atención de una marca especializada en espacios y accesorios para
              mascotas.
            </p>
          </div>
          <div className="rr-experience-tools-grid">
            {TOOLS.map((item) => (
              <Link
                className={`rr-experience-tool rr-experience-tool--${item.tone}`}
                key={item.to}
                to={item.to}
                prefetch="intent"
              >
                <span className="rr-experience-tool__icon">
                  <ExperienceIcon name={item.icon} size={28} />
                </span>
                <span className="rr-experience-tool__eyebrow">
                  {item.eyebrow}
                </span>
                <strong>{item.title}</strong>
                <span className="rr-experience-tool__copy">{item.copy}</span>
                <span className="rr-text-link">
                  {item.cta}
                  <ExperienceIcon name="arrow" size={18} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        className="rr-experience rr-experience--needs"
        aria-labelledby="rr-needs-title"
      >
        <div className="rr-experience__inner">
          <div className="rr-section-heading">
            <span className="rr-kicker">Compra por necesidad</span>
            <h2 id="rr-needs-title">
              Soluciones para la vida real con tu mascota
            </h2>
            <p>
              Empieza por el problema que quieres resolver y llega más rápido a
              la categoría correcta.
            </p>
          </div>
          <div className="rr-needs-grid">
            {NEEDS.map((need) => (
              <Link
                className="rr-need-card"
                key={need.to}
                to={need.to}
                prefetch="intent"
              >
                <span className="rr-need-card__icon">
                  <ExperienceIcon name={need.icon} size={28} />
                </span>
                <div>
                  <strong>{need.title}</strong>
                  <span>{need.copy}</span>
                </div>
                <ExperienceIcon name="arrow" size={19} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        className="rr-experience rr-experience--account"
        aria-labelledby="rr-account-title"
      >
        <div className="rr-account-banner">
          <div className="rr-account-banner__content">
            <div className="rr-account-banner__eyebrow">
              <span className="rr-kicker rr-kicker--light">
                Tu espacio Roof
              </span>
              <span className="rr-coming-soon-badge rr-coming-soon-badge--light">
                Próximamente
              </span>
            </div>
            <h2 id="rr-account-title">
              Una experiencia que continuará después del pago
            </h2>
            <p>
              Estamos preparando el acceso a pedidos, direcciones y beneficios
              antes de habilitar esta sección para clientes.
            </p>
            <div className="rr-account-banner__actions">
              <span
                aria-disabled="true"
                className="rr-button rr-button--brand rr-disabled-action"
              >
                Mi cuenta próximamente
              </span>
              <Link
                className="rr-button rr-button--ghost-light"
                to="/pages/beneficios-roof"
              >
                Ver beneficios
              </Link>
            </div>
          </div>
          <div className="rr-account-banner__features">
            <div>
              <ExperienceIcon name="truck" />
              <span>
                <strong>Pedidos claros</strong>Consulta de historial en una
                siguiente etapa.
              </span>
            </div>
            <div>
              <ExperienceIcon name="support" />
              <span>
                <strong>Ayuda accesible</strong>Encuentra respuestas antes y
                después de comprar.
              </span>
            </div>
            <div>
              <ExperienceIcon name="shield" />
              <span>
                <strong>Compra respaldada</strong>Políticas visibles, sin letras
                escondidas.
              </span>
            </div>
          </div>
        </div>
      </section>


    </>
  );
}
