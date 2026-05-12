import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu } from 'lucide-react';
import FullScreenMenu from './FullScreenMenu';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-obsidian/80 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-12 py-5">
          <a href="#hero" className="font-inter font-bold text-xl tracking-tight text-foreground">
            SYNAPSE<span className="text-volt">.</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {['Features', 'Resources', 'About', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-steel text-sm font-inter font-medium tracking-wide hover:text-foreground transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className="hidden md:block px-5 py-2.5 bg-volt text-obsidian text-sm font-inter font-semibold rounded-full hover:bg-volt/90 transition-all duration-300 glow-accent"
            >
              Get Started
            </a>
            <button
              onClick={() => setMenuOpen(true)}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 hover:border-volt/50 transition-colors duration-300"
            >
              <Menu className="w-4 h-4 text-foreground" />
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && <FullScreenMenu onClose={() => setMenuOpen(false)} />}
      </AnimatePresence>
    </>
  );
}