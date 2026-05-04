import { useLayoutEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const useCases = [
  {
    image: '/images/usecase-1.jpg',
    title: 'Book Flights',
    description: 'Find the cheapest round-trip to Manali, compare 20 sites, book in 3 minutes.',
  },
  {
    image: '/images/usecase-2.jpg',
    title: 'Fill Forms',
    description: 'Tax forms, visa applications, job applications. Auto-filled from your profile.',
  },
  {
    image: '/images/usecase-3.jpg',
    title: 'Research',
    description: 'Deep-dive any topic. The agent reads, summarizes, and cites sources.',
  },
  {
    image: '/images/usecase-4.jpg',
    title: 'Scrape Data',
    description: 'Extract prices, inventory, news. Structured output, any format.',
  },
  {
    image: '/images/usecase-5.jpg',
    title: 'Shop Smart',
    description: 'Compare prices across stores, apply coupons, checkout in one click.',
  },
];

export default function UseCases() {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollDistance, setScrollDistance] = useState(0);
  const [sectionHeight, setSectionHeight] = useState(
    typeof window !== 'undefined' ? window.innerHeight : 0
  );

  useLayoutEffect(() => {
    const update = () => {
      if (!trackRef.current || !viewportRef.current) {
        return;
      }

      const totalScrollWidth = trackRef.current.scrollWidth;
      const viewportWidth = viewportRef.current.clientWidth;
      const viewportHeight = window.innerHeight;
      const distance = Math.max(0, totalScrollWidth - viewportWidth);

      setScrollDistance(distance);
      setSectionHeight(distance + viewportHeight);
    };

    update();
    window.addEventListener('resize', update);

    return () => window.removeEventListener('resize', update);
  }, []);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -(scrollDistance || 0)]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section ref={containerRef} className="relative" style={{ height: sectionHeight }}>
      <div ref={viewportRef} className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        {/* Header */}
        <div className="absolute top-12 left-6 md:left-12 z-20">
          <motion.h2
            className="font-bold text-text-primary mb-2"
            style={{ fontSize: 'clamp(28px, 3.5vw, 56px)', lineHeight: 1.05, letterSpacing: '-0.02em' }}
          >
            What Will You Automate?
          </motion.h2>
          <p className="text-text-secondary" style={{ fontSize: 'clamp(14px, 1.1vw, 18px)' }}>
            From simple searches to complex workflows.
          </p>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="pt-32 pl-6 pr-6 md:pl-12 md:pr-12">
          <motion.div
            ref={trackRef}
            className="flex gap-8 will-change-transform"
            style={{ x, width: 'max-content' }}
          >
            {useCases.map((useCase) => (
              <motion.div
                key={useCase.title}
                className="flex-shrink-0 w-[340px] md:w-[400px] glass-card overflow-hidden group cursor-pointer"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
              >
                {/* Image */}
                <div className="h-[240px] overflow-hidden">
                  <img
                    src={useCase.image}
                    alt={useCase.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="eager"
                    decoding="async"
                  />
                </div>

                {/* Text */}
                <div className="p-7">
                  <h3 className="font-bold text-text-primary text-xl mb-2">{useCase.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{useCase.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[120px] h-[2px] bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full gradient-cta rounded-full"
            style={{ width: progressWidth }}
          />
        </div>
      </div>
    </section>
  );
}
