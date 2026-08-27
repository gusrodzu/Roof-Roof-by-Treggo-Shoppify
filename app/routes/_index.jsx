import {useLoaderData} from 'react-router';
import {HeroBanner} from '~/components/HeroBanner';
import {TrustBar} from '~/components/TrustBar';
import {AboutSection} from '~/components/AboutSection';
import {DiscoverSection} from '~/components/DiscoverSection';
import {PromoBanners} from '~/components/PromoBanners';
import {LifeStagesSection} from '~/components/LifeStagesSection';
import {RetailExperience} from '~/components/RetailExperience';

export const meta = () => [
  {title: 'Roof Roof — Espacios y accesorios para mascotas'},
  {
    name: 'description',
    content:
      'Casas, camas, jaulas, corrales y dispensadores para mascotas, con selector de productos, guía de medidas y compra segura en México.',
  },
];

export async function loader({context}) {
  const {products} = await context.storefront.query(FEATURED_ROOF_ROOF_QUERY);

  return {featuredProducts: products.nodes};
}

export default function Homepage() {
  const {featuredProducts} = useLoaderData();

  return (
    <div className="rr-home">
      <TrustBar />
      <HeroBanner />
      <RetailExperience />
      <DiscoverSection products={featuredProducts} />
      <PromoBanners />
      <LifeStagesSection />
      <AboutSection />
    </div>
  );
}

const FEATURED_ROOF_ROOF_QUERY = `#graphql
  query FeaturedRoofRoof($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 6, query: "vendor:'ROOF ROOF'") {
      nodes {
        id
        title
        handle
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        featuredImage {
          id
          url
          altText
          width
          height
        }
      }
    }
  }
`;

/** @typedef {import('./+types/_index').Route} Route */
/** @typedef {ReturnType<typeof useLoaderData<typeof loader>>} LoaderReturnData */
