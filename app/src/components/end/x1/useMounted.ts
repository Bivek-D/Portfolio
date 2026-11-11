import { useSyncExternalStore } from 'react';

const noop = () => () => {};

/** false during the server render and hydration, true afterwards (for portals and browser-only bits). */
export function useMounted() {
  return useSyncExternalStore(noop, () => true, () => false);
}
