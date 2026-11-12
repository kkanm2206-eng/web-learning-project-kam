import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleDownload = () => {
    const resumeText = `PROJECT CREATORS: WEB DESIGN & DEVELOPMENT
Miss Phimchanok Suksanguan & Mr. Kunanon Mokhom
Project: Development of an Educational Website for an Introductory Web Design Course

OBJECTIVES & OVERVIEW
Development of an interactive, accessible, and structured educational website covering 10 comprehensive chapters from Web Fundamentals, HTML5, CSS3, JavaScript, DOM manipulation, to practical web projects.

CORE CURRICULUM MODULES
1. เว็บไซต์สื่อการสอนการสร้างเว็บไซต์เบื้องต้น
2. เว็บไซต์บทเรียนออนไลน์ HTML, CSS และ JavaScript
3. สื่อการเรียนรู้ออนไลน์ เรื่อง การพัฒนาเว็บไซต์เบื้องต้น
4. เว็บไซต์เพื่อการเรียนรู้การเขียนโค้ดสร้างเว็บ
5. สื่อการสอนเชิงโต้ตอบ เรื่อง HTML, CSS และ JavaScript
6. เว็บแอปพลิเคชันสื่อการสอนการสร้างเว็บไซต์
7. แพลตฟอร์มเรียนรู้การสร้างเว็บไซต์ด้วยตนเอง
8. เว็บไซต์สื่อการสอนและแบบทดสอบการสร้างเว็บ
9. สื่อมัลติมีเดียบนเว็บ เรื่อง การสร้างเว็บไซต์เบื้องต้น
10. เว็บไซต์คู่มือฝึกปฏิบัติการเขียนโค้ดสร้างเว็บ
`;
    const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Web_Design_Project_Curriculum.txt';
    a.click();
    URL.revokeObjectURL(url);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-surface border border-stroke rounded-3xl shadow-2xl p-6 sm:p-10"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-stroke/40 hover:bg-stroke text-muted hover:text-text-primary flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              ✕
            </button>

            {/* Header */}
            <div className="border-b border-stroke/50 pb-6 mb-8">
              <span className="text-xs text-muted uppercase tracking-[0.3em] font-mono block mb-2">
                Project Creators & Curriculum
              </span>
              <h2 className="text-2xl sm:text-3xl font-light text-text-primary tracking-tight">
                Miss Phimchanok Suksanguan & Mr. Kunanon Mokhom
              </h2>
              <p className="text-sm text-muted mt-1 font-mono">
                Project on the Development of an Educational Website for an Introductory Web Design Course
              </p>
            </div>

            {/* Content Sections */}
            <div className="space-y-8 text-sm">
              {/* Experience */}
              <div>
                <h3 className="text-xs uppercase tracking-widest text-muted font-mono mb-4">
                  Experience (20+ Years)
                </h3>
                <div className="space-y-5">
                  <div className="border-l border-stroke pl-4">
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="font-medium text-text-primary">
                        Founder & Principal Technologist
                      </h4>
                      <span className="text-xs text-muted font-mono">
                        2020 – Present
                      </span>
                    </div>
                    <p className="text-xs text-[#89AACC] font-mono mb-1">
                      Studio Smith · Chicago
                    </p>
                    <p className="text-xs text-muted leading-relaxed">
                      Leading bespoke digital experiences, design systems, and
                      performant web architectures for ambitious brands.
                    </p>
                  </div>

                  <div className="border-l border-stroke pl-4">
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="font-medium text-text-primary">
                        Head of Interaction & HMI
                      </h4>
                      <span className="text-xs text-muted font-mono">
                        2016 – 2020
                      </span>
                    </div>
                    <p className="text-xs text-[#89AACC] font-mono mb-1">
                      Veloce Dynamics
                    </p>
                    <p className="text-xs text-muted leading-relaxed">
                      Directed connected in-car dashboard UX and real-time motion
                      choreography for luxury electric hypercar systems.
                    </p>
                  </div>

                  <div className="border-l border-stroke pl-4">
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="font-medium text-text-primary">
                        Lead UI/UX Architect
                      </h4>
                      <span className="text-xs text-muted font-mono">
                        2011 – 2016
                      </span>
                    </div>
                    <p className="text-xs text-[#89AACC] font-mono mb-1">
                      Metropolis Interactive
                    </p>
                    <p className="text-xs text-muted leading-relaxed">
                      Created scalable web applications, editorial platforms,
                      and interactive spatial galleries for institutional clients.
                    </p>
                  </div>
                </div>
              </div>

              {/* Core Competencies */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-stroke/40">
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-muted font-mono mb-3">
                    Interaction & Design
                  </h3>
                  <p className="text-xs text-text-primary/80 leading-relaxed">
                    Design Systems, Micro-Choreography, HMI Telematics, Editorial Direction, Typography Hierarchy, Rapid Prototyping.
                  </p>
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-muted font-mono mb-3">
                    Technical Stack
                  </h3>
                  <p className="text-xs text-text-primary/80 leading-relaxed">
                    React 19, TypeScript, GSAP 3, Tailwind CSS v4, Framer Motion, HLS Streaming, WebGL, Node.js, Express.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-6 border-t border-stroke/40 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-muted font-mono">
                Available for advisory & principal consulting
              </span>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={handleDownload}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-full text-xs font-medium bg-text-primary text-bg hover:bg-white transition-all cursor-pointer"
                >
                  {downloaded ? 'Downloaded ✓' : 'Download Resume (.txt)'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
