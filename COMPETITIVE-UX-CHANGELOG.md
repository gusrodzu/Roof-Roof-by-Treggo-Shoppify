# Roof Roof — Etapa competitiva de marca y comercio

## Objetivo

Evolucionar Roof Roof de una tienda visualmente cuidada a una experiencia de comercio especializada que pueda competir con retailers grandes mediante orientación, claridad, confianza y continuidad de compra.

La implementación no intenta copiar a Petco ni presentar servicios que Roof Roof todavía no ofrece. La ventaja propuesta es una experiencia más enfocada en elegir correctamente espacios y accesorios para mascotas.

## Nueva arquitectura comercial

### Inicio

- Se eliminó el popup de bienvenida que prometía un descuento sin una integración real de email marketing.
- Se incorporó una sección de compra guiada con acceso a selector, guía de medidas, centro de cuidado y beneficios de cuenta.
- Se añadió navegación por necesidad: descanso, protección exterior, espacios seguros y alimentación.
- Se conservaron los módulos comerciales existentes de productos, promociones, etapas de vida e información de marca.

### Header, navegación y footer

- Nueva barra secundaria de categorías y servicios en escritorio.
- Accesos rápidos a catálogo, asesoría y cuenta.
- Menú móvil reorganizado alrededor de categorías, guías, ayuda y marca.
- Se reemplazaron promesas rígidas de entrega y soporte por mensajes dependientes de cobertura y canales reales.

## Nuevas páginas y rutas

- `/pages/selector-de-productos`: selector interactivo de tres pasos por tamaño, espacio y necesidad.
- `/pages/guia-de-tallas`: método de medición y tabla de criterios por categoría.
- `/pages/centro-de-cuidado`: hub de contenidos sobre descanso, seguridad, exterior, alimentación y adaptación.
- `/pages/beneficios-roof`: funciones reales de cuenta y hoja de ruta transparente para futuras integraciones.
- `/pages/nueva-mascota`: checklist de preparación del hogar y primeros días.

## Colecciones y producto

- Cada colección incluye ahora un bloque de orientación específico para su categoría.
- Se conectaron las colecciones con el selector y la guía de medidas.
- Las fichas de producto incluyen una llamada contextual para confirmar dimensiones antes de comprar.
- Se añadió marcado estructurado JSON-LD de producto para mejorar la interpretación por buscadores.
- Se corrigió el marcado de las tarjetas para evitar formularios y botones interactivos dentro de un enlace completo.
- Los botones de agregar y comprar conservan la acción del formulario y ya no cancelan accidentalmente el envío.

## Cuenta de cliente

- `/account` deja de enviar directamente al historial de pedidos.
- Se añadió un dashboard con accesos a pedidos, perfil, direcciones, catálogo, selector y beneficios.
- La navegación de cuenta incluye una vista de resumen.

## SEO técnico

- Las nuevas rutas editoriales y comerciales se agregaron a un sitemap estático conectado al índice principal.
- Se conservaron los sitemaps generados por Hydrogen para productos, colecciones, páginas y artículos de Shopify.
- Las nuevas páginas tienen títulos y metadescripciones específicos.

## Funciones deliberadamente no simuladas

No se implementaron ni se anuncian como activas las siguientes funciones porque necesitan configuración comercial, datos o aplicaciones adicionales:

- Programa de puntos o recompensas.
- Suscripciones o recompra automática.
- Favoritos sincronizados con la cuenta.
- Perfil persistente de mascotas.
- Servicios físicos como veterinaria, grooming o entrenamiento.
- Descuentos B2B automáticos o disponibilidad garantizada para proyectos.

Estas opciones quedaron planteadas únicamente como evolución futura en la página de beneficios.

## Archivos principales intervenidos

- `app/root.jsx`
- `app/routes/_index.jsx`
- `app/components/Header.jsx`
- `app/components/Footer.jsx`
- `app/components/RetailExperience.jsx`
- `app/components/ExperienceIcon.jsx`
- `app/styles/experience.css`
- `app/routes/collections.$handle.jsx`
- `app/routes/products.$handle.jsx`
- `app/routes/cart.jsx`
- `app/routes/account.jsx`
- `app/routes/account._index.jsx`
- `app/routes/[sitemap.xml].jsx`
- `app/routes/sitemap.$type.$page[.xml].jsx`
- Las seis rutas nuevas dentro de `app/routes/pages.*.jsx`.

## Validación

- Prettier aplicado y validado en todo el directorio `app`.
- ESLint ejecutado sobre todo el directorio `app`: cero errores y cero advertencias.
- Se corrigieron 32 errores y 5 advertencias heredadas de la versión anterior, principalmente imports sin uso, claves inestables y controles con accesibilidad incompleta.
- La compilación completa no puede terminar dentro de este entorno porque el `node_modules` original fue creado en otra plataforma y no contiene el binario nativo Linux opcional de Rolldown.
- El paquete final no incluye `node_modules` ni `.env`. En el equipo de desarrollo se debe ejecutar `npm install` o `npm ci` antes de `npm run build`.
