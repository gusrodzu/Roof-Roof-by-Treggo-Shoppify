import {useLoaderData, Link, useNavigate} from 'react-router';
import {CartForm, Image, Money} from '@shopify/hydrogen';
import {useState, useMemo, useEffect} from 'react';
import {useAside} from '~/components/Aside';
import {useCartAnimation} from '~/components/CartAnimation';

// -----------------------------------------------------------------------
// MAPA DE CATEGORÍAS
// -----------------------------------------------------------------------
const CATEGORY_MAP = {
  'roof-roof':               {title: 'Todos los productos', query: "vendor:'ROOF ROOF'"},
  'roof-roof-camas':         {title: 'Camas',               query: "vendor:'ROOF ROOF' AND product_type:'Camas'"},
  'roof-roof-casas':         {title: 'Casas',               query: "vendor:'ROOF ROOF' AND product_type:'Casas'"},
  'roof-roof-jaulas':        {title: 'Jaulas y corrales',   query: "vendor:'ROOF ROOF' AND product_type:'Jaulas y Corrales'"},
  'roof-roof-dispensadores': {title: 'Dispensadores',       query: "vendor:'ROOF ROOF' AND product_type:'Dispensadores'"},
};

const COLLECTION_FILTERS = {
  'roof-roof': {
    sections: [
      {
        title: 'Disponibilidad', key: 'availability', type: 'availability',
        options: [{key: 'in_stock', label: 'En stock'}, {key: 'out_stock', label: 'Agotado'}],
      },
      {
        title: 'Destacados', key: 'featured', type: 'tag',
        options: [{key: '+VENDIDO', label: 'Más vendidos'}, {key: 'TOP10', label: 'Top 10'}],
      },
      {
        title: 'Para tu mascota', key: 'pet', type: 'tag',
        options: [{key: 'perro', label: 'Perro'}, {key: 'gato', label: 'Gato'}],
      },
    ],
  },
  'roof-roof-casas': {
    sections: [
      {
        title: 'Disponibilidad', key: 'availability', type: 'availability',
        options: [{key: 'in_stock', label: 'En stock'}, {key: 'out_stock', label: 'Agotado'}],
      },
      {
        title: 'Material', key: 'material', type: 'tag',
        options: [{key: 'refugio de madera', label: 'Madera'}, {key: 'plástico', label: 'Plástico'}],
      },
      {
        title: 'Características', key: 'features', type: 'tag',
        options: [
          {key: 'elevado', label: 'Piso elevado'},
          {key: 'refugio elevado', label: 'Refugio elevado'},
          {key: 'exterior', label: 'Uso exterior'},
          {key: 'refugio térmico', label: 'Térmico'},
          {key: 'techo inclinado', label: 'Techo inclinado'},
        ],
      },
      {
        title: 'Para tu mascota', key: 'pet', type: 'tag',
        options: [{key: 'perros', label: 'Perro'}, {key: 'Casa para Gato', label: 'Gato'}],
      },
    ],
  },
  'roof-roof-camas': {
    sections: [
      {
        title: 'Disponibilidad', key: 'availability', type: 'availability',
        options: [{key: 'in_stock', label: 'En stock'}, {key: 'out_stock', label: 'Agotado'}],
      },
      {
        title: 'Tipo', key: 'type', type: 'tag',
        options: [{key: 'cama elevada', label: 'Cama elevada'}, {key: 'protección solar', label: 'Con toldo solar'}],
      },
    ],
  },
  'roof-roof-jaulas': {
    sections: [
      {
        title: 'Disponibilidad', key: 'availability', type: 'availability',
        options: [{key: 'in_stock', label: 'En stock'}, {key: 'out_stock', label: 'Agotado'}],
      },
      {
        title: 'Características', key: 'features', type: 'tag',
        options: [{key: 'ajustable', label: 'Ajustable'}, {key: 'expandible', label: 'Expandible'}],
      },
    ],
  },
  'roof-roof-dispensadores': {
    sections: [
      {
        title: 'Disponibilidad', key: 'availability', type: 'availability',
        options: [{key: 'in_stock', label: 'En stock'}, {key: 'out_stock', label: 'Agotado'}],
      },
    ],
  },
};

export const meta = ({params}) => {
  const cat = CATEGORY_MAP[params.handle];
  return [{title: `${cat?.title ?? 'Colección'} — Roof Roof`}];
};

const PAGE_SIZE = 12;

export async function loader({context, params, request}) {
  const cat = CATEGORY_MAP[params.handle];
  if (!cat) throw new Response('Colección no encontrada', {status: 404});

  const url    = new URL(request.url);
  const cursor = url.searchParams.get('cursor') ?? undefined;
  const dir    = url.searchParams.get('dir') ?? 'next'; // 'next' | 'prev'

  const variables = dir === 'prev'
    ? {query: cat.query, last: PAGE_SIZE, before: cursor}
    : {query: cat.query, first: PAGE_SIZE, after: cursor};

  const {products} = await context.storefront.query(PRODUCTS_QUERY, {variables});

  return {
    handle: params.handle,
    title: cat.title,
    products: products.nodes,
    pageInfo: products.pageInfo,
  };
}

