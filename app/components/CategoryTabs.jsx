import {Link} from 'react-router';
import {Image} from '@shopify/hydrogen';
import {useState, useRef, useEffect} from 'react';

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
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    const updateSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    updateSize();

    window.addEventListener('resize', updateSize);

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const visible = collections.filter(
    (c) => (CATEGORY_MAP[c.handle]?.tab ?? 'perro') === activeTab,
  );

  return (
    <section
      style={{
    
        padding: '2rem 0 2.5rem',

      }}
    >
      {/* Tabs */}
      <div
        style={{
          maxWidth: '680px',
          width: 'calc(100% - 2rem)',
          margin: '0 auto 2rem',
        
          borderRadius: '999px',
          padding: '5px',
          border: '1px solid #E8E4DC',
          display: 'flex',
        }}
      >
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setActiveTab(tab.key);
              setActiveItem(null);
            }}
            style={{
              flex: 1,
              padding: isMobile ? '.65rem' : '.75rem 1rem',
              borderRadius: '999px',
              border: 'none',
              background: activeTab === tab.key ? '#2C1810' : 'transparent',
              color: activeTab === tab.key ? '#fff' : '#8fa3c4',
              fontSize: isMobile ? '.8125rem' : '.9375rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all .2s',
             
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

    {/* Categorías */}
<div
  style={{
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 1rem',
  }}
>
  <div
    ref={scrollRef}
    style={{
      display: 'flex',
      gap: isMobile ? '.75rem' : '1rem',
      overflowX: isMobile ? 'auto' : 'visible',
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
      WebkitOverflowScrolling: 'touch',
      paddingBottom: '.5rem',

      justifyContent: isMobile ? 'flex-start' : 'center',
      alignItems: 'flex-start',
      flexWrap: isMobile ? 'nowrap' : 'wrap',
    }}
  >
    {visible.map((col) => {
      const meta = CATEGORY_MAP[col.handle];
      const label = meta?.label ?? col.title;
      const isActive = activeItem === col.handle;
      const imgData = col.image ?? null;

      return (
        <Link
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
            width: isMobile ? '110px' : '160px',
          }}
        >
          {/* Imagen */}
          <div
            style={{
              width: isMobile ? '110px' : '160px',
              height: isMobile ? '110px' : '160px',
              borderRadius: '.875rem',
              overflow: 'hidden',
              background: '#f5f7fa',
              border: isActive
                ? '3px solid #2C1810'
                : '2px solid #E8E4DC',
              transition: 'all .15s',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.borderColor = '#F5A623';
              }
              e.currentTarget.style.transform = 'translateY(-3px)';
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.borderColor = '#E8E4DC';
              }
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {imgData ? (
              <Image
                data={imgData}
                sizes={isMobile ? '110px' : '160px'}
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
              fontSize: isMobile ? '.75rem' : '.8125rem',
              fontWeight: isActive ? 700 : 500,
              color: '#2C1810',
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
        width: isMobile ? '55px' : '70px',
        alignSelf: 'center',
      }}
    >
      <Link
        to="/collections/roof-roof"
        style={{
          width: isMobile ? '42px' : '48px',
          height: isMobile ? '42px' : '48px',
          borderRadius: '50%',
          border: '2px solid #2C1810',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textDecoration: 'none',
          background: 'transparent',
          transition: 'all .15s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#2C1810';
          e.currentTarget.querySelector('svg').style.stroke = '#F5A623';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.querySelector('svg').style.stroke = '#2C1810';
        }}
      >
        <svg
          width={isMobile ? '18' : '20'}
          height={isMobile ? '18' : '20'}
          viewBox="0 0 24 24"
          fill="none"
          stroke="#2C1810"
          strokeWidth="2.5"
          style={{transition: 'stroke .15s'}}
        >
          <path d="M5 12h14" />
          <path d="M12 5l7 7-7 7" />
        </svg>
      </Link>

      <span
        style={{
          fontSize: '.75rem',
          fontWeight: 600,
          color: '#2C1810',
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