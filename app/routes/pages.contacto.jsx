import {UnavailablePage} from '~/components/UnavailablePage';

export const meta = () => [
  {title: 'Contacto — Próximamente | Roof Roof'},
  {
    name: 'description',
    content: 'El nuevo centro de contacto de Roof Roof está en preparación.',
  },
  {name: 'robots', content: 'noindex, follow'},
];

export default function ContactComingSoonPage() {
  return (
    <UnavailablePage
      title="Nuestro centro de contacto está en preparación"
      description="Estamos definiendo los canales, horarios y procesos de atención para ofrecerte respuestas claras desde el primer mensaje."
      primaryLabel="Consultar preguntas frecuentes"
      primaryTo="/pages/ayuda"
    />
  );
}
