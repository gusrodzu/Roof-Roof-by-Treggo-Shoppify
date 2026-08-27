import {useMemo, useState} from 'react';
import {Link} from 'react-router';
import {ExperienceIcon} from '~/components/ExperienceIcon';

export const meta = () => [
  {title: 'Selector de productos | Roof Roof'},
  {
    name: 'description',
    content:
      'Encuentra casas, camas, jaulas, corrales y dispensadores según el tamaño de tu mascota, el espacio disponible y tu necesidad principal.',
  },
];

const QUESTIONS = [
  {
    key: 'size',
    title: '¿Cuál es el tamaño aproximado de tu mascota?',
    copy: 'No necesitas saber una talla exacta todavía.',
    options: [
      {value: 'small', label: 'Pequeña', detail: 'Hasta 10 kg', icon: 'paw'},
      {value: 'medium', label: 'Mediana', detail: 'De 10 a 25 kg', icon: 'paw'},
      {value: 'large', label: 'Grande', detail: 'Más de 25 kg', icon: 'paw'},
      {
        value: 'multi',
        label: 'Varias mascotas',
        detail: 'Solución compartida',
        icon: 'heart',
      },
    ],
  },
  {
    key: 'space',
    title: '¿Dónde usarás principalmente el producto?',
    copy: 'El entorno cambia el tipo de material y espacio que conviene priorizar.',
    options: [
      {
        value: 'indoor',
        label: 'Dentro de casa',
        detail: 'Recámara, sala o estancia',
        icon: 'home',
      },
      {
        value: 'outdoor',
        label: 'Exterior',
        detail: 'Patio, terraza o jardín',
        icon: 'home',
      },
      {
        value: 'flexible',
        label: 'En ambos',
        detail: 'Quiero moverlo',
        icon: 'compare',
      },
      {
        value: 'business',
        label: 'Negocio o proyecto',
        detail: 'Varias piezas o asesoría',
        icon: 'building',
      },
    ],
  },
  {
    key: 'need',
    title: '¿Qué quieres resolver primero?',
    copy: 'Elegiremos la categoría principal y qué revisar antes de comprar.',
    options: [
      {
        value: 'rest',
        label: 'Mejor descanso',
        detail: 'Comodidad y soporte diario',
        icon: 'moon',
      },
      {
        value: 'shelter',
        label: 'Refugio y sombra',
        detail: 'Protección exterior',
        icon: 'shield',
      },
      {
        value: 'safety',
        label: 'Delimitar un espacio',
        detail: 'Control y adaptación',
        icon: 'lock',
      },
      {
        value: 'feeding',
        label: 'Organizar alimentación',
        detail: 'Agua o alimento',
        icon: 'bowl',
      },
    ],
  },
];

const RESULTS = {
  rest: {
    title: 'Una cama Roof Roof es el mejor punto de partida',
    copy: 'Busca una superficie suficientemente amplia para acostarse de lado, girar y cambiar de posición.',
    to: '/collections/roof-roof-camas',
    cta: 'Explorar camas',
    icon: 'moon',
    checks: [
      'Largo corporal más margen',
      'Superficie fácil de limpiar',
      'Altura adecuada para subir y bajar',
    ],
  },
  shelter: {
    title: 'Empieza por una casa con ventilación y espacio real',
    copy: 'Debe permitir entrar, girar y descansar sin sentirse apretada.',
    to: '/collections/roof-roof-casas',
    cta: 'Explorar casas',
    icon: 'home',
    checks: [
      'Entrada cómoda',
      'Ventilación suficiente',
      'Ubicación protegida del sol directo',
    ],
  },
  safety: {
    title: 'Una jaula o corral puede crear una zona segura',
    copy: 'Elige una solución que permita ponerse de pie, girar y descansar.',
    to: '/collections/roof-roof-jaulas',
    cta: 'Explorar jaulas y corrales',
    icon: 'lock',
    checks: [
      'Altura al estar de pie',
      'Ancho para girar',
      'Acceso y cierre fáciles de revisar',
    ],
  },
  feeding: {
    title: 'Un dispensador puede simplificar la rutina diaria',
    copy: 'Considera capacidad, estabilidad y facilidad de limpieza.',
    to: '/collections/roof-roof-dispensadores',
    cta: 'Explorar dispensadores',
    icon: 'bowl',
    checks: [
      'Capacidad para tu rutina',
      'Base estable',
      'Piezas accesibles para limpieza',
    ],
  },
};

