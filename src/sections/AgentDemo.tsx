import { motion } from 'framer-motion';
import { Check, Clock, Loader2, MousePointer, Plane, Search, Zap } from 'lucide-react';

const reasoningSteps = [
  'Searching flight aggregators...',
  'Comparing prices...',
  'Filtering best options...',
];

const flights = [
  { airline: 'IndiGo', route: 'DEL to GOI', time: '07:10 to 09:45', price: 'Rs 5,842', tag: 'Best value' },
  { airline: 'Air India Express', route: 'DEL to GOI', time: '12:20 to 14:55', price: 'Rs 6,180', tag: 'Fastest' },
  { airline: 'Akasa Air', route: 'DEL to GOI', time: '18:05 to 20:50', price: 'Rs 6,420', tag: 'Evening' },
];

export default function AgentDemo() {
  return (
    <section id="demo" className="relative min-h-[150vh] bg-space">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 45%, rgba(110,90,254,0.16) 0%, transparent 58%)',
          }}
        />

        <motion.div
          className="absolute top-8 right-6 md:right-8 z-20 glass-card rounded-full px-4 py-2 flex items-center gap-2"
          initial={{ opacity: 1, scale: 1 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, margin: '-100px' }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <div className="w-2 h-2 rounded-full bg-neon-violet animate-status-pulse" />
          <span className="text-xs font-medium text-text-secondary">Agent Active</span>
        </motion.div>

        <motion.div
          className="relative z-10 w-full max-w-[1080px] px-4 md:px-6"
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-100px' }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <div
            className="relative rounded-[20px] border border-white/10 overflow-hidden"
            style={{
              background: 'rgba(10, 10, 15, 0.88)',
              backdropFilter: 'blur(14px)',
              boxShadow: '0 40px 140px rgba(0,0,0,0.56), 0 0 80px rgba(110,90,254,0.18)',
            }}
          >
            <div className="flex items-center gap-2 px-5 py-3 border-b border-white/[0.06]">
              <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <div className="w-3 h-3 rounded-full bg-[#28CA42]" />
              <div className="flex-1 mx-4">
                <div className="bg-panel/80 rounded-lg px-4 py-1 text-xs text-text-muted text-center max-w-[260px] mx-auto">
                  netsurf.ai / agent-run
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-[0.95fr_1.35fr] gap-0 min-h-[560px]">
              <div className="relative border-b lg:border-b-0 lg:border-r border-white/[0.06] p-5 md:p-7 flex flex-col gap-5">
                <div className="glass-card rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-neon-violet/20 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-neon-violet" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-text-muted mb-1">Command</p>
                      <p className="typing-command text-sm text-text-primary whitespace-nowrap overflow-hidden">
                        Find cheapest flights to Goa
                      </p>
                    </div>
                  </div>
                </div>

                <div className="glass-card rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Loader2 className="w-4 h-4 text-neon-violet animate-spin" />
                    <span className="text-sm font-medium text-text-secondary">AI reasoning</span>
                  </div>
                  <div className="space-y-3">
                    {reasoningSteps.map((step, index) => (
                      <motion.div
                        key={step}
                        className="flex items-center gap-3 rounded-lg bg-white/[0.04] px-3 py-2"
                        animate={{
                          opacity: [0.72, 1, 0.72],
                          x: [0, 3, 0],
                        }}
                        transition={{
                          duration: 2.1,
                          delay: index * 0.25,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      >
                        <Search className="w-3.5 h-3.5 text-neon-cyan" />
                        <span className="text-xs text-text-secondary">{step}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] p-4">
                    <p className="text-xs text-text-muted mb-1">Sites checked</p>
                    <p className="text-2xl font-bold text-text-primary">14</p>
                  </div>
                  <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] p-4">
                    <p className="text-xs text-text-muted mb-1">Best fare</p>
                    <p className="text-2xl font-bold gradient-text">Rs 5.8K</p>
                  </div>
                </div>
              </div>

              <div className="relative p-5 md:p-7 overflow-hidden">
                <motion.div
                  className="absolute inset-x-10 top-8 h-20 rounded-full bg-neon-violet/20 blur-3xl"
                  animate={{ opacity: [0.3, 0.65, 0.3], scale: [0.95, 1.08, 0.95] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                />

                <div className="relative rounded-2xl border border-white/[0.08] bg-panel/70 overflow-hidden h-full min-h-[500px]">
                  <div className="h-12 border-b border-white/[0.06] flex items-center gap-3 px-4">
                    <div className="flex-1 rounded-lg bg-black/25 px-3 py-1.5 text-xs text-text-muted">
                      flights.google.com/search?to=GOI
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-neon-cyan/15 flex items-center justify-center">
                      <Plane className="w-4 h-4 text-neon-cyan" />
                    </div>
                  </div>

                  <div className="p-4 md:p-6">
                    <motion.div
                      className="rounded-xl border border-neon-cyan/20 bg-neon-cyan/[0.06] p-4 mb-4"
                      animate={{ y: [0, -4, 0], filter: ['blur(0px)', 'blur(0.2px)', 'blur(0px)'] }}
                      transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-xs text-text-muted mb-1">Now searching</p>
                          <p className="text-sm font-semibold text-text-primary">Delhi to Goa, next available week</p>
                        </div>
                        <div className="rounded-full bg-neon-emerald/15 px-3 py-1 text-xs text-neon-emerald">
                          Live
                        </div>
                      </div>
                    </motion.div>

                    <div className="grid grid-cols-3 gap-2 mb-5">
                      {['Stops', 'Timing', 'Price'].map((filter) => (
                        <motion.button
                          key={filter}
                          className="rounded-lg border border-white/[0.08] bg-white/[0.04] py-2 text-xs text-text-secondary"
                          whileHover={{ scale: 1.03, borderColor: 'rgba(0,200,200,0.35)' }}
                          transition={{ duration: 0.2, ease: 'easeOut' }}
                        >
                          {filter}
                        </motion.button>
                      ))}
                    </div>

                    <div className="space-y-3">
                      {flights.map((flight, index) => (
                        <motion.div
                          key={flight.airline}
                          className="relative rounded-xl border border-white/[0.08] bg-white/[0.045] p-4 overflow-hidden"
                          initial={{ opacity: 1, y: 0 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: false, margin: '-100px' }}
                          transition={{ duration: 0.3, ease: 'easeOut' }}
                          whileHover={{ y: -3, scale: 1.01, borderColor: 'rgba(110,90,254,0.35)' }}
                        >
                          {index === 0 && (
                            <div className="absolute inset-0 bg-neon-violet/[0.035] pointer-events-none" />
                          )}
                          <div className="relative flex items-center justify-between gap-4">
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="font-semibold text-text-primary text-sm">{flight.airline}</p>
                                <span className="rounded-full bg-neon-violet/15 px-2 py-0.5 text-[10px] text-neon-violet">
                                  {flight.tag}
                                </span>
                              </div>
                              <p className="text-xs text-text-muted">{flight.route}</p>
                              <p className="text-xs text-text-secondary mt-2 flex items-center gap-1.5">
                                <Clock className="w-3 h-3" />
                                {flight.time}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-black gradient-text">{flight.price}</p>
                              <p className="text-[11px] text-text-muted">one way</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <motion.div
                    className="absolute z-20 w-9 h-9 rounded-full bg-neon-magenta/20 border border-neon-magenta/60 flex items-center justify-center shadow-[0_0_30px_rgba(200,27,141,0.45)]"
                    animate={{ x: [80, 310, 310, 470, 470, 80], y: [115, 115, 210, 210, 355, 115] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <MousePointer className="w-4 h-4 text-neon-magenta" />
                  </motion.div>

                  <motion.div
                    className="absolute bottom-5 right-5 rounded-xl bg-neon-emerald/15 border border-neon-emerald/25 px-4 py-3 flex items-center gap-3"
                    animate={{ opacity: [0.75, 1, 0.75], y: [0, -3, 0] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <Check className="w-4 h-4 text-neon-emerald" />
                    <div>
                      <p className="text-xs font-semibold text-neon-emerald">Best options ready</p>
                      <p className="text-[11px] text-text-muted">Sorted by price and timing</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[220px] h-[2px] bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full gradient-cta rounded-full"
            animate={{ width: ['0%', '100%'] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </section>
  );
}
