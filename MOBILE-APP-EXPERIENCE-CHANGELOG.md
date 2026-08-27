# Roof Roof — Experiencia móvil tipo app

## Objetivo

Transformar la versión móvil en una experiencia de retail con estructura de aplicación, manteniendo el lenguaje visual Cartoon Premium y sin alterar la lógica de Shopify.

## Cambios principales

- Se ocultó la barra promocional superior de escritorio en dispositivos móviles.
- Se creó un encabezado de app compacto con:
  - Icono de marca.
  - Nombre y descriptor breve.
  - Acceso directo a ayuda.
  - Botón para abrir el menú completo.
  - Buscador táctil integrado.
- La navegación inferior ahora utiliza accesos funcionales:
  - Inicio.
  - Tienda/categorías.
  - Carrito central.
  - Selector de productos.
  - Menú Más.
- Se retiró “Mi cuenta” de la navegación primaria mientras continúa bloqueada.
- La home móvil se convirtió en un feed de módulos tipo app.
- Se ocultaron en móvil elementos pensados para escritorio o duplicados:
  - Barra de anuncios.
  - Cards laterales del hero.
  - Bloque de cuenta futura.
  - Módulo editorial de filosofía.
  - Segundo banner promocional de Descubre.
  - Banner superior de etapas de vida.
  - Footer completo de escritorio.
- Los enlaces de ayuda y políticas siguen disponibles dentro del menú Más.
- Los módulos comerciales se presentan como tarjetas independientes con bordes, radios y sombras consistentes.
- Los listados de herramientas, promociones, novedades y etapas se comportan como carruseles táctiles horizontales.
- “Soluciones para la vida real” usa un grid compacto de dos columnas, más cercano a una interfaz de app.
- Carrito, búsqueda y filtros conservan el patrón de bottom sheet.
- La página de producto mantiene una barra de compra fija sobre la navegación inferior.
- Se añadieron metadatos móviles y `viewport-fit=cover` para mejorar la integración con áreas seguras de iPhone.
- El hero elimina controles innecesarios cuando sólo existe una diapositiva.

## Archivos principales modificados

- `app/components/Header.jsx`
- `app/components/BottomNav.jsx`
- `app/components/HeroBanner.jsx`
- `app/root.jsx`
- `app/styles/mobile-app-shell.css`

## Validación

- ESLint ejecutado sobre todo `app`: 0 errores y 0 advertencias.
- Prettier aplicado a los archivos modificados.
- No se modificaron GraphQL, acciones del carrito, rutas comerciales ni lógica de Shopify.
