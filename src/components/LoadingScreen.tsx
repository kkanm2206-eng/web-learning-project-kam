import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const words = ['Design', 'Create', 'Inspire'];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const duration = 2700; // ms
  const hasFinishedRef = useRef(false);

  // Cycling words every 900ms
  useEffect(() => {
    const wordInterval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 900);
    return () => clearInterval(wordInterval);
  }, []);

  // requestAnimationFrame counter from 0 to 100 over 2700ms
  useEffect(() => {
    let animationFrameId: number;

    const animateCount = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing out slightly for smooth counter feel
      const currentVal = Math.floor(progress * 100);
      setCount(currentVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animateCount);
      } else {
        if (!hasFinishedRef.current) {
          hasFinishedRef.current = true;
          setCount(100);
          setTimeout(() => {
            onComplete();
          }, 400);
        }
      }
    };

    animationFrameId = requestAnimationFrame(animateCount);
    return () => cancelAnimationFrame(animationFrameId);
  }, [duration, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed inset-0 z-[9999] bg-bg flex flex-col justify-between p-6 sm:p-10 md:p-14 select-none"
    >
      {/* Top row */}
      <div className="flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-xs text-muted uppercase tracking-[0.3em] font-medium"
        >
          Portfolio
        </motion.div>
        <div className="text-xs text-muted tracking-[0.2em] uppercase font-mono">
          MICHAEL SMITH ©26
        </div>
      </div>

      {/* Center rotating words */}
      <div className="flex justify-center items-center h-48">
        <AnimatePresence mode="wait">
          <motion.div
            key={words[wordIndex]}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary/80"
          >
            {words[wordIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom row: Counter and Progress */}
      <div className="flex flex-col gap-6">
        <div className="flex items-end justify-between">
          <div className="text-xs text-muted/60 tracking-wider">
            INITIALIZING EXPERIENCE
          </div>
          <div className="text-6xl md:text-8xl lg:text-9xl font-display text-text-primary tabular-nums leading-none">
            {String(count).padStart(3, '0')}
          </div>
        </div>

        {/* Bottom progress bar */}
        <div className="h-[3px] bg-stroke/50 w-full rounded-full overflow-hidden relative">
          <div
            className="h-full accent-gradient transition-transform duration-75 ease-linear rounded-full"
            style={{
              transform: `scaleX(${count / 100})`,
              transformOrigin: 'left',
              boxShadow: '0 0 8px rgba(137, 170, 204, 0.35)',
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};
