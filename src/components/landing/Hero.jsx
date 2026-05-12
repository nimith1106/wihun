import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

const HERO_IMG = 'https://media.base44.com/images/public/69fb79b7748e5b3f3b5c5295/019eed3a6_generated_4787b0e5.png';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img src={HERO_IMG} alt="Precision engineering macro" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/60 via-obsidian/80 to-obsidian" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />

      <div className="relative z-10 px-6 md:px-12 lg:px-24 pt-32 pb-20">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex items-center gap-3 mb-12"
        >
          <span className="w-2 h-2 rounded-full bg-volt animate-pulse" />
          <span className="font-mono text-xs text-steel tracking-widest uppercase">
            Systems Online — v3.0
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-inter font-bold text-5xl md:text-7xl lg:text-8xl xl:text-9xl leading-[0.9] tracking-tighter max-w-6xl"
        >
          Engineering
          <br />
          <span className="text-volt">Digital</span>
          <br />
          Dominance
        </motion.h1>

        {/* Sub-copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-10 max-w-xl text-steel text-lg md:text-xl font-inter font-light leading-relaxed"
        >
          We architect high-performance digital ecosystems that transform complex 
          requirements into intuitive, high-velocity experiences.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-12 flex flex-wrap items-center gap-4"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-volt text-obsidian font-inter font-semibold text-sm rounded-full hover:bg-volt/90 transition-all duration-300 glow-accent"
          >
            Start Your Project
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#features"
            className="inline-flex items-center gap-3 px-8 py-4 border border-white/10 text-foreground font-inter font-medium text-sm rounded-full hover:border-volt/50 hover:text-volt transition-all duration-300"
          >
            Explore Capabilities
          </a>
        </motion.div>

        {/* KPI strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 1 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/5 pt-10"
        >
          {[
            { value: '99.9%', label: 'Uptime SLA' },
            { value: '< 50ms', label: 'Response Time' },
            { value: '500+', label: 'Projects Delivered' },
            { value: '24/7', label: 'Global Support' },
          ].map((kpi) => (
            <div key={kpi.label}>
              <p className="font-inter font-bold text-3xl md:text-4xl text-foreground tracking-tight">
                {kpi.value}
              </p>
              <p className="font-mono text-xs text-steel mt-2 tracking-wide uppercase">
                {kpi.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <ChevronDown className="w-5 h-5 text-steel" />
      </motion.div>
    </section>
  );
}