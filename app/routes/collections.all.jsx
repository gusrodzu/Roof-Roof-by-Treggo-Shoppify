import {redirect} from 'react-router';

export const meta = () => [{title: 'Todos los productos — Roof Roof'}];

export async function loader() {
  return redirect('/collections/roof-roof');
}

export default function AllProductsRedirect() {
  return null;
}
