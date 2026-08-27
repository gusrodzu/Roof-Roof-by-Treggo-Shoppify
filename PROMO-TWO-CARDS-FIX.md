# Corrección: Lo que necesita, cuando lo necesita

## Problema encontrado

El grid responsive global agrupaba `.rr-promo-grid` con módulos de cuatro columnas. Aunque el componente contenía únicamente dos banners, cada card ocupaba una de cuatro columnas y dejaba vacía la mitad derecha del contenedor.

## Correcciones

- Se retiraron los estilos inline de `PromoBanners.jsx`.
- Se creó la variante específica `rr-promo-grid--two`.
- Desktop y tablet muestran dos columnas iguales utilizando el 100% del contenedor.
- Móvil muestra una columna a ancho completo, sin carrusel estrecho ni cards recortadas.
- Ambas cards tienen la misma altura, proporción y alineación.
- Se ajustaron imagen, overlay, badge y CTA para escalar de forma fluida.
- Se eliminó el footer vacío que dependía de propiedades inexistentes.
- La card completa funciona como enlace, evitando controles interactivos anidados.
- Se conservan las rutas y la lógica existente.

## Archivos modificados

- `app/components/PromoBanners.jsx`
- `app/styles/layout-quality-system.css`
