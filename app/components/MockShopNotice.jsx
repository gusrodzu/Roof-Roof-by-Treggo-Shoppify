export function MockShopNotice() {
  return (
    <section
      aria-labelledby="mock-shop-notice-heading"
      style={{
        padding: '3rem 1.5rem',
        background: '#fff8ee',
        border: '1.5px solid #f0d490',
        borderRadius: '0.875rem',
        margin: '2rem auto',
        maxWidth: '540px',
        textAlign: 'center',
      }}
    >
      <p style={{fontSize: '2.5rem', margin: '0 0 0.75rem'}}>🏗️</p>
      <h2
        id="mock-shop-notice-heading"
        style={{fontSize: '1.125rem', fontWeight: 800, color: '#2C1810', margin: '0 0 0.625rem'}}
      >
        Tienda de demostración
      </h2>
      <p style={{fontSize: '0.9375rem', color: '#7a6a62', margin: '0 0 0.75rem', lineHeight: 1.55}}>
        Estás viendo productos de prueba porque aún no hay una tienda conectada a este proyecto.
      </p>
      <p style={{fontSize: '0.875rem', color: '#7a6a62', margin: 0, lineHeight: 1.55}}>
        Conecta una tienda ejecutando{' '}
        <code style={{
          background: '#fff', border: '1px solid #e8e4dc',
          borderRadius: '0.375rem', padding: '2px 6px',
          fontSize: '0.8125rem', fontFamily: 'monospace', color: '#2C1810',
        }}>
          npx shopify hydrogen link
        </code>{' '}
        en tu terminal.
      </p>
    </section>
  );
}