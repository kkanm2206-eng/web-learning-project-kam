import React from 'react';
import { motion } from 'framer-motion';

export const Stats: React.FC = () => {
  const statsData = [
    {
      value: '20+',
      label: 'Years Experience',
      subtext: 'Pioneering digital design, interaction systems, and modern web architectures.',
    },
    {
      value: '95+',
      label: 'Projects Done',
      subtext: 'Shipped from initial strategy and spatial prototypes to global production scale.',
    },
    {
      value: '200%',
      label: 'Satisfied Clients',
      subtext: 'Relentless dedication to craft, measurable business impact, and zero-defect execution.',
    },
  ];

  return (
    <section className="bg-bg py-16 md:py-24 border-t border-stroke/50">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              viewport={{ once: true, margin: '-50px' }}
              className="flex flex-col border-l border-stroke/60 pl-6 md:pl-8 py-2 group"
            >
              <div className="text-5xl md:text-6xl lg:text-7xl font-display italic text-text-primary tabular-nums tracking-tight mb-3 group-hover:text-white transition-colors">
                {stat.value}
              </div>
              <h3 className="text-base md:text-lg font-medium text-text-primary tracking-tight mb-2">
                {stat.label}
              </h3>
              <p className="text-xs md:text-sm text-muted leading-relaxed">
                {stat.subtext}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
