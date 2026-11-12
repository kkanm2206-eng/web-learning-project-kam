import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { JournalEntry } from '../types.ts';

interface ArticleModalProps {
  article: JournalEntry | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (article) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [article, onClose]);

  return (
    <AnimatePresence>
      {article && (
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

            {/* Header info */}
            <div className="mb-6 pr-12">
              <div className="flex items-center gap-2 text-xs text-muted uppercase tracking-widest font-mono mb-2">
                <span>{article.category}</span>
                <span>·</span>
                <span>{article.date}</span>
                <span>·</span>
                <span>{article.readTime}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-text-primary leading-tight">
                {article.title}
              </h2>
            </div>

            {/* Thumbnail banner */}
            <div className="w-full h-[220px] sm:h-[300px] rounded-2xl overflow-hidden mb-8 border border-stroke">
              <img
                src={article.image}
                alt={article.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content prose */}
            <div className="space-y-4 text-text-primary/90 leading-relaxed text-sm sm:text-base font-light">
              <p className="font-normal text-text-primary text-base sm:text-lg border-l-2 border-[#89AACC] pl-4 italic">
                {article.summary}
              </p>
              {article.content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Signoff */}
            <div className="mt-8 pt-6 border-t border-stroke/40 flex items-center justify-between text-xs text-muted">
              <div>
                Written by <span className="text-text-primary">Michael Smith</span> · Chicago
              </div>
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-full text-xs font-medium bg-stroke/50 hover:bg-stroke text-text-primary transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
