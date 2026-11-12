import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setMessage('');
      onClose();
    }, 2400);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText('hello@michaelsmith.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
            className="relative z-10 w-full max-w-xl bg-surface border border-stroke rounded-3xl shadow-2xl p-6 sm:p-10"
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
            <div className="mb-6">
              <span className="text-xs text-muted uppercase tracking-[0.3em] font-mono block mb-2">
                Initiate Dialogue
              </span>
              <h2 className="text-3xl font-light text-text-primary tracking-tight">
                Say <span className="font-display italic">hello.</span>
              </h2>
              <p className="text-xs sm:text-sm text-muted mt-1">
                Currently open for design direction, high-impact consulting, and bespoke projects.
              </p>
            </div>

            {/* Quick Contact Pill */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-bg border border-stroke/70 mb-6">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs text-text-primary font-mono">
                  hello@michaelsmith.com
                </span>
              </div>
              <button
                type="button"
                onClick={handleCopy}
                className="text-xs px-3 py-1 rounded-full bg-stroke/50 hover:bg-stroke text-muted hover:text-text-primary transition-colors cursor-pointer"
              >
                {copied ? 'Copied ✓' : 'Copy'}
              </button>
            </div>

            {/* Form */}
            {submitted ? (
              <div className="py-12 text-center">
                <div className="w-12 h-12 rounded-full accent-gradient mx-auto flex items-center justify-center text-black font-bold mb-4">
                  ✓
                </div>
                <h3 className="text-lg text-text-primary font-medium mb-1">
                  Message Sent
                </h3>
                <p className="text-xs text-muted">
                  Thank you. Michael will review your note and respond shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-muted font-mono mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Elena Rostova"
                    className="w-full px-4 py-3 rounded-xl bg-bg border border-stroke text-text-primary text-sm focus:outline-none focus:border-[#89AACC] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-muted font-mono mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="elena@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-bg border border-stroke text-text-primary text-sm focus:outline-none focus:border-[#89AACC] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-muted font-mono mb-1.5">
                    Project Note / Scope
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me a bit about your timeline, vision, or challenge..."
                    className="w-full px-4 py-3 rounded-xl bg-bg border border-stroke text-text-primary text-sm focus:outline-none focus:border-[#89AACC] transition-colors resize-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-muted font-mono">
                    Based in Chicago, IL (CT)
                  </span>
                  <div className="relative group rounded-full">
                    <span
                      className="absolute -inset-[2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity -z-10"
                      aria-hidden="true"
                    />
                    <button
                      type="submit"
                      className="rounded-full text-xs font-medium px-6 py-2.5 bg-text-primary text-bg hover:bg-white transition-all cursor-pointer"
                    >
                      Send Message →
                    </button>
                  </div>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
