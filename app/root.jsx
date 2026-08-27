import {Analytics, getShopAnalytics, useNonce} from '@shopify/hydrogen';
import {
  Outlet,
  useRouteError,
  isRouteErrorResponse,
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
} from 'react-router';

import favicon from '~/assets/favicon.png';
import {FOOTER_QUERY, HEADER_QUERY} from '~/lib/fragments';
import resetStyles from '~/styles/reset.css?url';
import appStyles from '~/styles/app.css?url';
import storefrontStyles from '~/styles/storefront.css?url';
import experienceStyles from '~/styles/experience.css?url';
import tailwindCss from './styles/tailwind.css?url';
import tokens from './styles/roof-roof-tokens.css?url';
import cartoonPremium from './styles/cartoon-premium.css?url';
import selectorSystem from './styles/selector-system.css?url';
import mobileExperience from './styles/mobile-experience.css?url';
import iconTitleSystem from './styles/icon-title-system.css?url';
import mobileAppShell from './styles/mobile-app-shell.css?url';
import responsiveSystem from './styles/responsive-system.css?url';
import mobileAlignmentFixes from './styles/mobile-alignment-fixes.css?url';
import responsiveCoverage from './styles/responsive-coverage.css?url';
import storefrontFinalFixes from './styles/storefront-final-fixes.css?url';
import screenshotCorrections from './styles/screenshot-corrections.css?url';
import layoutQualitySystem from './styles/layout-quality-system.css?url';
import cartAsidePolish from './styles/cart-aside-polish.css?url';
import finalVisualStability from './styles/final-visual-stability.css?url';
import mobileMenuVisibilityFix from './styles/mobile-menu-visibility-fix.css?url';
import {PageLayout} from './components/PageLayout';

import {ProductComparisonProvider} from './components/ProductComparison';

export const shouldRevalidate = ({formMethod, currentUrl, nextUrl}) => {
  if (formMethod && formMethod !== 'GET') return true;
  if (currentUrl.toString() === nextUrl.toString()) return true;
  return false;
};

export function links() {
  return [
    {rel: 'stylesheet', href: tokens},
    {rel: 'stylesheet', href: storefrontStyles},
    {rel: 'stylesheet', href: experienceStyles},
    {rel: 'stylesheet', href: cartoonPremium},
    {rel: 'stylesheet', href: selectorSystem},
    {rel: 'stylesheet', href: mobileExperience},
    {rel: 'stylesheet', href: iconTitleSystem},
    {rel: 'stylesheet', href: mobileAppShell},
    {rel: 'stylesheet', href: responsiveSystem},
    {rel: 'stylesheet', href: mobileAlignmentFixes},
    {rel: 'stylesheet', href: responsiveCoverage},
    {rel: 'stylesheet', href: storefrontFinalFixes},
    {rel: 'stylesheet', href: screenshotCorrections},
    {rel: 'stylesheet', href: layoutQualitySystem},
    {rel: 'stylesheet', href: cartAsidePolish},
    {rel: 'stylesheet', href: finalVisualStability},
    {rel: 'stylesheet', href: mobileMenuVisibilityFix},
    {rel: 'preconnect', href: 'https://cdn.shopify.com'},
    {rel: 'preconnect', href: 'https://shop.app'},
    {rel: 'icon', type: 'image/png', href: favicon},
  ];
}

export async function loader(args) {
  const deferredData = loadDeferredData(args);
  const criticalData = await loadCriticalData(args);
  const {storefront, env} = args.context;

  return {
    ...deferredData,
    ...criticalData,
    publicStoreDomain: env.PUBLIC_STORE_DOMAIN,
    shop: getShopAnalytics({
      storefront,
      publicStorefrontId: env.PUBLIC_STOREFRONT_ID,
    }),
    consent: {
      checkoutDomain: env.PUBLIC_CHECKOUT_DOMAIN ?? env.PUBLIC_STORE_DOMAIN,
      storefrontAccessToken: env.PUBLIC_STOREFRONT_API_TOKEN,
      withPrivacyBanner: false,
      country: args.context.storefront.i18n.country,
      language: args.context.storefront.i18n.language,
    },
  };
}

async function loadCriticalData({context}) {
  const {storefront} = context;

  const [header] = await Promise.all([
    storefront.query(HEADER_QUERY, {
      cache: storefront.CacheLong(),
      variables: {headerMenuHandle: 'main-menu'},
    }),
  ]);

  return {header};
}

function loadDeferredData({context}) {
  const {storefront, customerAccount, cart} = context;

  const footer = storefront
    .query(FOOTER_QUERY, {
      cache: storefront.CacheLong(),
      variables: {footerMenuHandle: 'footer'},
    })
    .catch((error) => {
      console.error(error);
      return null;
    });

  return {
    cart: cart.get(),
    isLoggedIn: customerAccount.isLoggedIn(),
    footer,
  };
}

export function Layout({children}) {
  const nonce = useNonce();

  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,viewport-fit=cover"
        />
        <meta name="theme-color" content="#F6A800" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />

        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Concert+One&family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />

        <link rel="stylesheet" href={tailwindCss} />
        <link rel="stylesheet" href={resetStyles} />
        <link rel="stylesheet" href={appStyles} />

        <Meta />
        <Links />
      </head>

      <body className="rr-site">
        <a className="rr-skip-link" href="#main-content">
          Ir al contenido
        </a>
        {children}

        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  );
}

export default function App() {
  const data = useRouteLoaderData('root');

  if (!data) return <Outlet />;

  return (
    <Analytics.Provider
      cart={data.cart}
      shop={data.shop}
      consent={data.consent}
    >
      <ProductComparisonProvider>
        <PageLayout {...data}>
          <Outlet />
        </PageLayout>
      </ProductComparisonProvider>
    </Analytics.Provider>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  let errorMessage = 'Ocurrió un error inesperado.';
  let errorStatus = 500;

  if (isRouteErrorResponse(error)) {
    errorMessage = error?.data?.message ?? error.data;
    errorStatus = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div className="route-error">
      <h1>Algo salió mal</h1>
      <h2>{errorStatus}</h2>

      {errorMessage && (
        <fieldset>
          <pre>{errorMessage}</pre>
        </fieldset>
      )}
    </div>
  );
}

/** @typedef {LoaderReturnData} RootLoader */
/** @typedef {import('react-router').ShouldRevalidateFunction} ShouldRevalidateFunction */
/** @typedef {import('./+types/root').Route} Route */
/** @typedef {ReturnType<typeof useLoaderData<typeof loader>>} LoaderReturnData */
