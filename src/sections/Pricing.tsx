import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check } from 'lucide-react';

const downloadUrl = 'https://bit.ly/NetsurfSetup';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: '',
    accent: '#00D084',
    features: [
      'Local LLM support',
      'Voice commands',
      'Autonomous browsing (5 tasks/day)',
      'Community support',
    ],
    cta: 'Download',
    ctaStyle: 'secondary' as const,
  },
  {
    name: 'Pro',
    price: '$19',
    period: '/mo',
    annual: '$15/mo billed annually',
    accent: '#6E5AFE',
    features: [
      'Everything in Free',
      'Cloud LLM access (GPT-4, Claude, Gemini)',
      'Unlimited tasks',
      'Priority support',
    ],
    cta: 'Upgrade to Pro',
    ctaStyle: 'primary' as const,
    popular: true,
  },
];

export default function Pricing() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: '-100px' });
  const handleDownload = () => {
    window.location.href = downloadUrl;
  };

  return (
    <section id="pricing" ref={sectionRef} className="relative min-h-[80vh] flex items-center justify-center py-20">
      {/* Ambient Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(110,90,254,0.06) 0%, transparent 60%)',
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
            Simple Pricing
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              className="relative w-full max-w-[360px] glass-card p-10"
              initial={{ opacity: 1, y: 0 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.04, ease: 'easeOut' }}
              style={{
                borderTop: `3px solid ${plan.accent}`,
                boxShadow: plan.popular
                  ? '0 0 30px rgba(110,90,254,0.15), 0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)'
                  : undefined,
              }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 right-6 px-3 py-1 rounded-full text-xs font-semibold text-white gradient-cta">
                  Most Popular
                </div>
              )}

              {/* Plan Name */}
              <h3 className="font-semibold text-text-primary text-lg mb-4">{plan.name}</h3>

              {/* Price */}
              <div className="flex items-baseline gap-1 mb-1">
                <span
                  className="font-black text-text-primary"
                  style={{ fontSize: '48px', lineHeight: 1 }}
                >
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="text-text-secondary text-lg">{plan.period}</span>
                )}
              </div>
              {plan.annual && (
                <p className="text-text-muted text-sm mb-6">{plan.annual}</p>
              )}
              {!plan.annual && <div className="mb-6" />}

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-neon-emerald flex-shrink-0 mt-0.5" />
                    <span className="text-text-secondary text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              {plan.ctaStyle === 'primary' ? (
                <button
                  className="w-full py-3 rounded-full font-semibold text-white text-sm gradient-magenta-violet"
                  style={{ boxShadow: '0 4px 20px rgba(110,90,254,0.4)' }}
                  onClick={plan.cta === 'Download' ? handleDownload : undefined}
                >
                  {plan.cta}
                </button>
              ) : (
                <button
                  className="w-full py-3 rounded-full font-semibold text-white text-sm border border-white/20 hover:bg-white/[0.08] transition-colors duration-300"
                  onClick={plan.cta === 'Download' ? handleDownload : undefined}
                >
                  {plan.cta}
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
