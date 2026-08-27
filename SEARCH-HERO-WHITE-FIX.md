# Corrección del hero de búsqueda

- Se identificó que la capa global de títulos negros estaba sobrescribiendo el color definido en `SearchPage.module.css`.
- Se marcó el hero de búsqueda con `data-theme="dark"` para integrarlo al sistema global de contraste.
- Se añadió un fallback local específico para mantener en blanco:
  - `Búsqueda Roof Roof`
  - `Resultados para “...”`
  - El término buscado dentro del título.
- No se modificó la lógica de búsqueda ni las consultas de Shopify.
