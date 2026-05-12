import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, AlertTriangle, CheckCircle, Calendar, BookOpen, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/lib/LanguageContext';

const suddenSymptoms = /** @type {Array<{key:'weakness'|'speech'|'vision'|'headache'|'balance'|'confusion'|'dizziness'|'fainting'; label:string; weight:number;}>} */ ([
  { key: 'weakness', label: 'Sudden weakness or numbness (face, arm, or leg)', weight: 3 },
  { key: 'speech', label: 'Sudden trouble speaking or understanding speech', weight: 3 },
  { key: 'vision', label: 'Sudden blurred or lost vision in one/both eyes', weight: 3 },
  { key: 'headache', label: 'Sudden severe headache with no known cause', weight: 2.5 },
  { key: 'balance', label: 'Sudden loss of balance or coordination', weight: 2.5 },
  { key: 'confusion', label: 'Sudden confusion or trouble understanding', weight: 2 },
  { key: 'dizziness', label: 'Severe dizziness / spinning sensation (vertigo)', weight: 1.5 },
  { key: 'fainting', label: 'Recent fainting or loss of consciousness', weight: 2 },
]);

const riskConfig = {
  Low: { color: 'border-green-400 bg-green-50 text-green-800', banner: '', rec: 'Your risk appears low. Maintain healthy lifestyle habits and monitor your blood pressure regularly.' },
  Moderate: { color: 'border-yellow-400 bg-yellow-50 text-yellow-800', banner: '', rec: 'You have moderate risk indicators. Schedule a neurology consultation within the next 1–2 weeks.' },
  High: { color: 'border-red-500 bg-red-50 text-red-800', banner: 'URGENT: Your responses indicate a HIGH risk of a neurological emergency or stroke. Please seek immediate medical attention.', rec: 'Call emergency services (112) or go to the nearest ER NOW. Do not drive yourself.' },
};

