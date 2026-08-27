# Roof Roof — Mejora integral UX/UI

## Alcance aplicado

- Nueva capa visual global en `app/styles/storefront.css`, basada en los colores, tipografía, formas y personalidad existentes de Roof Roof.
- Header optimizado con mejor jerarquía, buscador, foco visible, sombras y comportamiento responsive.
- Footer completamente renovado y disponible también en móvil, con navegación, beneficios, redes sociales y enlaces legales dinámicos.
- Página de colección mejorada: filtros, barra de herramientas, selector de vista, ordenamiento, estados vacíos, tarjetas, listado y paginación.
- Página de producto mejorada: galería, miniaturas, bloque de compra, variantes, cantidad, mensajes de confianza, descripción y productos relacionados.
- Página de carrito mejorada: estado vacío, listado, resumen sticky, beneficios y adaptación móvil.
- Tarjeta de producto reutilizable rediseñada para catálogo, recomendaciones y rutas heredadas.
- Paginador unificado y accesible para productos, blogs y cuenta.
- Estilos profesionales para páginas de contenido, blog y área de cliente.
- Mejoras de accesibilidad: enlace para saltar al contenido, foco visible, navegación interna con React Router, estados disabled y soporte de movimiento reducido.

## Correcciones funcionales

- `/collections` y `/collections/all` redirigen al catálogo real `/collections/roof-roof`.
- “Comprar ahora” redirige a la URL de checkout creada por Shopify, no a una ruta interna inexistente.
- Los botones de carrito dentro de tarjetas ya no activan accidentalmente la navegación hacia el producto.
- Los estilos del drawer ahora están limitados a `.overlay aside`; ya no afectan la barra lateral de filtros.
- Se eliminó un carácter residual del Footer y se simplificó su estructura.
- Breadcrumbs y enlaces internos usan navegación cliente de React Router.
- Se corrigió el tipo MIME del favicon.
- El dominio de checkout usa `PUBLIC_STORE_DOMAIN` como fallback cuando `PUBLIC_CHECKOUT_DOMAIN` no está definido.
- Se añadió `.env.example` sin datos sensibles.

## Validación realizada

- Parseo correcto de los 88 archivos JavaScript/JSX del directorio `app`.
- ESLint sin errores ni advertencias en todos los archivos modificados.
- Prettier aplicado a los archivos intervenidos.
- La compilación completa no pudo ejecutarse dentro del entorno de revisión porque el ZIP original incluía un `node_modules` sin el binario nativo Linux de Rolldown. El paquete entregado excluye `node_modules`; una instalación limpia descargará el binario correcto para Windows, macOS o Linux.

## Puesta en marcha

1. Copia `.env.example` como `.env` y agrega las credenciales de tu tienda.
2. Ejecuta `npm install` o `npm ci` en tu equipo.
3. Ejecuta `npm run dev` para revisar la tienda.
4. Ejecuta `npm run build` antes de desplegar.
