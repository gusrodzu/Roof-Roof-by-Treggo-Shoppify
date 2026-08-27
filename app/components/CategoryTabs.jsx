import {Link} from 'react-router';
import {Image} from '@shopify/hydrogen';
import {useState, useRef} from 'react';
import {Tabs, IconButton} from '~/components/design-system';

const CATEGORY_MAP = {
  'roof-roof-casas': {label: 'Casas', tab: 'perro'},
  'roof-roof-camas': {label: 'Camas', tab: 'perro'},
  'roof-roof-jaulas': {label: 'Jaulas y corrales', tab: 'perro'},
  'roof-roof-dispensadores': {label: 'Dispensadores', tab: 'perro'},
};

const TABS = [
  {key: 'perro', label: 'Productos para perro'},
  {key: 'gato', label: 'Productos para gato'},
];

export function CategoryTabs({collections = []}) {
  const [activeTab, setActiveTab] = useState('perro');
  const [activeItem, setActiveItem] = useState(null);
  const scrollRef = useRef(null);

  const visible = collections.filter(
    (c) => (CATEGORY_MAP[c.handle]?.tab ?? 'perro') === activeTab,
  );

  return (
    <section
      className="rr-category-tabs"
      style={{
        padding: '2rem 0 2.5rem',
      }}
    >
      {/* Tabs */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          margin: '0 auto 2rem',
        }}
      >
        <Tabs
          tabs={TABS.map((t) => ({key: t.key, label: t.label}))}
          active={activeTab}
          onChange={(key) => {
            setActiveTab(key);
            setActiveItem(null);
          }}
        />
      </div>

      {/* Categorías */}
      <div
        className="rr-category-tabs__inner"
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 1rem',
        }}
      >
        <div
          className="rr-category-tabs__scroller"
          ref={scrollRef}
          style={{
            display: 'flex',
            gap: '1rem',
            overflowX: 'visible',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
            paddingBottom: '.5rem',

            justifyContent: 'center',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
          }}
        >
          {visible.map((col) => {
            const meta = CATEGORY_MAP[col.handle];
            const label = meta?.label ?? col.title;
            const isActive = activeItem === col.handle;
            const imgData = col.image ?? null;

            return (
              <Link
                className={`rr-category-tile${isActive ? ' is-active' : ''}`}
                key={col.handle}
                to={`/collections/${col.handle}`}
                onClick={() => setActiveItem(col.handle)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '.625rem',
                  textDecoration: 'none',
                  flexShrink: 0,
                  width: '160px',
                }}
              >
                {/* Imagen */}
                <div
                  className="rr-category-tile__media"
                  style={{
                    width: '160px',
                    height: '160px',
                    borderRadius: '.875rem',
                    overflow: 'hidden',
                    background: 'var(--surface-cool)',
                    border: isActive
                      ? '3px solid var(--ink)'
                      : '2px solid var(--border)',
                    transition: 'all .15s',
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = 'var(--brand-cta)';
                    }
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = 'var(--border)';
                    }
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {imgData ? (
                    <Image
                      data={imgData}
                      sizes="(max-width: 767px) 110px, 160px"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                  ) : (
                    <img
                      src="https://placehold.co/160x160/E8E4DC/2C1810?text=Roof+Roof"
                      alt={label}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                  )}
                </div>

                {/* Texto */}
                <span
                  style={{
                    fontSize: '.8125rem',
                    fontWeight: isActive ? 700 : 500,
                    color: 'var(--ink)',
                    textAlign: 'center',
                    lineHeight: 1.3,
                  }}
                >
                  {label}
                </span>
              </Link>
            );
          })}

          {/* Ver todo */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '.625rem',
              flexShrink: 0,
              width: '70px',
              alignSelf: 'center',
            }}
          >
            <Link to="/collections/roof-roof" style={{textDecoration: 'none'}}>
              <IconButton
                variant="outline"
                size="md"
                aria-label="Ver todo"
                style={{border: '2px solid var(--ink)', pointerEvents: 'none'}}
                icon={
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--ink)"
                    strokeWidth="2.5"
                  >
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                  </svg>
                }
              />
            </Link>

            <span
              style={{
                fontSize: '.75rem',
                fontWeight: 600,
                color: 'var(--ink)',
                textAlign: 'center',
              }}
            >
              Ver todo
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
