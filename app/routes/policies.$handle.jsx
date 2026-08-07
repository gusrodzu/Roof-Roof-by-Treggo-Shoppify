import {useLoaderData, Link} from 'react-router';
import {useEffect, useState} from 'react';

/**
 * @param {Route.LoaderArgs}
 */
/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
  return [{title: 'Roof Roof | Políticas'}];
};

/**
 * @param {Route.LoaderArgs}
 */
export async function loader({context}) {
  const data = await context.storefront.query(POLICIES_QUERY);

  const shopPolicies = data.shop;
  const policies = [
    shopPolicies?.privacyPolicy,
    shopPolicies?.shippingPolicy,
    shopPolicies?.termsOfService,
    shopPolicies?.refundPolicy,
    shopPolicies?.subscriptionPolicy,
  ].filter((policy) => policy != null);

  if (!policies.length) {
    throw new Response('No policies found', {status: 404});
  }

  return {policies};
}

export default function Policies() {
  /** @type {LoaderReturnData} */
  const {policies} = useLoaderData();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Emojis por tipo de política
  const policyIcons = {
    'privacy-policy': '🔐',
    'shipping-policy': '📦',
    'terms-of-service': '📋',
    'refund-policy': '💰',
    'subscription-policy': '🔄',
  };

  return (
    <div style={{background: '#fff', minHeight: '100vh', paddingBottom: '2rem'}}>
      {/* Hero Section */}
      <div
        style={{
          background: 'linear-gradient(135deg, #2C1810 0%, #3d2817 100%)',
          color: '#fff',
          padding: isMobile ? '2rem 1rem' : '4rem 2rem',
          textAlign: 'center',
          marginBottom: '3rem',
        }}
      >
        <h1
          style={{
            fontFamily: 'BD Supper, serif',
            fontSize: isMobile ? '2rem' : '3rem',
            fontWeight: 700,
            marginBottom: '0.5rem',
            letterSpacing: '-0.5px',
          }}
        >
          Nuestras Políticas
        </h1>
        <p
          style={{
            fontSize: isMobile ? '0.95rem' : '1.1rem',
            color: 'rgb(172, 195, 250)',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.6,
            fontFamily: 'Manrope, sans-serif',
          }}
        >
          Transparencia y confianza en Roof Roof. Conoce nuestros términos y condiciones.
        </p>
      </div>

      {/* Policies Grid */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: isMobile ? '1rem' : '0 2rem',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
            gap: '1.5rem',
            marginBottom: '3rem',
          }}
        >
          {policies.map((policy) => (
            <Link
              key={policy.id}
              to={`/policies/${policy.handle}`}
              style={{textDecoration: 'none'}}
            >
              <div
                style={{
                  background: '#fff',
                  border: '1px solid #e5e9f0',
                  borderRadius: '0.75rem',
                  padding: '2rem 1.5rem',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 2px 8px rgba(44, 24, 16, 0.04)',
                  ':hover': {
                    borderColor: 'rgb(172, 195, 250)',
                    boxShadow: '0 8px 24px rgba(44, 24, 16, 0.12)',
                  },
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgb(172, 195, 250)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(44, 24, 16, 0.12)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e5e9f0';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(44, 24, 16, 0.04)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Icon & Title */}
                <div>
                  <div
                    style={{
                      fontSize: '2.5rem',
                      marginBottom: '1rem',
                    }}
                  >
                    {policyIcons[policy.handle] || '📄'}
                  </div>
                  <h2
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      fontSize: isMobile ? '1.25rem' : '1.5rem',
                      fontWeight: 600,
                      color: '#2C1810',
                      marginBottom: '0.5rem',
                      lineHeight: 1.3,
                    }}
                  >
                    {policy.title}
                  </h2>
                  <p
                    style={{
                      fontSize: '0.95rem',
                      color: '#5a6b85',
                      fontFamily: 'Manrope, sans-serif',
                      marginBottom: '1.5rem',
                    }}
                  >
                    Lee nuestras {policy.title.toLowerCase()} completas
                  </p>
                </div>

                {/* Arrow CTA */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: '#F5A623',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    fontFamily: 'Manrope, sans-serif',
                  }}
                >
                  <span>Ver política</span>
                  <span style={{fontSize: '1.2rem', transition: 'transform 0.3s ease'}}>
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* FAQ Section */}
        <div
          style={{
            background: '#f5f7fa',
            border: '1px solid #e5e9f0',
            borderRadius: '0.75rem',
            padding: isMobile ? '1.5rem' : '2.5rem',
            marginTop: '3rem',
          }}
        >
          <h2
            style={{
              fontFamily: 'BD Supper, serif',
              fontSize: isMobile ? '1.5rem' : '2rem',
              color: '#2C1810',
              marginBottom: '1.5rem',
              fontWeight: 700,
            }}
          >
            ¿Preguntas frecuentes?
          </h2>
          <p
            style={{
              fontFamily: 'Manrope, sans-serif',
              fontSize: '1rem',
              color: '#5a6b85',
              lineHeight: 1.7,
              marginBottom: '1.5rem',
            }}
          >
            Si tienes dudas sobre nuestras políticas o necesitas más información, 
            puedes contactar con nuestro equipo de atención al cliente.
          </p>
          <div
            style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: '1rem',
              marginTop: '1.5rem',
            }}
          >
            <a
              href="mailto:soporte@roofroof.mx"
              style={{
                display: 'inline-block',
                background: '#F5A623',
                color: '#2C1810',
                padding: '0.75rem 1.5rem',
                borderRadius: '999px',
                textDecoration: 'none',
                fontWeight: 600,
                fontFamily: 'Manrope, sans-serif',
                transition: 'background 0.3s ease',
                textAlign: 'center',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#d4891a';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#F5A623';
              }}
            >
              Envíanos un correo
            </a>
            <a
              href="/pages/contacto"
              style={{
                display: 'inline-block',
                background: 'transparent',
                border: '1.5px solid #2C1810',
                color: '#2C1810',
                padding: '0.75rem 1.5rem',
                borderRadius: '999px',
                textDecoration: 'none',
                fontWeight: 600,
                fontFamily: 'Manrope, sans-serif',
                transition: 'all 0.3s ease',
                textAlign: 'center',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#2C1810';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#2C1810';
              }}
            >
              Formulario de contacto
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

const POLICIES_QUERY = `#graphql
  fragment PolicyItem on ShopPolicy {
    id
    title
    handle
  }
  query Policies ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    shop {
      privacyPolicy {
        ...PolicyItem
      }
      shippingPolicy {
        ...PolicyItem
      }
      termsOfService {
        ...PolicyItem
      }
      refundPolicy {
        ...PolicyItem
      }
      subscriptionPolicy {
        id
        title
        handle
      }
    }
  }
`;

/** @typedef {import('./+types/policies._index').Route} Route */
/** @typedef {import('storefrontapi.generated').PoliciesQuery} PoliciesQuery */
/** @typedef {import('storefrontapi.generated').PolicyItemFragment} PolicyItemFragment */
/** @typedef {ReturnType<typeof useLoaderData<typeof loader>>} LoaderReturnData */