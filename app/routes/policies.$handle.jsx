import {Link, useLoaderData} from 'react-router';

export const meta = ({data}) => [
  {title: `${data?.policy?.title ?? 'Política'} — Roof Roof`},
  {name: 'robots', content: 'index,follow'},
];

export async function loader({context, params}) {
  const data = await context.storefront.query(POLICIES_QUERY);
  const policies = [
    data.shop?.privacyPolicy,
    data.shop?.shippingPolicy,
    data.shop?.termsOfService,
    data.shop?.refundPolicy,
    data.shop?.subscriptionPolicy,
  ].filter(Boolean);

  const policy = policies.find((item) => item.handle === params.handle);
  if (!policy) throw new Response('Policy not found', {status: 404});

  return {policy};
}

export default function PolicyDetail() {
  const {policy} = useLoaderData();

  return (
    <main className="rr-policy-page rr-policy-detail-page">
      <header className="rr-policy-hero">
        <Link className="rr-policy-back" to="/policies">
          ← Todas las políticas
        </Link>
        <h1>{policy.title}</h1>
        <p>Información vigente para compras realizadas en Roof Roof.</p>
      </header>

      <div className="rr-policy-shell rr-policy-detail-shell">
        <article
          className="rr-policy-content rr-ui-card"
          dangerouslySetInnerHTML={{__html: policy.body}}
        />

        <aside className="rr-policy-support rr-ui-card">
          <div>
            <span className="rr-kicker">¿Tienes una duda?</span>
            <h2>Te ayudamos a interpretarla</h2>
            <p>
              Consulta nuestras preguntas frecuentes o escríbenos antes de
              finalizar tu compra.
            </p>
          </div>
          <div className="rr-policy-support__actions">
            <Link className="rr-button rr-button--outline" to="/pages/ayuda">
              Preguntas frecuentes
            </Link>
            <a
              className="rr-button rr-button--brand"
              href="mailto:soporte@roofroof.mx"
            >
              Enviar correo
            </a>
          </div>
        </aside>
      </div>
    </main>
  );
}

const POLICIES_QUERY = `#graphql
  fragment PolicyDetail on ShopPolicy {
    id
    title
    handle
    body
  }
  query Policies ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    shop {
      privacyPolicy { ...PolicyDetail }
      shippingPolicy { ...PolicyDetail }
      termsOfService { ...PolicyDetail }
      refundPolicy { ...PolicyDetail }
      subscriptionPolicy { ...PolicyDetail }
    }
  }
`;

/** @typedef {import('./+types/policies.$handle').Route} Route */
/** @typedef {ReturnType<typeof useLoaderData<typeof loader>>} LoaderReturnData */
