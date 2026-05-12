import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const links = [
  { label: 'Features', href: '#features' },
  { label: 'Resources', href: '#resources' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function FullScreenMenu({ onClose }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[100] bg-obsidian flex flex-col"
    >
      <div className="flex items-center justify-between px-6 md:px-12 py-5">
        <span className="font-inter font-bold text-xl tracking-tight text-foreground">
          SYNAPSE<span className="text-volt">.</span>
        </span>
        <button
          onClick={onClose}
          className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 hover:border-volt/50 transition-colors duration-300"
        >
          <X className="w-4 h-4 text-foreground" />
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-24">
        <nav className="space-y-2">
          {links.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              onClick={onClose}
              initial={{ x: -60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="block text-foreground font-inter font-bold text-5xl md:text-7xl lg:text-[10vw] leading-none tracking-tighter hover:text-volt transition-colors duration-300"
            >
              {link.label}
            </motion.a>
          ))}
        </nav>
      </div>

      <div className="flex items-center justify-between px-6 md:px-12 py-6 border-t border-white/5">
        <div className="flex items-center gap-6">
          <span className="font-mono text-xs text-steel">
            {time.toLocaleTimeString('en-US', { hour12: false })}
          </span>
          <span className="font-mono text-xs text-steel">
            GLOBAL OPERATIONS
          </span>
        </div>
        <div className="flex items-center gap-4">
          {['LinkedIn', 'Twitter', 'GitHub'].map((social) => (
            <span key={social} className="text-xs text-steel font-inter hover:text-volt cursor-pointer transition-colors">
              {social}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}