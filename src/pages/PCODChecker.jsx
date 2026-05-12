import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Stethoscope, AlertCircle, CheckCircle, Calendar, BookOpen, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/lib/LanguageContext';

const symptoms = /** @type {Array<{key:'weight_gain'|'acne'|'hair_loss'|'excess_hair'|'pelvic_pain'|'mood_swings'|'fatigue'|'difficulty_conceiving'|'dark_patches'|'sleep_issues'; label:string; weight:number;}>} */ ([
  { key: 'weight_gain', label: 'Unexplained weight gain', weight: 1 },
  { key: 'acne', label: 'Persistent acne / oily skin', weight: 1 },
  { key: 'hair_loss', label: 'Hair thinning or scalp hair loss', weight: 1.5 },
  { key: 'excess_hair', label: 'Excess facial or body hair (Hirsutism)', weight: 2 },
  { key: 'pelvic_pain', label: 'Pelvic pain or discomfort', weight: 1.5 },
  { key: 'mood_swings', label: 'Mood swings / anxiety / depression', weight: 1 },
  { key: 'fatigue', label: 'Chronic fatigue or low energy', weight: 1 },
  { key: 'difficulty_conceiving', label: 'Difficulty getting pregnant', weight: 2 },
  { key: 'dark_patches', label: 'Dark skin patches (neck, underarms)', weight: 1.5 },
  { key: 'sleep_issues', label: 'Sleep apnea or poor sleep quality', weight: 1 },
]);

const cycleOptions = [
  { value: 'regular', label: 'Regular (28–32 days)', score: 0 },
  { value: 'irregular', label: 'Irregular (varies by >7 days)', score: 3 },
  { value: 'absent', label: 'Absent (more than 3 months)', score: 5 },
  { value: 'frequent', label: 'Very frequent (< 21 days)', score: 2 },
];

const bmiOptions = [
  { value: 'underweight', label: 'Underweight (BMI < 18.5)', score: 0.5 },
  { value: 'normal', label: 'Normal weight (BMI 18.5–24.9)', score: 0 },
  { value: 'overweight', label: 'Overweight (BMI 25–29.9)', score: 1.5 },
  { value: 'obese', label: 'Obese (BMI ≥ 30)', score: 2 },
];

const riskConfig = {
  Low: { color: 'bg-green-50 border-green-400 text-green-700', tip: 'Your risk is low. Maintain a balanced diet, regular exercise, and schedule annual gynecological checkups.' },
  Moderate: { color: 'bg-yellow-50 border-yellow-400 text-yellow-700', tip: 'You show moderate risk indicators. Book a consultation with a gynecologist for an ultrasound and hormone panel.' },
  High: { color: 'bg-red-50 border-red-400 text-red-700', tip: 'Your responses indicate a high risk of PCOD/PCOS. Please book an appointment with our specialist promptly for a thorough evaluation.' },
};

