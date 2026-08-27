# Roof Roof — Responsive System 2026

## Objetivo

Mejorar la adaptación de toda la tienda desde 320 px hasta monitores amplios, manteniendo el concepto visual Cartoon Premium y la experiencia móvil tipo app.

## Sistema responsive global

Se añadió `app/styles/responsive-system.css` como última capa de estilos. Esta hoja concentra:

- Contenedores fluidos y gutters con `clamp()`.
- Tipografía escalable.
- Breakpoints para desktop amplio, laptop, tablet, móvil y pantallas compactas.
- Protección contra overflow horizontal.
- Grids fluidos y tarjetas con altura consistente.
- Áreas táctiles mínimas de 44 px.
- Ajustes para orientación horizontal y pantallas de poca altura.
- Reducción de efectos hover en dispositivos táctiles.
- Compatibilidad con `prefers-reduced-motion`.

## Módulos y páginas

- Home y módulos editoriales con grids fluidos.
- Cards de experiencia, necesidades, promociones, etapas y políticas.
- Página de colecciones con sidebar responsive, toolbar sticky y filtros adaptables.
- Grid de catálogo optimizado para laptop, tablet y móvil.
- Página de producto con layout de dos columnas, transición a una columna y galería táctil.
- Productos relacionados convertidos en carrusel táctil en móvil.
- Carrito con resumen sticky en desktop y flujo vertical en tablet/móvil.
- Búsqueda, resultados y estados vacíos adaptados.
- Formularios, inputs, selects, tablas y contenido largo sin desbordamientos.
- Footer y navegación adaptados por tamaño de pantalla.

## Comparador de productos

- Barra flotante reposicionada para no chocar con navegación inferior ni compra rápida.
- Modal convertido en bottom sheet móvil.
- Productos comparados mostrados como carrusel horizontal táctil.
- Tarjetas con ancho seguro y contenido flexible.
- Etiquetas compactas en pantallas pequeñas.
- Se corrigió un carácter residual en el botón “Comparar”.

## Vista y agregado rápido

- Vista rápida convertida en bottom sheet en móvil.
- Imagen, contenido y cierre adaptados a altura dinámica (`dvh`).
- Botones de agregado rápido con texto compacto en pantallas pequeñas.
- Acciones con altura táctil y textos que no desbordan las cards.

## Archivos principales modificados

- `app/root.jsx`
- `app/styles/responsive-system.css`
- `app/components/ProductComparison.jsx`
- `app/routes/collections.$handle.jsx`
- Archivos formateados para consistencia: `Footer.jsx`, `AboutSection.module.css`, `icon-title-system.css` y `mobile-experience.css`.

## Validación

- ESLint ejecutado sobre todo `app`: 0 errores y 0 advertencias.
- Prettier validado sobre todos los archivos JS, JSX, TS, TSX y CSS de `app`.
- Todos los archivos JS/JSX/TS fueron analizados correctamente con Babel Parser.
- Todas las hojas CSS fueron analizadas sin errores de sintaxis.
- La compilación de Hydrogen no finalizó por el binding nativo opcional de Rolldown disponible en el entorno de validación. No se detectaron errores de código en los archivos modificados.
