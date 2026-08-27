# Roof Roof — Mejora de resultados de búsqueda

## Objetivo

Rediseñar `/search` para que la búsqueda se sienta integrada al sistema visual de Roof Roof, funcione mejor en desktop y móvil, y oriente al usuario incluso cuando no existen resultados.

## Cambios realizados

- Se reconstruyó la jerarquía visual completa de la página de resultados.
- Nuevo hero de búsqueda con lenguaje Cartoon Premium, mejor contraste y búsqueda principal destacada.
- Búsquedas populares convertidas en chips horizontales y táctiles.
- Contador y resumen de resultados más claros.
- Filtros por tipo de contenido: Todo, Productos y Guías/Páginas.
- Nueva distribución de resultados con productos y contenido útil en un panel secundario en escritorio.
- Cards de producto estandarizadas con el sistema visual actual de Roof Roof.
- Mejor visualización de precio, precio anterior y descuento.
- Paginación real conectada a cursores de Shopify.
- Nueva vista inicial con categorías principales y acceso al selector de productos.
- Estado sin resultados completamente rediseñado con búsquedas sugeridas y acciones útiles.
- Se eliminaron resultados de Blog para respetar que esa sección continúa bloqueada.
- Se agregaron metadatos `noindex,follow` para evitar indexar URLs internas de búsqueda.
- Se eliminó la dependencia de `matchMedia` y de estilos inline para esta ruta.
- Diseño responsive optimizado para móvil tipo app, tablet, laptop y escritorio.
- Mejoras de accesibilidad en labels, navegación por teclado, foco y estados de carga.

## Archivos principales modificados

- `app/routes/search.jsx`
- `app/styles/SearchPage.module.css`

## Validación

- Prettier aplicado a los archivos modificados.
- ESLint ejecutado sobre todo `app` sin errores ni advertencias.
- No se modificó la lógica del carrito ni las rutas de producto.
