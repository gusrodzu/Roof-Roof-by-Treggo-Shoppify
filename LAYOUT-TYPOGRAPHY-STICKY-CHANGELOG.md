# Roof Roof — corrección de layout, tipografía y elementos sticky

## Problemas corregidos

- Se normalizó el sistema de paddings, gaps y anchos máximos de los contenedores.
- Se anuló el quiebre agresivo de palabras que provocaba textos verticales o deformados.
- Se definieron pesos y escalas fluidas para títulos, subtítulos, textos, etiquetas y botones.
- Se reforzó el contraste de texto blanco dentro de superficies oscuras.
- Los grids con uno o dos elementos ahora utilizan correctamente todo el ancho disponible.
- Se eliminaron transformaciones visuales que podían generar traslapes entre cards.

## Página de producto

- La columna de galería queda sticky en escritorio.
- La fotografía, miniaturas y el bloque Compra Protegida permanecen juntos mientras se desplaza la información del producto.
- La columna de información deja de ser sticky y se mueve con la navegación.
- Se compactó la galería para que pueda permanecer visible dentro de la altura útil del viewport.
- Se corrigieron paddings, radios, tamaños de miniaturas y jerarquía del bloque Compra Protegida.
- En tablet y móvil se conserva un flujo vertical para evitar bloqueos o recortes.

## Colecciones

- La barra de filtros, ordenamiento y cambio de vista queda sticky debajo del header.
- El sidebar de filtros permanece sticky en escritorio y cuenta con scroll interno controlado.
- Se corrigieron ancestros con overflow o transformaciones que podían impedir `position: sticky`.
- Se reajustó el espacio del toolbar y la jerarquía del título y conteo de resultados.

## Sistema añadido

- `app/styles/layout-quality-system.css`
- Importado al final de `app/root.jsx` para evitar que capas antiguas vuelvan a sobrescribir estas correcciones.

## Validación

- 22 archivos CSS analizados sin errores de sintaxis.
- Imports locales revisados: 0 referencias rotas.
- No se modificó la lógica de Shopify, GraphQL, carrito ni rutas.
