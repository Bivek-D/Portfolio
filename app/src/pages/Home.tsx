import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import DimensionTransition from '@/components/DimensionTransition';
import Overworld from '@/sections/Overworld';
import Nether from '@/sections/Nether';
import TheEnd from '@/sections/TheEnd';
import { getDimension, type DimId } from '@/lib/dimensions';

const SECTIONS: Record<DimId, React.ComponentType<{ go: (d: DimId) => void }>> = {
  overworld: Overworld,
  nether: Nether,
  end: TheEnd,
};

const delay = (ms: number) => new Promise<void>((res) => setTimeout(res, ms));

export default function Home() {
  const [current, setCurrent] = useState<DimId>('overworld');
  const [loading, setLoading] = useState<DimId | null>(null);
  const busy = useRef(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    document.title = `Dameo / Bivek Daimary — ${getDimension(current).name}`;
  }, [current]);

  /**
   * Transition sequence (PRD §6.1):
   * 1. loading overlay fades in over the current section
   * 2. section swaps underneath the opaque overlay
   * 3. "Loading terrain..." progress bar fills
   * 4. overlay fades out, revealing the new dimension
   */
  const go = useCallback(
    async (d: DimId) => {
      if (busy.current || d === current) return;
      busy.current = true;
      setLoading(d);
      await delay(reduced ? 120 : 500);
      setCurrent(d);
      window.scrollTo(0, 0);
      await delay(reduced ? 250 : 1150);
      setLoading(null);
      busy.current = false;
    },
    [current, reduced],
  );

  const Section = SECTIONS[current];

  return (
    <main className="min-h-screen bg-[#0b0b0d]">
      <Navbar current={current} onSelect={go} />

      <motion.div
        key={current}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduced ? 0.1 : 0.5, ease: 'easeOut' }}
      >
        <Section go={go} />
      </motion.div>

      <AnimatePresence>
        {loading && (
          <DimensionTransition
            key={loading}
            target={getDimension(loading)}
            reduced={!!reduced}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
