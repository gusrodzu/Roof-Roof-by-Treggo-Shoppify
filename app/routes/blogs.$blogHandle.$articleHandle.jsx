import {UnavailablePage} from '~/components/UnavailablePage';

export const meta = () => [
  {title: 'Contenido — Próximamente | Roof Roof'},
  {name: 'robots', content: 'noindex, follow'},
];

export function loader() {
  return {blocked: true};
}

export default function ArticleComingSoonPage() {
  return (
    <UnavailablePage
      title="Este contenido todavía no está disponible"
      description="Estamos revisando la información antes de publicarla para mantener una experiencia clara, útil y consistente con Roof Roof."
      primaryLabel="Visitar centro de cuidado"
      primaryTo="/pages/centro-de-cuidado"
      secondaryLabel="Volver al catálogo"
      secondaryTo="/collections/roof-roof"
    />
  );
}
