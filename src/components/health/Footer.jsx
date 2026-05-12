import React from 'react';
import { Heart, Phone } from 'lucide-react';

export default function Footer({ onEmergency }) {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Heart className="w-4 h-4 text-white fill-white" />
              </div>
              <span className="font-jakarta font-bold text-white text-lg">Medicare<span className="text-blue-400">Pro</span></span>
            </div>
            <p className="text-sm leading-relaxed">Providing compassionate, expert healthcare to thousands of patients across India.</p>
          </div>
          {[
            { title: 'Services', links: ['General Medicine', 'Gynecology', 'Cardiology', 'PCOD Assessment', 'Diagnostics'] },
            { title: 'Quick Links', links: ['Book Appointment', 'Find a Doctor', 'Health Packages', 'Patient Portal', 'Contact Us'] },
            { title: 'Contact', links: ['+91 80 1234 5678', 'care@medicarepro.in', '42 Healthcare Ave, Bengaluru', 'Open 24/7'] },
          ].map(col => (
            <div key={col.title}>
              <h4 className="text-white font-semibold text-sm mb-4">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map(l => <li key={l} className="text-sm hover:text-white transition-colors cursor-pointer">{l}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs">© {new Date().getFullYear()} MediCare Pro. All rights reserved.</p>
          <button onClick={onEmergency} className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors">
            <Phone className="w-4 h-4" /> Emergency: 108
          </button>
        </div>
      </div>
    </footer>
  );
}