import {useMemo, useState} from 'react';
import {Link} from 'react-router';
import styles from '~/styles/FaqPage.module.css';

export const meta = () => [
  {title: 'Preguntas frecuentes | Roof Roof'},
  {
    name: 'description',
    content:
      'Respuestas sobre productos, medidas, envíos, pagos, cambios y compras en Roof Roof.',
  },
];

const FAQ_GROUPS = [
  {
    id: 'compras',
    label: 'Compras',
    icon: 'bag',
    items: [
      {
        question: '¿Cómo encuentro el producto adecuado para mi mascota?',
        answer:
          'Puedes comenzar con nuestro selector de productos y después revisar la guía de medidas de cada categoría. Antes de comprar, compara el espacio disponible, el tamaño de tu mascota y el uso principal que tendrá el producto.',
      },
      {
        question:
          '¿Los precios y promociones son los mismos en toda la tienda?',
        answer:
          'El precio vigente es el que aparece en la ficha del producto y se confirma nuevamente en el carrito. Las promociones pueden depender de fechas, inventario, variantes o condiciones específicas mostradas en el sitio.',
      },
      {
        question: '¿Puedo modificar mi pedido después de comprar?',
        answer:
          'Los pedidos comienzan a procesarse después de su confirmación, por lo que una modificación no siempre será posible. Revisa cuidadosamente productos, cantidades, variantes y dirección antes de finalizar el checkout.',
      },
    ],
  },
  {
    id: 'productos',
    label: 'Productos y medidas',
    icon: 'ruler',
    items: [
      {
        question: '¿Cómo elijo la medida correcta?',
        answer:
          'Mide a tu mascota y el espacio donde usarás el producto. No te guíes únicamente por raza o peso: revisa las dimensiones publicadas, deja margen para movimiento y consulta nuestra guía de medidas antes de elegir.',
      },
      {
        question: '¿Las fotografías representan exactamente el producto?',
        answer:
          'Las fotografías buscan representar fielmente cada artículo. Sin embargo, el color puede variar ligeramente por iluminación, pantalla o lote de fabricación. Las medidas, materiales y variantes indicadas en la ficha son la referencia principal.',
      },
      {
        question: '¿Cómo sé si un producto está disponible?',
        answer:
          'La disponibilidad se muestra en la ficha del producto y puede variar por variante. Si una opción aparece agotada, no podrá agregarse al carrito hasta que vuelva a estar disponible.',
      },
      {
        question: '¿Dónde encuentro instrucciones de armado o cuidado?',
        answer:
          'Revisa la descripción y los bloques informativos de la ficha del producto. Conserva empaques, etiquetas y manuales incluidos, ya que pueden contener recomendaciones específicas de armado, limpieza o mantenimiento.',
      },
    ],
  },
  {
    id: 'envios',
    label: 'Envíos',
    icon: 'truck',
    items: [
      {
        question: '¿Cuánto tarda en llegar mi pedido?',
        answer:
          'El plazo depende del destino, disponibilidad, dimensiones del paquete y paquetería asignada. La estimación aplicable se muestra durante el proceso de compra o se comunica después de confirmar el envío.',
      },
      {
        question: '¿Cómo se calcula el costo de envío?',
        answer:
          'El costo se calcula con la dirección de entrega y las características del pedido. Cuando exista una promoción de envío, sus condiciones se mostrarán en la tienda, el carrito o el checkout.',
      },
      {
        question: '¿Cómo rastreo mi compra?',
        answer:
          'Cuando el pedido sea preparado y la guía esté disponible, recibirás la información de seguimiento mediante los datos registrados durante la compra.',
      },
      {
        question: '¿Qué pasa si el paquete llega dañado?',
        answer:
          'Documenta el estado del empaque y del producto con fotografías antes de desechar cualquier material. Conserva la guía y consulta la política de cambios y devoluciones para conocer el proceso aplicable.',
      },
    ],
  },
  {
    id: 'pagos',
    label: 'Pagos',
    icon: 'card',
    items: [
      {
        question: '¿Qué métodos de pago aceptan?',
        answer:
          'Los métodos disponibles aparecen directamente en el checkout y pueden variar según la configuración vigente de la tienda, el monto de compra o el dispositivo desde el que realizas el pago.',
      },
      {
        question: '¿Roof Roof guarda los datos de mi tarjeta?',
        answer:
          'Roof Roof no necesita mostrar ni administrar directamente los datos completos de tu tarjeta. El pago se procesa mediante la infraestructura segura habilitada en el checkout de Shopify.',
      },
      {
        question: '¿Por qué mi pago puede quedar pendiente o ser rechazado?',
        answer:
          'La autorización depende del método de pago y de la institución emisora. Verifica fondos, datos, límites y validaciones de seguridad. Un intento de pago no siempre significa que el pedido haya quedado confirmado.',
      },
      {
        question: '¿Cómo sé que mi compra quedó confirmada?',
        answer:
          'Al finalizar correctamente recibirás una confirmación con los datos del pedido. Si no la ves, revisa la bandeja de correo no deseado y confirma que el cobro realmente haya sido autorizado.',
      },
    ],
  },
  {
    id: 'cambios',
    label: 'Cambios y devoluciones',
    icon: 'return',
    items: [
      {
        question: '¿Puedo solicitar un cambio o devolución?',
        answer:
          'Cada solicitud se revisa conforme a la política vigente, el estado del producto, el motivo y el tiempo transcurrido desde la entrega. Consulta la política completa antes de enviar o manipular el artículo.',
      },
      {
        question: '¿Qué debo conservar para solicitar una revisión?',
        answer:
          'Conserva el producto, accesorios, manuales, etiquetas, empaque, guía y evidencia fotográfica. Estos elementos ayudan a identificar el pedido y evaluar correctamente la solicitud.',
      },
      {
        question: '¿Cuándo se procesa un reembolso?',
        answer:
          'Cuando una devolución sea aprobada, el reembolso se procesa al método correspondiente. El tiempo de reflejo posterior depende del proveedor de pago o institución financiera.',
      },
    ],
  },
];

