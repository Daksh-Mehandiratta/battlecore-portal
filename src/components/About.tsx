import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import character1 from '@/assets/character-1.jpg';

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        opacity: 0,
        x: -100,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 30%',
          scrub: 1,
        },
      });

      gsap.from(imageRef.current, {
        opacity: 0,
        x: 100,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 30%',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 px-4 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-10"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div ref={textRef} className="space-y-8">
            <h2 className="text-5xl md:text-7xl font-black">
              <span className="text-neon-purple">THE</span>
              <br />
              <span className="text-neon-blue">ARENA AWAITS</span>
            </h2>
            
            <div className="space-y-4 text-lg text-foreground/80 leading-relaxed">
              <p>
                In the year 2087, the world's elite warriors compete in the ultimate test of survival.
                The BattleCore Arena - a constantly evolving combat zone where only the strongest prevail.
              </p>
              <p>
                Advanced weapons, tactical abilities, and split-second decisions determine who walks out
                victorious. Every match is a new story. Every victory is legendary.
              </p>
              <p className="text-neon-orange font-semibold">
                Will you become the champion?
              </p>
            </div>
          </div>

          <div ref={imageRef} className="relative">
            <div className="holographic rounded-2xl p-1 glow-blue">
              <img
                src={character1}
                alt="Elite Warrior"
                className="rounded-2xl w-full h-auto"
              />
            </div>
            <div className="absolute -z-10 inset-0 bg-primary/20 blur-3xl rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
