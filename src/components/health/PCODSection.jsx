import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { base44 } from '@/api/base44Client';

const symptoms = [
  { key: 'weight_gain', label: 'Unexplained weight gain', weight: 1 },
  { key: 'acne', label: 'Persistent acne / oily skin', weight: 1 },
  { key: 'hair_loss', label: 'Hair thinning or loss', weight: 1.5 },
  { key: 'excess_hair', label: 'Excess facial/body hair (Hirsutism)', weight: 2 },
  { key: 'pelvic_pain', label: 'Pelvic pain or discomfort', weight: 1.5 },
  { key: 'mood_swings', label: 'Mood swings / anxiety / depression', weight: 1 },
  { key: 'fatigue', label: 'Chronic fatigue', weight: 1 },
  { key: 'difficulty_conceiving', label: 'Difficulty conceiving', weight: 2 },
];

const cycleOptions = [
  { value: 'Regular (28-32 days)', label: 'Regular (28–32 days)', score: 0 },
  { value: 'Irregular (vary by >7 days)', label: 'Irregular (varies by >7 days)', score: 3 },
  { value: 'Absent (>3 months)', label: 'Absent (more than 3 months)', score: 5 },
  { value: 'Very frequent (<21 days)', label: 'Very frequent (< 21 days)', score: 2 },
];

