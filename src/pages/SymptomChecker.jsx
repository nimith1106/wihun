import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ChevronRight, ChevronLeft, AlertCircle, BookOpen, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/lib/LanguageContext';

const CONDITIONS = ['Diabetes', 'Hypertension', 'Asthma', 'Heart disease', 'Thyroid disorder', 'PCOD/PCOS', 'None'];
const SYMPTOMS = [
  'Headache', 'Dizziness', 'Chest pain', 'Shortness of breath', 'Fatigue',
  'Nausea / Vomiting', 'Abdominal pain', 'Irregular heartbeat', 'Blurred vision',
  'Weakness / Numbness', 'Sudden speech difficulty', 'Swelling in legs',
  'Irregular periods', 'Hair loss', 'Weight gain', 'Anxiety / Depression',
  'Joint pain', 'Fever', 'Back pain', 'Skin rashes'
];

const DUMMY_RESULTS = {
  high: { conditions: ['Stroke (early warning)', 'Hypertensive crisis'], recommendation: 'Please go to an emergency room immediately or call 112.', color: 'bg-red-50 border-red-400 text-red-700', label: 'High Risk' },
  medium: { conditions: ['PCOD/PCOS', 'Thyroid imbalance', 'Anemia'], recommendation: 'Consult a specialist within 7 days. Avoid self-medication.', color: 'bg-yellow-50 border-yellow-400 text-yellow-700', label: 'Moderate Risk' },
  low: { conditions: ['Stress / Fatigue', 'Mild nutritional deficiency'], recommendation: 'Monitor your symptoms. Schedule a routine checkup within a month.', color: 'bg-green-50 border-green-400 text-green-700', label: 'Low Risk' },
};

function StepIndicator({ step, total }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className={`h-2 rounded-full flex-1 transition-all ${i < step ? 'bg-blue-600' : i === step - 1 ? 'bg-blue-400' : 'bg-gray-200'}`} />
      ))}
      <span className="text-xs text-gray-500 whitespace-nowrap">Step {step} of {total}</span>
    </div>
  );
}

