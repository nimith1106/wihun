import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pill, Thermometer, AlertCircle, ChevronDown, ChevronUp, CheckCircle, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

// Minor illness knowledge base with OTC medicines
const ILLNESS_DB = {
  'Headache': {
    diagnosis: 'Tension Headache / Mild Migraine',
    description: 'Common headaches are usually caused by stress, dehydration, eye strain, or tension in neck/shoulder muscles.',
    medicines: [
      { name: 'Paracetamol (Crocin/Dolo 650)', dose: '500–650mg', when: 'Every 6 hours as needed', note: 'Most safe option; take with water' },
      { name: 'Ibuprofen (Brufen)', dose: '400mg', when: 'Every 8 hours after meals', note: 'Avoid on empty stomach' },
    ],
    homeRemedies: ['Drink 2–3 glasses of water', 'Rest in a quiet, dark room', 'Apply cold/warm compress on forehead', 'Gentle neck stretches'],
    whenToSeeDoctor: 'If headache is sudden & severe, with fever >102°F, vision changes, or lasts >2 days.',
    severity: 'low',
  },
  'Fever': {
    diagnosis: 'Mild Viral Fever',
    description: 'Fever up to 100.4°F (38°C) is usually the body\'s natural response to infection. Common with cold, flu, or minor infections.',
    medicines: [
      { name: 'Paracetamol (Crocin/Dolo 650)', dose: '650mg', when: 'Every 6 hours when fever >100.4°F', note: 'Do not exceed 4g/day' },
      { name: 'Ibuprofen (Brufen 400)', dose: '400mg', when: 'Every 8 hours with meals', note: 'Only if fever is causing discomfort' },
    ],
    homeRemedies: ['Stay hydrated — drink water, ORS, coconut water', 'Lukewarm sponge bath', 'Wear light clothing', 'Rest completely'],
    whenToSeeDoctor: 'If fever >103°F, lasts >3 days, with rash/difficulty breathing/severe pain, or in children under 5.',
    severity: 'medium',
  },
  'Cold / Runny nose': {
    diagnosis: 'Common Cold (Viral Rhinitis)',
    description: 'Usually caused by rhinovirus. Symptoms include runny nose, sneezing, mild sore throat, and congestion.',
    medicines: [
      { name: 'Cetirizine (Zyrtec/Alerid)', dose: '10mg', when: 'Once at night', note: 'Reduces runny nose and sneezing' },
      { name: 'Phenylephrine + Paracetamol (Sinarest/Coldact)', dose: '1 tablet', when: 'Every 6–8 hours', note: 'Relieves congestion and fever' },
      { name: 'Saline nasal spray', dose: '2 sprays/nostril', when: '3–4 times daily', note: 'Safe for all ages, clears congestion' },
    ],
    homeRemedies: ['Steam inhalation with eucalyptus oil', 'Warm turmeric milk at night', 'Honey + ginger tea', 'Gargle with warm salt water'],
    whenToSeeDoctor: 'If symptoms persist >10 days, high fever, green/yellow thick discharge, or ear pain.',
    severity: 'low',
  },
  'Sore Throat': {
    diagnosis: 'Pharyngitis (Viral or Bacterial)',
    description: 'Sore throat is often viral (cold, flu) or bacterial (strep). Characterized by pain, scratchiness, and difficulty swallowing.',
    medicines: [
      { name: 'Strepsils / Hexigel lozenges', dose: '1 lozenge', when: 'Every 3–4 hours (max 8/day)', note: 'Soothes throat locally' },
      { name: 'Paracetamol (Dolo 650)', dose: '650mg', when: 'Every 6 hours if pain is severe', note: 'For pain and fever' },
      { name: 'Betadine Gargle', dose: 'Dilute & gargle', when: 'Twice daily', note: 'Antiseptic — do not swallow' },
    ],
    homeRemedies: ['Gargle with warm salt water every few hours', 'Honey + warm water', 'Avoid cold/iced drinks', 'Rest your voice'],
    whenToSeeDoctor: 'If unable to swallow, drooling, high fever, white patches visible on throat, or no improvement in 5 days.',
    severity: 'low',
  },
  'Stomach ache / Acidity': {
    diagnosis: 'Gastritis / Acid Reflux (GERD)',
    description: 'Burning sensation in stomach or chest, bloating, and nausea often caused by spicy food, stress, or excess stomach acid.',
    medicines: [
      { name: 'Pantoprazole (Pan 40)', dose: '40mg', when: 'Once before breakfast on empty stomach', note: 'PPI — reduces acid production' },
      { name: 'Antacid (Gelusil / Digene / Eno)', dose: '1–2 tablets or 5ml syrup', when: 'After meals and at bedtime', note: 'Quick relief for acidity' },
      { name: 'Domperidone (Domstal)', dose: '10mg', when: '30 minutes before meals', note: 'For nausea and bloating' },
    ],
    homeRemedies: ['Eat small, frequent meals', 'Avoid spicy/oily/fried foods', 'Cold milk or coconut water', 'Avoid lying down immediately after eating'],
    whenToSeeDoctor: 'If pain is severe or spreads to chest/back, blood in stool/vomit, unexpected weight loss, or persists >2 weeks.',
    severity: 'medium',
  },
  'Diarrhoea': {
    diagnosis: 'Acute Gastroenteritis / Loose Motions',
    description: 'Loose, watery stools usually caused by viral/bacterial infection, food poisoning, or lactose intolerance.',
    medicines: [
      { name: 'ORS (Oral Rehydration Salts)', dose: '200ml after each loose stool', when: 'Throughout the day', note: '⭐ MOST IMPORTANT — prevents dehydration' },
      { name: 'Loperamide (Imodium)', dose: '2mg', when: 'After each loose stool (max 8mg/day)', note: 'Reduces frequency; avoid in children <2 yrs' },
      { name: 'Probiotics (Lactobacillus / Sporlac)', dose: '1 capsule', when: 'Twice daily', note: 'Restores gut flora' },
    ],
    homeRemedies: ['BRAT diet: Banana, Rice, Applesauce, Toast', 'Drink boiled water or ORS frequently', 'Avoid dairy and fatty foods', 'Tender coconut water'],
    whenToSeeDoctor: 'If blood in stool, >10 motions/day, severe dehydration (sunken eyes, no urine), or high fever.',
    severity: 'medium',
  },
  'Skin rash / Itching': {
    diagnosis: 'Contact Dermatitis / Allergic Rash',
    description: 'Redness, itching, or rash on skin caused by contact with allergens, heat, insect bites, or food reactions.',
    medicines: [
      { name: 'Cetirizine (Alerid/Zyrtec)', dose: '10mg', when: 'Once at night', note: 'Oral antihistamine for itch relief' },
      { name: 'Calamine lotion', dose: 'Apply thin layer', when: '2–3 times on affected area', note: 'Soothing, reduces redness and itch' },
      { name: 'Hydrocortisone cream 1%', dose: 'Thin application', when: 'Twice daily (max 7 days)', note: 'Mild steroid — do not use on face or for children <2' },
    ],
    homeRemedies: ['Cool compress on affected area', 'Avoid scratching — trim nails', 'Wear loose, breathable cotton clothing', 'Aloe vera gel (natural)'],
    whenToSeeDoctor: 'If rash spreads rapidly, blisters form, face/throat swells, breathing difficulty, or fever with rash.',
    severity: 'low',
  },
  'Back pain': {
    diagnosis: 'Musculoskeletal Back Pain',
    description: 'Most back pain is caused by muscle strain, poor posture, or prolonged sitting. Usually improves with rest and simple treatment.',
    medicines: [
      { name: 'Ibuprofen (Brufen 400)', dose: '400mg', when: 'Every 8 hours after meals', note: 'Anti-inflammatory, effective for muscle pain' },
      { name: 'Diclofenac gel (Voltaren)', dose: 'Apply and massage', when: '3–4 times daily on affected area', note: 'Topical — avoids stomach side effects' },
      { name: 'Muscle relaxant (Thiocolchicoside)', dose: '4mg', when: 'Twice daily (only if severe spasm)', note: 'Consult pharmacist before use' },
    ],
    homeRemedies: ['Apply ice pack first 48 hours, then warm compress', 'Gentle stretching and walking', 'Avoid bed rest >1–2 days', 'Check mattress/chair ergonomics'],
    whenToSeeDoctor: 'If pain radiates down legs, numbness/tingling, bladder/bowel changes, or severe pain with fever.',
    severity: 'low',
  },
};

