import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, User, Mail, Lock, Phone, Eye, EyeOff, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Auth() {
  const [mode, setMode] = useState('login'); // 'login' | 'signup' | 'done'
  const [showPw, setShowPw] = useState(false);
  const [form, setForm] = useState(/** @type {{name:string; email:string; phone:string; password:string}} */ ({ name: '', email: '', phone: '', password: '' }));
  const [errors, setErrors] = useState(/** @type {{name?: string; email?: string; phone?: string; password?: string}} */ ({}));
  const [loading, setLoading] = useState(false);

  const set = /** @param {'name'|'email'|'phone'|'password'} k @param {string} v */ (k, v) => { setForm(f => ({ ...f, [k]: v })); setErrors(e => ({ ...e, [k]: '' })); };

  const validate = () => {
    const errs = {};
    if (mode === 'signup' && !form.name.trim()) errs.name = 'Name is required';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = 'Enter a valid email';
    if (form.password.length < 6) errs.password = 'Password must be at least 6 characters';
    if (mode === 'signup' && !form.phone.match(/^\+?[\d\s-]{8,}$/)) errs.phone = 'Enter a valid phone number';
    return errs;
  };

  const handleSubmit = /** @param {{ preventDefault: () => void }} e */ (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setMode('done'); }, 1200);
  };

  if (mode === 'done') {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-xl p-8 max-w-sm w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="font-jakarta font-bold text-2xl text-gray-900 mb-2">
            {mode === 'done' ? 'Welcome to MediCare Pro!' : ''}
          </h2>
          <p className="text-gray-500 mb-8">You're now logged in. Start checking your health risks.</p>
          <div className="space-y-3">
            <Link to="/symptoms" className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors">
              <ArrowRight className="w-4 h-4" /> Start Symptom Check
            </Link>
            <Link to="/pcod" className="flex items-center justify-center gap-2 w-full border border-purple-300 text-purple-700 hover:bg-purple-50 font-semibold py-3 rounded-xl transition-colors">
              Check PCOD Risk
            </Link>
            <Link to="/records" className="flex items-center justify-center gap-2 w-full border border-gray-200 text-gray-600 hover:bg-gray-50 font-semibold py-3 rounded-xl transition-colors">
              My Health Records
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Heart className="w-6 h-6 text-white fill-white" />
          </div>
          <h1 className="font-jakarta font-bold text-2xl text-gray-900">MediCare Pro</h1>
          <p className="text-gray-500 text-sm mt-1">Your personal health risk platform</p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6">
          {/* Tabs */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
            {[['login', 'Login'], ['signup', 'Sign Up']].map(([m, l]) => (
              <button key={m} onClick={() => { setMode(m); setErrors({}); }}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${mode === m ? 'bg-white shadow-sm text-blue-700' : 'text-gray-500 hover:text-gray-700'}`}>
                {l}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.form key={mode} initial={{ opacity: 0, x: mode === 'signup' ? 20 : -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
              onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="text" placeholder="Your full name" value={form.name} onChange={e => set('name', e.target.value)}
                      className={`w-full border rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 ${errors.name ? 'border-red-400' : 'border-gray-200'}`} />
                  </div>
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Email *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="email" placeholder="you@email.com" value={form.email} onChange={e => set('email', e.target.value)}
                    className={`w-full border rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 ${errors.email ? 'border-red-400' : 'border-gray-200'}`} />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Phone Number *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="tel" placeholder="+91 9876543210" value={form.phone} onChange={e => set('phone', e.target.value)}
                      className={`w-full border rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 ${errors.phone ? 'border-red-400' : 'border-gray-200'}`} />
                  </div>
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Password *</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type={showPw ? 'text' : 'password'} placeholder="Min. 6 characters" value={form.password} onChange={e => set('password', e.target.value)}
                    className={`w-full border rounded-xl pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 ${errors.password ? 'border-red-400' : 'border-gray-200'}`} />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>

              <button type="submit" disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-70 mt-2">
                {loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Create Account'}
              </button>
            </motion.form>
          </AnimatePresence>

          <p className="text-center text-xs text-gray-400 mt-4">
            By continuing, you agree to our <span className="text-blue-600 cursor-pointer">Terms</span> and <span className="text-blue-600 cursor-pointer">Privacy Policy</span>.
          </p>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          ⚠️ MediCare Pro provides early risk screening only — not medical diagnoses.
        </p>
      </div>
    </div>
  );
}