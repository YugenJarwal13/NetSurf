import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Bot, Brain, Code, Compass, ExternalLink, Globe, Search, Shield } from 'lucide-react';

const integrations = [
  { name: 'OpenAI', logo: 'O', icon: Bot, href: 'https://openai.com', accent: '#00C8C8' },
  { name: 'Anthropic', logo: 'A', icon: Brain, href: 'https://www.anthropic.com', accent: '#C81B8D' },
  { name: 'Google', logo: 'G', icon: Search, href: 'https://ai.google', accent: '#6E5AFE' },
  { name: 'Ollama', logo: 'Ol', icon: Globe, href: 'https://ollama.com', accent: '#00D084' },
  { name: 'Perplexity', logo: 'P', icon: Compass, href: 'https://www.perplexity.ai', accent: '#00C8C8' },
  { name: 'Brave', logo: 'B', icon: Shield, href: 'https://brave.com', accent: '#C81B8D' },
  { name: 'DuckDuckGo', logo: 'D', icon: Search, href: 'https://duckduckgo.com', accent: '#00D084' },
  { name: 'GitHub', logo: 'Gh', icon: Code, href: 'https://github.com', accent: '#6E5AFE' },
];

export default function Ecosystem() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: '-100px' });

  return (
    <section ref={sectionRef} className="relative min-h-[80vh] flex items-center justify-center py-20">
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 w-full">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 1, y: 0 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <h2
            className="font-bold text-text-primary mb-4"
            style={{ fontSize: 'clamp(28px, 3.5vw, 56px)', lineHeight: 1.05 }}
          >
            Works With Your Stack
          </h2>
          <p className="text-text-secondary max-w-[520px] mx-auto" style={{ fontSize: 'clamp(14px, 1.1vw, 18px)' }}>
            NetSurf plugs into everything.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {integrations.map((integration) => {
            const Icon = integration.icon;

            return (
              <motion.a
                key={integration.name}
                href={integration.href}
                target="_blank"
                rel="noreferrer"
                className="glass-card glass-card-hover p-5 md:p-6 flex flex-col items-center justify-center gap-3 group min-h-[150px] outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan"
                initial={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: '-100px' }}
                whileHover={{
                  y: -6,
                  scale: 1.035,
                  boxShadow: `0 0 34px ${integration.accent}33, 0 12px 40px rgba(0,0,0,0.42)`,
                }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                aria-label={`Open ${integration.name}`}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/[0.08]"
                  style={{ background: `${integration.accent}1F` }}
                >
                  <span className="font-black text-white text-sm">{integration.logo}</span>
                </div>
                <Icon className="w-5 h-5 text-white/60 group-hover:text-white transition-colors duration-200" />
                <span className="text-text-secondary text-sm font-medium group-hover:text-text-primary transition-colors duration-200">
                  {integration.name}
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