const QUICK_LINKS = [
  {
    title: 'Selector de productos',
    copy: 'Encuentra una categoría según tu mascota, espacio y necesidad.',
    to: '/pages/selector-de-productos',
    icon: 'sparkle',
  },
  {
    title: 'Guía de medidas',
    copy: 'Mide mejor antes de elegir casas, camas, jaulas o corrales.',
    to: '/pages/guia-de-tallas',
    icon: 'ruler',
  },
  {
    title: 'Cambios y devoluciones',
    copy: 'Consulta condiciones, exclusiones y pasos aplicables.',
    to: '/policies/refund-policy',
    icon: 'return',
  },
];

function FaqIcon({name}) {
  const paths = {
    bag: (
      <>
        <path d="M5 8h14l-1 13H6L5 8z" />
        <path d="M9 9V6a3 3 0 016 0v3" />
      </>
    ),
    ruler: (
      <>
        <path d="M4 17L17 4l3 3L7 20H4v-3z" />
        <path d="M12 9l3 3M9 12l2 2M15 6l2 2" />
      </>
    ),
    truck: (
      <>
        <path d="M3 6h11v10H3zM14 10h4l3 3v3h-7z" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="18" cy="18" r="2" />
      </>
    ),
    card: (
      <>
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20M6 15h4" />
      </>
    ),
    return: (
      <>
        <path d="M9 7H5l3-3" />
        <path d="M5 7h10a5 5 0 010 10h-2" />
      </>
    ),
    sparkle: (
      <>
        <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
        <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z" />
      </>
    ),
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

export default function FaqPage() {
  const [activeGroup, setActiveGroup] = useState('compras');
  const [query, setQuery] = useState('');
  const normalizedQuery = query.trim().toLocaleLowerCase('es');

  const visibleGroups = useMemo(() => {
    if (!normalizedQuery) {
      return FAQ_GROUPS.filter((group) => group.id === activeGroup);
    }

    return FAQ_GROUPS.map((group) => ({
      ...group,
      items: group.items.filter((item) =>
        `${item.question} ${item.answer}`
          .toLocaleLowerCase('es')
          .includes(normalizedQuery),
      ),
    })).filter((group) => group.items.length > 0);
  }, [activeGroup, normalizedQuery]);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_GROUPS.flatMap((group) => group.items).map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {'@type': 'Answer', text: item.answer},
    })),
  };

  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(faqSchema)}}
      />

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.eyebrow}>Centro de ayuda Roof Roof</span>
          <h1>Respuestas claras antes y después de comprar</h1>
          <p>
            Encuentra información sobre productos, medidas, pagos, envíos y
            devoluciones sin perderte entre términos complicados.
          </p>

          <label className={`${styles.search} rr-ui-field-shell`}>
            <span className="sr-only">Buscar en preguntas frecuentes</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-4-4" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Busca por ejemplo: envío, medidas o devolución"
            />
            {query ? (
              <button type="button" onClick={() => setQuery('')}>
                Limpiar
              </button>
            ) : null}
          </label>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.quickGrid}>
          {QUICK_LINKS.map((item) => (
            <Link
              className={`${styles.quickCard} rr-ui-card rr-ui-card--interactive`}
              key={item.to}
              to={item.to}
            >
              <span className={`${styles.quickIcon} rr-ui-icon`}>
                <FaqIcon name={item.icon} />
              </span>
              <span>
                <strong>{item.title}</strong>
                <small>{item.copy}</small>
              </span>
              <span className={styles.arrow} aria-hidden="true">
                →
              </span>
            </Link>
          ))}
        </div>

        <div className={styles.faqLayout}>
          <aside
            className={`${styles.categories} rr-ui-card`}
            aria-label="Categorías de ayuda"
          >
            <p>Explora por tema</p>
            <div className={styles.categoryList}>
              {FAQ_GROUPS.map((group) => (
                <button
                  className={`rr-ui-choice${
                    group.id === activeGroup && !normalizedQuery
                      ? ` ${styles.categoryActive} is-selected`
                      : ''
                  }`}
                  key={group.id}
                  type="button"
                  onClick={() => {
                    setQuery('');
                    setActiveGroup(group.id);
                  }}
                >
                  <span>
                    <FaqIcon name={group.icon} />
                  </span>
                  {group.label}
                  <small>{group.items.length}</small>
                </button>
              ))}
            </div>
          </aside>

          <div className={styles.questions}>
            <div className={styles.heading}>
              <span className={styles.eyebrowDark}>
                {normalizedQuery
                  ? 'Resultados de búsqueda'
                  : 'Preguntas frecuentes'}
              </span>
              <h2>
                {normalizedQuery
                  ? `Resultados para “${query.trim()}”`
                  : FAQ_GROUPS.find((group) => group.id === activeGroup)?.label}
              </h2>
              <p>
                {normalizedQuery
                  ? `${visibleGroups.reduce((total, group) => total + group.items.length, 0)} respuestas encontradas.`
                  : 'Abre una pregunta para consultar la respuesta completa.'}
              </p>
            </div>

            {visibleGroups.length ? (
              visibleGroups.map((group) => (
                <div className={styles.group} key={group.id}>
                  {normalizedQuery ? <h3>{group.label}</h3> : null}
                  <div className={styles.accordion}>
                    {group.items.map((item) => (
                      <details className="rr-ui-subcard" key={item.question}>
                        <summary>
                          <span>{item.question}</span>
                          <span className={styles.plus} aria-hidden="true">
                            +
                          </span>
                        </summary>
                        <div className={styles.answer}>
                          <p>{item.answer}</p>
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className={`${styles.empty} rr-ui-card`}>
                <span>
                  <FaqIcon name="sparkle" />
                </span>
                <h3>No encontramos una respuesta con esas palabras</h3>
                <p>Prueba con un término más corto o explora una categoría.</p>
                <button
                  className="rr-button rr-button--outline"
                  type="button"
                  onClick={() => setQuery('')}
                >
                  Ver todas las preguntas
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className={`${styles.closing} rr-ui-card`}>
        <div>
          <span className={styles.eyebrow}>Compra con más claridad</span>
          <h2>¿Todavía no sabes qué producto elegir?</h2>
          <p>
            Nuestro selector te ayuda a reducir opciones según el tamaño de tu
            mascota, el espacio disponible y la necesidad principal.
          </p>
        </div>
        <Link
          className="rr-button rr-button--brand"
          to="/pages/selector-de-productos"
        >
          Usar selector de productos
        </Link>
      </section>
    </main>
  );
}
