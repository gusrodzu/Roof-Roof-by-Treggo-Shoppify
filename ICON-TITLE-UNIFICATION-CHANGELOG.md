# Iconos y títulos unificados

## Cambios realizados

- Se centraron los iconos dentro de sus contenedores en cards, navegación, botones, formularios, footer, páginas informativas, selector, producto, carrito y estados vacíos.
- Se normalizó el render de SVG para evitar desalineación por la línea base del texto.
- Se agregaron contenedores consistentes para iconos de búsqueda y políticas.
- Se eliminaron los índices decorativos `01`, `02`, `03` del bloque **Nuestra filosofía**.
- Se eliminaron los contadores automáticos de las cards de pasos y procesos.
- El selector ya no muestra `Paso X de Y` ni `Pregunta X`; conserva su barra de progreso.
- Todos los títulos de superficies claras utilizan el color sólido `#17120F`.
- Los títulos sobre superficies oscuras utilizan blanco cálido sólido para mantener contraste.
- Los degradados anteriores de texto quedan anulados por la capa final del sistema.
- No se modificaron rutas, GraphQL, carrito, inventario ni acciones de Shopify.

## Archivo central agregado

- `app/styles/icon-title-system.css`