export default function ProductSelectorPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const isResult = step >= QUESTIONS.length;
  const question = QUESTIONS[step];
  const selected = question ? answers[question.key] : null;
  const result = useMemo(() => {
    const base = RESULTS[answers.need] ?? RESULTS.rest;
    return answers.space === 'business'
      ? {
          ...base,
          title: 'Planea cada espacio antes de elegir',
          copy: 'Para equipar varias áreas, compara medidas, circulación, limpieza y frecuencia de uso antes de seleccionar productos.',
          to: '/pages/guia-de-tallas',
          cta: 'Revisar guía de medidas',
          icon: 'ruler',
          checks: [
            'Cantidad y tamaño de espacios',
            'Circulación disponible',
            'Uso, limpieza y mantenimiento',
          ],
        }
      : base;
  }, [answers]);

  const choose = (value) =>
    setAnswers((current) => ({...current, [question.key]: value}));
  const next = () =>
    selected && setStep((current) => Math.min(current + 1, QUESTIONS.length));
  const back = () => setStep((current) => Math.max(current - 1, 0));
  const restart = () => {
    setAnswers({});
    setStep(0);
  };
  const progress = isResult ? 100 : ((step + 1) / QUESTIONS.length) * 100;

  return (
    <div className="rr-brand-page">
      <section className="rr-brand-hero">
        <div className="rr-brand-hero__grid">
          <div className="rr-brand-hero__copy">
            <span className="rr-kicker">Compra guiada</span>
            <h1>Encuentra una mejor opción en tres pasos</h1>
            <p>
              Este selector te orienta hacia la categoría correcta. Confirma
              siempre las dimensiones específicas publicadas en cada producto.
            </p>
            <div className="rr-brand-hero__actions">
              <a className="rr-button rr-button--brand" href="#selector">
                Comenzar
              </a>
              <Link
                className="rr-button rr-button--outline"
                to="/pages/guia-de-tallas"
              >
                Ver guía de medidas
              </Link>
            </div>
          </div>
          <div className="rr-brand-hero__panel">
            <span className="rr-brand-hero__panel-icon">
              <ExperienceIcon name="sparkles" size={38} />
            </span>
            <strong>
              Menos dudas.
              <br />
              Mejores decisiones.
            </strong>
            <span>
              Tamaño, espacio y objetivo se combinan para darte una ruta clara.
            </span>
          </div>
        </div>
      </section>

      <section
        className="rr-brand-section rr-brand-section--white"
        id="selector"
      >
        <div className="rr-brand-page__inner rr-selector-shell">
          <aside className="rr-selector-progress">
            <span className="rr-kicker">Tu recomendación</span>
            <h2>{isResult ? 'Resultado listo' : 'Tu avance'}</h2>
            <p>Selecciona la opción más cercana a tu situación.</p>
            <div className="rr-selector-progress__bar">
              <span style={{width: `${progress}%`}} />
            </div>
          </aside>
          {!isResult ? (
            <div className="rr-selector-card">
              <span className="rr-kicker">Elige una opción</span>
              <h2>{question.title}</h2>
              <p>{question.copy}</p>
              <div className="rr-selector-options">
                {question.options.map((option) => (
                  <button
                    type="button"
                    className={`rr-selector-option${selected === option.value ? ' is-selected' : ''}`}
                    key={option.value}
                    onClick={() => choose(option.value)}
                    aria-pressed={selected === option.value}
                  >
                    <span className="rr-selector-option__icon">
                      <ExperienceIcon name={option.icon} />
                    </span>
                    <span>
                      <strong>{option.label}</strong>
                      <span>{option.detail}</span>
                    </span>
                  </button>
                ))}
              </div>
              <div className="rr-selector-actions">
                <button
                  type="button"
                  className="rr-button rr-button--outline"
                  onClick={back}
                  disabled={step === 0}
                >
                  Anterior
                </button>
                <button
                  type="button"
                  className="rr-button rr-button--dark"
                  onClick={next}
                  disabled={!selected}
                >
                  {step === QUESTIONS.length - 1
                    ? 'Ver recomendación'
                    : 'Continuar'}
                </button>
              </div>
            </div>
          ) : (
            <div className="rr-selector-card">
              <div className="rr-selector-result__hero">
                <span className="rr-brand-icon">
                  <ExperienceIcon name={result.icon} size={32} />
                </span>
                <div className="rr-selector-result__title-row">
                  <h2>{result.title}</h2>
                  {result.comingSoon ? (
                    <span className="rr-coming-soon-badge">Próximamente</span>
                  ) : null}
                </div>
                <p>{result.copy}</p>
                <div className="rr-selector-result__meta">
                  <span>{labelFor('size', answers.size)}</span>
                  <span>{labelFor('space', answers.space)}</span>
                  <span>{labelFor('need', answers.need)}</span>
                </div>
              </div>
              <div className="rr-brand-card" style={{marginTop: '1rem'}}>
                <h3>Antes de elegir, revisa</h3>
                <ul className="rr-brand-list">
                  {result.checks.map((check) => (
                    <li key={check}>{check}</li>
                  ))}
                </ul>
              </div>
              <div className="rr-selector-actions">
                <button
                  type="button"
                  className="rr-button rr-button--outline"
                  onClick={restart}
                >
                  Reiniciar selector
                </button>
                <Link className="rr-button rr-button--brand" to={result.to}>
                  {result.cta}
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function labelFor(key, value) {
  const question = QUESTIONS.find((item) => item.key === key);
  return (
    question?.options.find((option) => option.value === value)?.label ?? ''
  );
}
