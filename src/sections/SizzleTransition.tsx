import { useMemo, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const text = "The browser finally got a brain.";

export default function SizzleTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);
  const letters = useMemo(() => text.split(''), []);

  return (
    <section ref={containerRef} className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-70"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src="/videos/sizzle-bg.mp4" type="video/mp4" />
      </video>

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, #030304 0%, transparent 20%, transparent 80%, #030304 100%)',
        }}
      />

      {/* Kinetic Text */}
      <motion.div
        className="relative z-10 text-center px-6"
        style={{ opacity, scale }}
      >
        <h2
          className="font-black italic gradient-text leading-tight"
          style={{ fontSize: 'clamp(32px, 5vw, 72px)' }}
        >
          {letters.map((char, i) => {
            return (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: '-100px' }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            );
          })}
        </h2>
      </motion.div>
    </section>
  );
}