export default function NeuroCheck() {
  const { t } = useLanguage();
  const initialForm = /** @type {{[key:string]: string|boolean; bp_history:string; diabetes:string; cholesterol:string; smoking:string; alcohol:string; weakness:boolean; speech:boolean; vision:boolean; headache:boolean; balance:boolean; confusion:boolean; dizziness:boolean; fainting:boolean; age:string; gender:string;}} */ ({
    bp_history: '', diabetes: '', cholesterol: '',
    smoking: '', alcohol: '',
    weakness: false, speech: false, vision: false, headache: false,
    balance: false, confusion: false, dizziness: false, fainting: false,
    age: '', gender: ''
  });
  const [form, setForm] = useState(initialForm);
  const [result, setResult] = useState(/** @type {{score:number; risk:'Low'|'Moderate'|'High'; max:number}|null} */ (null));
  const [saved, setSaved] = useState(false);

  const toggle = /** @param {'weakness'|'speech'|'vision'|'headache'|'balance'|'confusion'|'dizziness'|'fainting'} key */ (key) => setForm(f => ({ ...f, [key]: !f[key] }));

  const calculate = () => {
    let score = 0;
    suddenSymptoms.forEach(s => { if (form[s.key]) score += s.weight; });
    if (form.bp_history === 'high') score += 2;
    if (form.bp_history === 'very_high') score += 3;
    if (form.diabetes === 'yes') score += 1.5;
    if (form.cholesterol === 'high') score += 1.5;
    if (form.smoking === 'regular') score += 1.5;
    if (form.smoking === 'occasional') score += 0.5;
    if (form.alcohol === 'heavy') score += 1;
    const age = parseInt(form.age);
    if (age > 55) score += 1.5;
    else if (age > 40) score += 0.5;

    const risk = score >= 6 ? 'High' : score >= 3 ? 'Moderate' : 'Low';
    setResult({ score, risk, max: 20 });
  };

  const canSubmit = form.bp_history && form.diabetes && form.age;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Brain className="w-7 h-7 text-indigo-600" />
          </div>
          <h1 className="font-jakarta font-bold text-3xl text-gray-900">{t('neuroTitle')}</h1>
          <p className="text-gray-500 mt-2 max-w-md mx-auto">{t('neuroSubtitle')}</p>
          <div className="inline-flex items-center gap-2 bg-yellow-50 border border-yellow-200 text-yellow-700 text-xs px-4 py-2 rounded-full mt-3">
            <AlertTriangle className="w-3.5 h-3.5" /> {t('neuroUrgent')}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div key="form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="bg-white rounded-3xl shadow-lg p-6 md:p-10 space-y-8">

              {/* Basic */}
              <div>
                <h3 className="font-jakarta font-semibold text-gray-800 text-lg mb-4">{t('basicInfo')}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">{t('age')} *</label>
                    <input type="number" placeholder="e.g. 45" value={form.age} onChange={e => setForm(f => ({ ...f, age: e.target.value }))}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">{t('gender')}</label>
                    <select value={form.gender} onChange={e => setForm(f => ({ ...f, gender: e.target.value }))}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300">
                      <option value="">Select</option>
                      <option>Female</option><option>Male</option><option>Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Medical history */}
              <div>
                <h3 className="font-jakarta font-semibold text-gray-800 text-lg mb-4">{t('medicalHistory')}</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">{t('bloodPressure')} *</label>
                    <div className="flex flex-wrap gap-2">
                      {[['normal', 'Normal'], ['high', 'High (Stage 1)'], ['very_high', 'Very High (Stage 2)'], ['unknown', "Don't know"]].map(([v, l]) => (
                        <button key={v} type="button" onClick={() => setForm(f => ({ ...f, bp_history: v }))}
                          className={`text-sm px-4 py-2 rounded-full border-2 transition-all ${form.bp_history === v ? 'border-indigo-500 bg-indigo-50 text-indigo-700 font-semibold' : 'border-gray-200 text-gray-600 hover:border-indigo-300'}`}>
                          {l}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">{t('diabetes')} *</label>
                    <div className="flex flex-wrap gap-2">
                      {[['no', 'No'], ['yes', 'Yes'], ['prediabetic', 'Pre-diabetic']].map(([v, l]) => (
                        <button key={v} type="button" onClick={() => setForm(f => ({ ...f, diabetes: v }))}
                          className={`text-sm px-4 py-2 rounded-full border-2 transition-all ${form.diabetes === v ? 'border-indigo-500 bg-indigo-50 text-indigo-700 font-semibold' : 'border-gray-200 text-gray-600 hover:border-indigo-300'}`}>
                          {l}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">{t('cholesterol')}</label>
                    <div className="flex flex-wrap gap-2">
                      {[['normal', 'Normal'], ['high', 'High'], ['unknown', "Don't know"]].map(([v, l]) => (
                        <button key={v} type="button" onClick={() => setForm(f => ({ ...f, cholesterol: v }))}
                          className={`text-sm px-4 py-2 rounded-full border-2 transition-all ${form.cholesterol === v ? 'border-indigo-500 bg-indigo-50 text-indigo-700 font-semibold' : 'border-gray-200 text-gray-600 hover:border-indigo-300'}`}>
                          {l}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Lifestyle */}
              <div>
                <h3 className="font-jakarta font-semibold text-gray-800 text-lg mb-4">{t('lifestyleHabits')}</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">{t('smoking')}</label>
                    <div className="flex flex-wrap gap-2">
                      {[['never', 'Never'], ['occasional', 'Occasionally'], ['regular', 'Regularly'], ['ex', 'Ex-smoker']].map(([v, l]) => (
                        <button key={v} type="button" onClick={() => setForm(f => ({ ...f, smoking: v }))}
                          className={`text-sm px-4 py-2 rounded-full border-2 transition-all ${form.smoking === v ? 'border-indigo-500 bg-indigo-50 text-indigo-700 font-semibold' : 'border-gray-200 text-gray-600 hover:border-indigo-300'}`}>
                          {l}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">{t('alcohol')}</label>
                    <div className="flex flex-wrap gap-2">
                      {[['never', 'Never'], ['light', 'Light'], ['moderate', 'Moderate'], ['heavy', 'Heavy']].map(([v, l]) => (
                        <button key={v} type="button" onClick={() => setForm(f => ({ ...f, alcohol: v }))}
                          className={`text-sm px-4 py-2 rounded-full border-2 transition-all ${form.alcohol === v ? 'border-indigo-500 bg-indigo-50 text-indigo-700 font-semibold' : 'border-gray-200 text-gray-600 hover:border-indigo-300'}`}>
                          {l}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Symptoms */}
              <div>
                <h3 className="font-jakarta font-semibold text-gray-800 text-lg mb-2">{t('currentSymptoms')}</h3>
                <p className="text-sm text-gray-500 mb-4">⚡ These are warning signs of stroke/TIA. Select any you've experienced recently.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {suddenSymptoms.map(s => (
                    <button key={s.key} type="button" onClick={() => toggle(s.key)}
                      className={`flex items-start gap-3 text-left px-4 py-3 rounded-xl border-2 text-sm transition-all ${form[s.key] ? 'border-red-400 bg-red-50 text-red-700' : 'border-gray-200 text-gray-600 hover:border-red-300'}`}>
                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${form[s.key] ? 'bg-red-500 border-red-500' : 'border-gray-300'}`}>
                        {form[s.key] && <CheckCircle className="w-3 h-3 text-white" />}
                      </div>
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={calculate} disabled={!canSubmit}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 rounded-2xl disabled:opacity-50 transition-colors text-lg">
                {t('checkNeuroRisk')}
              </button>
            </motion.div>
          ) : (
            <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl shadow-lg p-6 md:p-10">

              {result.risk === 'High' && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                  className="bg-red-600 text-white rounded-2xl p-5 mb-6 flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-lg">URGENT — Possible Neurological Emergency</p>
                    <p className="text-red-100 text-sm mt-1">{riskConfig.High.banner}</p>
                  </div>
                </motion.div>
              )}

              <h2 className="font-jakarta font-bold text-2xl text-gray-900 mb-5 text-center">{t('yourNeuroResult')}</h2>

              <div className={`border-2 rounded-2xl p-6 mb-5 ${riskConfig[result.risk].color}`}>
                <div className="flex items-center justify-between mb-3">
                  <p className="font-bold text-2xl">{result.risk} Risk</p>
                  <p className="text-sm font-semibold">Score: {result.score.toFixed(1)} / {result.max}</p>
                </div>
                <div className="w-full bg-white/60 rounded-full h-3 mb-4">
                  <div className={`h-3 rounded-full ${result.risk === 'Low' ? 'bg-green-500' : result.risk === 'Moderate' ? 'bg-yellow-500' : 'bg-red-500'}`}
                    style={{ width: `${Math.min((result.score / result.max) * 100, 100)}%` }} />
                </div>
                <p className="text-sm leading-relaxed">{riskConfig[result.risk].rec}</p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-sm text-blue-700 mb-6">
                ℹ️ This is an early screening tool — NOT a medical diagnosis. Always consult a qualified neurologist or physician.
              </div>

              <div className="flex flex-wrap gap-3">
                {result.risk === 'High' && (
                  <a href="tel:112" className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors">
                    <Phone className="w-4 h-4" /> {t('callNow')}
                  </a>
                )}
                <button onClick={() => setSaved(true)}
                  className={`flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full border-2 transition-colors ${saved ? 'border-green-400 bg-green-50 text-green-700' : 'border-gray-300 text-gray-700 hover:border-indigo-400 hover:text-indigo-700'}`}>
                  <BookOpen className="w-4 h-4" /> {saved ? t('savedToRecords') : t('saveToRecords')}
                </button>
                <Link to="/appointments" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors">
                  <Calendar className="w-4 h-4" /> {t('bookNeurologist')}
                </Link>
                <Link to="/emergency" className="flex items-center gap-2 border border-red-400 text-red-600 hover:bg-red-50 text-sm font-semibold px-5 py-2.5 rounded-full transition-colors">
                  {t('findHospital')}
                </Link>
                <button onClick={() => setResult(null)} className="text-sm text-gray-500 hover:text-gray-700 px-4 py-2.5">{t('retake')}</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}