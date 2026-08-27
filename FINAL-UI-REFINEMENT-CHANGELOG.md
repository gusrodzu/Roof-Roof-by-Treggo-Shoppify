# Roof Roof — Ajustes finales de interfaz

## Productos y colecciones

- El grid de productos mantiene tarjetas de tamaño normal aunque una colección sólo tenga uno o dos resultados.
- Desktop amplio utiliza cuatro columnas, laptop tres, tablet/móvil dos y pantallas muy estrechas una.
- Se eliminó el efecto circular que cubría la imagen al pasar el cursor.
- La vista rápida ahora aparece únicamente como un botón compacto centrado sobre la fotografía.
- La barra superior de la colección y el sidebar de filtros permanecen visibles durante el scroll en desktop.

## Iconografía

- Se centraron geométricamente los iconos dentro de cuadros y contenedores.
- Se normalizó la alineación de SVG en cards, guías, beneficios, filtros y módulos informativos.

## Centro de cuidado y banners

- Los heroes de páginas informativas ya no llegan al borde de la pantalla.
- Se añadieron márgenes laterales, padding fluido y ancho máximo consistente.
- El panel naranja del Centro de cuidado conserva una composición equilibrada en desktop, tablet y móvil.

## Trustbar

- Se eliminó el carrusel automático y sus indicadores.
- La barra ahora es compacta, estática y utiliza el mismo ancho que los módulos inferiores.
- Desktop muestra cuatro beneficios; móvil los organiza en una cuadrícula 2 × 2.

## Badges y contraste

- Badges celestes y amarillos ahora utilizan texto negro.
- Badges rojos de “Próximamente” conservan texto blanco.
- Se corrigió el contraste de títulos en el bloque “¿Por qué elegir Roof Roof?” y en superficies oscuras.

## Footer

- Se corrigieron títulos negros sobre fondo oscuro.
- Se normalizaron tamaños, pesos y saltos de línea.
- Las columnas tienen anchos mínimos adecuados para evitar encabezados partidos palabra por palabra.

## Archivos principales modificados

- `app/components/Header.jsx`
- `app/routes/collections.$handle.jsx`
- `app/root.jsx`
- `app/styles/final-visual-tuning.css`

## Validación

- JSX analizado con el parser de TypeScript sin errores de sintaxis.
- Llaves y paréntesis CSS verificados.
- No se modificaron consultas GraphQL, rutas, acciones del carrito ni checkout.
