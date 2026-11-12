import React, { useState, useEffect } from 'react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
  onResumeClick: () => void;
  onContactClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onResumeClick,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'Educational Content', id: 'work' },
    { label: 'Self-Introduction', id: 'resume' },
  ];

  const handleLinkClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (id === 'resume') {
      onResumeClick();
    } else {
      onNavigate(id);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4 pointer-events-none">
      <div
        className={`pointer-events-auto inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface px-2 py-2 transition-all duration-300 ${
          scrolled ? 'shadow-md shadow-black/30 bg-surface/90 border-white/15' : ''
        }`}
      >
        {/* 1. Logo: 9x9 circle with accent gradient border (reverses direction on hover) */}
        <button
          onClick={() => onNavigate('home')}
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
          className="w-9 h-9 rounded-full relative flex items-center justify-center p-[1.5px] cursor-pointer transition-transform duration-300 hover:scale-110 shrink-0"
          title="Michael Smith Portfolio"
          aria-label="Michael Smith Home"
        >
          {/* Gradient ring */}
          <div
            className={`absolute inset-0 rounded-full transition-all duration-500 ${
              logoHovered ? 'accent-gradient-reverse' : 'accent-gradient'
            }`}
          />
          {/* Inner circle with Code Icon */}
          <div className="relative w-full h-full bg-bg rounded-full flex items-center justify-center z-10 p-1.5">
            <img
              src="/assets/aistudio/code_8a7d9354.png"
              alt="Code Logo"
              className="w-full h-full object-contain invert contrast-125 select-none transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </button>

        {/* 2. Divider: w-px h-5 bg-stroke mx-1 (hidden on mobile) */}
        <div className="w-px h-5 bg-stroke mx-1 hidden sm:block shrink-0" />

        {/* 3. Nav links: ["Home", "Work", "Resume"] */}
        <nav className="flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={(e) => handleLinkClick(link.id, e)}
                className={`text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'text-text-primary bg-stroke/50 font-medium'
                    : 'text-muted hover:text-text-primary hover:bg-stroke/50'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
