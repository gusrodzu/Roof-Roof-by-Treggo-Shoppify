# Carrito lateral corregido

## Problemas detectados

- El bloque de productos crecía innecesariamente cuando había uno o pocos artículos.
- El resumen tenía un scroll interno adicional.
- Existían dos o tres zonas de desplazamiento simultáneas dentro del drawer.
- El espacio disponible no se repartía correctamente entre productos y resumen.
- Algunos títulos, importes y controles podían comprimirse demasiado.

## Correcciones

- El drawer utiliza ahora una estructura estable de tres filas: encabezado de productos, lista desplazable y resumen fijo.
- La lista de productos es la única zona con scroll interno.
- Se eliminó el borde del contenedor vacío que provocaba una tarjeta excesivamente alta.
- El resumen dejó de utilizar `max-height` y scroll independiente.
- Se compactaron subtotal, envío, total, botones, pago seguro y descuento.
- Las cards de producto aprovechan mejor el ancho del panel.
- Título, precio, cantidad y botón eliminar mantienen palabras e importes completos.
- Se mejoraron los estados para móvil, teléfonos estrechos y pantallas con poca altura.
- El panel ocupa todo el ancho en móvil y conserva un ancho cómodo en desktop.

## Archivos modificados

- `app/root.jsx`
- `app/components/CartMain.jsx`
- `app/components/CartSummary.jsx`
- `app/styles/cart-aside-polish.css`

No se modificaron las acciones del carrito, GraphQL ni el checkout de Shopify.
