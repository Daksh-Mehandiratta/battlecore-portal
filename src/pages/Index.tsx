import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomCursor } from '@/components/CustomCursor';
import { Preloader } from '@/components/Preloader';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { GameModes } from '@/components/GameModes';
import { Weapons } from '@/components/Weapons';
import { Stats } from '@/components/Stats';
import { PreRegister } from '@/components/PreRegister';
import { Footer } from '@/components/Footer';

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  useEffect(() => {
    // Smooth scroll
    const handleScroll = () => {
      const scrollY = window.scrollY;
      document.documentElement.style.setProperty('--scroll-y', `${scrollY}px`);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <CustomCursor />
      <Preloader />
      <Hero />
      <About />
      <GameModes />
      <Weapons />
      <Stats />
      <PreRegister />
      <Footer />
    </div>
  );
};

export default Index;
