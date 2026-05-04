import { useEffect } from 'react';
import Navbar from '../sections/Navbar';
import Hero from '../sections/Hero';
import SizzleTransition from '../sections/SizzleTransition';
import AgentDemo from '../sections/AgentDemo';
import ExecutionEngine from '../sections/ExecutionEngine';
import MultiLLM from '../sections/MultiLLM';
import VoiceAI from '../sections/VoiceAI';
import Architecture from '../sections/Architecture';
import Performance from '../sections/Performance';
import Ecosystem from '../sections/Ecosystem';
import UseCases from '../sections/UseCases';
import Pricing from '../sections/Pricing';
import DownloadCTA from '../sections/DownloadCTA';
import Footer from '../sections/Footer';

export default function Home() {
  useEffect(() => {
    // Smooth scroll polyfill for older browsers
    document.documentElement.style.scrollBehavior = 'smooth';
    ['/images/usecase-1.jpg', '/images/usecase-2.jpg', '/images/usecase-3.jpg', '/images/usecase-4.jpg', '/images/usecase-5.jpg'].forEach((src) => {
      const img = new Image();
      img.decoding = 'async';
      img.src = src;
    });

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <main className="relative bg-void min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <SizzleTransition />
      <AgentDemo />
      <ExecutionEngine />
      <MultiLLM />
      <VoiceAI />
      <Architecture />
      <Performance />
      <Ecosystem />
      <UseCases />
      <Pricing />
      <DownloadCTA />
      <Footer />
    </main>
  );
}
