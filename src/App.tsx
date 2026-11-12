/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { LoadingScreen } from './components/LoadingScreen.tsx';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { SelectedWorks } from './components/SelectedWorks.tsx';
import { Explorations } from './components/Explorations.tsx';
import { Footer } from './components/Footer.tsx';
import { ProjectModal } from './components/ProjectModal.tsx';
import { LightboxModal } from './components/LightboxModal.tsx';
import { ResumeModal } from './components/ResumeModal.tsx';
import { ContactModal } from './components/ContactModal.tsx';
import { MusicPlayer } from './components/MusicPlayer.tsx';
import { Project, ExplorationItem } from './types.ts';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  // Modal states
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedExploration, setSelectedExploration] = useState<ExplorationItem | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      const workEl = document.getElementById('work');
      const homeEl = document.getElementById('home');

      if (workEl && scrollPos >= workEl.offsetTop) {
        setActiveSection('work');
      } else if (homeEl) {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-bg text-text-primary selection:bg-[#4E85BF]/30 selection:text-white">
      {/* Section 1: Loading Screen */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* Floating Navbar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={(id) => scrollToSection(id)}
        onResumeClick={() => setIsResumeOpen(true)}
        onContactClick={() => setIsContactOpen(true)}
      />

      {/* Main Content */}
      <main>
        {/* Section 2: Hero */}
        <Hero
          onSeeWorksClick={() => scrollToSection('work')}
          onReachOutClick={() => setIsContactOpen(true)}
        />

        {/* Section 3: Selected Works */}
        <SelectedWorks
          onSelectProject={(proj) => setSelectedProject(proj)}
          onViewAllClick={() => scrollToSection('explorations')}
        />

        {/* Section 4: Explorations (Parallax Gallery) */}
        <Explorations
          onSelectExploration={(item) => setSelectedExploration(item)}
        />
      </main>

      {/* Section 6: Contact / Footer */}
      <Footer onContactClick={() => setIsContactOpen(true)} />

      {/* Modals & Dialogs */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <LightboxModal
        item={selectedExploration}
        onClose={() => setSelectedExploration(null)}
      />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {/* Floating Bottom-Left Music Player with Auto-Start */}
      <MusicPlayer autoStart={!isLoading} />
    </div>
  );
}
