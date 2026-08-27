import {Link} from 'react-router';

const POLICY_ICONS = {
  'privacy-policy': '🔐',
  'shipping-policy': '📦',
  'terms-of-service': '📋',
  'refund-policy': '↩',
  'subscription-policy': '↻',
};

export function PolicyOverviewPage({policies}) {
  return (
    <main className="rr-policy-page">
      <header className="rr-policy-hero">
        <span className="rr-kicker rr-kicker--light">Información clara</span>
        <h1>Nuestras políticas</h1>
        <p>
          Consulta las condiciones de compra, envíos, privacidad y devoluciones
          de Roof Roof en un solo lugar.
        </p>
      </header>

      <div className="rr-policy-shell">
        <section className="rr-policy-grid" aria-label="Políticas disponibles">
          {policies.map((policy) => (
            <Link
              className="rr-policy-card rr-ui-card rr-ui-card--interactive"
              key={policy.handle}
              to={`/policies/${policy.handle}`}
            >
              <span className="rr-policy-icon rr-ui-icon" aria-hidden="true">
                {POLICY_ICONS[policy.handle] || '📄'}
              </span>
              <div className="rr-policy-card__content">
                <h2>{policy.title}</h2>
                <p>
                  Consulta la información completa y las condiciones aplicables.
                </p>
              </div>
              <span className="rr-policy-card__link" aria-hidden="true">
                Ver política <span>→</span>
              </span>
            </Link>
          ))}
        </section>

        <aside className="rr-policy-support rr-ui-card">
          <div>
            <span className="rr-kicker">¿Necesitas orientación?</span>
            <h2>Encuentra respuestas antes de comprar</h2>
            <p>
              Revisa las preguntas frecuentes o escríbenos cuando necesites
              aclarar una condición antes de completar tu compra.
            </p>
          </div>
          <div className="rr-policy-support__actions">
            <a
              className="rr-button rr-button--brand"
              href="mailto:soporte@roofroof.mx"
            >
              Enviar correo
            </a>
            <Link className="rr-button rr-button--outline" to="/pages/ayuda">
              Preguntas frecuentes
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}
