# Roof Roof — Mejora integral de experiencia móvil

## Objetivo

Convertir la tienda en una experiencia realmente diseñada para celular, reduciendo fricción en navegación, descubrimiento, filtrado y compra sin modificar la lógica de Shopify Hydrogen.

## Navegación y header

- Header móvil compacto con logotipo visible, acceso directo al selector y buscador optimizado.
- Renderizado responsive basado en CSS para evitar saltos visuales durante la hidratación.
- Navegación inferior fija con áreas táctiles más amplias y soporte para `safe-area` en iPhone.
- Mejor comportamiento en orientación horizontal y al abrir el teclado.
- Menú móvil actualizado para respetar enlaces bloqueados, badges y estados “Próximamente”.

## Inicio y descubrimiento

- Hero responsive sin esperar detección de viewport mediante JavaScript.
- Cards secundarias reorganizadas para celular.
- Herramientas, promociones, intereses y productos relacionados convertidos en carruseles táctiles con `scroll-snap`.
- Menos desplazamiento vertical y jerarquía tipográfica más clara.
- Espaciados y gutters unificados para pantallas pequeñas.

## Colecciones y filtros

- Barra de herramientas sticky para conservar filtros, vista y ordenamiento durante el scroll.
- Filtros móviles convertidos en un `bottom sheet` accesible.
- Cierre mediante Escape, recuperación de foco y bloqueo de scroll del fondo.
- Chips de filtros activos con desplazamiento horizontal.
- Grid móvil de dos columnas y cards más compactas.
- Acciones de producto simplificadas para reducir saturación visual.

## Página de producto

- Galería y miniaturas optimizadas para interacción táctil.
- Panel de información más compacto y legible.
- Barra fija de compra rápida con precio y botón “Agregar”, colocada sobre la navegación inferior.
- La barra se oculta al enfocar campos para no interferir con el teclado móvil.
- Productos relacionados en carrusel horizontal.

## Carrito

- Layout de una columna para celular.
- Productos, cantidades y resumen con áreas táctiles más cómodas.
- Drawers de carrito y búsqueda convertidos en hojas inferiores.
- Compatibilidad con `100dvh` y áreas seguras del dispositivo.

## Formularios y páginas de contenido

- Inputs a 16 px para evitar zoom automático en iOS.
- Targets táctiles mínimos de 44 px.
- Selector de productos con acciones sticky.
- Footer convertido en acordeones para evitar columnas excesivamente largas.

## Archivos principales modificados

- `app/styles/mobile-experience.css` — nueva capa global móvil.
- `app/root.jsx`
- `app/components/Header.jsx`
- `app/components/PageLayout.jsx`
- `app/components/HeroBanner.jsx`
- `app/components/Aside.jsx`
- `app/components/Footer.jsx`
- `app/routes/collections.$handle.jsx`
- `app/routes/products.$handle.jsx`
- `app/styles/AboutSection.module.css`
- `app/styles/FaqPage.module.css`

## Validación realizada

- 100 archivos JavaScript/JSX/TypeScript analizados: **0 errores de sintaxis**.
- 13 archivos CSS analizados con PostCSS: **0 errores de sintaxis CSS**.
- El paquete final no contiene `.env`, `node_modules`, `.git` ni artefactos de compilación.

## Nota de entorno

No se ejecutó la compilación completa de Hydrogen porque la instalación de dependencias no finalizó dentro del entorno de entrega. Antes de iniciar el proyecto, ejecuta `npm install` o `npm ci` en tu equipo.
