import {UnavailablePage} from '~/components/UnavailablePage';

export const meta = () => [
  {title: 'Blog — Próximamente | Roof Roof'},
  {name: 'robots', content: 'noindex, follow'},
];

export default function BlogsComingSoonPage() {
  return (
    <UnavailablePage
      title="El blog de Roof Roof llegará próximamente"
      description="Estamos preparando guías prácticas y contenido útil para ayudarte a elegir, instalar y cuidar mejor los productos de tu mascota."
      primaryLabel="Visitar centro de cuidado"
      primaryTo="/pages/centro-de-cuidado"
      secondaryLabel="Ver preguntas frecuentes"
      secondaryTo="/pages/ayuda"
    />
  );
}
