# Correcciones de QA visual y móvil

## Problemas corregidos

### Selector de productos
- Se eliminó el comportamiento `sticky` de los botones dentro del selector móvil.
- La tarjeta de resultado ya no reserva altura vacía debajo de sus acciones.
- Se normalizaron altura, padding y flujo de las tarjetas de pregunta y resultado.
- El ancla `#selector` ahora respeta el header fijo y no oculta el título de la pregunta.
- Se eliminaron los gutters duplicados que estrechaban el contenido en móvil.

### Header móvil
- El header ocupa el ancho real del viewport.
- Logo, nombre, botones y buscador se reparten mediante una cuadrícula estable.
- Se añadieron ajustes para pantallas de 380 px o menos.
- El buscador ya no provoca desbordamiento horizontal.

### Drawer de filtros
- El estado abierto/cerrado ahora depende de la clase `.is-open`, no de detectar texto dentro del atributo `style`.
- El panel aparece como bottom sheet visible, por encima del overlay y de la navegación móvil.
- Header y footer permanecen estables; sólo el cuerpo de filtros se desplaza.

### Carrito lateral
- Se eliminó la fila flexible que generaba un vacío grande entre el producto y el resumen.
- Productos y resumen siguen un flujo vertical natural.
- El panel completo tiene un solo scroll.
- En móvil el carrito ocupa todo el ancho del viewport.
- Se conservaron la lógica del carrito, cantidades, eliminación y checkout.

### Filosofía y footer
- Los títulos de la tarjeta oscura de filosofía quedan en blanco cálido.
- El texto secundario y la firma recuperan el contraste correcto.
- Los headings del footer ya no heredan el sistema global de títulos negros y grandes.
- Las columnas del footer tienen anchos mínimos y saltos de línea naturales.

## Archivos principales modificados
- `app/root.jsx`
- `app/routes/collections.$handle.jsx`
- `app/styles/AboutSection.module.css`
- `app/styles/viewport-qa-repair.css`

## Validación
- CSS nuevo y CSS Module analizados con `tinycss2` sin errores de sintaxis.
- Imports locales revisados.
- No se modificaron consultas GraphQL ni acciones de Shopify.
