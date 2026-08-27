# Corrección general de interfaz — Roof Roof

Fecha: 27 de agosto de 2026

## Cambios principales

- Reset global neutral para evitar que `section`, `form`, títulos e inputs hereden márgenes o anchos que rompan la composición.
- Sistema uniforme de contenedores, gutters, paddings, radios, sombras y alturas mínimas de controles.
- Header móvil corregido: logo, textos, botones y buscador permanecen dentro del viewport desde 320 px.
- Grid de colecciones adaptable al número de resultados:
  - 3 columnas en escritorio.
  - 2 columnas en tablet.
  - 1 columna en móvil.
  - Las colecciones con 2 resultados ocupan toda el área disponible.
  - Una sola card conserva un ancho legible.
- Cards de colección normalizadas: misma altura, imagen proporcional, títulos de dos líneas, precio y acciones alineados.
- Estado agotado visible y con la misma altura que las acciones de compra.
- Toolbar, filtros, ordenamiento y comportamiento sticky corregidos.
- Banner de Centro de cuidado y selector reducido y equilibrado.
- Cards informativas, secciones de marca y CTAs con espaciado responsive consistente.
- Página de producto: galería, información, assurance card, relacionados y barra de compra móvil ajustados.
- Carrito lateral: un solo scroll, cabecera alineada, estado vacío centrado y sin contenedor excesivo.
- Footer, bottom navigation, formularios y estados de foco mejorados.
- Compatibilidad con `prefers-reduced-motion`.

## Archivos principales modificados

- `app/styles/reset.css`
- `app/styles/final-visual-stability.css`
- `app/routes/collections.$handle.jsx`

## Instalación

```bash
npm install
npm run dev
```

El ZIP no incluye `node_modules`.
