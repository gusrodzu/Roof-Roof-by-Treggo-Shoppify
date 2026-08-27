# Corrección móvil — Cards de orientación y vista rápida

## Cards “Más orientación, menos compras a ciegas”

- Se eliminó el conflicto entre `grid-template-columns: 1fr` y el carrusel horizontal móvil.
- Todas las cards ahora usan el mismo ancho dentro del carrusel.
- Se corrigió el desfase de la primera card respecto a las siguientes.
- Se estandarizaron altura, padding, separación del icono y posición del CTA.
- Se añadió `scroll-snap-stop` para una navegación táctil más precisa.
- Se mejoró el comportamiento en pantallas de 360 px o menos.

## Modal de vista rápida

- El modal ahora se renderiza mediante `createPortal` directamente en `document.body`.
- Se evita que layouts, grids o transformaciones de las cards desplacen el modal.
- En móvil funciona como un bottom sheet real, alineado al viewport.
- Se corrigieron ancho, altura, bordes y safe areas.
- La imagen mantiene una altura estable y el contenido tiene scroll independiente.
- La navegación inferior, compra fija y comparador se ocultan mientras el modal está abierto.
- Se mejoró el comportamiento en orientación horizontal y pantallas pequeñas.

## Validación

- JSX validado correctamente.
- CSS validado correctamente.
- ESLint ejecutado sobre los archivos JavaScript modificados sin errores.
- No se modificaron GraphQL, carrito, rutas ni consultas de Shopify.
