import { Youtube, MessageCircle, Twitch, Instagram } from 'lucide-react';

export const Footer = () => {
  const socialLinks = [
    { icon: Youtube, label: 'YouTube', href: '#' },
    { icon: MessageCircle, label: 'Discord', href: '#' },
    { icon: Twitch, label: 'Twitch', href: '#' },
    { icon: Instagram, label: 'Instagram', href: '#' },
  ];

  return (
    <footer className="relative py-16 px-4 border-t border-border">
      <div className="absolute inset-0 grid-pattern opacity-5"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Social Links */}
        <div className="flex justify-center gap-8 mb-12">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.label}
                href={social.href}
                className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center hover:border-primary hover:glow-blue transition-all group"
                aria-label={social.label}
              >
                <Icon className="text-muted-foreground group-hover:text-primary transition-colors" size={20} />
              </a>
            );
          })}
        </div>

        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <h3 className="text-3xl font-black text-neon-blue mb-2">
            BATTLECORE
          </h3>
          <p className="text-muted-foreground">
            Enter the Survival Arena
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-8 mb-8 text-sm">
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
            Terms of Service
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
            Support
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
            Press Kit
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            © 2025 BattleCore Studios. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/60">
            This project is not affiliated with Garena or Free Fire. All trademarks are property of their respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
};
