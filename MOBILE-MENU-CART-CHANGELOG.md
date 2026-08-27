# Menú móvil y carrito

## Objetivo
Mejorar la separación visual y táctil entre la navegación móvil y el botón central del carrito.

## Cambios realizados

- Se reconstruyó la barra inferior móvil con una retícula de cinco columnas y un espacio central dedicado al carrito.
- El carrito ahora funciona como una acción flotante central, con mayor tamaño y separación respecto a los accesos laterales.
- Se añadió un contenedor interior tipo cápsula para que la navegación no ocupe visualmente todo el ancho de la pantalla.
- El botón **Más** recibió un tratamiento visual propio para identificar claramente el acceso al menú.
- Se mejoraron el espaciado, los radios, los estados activos, el foco por teclado y las áreas táctiles.
- Se reorganizaron labels, iconos y badge de “Próx.” para evitar sobreposición en pantallas estrechas.
- Se añadió un breakpoint específico para pantallas de hasta 360 px.
- Se optimizó el comportamiento en orientación horizontal y se respetan las áreas seguras de iPhone.
- Se retiraron estilos inline del componente `BottomNav` para centralizar el diseño en CSS.

## Archivos modificados

- `app/components/BottomNav.jsx`
- `app/styles/mobile-experience.css`

## Validación

- JSX analizado sin errores de sintaxis.
- CSS analizado sin errores de parseo.
- No se modificaron rutas, carrito, GraphQL ni lógica de Shopify.
