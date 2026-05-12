import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload, Loader2, CheckCircle, Pill, Trash2, Plus, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '@/lib/LanguageContext';

const MOCK_EXTRACTION_RESULTS = [
  [
    { name: 'Paracetamol', dosage: '500mg', frequency: 'Twice daily', duration: '5 days', notes: 'After meals' },
    { name: 'Cetirizine', dosage: '10mg', frequency: 'Once at night', duration: '7 days', notes: 'For allergy' },
  ],
  [
    { name: 'Amoxicillin', dosage: '250mg', frequency: 'Three times daily', duration: '7 days', notes: 'Complete the course' },
    { name: 'Pantoprazole', dosage: '40mg', frequency: 'Once before breakfast', duration: '14 days', notes: 'Antacid' },
    { name: 'Vitamin D3', dosage: '60000 IU', frequency: 'Once weekly', duration: '8 weeks', notes: 'With milk' },
  ],
  [
    { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', duration: '30 days', notes: 'With meals, monitor blood sugar' },
    { name: 'Atorvastatin', dosage: '10mg', frequency: 'Once at night', duration: '30 days', notes: 'For cholesterol' },
  ],
];

export default function PrescriptionScanner({ onMedicationsAdded } = /** @type {{onMedicationsAdded?: (medications:Array<{name:string; dosage:string; frequency:string; duration:string; notes:string}>) => void}} */ ({})) {
  const { t } = useLanguage();
  const [stage, setStage] = useState('idle'); // idle | uploading | scanning | done | error
  const [imagePreview, setImagePreview] = useState(/** @type {string|null} */ (null));
  const [medications, setMedications] = useState(/** @type {Array<{name:string; dosage:string; frequency:string; duration:string; notes:string}>} */ ([]));
  const [saved, setSaved] = useState(false);
  const fileRef = useRef(/** @type {HTMLInputElement|null} */ (null));

  const handleFile = /** @param {File | null | undefined} file */ (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(String(reader.result));
      setStage('uploading');
      // Simulate upload + AI extraction
      setTimeout(() => {
        setStage('scanning');
        setTimeout(() => {
          const result = MOCK_EXTRACTION_RESULTS[Math.floor(Math.random() * MOCK_EXTRACTION_RESULTS.length)];
          setMedications(result);
          setStage('done');
        }, 2200);
      }, 800);
    };
    reader.readAsDataURL(file);
  };

  const removeItem = /** @param {number} i */ (i) => setMedications(m => m.filter((_, idx) => idx !== i));

  const saveToRecord = () => {
    setSaved(true);
    if (onMedicationsAdded) onMedicationsAdded(medications);
    toast.success('Medications added to your health record!');
  };

  const reset = () => {
    setStage('idle');
    setImagePreview(null);
    setMedications([]);
    setSaved(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
          <Camera className="w-5 h-5 text-teal-600" />
        </div>
        <div>
          <h2 className="font-jakarta font-bold text-xl text-gray-900">AI Prescription Scanner</h2>
          <p className="text-gray-500 text-xs">Upload a photo of any handwritten or printed prescription</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* Idle — upload prompt */}
        {stage === 'idle' && (
          <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div
              onClick={() => fileRef.current?.click()}
              onDragOver={e => e.preventDefault()}
              onDrop={e => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); }}
              className="border-2 border-dashed border-teal-200 hover:border-teal-400 rounded-2xl p-10 text-center cursor-pointer transition-colors group"
            >
              <div className="w-14 h-14 bg-teal-50 group-hover:bg-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors">
                <Upload className="w-7 h-7 text-teal-500" />
              </div>
              <p className="font-semibold text-gray-700 text-sm">Click to upload or drag & drop</p>
              <p className="text-gray-400 text-xs mt-1">Handwritten or printed prescriptions — JPG, PNG, PDF</p>
              <div className="inline-flex items-center gap-1.5 bg-teal-50 text-teal-700 text-xs px-3 py-1.5 rounded-full mt-3">
                <AlertCircle className="w-3 h-3" /> AI will extract medication names and dosages automatically
              </div>
            </div>
            <input ref={fileRef} type="file" accept="image/*,.pdf" className="hidden" onChange={e => {
              const files = e.target.files;
              if (files?.[0]) handleFile(files[0]);
            }} />
          </motion.div>
        )}

        {/* Uploading */}
        {stage === 'uploading' && (
          <motion.div key="uploading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-8">
            {imagePreview && <img src={imagePreview} alt="Prescription" className="max-h-40 mx-auto rounded-xl mb-4 object-contain border border-gray-100" />}
            <Loader2 className="w-8 h-8 text-teal-500 animate-spin mx-auto mb-3" />
            <p className="text-sm text-gray-600 font-semibold">Uploading image...</p>
          </motion.div>
        )}

        {/* Scanning */}
        {stage === 'scanning' && (
          <motion.div key="scanning" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-8">
            {imagePreview && <img src={imagePreview} alt="Prescription" className="max-h-40 mx-auto rounded-xl mb-4 object-contain border border-gray-100" />}
            <div className="flex items-center justify-center gap-2 mb-3">
              <Loader2 className="w-6 h-6 text-teal-500 animate-spin" />
              <p className="text-sm text-gray-600 font-semibold">AI scanning prescription...</p>
            </div>
            <div className="space-y-1.5 text-xs text-gray-400 max-w-xs mx-auto">
              <p>🔍 Detecting handwriting patterns...</p>
              <p>💊 Identifying medication names...</p>
              <p>📋 Extracting dosage information...</p>
            </div>
          </motion.div>
        )}

        {/* Done — show results */}
        {stage === 'done' && (
          <motion.div key="done" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {imagePreview && (
              <div className="flex gap-4 mb-5">
                <img src={imagePreview} alt="Prescription" className="w-24 h-24 rounded-xl object-cover border border-gray-200 flex-shrink-0" />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-green-700 font-semibold text-sm">Extraction Complete</span>
                  </div>
                  <p className="text-gray-500 text-xs">{medications.length} medication(s) identified from your prescription</p>
                </div>
              </div>
            )}

            <div className="space-y-3 mb-5">
              {medications.map((med, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-3 p-4 bg-teal-50 border border-teal-100 rounded-xl">
                  <Pill className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 text-sm">{med.name} <span className="font-normal text-teal-700">— {med.dosage}</span></p>
                    <p className="text-gray-600 text-xs mt-0.5">{med.frequency} · {med.duration}</p>
                    {med.notes && <p className="text-gray-400 text-xs mt-0.5 italic">{med.notes}</p>}
                  </div>
                  <button onClick={() => removeItem(i)} className="text-gray-300 hover:text-red-400 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-xs text-yellow-700 mb-5">
              ⚠️ AI extraction may not be 100% accurate. Always verify medication details with your doctor or pharmacist before following.
            </div>

            <div className="flex flex-wrap gap-3">
              {!saved ? (
                <button onClick={saveToRecord}
                  className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors">
                  <Plus className="w-4 h-4" /> Add to Health Record
                </button>
              ) : (
                <span className="flex items-center gap-2 bg-green-100 text-green-700 text-sm font-semibold px-5 py-2.5 rounded-full">
                  <CheckCircle className="w-4 h-4" /> Saved to Record ✓
                </span>
              )}
              <button onClick={reset} className="text-sm text-gray-500 hover:text-gray-700 px-4 py-2.5 border border-gray-200 rounded-full">
                Scan Another
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}