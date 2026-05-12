import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Award, TrendingUp } from 'lucide-react';

const stats = [
  { icon: Target, value: '10+', label: 'Years of Engineering Excellence' },
  { icon: Users, value: '120+', label: 'Engineers & Architects' },
  { icon: Award, value: '50+', label: 'Industry Awards' },
  { icon: TrendingUp, value: '3x', label: 'Average Client Growth' },
];

export default function About() {
  return (
    <section id="about" className="relative py-32 px-6 md:px-12 lg:px-24">
      <div className="hairline mb-20" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Left column */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-mono text-xs text-volt tracking-widest uppercase">
            About Synapse
          </span>
          <h2 className="font-inter font-bold text-4xl md:text-5xl lg:text-6xl text-foreground mt-4 tracking-tighter">
            We Don't Build
            <br />
            Websites.
            <br />
            <span className="text-volt">We Engineer</span>
            <br />
            Ecosystems.
          </h2>
        </motion.div>

        {/* Right column */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="flex flex-col justify-center"
        >
          <p className="font-inter text-lg text-steel leading-relaxed">
            Synapse was founded on the belief that digital infrastructure should be 
            invisible, invincible, and intelligent. We are a collective of engineers, 
            architects, and strategists obsessed with building systems that don't just 
            meet requirements—they anticipate them.
          </p>
          <p className="font-inter text-lg text-steel leading-relaxed mt-6">
            Our methodology combines deep technical expertise with strategic business 
            thinking. Every solution we deliver is a force multiplier for our clients, 
            transforming operational complexity into competitive advantage.
          </p>
        </motion.div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="p-6 rounded-2xl border border-white/5 bg-iron/50 hover:border-volt/20 transition-all duration-500"
            >
              <Icon className="w-5 h-5 text-volt mb-4" />
              <p className="font-inter font-bold text-3xl md:text-4xl text-foreground tracking-tight">
                {stat.value}
              </p>
              <p className="font-mono text-xs text-steel mt-2 tracking-wide">
                {stat.label}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}