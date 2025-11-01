import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Smartphone, Monitor, Gamepad2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const PreRegister = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 45,
    hours: 12,
    minutes: 34,
    seconds: 56,
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.platform-btn', {
        opacity: 0,
        y: 50,
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

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const newSeconds = prev.seconds - 1;
        if (newSeconds >= 0) return { ...prev, seconds: newSeconds };
        
        const newMinutes = prev.minutes - 1;
        if (newMinutes >= 0) return { ...prev, minutes: newMinutes, seconds: 59 };
        
        const newHours = prev.hours - 1;
        if (newHours >= 0) return { ...prev, hours: newHours, minutes: 59, seconds: 59 };
        
        const newDays = prev.days - 1;
        if (newDays >= 0) return { days: newDays, hours: 23, minutes: 59, seconds: 59 };
        
        return prev;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className="py-32 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero"></div>
      <div className="absolute inset-0 grid-pattern opacity-20"></div>
      
      <div className="max-w-5xl mx-auto relative z-10 text-center">
        <h2 className="text-5xl md:text-7xl font-black mb-8">
          <span className="text-neon-orange">PRE-REGISTER</span>
          <br />
          <span className="text-neon-blue">FOR EARLY ACCESS</span>
        </h2>

        <p className="text-xl text-foreground/80 mb-12 max-w-2xl mx-auto">
          Be among the first to enter the arena. Get exclusive rewards, early access to new features,
          and limited edition gear.
        </p>

        {/* Countdown Timer */}
        <div className="flex justify-center gap-4 mb-16">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} className="holographic rounded-xl p-6 min-w-[100px] glow-blue">
              <div className="text-4xl font-black text-neon-blue mb-2">
                {value.toString().padStart(2, '0')}
              </div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">
                {unit}
              </div>
            </div>
          ))}
        </div>

        {/* Platform Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
          <Button
            size="lg"
            className="platform-btn text-lg px-10 py-7 bg-primary hover:bg-primary-glow text-primary-foreground font-bold tracking-wider glow-blue transition-all hover:scale-105"
          >
            <Smartphone className="mr-3" size={24} />
            ANDROID
          </Button>
          <Button
            size="lg"
            className="platform-btn text-lg px-10 py-7 bg-secondary hover:bg-secondary-glow text-secondary-foreground font-bold tracking-wider glow-purple transition-all hover:scale-105"
          >
            <Smartphone className="mr-3" size={24} />
            iOS
          </Button>
          <Button
            size="lg"
            className="platform-btn text-lg px-10 py-7 bg-accent hover:bg-accent-glow text-accent-foreground font-bold tracking-wider glow-orange transition-all hover:scale-105"
          >
            <Monitor className="mr-3" size={24} />
            PC
          </Button>
        </div>

        <div className="holographic rounded-2xl p-8 inline-block">
          <p className="text-sm text-muted-foreground mb-2">
            🎮 Pre-register now and receive:
          </p>
          <ul className="text-left space-y-2 text-foreground/90">
            <li>✨ Exclusive Neon Skin Pack</li>
            <li>⚡ 1000 Battle Cores (in-game currency)</li>
            <li>🎯 Legendary Weapon Blueprint</li>
            <li>🏆 Founder's Badge</li>
          </ul>
        </div>
      </div>
    </section>
  );
};
