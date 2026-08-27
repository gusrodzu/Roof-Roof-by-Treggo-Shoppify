# Roof Roof — Shopify Hydrogen

Storefront headless de Roof Roof construido con Shopify Hydrogen, React Router y la Storefront API.

## Requisitos

- Node.js 22 o 24.
- Una tienda Shopify con Storefront API y Customer Account API configuradas.
- Variables de entorno basadas en `.env.example`.

## Instalación

```bash
npm install
cp .env.example .env
npm run dev
```

En Windows, crea manualmente `.env` a partir de `.env.example` cuando el comando `cp` no esté disponible.

## Validación y producción

```bash
npm run lint
npm run build
npm run preview
```

## Experiencia comercial

La tienda incluye:

- Catálogo Roof Roof por casas, camas, jaulas, corrales y dispensadores.
- Selector interactivo de productos.
- Guía de medidas y tallas.
- Centro de cuidado y checklist para una nueva mascota.
- Área de cuenta con resumen, pedidos, perfil y direcciones.
- Formulario preliminar de contacto para preparar solicitudes por correo.
- Comparador de productos, búsqueda, filtros, carrito y checkout de Shopify.
- Sitemaps de Shopify y sitemap adicional para las rutas editoriales propias.

## Rutas nuevas principales

```text
/pages/selector-de-productos
/pages/guia-de-tallas
/pages/centro-de-cuidado
/pages/beneficios-roof
/pages/nueva-mascota
```

## Variables de entorno

No publiques el archivo `.env`. El paquete incluye únicamente `.env.example` como referencia.

## Documentación de cambios

- `UX-UI-CHANGELOG.md`: primera etapa de mejora visual y funcional.
- `COMPETITIVE-UX-CHANGELOG.md`: arquitectura competitiva, páginas nuevas y experiencia guiada.
