import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import AnimatedCounter from '../components/AnimatedCounter';

const stats = [
  { target: 240, suffix: '', label: 'FPS Under Load', sub: 'Agent active, 20 tabs open, full voice pipeline. Zero frame drops.' },
  { target: 0, suffix: 'ms', label: 'Input Latency', sub: 'From command to first action. Instant response.' },
  { target: 100, suffix: '%', label: 'Local Option', sub: 'Run entirely offline with local models. Your data never leaves.' },
];

export default function Performance() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: '-100px' });

  return (
    <section ref={sectionRef} className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src="/videos/performance-bg.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-void/70" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 w-full py-20">
        {/* Headline */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 1, y: 0 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <h2
            className="font-bold text-text-primary"
            style={{ fontSize: 'clamp(28px, 3.5vw, 56px)', lineHeight: 1.05, letterSpacing: '-0.02em' }}
          >
            Numbers That Matter
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-10">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 1, y: 0, scale: 1 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.35, delay: i * 0.04, ease: 'easeOut' }}
            >
              <div
                className="font-black gradient-text"
                style={{ fontSize: 'clamp(64px, 8vw, 120px)', lineHeight: 1 }}
              >
                <AnimatedCounter
                  target={stat.target}
                  suffix={stat.suffix}
                  duration={2000}
                />
              </div>
              <p className="mt-4 font-semibold text-text-secondary text-sm uppercase tracking-widest">
                {stat.label}
              </p>
              <p className="mt-2 text-text-muted text-sm max-w-[240px] mx-auto">
                {stat.sub}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
