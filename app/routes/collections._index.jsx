import {redirect} from 'react-router';

export const meta = () => [{title: 'Colecciones — Roof Roof'}];

export async function loader() {
  return redirect('/collections/roof-roof');
}

export default function CollectionsIndex() {
  return null;
}
