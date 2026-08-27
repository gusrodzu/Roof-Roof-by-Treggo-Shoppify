import {useState} from 'react';
import {Link} from 'react-router';

/**
 * Tabs — pestañas con contador opcional, estilo pill contenedora
 *
 * tabs: [{key, label, count}]
 */
export function Tabs({tabs, active, onChange}) {
  return (
    <div
      className="rr-tabs"
      style={{
        display: 'inline-flex',
        gap: '0.25rem',
        background: 'var(--surface-cream)',
        border: '1px solid var(--border-gold)',
        borderRadius: '999px',
        padding: '0.25rem',
      }}
    >
      {tabs.map((tab) => {
        const isActive = active === tab.key;
        return (
          <TabButton
            key={tab.key}
            tab={tab}
            isActive={isActive}
            onChange={onChange}
          />
        );
      })}
    </div>
  );
}

function TabButton({tab, isActive, onChange}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type="button"
      className={`rr-tab-button${isActive ? ' is-active' : ''}`}
      onClick={() => onChange(tab.key)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.625rem 1.25rem',
        borderRadius: '999px',
        border: 'none',
        background: isActive ? '#fff' : 'transparent',
        boxShadow: isActive ? '0 1px 4px rgba(44,24,16,0.1)' : 'none',
        color: isActive
          ? 'var(--ink)'
          : hovered
            ? 'var(--ink)'
            : 'var(--ink-soft)',
        fontSize: '0.9375rem',
        fontWeight: isActive ? 700 : 600,
        cursor: 'pointer',
        fontFamily: 'inherit',
        transition: 'all 0.15s',
      }}
    >
      {tab.label}
      {tab.count != null && (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '24px',
            height: '20px',
            padding: '0 6px',
            borderRadius: '999px',
            background: isActive ? 'var(--brand-cta)' : 'var(--border)',
            color: 'var(--ink)',
            fontSize: '0.75rem',
            fontWeight: 800,
          }}
        >
          {tab.count}
        </span>
      )}
    </button>
  );
}

/**
 * Breadcrumb — trail de navegación
 * items: [{label, to}] — el último item se renderiza en negrita sin link
 */
export function Breadcrumb({items}) {
  return (
    <nav
      className="rr-breadcrumb"
      aria-label="Breadcrumb"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        flexWrap: 'wrap',
      }}
    >
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span
            key={item.label}
            style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}
          >
            {isLast ? (
              <span
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  color: 'var(--ink)',
                }}
              >
                {item.label}
              </span>
            ) : (
              <Link
                to={item.to}
                prefetch="intent"
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--brand-cta-hover)',
                  textDecoration: 'none',
                  fontWeight: 500,
                }}
              >
                {item.label}
              </Link>
            )}
            {!isLast && (
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--ink-muted)"
                strokeWidth="2.5"
                aria-hidden="true"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            )}
          </span>
        );
      })}
    </nav>
  );
}
