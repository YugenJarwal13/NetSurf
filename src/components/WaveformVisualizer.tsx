import { useEffect, useRef } from 'react';

export default function WaveformVisualizer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<HTMLDivElement[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const bars = barsRef.current;
    if (bars.length === 0) return;

    const barData = bars.map(() => ({
      base: 4 + Math.random() * 12,
      amplitude: 20 + Math.random() * 30,
      speed: 2 + Math.random() * 3,
      phase: Math.random() * Math.PI * 2,
    }));

    const animate = (time: number) => {
      const t = time * 0.001;
      bars.forEach((bar, i) => {
        const data = barData[i];
        const height = data.base + data.amplitude * Math.sin(t * data.speed + data.phase) * 0.5 + data.amplitude * 0.5;
        bar.style.height = `${Math.max(4, height)}px`;
        
        // Color mapping based on height
        const ratio = height / 60;
        if (ratio > 0.7) {
          bar.style.background = 'linear-gradient(to top, #00C8C8, #FFFFFF)';
        } else if (ratio > 0.4) {
          bar.style.background = 'linear-gradient(to top, #6E5AFE, #00C8C8)';
        } else {
          bar.style.background = '#00C8C8';
        }
      });
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div ref={containerRef} className="flex items-end justify-center gap-[3px] h-[60px]">
      {Array.from({ length: 40 }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { if (el) barsRef.current[i] = el; }}
          className="w-[4px] rounded-full transition-colors duration-100"
          style={{ height: '4px', background: '#00C8C8' }}
        />
      ))}
    </div>
  );
}
