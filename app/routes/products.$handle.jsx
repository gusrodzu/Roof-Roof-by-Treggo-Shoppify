import {useLoaderData, Link} from 'react-router';
import {CartForm, Image, Money} from '@shopify/hydrogen';
import {useState, useEffect} from 'react';
import {useAside} from '~/components/Aside';

export const meta = ({data}) => [
  {title: `${data?.product?.title ?? 'Producto'} — Roof Roof`},
  {name: 'description', content: data?.product?.description?.slice(0, 160) ?? ''},
];

export async function loader({context, params}) {
  const {storefront} = context;
  const {handle} = params;
  if (!handle) throw new Response('Not Found', {status: 404});
  const [{product}, {products: related}] = await Promise.all([
    storefront.query(PRODUCT_QUERY, {variables: {handle}}),
    storefront.query(RELATED_PRODUCTS_QUERY, {variables: {query: "vendor:'ROOF ROOF'", first: 6}}),
  ]);
  if (!product) throw new Response('Not Found', {status: 404});
  return {product, relatedProducts: related.nodes};
}

export default function ProductRoute() {
  const {product, relatedProducts} = useLoaderData();
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [mainImageIdx, setMainImageIdx]             = useState(0);
  const [quantity, setQuantity]                     = useState(1);
  const [showMSI, setShowMSI]                       = useState(true);
  const [isMobile, setIsMobile]                     = useState(false);
  const {open} = useAside();

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const variants = product.variants.nodes;
  const variant  = variants[selectedVariantIdx];
  const images   = product.images.nodes;

  const hasDiscount =
    variant.compareAtPrice &&
    parseFloat(variant.compareAtPrice.amount) > parseFloat(variant.price.amount);

  const discountPct = hasDiscount
    ? Math.round(
        ((parseFloat(variant.compareAtPrice.amount) - parseFloat(variant.price.amount)) /
          parseFloat(variant.compareAtPrice.amount)) * 100,
      )
    : null;

  return (
    <div style={{background: '#ffffff', minHeight: '100vh'}}>

      {/* ── BREADCRUMB ── */}
      <div style={{background: '#fff', borderBottom: '1px solid #e8e4dc', padding: '0.625rem 1.5rem'}}>
        <nav style={{maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8125rem', color: '#7a6a62', flexWrap: 'wrap'}}>
          <Link to="/" style={{color: '#7a6a62', textDecoration: 'none'}}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#F5A623')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#7a6a62')}
          >Inicio</Link>
          <span style={{color: '#c8b8b0'}}>/</span>
          <Link to="/collections/roof-roof" style={{color: '#7a6a62', textDecoration: 'none', textTransform: 'uppercase', fontWeight: 500}}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#F5A623')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#7a6a62')}
          >Roof Roof</Link>
          <span style={{color: '#c8b8b0'}}>/</span>
          <span style={{color: '#2C1810', fontWeight: 600}}>{product.title}</span>
        </nav>
      </div>

      {/* ── SECCIÓN PRINCIPAL ── */}
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: isMobile ? '1.25rem 1rem' : '2.5rem 1.5rem',
        display: isMobile ? 'flex' : 'grid',
        flexDirection: 'column',
        gridTemplateColumns: isMobile ? undefined : '1fr 1fr',
        gap: isMobile ? '1.5rem' : '3rem',
        alignItems: 'start',
      }}>

        {/* ── COLUMNA IZQUIERDA: galería + compra protegida ── */}
        <div>
          {/* Imagen principal */}
          <div style={{
            borderRadius: '1rem',
            overflow: 'hidden',
            background: '#fff',
            border: '1.5px solid #e8e4dc',
            aspectRatio: '1',
            marginBottom: '0.75rem',
            position: 'relative',
          }}>
            {hasDiscount && (
              <span style={{position: 'absolute', top: '1rem', left: '1rem', background: '#c0392b', color: '#fff', fontSize: '12px', fontWeight: 800, padding: '4px 12px', borderRadius: '999px', zIndex: 1}}>
                -{discountPct}%
              </span>
            )}
            {images[mainImageIdx] ? (
              <Image
                data={images[mainImageIdx]}
                sizes="(min-width: 768px) 50vw, 100vw"
                style={{width: '100%', height: '100%', objectFit: 'contain', padding: '1rem'}}
              />
            ) : (
              <div style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c8b8b0', fontSize: '4rem'}}>🐾</div>
            )}
          </div>

          {/* Miniaturas */}
          {images.length > 1 && (
            <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem'}}>
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setMainImageIdx(i)}
                  aria-label={`Ver imagen ${i + 1}`}
                  style={{
                    width: '68px', height: '68px',
                    borderRadius: '0.5rem', overflow: 'hidden',
                    border: `2px solid ${mainImageIdx === i ? '#F5A623' : '#ffffff'}`,
                    padding: 0, cursor: 'pointer', background: '#fff', flexShrink: 0,
                    transition: 'border-color 0.15s',
                    boxShadow: mainImageIdx === i ? '0 0 0 2px rgba(245,166,35,0.2)' : 'none',
                  }}
                >
                  <Image data={img} sizes="68px" style={{width: '100%', height: '100%', objectFit: 'contain', padding: '3px'}}/>
                </button>
              ))}
            </div>
          )}

          {/* ── Compra protegida ── */}
          <div style={{background: '#fff', border: '1.5px solid #e8e4dc', borderRadius: '0.875rem', padding: '1.25rem'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.875rem'}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F5A623" strokeWidth="2" aria-hidden="true">
                <path d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5l8-3z"/>
                <path d="M9 12l2 2 4-4"/>
              </svg>
              <h4 style={{fontSize: '0.9375rem', fontWeight: 700, color: '#2C1810', margin: 0}}>
                Compra Protegida
              </h4>
            </div>
            <div style={{display: 'flex', gap: '0.5rem', marginBottom: '0.875rem', flexWrap: 'wrap', alignItems: 'center'}}>
              {/* American Express */}
              <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 38 24" width="38" height="24" fill="none" aria-labelledby="pi-amex-pdp"><title id="pi-amex-pdp">American Express</title><rect x=".5" y=".5" width="37" height="23" rx="2.5" stroke="#000" strokeOpacity=".07" fill="none"/><path d="M35 0H3C1.3 0 0 1.3 0 3V21C0 22.7 1.4 24 3 24H35C36.7 24 38 22.7 38 21V3C38 1.3 36.6 0 35 0Z" fill="#0071CE"/><path d="M25.8662 6.33203V3H31L31.8662 5.5332L32.7334 3H37V14.2002H36.7998L34.8672 16.2656L36.7998 18.3594H37V21.2666H33.5996L31.9336 19.3994L30.2002 21.2666H19.4668V12.666H16L20.2666 3H24.4004L25.8662 6.33203ZM20.5996 20.2656H27V18.5322H22.666V17.3994H26.8662V15.666H22.666V14.5322H27V12.7988H20.5996V20.2656ZM30.5332 16.5322L27 20.2656H29.5996L31.8662 17.8662L34.0664 20.2656H36.7324L33.1992 16.4658L36.7324 12.7988H34.1328L31.8662 15.1992L29.7324 12.7988H27L30.5332 16.5322ZM17.666 11.7324H19.9326L20.5332 10.1992H23.999L24.666 11.7324H26.999L23.666 4.19922H20.999L17.666 11.7324ZM33.5996 4.19922L31.9326 8.86621L30.1992 4.19922H27V11.666H29.0664V6.39941L31 11.666H32.7998L34.7324 6.39941V11.666H36.7324V4.13281L33.5996 4.19922ZM23.2656 8.46582H21.2656L22.2656 5.99902L23.2656 8.46582Z" fill="white"/></svg>
              {/* Mastercard */}
              <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 38 24" width="38" height="24" fill="none" aria-labelledby="pi-mc-pdp"><title id="pi-mc-pdp">Mastercard</title><rect x=".5" y=".5" width="37" height="23" rx="2.5" stroke="#000" strokeOpacity=".07" fill="none"/><path d="M35 0H3C1.3 0 0 1.3 0 3V21C0 22.7 1.4 24 3 24H35C36.7 24 38 22.7 38 21V3C38 1.3 36.6 0 35 0Z" fill="#1C1C1C"/><path d="M35 1C36.1 1 37 1.9 37 3V21C37 22.1 36.1 23 35 23H3C1.9 23 1 22.1 1 21V3C1 1.9 1.9 1 3 1H35Z" fill="#232323"/><path d="M14.6364 19.2727C18.8538 19.2727 22.2727 15.8538 22.2727 11.6364C22.2727 7.41892 18.8538 4 14.6364 4C10.4189 4 7 7.41892 7 11.6364C7 15.8538 10.4189 19.2727 14.6364 19.2727Z" fill="#EB001B"/><path d="M23.3637 19.2727C27.5811 19.2727 31 15.8538 31 11.6364C31 7.41892 27.5811 4 23.3637 4C19.1462 4 15.7273 7.41892 15.7273 11.6364C15.7273 15.8538 19.1462 19.2727 23.3637 19.2727Z" fill="#F79E1B"/><path d="M22.2727 11.6362C22.2727 9.01797 20.9637 6.72706 19 5.41797C17.0364 6.83615 15.7273 9.12706 15.7273 11.6362C15.7273 14.1452 17.0364 16.5452 19 17.8543C20.9637 16.5452 22.2727 14.2543 22.2727 11.6362Z" fill="#FF5F00"/></svg>
              {/* Visa */}
              <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 38 24" width="38" height="24" fill="none" aria-labelledby="pi-visa-pdp"><title id="pi-visa-pdp">Visa</title><rect x=".5" y=".5" width="37" height="23" rx="2.5" stroke="#000" strokeOpacity=".07" fill="none"/><path d="M35 0H3C1.3 0 0 1.3 0 3V21C0 22.7 1.4 24 3 24H35C36.7 24 38 22.7 38 21V3C38 1.3 36.6 0 35 0Z" fill="#142FBD"/><path d="M35 1C36.1 1 37 1.9 37 3V21C37 22.1 36.1 23 35 23H3C1.9 23 1 22.1 1 21V3C1 1.9 1.9 1 3 1H35Z" fill="#1532CB"/><path d="M29.5944 10.2167H29.2778C28.8556 11.2722 28.5389 11.8 28.2222 13.3833H30.2278C29.9111 11.8 29.9111 11.0611 29.5944 10.2167V10.2167ZM32.6556 16.4444H30.8611C30.7556 16.4444 30.7556 16.4444 30.65 16.3389L30.4389 15.3889L30.3333 15.1778H27.8C27.6944 15.1778 27.5889 15.1778 27.5889 15.3889L27.2722 16.3389C27.2722 16.4444 27.1667 16.4444 27.1667 16.4444H24.95L25.1611 15.9167L28.2222 8.73889C28.2222 8.21111 28.5389 8 29.0667 8H30.65C30.7556 8 30.8611 8 30.8611 8.21111L32.3389 15.0722C32.4444 15.4944 32.55 15.8111 32.55 16.2333C32.6556 16.3389 32.6556 16.3389 32.6556 16.4444V16.4444ZM18.5111 16.1278L18.9333 14.2278C19.0389 14.2278 19.1444 14.3333 19.1444 14.3333C19.8833 14.65 20.6222 14.8611 21.3611 14.7556C21.5722 14.7556 21.8889 14.65 22.1 14.5444C22.6278 14.3333 22.6278 13.8056 22.2056 13.3833C21.9944 13.1722 21.6778 13.0667 21.3611 12.8556C20.9389 12.6444 20.5167 12.4333 20.2 12.1167C18.9333 11.0611 19.3556 9.58333 20.0944 8.84444C20.7278 8.42222 21.0444 8 21.8889 8C23.1556 8 24.5278 8 25.1611 8.21111H25.2667C25.1611 8.84444 25.0556 9.37222 24.8444 10.0056C24.3167 9.79444 23.7889 9.58333 23.2611 9.58333C22.9444 9.58333 22.6278 9.58333 22.3111 9.68889C22.1 9.68889 21.9944 9.79444 21.8889 9.9C21.6778 10.1111 21.6778 10.4278 21.8889 10.6389L22.4167 11.0611C22.8389 11.2722 23.2611 11.4833 23.5778 11.6944C24.1056 12.0111 24.6333 12.5389 24.7389 13.1722C24.95 14.1222 24.6333 14.9667 23.7889 15.6C23.2611 16.0222 23.05 16.2333 22.3111 16.2333C20.8333 16.2333 19.6722 16.3389 18.7222 16.0222C18.6167 16.2333 18.6167 16.2333 18.5111 16.1278V16.1278ZM14.8167 16.4444C14.9222 15.7056 14.9222 15.7056 15.0278 15.3889C15.5556 13.0667 16.0833 10.6389 16.5056 8.31667C16.6111 8.10556 16.6111 8 16.8222 8H18.7222C18.5111 9.26667 18.3 10.2167 17.9833 11.3778C17.6667 12.9611 17.35 14.5444 16.9278 16.1278C16.9278 16.3389 16.8222 16.3389 16.6111 16.3389L14.8167 16.4444ZM5 8.21111C5 8.10556 5.21111 8 5.31667 8H8.90556C9.43333 8 9.85556 8.31667 9.96111 8.84444L10.9111 13.4889C10.9111 13.5944 10.9111 13.5944 11.0167 13.7C11.0167 13.5944 11.1222 13.5944 11.1222 13.5944L13.3389 8.21111C13.2333 8.10556 13.3389 8 13.4444 8H15.6611C15.6611 8.10556 15.6611 8.10556 15.5556 8.21111L12.2833 15.9167C12.1778 16.1278 12.1778 16.2333 12.0722 16.3389C11.9667 16.4444 11.7556 16.3389 11.5444 16.3389H9.96111C9.85556 16.3389 9.75 16.3389 9.75 16.1278L8.06111 9.58333C7.85 9.37222 7.53333 9.05556 7.11111 8.95C6.47778 8.63333 5.31667 8.42222 5.10556 8.42222L5 8.21111Z" fill="white"/></svg>
            </div>
            <p style={{fontSize: '0.8125rem', color: '#7a6a62', lineHeight: 1.65, margin: 0}}>
              Comprar en nuestra tienda es 100% seguro. Todas tus transacciones están
              protegidas desde el momento en que realizas tu pago hasta que recibes tu pedido.
            </p>
          </div>
        </div>

        {/* ── COLUMNA DERECHA: info ── */}
        <div>
          {/* Vendor + título */}
          <p style={{fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: '#F5A623', marginBottom: '0.375rem', margin: '0 0 0.375rem'}}>
            {product.vendor}
          </p>
          <h1 style={{fontSize: isMobile ? '1.375rem' : '1.75rem', fontWeight: 800, color: '#2C1810', lineHeight: 1.25, marginBottom: '1rem'}}>
            {product.title}
          </h1>

          {/* Precio */}
          <div style={{display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap'}}>
            <Money data={variant.price} style={{fontSize: isMobile ? '1.625rem' : '2rem', fontWeight: 800, color: '#2C1810'}}/>
            {hasDiscount && (
              <>
                <Money data={variant.compareAtPrice} style={{fontSize: '1rem', color: '#b0a49c', textDecoration: 'line-through'}}/>
                <span style={{background: '#c0392b', color: '#fff', fontSize: '11px', fontWeight: 800, padding: '3px 10px', borderRadius: '999px'}}>
                  -{discountPct}% OFF
                </span>
              </>
            )}
          </div>

          {/* Disponibilidad */}
          {variant.availableForSale ? (
            <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#e8faf4', border: '1px solid #b0ecd9', borderRadius: '0.5rem', padding: '0.625rem 0.875rem', marginBottom: '1rem'}}>
              <span style={{width: '8px', height: '8px', borderRadius: '50%', background: '#1aad6d', flexShrink: 0, boxShadow: '0 0 0 3px #b0ecd9'}}/>
              <span style={{fontSize: '0.8125rem', fontWeight: 600, color: '#0a4a32'}}>En stock — listo para envío</span>
            </div>
          ) : (
            <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '0.5rem', padding: '0.625rem 0.875rem', marginBottom: '1rem'}}>
              <span style={{width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444', flexShrink: 0, boxShadow: '0 0 0 3px #fecaca'}}/>
              <span style={{fontSize: '0.8125rem', fontWeight: 600, color: '#7f1d1d'}}>Agotado — sin existencias por el momento</span>
            </div>
          )}

          {/* Banner MSI */}
          {showMSI && (
            <div style={{background: '#fff8ee', border: '1px solid #f0d490', borderRadius: '0.75rem', padding: '0.875rem 1rem', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '1rem'}}>
              <div style={{display: 'flex', gap: '0.75rem', alignItems: 'flex-start'}}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d4891a" strokeWidth="1.8" style={{flexShrink: 0, marginTop: '2px'}} aria-hidden="true">
                  <rect x="2" y="5" width="20" height="14" rx="2"/>
                  <line x1="2" y1="10" x2="22" y2="10"/>
                </svg>
                <div>
                  <p style={{fontSize: '0.875rem', fontWeight: 700, color: '#7a5200', margin: '0 0 0.2rem'}}>Paga en 3 o 6 MSI</p>
                  <p style={{fontSize: '0.8125rem', color: '#7a6a62', margin: 0}}>
                    Hasta en <strong>6 mensualidades.</strong> Aceptamos Visa, Mastercard y más.
                  </p>
                </div>
              </div>
              {/* <button onClick={() => setShowMSI(false)} aria-label="Cerrar" style={{background: 'transparent', border: 'none', cursor: 'pointer', color: '#b0a49c', flexShrink: 0, padding: '0.25rem'}}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button> */}
            </div>
          )}

          {/* Banner Mercado Pago */}
          <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', background: '#fff', border: '1px solid #e8e4dc', borderRadius: '0.625rem', padding: '0.625rem 0.875rem'}}>
            <span style={{width: '36px', height: '36px', borderRadius: '50%', background: '#ffe600', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '1.125rem'}}>🤝</span>
            <p style={{margin: 0, fontSize: '0.8125rem', color: '#2C1810'}}>
              <strong>Compra ahora, paga después</strong> con Mercado Pago.{' '}
              <a href="https://www.mercadopago.com.mx" target="_blank" rel="noopener noreferrer"
                style={{color: '#F5A623', fontWeight: 700, textDecoration: 'none'}}
              >Saber más →</a>
            </p>
          </div>

          {/* Descripción */}
          {product.descriptionHtml && (
            <div
              dangerouslySetInnerHTML={{__html: product.descriptionHtml}}
              style={{fontSize: '0.875rem', color: '#7a6a62', lineHeight: 1.75, marginBottom: '1.5rem'}}
            />
          )}

          {/* Selector de variantes */}
          {product.options?.map((option) => {
            if (option.values.length <= 1) return null;
            const activeValue = variants[selectedVariantIdx]?.selectedOptions?.find((o) => o.name === option.name)?.value;
            return (
              <div key={option.name} style={{marginBottom: '1rem'}}>
                <p style={{fontSize: '0.8125rem', fontWeight: 700, color: '#2C1810', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px'}}>
                  {option.name}
                </p>
                <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.5rem'}}>
                  {option.values.map((val) => {
                    const isActive = activeValue === val;
                    const matchingVariant = variants.find((v) =>
                      v.selectedOptions.some((o) => o.name === option.name && o.value === val),
                    );
                    const isAvailable = matchingVariant?.availableForSale ?? false;
                    const matchingIdx = variants.findIndex((v) =>
                      v.selectedOptions.some((o) => o.name === option.name && o.value === val),
                    );
                    return (
                      <button
                        key={val}
                        onClick={() => matchingIdx >= 0 && setSelectedVariantIdx(matchingIdx)}
                        disabled={!isAvailable}
                        style={{
                          padding: '0.5rem 1rem',
                          borderRadius: '0.5rem',
                          border: `2px solid ${isActive ? '#F5A623' : '#e8e4dc'}`,
                          background: isActive ? '#fff8ee' : '#fff',
                          color: isActive ? '#2C1810' : '#7a6a62',
                          fontSize: '0.8125rem',
                          fontWeight: isActive ? 700 : 500,
                          cursor: isAvailable ? 'pointer' : 'not-allowed',
                          opacity: isAvailable ? 1 : 0.4,
                          textDecoration: !isAvailable ? 'line-through' : 'none',
                          fontFamily: 'inherit',
                          transition: 'border-color 0.15s, background 0.15s',
                        }}
                      >
                        {val}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Cantidad */}
          <div style={{marginBottom: '1.25rem'}}>
            <p style={{fontSize: '0.8125rem', fontWeight: 700, color: '#2C1810', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px'}}>Cantidad</p>
            <div style={{display: 'flex', alignItems: 'center', width: 'fit-content', border: '1.5px solid #e8e4dc', borderRadius: '0.5rem', overflow: 'hidden', background: '#fff'}}>
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Disminuir"
                style={{width: '40px', height: '40px', border: 'none', borderRight: '1px solid #e8e4dc', background: '#f5f7fa', color: '#2C1810', fontSize: '1.25rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700}}
              >−</button>
              <span style={{width: '48px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9375rem', fontWeight: 700, color: '#2C1810'}}>
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Aumentar"
                style={{width: '40px', height: '40px', border: 'none', borderLeft: '1px solid #e8e4dc', background: '#f5f7fa', color: '#2C1810', fontSize: '1.25rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700}}
              >+</button>
            </div>
          </div>

          {/* Botón — Añadir al carrito */}
          {variant.availableForSale ? (
            <CartForm
              route="/cart"
              action={CartForm.ACTIONS.LinesAdd}
              inputs={{lines: [{merchandiseId: variant.id, quantity}]}}
              onSubmit={() => open('cart')}
            >
              {(fetcher) => (
                <button
                  type="submit"
                  disabled={fetcher.state !== 'idle'}
                  style={{
                    width: '100%', padding: '1rem', borderRadius: '0.75rem', border: 'none',
                    background: fetcher.state !== 'idle' ? '#e8e4dc' : '#F5A623',
                    color: fetcher.state !== 'idle' ? '#b0a49c' : '#2C1810',
                    fontSize: '1rem', fontWeight: 800, cursor: fetcher.state !== 'idle' ? 'not-allowed' : 'pointer',
                    marginBottom: '0.75rem', transition: 'background 0.15s, transform 0.1s',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                    fontFamily: 'inherit',
                    boxShadow: fetcher.state === 'idle' ? '0 6px 20px rgba(245,166,35,0.3)' : 'none',
                  }}
                  onMouseEnter={(e) => { if (fetcher.state === 'idle') e.currentTarget.style.background = '#d4891a'; }}
                  onMouseLeave={(e) => { if (fetcher.state === 'idle') e.currentTarget.style.background = '#F5A623'; }}
                >
                  {fetcher.state !== 'idle' ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{animation: 'spin 0.8s linear infinite'}} aria-hidden="true">
                        <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
                        <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" opacity="0.3"/><path d="M21 12a9 9 0 00-9-9"/>
                      </svg>
                      Agregando...
                    </>
                  ) : (
                    <>
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                        <line x1="3" y1="6" x2="21" y2="6"/>
                        <path d="M16 10a4 4 0 01-8 0"/>
                      </svg>
                      Añadir al carrito
                    </>
                  )}
                </button>
              )}
            </CartForm>
          ) : (
            <button disabled style={{width: '100%', padding: '1rem', borderRadius: '0.75rem', border: 'none', background: '#e8e4dc', color: '#b0a49c', fontSize: '1rem', fontWeight: 700, cursor: 'not-allowed', marginBottom: '0.75rem', fontFamily: 'inherit'}}>
              Agotado
            </button>
          )}

          {/* Botón — Comprar ahora */}
          {variant.availableForSale && (
            <CartForm
              route="/cart"
              action={CartForm.ACTIONS.LinesAdd}
              inputs={{lines: [{merchandiseId: variant.id, quantity}], redirectTo: '/checkout'}}
            >
              {(fetcher) => (
                <button
                  type="submit"
                  disabled={fetcher.state !== 'idle'}
                  style={{
                    width: '100%', padding: '1rem', borderRadius: '0.75rem',
                    border: '2px solid #2C1810', background: 'transparent',
                    color: '#2C1810', fontSize: '1rem', fontWeight: 700,
                    cursor: fetcher.state !== 'idle' ? 'not-allowed' : 'pointer',
                    marginBottom: '1.5rem', transition: 'background 0.15s, color 0.15s',
                    fontFamily: 'inherit',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#2C1810'; e.currentTarget.style.color = '#F5A623'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#2C1810'; }}
                >
                  {fetcher.state !== 'idle' ? 'Procesando...' : 'Comprar ahora →'}
                </button>
              )}
            </CartForm>
          )}

          {/* Trust chips inline */}
          <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.5rem'}}>
            {['🚚 Envío gratis +$599', '🛡️ Garantía incluida', '💳 Pagos seguros'].map((t) => (
              <span key={t} style={{fontSize: '0.75rem', fontWeight: 600, color: '#7a6a62', background: '#fff', border: '1px solid #e8e4dc', borderRadius: '999px', padding: '4px 10px'}}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── TRUST BAR ── */}
      <div style={{background: '#2C1810', padding: '2rem 1.5rem'}}>
        <div style={{maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? '1.5rem' : '2rem', textAlign: 'center'}}>
          {[
            {
              icon: <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#F5A623" strokeWidth="1.5" aria-hidden="true"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h3.5a1 1 0 01.9.55L22 12v4h-6"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></svg>,
              title: 'Entrega express',
              desc: 'Envío a todo México en 4-7 días hábiles.',
            },
            {
              icon: <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#F5A623" strokeWidth="1.5" aria-hidden="true"><path d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5l8-3z"/><path d="M9 12l2 2 4-4"/></svg>,
              title: 'Calidad garantizada',
              desc: 'Materiales resistentes, diseño duradero.',
            },
            {
              icon: <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#F5A623" strokeWidth="1.5" aria-hidden="true"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>,
              title: 'Soporte 24/7',
              desc: 'Cambios, dudas y ajustes sin complicaciones.',
            },
          ].map(({icon, title, desc}) => (
            <div key={title}>
              <div style={{display: 'flex', justifyContent: 'center', marginBottom: '0.75rem'}}>{icon}</div>
              <h3 style={{fontSize: '0.9375rem', fontWeight: 700, color: '#fff', margin: '0 0 0.375rem'}}>{title}</h3>
              <p style={{fontSize: '0.8125rem', color: 'rgba(232,228,220,0.7)', margin: 0, lineHeight: 1.6}}>{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── PRODUCTOS SIMILARES ── */}
      {relatedProducts?.length > 0 && (
        <section style={{maxWidth: '1100px', margin: '0 auto', padding: isMobile ? '2.5rem 1rem' : '4rem 1.5rem'}}>
          <p style={{fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: '#F5A623', textAlign: 'center', margin: '0 0 0.5rem'}}>
            También te puede gustar
          </p>
          <h2 style={{fontSize: isMobile ? '1.25rem' : '1.625rem', fontWeight: 800, color: '#2C1810', textAlign: 'center', marginBottom: '2rem'}}>
            Artículos similares
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem',
          }}>
            {relatedProducts.filter((p) => p.handle !== product.handle).slice(0, 5).map((p) => (
              <RelatedCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}

function RelatedCard({product: p}) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      to={`/products/${p.handle}`}
      style={{textDecoration: 'none', display: 'block'}}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        background: '#fff',
        borderRadius: '0.875rem',
        border: `1.5px solid ${hovered ? '#F5A623' : '#e8e4dc'}`,
        overflow: 'hidden',
        transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.2s',
        boxShadow: hovered ? '0 6px 18px rgba(44,24,16,0.1)' : '0 1px 4px rgba(44,24,16,0.04)',
        transform: hovered ? 'translateY(-3px)' : 'none',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        padding: '1rem',
        gap: '0.75rem', textAlign: 'center',
      }}>
        <div style={{width: '120px', height: '120px', background: '#f5f7fa', borderRadius: '0.625rem', overflow: 'hidden', border: '1px solid #e8e4dc'}}>
          {p.featuredImage && (
            <Image data={p.featuredImage} sizes="120px" style={{width: '100%', height: '100%', objectFit: 'contain', padding: '4px'}}/>
          )}
        </div>
        <p style={{fontSize: '0.8125rem', fontWeight: 600, color: '#2C1810', lineHeight: 1.4, margin: 0,
          overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical'}}
        >
          {p.title}
        </p>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.25rem',
          background: hovered ? '#d4891a' : '#F5A623',
          color: '#2C1810', fontSize: '0.75rem', fontWeight: 700,
          padding: '0.4rem 0.875rem', borderRadius: '999px',
          transition: 'background 0.15s',
        }}>
          Ver detalles
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
          </svg>
        </span>
        {p.description && (
          <p style={{fontSize: '0.75rem', color: '#7a6a62', lineHeight: 1.5, margin: 0}}>
            {p.description.slice(0, 70)}{p.description.length > 70 ? '...' : ''}
          </p>
        )}
      </div>
    </Link>
  );
}

const PRODUCT_QUERY = `#graphql
  query Product($handle: String!, $country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      id title handle description descriptionHtml vendor tags
      images(first: 10) { nodes { id url altText width height } }
      options { name values }
      variants(first: 20) {
        nodes {
          id title availableForSale
          selectedOptions { name value }
          price { amount currencyCode }
          compareAtPrice { amount currencyCode }
          image { url altText width height }
        }
      }
    }
  }
`;

const RELATED_PRODUCTS_QUERY = `#graphql
  query RelatedProducts($query: String!, $first: Int!, $country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: $first, query: $query) {
      nodes {
        id title handle description
        featuredImage { url altText width height }
        priceRange { minVariantPrice { amount currencyCode } }
      }
    }
  }
`;

/** @typedef {import('./+types/products.$handle').Route} Route */