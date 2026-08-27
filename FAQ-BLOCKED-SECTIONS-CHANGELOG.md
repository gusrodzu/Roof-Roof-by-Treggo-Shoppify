# Roof Roof — FAQ y secciones bloqueadas

## Cambios visuales

- Se añadieron estados visuales deshabilitados para accesos todavía no disponibles.

## Secciones bloqueadas

- Blog: `/blogs`, `/blogs/news` y artículos individuales muestran una pantalla de contenido próximo.
- Contacto: `/pages/contacto` muestra una pantalla de sección en preparación.
- Mi cuenta: `/account` muestra una pantalla de sección en preparación.
- Las rutas internas de cuenta redirigen a `/account` para evitar accesos directos.
- Los accesos desde header, navegación móvil, footer y módulos promocionales quedaron deshabilitados o sustituidos por alternativas activas.

## Nueva página de preguntas frecuentes

Ruta: `/pages/ayuda`

Incluye:

- Hero y buscador de preguntas.
- Categorías de compras, productos y medidas, envíos, pagos, cambios y devoluciones.
- Acordeones accesibles mediante elementos nativos `details` y `summary`.
- Enlaces rápidos al selector, guía de medidas y política de devoluciones.
- Estado sin resultados y acción para restablecer la búsqueda.
- Datos estructurados `FAQPage` para buscadores.
- Diseño responsive y soporte para reducción de movimiento.
- Respuestas redactadas sin afirmar plazos, paqueterías, formas de pago o garantías no confirmadas.

## SEO y rutas

- `/pages/ayuda` fue añadido al sitemap estático.
- Las secciones bloqueadas utilizan `noindex` cuando corresponde.
- Se verificó que las rutas exactas de ayuda y contacto tienen prioridad sobre la ruta dinámica de páginas de Shopify.

## Validación

- ESLint: cero errores y cero advertencias en `app`.
- Prettier: todos los archivos de `app` cumplen el formato.
- Configuración de rutas inspeccionada con `@react-router/fs-routes` sin colisiones.
- La compilación completa sigue dependiendo de reinstalar las dependencias nativas de Rolldown para la plataforma local.
