import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const layers = [
  {
    number: '01',
    name: 'Electron Main Process',
    description: 'Window management, native APIs, secure sandbox',
    accent: 'rgba(110,90,254,0.05)',
  },
  {
    number: '02',
    name: 'React Frontend',
    description: 'UI layer, state management, real-time streams',
    accent: 'rgba(0,200,200,0.05)',
  },
  {
    number: '03',
    name: 'WebViews',
    description: 'Isolated browsing contexts, agent execution environment',
    accent: 'rgba(200,27,141,0.05)',
  },
  {
    number: '04',
    name: 'Eko Core',
    description: 'Agent reasoning, action planning, observation loop',
    accent: 'rgba(0,208,132,0.05)',
  },
];

export default function Architecture() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: '-100px' });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section id="architecture" ref={sectionRef} className="relative min-h-[120vh] flex flex-col items-center justify-center overflow-hidden py-20">
      {/* Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 w-full">
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
            Built for Speed. Built for Scale.
          </h2>
        </motion.div>

        {/* Layer Stack */}
        <motion.div
          className="flex flex-col items-center gap-3 perspective-1000"
          initial={{ opacity: 1, y: 0, rotateX: 0 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {layers.map((layer, i) => {
            const depthScale = isHovered ? 1 : 1 - i * 0.02;
            const depthY = isHovered ? i * 12 : -i * 4;
            const rotateX = isHovered ? 0 : 5;

            return (
              <motion.div
                key={layer.number}
                className="relative w-full max-w-[480px] glass-card flex items-center gap-4 px-6 py-5"
                style={{
                  background: `rgba(17, 17, 24, 0.6)`,
                  transformOrigin: 'center center',
                }}
                animate={{
                  scale: depthScale,
                  y: depthY,
                  rotateX: rotateX,
                }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Connection line */}
                {i > 0 && (
                  <div
                    className="absolute left-8 -top-3 w-px h-3 border-l border-dashed border-white/10"
                  />
                )}
                {i < layers.length - 1 && (
                  <motion.div
                    className="absolute left-8 -bottom-1 w-1.5 h-1.5 rounded-full"
                    style={{ background: layer.accent.replace('0.05', '0.5') }}
                    animate={{ scale: [1, 1.2, 1], opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.08, ease: 'easeInOut' }}
                  />
                )}

                {/* Number */}
                <span
                  className="font-black italic text-2xl gradient-text-violet-cyan flex-shrink-0 w-10"
                >
                  {layer.number}
                </span>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="font-semibold text-text-primary text-base">{layer.name}</h3>
                  <p className="text-text-secondary text-sm mt-0.5">{layer.description}</p>
                </div>

                {/* Arrow */}
                <svg className="w-4 h-4 text-text-muted flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Description */}
        <motion.p
          className="text-center mt-12 text-text-secondary text-base"
          initial={{ opacity: 1 }}
          animate={isInView ? { opacity: 1 } : { opacity: 1 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          Every layer optimized. 60fps guaranteed, even under 100% CPU load.
        </motion.p>
      </div>
    </section>
  );
}
