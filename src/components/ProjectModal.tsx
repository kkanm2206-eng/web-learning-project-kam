import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../types.ts';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
}) => {
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  const handleCopyCode = (code: string, idx: number) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(code);
      setCopiedCodeIndex(idx);
      setTimeout(() => setCopiedCodeIndex(null), 2000);
    }
  };

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop: div:nth-of-type(1) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container: div:nth-of-type(2) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-surface border border-stroke rounded-3xl shadow-2xl p-6 sm:p-10"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-stroke/40 hover:bg-stroke text-muted hover:text-text-primary flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              ✕
            </button>

            {/* Header info: div:nth-of-type(1) */}
            <div className="mb-6 pr-12">
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted uppercase tracking-widest font-mono mb-2">
                {project.chapterTitle && (
                  <span className="text-[#89AACC] font-semibold">
                    {project.chapterTitle.split(' ')[0]} {project.chapterTitle.split(' ')[1]}
                  </span>
                )}
                <span>·</span>
                <span>{project.category}</span>
                <span>·</span>
                <span>{project.year}</span>
                {project.sourceDomain && (
                  <>
                    <span>·</span>
                    <span className="text-text-primary/70">{project.sourceDomain}</span>
                  </>
                )}
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-text-primary">
                {project.title}
              </h2>
              {project.chapterTitle && (
                <p className="text-sm md:text-base text-muted mt-2 font-mono">
                  {project.chapterTitle}
                </p>
              )}
            </div>

            {/* Main Image: div:nth-of-type(2) */}
            <div className="w-full h-[320px] sm:h-[460px] rounded-2xl overflow-hidden mb-8 border border-stroke bg-black/60 flex items-center justify-center p-2">
              <img
                src={project.image}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain rounded-xl"
              />
            </div>

            {/* Details Grid: div:nth-of-type(3) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {/* div:nth-of-type(1) */}
              <div className="md:col-span-2 space-y-4">
                <h4 className="text-xs uppercase tracking-widest text-muted font-mono">
                  Overview & Challenge
                </h4>
                {/* p:nth-of-type(1) */}
                <p className="text-text-primary/90 leading-relaxed text-sm sm:text-base">
                  {project.description}
                </p>
                <div className="p-4 rounded-xl bg-stroke/20 border border-stroke/40 text-xs sm:text-sm text-text-primary font-mono">
                  <span className="text-muted block text-[11px] uppercase mb-1">
                    Key Impact / Outcome
                  </span>
                  {project.metrics}
                </div>
              </div>

              {/* div:nth-of-type(2) */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-muted font-mono mb-2">
                    Client & Role
                  </h4>
                  <p className="text-sm font-medium text-text-primary">
                    {project.client}
                  </p>
                  <p className="text-xs text-muted mt-0.5">{project.role}</p>
                </div>

                <div>
                  <h4 className="text-xs uppercase tracking-widest text-muted font-mono mb-2">
                    Deliverables
                  </h4>
                  <ul className="space-y-1.5 text-xs text-text-primary/80">
                    {project.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#89AACC]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Comprehensive Curriculum Sections */}
            {project.sections && project.sections.length > 0 && (
              <div className="mt-10 pt-8 border-t border-stroke/40 space-y-8">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-[#89AACC]">
                      {project.chapterTitle || 'Course Curriculum'}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-light text-text-primary mt-1">
                      เนื้อหาบทเรียนและการปฏิบัติการ
                    </h3>
                  </div>
                  {project.sourceDomain && (
                    <span className="text-xs px-3 py-1 rounded-full bg-stroke/30 border border-stroke/50 text-muted font-mono">
                      {project.sourceDomain}
                    </span>
                  )}
                </div>

                {/* List of sections */}
                <div className="space-y-6">
                  {project.sections.map((section, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-5 sm:p-6 rounded-2xl bg-black/40 border border-stroke/40 hover:border-stroke/70 transition-colors"
                    >
                      <h4 className="text-base sm:text-lg font-medium text-text-primary mb-3 flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-[#89AACC]" />
                        <span>{section.title}</span>
                      </h4>

                      {/* Formatted Content */}
                      <div className="text-text-primary/85 leading-relaxed text-sm whitespace-pre-line space-y-2 font-normal">
                        {section.content}
                      </div>

                      {/* Code snippet if present */}
                      {section.code && (
                        <div className="mt-4 rounded-xl overflow-hidden border border-white/10 bg-[#0d1117]">
                          <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10 text-xs font-mono text-muted">
                            <span className="text-[#89AACC]">Code Example</span>
                            <button
                              onClick={() => handleCopyCode(section.code!, sIdx)}
                              className="text-[11px] px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                            >
                              {copiedCodeIndex === sIdx ? '✓ Copied' : 'Copy'}
                            </button>
                          </div>
                          <pre className="p-4 text-xs font-mono text-[#c9d1d9] overflow-x-auto leading-relaxed">
                            <code>{section.code}</code>
                          </pre>
                        </div>
                      )}

                      {/* Structured table if present */}
                      {section.table && (
                        <div className="mt-4 overflow-x-auto rounded-xl border border-white/10">
                          <table className="w-full text-left text-xs border-collapse">
                            <thead>
                              <tr className="bg-white/5 border-b border-white/10 text-text-primary/90 font-mono">
                                {section.table.headers.map((h, hIdx) => (
                                  <th key={hIdx} className="p-3 font-semibold">
                                    {h}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                              {section.table.rows.map((row, rIdx) => (
                                <tr
                                  key={rIdx}
                                  className={rIdx % 2 === 0 ? 'bg-black/20' : 'bg-transparent'}
                                >
                                  {row.map((cell, cIdx) => (
                                    <td
                                      key={cIdx}
                                      className={`p-3 text-text-primary/80 ${
                                        cIdx === 0 ? 'font-mono text-[#89AACC]' : ''
                                      }`}
                                    >
                                      {cell}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Summary Block */}
                {project.summary && (
                  <div className="p-5 sm:p-6 rounded-2xl bg-[#4E85BF]/10 border border-[#4E85BF]/30">
                    <div className="flex items-center gap-2 mb-2 text-[#89AACC] font-mono text-xs uppercase tracking-wider">
                      <span>✦</span>
                      <span>สรุปเนื้อหาสำคัญ</span>
                    </div>
                    <p className="text-text-primary/90 text-sm leading-relaxed">
                      {project.summary}
                    </p>
                  </div>
                )}

                {/* Activity Block */}
                {project.activity && (
                  <div className="p-5 sm:p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                    <div className="flex items-center gap-2 mb-2 text-amber-400 font-mono text-xs uppercase tracking-wider">
                      <span>✎</span>
                      <span>กิจกรรมฝึกปฏิบัติ</span>
                    </div>
                    <p className="text-text-primary/90 text-sm leading-relaxed">
                      {project.activity}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Footer action */}
            <div className="flex items-center justify-between pt-6 mt-6 border-t border-stroke/40">
              <span className="text-xs text-muted font-mono">
                WEB CREATION COURSE REF #{project.id.toUpperCase()}
              </span>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full text-xs font-medium bg-stroke/50 hover:bg-stroke text-text-primary transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
