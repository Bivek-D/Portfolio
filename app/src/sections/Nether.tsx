import { Embers } from '@/components/Particles';

/**
 * Nether — Editing & Production (placeholder; full content in a later phase).
 */
export default function Nether() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse at 50% 125%, #571204 0%, #260602 45%, #100303 100%)',
      }}
      aria-label="The Nether — Editing and Production"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)',
        }}
        aria-hidden="true"
      />
      <Embers />
      <div className="relative text-center px-6 pt-16">
        <p className="font-pixel text-[10px] text-[#f27b1a] tracking-[0.3em] mb-6">
          DIMENSION 02
        </p>
        <h1 className="font-pixel text-3xl md:text-5xl text-[#ff6b35] text-shadow-pixel mb-7">
          THE NETHER
        </h1>
        <p className="text-[#e8c4ae] max-w-md mx-auto leading-relaxed mb-9">
          Editing &amp; Production lives here — showreel, client work, motion graphics.
          This dimension is still generating.
        </p>
        <p className="font-pixel text-[9px] text-white/40 tracking-widest">
          CONTENT ARRIVES IN PHASE 2
        </p>
      </div>
    </section>
  );
}