const SYMPTOM_LIST = Object.keys(ILLNESS_DB);

const severityColor = {
  low: 'bg-green-50 border-green-300 text-green-800',
  medium: 'bg-yellow-50 border-yellow-300 text-yellow-800',
  high: 'bg-red-50 border-red-300 text-red-800',
};

export default function MinorIllnessDiagnosis() {
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  const illness = selected ? ILLNESS_DB[selected] : null;

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
            <Pill className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-left">
            <h2 className="font-jakarta font-bold text-xl text-gray-900">Minor Illness Diagnosis & Medicines</h2>
            <p className="text-gray-500 text-xs">OTC medicines and home remedies for common minor health issues</p>
          </div>
        </div>
        {open ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
      </button>

      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-6 pb-6 space-y-5">
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-xs text-yellow-700 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>For minor symptoms only. Always consult a doctor for severe symptoms, children, pregnant women, or if symptoms worsen. Do not self-medicate for serious conditions.</span>
          </div>

          {/* Symptom selector */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-3">What is your main symptom?</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {SYMPTOM_LIST.map(s => (
                <button key={s} onClick={() => setSelected(s === selected ? null : s)}
                  className={`flex items-center gap-2 text-left text-xs font-medium px-3 py-2.5 rounded-xl border-2 transition-all ${selected === s ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200 text-gray-600 hover:border-green-300'}`}>
                  <Thermometer className="w-3.5 h-3.5 flex-shrink-0" />
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Result */}
          <AnimatePresence>
            {illness && (
              <motion.div key={selected} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
                {/* Diagnosis header */}
                <div className={`border-2 rounded-2xl p-5 ${severityColor[illness.severity]}`}>
                  <p className="font-bold text-lg mb-1">Likely: {illness.diagnosis}</p>
                  <p className="text-sm opacity-80 leading-relaxed">{illness.description}</p>
                </div>

                {/* Medicines */}
                <div>
                  <p className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <Pill className="w-4 h-4 text-green-600" /> Suggested Medicines (OTC)
                  </p>
                  <div className="space-y-2">
                    {illness.medicines.map((m, i) => (
                      <div key={i} className="bg-gray-50 rounded-xl p-4">
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-semibold text-gray-900 text-sm">{m.name}</p>
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full flex-shrink-0">{m.dose}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">🕐 {m.when}</p>
                        <p className="text-xs text-gray-400 mt-0.5 italic">ℹ️ {m.note}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Home remedies */}
                <div>
                  <p className="text-sm font-bold text-gray-800 mb-2">🏠 Home Remedies</p>
                  <ul className="space-y-1.5">
                    {illness.homeRemedies.map((r, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0 mt-0.5" /> {r}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* When to see doctor */}
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-sm font-bold text-red-800 mb-1 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4" /> See a Doctor If:
                  </p>
                  <p className="text-sm text-red-700">{illness.whenToSeeDoctor}</p>
                </div>

                <Link to="/appointments"
                  className="flex items-center justify-center gap-2 w-full border-2 border-blue-300 text-blue-700 hover:bg-blue-50 font-semibold py-2.5 rounded-xl text-sm transition-colors">
                  <ExternalLink className="w-4 h-4" /> Book a Doctor for Proper Diagnosis
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}