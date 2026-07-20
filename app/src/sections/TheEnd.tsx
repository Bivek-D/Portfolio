import { VoidParticles } from '@/components/Particles';

/**
 * The End — Development & Projects (placeholder; full content in a later phase).
 */
export default function TheEnd() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse at 50% -20%, #2a1145 0%, #140a24 50%, #0a0514 100%)',
      }}
      aria-label="The End — Development and Projects"
    >
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vmin] h-[60vmin] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(185,103,232,0.16) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />
      <VoidParticles />
      <div className="relative text-center px-6 pt-16">
        <p className="font-pixel text-[10px] text-[#b967e8] tracking-[0.3em] mb-6">
          DIMENSION 03
        </p>
        <h1 className="font-pixel text-3xl md:text-5xl text-[#d3a1f5] text-shadow-pixel mb-7">
          THE END
        </h1>
        <p className="text-[#cdbce8] max-w-md mx-auto leading-relaxed mb-9">
          Development &amp; Projects lives here — dev work, GitHub stats, system design.
          This dimension is still generating.
        </p>
        <p className="font-pixel text-[9px] text-white/40 tracking-widest">
          CONTENT ARRIVES IN PHASE 2
        </p>
      </div>
    </section>
  );
}
