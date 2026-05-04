import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import WaveformVisualizer from '../components/WaveformVisualizer';

export default function VoiceAI() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: '-100px' });

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src="/videos/waveform.mp4" type="video/mp4" />
      </video>

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, #030304 0%, transparent 15%, transparent 85%, #030304 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 px-6">
        <motion.div
          className="glass-card max-w-[520px] p-10 md:p-12 text-center"
          initial={{ opacity: 1, y: 0 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <h2
            className="font-bold text-text-primary mb-4"
            style={{ fontSize: 'clamp(24px, 2.5vw, 36px)', lineHeight: 1.15, letterSpacing: '-0.01em' }}
          >
            Speak. It Listens. Even Offline.
          </h2>
          <p className="text-text-secondary leading-relaxed mb-8" style={{ fontSize: 'clamp(14px, 1.1vw, 18px)' }}>
            Full voice pipeline powered by whisper.cpp. Real-time transcription. Dynamic CPU fallback. No cloud required.
          </p>

          {/* Waveform */}
          <WaveformVisualizer />

          {/* Status */}
          <div className="flex items-center justify-center gap-2 mt-8">
            <div className="w-2 h-2 rounded-full bg-neon-cyan animate-status-pulse" />
            <span className="font-mono text-xs text-text-secondary">Listening...</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
