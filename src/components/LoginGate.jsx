import React from 'react';
import { Heart, LogIn, Shield, Activity, Stethoscope, Brain, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { base44, isBase44Configured } from '@/api/base44Client';
import { useLanguage } from '@/lib/LanguageContext';

export default function LoginGate() {
  const { lang, setLang, LANGUAGES } = useLanguage();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (isBase44Configured) {
      base44.auth.redirectToLogin(window.location.href);
      return;
    }
    navigate('/auth');
  };

  const features = [
    { icon: Activity, label: 'AI Symptom Checker', color: 'text-blue-600 bg-blue-100' },
    { icon: Stethoscope, label: 'PCOD Risk Checker', color: 'text-purple-600 bg-purple-100' },
    { icon: Brain, label: 'Neuro / Stroke Check', color: 'text-indigo-600 bg-indigo-100' },
    { icon: Shield, label: 'Health Records', color: 'text-green-600 bg-green-100' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center px-4 py-12">
      {/* Lang switcher */}
      <div className="fixed top-4 right-4 flex items-center gap-1 bg-white rounded-full shadow-md px-2 py-1 z-50">
        <Globe className="w-3.5 h-3.5 text-gray-400 mr-1" />
        {LANGUAGES.map(l => (
          <button key={l.code} onClick={() => setLang(l.code)}
            className={`text-xs px-2 py-1 rounded-full transition-colors font-medium ${lang === l.code ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-gray-800'}`}>
            {l.label}
          </button>
        ))}
      </div>

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-200">
            <Heart className="w-8 h-8 text-white fill-white" />
          </div>
          <h1 className="font-jakarta font-bold text-3xl text-gray-900">
            Medicare<span className="text-blue-600">Pro</span>
          </h1>
          <p className="text-gray-500 mt-2 text-sm">AI-powered early health risk detection</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="font-jakarta font-bold text-xl text-gray-900 mb-1 text-center">Welcome — Please Sign In</h2>
          <p className="text-gray-500 text-sm text-center mb-6">
            Login or create a free account to access all health tools.
          </p>

          <button
            onClick={handleLogin}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-2xl transition-colors text-base shadow-lg shadow-blue-100"
          >
            <LogIn className="w-5 h-5" /> Login / Sign Up — It's Free
          </button>

          <div className="grid grid-cols-2 gap-2 mt-6">
            {features.map(f => {
              const Icon = f.icon;
              return (
                <div key={f.label} className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-xl">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${f.color}`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-medium text-gray-700 leading-tight">{f.label}</span>
                </div>
              );
            })}
          </div>

          <p className="text-center text-xs text-gray-400 mt-5 flex items-center justify-center gap-1">
            <Shield className="w-3 h-3" /> Your data is encrypted and private
          </p>
        </div>
      </div>
    </div>
  );
}
