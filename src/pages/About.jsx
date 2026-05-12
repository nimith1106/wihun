import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Zap, Globe, Shield, BookOpen, Award, Leaf } from 'lucide-react';

const team = [
  { name: 'Nimith O', isLead: true, emoji: '👨‍💻' },
  { name: 'Usha Hadapad', isLead: false, emoji: '👩‍💻' },
  { name: 'Somesh R U', isLead: false, emoji: '👨‍💻' },
  { name: 'Bhavana C', isLead: false, emoji: '👩‍💻' },
];

const sdgs = [
  { number: 3, label: 'Good Health & Well-Being', color: 'bg-green-100 text-green-800 border-green-300', icon: Heart, desc: 'Early disease detection reduces preventable deaths and delays in care.' },
  { number: 9, label: 'Industry, Innovation & Infrastructure', color: 'bg-orange-100 text-orange-800 border-orange-300', icon: Zap, desc: 'AI-powered health tools bring innovation to underserved healthcare access.' },
  { number: 10, label: 'Reduced Inequalities', color: 'bg-purple-100 text-purple-800 border-purple-300', icon: Globe, desc: 'Simple UX and mobile-first design reaches rural and low-literacy populations.' },
];

const impacts = [
  { icon: Zap, label: 'Earlier Detection', desc: 'AI risk screening identifies PCOD, stroke, and cardiac symptoms up to 30% earlier than traditional routes.' },
  { icon: Globe, label: 'Rural Reach', desc: 'Mobile-first, low-bandwidth design enables access in remote communities with limited healthcare infrastructure.' },
  { icon: Users, label: 'Women-Centered', desc: 'Dedicated PCOD/PCOS tools and gynecologist access empowers women to take control of their reproductive health.' },
  { icon: Shield, label: 'Emergency Speed', desc: 'One-tap emergency access and nearby hospital locator reduces critical response time in emergencies.' },
  { icon: BookOpen, label: 'Health Literacy', desc: 'Simple language, visual cues, and step-by-step flows make complex health concepts accessible to everyone.' },
  { icon: Award, label: 'Doctor Access', desc: 'Verified specialist listings with online consultation options eliminate geographic and cost barriers.' },
];

export default function About() {
  return (
    <div className="min-h-screen bg-white py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-16">

        {/* Mission */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Heart className="w-8 h-8 text-blue-600 fill-blue-200" />
          </div>
          <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Our Mission</span>
          <h1 className="font-jakarta font-bold text-3xl sm:text-4xl text-gray-900 mt-3 mb-4">
            Early Health Risk Detection<br />for Everyone, Everywhere
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed">
            MediCare Pro is an AI-powered early detection platform designed to make quality healthcare accessible to women, rural communities, and people with low medical literacy — bridging the gap between symptoms and care.
          </p>
        </motion.div>

        {/* Problem + Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-red-50 rounded-2xl p-6">
            <h2 className="font-jakarta font-bold text-xl text-red-800 mb-4">Problems We Solve</h2>
            <ul className="space-y-3">
              {[
                'Early PCOD/PCOS symptoms are routinely missed or dismissed',
                'Warning signs of stroke and cardiac events go unrecognised',
                'Rural communities lack quick access to specialist doctors',
                'No single platform combining prediction, doctors, and emergency',
                'Medical jargon excludes patients with low health literacy',
              ].map(p => (
                <li key={p} className="flex items-start gap-2 text-sm text-red-700">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-red-400 flex-shrink-0" />{p}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-blue-50 rounded-2xl p-6">
            <h2 className="font-jakarta font-bold text-xl text-blue-800 mb-4">Our Solution</h2>
            <ul className="space-y-3">
              {[
                'AI-assisted PCOD/PCOS risk screening with symptom scoring',
                'Neuro and stroke warning checklist with urgent red alerts',
                'Multi-specialty doctor booking (online & in-person)',
                'One-tap emergency modal with location-based contact numbers',
                'Secure digital health records for tracking over time',
                'Simple language and mobile-first design for rural reach',
              ].map(s => (
                <li key={s} className="flex items-start gap-2 text-sm text-blue-700">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-blue-400 flex-shrink-0" />{s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Impact */}
        <div>
          <div className="text-center mb-10">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Impact</span>
            <h2 className="font-jakarta font-bold text-3xl text-gray-900 mt-2">Benefits & Impact</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {impacts.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  className="p-5 border border-gray-100 rounded-2xl hover:shadow-md transition-all">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{item.label}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* SDGs */}
        <div>
          <div className="text-center mb-8">
            <span className="text-green-600 text-sm font-semibold uppercase tracking-widest">UN Sustainable Development Goals</span>
            <h2 className="font-jakarta font-bold text-3xl text-gray-900 mt-2">Aligned with Global Goals</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {sdgs.map(s => {
              const Icon = s.icon;
              return (
                <div key={s.number} className={`border-2 rounded-2xl p-6 ${s.color}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-xl font-bold text-gray-800 shadow-sm">
                      {s.number}
                    </div>
                    <p className="font-semibold text-sm leading-snug">SDG {s.number}: {s.label}</p>
                  </div>
                  <p className="text-sm leading-relaxed opacity-80">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Team */}
        <div>
          <div className="text-center mb-8">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Hackathon Team</span>
            <h2 className="font-jakarta font-bold text-3xl text-gray-900 mt-2">Inclusive Innovations Team</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {team.map((m, i) => (
              <motion.div key={m.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className={`text-center rounded-2xl p-4 hover:shadow-md transition-all ${m.isLead ? 'bg-blue-50 border-2 border-blue-300' : 'bg-white border border-gray-100'}`}>
                <div className="text-4xl mb-2">{m.emoji}</div>
                <p className="font-semibold text-gray-900 text-sm">{m.name}</p>
                {m.isLead && <span className="inline-block mt-1 text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full font-semibold">Team Lead</span>}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tech note */}
        <div className="bg-gray-900 rounded-3xl p-8 text-white text-center">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Leaf className="w-6 h-6" />
          </div>
          <h3 className="font-jakarta font-bold text-xl mb-3">Built for Future AI Integration</h3>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto leading-relaxed">
            The platform is architected with clean API integration points (<code className="text-blue-300">/api/predict/symptoms</code>, <code className="text-blue-300">/api/predict/pcod</code>, <code className="text-blue-300">/api/predict/neuro</code>) ready for connection to Python ML models built with TensorFlow, scikit-learn, and Pandas. Hospital data integrates with real location APIs when deployed.
          </p>
        </div>
      </div>
    </div>
  );
}