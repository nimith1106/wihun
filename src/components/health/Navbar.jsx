import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Heart } from 'lucide-react';

export default function Navbar({ onEmergency }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const links = ['Home', 'Services', 'PCOD Check', 'Appointments', 'About'];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-white/90 backdrop-blur'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Heart className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="font-jakarta font-bold text-xl text-gray-900">
              Medicare<span className="text-blue-600">Pro</span>
            </span>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {links.map(link => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(' ', '-')}`}
                className="text-gray-600 hover:text-blue-600 text-sm font-inter font-medium transition-colors"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Emergency button */}
          <div className="flex items-center gap-3">
            <button
              onClick={onEmergency}
              className="pulse-emergency flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">Emergency</span>
            </button>
            <button className="md:hidden" onClick={() => setOpen(!open)}>
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 space-y-1">
          {links.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(' ', '-')}`}
              onClick={() => setOpen(false)}
              className="block py-2 text-gray-700 hover:text-blue-600 text-sm font-medium"
            >
              {link}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}