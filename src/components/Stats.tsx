import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Stats = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState({ matches: 0, eliminations: 0, players: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        onEnter: () => {
          animateCount('matches', 1250000);
          animateCount('eliminations', 45000000);
          animateCount('players', 2500000);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const animateCount = (key: keyof typeof counts, target: number) => {
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      setCounts((prev) => ({ ...prev, [key]: Math.floor(current) }));
    }, duration / steps);
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <section ref={sectionRef} className="py-32 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-5xl md:text-7xl font-black text-center mb-20">
          <span className="text-neon-purple">LIVE</span>{' '}
          <span className="text-neon-blue">STATS</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-12">
          <StatCard
            label="Matches Played"
            value={formatNumber(counts.matches)}
            suffix="+"
            color="blue"
          />
          <StatCard
            label="Total Eliminations"
            value={formatNumber(counts.eliminations)}
            suffix="+"
            color="orange"
          />
          <StatCard
            label="Active Players"
            value={formatNumber(counts.players)}
            suffix="+"
            color="purple"
          />
        </div>

        {/* Leaderboard */}
        <div className="mt-20 holographic rounded-2xl p-8">
          <h3 className="text-3xl font-bold text-center mb-8 text-neon-blue">
            TOP SURVIVORS
          </h3>
          
          <div className="space-y-4">
            {[
              { rank: 1, name: 'PHANTOM_X', kills: 1547, wins: 342 },
              { rank: 2, name: 'NEON_STORM', kills: 1489, wins: 338 },
              { rank: 3, name: 'CYBER_ACE', kills: 1421, wins: 315 },
              { rank: 4, name: 'VOID_HUNTER', kills: 1398, wins: 301 },
              { rank: 5, name: 'BLAZE_NOVA', kills: 1376, wins: 294 },
            ].map((player) => (
              <div
                key={player.rank}
                className="flex items-center justify-between p-4 bg-card/50 rounded-lg border border-border hover:border-primary transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className={`text-2xl font-black ${player.rank === 1 ? 'text-neon-orange' : player.rank === 2 ? 'text-neon-blue' : player.rank === 3 ? 'text-neon-purple' : 'text-foreground'}`}>
                    #{player.rank}
                  </span>
                  <span className="text-lg font-bold">{player.name}</span>
                </div>
                <div className="flex gap-8 text-sm">
                  <div>
                    <span className="text-muted-foreground">Kills: </span>
                    <span className="text-neon-orange font-semibold">{player.kills}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Wins: </span>
                    <span className="text-neon-blue font-semibold">{player.wins}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const StatCard = ({ label, value, suffix, color }: { label: string; value: string; suffix: string; color: string }) => {
  const textClass = color === 'blue' ? 'text-neon-blue' : color === 'orange' ? 'text-neon-orange' : 'text-neon-purple';
  const glowClass = color === 'blue' ? 'glow-blue' : color === 'orange' ? 'glow-orange' : 'glow-purple';
  
  return (
    <div className={`holographic rounded-2xl p-8 text-center ${glowClass}`}>
      <div className={`text-5xl md:text-6xl font-black mb-4 ${textClass}`}>
        {value}{suffix}
      </div>
      <div className="text-muted-foreground text-lg uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
};
