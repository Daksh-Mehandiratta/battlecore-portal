import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';

export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.5,
        ease: 'power3.out',
      });

      gsap.from(subtitleRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.8,
        ease: 'power3.out',
      });

      gsap.from(buttonsRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 1.1,
        ease: 'power3.out',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax Effect */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background"></div>
        <div className="absolute inset-0 grid-pattern opacity-30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <h1
          ref={titleRef}
          className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 tracking-tighter"
        >
          <span className="text-neon-blue">ENTER THE</span>
          <br />
          <span className="text-neon-orange">SURVIVAL ARENA</span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-xl md:text-3xl mb-12 text-foreground/90 font-light tracking-wide"
        >
          Last one standing wins the glory.
        </p>

        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-6 justify-center">
          <Button
            size="lg"
            className="text-lg px-12 py-7 bg-primary hover:bg-primary-glow text-primary-foreground font-bold tracking-wider glow-blue transition-all hover:scale-105"
          >
            PLAY NOW
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-12 py-7 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold tracking-wider glow-blue transition-all hover:scale-105"
          >
            <Play className="mr-2" size={24} />
            WATCH TRAILER
          </Button>
        </div>
      </div>

      {/* Animated Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
              opacity: Math.random() * 0.5 + 0.2,
            }}
          ></div>
        ))}
      </div>
    </section>
  );
};
