import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '../types.ts';

interface SelectedWorksProps {
  onSelectProject: (project: Project) => void;
  onViewAllClick: () => void;
}

import { courseTopics } from '../data/courseTopics.ts';

export const projectsData: Project[] = courseTopics;

export const SelectedWorks: React.FC<SelectedWorksProps> = ({
  onSelectProject,
  onViewAllClick,
}) => {
  return (
    <section id="work" className="bg-bg py-16 md:py-24 border-t border-stroke/50">
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
            {/* Eyebrow: w-8 h-px bg-stroke + "Start Learning" */}
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-stroke inline-block" />
              <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium">
                Start Learning
              </span>
            </div>

            {/* Heading: Basic Website Development */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-text-primary tracking-tight font-light">
              Basic Website{' '}
              <span className="font-display italic font-normal">Development</span>
            </h2>

            {/* Subtext */}
            <p className="text-sm md:text-base text-muted mt-3 max-w-xl leading-relaxed">
              ศึกษาเกี่ยวกับหลักการสร้างเว็บไซต์เบื้องต้น การใช้ภาษา HTML, CSS และ JavaScript ในการออกแบบและพัฒนาเว็บไซต์ การจัดวางเนื้อหา การตกแต่งหน้าเว็บ และการเพิ่มลูกเล่น เพื่อให้สามารถสร้างเว็บไซต์ที่สวยงาม ใช้งานง่าย และนำไปประยุกต์ใช้ได้จริง
            </p>
          </div>

          {/* "View all work" button (desktop only, hidden md:inline-flex) */}
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
                <span>View all</span>
                <span className="text-muted group-hover:text-text-primary transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bento Grid: spans alternate 7 / 5 / 5 / 7 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {projectsData.map((project, index) => {
            const isCol7 = project.colSpan === 7;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                viewport={{ once: true, margin: '-50px' }}
                onClick={() => onSelectProject(project)}
                className={`relative group bg-surface border border-stroke rounded-3xl overflow-hidden cursor-pointer h-[360px] md:h-[460px] ${
                  isCol7 ? 'md:col-span-7' : 'md:col-span-5'
                }`}
              >
                {/* Background image with object-cover group-hover:scale-105 */}
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Halftone overlay: radial-gradient(circle, #000 1px, transparent 1px) at 4x4px, opacity-20 mix-blend-multiply */}
                <div
                  className="absolute inset-0 bg-halftone opacity-20 mix-blend-multiply pointer-events-none"
                  aria-hidden="true"
                />

                {/* Bottom title info scrim (transparent gradient looking through to image) */}
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end justify-between transition-opacity duration-300 group-hover:opacity-40 bg-transparent">
                  <div className="bg-transparent">
                    <div className="flex items-center gap-2 mb-1 bg-transparent">
                      <span className="text-[11px] text-[#89AACC] font-mono tracking-wider bg-transparent">
                        {project.chapterTitle ? project.chapterTitle.split(' ')[0] + ' ' + project.chapterTitle.split(' ')[1] : project.category}
                      </span>
                      {project.sourceDomain && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/80 font-mono border border-white/10">
                          {project.sourceDomain}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl md:text-2xl text-text-primary font-medium tracking-tight bg-transparent">
                      {project.title}
                    </h3>
                  </div>
                  <span className="w-8 h-8 rounded-full border border-white/20 bg-black/40 flex items-center justify-center text-xs text-text-primary md:hidden">
                    ↗
                  </span>
                </div>

                {/* Hover overlay: transparent bg-black/40 with backdrop-blur-sm so background image is visible */}
                <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 backdrop-blur-sm transition-all duration-400 flex flex-col items-center justify-center p-8 text-center">
                  {/* Hover label pill with transparent glass background seeing through to background */}
                  <div className="relative group/pill rounded-full p-[1.5px] mb-4">
                    <span
                      className="absolute inset-0 rounded-full accent-gradient animate-gradient-shift pointer-events-none opacity-80"
                      aria-hidden="true"
                    />
                    <div className="relative px-6 py-2.5 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-medium tracking-wide shadow-xl flex items-center gap-1.5 border border-white/20">
                      <span className="text-white/80">View —</span>
                      <span className="font-['Prompt',sans-serif] text-sm font-normal text-white">
                        {project.title}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs md:text-sm text-muted max-w-sm line-clamp-2 mt-2">
                    {project.description}
                  </p>

                  <div className="mt-4 flex items-center gap-3 text-xs text-text-primary/70 font-mono">
                    <span>{project.deliverables[0]}</span>
                    <span>·</span>
                    <span>{project.year}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile View all work button */}
        <div className="mt-8 flex justify-center md:hidden">
          <button
            onClick={onViewAllClick}
            className="w-full py-3.5 rounded-full text-xs font-medium border border-stroke bg-surface text-text-primary inline-flex items-center justify-center gap-2"
          >
            <span>View all</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </section>
  );
};
