import {Link} from 'react-router';
import {ExperienceIcon} from '~/components/ExperienceIcon';

export const meta = () => [
  {title: 'Guía de medidas y tallas | Roof Roof'},
  {
    name: 'description',
    content:
      'Aprende a medir a tu mascota y tu espacio antes de elegir casas, camas, jaulas, corrales o dispensadores Roof Roof.',
  },
];

const ROWS = [
  [
    'Camas',
    'Mide desde la nariz hasta la base de la cola mientras está acostada y agrega margen.',
    'Confirma que no bloquee puertas o pasillos.',
    'Superficie útil, altura de acceso y limpieza.',
  ],
  [
    'Casas',
    'Mide largo corporal, altura de pie y ancho al girar.',
    'Revisa base, sombra, ventilación y separación de muros.',
    'Entrada, espacio interior y ubicación protegida.',
  ],
  [
    'Jaulas y corrales',
    'Mide altura de pie, largo acostada y ancho para dar la vuelta.',
    'Considera apertura de puertas y área libre alrededor.',
    'Movimiento cómodo, cierre y estabilidad.',
  ],
  [
    'Dispensadores',
    'Observa altura de consumo, cantidad diaria y número de mascotas.',
    'Deja espacio para rellenar, desmontar y limpiar.',
    'Capacidad, estabilidad y mantenimiento.',
  ],
];

export default function SizeGuidePage() {
  return (
    <div className="rr-brand-page">
      <section className="rr-brand-hero">
        <div className="rr-brand-hero__grid">
          <div className="rr-brand-hero__copy">
            <span className="rr-kicker">Compra con certeza</span>
            <h1>Medir primero evita devoluciones después</h1>
            <p>
              Una buena elección depende de dos medidas: la de tu mascota y la
              del lugar donde se utilizará el producto.
            </p>
            <div className="rr-brand-hero__actions">
              <a className="rr-button rr-button--brand" href="#como-medir">
                Aprender a medir
              </a>
              <Link
                className="rr-button rr-button--outline"
                to="/pages/selector-de-productos"
              >
                Usar selector
              </Link>
            </div>
          </div>
          <div className="rr-brand-hero__panel">
            <span className="rr-brand-hero__panel-icon">
              <ExperienceIcon name="ruler" size={40} />
            </span>
            <strong>La talla correcta empieza con una cinta métrica.</strong>
            <span>
              Usa centímetros y anota cada medida antes de revisar las fichas.
            </span>
          </div>
        </div>
      </section>
      <section
        className="rr-brand-section rr-brand-section--white"
        id="como-medir"
      >
        <div className="rr-brand-page__inner">
          <div className="rr-brand-section__heading">
            <span className="rr-kicker">Método simple</span>
            <h2>Tres pasos antes de agregar al carrito</h2>
          </div>
          <div className="rr-brand-steps">
            <article className="rr-brand-step">
              <h3>Mide a tu mascota</h3>
              <p>
                Registra largo, alto y ancho según el producto. No uses
                únicamente el peso.
              </p>
            </article>
            <article className="rr-brand-step">
              <h3>Mide el espacio</h3>
              <p>
                Comprueba el área real, accesos y espacio para limpiar o mover.
              </p>
            </article>
            <article className="rr-brand-step">
              <h3>Compara la ficha</h3>
              <p>
                Contrasta tus medidas con las dimensiones externas e internas
                publicadas.
              </p>
            </article>
          </div>
        </div>
      </section>
      <section className="rr-brand-section rr-brand-section--cream">
        <div className="rr-brand-page__inner">
          <div className="rr-brand-section__heading">
            <span className="rr-kicker">Qué revisar por categoría</span>
            <h2>No todos los productos se miden igual</h2>
          </div>
          <div className="rr-measure-table-wrap">
            <table className="rr-measure-table">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Mascota</th>
                  <th>Espacio</th>
                  <th>Prioridad</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell, index) => (
                      <td key={cell}>
                        {index === 0 ? <strong>{cell}</strong> : cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="rr-brand-note">
            <ExperienceIcon name="shield" />
            <div>
              <strong>Importante:</strong> esta guía es orientativa. La ficha
              específica de cada producto siempre tiene prioridad.
            </div>
          </div>
        </div>
      </section>
      <section className="rr-brand-section rr-brand-section--white">
        <div className="rr-brand-page__inner">
          <div className="rr-brand-cta">
            <div>
              <h2>¿Ya tienes tus medidas?</h2>
              <p>Usa el selector o explora el catálogo completo.</p>
            </div>
            <div className="rr-brand-cta__actions">
              <Link
                className="rr-button rr-button--light"
                to="/pages/selector-de-productos"
              >
                Abrir selector
              </Link>
              <Link
                className="rr-button rr-button--dark"
                to="/collections/roof-roof"
              >
                Ver catálogo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
