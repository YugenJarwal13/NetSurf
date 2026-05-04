import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Download } from 'lucide-react';

export default function DownloadCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: '-100px' });

  return (
    <section id="download" ref={sectionRef} className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src="/videos/cta-bg.mp4" type="video/mp4" />
      </video>

      {/* Semi-transparent Overlay */}
      <div className="absolute inset-0 bg-void/50" />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-[700px] mx-auto"
        initial={{ opacity: 1, scale: 1 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <h2
          className="font-black italic gradient-text mb-8"
          style={{
            fontSize: 'clamp(40px, 6vw, 80px)',
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
            textShadow: '0 0 80px rgba(110,90,254,0.3), 0 0 160px rgba(0,200,200,0.15)',
          }}
        >
          Ready to Stop Browsing?
        </h2>

        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <button
            className="btn-primary animate-neon-pulse text-base px-12 py-4 inline-flex items-center gap-3"
          >
            <Download className="w-5 h-5" />
            Download NetSurf
          </button>

          <p className="mt-4 text-text-muted text-sm">
            Free. Open source. No account required.
          </p>

          <div className="flex items-center justify-center gap-4 mt-6">
            <span className="px-3 py-1 rounded-lg bg-white/5 text-text-muted text-xs">Windows</span>
            <span className="px-3 py-1 rounded-lg bg-white/5 text-text-muted text-xs">macOS</span>
            <span className="px-3 py-1 rounded-lg bg-white/5 text-text-muted text-xs">Linux</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
