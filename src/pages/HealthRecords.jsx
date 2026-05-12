import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Activity, Stethoscope, Brain, Shield, Eye, FileText, Lock } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import HealthTrendsChart from '@/components/records/HealthTrendsChart';
import WhatsAppReminders from '@/components/records/WhatsAppReminders';
import AIDiagnosis from '@/components/records/AIDiagnosis';
import PrescriptionScanner from '@/components/records/PrescriptionScanner';
import MinorIllnessDiagnosis from '@/components/health/MinorIllnessDiagnosis';

const MOCK_RECORDS = /** @type {Array<{id:number; type:string; date:string; summary:string; risk:'Low'|'Moderate'|'High'; icon:any; color:string;}>} */ ([
  { id: 1, type: 'Symptom Check', date: '2026-05-01', summary: 'Reported fatigue, headache, blurred vision. Risk: Moderate.', risk: 'Moderate', icon: Activity, color: 'text-yellow-600 bg-yellow-100' },
  { id: 2, type: 'PCOD Assessment', date: '2026-04-25', summary: 'Irregular cycles, mild weight gain, acne. Risk: Moderate.', risk: 'Moderate', icon: Stethoscope, color: 'text-purple-600 bg-purple-100' },
  { id: 3, type: 'Neuro/Stroke Check', date: '2026-04-10', summary: 'High BP history, no acute symptoms. Risk: Low.', risk: 'Low', icon: Brain, color: 'text-indigo-600 bg-indigo-100' },
  { id: 4, type: 'Symptom Check', date: '2026-03-15', summary: 'Chest tightness, shortness of breath. Risk: High. Referred to cardiologist.', risk: 'High', icon: Activity, color: 'text-red-600 bg-red-100' },
]);

const riskBadge = /** @type {{ Low: string; Moderate: string; High: string; }} */ ({ Low: 'bg-green-100 text-green-700', Moderate: 'bg-yellow-100 text-yellow-700', High: 'bg-red-100 text-red-700' });

export default function HealthRecords() {
  const { t } = useLanguage();
  const [files, setFiles] = useState(/** @type {{name:string; size:string; date:string}[]} */ ([]));
  const [expanded, setExpanded] = useState(/** @type {number|null} */ (null));

  const handleUpload = /** @param {{ target: HTMLInputElement }} e */ (e) => {
    const newFiles = Array.from(e.target.files || []).map(f => ({
      name: f.name, size: (f.size / 1024).toFixed(1) + ' KB', date: new Date().toISOString().split('T')[0]
    }));
    setFiles(prev => [...prev, ...newFiles]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="font-jakarta font-bold text-3xl text-gray-900">{t('myHealthRecords')}</h1>
            <p className="text-gray-500 mt-1">All your assessments, trends, and documents in one secure place.</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-green-700 bg-green-50 border border-green-200 px-3 py-2 rounded-full">
            <Lock className="w-3.5 h-3.5" /> {t('encryptedPrivate')}
          </div>
        </div>

        {/* Privacy notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-start gap-3">
          <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-700">Your records are securely stored and visible only to you. We comply with health data privacy standards. Records are never shared without your consent.</p>
        </div>

        {/* Analytics charts */}
        <HealthTrendsChart />

        {/* Prescription Scanner */}
        <PrescriptionScanner />

        {/* Minor illness + medicines */}
        <MinorIllnessDiagnosis />

        {/* AI Diagnosis */}
        <AIDiagnosis />

        {/* WhatsApp Reminders */}
        <WhatsAppReminders />

        {/* Assessment history */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="font-jakarta font-bold text-xl text-gray-900 mb-5">{t('assessmentHistory')}</h2>
          <div className="space-y-3">
            {MOCK_RECORDS.map((r, i) => {
              const Icon = r.icon;
              return (
                <motion.div key={r.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                  className="border border-gray-100 rounded-2xl p-4 hover:border-blue-200 transition-all">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${r.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <p className="font-semibold text-gray-900 text-sm">{r.type}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${riskBadge[r.risk]}`}>{r.risk} Risk</span>
                        <span className="text-xs text-gray-400 ml-auto">{r.date}</span>
                      </div>
                      <p className="text-gray-500 text-sm">{r.summary}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3 pt-3 border-t border-gray-50">
                    <button onClick={() => setExpanded(expanded === r.id ? null : r.id)}
                      className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 px-3 py-1.5 rounded-full hover:bg-blue-50 transition-colors">
                      <Eye className="w-3.5 h-3.5" /> {expanded === r.id ? t('hide') : t('viewDetails')}
                    </button>
                  </div>
                  {expanded === r.id && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="mt-3 p-3 bg-gray-50 rounded-xl text-sm text-gray-600">
                      <p className="font-semibold text-gray-800 mb-1">Full Summary</p>
                      <p>{r.summary}</p>
                      <p className="mt-2 text-xs text-gray-400">Assessment on {r.date}. Results are indicative only — not a medical diagnosis.</p>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Upload */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="font-jakarta font-bold text-xl text-gray-900 mb-2">{t('uploadedDocs')}</h2>
          <p className="text-gray-500 text-sm mb-5">Upload prescriptions, lab reports, or doctor notes (PDF, JPG, PNG).</p>
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 hover:border-blue-300 rounded-2xl p-8 cursor-pointer transition-colors mb-5">
            <Upload className="w-8 h-8 text-gray-400 mb-2" />
            <p className="text-sm font-semibold text-gray-600">{t('uploadHint')}</p>
            <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG up to 10MB</p>
            <input type="file" multiple accept=".pdf,.jpg,.jpeg,.png" onChange={handleUpload} className="hidden" />
          </label>
          {files.length === 0 && <p className="text-center text-gray-400 text-sm py-4">{t('noDocuments')}</p>}
          {files.length > 0 && (
            <div className="space-y-2">
              {files.map((f, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <FileText className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{f.name}</p>
                    <p className="text-xs text-gray-400">{f.size} · Uploaded {f.date}</p>
                  </div>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Stored</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}