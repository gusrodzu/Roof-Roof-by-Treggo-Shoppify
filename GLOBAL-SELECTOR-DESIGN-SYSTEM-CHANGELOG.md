# Sistema visual global basado en el selector

## Objetivo

Convertir el lenguaje visual de `/pages/selector-de-productos#selector` en el sistema dominante de toda la tienda Roof Roof, eliminando diferencias entre componentes heredados y páginas nuevas sin modificar la lógica de Shopify.

## Fuente de verdad visual

El selector define ahora los patrones principales del proyecto:

- superficies blanco cálido y crema;
- bordes oscuros consistentes de 2 px;
- radios amplios y uniformes;
- sombras desplazadas controladas;
- naranja como color de interacción, selección y foco;
- botones tipo píldora con jerarquía clara;
- estados activos, hover, foco y deshabilitado consistentes;
- formularios y opciones de selección con el mismo comportamiento visual.

## Áreas actualizadas

- Header, buscador, navegación principal, navegación móvil y drawers.
- Hero, módulos editoriales, tarjetas promocionales y secciones de inicio.
- Cards de producto, colección, contenido, beneficios, recomendaciones y estados vacíos.
- Página de colecciones, filtros, chips, ordenamiento y paginadores.
- Página de producto, variantes, cantidad, agregar al carrito y comprar ahora.
- Carrito completo, carrito lateral, líneas de producto, descuentos y resumen.
- Buscador, búsqueda predictiva y resultados.
- Selector de productos, formularios, radios, checkbox, switch, tabs y controles de cantidad.
- Comparador, recomendaciones, avisos, breadcrumbs y navegación inferior móvil.
- Footer, errores, estados bloqueados y páginas heredadas de cuenta.

## Arquitectura CSS

Se amplió `app/styles/selector-system.css` como capa global cargada al final del sistema de estilos. Esto permite que los componentes compartan tokens y patrones desde un solo punto, conservando los CSS Modules cuando una página necesita composición específica.

También se añadieron clases semánticas a componentes que dependían principalmente de estilos inline, para que puedan responder al sistema global sin alterar su lógica.

## Archivos principales modificados

- `app/root.jsx`
- `app/styles/selector-system.css`
- `app/styles/AboutSection.module.css`
- `app/styles/FaqPage.module.css`
- `app/styles/UnavailablePage.module.css`
- componentes de header, hero, cards, formularios, búsqueda, producto, carrito, comparador y navegación móvil;
- rutas de búsqueda, políticas y páginas informativas.

## Integridad funcional

No se modificaron:

- consultas GraphQL;
- acciones del carrito;
- lógica de Shopify Hydrogen;
- autenticación;
- rutas comerciales existentes;
- estructura de datos de productos o colecciones.

## Validación

- ESLint: cero errores y cero advertencias en `app`.
- Prettier: todos los archivos de `app` cumplen el formato.
- La compilación de Hydrogen no pudo completarse dentro de este entorno porque las dependencias heredadas no incluyen el binding nativo de Rolldown para Linux. El fallo ocurre antes de procesar el código del proyecto y debe resolverse instalando dependencias nuevamente en la máquina de destino.
