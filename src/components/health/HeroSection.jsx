import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Clock, Users, Star } from 'lucide-react';

export default function HeroSection({ onBook, onEmergency }) {
  return (
    <section id="home" className="relative pt-24 pb-16 bg-gradient-to-br from-blue-50 via-white to-cyan-50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100 rounded-full opacity-30 blur-3xl -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-100 rounded-full opacity-40 blur-3xl translate-y-1/2 -translate-x-1/4" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              Trusted by 50,000+ Patients
            </div>
            <h1 className="font-jakarta font-bold text-4xl sm:text-5xl lg:text-6xl text-gray-900 leading-tight mb-6">
              Your Health,
              <br />
              <span className="text-blue-600">Our Priority</span>
            </h1>
            <p className="text-gray-500 text-lg font-inter leading-relaxed mb-8 max-w-lg">
              Comprehensive healthcare with AI-powered PCOD predictions, 24/7 emergency support, and easy appointment booking — all in one place.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={onBook}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full transition-all shadow-lg shadow-blue-200 hover:shadow-blue-300"
              >
                Book Appointment <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onEmergency}
                className="flex items-center gap-2 border-2 border-red-500 text-red-500 hover:bg-red-50 font-semibold px-6 py-3 rounded-full transition-all"
              >
                Emergency Call
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-gray-200">
              {[
                { IconComp: Users, value: '50K+', label: 'Patients' },
                { IconComp: Star, value: '4.9★', label: 'Rating' },
                { IconComp: Clock, value: '24/7', label: 'Support' },
              ].map(({ IconComp, value, label }) => (
                <div key={label} className="text-center">
                  <IconComp className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                  <p className="font-jakarta font-bold text-xl text-gray-900">{value}</p>
                  <p className="text-xs text-gray-500">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&q=80"
              alt="Doctor consultation"
              className="rounded-3xl shadow-2xl w-full object-cover h-[460px]"
            />
            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-900">NABH Accredited</p>
                <p className="text-xs text-gray-500">Certified Healthcare</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}