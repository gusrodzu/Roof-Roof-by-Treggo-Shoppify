# Roof Roof — Estandarización visual basada en el selector

## Objetivo

Tomar `pages/selector-de-productos#selector` como referencia principal para unificar la interfaz de toda la tienda.

## Sistema visual unificado

Se creó `app/styles/selector-system.css`, cargado después de la capa Cartoon 40s Premium. Este archivo centraliza:

- Bordes, radios y sombras de tarjetas.
- Estados hover, focus, seleccionado y deshabilitado.
- Botones primarios, oscuros, secundarios, ghost y de peligro.
- Inputs, selects, textareas, checkboxes, radios, switches y controles de cantidad.
- Badges, etiquetas, tabs, chips de filtros e icon buttons.
- Iconos dentro de contenedores consistentes.
- Cards de producto, colección, carrito, filtros, recomendaciones y contenido.
- Comportamiento responsive y reducción de movimiento.

## Componentes actualizados

- `app/root.jsx`
- `app/styles/selector-system.css`
- `app/components/AboutSection.jsx`
- `app/components/UnavailablePage.jsx`
- `app/components/IconButton.jsx`
- `app/components/ProductRecommendations.jsx`
- `app/components/SearchResults.jsx`
- `app/components/design-system/Button.jsx`
- `app/components/design-system/IconButton.jsx`
- `app/components/design-system/Badge.jsx`
- `app/components/design-system/Tabs.jsx`
- `app/components/design-system/FormControls.jsx`
- `app/components/design-system/ProductCard.jsx`
- `app/routes/pages.ayuda.jsx`

## Resultado

- Las tarjetas ya no usan rotaciones o sombras distintas entre módulos.
- Todos los componentes interactivos siguen el mismo lenguaje del selector.
- Los botones comparten altura, borde, radio, sombra y estados.
- Los formularios y controles tienen un foco naranja consistente.
- El estilo Cartoon 40s Premium se conserva como personalidad, pero la estructura visual ahora es más coherente y profesional.

## Validación

- ESLint ejecutado sobre todo `app` sin errores ni advertencias.
- Prettier verificado en todos los archivos modificados.
- No se modificaron consultas GraphQL, lógica de Shopify, acciones del carrito ni rutas comerciales.
