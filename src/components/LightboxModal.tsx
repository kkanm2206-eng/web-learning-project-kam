import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExplorationItem } from '../types.ts';

interface LightboxModalProps {
  item: ExplorationItem | null;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  item,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (item) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-lg"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 max-w-2xl w-full flex flex-col items-center"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 sm:right-0 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close lightbox"
            >
              ✕
            </button>

            {/* High-res Image Card */}
            <div className="w-full aspect-square rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-surface">
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Caption */}
            <div className="mt-4 w-full flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-2 text-xs text-muted">
              <div>
                <span className="text-text-primary font-medium text-sm block">
                  {item.title}
                </span>
                <span>{item.medium} · {item.year}</span>
              </div>
              <p className="max-w-xs text-right sm:text-right text-[11px] text-muted/80">
                {item.description}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
