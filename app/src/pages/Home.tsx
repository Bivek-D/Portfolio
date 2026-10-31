import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import DimensionTransition from '@/components/DimensionTransition';
import Overworld from '@/sections/Overworld';
import Nether from '@/sections/Nether';
import TheEnd from '@/sections/TheEnd';
import { getDimension, type DimId } from '@/lib/dimensions';
import { applyHead, dimFromPath, pageFor } from '@/lib/seo';
import { pageJsonLd } from '@/lib/structured-data';

const SECTIONS: Record<DimId, React.ComponentType<{ go: (d: DimId) => void }>> = {
  overworld: Overworld,
  nether: Nether,
  end: TheEnd,
};

const delay = (ms: number) => new Promise<void>((res) => setTimeout(res, ms));

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const current = dimFromPath(location.pathname);
  const [loading, setLoading] = useState<DimId | null>(null);
  const busy = useRef(false);
  const [firstDim] = useState<DimId>(current);
  const reduced = useReducedMotion();

  useEffect(() => {
    applyHead(current, pageJsonLd(current));
    if (current !== firstDim) window.scrollTo(0, 0);
  }, [current, firstDim]);

  /**
   * Transition: the loading overlay fades in over the current dimension, the route changes underneath it,
   * the "Loading terrain..." bar fills, then the overlay fades out on the new dimension.
   */
  const go = useCallback(
    async (d: DimId) => {
      if (busy.current || d === current) return;
      busy.current = true;
      setLoading(d);
      await delay(reduced ? 120 : 500);
      navigate(pageFor(d).path);
      await delay(reduced ? 250 : 1150);
      setLoading(null);
      busy.current = false;
    },
    [current, reduced, navigate],
  );

  const Section = SECTIONS[current];

  return (
    <main className="min-h-screen bg-[#0b0b0d]">
      {/* the Nether page has its own top bar and in-hero dimension switcher */}
      {current !== 'nether' && <Navbar current={current} onSelect={go} />}

      <motion.div
        key={current}
        // the first page arrives pre-rendered: show it as-is, only fade in on dimension changes
        initial={current === firstDim ? false : { opacity: 0 }}
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
