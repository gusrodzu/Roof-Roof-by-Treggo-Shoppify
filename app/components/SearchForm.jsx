import {useRef, useEffect} from 'react';
import {Form} from 'react-router';

/**
 * Formulario de búsqueda para la ruta /search
 * Soporta Cmd+K para enfocar y Escape para desenfocar
 * @param {SearchFormProps}
 */
export function SearchForm({children, ...props}) {
  const inputRef = useRef(null);

  useFocusOnCmdK(inputRef);

  if (typeof children !== 'function') return null;

  return (
    <Form method="get" {...props}>
      {children({inputRef})}
    </Form>
  );
}

function useFocusOnCmdK(inputRef) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'k' && event.metaKey) {
        event.preventDefault();
        inputRef.current?.focus();
      }
      if (event.key === 'Escape') {
        inputRef.current?.blur();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [inputRef]);
}

/** @typedef {import('react-router').FormProps} FormProps */
/**
 * @typedef {Omit<FormProps, 'children'> & {
 *   children: (args: { inputRef: React.RefObject<HTMLInputElement> }) => React.ReactNode;
 * }} SearchFormProps
 */