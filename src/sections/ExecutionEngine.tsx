import { motion, useInView } from 'framer-motion';
import { useMemo, useRef } from 'react';
import { Check, Zap } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const particles = Array.from({ length: 8 }).map((_, i) => ({
  id: i,
  color: i % 2 === 0 ? '#6E5AFE' : '#00C8C8',
  left: `${10 + ((i * 17) % 80)}%`,
  top: `${14 + ((i * 23) % 72)}%`,
  x: [0, (i % 3 - 1) * 42, (i % 2 === 0 ? 1 : -1) * 24, 0],
  y: [0, (i % 4 - 1.5) * 28, (i % 2 === 0 ? -1 : 1) * 36, 0],
  duration: 18 + i * 2,
}));

export default function ExecutionEngine() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: '-100px' });
  const floatingParticles = useMemo(() => particles, []);

  return (
    <section id="features" ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src="/videos/data-flow.mp4" type="video/mp4" />
      </video>

      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to right, #0A0A0F 0%, transparent 30%, transparent 70%, #0A0A0F 100%)',
        }}
      />

      {floatingParticles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: particle.color,
            left: particle.left,
            top: particle.top,
            opacity: 0.6,
            filter: 'blur(1px)',
          }}
          animate={{ x: particle.x, y: particle.y }}
          transition={{ duration: particle.duration, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      <div className="relative z-10 px-6">
        <motion.div
          initial={{ opacity: 1, y: 0, scale: 1 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <GlassCard
            enable3DTilt
            hoverGlow="rgba(0,200,200,0.2)"
            className="max-w-[640px] p-10 md:p-14"
          >
            <div className="w-12 h-12 rounded-xl bg-neon-cyan/15 flex items-center justify-center mb-6"
              style={{ boxShadow: '0 0 20px rgba(0,200,200,0.2)' }}
            >
              <Zap className="w-6 h-6 text-neon-cyan" />
            </div>

            <h2
              className="font-bold text-text-primary mb-4"
              style={{ fontSize: 'clamp(28px, 3vw, 48px)', lineHeight: 1.1 }}
            >
              Autonomous Execution Engine
            </h2>
            <p className="text-text-secondary leading-relaxed mb-8 max-w-[480px]"
              style={{ fontSize: 'clamp(14px, 1.1vw, 18px)' }}
            >
              NetSurf does not just suggest, it executes. Click, type, navigate, submit. The agent performs every action on your behalf while you watch.
            </p>

            <div className="rounded-xl border border-white/10 bg-panel/50 p-4 overflow-hidden">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#28CA42]" />
                </div>
                <div className="text-xs text-text-muted">Auto-fill Demo</div>
              </div>
              <div className="space-y-2">
                <motion.div
                  className="h-8 rounded-lg bg-white/5 flex items-center px-3 overflow-hidden"
                  initial={{ width: '100%' }}
                  whileInView={{ width: '100%' }}
                  transition={{ duration: 0.65, ease: 'easeInOut' }}
                  viewport={{ once: false, margin: '-100px' }}
                >
                  <span className="text-xs text-text-secondary font-mono">yugenjarwal13@gmail.com</span>
                </motion.div>
                <motion.div
                  className="h-8 rounded-lg bg-white/5 flex items-center px-3 overflow-hidden"
                  initial={{ width: '85%' }}
                  whileInView={{ width: '85%' }}
                  transition={{ duration: 0.65, delay: 0.08, ease: 'easeInOut' }}
                  viewport={{ once: false, margin: '-100px' }}
                >
                  <span className="text-xs text-text-secondary font-mono">************</span>
                </motion.div>
                <motion.div
                  className="h-8 rounded-lg bg-white/5 flex items-center px-3 overflow-hidden"
                  initial={{ width: '60%' }}
                  whileInView={{ width: '60%' }}
                  transition={{ duration: 0.65, delay: 0.12, ease: 'easeInOut' }}
                  viewport={{ once: false, margin: '-100px' }}
                >
                  <span className="text-xs text-text-secondary font-mono">Gurugram, India</span>
                </motion.div>
              </div>
              <motion.div
                className="mt-3 flex justify-end"
                initial={{ opacity: 1 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.25, delay: 0.12, ease: 'easeOut' }}
                viewport={{ once: false, margin: '-100px' }}
              >
                <div className="px-4 py-1.5 rounded-lg bg-neon-emerald/20 text-neon-emerald text-xs font-semibold flex items-center gap-1.5">
                  <Check className="w-3 h-3" />
                  Submitted
                </div>
              </motion.div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
