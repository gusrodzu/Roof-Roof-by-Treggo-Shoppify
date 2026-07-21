import {useState, useEffect} from 'react';
import {Link} from 'react-router';
import {Badge} from '~/components/design-system';

export const meta = () => [
  {title: 'Ayuda — Roof Roof'},
  {name: 'description', content: 'Preguntas frecuentes sobre envíos, pagos, productos y devoluciones en Roof Roof.'},
];

const CATEGORIES = [
  {
    key: 'envios',
    label: 'Envíos',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <rect x="1" y="3" width="15" height="13" rx="1"/>
        <path d="M16 8h3.5a1 1 0 01.9.55L22 12v4h-6"/>
        <circle cx="6" cy="18" r="2"/>
        <circle cx="18" cy="18" r="2"/>
      </svg>
    ),
    color: '#e3eefb',
    iconColor: '#1a5fa8',
    badge: '5 preguntas',
    faqs: [
      {
        q: '¿Cuánto tarda en llegar mi pedido?',
        a: 'Entregamos en 4 a 7 días hábiles a todo México. En zonas metropolitanas el tiempo puede reducirse a 2-3 días hábiles.',
      },
      {
        q: '¿Tienen envío gratis?',
        a: 'Sí, el envío es gratis en compras mayores a $599 MXN. En pedidos menores el costo de envío se calcula al finalizar la compra según tu ubicación.',
      },
      {
        q: '¿A qué estados de México envían?',
        a: 'Enviamos a toda la República Mexicana, incluyendo zonas rurales y de difícil acceso, aunque en esos casos el tiempo de entrega puede extenderse.',
      },
      {
        q: '¿Cómo puedo rastrear mi pedido?',
        a: 'Una vez que tu pedido sea enviado, recibirás un correo electrónico con el número de guía y el enlace para rastrearlo en tiempo real con nuestra paquetería.',
      },
      {
        q: '¿Qué paqueterías utilizan?',
        a: 'Trabajamos con Estafeta, DHL y FedEx según la zona de entrega, eligiendo siempre la opción más rápida y confiable para tu ubicación.',
      },
    ],
  },
  {
    key: 'pagos',
    label: 'Pagos',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <rect x="2" y="5" width="20" height="14" rx="2"/>
        <line x1="2" y1="10" x2="22" y2="10"/>
        <line x1="6" y1="15" x2="10" y2="15"/>
      </svg>
    ),
    color: '#e3f5e9',
    iconColor: '#1d7a3d',
    badge: '4 preguntas',
    faqs: [
      {
        q: '¿Qué métodos de pago aceptan?',
        a: 'Aceptamos tarjetas de crédito y débito (Visa, Mastercard, American Express), transferencia SPEI, OXXO Pay, PayPal y Mercado Pago.',
      },
      {
        q: '¿Puedo pagar a meses sin intereses?',
        a: 'Sí, ofrecemos hasta 12 meses sin intereses con tarjetas de crédito participantes a través de Mercado Pago. La opción aparece al momento de finalizar tu compra.',
      },
      {
        q: '¿Es seguro pagar en su tienda?',
        a: 'Totalmente. Nuestra tienda está protegida por Shopify Payments con cifrado SSL. Nunca almacenamos los datos de tu tarjeta y todas las transacciones son procesadas de forma segura.',
      },
      {
        q: '¿Puedo pagar con OXXO?',
        a: 'Sí. Al elegir esta opción recibirás una referencia de pago que puedes presentar en cualquier tienda OXXO. Tu pedido se procesa una vez confirmado el pago, lo cual toma hasta 24 horas hábiles.',
      },
    ],
  },
  {
    key: 'productos',
    label: 'Productos',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    color: 'var(--surface-cream)',
    iconColor: 'var(--brand-cta-hover)',
    badge: '5 preguntas',
    faqs: [
      {
        q: '¿Los materiales son seguros para mascotas?',
        a: 'Sí, todos nuestros productos están fabricados con materiales no tóxicos, libres de BPA y seguros para el contacto con mascotas. Cumplimos con estándares de calidad internacionales.',
      },
      {
        q: '¿Cómo elijo el tamaño correcto para mi mascota?',
        a: 'En cada página de producto encontrarás una guía de tallas con las medidas recomendadas según el peso y raza de tu mascota. Si tienes dudas, escríbenos por WhatsApp y te ayudamos a elegir.',
      },
      {
        q: '¿Los productos tienen garantía?',
        a: 'Sí, todos nuestros productos tienen garantía de satisfacción. Si el producto presenta algún defecto de fabricación en los primeros 30 días, lo reemplazamos sin costo adicional.',
      },
      {
        q: '¿Tienen refacciones o piezas de repuesto?',
        a: 'Para algunos de nuestros productos más populares sí contamos con refacciones. Contáctanos con el nombre del producto y te confirmamos disponibilidad.',
      },
      {
        q: '¿Cómo debo limpiar los productos?',
        a: 'La mayoría de nuestros productos se limpian fácilmente con un paño húmedo y jabón neutro. Evita productos abrasivos o con cloro. Cada producto incluye instrucciones específicas de cuidado.',
      },
    ],
  },
  {
    key: 'devoluciones',
    label: 'Devoluciones',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <path d="M3 9l4-4 4 4"/>
        <path d="M7 5v8a4 4 0 004 4h6"/>
        <path d="M21 15l-4 4-4-4"/>
      </svg>
    ),
    color: '#fbe3e0',
    iconColor: 'var(--danger)',
    badge: '4 preguntas',
    faqs: [
      {
        q: '¿Puedo devolver o cambiar un producto?',
        a: 'Sí. Si el producto no te convenció o no le gustó a tu mascota, tienes 30 días naturales desde la recepción para solicitar un cambio o devolución. El producto debe estar en condiciones originales y sin uso excesivo.',
      },
      {
        q: '¿Cómo inicio una devolución?',
        a: 'Escríbenos a ayuda@roofroof.mx o por WhatsApp con tu número de pedido y el motivo. Nuestro equipo te enviará las instrucciones para hacer el envío de regreso.',
      },
      {
        q: '¿Cuánto tarda el reembolso?',
        a: 'Una vez que recibamos y verifiquemos el producto, procesamos el reembolso en 3 a 5 días hábiles. El tiempo en que aparezca en tu cuenta depende de tu banco o método de pago.',
      },
      {
        q: '¿Quién paga el envío de la devolución?',
        a: 'Si el producto tiene un defecto de fabricación o enviamos un artículo incorrecto, nosotros cubrimos el costo del envío de retorno. En devoluciones por cambio de opinión, el costo lo cubre el cliente.',
      },
    ],
  },
];

