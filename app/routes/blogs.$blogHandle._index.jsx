import {UnavailablePage} from '~/components/UnavailablePage';

export const meta = () => [
  {title: 'Blog — Próximamente | Roof Roof'},
  {name: 'robots', content: 'noindex, follow'},
];

export function loader() {
  return {blocked: true};
}

export default function BlogComingSoonPage() {
  return (
    <UnavailablePage
      title="El blog de Roof Roof llegará próximamente"
      description="Esta sección está bloqueada mientras desarrollamos una biblioteca de contenidos realmente útil para las familias y sus mascotas."
      primaryLabel="Visitar centro de cuidado"
      primaryTo="/pages/centro-de-cuidado"
      secondaryLabel="Ver preguntas frecuentes"
      secondaryTo="/pages/ayuda"
    />
  );
}
