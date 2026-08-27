import {Link} from 'react-router';
import {ExperienceIcon} from '~/components/ExperienceIcon';

export const meta = () => [
  {title: 'Beneficios Roof | Roof Roof'},
  {
    name: 'description',
    content:
      'Conoce la próxima experiencia de cuenta de Roof Roof y utiliza nuestras herramientas de compra guiada.',
  },
];

export default function RoofBenefitsPage() {
  return (
    <div className="rr-brand-page">
      <section className="rr-brand-hero rr-brand-hero--dark">
        <div className="rr-brand-hero__grid">
          <div className="rr-brand-hero__copy">
            <div className="rr-brand-hero__eyebrow">
              <span className="rr-kicker rr-kicker--light">
                Tu espacio Roof
              </span>
              <span className="rr-coming-soon-badge rr-coming-soon-badge--light">
                Próximamente
              </span>
            </div>
            <h1>Una cuenta que hará más simple volver</h1>
            <p>
              Estamos preparando un espacio para consultar pedidos, direcciones
              y beneficios con una experiencia correctamente integrada.
            </p>
            <div className="rr-brand-hero__actions">
              <span
                aria-disabled="true"
                className="rr-button rr-button--brand rr-disabled-action"
              >
                Mi cuenta próximamente
              </span>
              <Link
                className="rr-button rr-button--ghost-light"
                to="/collections/roof-roof"
              >
                Seguir comprando
              </Link>
            </div>
          </div>

          <div className="rr-brand-hero__panel">
            <span className="rr-brand-hero__panel-icon">
              <ExperienceIcon name="account" size={40} />
            </span>
            <strong>Más continuidad entre una compra y la siguiente.</strong>
            <span>
              Funciones de cuenta en preparación, acompañadas desde hoy por
              información clara y acceso rápido al catálogo.
            </span>
          </div>
        </div>
      </section>

      <section className="rr-brand-section rr-brand-section--white">
        <div className="rr-brand-page__inner">
          <div className="rr-brand-cta">
            <div>
              <h2>Compra con más información desde hoy</h2>
              <p>
                Mi cuenta llegará en una siguiente etapa. Mientras tanto, usa
                nuestras herramientas de compra guiada.
              </p>
            </div>

            <div className="rr-brand-cta__actions">
              <Link
                className="rr-button rr-button--dark"
                to="/pages/selector-de-productos"
              >
                Abrir selector
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
