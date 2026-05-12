import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, AlertTriangle, CheckCircle, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

const DIAGNOSIS_DATA = {
  conditions: [
    { name: 'PCOD / Polycystic Ovarian Disease', probability: 72, severity: 'Moderate', color: 'text-yellow-700 bg-yellow-100' },
    { name: 'Hypertensive Tendency', probability: 55, severity: 'Moderate', color: 'text-orange-700 bg-orange-100' },
    { name: 'Stress-Induced Fatigue Syndrome', probability: 68, severity: 'Low', color: 'text-blue-700 bg-blue-100' },
  ],
  recommendations: [
    'Schedule a gynecology consultation within 14 days for PCOD evaluation (ultrasound + hormone panel)',
    'Monitor blood pressure twice daily and log readings for 2 weeks',
    'Reduce sodium intake and increase physical activity to ≥30 min/day',
    'Consider mindfulness or stress reduction techniques alongside a general physician visit',
    'Repeat full risk assessment in 4 weeks to track progress',
  ],
  urgency: 'Moderate — consult a doctor within 7–14 days',
  urgencyColor: 'text-yellow-700 bg-yellow-50 border-yellow-300',
};

export default function AIDiagnosis() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      {/* Header toggle */}
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
            <Stethoscope className="w-5 h-5 text-indigo-600" />
          </div>
          <div className="text-left">
            <h2 className="font-jakarta font-bold text-xl text-gray-900">{t('diagnosisReport')}</h2>
            <p className="text-gray-500 text-xs">{t('diagnosisNote')}</p>
          </div>
        </div>
        {open ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
      </button>

      {open && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="px-6 pb-6 space-y-5">
          {/* Disclaimer */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-yellow-700">AI-generated summary based on your past assessments. This is NOT a final medical diagnosis. Always verify with a qualified physician.</p>
          </div>

          {/* Urgency */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">{t('urgency')}</p>
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold ${DIAGNOSIS_DATA.urgencyColor}`}>
              <Clock className="w-4 h-4" />
              {DIAGNOSIS_DATA.urgency}
            </div>
          </div>

          {/* Conditions */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-3">{t('possibleConditions')}</p>
            <div className="space-y-3">
              {DIAGNOSIS_DATA.conditions.map(c => (
                <div key={c.name} className="border border-gray-100 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900 text-sm">{c.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${c.color}`}>{c.severity}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-gray-100 rounded-full h-2">
                      <div className={`h-2 rounded-full ${c.severity === 'Low' ? 'bg-blue-500' : c.severity === 'Moderate' ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${c.probability}%` }} />
                    </div>
                    <span className="text-xs font-bold text-gray-600 w-10 text-right">{c.probability}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-3">{t('recommendations')}</p>
            <ul className="space-y-2">
              {DIAGNOSIS_DATA.recommendations.map((r, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </div>
  );
}