// -----------------------------------------------------------------------
// SIDEBAR CONTENT
// -----------------------------------------------------------------------
function SidebarContent({filterConfig, activeFilters, openSections, setOpenSections, toggleFilter, clearAll, hasActiveFilters}) {
  const isActive = (sectionKey, optionKey) =>
    (activeFilters[sectionKey] ?? new Set()).has(optionKey);

  return (
    <div style={{background: '#fff', border: '1px solid #e8e4dc', borderRadius: '0.75rem', overflow: 'hidden'}}>
      {/* Header sidebar */}
      <div style={{padding: '0.875rem 1rem', background: '#ffffff', borderBottom: '1px solid #e8e4dc', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2C1810" strokeWidth="2.5" aria-hidden="true">
            <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
          </svg>
          <span style={{fontSize: '0.875rem', fontWeight: 700, color: '#2C1810'}}>Filtros</span>
        </div>
        {hasActiveFilters && (
          <button onClick={clearAll} style={{fontSize: '0.75rem', color: '#F5A623', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', padding: 0}}>
            Limpiar
          </button>
        )}
      </div>

      {filterConfig.sections.length === 0 ? (
        <div style={{padding: '1rem', fontSize: '0.8125rem', color: '#7a6a62', textAlign: 'center'}}>Sin filtros disponibles</div>
      ) : (
        filterConfig.sections.map((section, idx) => {
          const isOpen = openSections[section.key] ?? true;
          return (
            <div key={section.key} style={{borderTop: idx > 0 ? '1px solid #e8e4dc' : 'none'}}>
              <button
                onClick={() => setOpenSections((p) => ({...p, [section.key]: !isOpen}))}
                style={{width: '100%', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 700, color: '#2C1810', fontFamily: 'inherit'}}
              >
                {section.title}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0}} aria-hidden="true">
                  <polyline points="18 15 12 9 6 15"/>
                </svg>
              </button>
              {isOpen && (
                <div style={{padding: '0.25rem 1rem 0.875rem'}}>
                  {section.options.map((opt) => {
                    const active = isActive(section.key, opt.key);
                    return (
                      <label key={opt.key} style={{display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.3rem 0', cursor: 'pointer'}}>
                        <input
                          type="checkbox"
                          checked={active}
                          onChange={() => toggleFilter(section.key, opt.key)}
                          style={{accentColor: '#F5A623', width: '14px', height: '14px', flexShrink: 0}}
                        />
                        <span style={{fontSize: '0.8125rem', color: active ? '#2C1810' : '#7a6a62', fontWeight: active ? 600 : 400}}>
                          {opt.label}
                        </span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}

// -----------------------------------------------------------------------
// DRAWER MOBILE
// -----------------------------------------------------------------------
function FilterDrawer({open, onClose, children}) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 100,
          background: 'rgba(44,24,16,0.4)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.25s ease',
        }}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        style={{
          position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 101,
          width: '85vw', maxWidth: '320px',
          background: '#f5f7fa',
          transform: open ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease',
          overflowY: 'auto',
          display: 'flex', flexDirection: 'column',
        }}
      >
        {/* Header del drawer */}
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: '#fff', borderBottom: '1px solid #e8e4dc', position: 'sticky', top: 0, zIndex: 1}}>
          <span style={{fontSize: '1rem', fontWeight: 700, color: '#2C1810'}}>Filtros</span>
          <button
            onClick={onClose}
            aria-label="Cerrar filtros"
            style={{background: 'rgba(44,24,16,0.07)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#2C1810'}}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Contenido */}
        <div style={{padding: '1rem', flex: 1}}>
          {children}
        </div>

        {/* Footer */}
        <div style={{padding: '1rem', background: '#fff', borderTop: '1px solid #e8e4dc', position: 'sticky', bottom: 0}}>
          <button
            onClick={onClose}
            style={{width: '100%', background: '#2C1810', color: '#F5A623', border: 'none', borderRadius: '0.625rem', padding: '0.875rem', fontSize: '0.9375rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit'}}
          >
            Ver resultados
          </button>
        </div>
      </div>
    </>
  );
}

// -----------------------------------------------------------------------
// RUTA PRINCIPAL
// -----------------------------------------------------------------------
export default function CollectionRoute() {
  const {handle, title, products, pageInfo} = useLoaderData();
  const [viewMode, setViewMode]   = useState('grid');
  const [sortKey, setSortKey]     = useState('default');
  const [activeFilters, setActiveFilters] = useState({});
  const [openSections, setOpenSections]   = useState(
    () => Object.fromEntries((COLLECTION_FILTERS[handle]?.sections ?? []).map((s) => [s.key, true]))
  );
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isMobile, setIsMobile]     = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const filterConfig = COLLECTION_FILTERS[handle] ?? {sections: []};

  const toggleFilter = (sectionKey, optionKey) => {
    setActiveFilters((prev) => {
      const current = new Set(prev[sectionKey] ?? []);
      if (current.has(optionKey)) current.delete(optionKey);
      else current.add(optionKey);
      return {...prev, [sectionKey]: current};
    });
  };

  const clearAll = () => setActiveFilters({});
  const hasActiveFilters = Object.values(activeFilters).some((s) => s.size > 0);
  const activeFilterCount = Object.values(activeFilters).reduce((acc, s) => acc + s.size, 0);

  const filtered = useMemo(() => {
    let result = [...products];
    filterConfig.sections.forEach((section) => {
      const selected = activeFilters[section.key];
      if (!selected || selected.size === 0) return;
      result = result.filter((product) => {
        if (section.type === 'availability') {
          if (selected.has('in_stock') && !selected.has('out_stock')) return product.availableForSale;
          if (selected.has('out_stock') && !selected.has('in_stock')) return !product.availableForSale;
          return true;
        }
        if (section.type === 'tag') {
          const tags = product.tags.map((t) => t.toLowerCase());
          return [...selected].some((key) => tags.includes(key.toLowerCase()));
        }
        return true;
      });
    });
    return result.sort((a, b) => {
      if (sortKey === 'price_asc')  return parseFloat(a.priceRange.minVariantPrice.amount) - parseFloat(b.priceRange.minVariantPrice.amount);
      if (sortKey === 'price_desc') return parseFloat(b.priceRange.minVariantPrice.amount) - parseFloat(a.priceRange.minVariantPrice.amount);
      if (sortKey === 'title_asc')  return a.title.localeCompare(b.title);
      return 0;
    });
  }, [products, activeFilters, sortKey, filterConfig]);

  const sidebarProps = {filterConfig, activeFilters, openSections, setOpenSections, toggleFilter, clearAll, hasActiveFilters};

  return (
    <div style={{background: '#f5f7fa', minHeight: '100vh'}}>

      {/* Breadcrumb */}
      <div style={{background: '#fff', borderBottom: '1px solid #e8e4dc', padding: '0.625rem 1rem'}}>
        <div style={{maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8125rem', color: '#7a6a62', flexWrap: 'wrap'}}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          <Link to="/" style={{color: '#7a6a62', textDecoration: 'none'}}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#F5A623')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#7a6a62')}
          >Inicio</Link>
          <span>/</span>
          {handle !== 'roof-roof' && (
            <>
              <Link to="/collections/roof-roof" style={{color: '#7a6a62', textDecoration: 'none'}}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#F5A623')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#7a6a62')}
              >Todos</Link>
              <span>/</span>
            </>
          )}
          <span style={{color: '#2C1810', fontWeight: 600}}>{title.toUpperCase()}</span>
        </div>
      </div>

      {/* Layout */}
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: isMobile ? '1rem' : '1.5rem 2rem',
          display: isMobile ? 'block' : 'grid',
          gridTemplateColumns: '220px minmax(0, 1fr)',
          gap: '2rem',
          alignItems: 'start',
        }}
      >
        {/* ── SIDEBAR DESKTOP ── */}
        {!isMobile && (
          <aside style={{position: 'sticky', top: '1.5rem', alignSelf: 'start', width: '220px', minWidth: 0, overflow: 'hidden'}}>
            <SidebarContent {...sidebarProps} />
          </aside>
        )}

        {/* ── ÁREA PRINCIPAL ── */}
        <main style={{minWidth: 0, overflow: 'hidden'}}>

          {/* Header */}
          <div style={{marginBottom: '1rem'}}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap'}}>
              <div>
                <h1 style={{fontSize: isMobile ? '1.125rem' : '1.375rem', fontWeight: 700, color: '#2C1810', margin: '0 0 0.2rem', textTransform: 'uppercase', letterSpacing: '0.5px'}}>
                  {title}
                </h1>
                <p style={{fontSize: '0.8125rem', color: '#7a6a62', margin: 0}}>
                  {filtered.length} resultado{filtered.length !== 1 ? 's' : ''}
                  {hasActiveFilters && (
                    <span style={{color: '#F5A623', marginLeft: '0.5rem', fontWeight: 600}}>• filtros activos</span>
                  )}
                </p>
              </div>

              <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                {/* Botón filtros mobile */}
                {isMobile && (
                  <button
                    onClick={() => setDrawerOpen(true)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.375rem',
                      background: hasActiveFilters ? '#2C1810' : '#fff',
                      color: hasActiveFilters ? '#F5A623' : '#2C1810',
                      border: '1.5px solid #e8e4dc',
                      borderRadius: '0.5rem',
                      padding: '0.5rem 0.875rem',
                      fontSize: '0.8125rem', fontWeight: 700,
                      cursor: 'pointer', fontFamily: 'inherit',
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                      <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
                    </svg>
                    Filtros
                    {activeFilterCount > 0 && (
                      <span style={{background: '#F5A623', color: '#2C1810', borderRadius: '999px', fontSize: '10px', fontWeight: 800, padding: '1px 6px', lineHeight: 1.4}}>
                        {activeFilterCount}
                      </span>
                    )}
                  </button>
                )}

                {/* Toggle grid/lista */}
                <div style={{display: 'flex', border: '1.5px solid #e8e4dc', borderRadius: '0.5rem', overflow: 'hidden', background: '#fff'}}>
                  <button
                    onClick={() => setViewMode('grid')}
                    aria-label="Vista cuadrícula"
                    style={{width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', background: viewMode === 'grid' ? '#2C1810' : 'transparent', color: viewMode === 'grid' ? '#F5A623' : '#7a6a62', cursor: 'pointer'}}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
                      <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    aria-label="Vista lista"
                    style={{width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', background: viewMode === 'list' ? '#2C1810' : 'transparent', color: viewMode === 'list' ? '#F5A623' : '#7a6a62', cursor: 'pointer'}}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
                      <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
                    </svg>
                  </button>
                </div>

                {/* Ordenamiento */}
                <div style={{position: 'relative'}}>
                  <select
                    value={sortKey}
                    onChange={(e) => setSortKey(e.target.value)}
                    style={{appearance: 'none', background: '#fff', border: '1.5px solid #e8e4dc', borderRadius: '0.5rem', padding: '0.5rem 2rem 0.5rem 0.625rem', fontSize: '0.8125rem', color: '#2C1810', fontWeight: 500, cursor: 'pointer', outline: 'none', minWidth: isMobile ? '120px' : '170px', maxWidth: isMobile ? '140px' : 'none', fontFamily: 'inherit'}}
                  >
                    <option value="default">{isMobile ? 'Relevancia' : 'Lo Más Vendido'}</option>
                    <option value="price_asc">{isMobile ? 'Precio ↑' : 'Precio: Menor a Mayor'}</option>
                    <option value="price_desc">{isMobile ? 'Precio ↓' : 'Precio: Mayor a Menor'}</option>
                    <option value="title_asc">{isMobile ? 'A–Z' : 'Nombre A–Z'}</option>
                  </select>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2C1810" strokeWidth="2.5" style={{position: 'absolute', right: '0.4rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none'}} aria-hidden="true">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Pills filtros activos */}
            {hasActiveFilters && (
              <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.75rem'}}>
                {filterConfig.sections.map((section) =>
                  [...(activeFilters[section.key] ?? [])].map((key) => {
                    const opt = section.options.find((o) => o.key === key);
                    return (
                      <span key={`${section.key}-${key}`} style={{display: 'flex', alignItems: 'center', gap: '0.375rem', background: '#fff8ee', border: '1px solid #f0d490', borderRadius: '999px', padding: '0.25rem 0.75rem', fontSize: '0.75rem', color: '#2C1810', fontWeight: 600}}>
                        {opt?.label ?? key}
                        <button onClick={() => toggleFilter(section.key, key)} style={{background: 'none', border: 'none', cursor: 'pointer', color: '#b0a49c', padding: 0, display: 'flex', alignItems: 'center'}}>
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                          </svg>
                        </button>
                      </span>
                    );
                  })
                )}
              </div>
            )}
          </div>

          {/* Grid / Lista */}
          {filtered.length === 0 ? (
            <div style={{background: '#fff', borderRadius: '0.875rem', padding: '3rem 1.5rem', textAlign: 'center', border: '1.5px solid #e8e4dc'}}>
              <p style={{fontSize: '2.5rem', marginBottom: '1rem'}}>🔍</p>
              <p style={{fontSize: '1.125rem', fontWeight: 700, color: '#2C1810', marginBottom: '0.5rem'}}>Sin resultados</p>
              <p style={{fontSize: '0.875rem', color: '#7a6a62', marginBottom: '1.5rem'}}>Intenta quitar algunos filtros.</p>
              <button
                onClick={clearAll}
                style={{background: '#F5A623', color: '#2C1810', fontWeight: 700, fontSize: '0.875rem', padding: '0.75rem 1.5rem', borderRadius: '999px', border: 'none', cursor: 'pointer', fontFamily: 'inherit'}}
              >
                Limpiar filtros
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(180px, 1fr))',
              gap: isMobile ? '0.625rem' : '1rem',
            }}>
              {filtered.map((p) => <ProductCard key={p.id} product={p} isMobile={isMobile} />)}
            </div>
          ) : (
            <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
              {filtered.map((p) => <ProductRow key={p.id} product={p} isMobile={isMobile} />)}
            </div>
          )}

          {/* ── Paginador ── */}
          {!hasActiveFilters && (pageInfo?.hasPreviousPage || pageInfo?.hasNextPage) && (
            <Paginator pageInfo={pageInfo} handle={handle} />
          )}
        </main>
      </div>

      {/* Drawer filtros mobile */}
      {isMobile && (
        <FilterDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <SidebarContent {...sidebarProps} />
        </FilterDrawer>
      )}
    </div>
  );
}

// -----------------------------------------------------------------------
// ADD TO CART
// -----------------------------------------------------------------------
function AddToCartButton({variantId, children, onFly}) {
  const {open} = useAside();
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.LinesAdd}
      inputs={{lines: [{merchandiseId: variantId, quantity: 1}]}}
      onSubmit={() => open('cart')}
    >
      {(fetcher) => (
        typeof children === 'function'
          ? children(fetcher, onFly)
          : children
      )}
    </CartForm>
  );
}

// -----------------------------------------------------------------------
// QUICK VIEW MODAL
// -----------------------------------------------------------------------
function QuickViewModal({product, price, compare, discount, onClose}) {
  const {open} = useAside();

  // Cerrar con Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 200,
          background: 'rgba(44,24,16,0.55)',
          backdropFilter: 'blur(2px)',
        }}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Vista rápida: ${product.title}`}
        style={{
          position: 'fixed', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 201,
          background: '#fff',
          borderRadius: '1rem',
          width: 'min(680px, calc(100vw - 2rem))',
          maxHeight: 'calc(100vh - 4rem)',
          overflowY: 'auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          boxShadow: '0 24px 64px rgba(44,24,16,0.22)',
        }}
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          aria-label="Cerrar"
          style={{
            position: 'absolute', top: '0.875rem', right: '0.875rem', zIndex: 1,
            background: '#f5f7fa', border: '1px solid #e8e4dc',
            borderRadius: '50%', width: '32px', height: '32px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: '#2C1810',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        {/* Imagen */}
        <div style={{background: '#f5f7fa', borderRadius: '1rem 0 0 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', aspectRatio: '1', position: 'relative', overflow: 'hidden'}}>
          {discount && (
            <span style={{position: 'absolute', top: '0.875rem', left: '0.875rem', background: '#c0392b', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '999px'}}>
              {discount}% OFF
            </span>
          )}
          {product.featuredImage ? (
            <Image
              data={product.featuredImage}
              sizes="340px"
              style={{width: '100%', height: '100%', objectFit: 'contain', padding: '1.5rem'}}
            />
          ) : (
            <span style={{fontSize: '4rem'}}>🐾</span>
          )}
        </div>

        {/* Info */}
        <div style={{padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
          <p style={{fontSize: '0.6875rem', fontWeight: 700, color: '#F5A623', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px'}}>
            Roof Roof
          </p>
          <h2 style={{fontSize: '1.0625rem', fontWeight: 700, color: '#2C1810', margin: 0, lineHeight: 1.3}}>
            {product.title}
          </h2>

          {/* Precio */}
          <div style={{display: 'flex', alignItems: 'baseline', gap: '0.5rem', flexWrap: 'wrap'}}>
            <Money data={price} style={{fontSize: '1.25rem', fontWeight: 800, color: '#2C1810'}}/>
            {compare && parseFloat(compare.amount) > parseFloat(price.amount) && (
              <Money data={compare} style={{fontSize: '0.875rem', color: '#b0a49c', textDecoration: 'line-through'}}/>
            )}
          </div>

          {/* Disponibilidad */}
          <div style={{display: 'flex', alignItems: 'center', gap: '0.375rem'}}>
            <span style={{width: '7px', height: '7px', borderRadius: '50%', background: product.availableForSale ? '#1aad6d' : '#c0392b', flexShrink: 0}}/>
            <span style={{fontSize: '0.8125rem', color: '#7a6a62', fontWeight: 500}}>
              {product.availableForSale ? 'En stock — listo para envío' : 'Agotado'}
            </span>
          </div>

          {/* Botones */}
          {product.availableForSale && product.variants?.nodes?.[0]?.id && (
            <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.25rem'}}>
              <AddToCartButton variantId={product.variants.nodes[0].id}>
                {(fetcher) => (
                  <button
                    type="submit"
                    disabled={fetcher.state !== 'idle'}
                    style={{
                      width: '100%', padding: '0.75rem',
                      borderRadius: '0.625rem', border: '1.5px solid #2C1810',
                      background: '#fff', color: '#2C1810',
                      fontSize: '0.875rem', fontWeight: 700,
                      cursor: fetcher.state !== 'idle' ? 'not-allowed' : 'pointer',
                      fontFamily: 'inherit', transition: 'background 0.15s, color 0.15s',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
                      opacity: fetcher.state !== 'idle' ? 0.6 : 1,
                    }}
                    onMouseEnter={(e) => { if (fetcher.state === 'idle') { e.currentTarget.style.background = '#2C1810'; e.currentTarget.style.color = '#F5A623'; }}}
                    onMouseLeave={(e) => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#2C1810'; }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                      <line x1="3" y1="6" x2="21" y2="6"/>
                      <path d="M16 10a4 4 0 01-8 0"/>
                    </svg>
                    {fetcher.state !== 'idle' ? 'Agregando...' : 'Agregar al carrito'}
                  </button>
                )}
              </AddToCartButton>

              <Link
                to={`/products/${product.handle}`}
                onClick={onClose}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem',
                  padding: '0.75rem', borderRadius: '0.625rem',
                  background: '#F5A623', color: '#2C1810',
                  fontSize: '0.875rem', fontWeight: 700,
                  textDecoration: 'none', transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#d4891a')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#F5A623')}
              >
                Ver producto completo
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
          )}

          {/* Tags */}
          {product.tags?.length > 0 && (
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginTop: '0.25rem'}}>
              {product.tags.slice(0, 4).map((tag) => (
                <span key={tag} style={{fontSize: '0.6875rem', color: '#7a6a62', background: '#f5f7fa', border: '1px solid #e8e4dc', borderRadius: '999px', padding: '2px 8px'}}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// -----------------------------------------------------------------------
// BOTONES DE CARD — componente separado para evitar problemas de cierre
// -----------------------------------------------------------------------
function ProductCardButtons({variantId, triggerFly, openCart}) {
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '0.375rem', marginTop: '0.5rem'}}>

      {/* Agregar al carrito */}
      <CartForm
        route="/cart"
        action={CartForm.ACTIONS.LinesAdd}
        inputs={{lines: [{merchandiseId: variantId, quantity: 1, selectedVariantId: variantId}]}}
      >
        {(fetcher) => (
          <button
            type="submit"
            onClick={(e) => {
              e.stopPropagation();
              triggerFly(e.currentTarget);
              openCart('cart');
            }}
            disabled={fetcher.state !== 'idle'}
            style={{
              width: '100%', padding: '0.5rem',
              borderRadius: '0.5rem', border: '1.5px solid #2C1810',
              background: '#fff', color: '#2C1810',
              fontSize: '0.6875rem', fontWeight: 700,
              cursor: fetcher.state !== 'idle' ? 'not-allowed' : 'pointer',
              fontFamily: 'inherit', transition: 'background 0.15s, color 0.15s',
              opacity: fetcher.state !== 'idle' ? 0.6 : 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem',
            }}
            onMouseEnter={(e) => { if (fetcher.state === 'idle') { e.currentTarget.style.background = '#2C1810'; e.currentTarget.style.color = '#F5A623'; }}}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#2C1810'; }}
          >
            {fetcher.state !== 'idle' ? '...' : (
              <>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 01-8 0"/>
                </svg>
                Agregar al carrito
              </>
            )}
          </button>
        )}
      </CartForm>

      {/* Comprar ahora */}
      <CartForm
        route="/cart"
        action={CartForm.ACTIONS.LinesAdd}
        inputs={{lines: [{merchandiseId: variantId, quantity: 1, selectedVariantId: variantId}], redirectTo: '/checkout'}}
      >
        {(fetcher) => (
          <button
            type="submit"
            onClick={(e) => e.stopPropagation()}
            disabled={fetcher.state !== 'idle'}
            style={{
              width: '100%', padding: '0.5rem',
              borderRadius: '0.5rem', border: '1.5px solid #F5A623',
              background: '#F5A623', color: '#2C1810',
              fontSize: '0.6875rem', fontWeight: 700,
              cursor: fetcher.state !== 'idle' ? 'not-allowed' : 'pointer',
              fontFamily: 'inherit', transition: 'background 0.15s',
              opacity: fetcher.state !== 'idle' ? 0.6 : 1,
            }}
            onMouseEnter={(e) => { if (fetcher.state === 'idle') e.currentTarget.style.background = '#d4891a'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#F5A623'; }}
          >
            {fetcher.state !== 'idle' ? '...' : 'Comprar ahora'}
          </button>
        )}
      </CartForm>
    </div>
  );
}

// -----------------------------------------------------------------------
// TARJETA GRID
// -----------------------------------------------------------------------
function ProductCard({product, isMobile}) {
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [imgHovered, setImgHovered]       = useState(false);
  const {triggerFly} = useCartAnimation();
  const {open} = useAside();

  const price   = product.priceRange.minVariantPrice;
  const compare = product.compareAtPriceRange?.minVariantPrice;
  const discount = compare && parseFloat(compare.amount) > parseFloat(price.amount)
    ? Math.round(((parseFloat(compare.amount) - parseFloat(price.amount)) / parseFloat(compare.amount)) * 100)
    : null;

  return (
    <>
      {/* Modal vista rápida */}
      {quickViewOpen && (
        <QuickViewModal
          product={product}
          price={price}
          compare={compare}
          discount={discount}
          onClose={() => setQuickViewOpen(false)}
        />
      )}

      <Link
        to={`/products/${product.handle}`}
        style={{display: 'flex', flexDirection: 'column', background: '#fff', border: '1.5px solid #e8e4dc', borderRadius: '0.875rem', overflow: 'hidden', textDecoration: 'none', position: 'relative', transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.2s'}}
        onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 6px 20px rgba(44,24,16,0.10)'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = '#F5A623'; }}
        onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = '#e8e4dc'; }}
      >
        {/* Favorito */}
        {/* <button
          onClick={(e) => e.preventDefault()}
          aria-label="Favorito"
          style={{position: 'absolute', top: '0.5rem', right: '0.5rem', zIndex: 2, background: 'rgba(255,255,255,0.95)', border: '1px solid #e8e4dc', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#c8b8b0" strokeWidth="2" aria-hidden="true">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
          </svg>
        </button> */}

        {/* Imagen */}
        <div
          style={{aspectRatio: '1',  overflow: 'hidden', position: 'relative', flexShrink: 0}}
          onMouseEnter={() => setImgHovered(true)}
          onMouseLeave={() => setImgHovered(false)}
        >
          {/* Imagen con zoom */}
          {product.featuredImage ? (
            <Image
              data={product.featuredImage}
              sizes="(min-width: 45em) 20vw, 50vw"
              style={{
                width: '100%', height: '100%', objectFit: 'contain', padding: '0.5rem',
                transition: 'transform 0.35s ease',
                transform: imgHovered ? 'scale(1.07)' : 'scale(1)',
              }}
            />
          ) : (
            <div style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', color: '#c8b8b0'}}>🐾</div>
          )}

          {/* Badge — top-left */}
          {discount && product.availableForSale && (
            <span style={{position: 'absolute', top: '0.5rem', left: '0.5rem', zIndex: 2, background: '#c0392b', color: '#fff', fontSize: '10px', fontWeight: 800, padding: '2px 8px', borderRadius: '999px'}}>
              {discount}% OFF
            </span>
          )}
          {!product.availableForSale && (
            <span style={{position: 'absolute', top: '0.5rem', left: '0.5rem', zIndex: 2, background: '#b0a49c', color: '#fff', fontSize: '10px', fontWeight: 800, padding: '2px 8px', borderRadius: '999px'}}>
              Agotado
            </span>
          )}

          {/* Overlay Vista rápida — cubre toda la imagen, solo desktop */}
          {!isMobile && (
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setQuickViewOpen(true); }}
              aria-label="Vista rápida"
              style={{
                position: 'absolute', inset: 0, zIndex: 1,
                background: imgHovered ? 'rgba(44,24,16,0.48)' : 'rgba(44,24,16,0)',
                border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                opacity: imgHovered ? 1 : 0,
                transition: 'opacity 0.22s ease, background 0.22s ease',
              }}
            >
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
                background: 'rgba(44,24,16,0.9)',
                color: '#fff', fontSize: '0.75rem', fontWeight: 700,
                padding: '0.4rem 0.875rem', borderRadius: '999px',
                letterSpacing: '0.2px',
                transform: imgHovered ? 'translateY(0)' : 'translateY(6px)',
                transition: 'transform 0.22s ease',
              }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
                Vista rápida
              </span>
            </button>
          )}
        </div>

        {/* Info */}
        <div style={{padding: isMobile ? '0.625rem' : '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.2rem', flex: 1}}>
          <p style={{fontSize: '0.6875rem', fontWeight: 700, color: '#F5A623', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px'}}>Roof Roof</p>

          <p style={{fontSize: isMobile ? '0.75rem' : '0.8125rem', color: '#2C1810', lineHeight: 1.4, margin: 0, flex: 1,
            overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical'}}
          >
            {product.title}
          </p>

          {/* Rating */}
          {product.rating && (
            <div style={{display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.125rem'}}>
              <span style={{color: '#F5A623', fontSize: '0.6875rem', letterSpacing: '-0.5px'}}>
                {'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}
              </span>
              {product.reviewCount > 0 && (
                <span style={{fontSize: '0.6875rem', color: '#b0a49c'}}>({product.reviewCount})</span>
              )}
            </div>
          )}

          <div style={{display: 'flex', alignItems: 'baseline', gap: '0.3rem', marginTop: '0.3rem', flexWrap: 'wrap'}}>
            <Money data={price} style={{fontSize: isMobile ? '0.9rem' : '1rem', fontWeight: 800, color: '#2C1810'}}/>
            {compare && parseFloat(compare.amount) > parseFloat(price.amount) && (
              <Money data={compare} style={{fontSize: '0.6875rem', color: '#b0a49c', textDecoration: 'line-through'}}/>
            )}
          </div>

          {product.availableForSale && product.variants?.nodes?.[0]?.id && (
            <ProductCardButtons
              variantId={product.variants.nodes[0].id}
              triggerFly={triggerFly}
              openCart={open}
            />
          )}
        </div>
      </Link>
    </>
  );
}

// -----------------------------------------------------------------------
// FILA LISTA
// -----------------------------------------------------------------------
function ProductRow({product, isMobile}) {
  const price   = product.priceRange.minVariantPrice;
  const compare = product.compareAtPriceRange?.minVariantPrice;
  const discount = compare && parseFloat(compare.amount) > parseFloat(price.amount)
    ? Math.round(((parseFloat(compare.amount) - parseFloat(price.amount)) / parseFloat(compare.amount)) * 100)
    : null;

  return (
    <Link
      to={`/products/${product.handle}`}
      style={{display: 'flex', gap: isMobile ? '0.75rem' : '1rem', background: '#fff', border: '1.5px solid #e8e4dc', borderRadius: '0.875rem', textDecoration: 'none', alignItems: 'center', padding: isMobile ? '0.625rem' : '0.875rem', transition: 'box-shadow 0.2s, border-color 0.2s'}}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 4px 16px rgba(44,24,16,0.08)'; e.currentTarget.style.borderColor = '#F5A623'; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = '#e8e4dc'; }}
    >
      <div style={{width: isMobile ? '70px' : '90px', height: isMobile ? '70px' : '90px', background: '#f5f7fa', borderRadius: '0.625rem', overflow: 'hidden', flexShrink: 0, border: '1px solid #e8e4dc'}}>
        {product.featuredImage && (
          <Image data={product.featuredImage} sizes="90px" style={{width: '100%', height: '100%', objectFit: 'contain', padding: '0.25rem'}}/>
        )}
      </div>

      <div style={{flex: 1, minWidth: 0}}>
        <p style={{fontSize: '0.6875rem', fontWeight: 700, color: '#F5A623', margin: '0 0 0.2rem', textTransform: 'uppercase', letterSpacing: '0.5px'}}>Roof Roof</p>
        <p style={{fontSize: isMobile ? '0.8125rem' : '0.9375rem', color: '#2C1810', fontWeight: 600, margin: '0 0 0.375rem', lineHeight: 1.4,
          overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical'}}
        >
          {product.title}
        </p>
        <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap'}}>
          <Money data={price} style={{fontSize: isMobile ? '0.9rem' : '1rem', fontWeight: 800, color: '#2C1810'}}/>
          {compare && parseFloat(compare.amount) > parseFloat(price.amount) && (
            <Money data={compare} style={{fontSize: '0.75rem', color: '#b0a49c', textDecoration: 'line-through'}}/>
          )}
          {discount && (
            <span style={{background: '#c0392b', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '2px 6px', borderRadius: '999px'}}>
              {discount}% OFF
            </span>
          )}
        </div>
      </div>

      <span style={{display: 'inline-flex', alignItems: 'center', gap: '0.25rem', background: '#F5A623', color: '#2C1810', fontWeight: 700, fontSize: isMobile ? '0.75rem' : '0.8125rem', padding: isMobile ? '0.4rem 0.75rem' : '0.5rem 1rem', borderRadius: '999px', flexShrink: 0}}>
        Ver
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
        </svg>
      </span>
    </Link>
  );
}

// -----------------------------------------------------------------------
// PAGINADOR
// -----------------------------------------------------------------------
function Paginator({pageInfo, handle}) {
  const navigate = useNavigate();
  const [hovPrev, setHovPrev] = useState(false);
  const [hovNext, setHovNext] = useState(false);

  const goTo = (cursor, dir) => {
    const params = new URLSearchParams({cursor, dir});
    navigate(`/collections/${handle}?${params.toString()}`);
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      gap: '0.75rem', marginTop: '2rem', paddingTop: '1.5rem',
      borderTop: '1px solid #e8e4dc',
    }}>
      {/* Anterior */}
      <button
        onClick={() => goTo(pageInfo.startCursor, 'prev')}
        disabled={!pageInfo.hasPreviousPage}
        style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          padding: '0.625rem 1.25rem', borderRadius: '999px',
          border: `1.5px solid ${hovPrev && pageInfo.hasPreviousPage ? '#2C1810' : '#e8e4dc'}`,
          background: hovPrev && pageInfo.hasPreviousPage ? '#2C1810' : '#fff',
          color: !pageInfo.hasPreviousPage ? '#c8b8b0' : hovPrev ? '#F5A623' : '#2C1810',
          fontSize: '0.875rem', fontWeight: 700,
          cursor: pageInfo.hasPreviousPage ? 'pointer' : 'not-allowed',
          fontFamily: 'inherit', transition: 'all 0.15s',
          opacity: pageInfo.hasPreviousPage ? 1 : 0.4,
        }}
        onMouseEnter={() => setHovPrev(true)}
        onMouseLeave={() => setHovPrev(false)}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/>
        </svg>
        Anterior
      </button>

      {/* Siguiente */}
      <button
        onClick={() => goTo(pageInfo.endCursor, 'next')}
        disabled={!pageInfo.hasNextPage}
        style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          padding: '0.625rem 1.25rem', borderRadius: '999px',
          border: `1.5px solid ${hovNext && pageInfo.hasNextPage ? '#F5A623' : '#e8e4dc'}`,
          background: hovNext && pageInfo.hasNextPage ? '#F5A623' : '#fff',
          color: !pageInfo.hasNextPage ? '#c8b8b0' : hovNext ? '#2C1810' : '#2C1810',
          fontSize: '0.875rem', fontWeight: 700,
          cursor: pageInfo.hasNextPage ? 'pointer' : 'not-allowed',
          fontFamily: 'inherit', transition: 'all 0.15s',
          opacity: pageInfo.hasNextPage ? 1 : 0.4,
        }}
        onMouseEnter={() => setHovNext(true)}
        onMouseLeave={() => setHovNext(false)}
      >
        Siguiente
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
        </svg>
      </button>
    </div>
  );
}

// -----------------------------------------------------------------------
// QUERY
// -----------------------------------------------------------------------
const PRODUCTS_QUERY = `#graphql
  query ProductsByFilter(
    $query: String!
    $first: Int
    $last: Int
    $after: String
    $before: String
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    products(first: $first, last: $last, after: $after, before: $before, query: $query) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      nodes {
        id title handle availableForSale tags
        priceRange          { minVariantPrice { amount currencyCode } }
        compareAtPriceRange { minVariantPrice { amount currencyCode } }
        featuredImage       { id url altText width height }
        variants(first: 3)  { nodes { id availableForSale } }
      }
    }
  }
`;

/** @typedef {import('./+types/collections.$handle').Route} Route */