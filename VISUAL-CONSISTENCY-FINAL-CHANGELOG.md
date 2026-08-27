# Correcciones visuales integrales

## Problemas corregidos

- Se eliminaron cortes agresivos de palabras provocados por `overflow-wrap: anywhere` y `hyphens: auto` en títulos, botones y encabezados.
- Los títulos sobre superficies oscuras ahora utilizan blanco cálido con contraste estable.
- Se corrigió el título de la página de ayuda dentro del hero oscuro.
- Se corrigió el título de la tarjeta oscura de “Nuestra filosofía”.
- Se corrigió el banner de “Tu espacio Roof” para que sus encabezados y contenido sean legibles.
- El bloque “Más orientación, menos compras a ciegas” ya no divide palabras ni deja una columna excesivamente estrecha.
- Las cards de “Nueva mascota” cambian a una columna real en móvil y conservan dos columnas equilibradas en desktop.
- Los CTA de cards de producto se apilan para evitar textos comprimidos.
- El footer ahora tiene columnas con ancho mínimo suficiente y títulos blancos que no se cortan palabra por palabra.
- La navegación secundaria admite scroll horizontal controlado sin comprimir enlaces.
- Los banners promocionales conservan espacio respecto a la navegación móvil fija.
- Se normalizaron pesos tipográficos para headings, cuerpo y botones.

## Archivo central añadido

- `app/styles/visual-consistency-final.css`

La hoja se carga al final de la cascada para funcionar como fuente de verdad de contraste, tipografía y distribución.

## Archivos modificados

- `app/root.jsx`
- `app/styles/visual-consistency-final.css`
- `app/styles/FaqPage.module.css`
- `app/styles/AboutSection.module.css`

## Validación

- 24 archivos CSS analizados con `tinycss2`.
- 0 errores de parseo CSS.
- No se modificaron GraphQL, carrito, checkout ni rutas.
