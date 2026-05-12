import React from 'react';
import { base44 } from '@/api/base44Client';
import { Heart, LogIn, Shield } from 'lucide-react';

export default function RequireAuth({ children }) {
  const [checked, setChecked] = React.useState(false);
  const [authed, setAuthed] = React.useState(false);

  React.useEffect(() => {
    base44.auth.isAuthenticated().then(is => {
      setAuthed(is);
      setChecked(true);
    });
  }, []);

  if (!checked) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="font-jakarta font-bold text-2xl text-gray-900 mb-2">Login Required</h2>
          <p className="text-gray-500 text-sm mb-6 leading-relaxed">
            Please log in to access this feature. Your health data is private and secure — we need you to sign in first.
          </p>
          <button
            onClick={() => base44.auth.redirectToLogin(window.location.href)}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-2xl transition-colors"
          >
            <LogIn className="w-4 h-4" /> Login / Sign Up
          </button>
          <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-gray-400">
            <Heart className="w-3 h-3 text-red-400" /> Free to use · Secure · Private
          </div>
        </div>
      </div>
    );
  }

  return children;
}