export default function PCODChecker() {
  const { t } = useLanguage();
  const initialForm = /** @type {{[key:string]: string|boolean; name:string; age:string; email:string; cycle:string; bmi:string; family_history:string; dark_patches:boolean; sleep_issues:boolean; weight_gain:boolean; acne:boolean; hair_loss:boolean; excess_hair:boolean; pelvic_pain:boolean; mood_swings:boolean; fatigue:boolean; difficulty_conceiving:boolean;}} */ ({
    name: '', age: '', email: '',
    cycle: '', bmi: '', family_history: '',
    dark_patches: false, sleep_issues: false,
    weight_gain: false, acne: false, hair_loss: false,
    excess_hair: false, pelvic_pain: false, mood_swings: false,
    fatigue: false, difficulty_conceiving: false,
  });
  const [form, setForm] = useState(initialForm);
  const [result, setResult] = useState(/** @type {{score:number; risk:'Low'|'Moderate'|'High'; max:number}|null} */ (null));
  const [saved, setSaved] = useState(false);

  const toggle = /** @param {'weight_gain'|'acne'|'hair_loss'|'excess_hair'|'pelvic_pain'|'mood_swings'|'fatigue'|'difficulty_conceiving'|'dark_patches'|'sleep_issues'} key */ (key) => setForm(f => ({ ...f, [key]: !f[key] }));

  const calculate = () => {
    let score = 0;
    score += cycleOptions.find(o => o.value === form.cycle)?.score || 0;
    score += bmiOptions.find(o => o.value === form.bmi)?.score || 0;
    if (form.family_history === 'yes') score += 2;
    symptoms.forEach(s => { if (form[s.key]) score += s.weight; });
    const age = parseInt(form.age);
    if (age >= 15 && age <= 35) score += 0.5;

    const risk = score < 4 ? 'Low' : score < 8 ? 'Moderate' : 'High';
    setResult({ score, risk, max: 18 });
  };

  const canSubmit = form.name && form.age && form.cycle && form.bmi;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Stethoscope className="w-7 h-7 text-purple-600" />
          </div>
          <h1 className="font-jakarta font-bold text-3xl text-gray-900">{t('pcodTitle')}</h1>
          <p className="text-gray-500 mt-2 max-w-md mx-auto">{t('pcodSubtitle')}</p>
          <div className="inline-flex items-center gap-2 bg-yellow-50 border border-yellow-200 text-yellow-700 text-xs px-4 py-2 rounded-full mt-3">
            <AlertCircle className="w-3.5 h-3.5" /> {t('disclaimer')}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div key="form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="bg-white rounded-3xl shadow-lg p-6 md:p-10 space-y-8">
              {/* Basic info */}
              <div>
                <h3 className="font-jakarta font-semibold text-gray-800 text-lg mb-4">{t('yourInfo')}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[{ k: 'name', l: t('fullName'), p: 'Your name' }, { k: 'age', l: t('age'), p: '25', t: 'number' }, { k: 'email', l: t('emailOptional'), p: 'you@email.com', t: 'email' }].map(f => (
                    <div key={f.k}>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">{f.l}</label>
                      <input type={f.t || 'text'} placeholder={f.p} value={String(form[f.k] ?? '')} onChange={e => setForm(p => ({ ...p, [f.k]: e.target.value }))}
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Cycle & BMI */}
              <div>
                <h3 className="font-jakarta font-semibold text-gray-800 text-lg mb-4">{t('cyclePattern')} *</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {cycleOptions.map(o => (
                    <button key={o.value} type="button" onClick={() => setForm(p => ({ ...p, cycle: o.value }))}
                      className={`text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ${form.cycle === o.value ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-gray-200 text-gray-600 hover:border-purple-300'}`}>
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-jakarta font-semibold text-gray-800 text-lg mb-4">{t('weightBmi')} *</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {bmiOptions.map(o => (
                    <button key={o.value} type="button" onClick={() => setForm(p => ({ ...p, bmi: o.value }))}
                      className={`text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ${form.bmi === o.value ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-gray-200 text-gray-600 hover:border-purple-300'}`}>
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Family history */}
              <div>
                <h3 className="font-jakarta font-semibold text-gray-800 text-lg mb-3">{t('familyHistory')}</h3>
                <div className="flex gap-3">
                  {['yes', 'no', 'unsure'].map(v => (
                    <button key={v} type="button" onClick={() => setForm(p => ({ ...p, family_history: v }))}
                      className={`capitalize px-5 py-2.5 rounded-full border-2 text-sm font-medium transition-all ${form.family_history === v ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-gray-200 text-gray-600 hover:border-purple-300'}`}>
                      {v === 'yes' ? t('yes') : v === 'no' ? t('no') : t('dontKnow')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Symptoms */}
              <div>
                <h3 className="font-jakarta font-semibold text-gray-800 text-lg mb-2">{t('symptomsExperience')}</h3>
                <p className="text-gray-500 text-sm mb-4">{t('selectAllApply')}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {symptoms.map(s => (
                    <button key={s.key} type="button" onClick={() => toggle(s.key)}
                      className={`flex items-center gap-3 text-left px-4 py-3 rounded-xl border-2 text-sm transition-all ${form[s.key] ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-gray-200 text-gray-600 hover:border-purple-300'}`}>
                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 ${form[s.key] ? 'bg-purple-500 border-purple-500' : 'border-gray-300'}`}>
                        {form[s.key] && <CheckCircle className="w-3 h-3 text-white" />}
                      </div>
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={calculate} disabled={!canSubmit}
                className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 rounded-2xl disabled:opacity-50 transition-colors text-lg">
                {t('checkMyRisk')} <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          ) : (
            <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl shadow-lg p-6 md:p-10">
              <h2 className="font-jakarta font-bold text-2xl text-gray-900 mb-6 text-center">{t('yourPCODResult')}</h2>

              <div className={`border-2 rounded-2xl p-6 mb-5 ${riskConfig[result.risk].color}`}>
                <div className="flex items-center justify-between mb-3">
                  <p className="font-bold text-2xl">{result.risk} Risk</p>
                  <p className="text-sm font-semibold">Score: {result.score.toFixed(1)} / {result.max}</p>
                </div>
                <div className="w-full bg-white/60 rounded-full h-3 mb-4">
                  <div className={`h-3 rounded-full ${result.risk === 'Low' ? 'bg-green-500' : result.risk === 'Moderate' ? 'bg-yellow-500' : 'bg-red-500'}`}
                    style={{ width: `${Math.min((result.score / result.max) * 100, 100)}%` }} />
                </div>
                <p className="text-sm leading-relaxed">{riskConfig[result.risk].tip}</p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-sm text-blue-700 mb-6">
                ℹ️ <strong>Important:</strong> This is an early risk screening tool based on your responses. It is NOT a final diagnosis. A diagnosis of PCOD/PCOS requires physical examination, ultrasound, and blood tests by a qualified gynecologist.
              </div>

              <div className="flex flex-wrap gap-3">
                <button onClick={() => setSaved(true)}
                  className={`flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full border-2 transition-colors ${saved ? 'border-green-400 bg-green-50 text-green-700' : 'border-gray-300 text-gray-700 hover:border-purple-400 hover:text-purple-700'}`}>
                  <BookOpen className="w-4 h-4" /> {saved ? t('savedToRecords') : t('saveToRecords')}
                  </button>
                  <Link to="/appointments" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors">
                    <Calendar className="w-4 h-4" /> {t('bookGynecologist')}
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