# Correcciones visuales — Roof Roof

## Problemas corregidos

### Vista rápida
- Se corrigió la regla `inset` que anulaba `top: 50%` y `left: 50%`.
- El modal ahora se centra realmente respecto al viewport en desktop, tablet y móvil.
- Se ajustaron ancho máximo, altura, scroll interno y áreas seguras.

### Carrito lateral
- Se corrigió el conflicto que convertía cada producto en un grid externo demasiado estrecho.
- La imagen, título, precio, variantes y controles de cantidad ahora mantienen una estructura estable.
- Se evitó que precios y títulos se escribieran verticalmente.
- Se reforzó el ancho del panel y su comportamiento en móvil.

### Descubre lo nuevo
- El módulo fue reconstruido para mostrar exactamente tres cards.
- Se retiraron el banner y elementos secundarios del módulo.
- Las tres cards quedan perfectamente centradas y con igual altura.
- Desktop muestra tres columnas; tablet y móvil muestran una columna centrada.
- Se eliminaron los conflictos con antiguos carruseles y grids globales.

### Barra de confianza
- Se eliminó el carrusel automático y los indicadores deformados.
- Los cuatro beneficios se muestran de forma estática y legible.
- En móvil se utiliza una cuadrícula compacta de dos columnas.
- Se sustituyeron promesas rígidas por mensajes dependientes de cobertura.

### Bloque de cuenta futura
- Se corrigió el contraste de los títulos sobre el fondo oscuro.
- Se reparó el ancho de las columnas y el panel de beneficios.
- En tablet cambia a una estructura de una columna.
- En la experiencia móvil tipo app se oculta para reducir ruido visual.

## Validación
- ESLint ejecutado sobre todo `app`: 0 errores y 0 advertencias.
- Archivos modificados formateados con Prettier.
- CSS modificado analizado correctamente con PostCSS.
- No se modificaron consultas GraphQL, acciones del carrito ni rutas de Shopify.
