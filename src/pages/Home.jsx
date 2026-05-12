import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Activity, Stethoscope, Brain, Phone, Users, Clock, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function Home() {
  const { t } = useLanguage();

  let openEmergency = () => {};
  try {
    const ctx = useOutletContext();
    if (ctx?.openEmergency) openEmergency = ctx.openEmergency;
  } catch (_) {}

  const tools = [
    { to: '/symptoms', icon: Activity, label: t('symptomCheck'), desc: t('symptomCheckDesc'), color: 'bg-blue-100 text-blue-600', tag: '' },
    { to: '/pcod', icon: Stethoscope, label: t('pcod'), desc: t('pcodDesc'), color: 'bg-purple-100 text-purple-600', tag: t('womensHealth') },
    { to: '/neuro-check', icon: Brain, label: t('neuroCheck'), desc: t('neuroCheckDesc'), color: 'bg-indigo-100 text-indigo-600', tag: t('urgent') },
  ];

  const problems = [t('prob1'), t('prob2'), t('prob3'), t('prob4'), t('prob5')];
  const solutions = [t('sol1'), t('sol2'), t('sol3'), t('sol4'), t('sol5'), t('sol6')];

  const sdgs = [
    { n: '3', l: t('sdg3'), c: 'bg-green-100 text-green-800' },
    { n: '9', l: t('sdg9'), c: 'bg-orange-100 text-orange-800' },
    { n: '10', l: t('sdg10'), c: 'bg-purple-100 text-purple-800' },
  ];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-cyan-50 pt-14 pb-20 px-4 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full opacity-30 blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-100 rounded-full opacity-40 blur-3xl translate-y-1/2 -translate-x-1/4" />
        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              {t('heroTagline')}
            </div>
            <h1 className="font-jakarta font-bold text-4xl sm:text-5xl lg:text-6xl text-gray-900 leading-tight mb-5">
              {t('heroTitle')}
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
              {t('heroSub')}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/symptoms" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3.5 rounded-full transition-all shadow-lg shadow-blue-200">
                {t('startSymptomCheck')} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/pcod" className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3.5 rounded-full transition-all">
                {t('checkPCODRisk')}
              </Link>
              <button onClick={openEmergency} className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3.5 rounded-full transition-all">
                <Phone className="w-4 h-4" /> {t('emergencyHelpNow')}
              </button>
            </div>
            <div className="grid grid-cols-2 gap-6 mt-14 max-w-xs mx-auto">
              {[{ icon: Users, v: '10K+', l: t('usersHelped') }, { icon: Clock, v: '24/7', l: t('support247') }].map(({ icon: Ic, v, l }) => (
                <div key={l} className="text-center">
                  <Ic className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                  <p className="font-jakarta font-bold text-xl text-gray-900">{v}</p>
                  <p className="text-xs text-gray-500">{l}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tools */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">{t('aiPoweredTools')}</span>
            <h2 className="font-jakarta font-bold text-3xl text-gray-900 mt-2">{t('checkRiskNow')}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {tools.map((tool, i) => {
              const Ic = tool.icon;
              return (
                <motion.div key={tool.to} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <Link to={tool.to} className="block p-6 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 transition-all group">
                    <div className={`w-12 h-12 rounded-xl ${tool.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Ic className="w-6 h-6" />
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-jakarta font-bold text-gray-900">{tool.label}</h3>
                      {tool.tag && <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-semibold">{tool.tag}</span>}
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed mb-3">{tool.desc}</p>
                    <span className="flex items-center gap-1 text-blue-600 text-sm font-semibold">{t('startCheck')} <ArrowRight className="w-4 h-4" /></span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Problem + Solution */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <span className="text-red-500 text-sm font-semibold uppercase tracking-widest">{t('theProblem')}</span>
            <h2 className="font-jakarta font-bold text-2xl text-gray-900 mt-2 mb-5">{t('whatWereSolving')}</h2>
            <ul className="space-y-3">
              {problems.map((p, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                  <span className="w-2 h-2 bg-red-400 rounded-full mt-1.5 flex-shrink-0" />{p}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">{t('ourSolution')}</span>
            <h2 className="font-jakarta font-bold text-2xl text-gray-900 mt-2 mb-5">{t('howWeHelp')}</h2>
            <ul className="space-y-3">
              {solutions.map((s, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />{s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="py-12 px-4 bg-blue-600">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="text-white text-center sm:text-left">
            <h3 className="font-jakarta font-bold text-2xl">{t('ctaTitle')}</h3>
            <p className="text-blue-100 mt-1 text-sm">{t('ctaSub')}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/symptoms" className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-full hover:bg-blue-50 transition-colors">
              {t('startFreeCheck')}
            </Link>
            <Link to="/appointments" className="border-2 border-white text-white font-semibold px-6 py-3 rounded-full hover:bg-blue-700 transition-colors">
              {t('bookDoctor')}
            </Link>
          </div>
        </div>
      </section>

      {/* SDGs */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-green-600 text-sm font-semibold uppercase tracking-widest">{t('impactSdgs')}</span>
            <h2 className="font-jakarta font-bold text-3xl text-gray-900 mt-2">{t('alignedGoals')}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {sdgs.map(s => (
              <div key={s.n} className={`${s.c} rounded-2xl p-5 text-center`}>
                <div className="text-3xl font-bold mb-1">SDG {s.n}</div>
                <p className="text-sm font-semibold">{s.l}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/about" className="text-blue-600 font-semibold text-sm hover:underline">
              {t('learnMore')} →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}