import {UnavailablePage} from '~/components/UnavailablePage';

export function shouldRevalidate() {
  return false;
}

export const meta = () => [
  {title: 'Mi cuenta — Próximamente | Roof Roof'},
  {name: 'robots', content: 'noindex, nofollow'},
];

export function loader() {
  return {blocked: true};
}

export default function AccountLayout() {
  return (
    <UnavailablePage
      title="Tu espacio Roof está en construcción"
      description="Estamos preparando una experiencia de cuenta con pedidos, direcciones y beneficios correctamente integrados antes de habilitar el acceso."
      primaryLabel="Continuar comprando"
      primaryTo="/collections/roof-roof"
      secondaryLabel="Consultar ayuda"
      secondaryTo="/pages/ayuda"
    />
  );
}
