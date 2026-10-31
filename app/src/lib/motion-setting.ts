import { useEffect, useSyncExternalStore } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * The "Motion" switch in the top-bar settings (gear). Off = background video paused on its poster, no embers,
 * shorter animations. Stored per visitor; the OS "reduce motion" setting turns it off too.
 */
const KEY = 'dameo-motion';
const listeners = new Set<() => void>();
let motionOn = true;

function read() {
  try {
    return localStorage.getItem(KEY) !== 'off';
  } catch {
    return true;
  }
}

export function setMotion(on: boolean) {
  motionOn = on;
  try {
    localStorage.setItem(KEY, on ? 'on' : 'off');
  } catch {
    /* private mode: keep it for this visit only */
  }
  document.documentElement.dataset.motion = on ? 'on' : 'off';
  listeners.forEach((l) => l());
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

/** [motion setting on?, setter]. Always "on" during pre-rendering and the first paint, then the saved value. */
export function useMotionSetting(): [boolean, (on: boolean) => void] {
  const on = useSyncExternalStore(subscribe, () => motionOn, () => true);
  useEffect(() => {
    const saved = read();
    if (saved !== motionOn) setMotion(saved);
    else document.documentElement.dataset.motion = saved ? 'on' : 'off';
  }, []);
  return [on, setMotion];
}

/** true when animations should be kept to a minimum (OS setting or the in-site switch). */
export function useCalmMotion(): boolean {
  const reduced = useReducedMotion();
  const [on] = useMotionSetting();
  return !!reduced || !on;
}
