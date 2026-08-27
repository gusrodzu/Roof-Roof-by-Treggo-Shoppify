import {useCallback, useSyncExternalStore} from 'react';

/**
 * SSR-safe media-query hook with one shared subscription pattern.
 * The server value stays false so responsive presentation remains CSS-first.
 */
export function useMediaQuery(query, serverValue = false) {
  const subscribe = useCallback(
    (onStoreChange) => {
      if (typeof window === 'undefined') return () => {};
      const media = window.matchMedia(query);
      media.addEventListener('change', onStoreChange);
      return () => media.removeEventListener('change', onStoreChange);
    },
    [query],
  );

  const getSnapshot = useCallback(() => {
    if (typeof window === 'undefined') return serverValue;
    return window.matchMedia(query).matches;
  }, [query, serverValue]);

  const getServerSnapshot = useCallback(() => serverValue, [serverValue]);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