export default function SymptomChecker() {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    age: '', gender: '', weight: '', conditions: [],
    symptoms: [], freeText: '',
    smoking: '', alcohol: '', activity: '', stress: ''
  });
  const [result, setResult] = useState(null);
  const [saved, setSaved] = useState(false);

  const toggleArr = (key, val) =>
    setForm(f => ({
      ...f,
      [key]: f[key].includes(val) ? f[key].filter(x => x !== val) : [...f[key], val]
    }));

  const submit = () => {
    // Dummy risk logic
    const highSymptoms = ['Chest pain', 'Sudden speech difficulty', 'Blurred vision', 'Weakness / Numbness'];
    const hasHigh = form.symptoms.some(s => highSymptoms.includes(s));
    const risk = hasHigh ? 'high' : form.symptoms.length >= 4 ? 'medium' : 'low';
    setResult(DUMMY_RESULTS[risk]);
    setStep(4);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Activity className="w-7 h-7 text-blue-600" />
          </div>
          <h1 className="font-jakarta font-bold text-3xl text-gray-900">AI {t('symptomCheck')}</h1>
          <p className="text-gray-500 mt-2 max-w-md mx-auto">Answer a few simple questions and get an early indication of possible health concerns.</p>
          <div className="inline-flex items-center gap-2 bg-yellow-50 border border-yellow-200 text-yellow-700 text-xs px-4 py-2 rounded-full mt-3">
            <AlertCircle className="w-3.5 h-3.5" /> {t('disclaimer')}
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8">
          <AnimatePresence mode="wait">
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                <StepIndicator step={1} total={3} />
                <h2 className="font-jakarta font-bold text-xl text-gray-900 mb-6">{t('basicInfo')}</h2>
                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">{t('age')} *</label>
                      <input type="number" placeholder="e.g. 28" value={form.age} onChange={e => setForm(f => ({ ...f, age: e.target.value }))}
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">{t('gender')} *</label>
                      <select value={form.gender} onChange={e => setForm(f => ({ ...f, gender: e.target.value }))}
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300">
                        <option value="">Select</option>
                        <option>Female</option><option>Male</option><option>Other / Prefer not to say</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Weight (kg)</label>
                    <input type="number" placeholder="e.g. 60" value={form.weight} onChange={e => setForm(f => ({ ...f, weight: e.target.value }))}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Existing medical conditions (select all that apply)</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {CONDITIONS.map(c => (
                        <button key={c} type="button" onClick={() => toggleArr('conditions', c)}
                          className={`text-left text-sm px-3 py-2 rounded-xl border-2 transition-all ${form.conditions.includes(c) ? 'border-blue-500 bg-blue-50 text-blue-700 font-semibold' : 'border-gray-200 text-gray-600 hover:border-blue-300'}`}>
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-8">
                  <button onClick={() => setStep(2)} disabled={!form.age || !form.gender}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full disabled:opacity-50 transition-colors">
                    {t('next')} <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Symptoms */}
            {step === 2 && (
              <motion.div key="s2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                <StepIndicator step={2} total={3} />
                <h2 className="font-jakarta font-bold text-xl text-gray-900 mb-2">{t('whatSymptoms')}</h2>
                <p className="text-gray-500 text-sm mb-5">Select all symptoms you are experiencing right now or recently.</p>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {SYMPTOMS.map(s => (
                    <button key={s} type="button" onClick={() => toggleArr('symptoms', s)}
                      className={`text-left text-sm px-3 py-2.5 rounded-xl border-2 transition-all ${form.symptoms.includes(s) ? 'border-blue-500 bg-blue-50 text-blue-700 font-semibold' : 'border-gray-200 text-gray-600 hover:border-blue-300'}`}>
                      {s}
                    </button>
                  ))}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Describe any other symptoms (optional)</label>
                  <textarea value={form.freeText} onChange={e => setForm(f => ({ ...f, freeText: e.target.value }))} rows={2}
                    placeholder="e.g. sharp pain behind eyes for 2 days..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none" />
                </div>
                <div className="flex justify-between mt-6">
                  <button onClick={() => setStep(1)} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium px-4 py-2">
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>
                  <button onClick={() => setStep(3)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full transition-colors">
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Lifestyle */}
            {step === 3 && (
              <motion.div key="s3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                <StepIndicator step={3} total={3} />
                <h2 className="font-jakarta font-bold text-xl text-gray-900 mb-6">{t('lifestyle')}</h2>
                <div className="space-y-5">
                  {[
                    { key: 'smoking', label: 'Do you smoke?', options: ['No', 'Occasionally', 'Regularly', 'Ex-smoker'] },
                    { key: 'alcohol', label: 'Alcohol consumption', options: ['Never', 'Occasionally', 'Regularly'] },
                    { key: 'activity', label: 'Physical activity level', options: ['Sedentary', 'Light (1-2x/week)', 'Moderate (3-5x/week)', 'Active daily'] },
                    { key: 'stress', label: 'Stress level', options: ['Low', 'Moderate', 'High', 'Very high'] },
                  ].map(({ key, label, options }) => (
                    <div key={key}>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
                      <div className="flex flex-wrap gap-2">
                        {options.map(o => (
                          <button key={o} type="button" onClick={() => setForm(f => ({ ...f, [key]: o }))}
                            className={`text-sm px-4 py-2 rounded-full border-2 transition-all ${form[key] === o ? 'border-blue-500 bg-blue-50 text-blue-700 font-semibold' : 'border-gray-200 text-gray-600 hover:border-blue-300'}`}>
                            {o}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-8">
                  <button onClick={() => setStep(2)} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium px-4 py-2">
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>
                  <button onClick={submit}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full transition-colors">
                    {t('getResults')}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Result */}
            {step === 4 && result && (
              <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                <h2 className="font-jakarta font-bold text-xl text-gray-900 mb-5">{t('yourAnalysis')}</h2>
                <div className={`border-2 rounded-2xl p-5 mb-5 ${result.color}`}>
                  <p className="font-bold text-lg mb-2">{result.label}</p>
                  <p className="text-sm font-semibold mb-2">{t('possibleConditions')}:</p>
                  <ul className="list-disc list-inside text-sm space-y-1 mb-3">
                    {result.conditions.map(c => <li key={c}>{c}</li>)}
                  </ul>
                  <p className="text-sm font-semibold">Recommendation:</p>
                  <p className="text-sm mt-1">{result.recommendation}</p>
                </div>
                <div className="bg-gray-50 rounded-2xl p-4 text-xs text-gray-500 mb-5">
                  ⚠️ This is an AI-assisted early indicator only — not a medical diagnosis. Please consult a qualified doctor before taking any action.
                </div>
                <div className="flex flex-wrap gap-3">
                  <button onClick={() => setSaved(true)}
                    className={`flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full border-2 transition-colors ${saved ? 'border-green-400 bg-green-50 text-green-700' : 'border-gray-300 text-gray-700 hover:border-blue-400 hover:text-blue-700'}`}>
                    <BookOpen className="w-4 h-4" /> {saved ? t('savedToRecords') : t('saveRecords')}
                  </button>
                  <Link to="/appointments" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors">
                    <Calendar className="w-4 h-4" /> {t('bookDoctor')}
                  </Link>
                  <button onClick={() => { setStep(1); setResult(null); setSaved(false); setForm({ age: '', gender: '', weight: '', conditions: [], symptoms: [], freeText: '', smoking: '', alcohol: '', activity: '', stress: '' }); }}
                    className="text-sm text-gray-500 hover:text-gray-700 px-4 py-2.5">
                    {t('startOver')}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}