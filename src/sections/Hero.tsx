import { motion } from 'framer-motion';
import { Download, Play, Mic } from 'lucide-react';
import NeuralShader from '../components/NeuralShader';

const demoUrl = 'https://youtu.be/BRdd47T5l-8?si=MKA716o5QKvkGhBZ';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <NeuralShader />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, #030304 90%)',
          zIndex: 1,
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-12 md:pt-16 max-w-[900px] mx-auto">
        <motion.h1
          className="font-black italic tracking-tighter leading-[0.95] gradient-text neon-glow"
          style={{ fontSize: 'clamp(48px, 7vw, 108px)' }}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
        >
          Stop Browsing.
          <br />
          Start Commanding.
        </motion.h1>

        <motion.p
          className="mt-6 text-text-secondary max-w-[560px] leading-relaxed"
          style={{ fontSize: 'clamp(14px, 1.2vw, 20px)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2, ease: 'easeOut' }}
        >
          Tell the internet what to do. NetSurf gets it done.
        </motion.p>
      </div>

      <motion.div
        className="relative z-10 mt-12 w-full max-w-[900px] px-6"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
      >
        <div
          className="relative rounded-[20px] border border-neon-violet/30 overflow-hidden"
          style={{
            background: 'rgba(17, 17, 24, 0.8)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 30px 100px rgba(0,0,0,0.6), 0 0 60px rgba(110,90,254,0.2)',
          }}
        >
          <div className="flex items-center gap-2 px-5 py-4 border-b border-white/[0.06]">
            <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <div className="w-3 h-3 rounded-full bg-[#28CA42]" />
            <div className="flex-1 mx-4">
              <div className="bg-panel/80 rounded-lg px-4 py-1.5 text-xs text-text-muted text-center max-w-[280px] mx-auto">
                netsurf.ai
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8 min-h-[200px] flex flex-col items-center justify-center">
            <div className="w-full max-w-[600px] glass-card rounded-xl px-5 py-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-neon-violet/20 flex items-center justify-center flex-shrink-0">
                <span className="text-neon-violet text-xs font-bold">AI</span>
              </div>
              <div className="flex-1 text-left">
                <span className="text-text-primary text-sm typing-command inline-block whitespace-nowrap overflow-hidden">
                  Find cheapest flight to Goa
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mic className="w-4 h-4 text-text-muted" />
                <div className="w-6 h-6 rounded-full bg-neon-emerald/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-neon-emerald animate-status-pulse" />
                </div>
              </div>
            </div>

            <p className="mt-4 text-text-muted text-xs">
              Type a command or click the microphone to speak
            </p>
          </div>
        </div>

        <style>{`
          @keyframes floatMockup {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-12px); }
          }
        `}</style>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ animation: 'floatMockup 6s ease-in-out infinite' }}
        />
      </motion.div>

      <motion.div
        className="relative z-10 flex items-center gap-4 mt-10 pb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.3, ease: 'easeOut' }}
      >
        <a href="#download" className="btn-primary animate-neon-pulse flex items-center gap-2">
          <Download className="w-4 h-4" />
          Download Now
        </a>
        <a
          href={demoUrl}
          target="_blank"
          rel="noreferrer"
          className="btn-secondary flex items-center gap-2 hover:scale-[1.04]"
        >
          <Play className="w-4 h-4" />
          Watch Demo
        </a>
      </motion.div>
    </section>
  );
}
