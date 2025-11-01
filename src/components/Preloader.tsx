import { useEffect, useState } from 'react';

export const Preloader = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="text-center space-y-8">
        <div className="relative">
          <div className="w-24 h-24 border-4 border-primary/20 rounded-full animate-spin">
            <div className="absolute top-0 left-1/2 w-4 h-4 -ml-2 -mt-2 bg-primary rounded-full glow-blue"></div>
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-neon-blue tracking-wider">
            DEPLOYING TO ARENA
          </h2>
          <div className="w-64 h-2 bg-card rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-neon transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-muted-foreground font-mono">{progress}%</p>
        </div>
      </div>
    </div>
  );
};
