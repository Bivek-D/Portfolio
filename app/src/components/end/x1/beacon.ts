import { useSyncExternalStore } from 'react';
import { JFJ_HEALTH } from '@/data/end';

/**
 * The roof beacon: one request per visit to JFJ's health endpoint, shared by everything that shows it.
 * Render's free tier sleeps, so after a few seconds the beacon says "waking" and waits up to 75 s before giving up.
 * The request is `no-cors` (the API doesn't need to allow this site): any answer at all means the server is up.
 */
export type BeaconState = { state: 'checking' | 'waking' | 'up' | 'down'; ms?: number };

const SERVER: BeaconState = { state: 'checking' };
let snap: BeaconState = SERVER;
const subs = new Set<() => void>();
let started = false;

function set(next: BeaconState) {
  snap = next;
  subs.forEach((f) => f());
}

function start() {
  if (started || typeof window === 'undefined') return;
  started = true;
  const t0 = performance.now();
  let done = false;
  const wake = window.setTimeout(() => !done && set({ state: 'waking' }), 2500);
  const ctrl = new AbortController();
  const kill = window.setTimeout(() => ctrl.abort(), 75000);
  fetch(JFJ_HEALTH, { mode: 'no-cors', cache: 'no-store', signal: ctrl.signal })
    .then(() => set({ state: 'up', ms: Math.round(performance.now() - t0) }))
    .catch(() => set({ state: 'down' }))
    .finally(() => {
      done = true;
      window.clearTimeout(wake);
      window.clearTimeout(kill);
    });
}

export function useBeacon(): BeaconState {
  return useSyncExternalStore(
    (cb) => {
      subs.add(cb);
      start();
      return () => subs.delete(cb);
    },
    () => snap,
    () => SERVER,
  );
}

export function beaconLabel(b: BeaconState) {
  if (b.state === 'up') return `JFJ API up · ${b.ms} ms`;
  if (b.state === 'waking') return 'JFJ API waking up…';
  if (b.state === 'down') return 'JFJ API asleep right now';
  return 'Checking the JFJ API…';
}
