import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { User, Users, Swords, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const modes = [
  {
    icon: User,
    title: 'SOLO',
    description: 'Face the arena alone. Pure skill. No backup. Last survivor wins.',
    color: 'blue',
  },
  {
    icon: Users,
    title: 'DUO',
    description: 'Team up with one partner. Trust and tactics determine victory.',
    color: 'purple',
  },
  {
    icon: Swords,
    title: 'SQUAD',
    description: 'Command a 4-player team. Coordinate, conquer, dominate.',
    color: 'orange',
  },
  {
    icon: Zap,
    title: 'CLASH ARENA',
    description: 'Fast-paced 8v8 combat. Respawn enabled. Pure chaos.',
    color: 'blue',
  },
];

export const GameModes = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.mode-card', {
        opacity: 0,
        y: 100,
        stagger: 0.2,
        duration: 1,
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 80%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-5xl md:text-7xl font-black text-center mb-20">
          <span className="text-neon-blue">GAME</span>{' '}
          <span className="text-neon-purple">MODES</span>
        </h2>

        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {modes.map((mode, index) => {
            const Icon = mode.icon;
            const glowClass =
              mode.color === 'blue'
                ? 'glow-blue'
                : mode.color === 'purple'
                ? 'glow-purple'
                : 'glow-orange';
            
            return (
              <div
                key={index}
                className="mode-card holographic rounded-2xl p-8 cursor-pointer transition-all hover:scale-105 group"
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-neon flex items-center justify-center mb-6 ${glowClass} group-hover:animate-pulse-glow`}>
                  <Icon size={32} className="text-background" />
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-neon-blue transition-colors">
                  {mode.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {mode.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
