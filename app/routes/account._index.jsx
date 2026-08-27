import {Link, useOutletContext} from 'react-router';
import {ExperienceIcon} from '~/components/ExperienceIcon';

const ACTIONS = [
  {
    icon: 'truck',
    title: 'Mis pedidos',
    copy: 'Consulta el historial y los detalles disponibles de tus compras.',
    to: '/account/orders',
  },
  {
    icon: 'account',
    title: 'Mi perfil',
    copy: 'Mantén actualizados tu nombre y datos de contacto.',
    to: '/account/profile',
  },
  {
    icon: 'home',
    title: 'Mis direcciones',
    copy: 'Administra las direcciones que utilizas para recibir pedidos.',
    to: '/account/addresses',
  },
];

export default function AccountOverview() {
  const {customer} = useOutletContext();
  const firstName = customer?.firstName;

  return (
    <div className="rr-account-dashboard">
      <section className="rr-account-dashboard__welcome">
        <div>
          <span className="rr-kicker">Resumen de cuenta</span>
          <h2>
            {firstName ? `Qué gusto verte, ${firstName}` : 'Tu espacio Roof'}
          </h2>
          <p>
            Desde aquí puedes consultar tus compras, administrar tus datos y
            acceder a las herramientas que te ayudan a elegir mejor.
          </p>
        </div>
        <Link
          className="rr-button rr-button--brand"
          to="/collections/roof-roof"
        >
          Explorar productos
        </Link>
      </section>

      <div className="rr-account-dashboard__grid">
        {ACTIONS.map((action) => (
          <Link
            className="rr-account-dashboard__card"
            key={action.to}
            to={action.to}
          >
            <span className="rr-brand-icon">
              <ExperienceIcon name={action.icon} />
            </span>
            <strong>{action.title}</strong>
            <span>{action.copy}</span>
            <span className="rr-text-link">
              Abrir
              <ExperienceIcon name="arrow" size={17} />
            </span>
          </Link>
        ))}
      </div>

      <section className="rr-account-dashboard__guided">
        <div>
          <span className="rr-kicker">Compra guiada</span>
          <h2>Haz que tu siguiente compra empiece con más información</h2>
          <p>
            El selector y la guía de medidas te ayudan a llegar a una categoría
            adecuada antes de revisar productos.
          </p>
        </div>
        <div className="rr-account-dashboard__actions">
          <Link
            className="rr-button rr-button--dark"
            to="/pages/selector-de-productos"
          >
            Usar selector
          </Link>
          <Link
            className="rr-button rr-button--outline"
            to="/pages/beneficios-roof"
          >
            Ver beneficios
          </Link>
        </div>
      </section>
    </div>
  );
}
