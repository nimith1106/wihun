import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Heart, Menu, X, Phone, Home, Activity, Stethoscope, Brain, Calendar, AlertCircle, FolderOpen, Info, LogIn, Globe } from 'lucide-react';
import EmergencyModal from './EmergencyModal';
import { useLanguage } from '@/lib/LanguageContext';

const NAV_KEYS = [
  { to: '/', key: 'home', icon: Home },
  { to: '/symptoms', key: 'symptomCheck', icon: Activity },
  { to: '/pcod', key: 'pcod', icon: Stethoscope },
  { to: '/neuro-check', key: 'neuroCheck', icon: Brain },
  { to: '/appointments', key: 'appointments', icon: Calendar },
  { to: '/emergency', key: 'emergency', icon: AlertCircle },
  { to: '/records', key: 'records', icon: FolderOpen },
  { to: '/about', key: 'about', icon: Info },
];

export default function AppLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const location = useLocation();
  const { lang, setLang, t, LANGUAGES } = useLanguage();

  return (
    <div className="min-h-screen bg-white font-inter flex flex-col">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Heart className="w-4 h-4 text-white fill-white" />
              </div>
              <span className="font-jakarta font-bold text-lg text-gray-900">
                Medicare<span className="text-blue-600">Pro</span>
              </span>
            </Link>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_KEYS.map(({ to, key }) => (
                <Link
                  key={to}
                  to={to}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === to
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {t(key)}
                </Link>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowEmergency(true)}
                className="pulse-emergency flex items-center gap-1.5 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-3 py-2 rounded-full transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Emergency</span>
              </button>
              {/* Language toggle */}
              <div className="relative">
                <button onClick={() => setShowLangMenu(!showLangMenu)}
                  className="hidden sm:flex items-center gap-1.5 border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-semibold px-3 py-2 rounded-full transition-colors">
                  <Globe className="w-3.5 h-3.5" />
                  {LANGUAGES.find(l => l.code === lang)?.label}
                </button>
                {showLangMenu && (
                  <div className="absolute right-0 top-full mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl p-2 z-50 min-w-[140px]">
                    {LANGUAGES.map(l => (
                      <button key={l.code} onClick={() => { setLang(l.code); setShowLangMenu(false); }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-colors ${lang === l.code ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>
                        <span className="mr-2">{l.label}</span>{l.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <Link to="/auth" className="hidden sm:flex items-center gap-1.5 border border-blue-600 text-blue-600 hover:bg-blue-50 text-sm font-semibold px-3 py-2 rounded-full transition-colors">
                <LogIn className="w-3.5 h-3.5" />
                {t('login')}
              </Link>
              <button className="lg:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-1">
            {NAV_KEYS.map(({ to, key, icon: NavIcon }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === to ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <NavIcon className="w-4 h-4" />
                {t(key)}
              </Link>
            ))}
            {/* Mobile lang switcher */}
            <div className="flex gap-2 px-3 pt-2">
              {LANGUAGES.map(l => (
                <button key={l.code} onClick={() => { setLang(l.code); setMenuOpen(false); }}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${lang === l.code ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-200 text-gray-600'}`}>
                  {l.label}
                </button>
              ))}
            </div>
            <Link to="/auth" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-blue-600">
              <LogIn className="w-4 h-4" /> {t('login')}
            </Link>
          </div>
        )}
      </nav>

      {/* Page content */}
      <main className="flex-1">
        <Outlet context={{ openEmergency: () => setShowEmergency(true) }} />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
              <Heart className="w-3.5 h-3.5 text-white fill-white" />
            </div>
            <span className="font-jakarta font-bold text-white">Medicare<span className="text-blue-400">Pro</span></span>
          </div>
          <p className="text-xs text-center">⚠️ This platform provides early risk indicators only — not medical diagnoses. Always consult a qualified doctor.</p>
          <p className="text-xs">© {new Date().getFullYear()} MediCare Pro</p>
        </div>
      </footer>

      {showEmergency && <EmergencyModal onClose={() => setShowEmergency(false)} />}
    </div>
  );
}