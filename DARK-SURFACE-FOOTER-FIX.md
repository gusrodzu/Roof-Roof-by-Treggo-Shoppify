# Corrección de contraste y footer

## Problemas corregidos

- El título “Productos con propósito…” aparecía negro sobre el bloque marrón oscuro.
- El texto secundario y la firma del bloque de filosofía no conservaban una jerarquía de contraste estable.
- Los títulos del footer eran sobrescritos por la capa global de títulos negros.
- Los encabezados “Comprar”, “Te ayudamos a elegir” y “Roof Roof” utilizaban tamaños demasiado grandes y se partían palabra por palabra.
- La cuadrícula del footer dejaba columnas demasiado estrechas en ciertos anchos de escritorio.

## Cambios

- El bloque editorial de filosofía ahora se identifica explícitamente como superficie oscura.
- Título principal del bloque en blanco cálido y acento final en naranja.
- Ritmo vertical más compacto dentro del bloque editorial.
- Nueva capa final `app/styles/surface-contrast-footer.css` cargada después del resto de estilos.
- Footer reorganizado con columnas mínimas más amplias y breakpoints específicos.
- Títulos del footer con tamaño compacto, color amarillo cálido y saltos de línea naturales.
- Links, badges, textos secundarios y redes sociales con contraste consistente.
- Footer móvil conserva el formato de acordeones y mejora su legibilidad.

## Archivos modificados

- `app/components/AboutSection.jsx`
- `app/root.jsx`
- `app/styles/surface-contrast-footer.css`
