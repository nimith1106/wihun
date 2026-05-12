import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Brain, Heart, Baby, Bone, Stethoscope, Microscope, Eye } from 'lucide-react';

const services = [
  { icon: Activity, title: 'PCOD/PCOS Care', desc: 'AI-powered risk assessment and personalized treatment plans for hormonal health.', color: 'bg-purple-100 text-purple-600', tag: 'AI-Powered' },
  { icon: Heart, title: 'Cardiology', desc: 'Advanced cardiac care with ECG monitoring, stress tests, and interventional procedures.', color: 'bg-red-100 text-red-600', tag: '' },
  { icon: Baby, title: 'Gynecology', desc: 'Comprehensive women\'s health from routine checkups to complex obstetric care.', color: 'bg-pink-100 text-pink-600', tag: '' },
  { icon: Brain, title: 'Neurology', desc: 'Expert neurological care with cutting-edge diagnostics and treatment protocols.', color: 'bg-blue-100 text-blue-600', tag: '' },
  { icon: Bone, title: 'Orthopedics', desc: 'Joint replacement, sports injuries, spine care, and rehabilitation programs.', color: 'bg-orange-100 text-orange-600', tag: '' },
  { icon: Microscope, title: 'Diagnostics', desc: 'State-of-the-art lab testing with rapid results and detailed health reports.', color: 'bg-teal-100 text-teal-600', tag: '' },
  { icon: Stethoscope, title: 'General Medicine', desc: 'Primary healthcare, preventive care, and chronic disease management.', color: 'bg-green-100 text-green-600', tag: '' },
  { icon: Eye, title: 'Ophthalmology', desc: 'Complete eye care including cataract surgery, LASIK, and retinal treatments.', color: 'bg-indigo-100 text-indigo-600', tag: '' },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Our Specialties</span>
          <h2 className="font-jakarta font-bold text-3xl sm:text-4xl text-gray-900 mt-2">Comprehensive Medical Services</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">World-class specialists and advanced technology for every aspect of your health.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="group p-6 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 transition-all duration-300 cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-xl ${s.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-jakarta font-semibold text-gray-900">{s.title}</h3>
                  {s.tag && (
                    <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-semibold">{s.tag}</span>
                  )}
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}