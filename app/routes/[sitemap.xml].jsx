import {getSitemapIndex} from '@shopify/hydrogen';

export async function loader({request, context: {storefront}}) {
  const response = await getSitemapIndex({
    storefront,
    request,
  });

  const origin = new URL(request.url).origin;
  const xml = await response.text();
  const staticSitemap = `  <sitemap><loc>${origin}/sitemap/static/1.xml</loc></sitemap>\n`;
  const body = xml.includes('</sitemapindex>')
    ? xml.replace('</sitemapindex>', `${staticSitemap}</sitemapindex>`)
    : xml;

  return new Response(body, {
    status: response.status,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': `max-age=${60 * 60 * 24}`,
    },
  });
}

/** @typedef {import('./+types/[sitemap.xml]').Route} Route */