export default function PCODSection() {
  const [step, setStep] = useState(0); // 0=intro, 1=form, 2=result
  const [form, setForm] = useState({
    patient_name: '', age: '', email: '',
    cycle_regularity: '',
    weight_gain: false, acne: false, hair_loss: false,
    excess_hair: false, pelvic_pain: false, mood_swings: false,
    fatigue: false, difficulty_conceiving: false,
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const toggle = (key) => setForm(f => ({ ...f, [key]: !f[key] }));

  const calculate = async () => {
    setLoading(true);
    let score = 0;
    const cycleScore = cycleOptions.find(o => o.value === form.cycle_regularity)?.score || 0;
    score += cycleScore;
    symptoms.forEach(s => { if (form[s.key]) score += s.weight; });

    const age = parseInt(form.age);
    if (age >= 15 && age <= 30) score += 0.5;

    let risk_level, recommendation;
    if (score < 3) {
      risk_level = 'Low';
      recommendation = 'Your symptoms suggest a low risk of PCOD. Maintain a healthy lifestyle with balanced diet and regular exercise. Schedule a routine gynecological checkup annually.';
    } else if (score < 7) {
      risk_level = 'Moderate';
      recommendation = 'You show moderate risk indicators for PCOD. We recommend consulting a gynecologist for a detailed evaluation including an ultrasound and hormone panel tests.';
    } else {
      risk_level = 'High';
      recommendation = 'Your responses indicate a high risk of PCOD. Please book an appointment with our gynecology specialist promptly for a thorough examination and personalized treatment plan.';
    }

    const data = { ...form, age: parseInt(form.age), score, risk_level, recommendation };
    try {
      await base44.entities.PCODAssessment.create(data);
    } catch { /* silent */ }

    setResult({ score, risk_level, recommendation });
    setLoading(false);
    setStep(2);
  };

  const riskColor = {
    Low: 'text-green-600 bg-green-50 border-green-200',
    Moderate: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    High: 'text-red-600 bg-red-50 border-red-200',
  };

  return (
    <section id="pcod-check" className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <span className="text-purple-600 text-sm font-semibold uppercase tracking-widest">AI-Powered</span>
          <h2 className="font-jakarta font-bold text-3xl sm:text-4xl text-gray-900 mt-2">PCOD Risk Assessment</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">Answer a few quick questions to get an AI-assisted PCOD risk evaluation from our medical team.</p>
        </motion.div>

        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10">
          <AnimatePresence mode="wait">
            {/* Intro */}
            {step === 0 && (
              <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-6">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Activity className="w-10 h-10 text-purple-600" />
                </div>
                <h3 className="font-jakarta font-bold text-2xl text-gray-900 mb-3">PCOD/PCOS Self-Assessment</h3>
                <p className="text-gray-500 max-w-md mx-auto mb-2">This tool provides a preliminary risk estimate based on your symptoms. It is NOT a medical diagnosis.</p>
                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm px-4 py-2 rounded-full mt-2 mb-8">
                  <Info className="w-4 h-4" /> Takes about 2 minutes
                </div>
                <button onClick={() => setStep(1)} className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-full transition-colors">
                  Start Assessment
                </button>
              </motion.div>
            )}

            {/* Form */}
            {step === 1 && (
              <motion.div key="form" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  {[{ key: 'patient_name', label: 'Full Name', placeholder: 'Your name' },
                    { key: 'age', label: 'Age', placeholder: '25', type: 'number' },
                    { key: 'email', label: 'Email', placeholder: 'email@example.com', type: 'email' }
                  ].map(f => (
                    <div key={f.key}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
                      <input
                        type={f.type || 'text'}
                        value={form[f.key]}
                        onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                        placeholder={f.placeholder}
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent"
                      />
                    </div>
                  ))}
                </div>

                <div className="mb-8">
                  <label className="block text-sm font-semibold text-gray-800 mb-3">Menstrual Cycle Pattern</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {cycleOptions.map(o => (
                      <button
                        key={o.value}
                        onClick={() => setForm(p => ({ ...p, cycle_regularity: o.value }))}
                        className={`text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                          form.cycle_regularity === o.value
                            ? 'border-purple-500 bg-purple-50 text-purple-700'
                            : 'border-gray-200 text-gray-600 hover:border-purple-300'
                        }`}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <label className="block text-sm font-semibold text-gray-800 mb-3">Select all symptoms that apply to you</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {symptoms.map(s => (
                      <button
                        key={s.key}
                        onClick={() => toggle(s.key)}
                        className={`flex items-center gap-3 text-left px-4 py-3 rounded-xl border-2 text-sm transition-all ${
                          form[s.key]
                            ? 'border-purple-500 bg-purple-50 text-purple-700'
                            : 'border-gray-200 text-gray-600 hover:border-purple-300'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 ${form[s.key] ? 'bg-purple-500 border-purple-500' : 'border-gray-300'}`}>
                          {form[s.key] && <CheckCircle className="w-3 h-3 text-white" />}
                        </div>
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 justify-end">
                  <button onClick={() => setStep(0)} className="px-6 py-2.5 border border-gray-300 text-gray-600 rounded-full text-sm hover:bg-gray-50">Back</button>
                  <button
                    onClick={calculate}
                    disabled={!form.patient_name || !form.age || !form.cycle_regularity || loading}
                    className="px-8 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-full text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {loading ? 'Analyzing...' : 'Get My Assessment'}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Result */}
            {step === 2 && result && (
              <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4">
                <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-2xl border-2 text-lg font-bold mb-6 ${riskColor[result.risk_level]}`}>
                  <AlertCircle className="w-6 h-6" />
                  Risk Level: {result.risk_level}
                </div>

                <div className="bg-gray-50 rounded-2xl p-6 text-left mb-6">
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-purple-600" /> Assessment Score: {result.score.toFixed(1)} / 15
                  </h4>
                  {/* Score bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                    <div
                      className={`h-2.5 rounded-full transition-all ${result.risk_level === 'Low' ? 'bg-green-500' : result.risk_level === 'Moderate' ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${Math.min((result.score / 15) * 100, 100)}%` }}
                    />
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{result.recommendation}</p>
                </div>

                <div className="flex flex-wrap gap-3 justify-center">
                  <a href="#appointments" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors">
                    Book Specialist Appointment
                  </a>
                  <button onClick={() => { setStep(0); setForm({ patient_name: '', age: '', email: '', cycle_regularity: '', weight_gain: false, acne: false, hair_loss: false, excess_hair: false, pelvic_pain: false, mood_swings: false, fatigue: false, difficulty_conceiving: false }); setResult(null); }}
                    className="border border-gray-300 text-gray-600 hover:bg-gray-50 font-medium px-6 py-3 rounded-full text-sm">
                    Retake Assessment
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
