import React from 'react';
import { motion } from 'framer-motion';

export default function FeatureCard({ feature, index }) {
  const isLarge = feature.size === 'large';

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative overflow-hidden rounded-2xl border border-white/5 bg-iron hover:border-volt/20 transition-all duration-500 ${
        isLarge ? 'md:col-span-2 md:row-span-2' : ''
      }`}
    >
      {/* Image */}
      {feature.image && (
        <div className="relative h-48 md:h-56 overflow-hidden">
          <img
            src={feature.image}
            alt={feature.title}
            className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-iron via-iron/50 to-transparent" />
        </div>
      )}

      <div className="p-6 md:p-8">
        {/* Tag */}
        <span className="font-mono text-[10px] text-volt tracking-widest uppercase">
          {feature.tag}
        </span>

        {/* Title */}
        <h3 className="font-inter font-bold text-xl md:text-2xl text-foreground mt-3 tracking-tight">
          {feature.title}
        </h3>

        {/* Description */}
        <p className="font-inter text-sm text-steel mt-3 leading-relaxed">
          {feature.description}
        </p>

        {/* Specs */}
        {feature.specs && (
          <div className="mt-6 pt-4 border-t border-white/5 grid grid-cols-2 gap-3">
            {feature.specs.map((spec) => (
              <div key={spec.label}>
                <p className="font-mono text-xs text-volt font-medium">{spec.value}</p>
                <p className="font-mono text-[10px] text-steel mt-0.5">{spec.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute top-3 right-3 w-2 h-2 bg-volt rounded-full" />
      </div>
    </motion.div>
  );
}