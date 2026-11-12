import React from 'react';
import { motion } from 'framer-motion';
import { JournalEntry } from '../types.ts';

interface JournalProps {
  onSelectArticle: (article: JournalEntry) => void;
  onViewAllClick: () => void;
}

export const journalData: JournalEntry[] = [
  {
    id: 'intentional-motion',
    title: 'Crafting Intentional Motion in Digital Spaces',
    date: 'Oct 24, 2026',
    readTime: '5 min read',
    category: 'Interaction Design',
    summary:
      'Why micro-choreography matters more than extravagant splash animations, and how 150ms spring curves anchor the user mental model.',
    content: [
      'Movement in user interfaces should never exist solely for ornament. The primary directive of motion is orientation: establishing where the user came from, where their attention should focus, and how spatial hierarchies relate.',
      'By tuning settling curves to 120-180ms with gentle spring dampening, digital surfaces feel tangible rather than sluggish. Motion is the connective tissue of interactive design.'
    ],
    image: '/src/assets/images/exploration_kinetic_geometry_1794315673964.jpg',
  },
  {
    id: 'subtleties-of-typography',
    title: 'The Subtleties of Typography, Scale and Hierarchy',
    date: 'Sep 12, 2026',
    readTime: '7 min read',
    category: 'Typography',
    summary:
      'Exploring the friction between stark neo-grotesque sans and editorial serifs to build memorable tension on screen.',
    content: [
      'Pairing an austere structural body sans with an expressive, high-contrast italic display serif creates immediate emotional cadence. The eye reads the structure first, then savors the emphasis.',
      'We discuss optical kerning, proportional baseline rhythms, and why tabular numerals are critical for trust in modern technical artifacts.'
    ],
    image: '/src/assets/images/work_brand_identity_1794315673464.jpg',
  },
  {
    id: 'zero-latency-interactions',
    title: 'Designing for Zero-Latency Interactions',
    date: 'Aug 04, 2026',
    readTime: '4 min read',
    category: 'Engineering & UX',
    summary:
      'Architecting interfaces that predict user intent, stream data progressively, and eliminate perceivable interaction latency.',
    content: [
      'Perceived performance is an art form. When an interface responds instantaneously on pointer-down rather than pointer-up, and updates optimistically while background synchronization completes, the software feels magical.',
      'Techniques for eliminating layout shift, compositing GPU-accelerated layers, and maintaining 120fps UI responsiveness.'
    ],
    image: '/src/assets/images/work_automotive_motion_1794315671667.jpg',
  },
  {
    id: 'architectural-hmi',
    title: 'Form and Structure: An Architectural Approach to HMI',
    date: 'Jun 19, 2026',
    readTime: '8 min read',
    category: 'Systems & Architecture',
    summary:
      'Translating brutalist monoliths and clean spatial volumes into human-machine interfaces that withstand the test of time.',
    content: [
      'Monolithic buildings communicate solidity and endurance through honest materials, exposed joinery, and unambiguous massing. Software can adopt identical philosophies.',
      'A study on high-density information architecture, tactile feedback thresholds, and resilient dark mode design systems.'
    ],
    image: '/src/assets/images/work_urban_architecture_1794315670864.jpg',
  },
];

export const Journal: React.FC<JournalProps> = ({
  onSelectArticle,
  onViewAllClick,
}) => {
  return (
    <section id="journal" className="bg-bg py-16 md:py-24 border-t border-stroke/50">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, margin: '-100px' }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6"
        >
          <div>
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-stroke inline-block" />
              <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium">
                Journal
              </span>
            </div>

            {/* Heading: Recent thoughts */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-text-primary tracking-tight font-light">
              Recent{' '}
              <span className="font-display italic font-normal">thoughts</span>
            </h2>

            {/* Subtext */}
            <p className="text-sm md:text-base text-muted mt-3 max-w-xl">
              Articles, reflections, and technical notes on modern software design.
            </p>
          </div>

          {/* View all button */}
          <div className="hidden md:inline-flex">
            <div className="relative group rounded-full">
              <span
                className="absolute -inset-[2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 pointer-events-none"
                aria-hidden="true"
              />
              <button
                onClick={onViewAllClick}
                className="rounded-full text-xs font-medium px-6 py-3 border border-stroke bg-surface text-text-primary backdrop-blur-md inline-flex items-center gap-2 cursor-pointer transition-all duration-200 group-hover:bg-surface/80"
              >
                <span>View all thoughts</span>
                <span className="text-muted group-hover:text-text-primary transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* 4 journal entries displayed as horizontal pills (rounded-[40px] sm:rounded-full) */}
        <div className="flex flex-col gap-4">
          {journalData.map((entry, index) => {
            return (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                viewport={{ once: true, margin: '-40px' }}
                onClick={() => onSelectArticle(entry)}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 p-4 sm:p-3 sm:pr-8 bg-surface/30 hover:bg-surface border border-stroke rounded-[32px] sm:rounded-full transition-all duration-300 group cursor-pointer hover:border-stroke/80 hover:shadow-lg hover:shadow-black/20"
              >
                {/* Left: Thumbnail & Title */}
                <div className="flex items-center gap-4 sm:gap-6">
                  {/* Image thumbnail */}
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden shrink-0 border border-stroke/60 relative">
                    <img
                      src={entry.image}
                      alt={entry.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  {/* Title & Category */}
                  <div>
                    <span className="text-[11px] text-muted tracking-wider uppercase font-mono block mb-0.5">
                      {entry.category}
                    </span>
                    <h3 className="text-base sm:text-lg text-text-primary font-medium tracking-tight group-hover:text-white transition-colors">
                      {entry.title}
                    </h3>
                  </div>
                </div>

                {/* Right: Date, Read Time & Arrow */}
                <div className="flex items-center justify-between sm:justify-end gap-6 pl-18 sm:pl-0 shrink-0">
                  <div className="flex items-center gap-3 text-xs text-muted font-mono">
                    <span>{entry.date}</span>
                    <span aria-hidden="true">·</span>
                    <span>{entry.readTime}</span>
                  </div>

                  <div className="w-9 h-9 rounded-full bg-stroke/30 border border-stroke/50 flex items-center justify-center text-xs text-muted group-hover:text-text-primary group-hover:bg-stroke/60 transition-all duration-200">
                    <span className="transition-transform group-hover:translate-x-0.5">
                      →
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile View all thoughts button */}
        <div className="mt-8 flex justify-center md:hidden">
          <button
            onClick={onViewAllClick}
            className="w-full py-3.5 rounded-full text-xs font-medium border border-stroke bg-surface text-text-primary inline-flex items-center justify-center gap-2"
          >
            <span>View all thoughts</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </section>
  );
};
