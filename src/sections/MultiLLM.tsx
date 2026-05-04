import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles, Brain, Globe, Server } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const models = [
  {
    icon: Sparkles,
    name: 'OpenAI',
    models: 'GPT-4o, GPT-4 Turbo',
    accent: '#00C8C8',
    bgAccent: 'rgba(0,200,200,0.15)',
  },
  {
    icon: Brain,
    name: 'Anthropic',
    models: 'Claude 3.5 Sonnet, Opus',
    accent: '#C81B8D',
    bgAccent: 'rgba(200,27,141,0.15)',
  },
  {
    icon: Globe,
    name: 'Google',
    models: 'Gemini Pro, Flash',
    accent: '#6E5AFE',
    bgAccent: 'rgba(110,90,254,0.15)',
  },
  {
    icon: Server,
    name: 'Local',
    models: 'Ollama, LM Studio, Custom',
    accent: '#00D084',
    bgAccent: 'rgba(0,208,132,0.15)',
  },
];

export default function MultiLLM() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: '-100px' });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-20">
      {/* Ambient Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(110,90,254,0.06) 0%, transparent 50%)',
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
            className="font-bold text-text-primary mb-4"
            style={{ fontSize: 'clamp(28px, 3.5vw, 56px)', lineHeight: 1.05, letterSpacing: '-0.02em' }}
          >
            Your Choice of Intelligence
          </h2>
          <p className="text-text-secondary max-w-[500px] mx-auto" style={{ fontSize: 'clamp(14px, 1.1vw, 18px)' }}>
            Plug in any LLM. GPT-4, Claude, Gemini, or your own local model. Switch instantly.
          </p>
        </motion.div>

        {/* Cards Row */}
        <div
          className="flex gap-6 justify-center flex-wrap md:flex-nowrap"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {models.map((model, i) => {
            const Icon = model.icon;
            const isHovered = hoveredIndex === i;
            const isOtherHovered = hoveredIndex !== null && hoveredIndex !== i;

            return (
              <motion.div
                key={model.name}
                initial={{ opacity: 1, y: 0 }}
                animate={isInView ? { opacity: isOtherHovered ? 0.5 : 1, y: 0, scale: isHovered ? 1.05 : 1 } : { opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3, delay: i * 0.03, ease: 'easeOut' }}
                onMouseEnter={() => setHoveredIndex(i)}
              >
                <GlassCard
                  enable3DTilt
                  className="w-[240px] p-8 text-center"
                  hoverGlow={`${model.accent}30`}
                >
                  {/* Icon */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: model.bgAccent }}
                  >
                    <Icon className="w-5 h-5" style={{ color: model.accent }} />
                  </div>

                  {/* Name */}
                  <h3 className="font-semibold text-text-primary text-base mb-2">{model.name}</h3>

                  {/* Models */}
                  <p className="text-text-secondary text-sm leading-relaxed mb-4">{model.models}</p>

                  {/* Status */}
                  <span className="text-xs font-medium" style={{ color: model.accent, opacity: 0.6 }}>
                    Connected
                  </span>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
