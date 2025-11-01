import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import weapon1 from '@/assets/weapon-1.jpg';

gsap.registerPlugin(ScrollTrigger);

const weapons = [
  {
    name: 'PLASMA RIFLE',
    type: 'Assault Rifle',
    damage: 92,
    accuracy: 88,
    reload: 85,
    image: weapon1,
  },
  {
    name: 'VOID CANNON',
    type: 'Heavy Weapon',
    damage: 98,
    accuracy: 75,
    reload: 60,
    image: weapon1,
  },
  {
    name: 'QUANTUM SMG',
    type: 'Submachine Gun',
    damage: 78,
    accuracy: 82,
    reload: 95,
    image: weapon1,
  },
];

export const Weapons = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.weapon-card', {
        opacity: 0,
        scale: 0.8,
        stagger: 0.2,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 px-4 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-10"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-5xl md:text-7xl font-black text-center mb-20">
          <span className="text-neon-orange">WEAPONS</span>{' '}
          <span className="text-neon-purple">&</span>{' '}
          <span className="text-neon-blue">GEAR</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {weapons.map((weapon, index) => (
            <div
              key={index}
              className="weapon-card holographic rounded-2xl overflow-hidden group cursor-pointer"
            >
              <div className="relative overflow-hidden">
                <img
                  src={weapon.image}
                  alt={weapon.name}
                  className="w-full h-64 object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent"></div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-neon-blue mb-1">
                    {weapon.name}
                  </h3>
                  <p className="text-muted-foreground text-sm uppercase tracking-wider">
                    {weapon.type}
                  </p>
                </div>

                <div className="space-y-3">
                  <StatBar label="Damage" value={weapon.damage} color="orange" />
                  <StatBar label="Accuracy" value={weapon.accuracy} color="blue" />
                  <StatBar label="Reload Speed" value={weapon.reload} color="purple" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const StatBar = ({ label, value, color }: { label: string; value: number; color: string }) => {
  const bgClass = color === 'orange' ? 'bg-accent' : color === 'blue' ? 'bg-primary' : 'bg-secondary';
  
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-muted-foreground">{label}</span>
        <span className="text-foreground font-semibold">{value}</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full ${bgClass} transition-all duration-1000`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
};
