import React, { useEffect } from 'react';
import Navigation from '../sections/Navigation';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Gallery from '../sections/Gallery';
import Services from '../sections/Services';
import Contact from '../sections/Contact';
import Footer from '../sections/Footer';
import GrainOverlay from '../components/GrainOverlay';

const Home: React.FC = () => {
  useEffect(() => {
    // Initialize smooth scroll with Lenis
    let lenis: any = null;
    let rafId: number;

    const initLenis = async () => {
      try {
        const Lenis = (await import('@studio-freight/lenis')).default;
        lenis = new Lenis({
          lerp: 0.15,
          smoothWheel: true,
        });

        function raf(time: number) {
          lenis.raf(time);
          rafId = requestAnimationFrame(raf);
        }
        rafId = requestAnimationFrame(raf);
      } catch {
        // Lenis not available, fallback to native scroll
      }
    };

    initLenis();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) lenis.destroy();
    };
  }, []);

  return (
    <div className="relative">
      <GrainOverlay />
      <Navigation />
      <main>
        <Hero />
        <About />
        <Gallery />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