export default function AyudaPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeCategory, setActiveCategory] = useState('envios');
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);
    const h = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', h);
    return () => mq.removeEventListener('change', h);
  }, []);

  const activeData = CATEGORIES.find((c) => c.key === activeCategory);

  return (
    <div style={{background: 'var(--surface-light)', minHeight: '100vh'}}>

      {/* ── Hero ── */}
      <div style={{
        background: 'var(--ink)',
        padding: isMobile ? '2.5rem 1.25rem' : '4rem 2rem',
        textAlign: 'center',
      }}>
        <p style={{fontSize: '0.8125rem', fontWeight: 700, color: 'var(--brand-cta)', textTransform: 'uppercase', letterSpacing: '1.5px', margin: '0 0 0.75rem'}}>
          Centro de ayuda
        </p>
        <h1 style={{fontSize: isMobile ? '1.75rem' : '2.5rem', fontWeight: 900, color: '#fff', margin: '0 0 0.75rem', lineHeight: 1.2}}>
          ¿En qué te podemos ayudar?
        </h1>
        <p style={{fontSize: '1rem', color: 'rgba(232,228,220,0.7)', margin: '0 0 2rem'}}>
          Encuentra respuestas rápidas a las preguntas más frecuentes
        </p>

        {/* Tarjetas de categoría */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)',
          gap: '0.75rem',
          maxWidth: '860px',
          margin: '0 auto',
        }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => { setActiveCategory(cat.key); setOpenFaq(null); }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.625rem',
                padding: '1.25rem 0.75rem',
                borderRadius: '1rem',
                border: `2px solid ${activeCategory === cat.key ? 'var(--brand-cta)' : 'rgba(255,255,255,0.1)'}`,
                background: activeCategory === cat.key ? 'rgba(245,166,35,0.12)' : 'rgba(255,255,255,0.05)',
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'all 0.15s',
                color: activeCategory === cat.key ? 'var(--brand-cta)' : 'rgba(232,228,220,0.7)',
              }}
            >
              <span style={{color: activeCategory === cat.key ? 'var(--brand-cta)' : 'rgba(232,228,220,0.6)'}}>
                {cat.icon}
              </span>
              <span style={{fontSize: '0.875rem', fontWeight: 700}}>
                {cat.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── FAQ de la categoría activa ── */}
      <div style={{maxWidth: '760px', margin: '0 auto', padding: isMobile ? '2rem 1rem' : '3rem 1.5rem'}}>

        {/* Header de categoría */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '1rem',
          marginBottom: '1.5rem',
        }}>
          <div style={{
            width: '52px', height: '52px', borderRadius: '0.875rem',
            background: activeData.color,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: activeData.iconColor, flexShrink: 0,
          }}>
            {activeData.icon}
          </div>
          <div>
            <h2 style={{fontSize: '1.25rem', fontWeight: 800, color: 'var(--ink)', margin: '0 0 0.25rem'}}>
              {activeData.label}
            </h2>
            <Badge tone="neutral">{activeData.badge}</Badge>
          </div>
        </div>

        {/* Acordeones */}
        <div style={{display: 'flex', flexDirection: 'column', gap: '0.625rem'}}>
          {activeData.faqs.map((faq, i) => {
            const isOpen = openFaq === `${activeCategory}-${i}`;
            return (
              <div
                key={i}
                style={{
                  background: '#fff',
                  borderRadius: '0.875rem',
                  border: `1.5px solid ${isOpen ? 'var(--brand-cta)' : 'var(--border)'}`,
                  overflow: 'hidden',
                  transition: 'border-color 0.15s',
                }}
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : `${activeCategory}-${i}`)}
                  style={{
                    width: '100%',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    gap: '1rem',
                    padding: '1.125rem 1.25rem',
                    background: 'none', border: 'none',
                    cursor: 'pointer', fontFamily: 'inherit',
                    textAlign: 'left',
                  }}
                >
                  <span style={{fontSize: '0.9375rem', fontWeight: 700, color: 'var(--ink)', lineHeight: 1.4}}>
                    {faq.q}
                  </span>
                  <svg
                    width="18" height="18" viewBox="0 0 24 24" fill="none"
                    stroke="var(--brand-cta)" strokeWidth="2.5" aria-hidden="true"
                    style={{
                      flexShrink: 0,
                      transition: 'transform 0.2s',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  >
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>

                {isOpen && (
                  <div style={{
                    padding: '0 1.25rem 1.25rem',
                    fontSize: '0.9375rem',
                    color: 'var(--ink-soft)',
                    lineHeight: 1.75,
                    borderTop: '1px solid var(--border-soft)',
                    paddingTop: '1rem',
                  }}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── ¿No encontraste tu respuesta? ── */}
        <div style={{
          marginTop: '2.5rem',
          background: 'var(--ink)',
          borderRadius: '1.25rem',
          padding: isMobile ? '1.5rem' : '2rem',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'center',
          justifyContent: 'space-between',
          gap: '1.25rem',
        }}>
          <div>
            <h3 style={{fontSize: '1.125rem', fontWeight: 800, color: '#fff', margin: '0 0 0.375rem'}}>
              ¿No encontraste lo que buscas?
            </h3>
            <p style={{fontSize: '0.875rem', color: 'rgba(232,228,220,0.65)', margin: 0}}>
              Nuestro equipo está listo para ayudarte
            </p>
          </div>
          <div style={{display: 'flex', gap: '0.75rem', flexWrap: 'wrap'}}>
            <a
              href="https://wa.me/528180000000?text=Hola%2C%20necesito%20ayuda%20con%20mi%20pedido"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: '#25D366', color: '#fff',
                fontWeight: 700, fontSize: '0.9375rem',
                padding: '0.75rem 1.25rem', borderRadius: '999px',
                textDecoration: 'none',
                boxShadow: '0 3px 0 rgba(0,0,0,0.2)',
                transition: 'opacity 0.15s',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M11.906 0C5.343 0 0 5.343 0 11.906c0 2.09.546 4.05 1.5 5.752L0 24l6.545-1.476A11.85 11.85 0 0011.906 23.812C18.469 23.812 23.812 18.47 23.812 11.906 23.812 5.343 18.469 0 11.906 0zm0 21.75a9.844 9.844 0 01-5.02-1.374l-.36-.214-3.733.842.876-3.638-.235-.374A9.844 9.844 0 012.063 11.906c0-5.43 4.413-9.844 9.843-9.844 5.43 0 9.844 4.414 9.844 9.844 0 5.43-4.414 9.844-9.844 9.844z"/>
              </svg>
              WhatsApp
            </a>
            <a
              href="mailto:ayuda@roofroof.mx"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: 'rgba(255,255,255,0.1)', color: '#fff',
                fontWeight: 700, fontSize: '0.9375rem',
                padding: '0.75rem 1.25rem', borderRadius: '999px',
                textDecoration: 'none', border: '1px solid rgba(255,255,255,0.2)',
                transition: 'background 0.15s',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
