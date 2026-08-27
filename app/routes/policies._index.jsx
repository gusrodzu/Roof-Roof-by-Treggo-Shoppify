import {useLoaderData} from 'react-router';
import {PolicyOverviewPage} from '~/components/PolicyOverviewPage';

export const meta = () => [{title: 'Políticas — Roof Roof'}];

export async function loader({context}) {
  const data = await context.storefront.query(POLICIES_QUERY);
  const shopPolicies = data.shop;
  const policies = [
    shopPolicies?.privacyPolicy,
    shopPolicies?.shippingPolicy,
    shopPolicies?.termsOfService,
    shopPolicies?.refundPolicy,
    shopPolicies?.subscriptionPolicy,
  ].filter(Boolean);

  if (!policies.length) {
    throw new Response('No policies found', {status: 404});
  }

  return {policies};
}

export default function Policies() {
  const {policies} = useLoaderData();
  return <PolicyOverviewPage policies={policies} />;
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
      privacyPolicy { ...PolicyItem }
      shippingPolicy { ...PolicyItem }
      termsOfService { ...PolicyItem }
      refundPolicy { ...PolicyItem }
      subscriptionPolicy { ...PolicyItem }
    }
  }
`;

/** @typedef {import('./+types/policies._index').Route} Route */
/** @typedef {ReturnType<typeof useLoaderData<typeof loader>>} LoaderReturnData */
