import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, X, MapPin, AlertTriangle, Clock, CheckCircle, Loader2, Radio, PhoneCall } from 'lucide-react';

// Location-based contact sets
const CONTACTS_BY_REGION = {
  IN: [
    { label: 'Ambulance', number: '108', color: 'bg-red-600 hover:bg-red-700', icon: '🚑' },
    { label: 'Emergency (Police/Fire/Medical)', number: '112', color: 'bg-orange-500 hover:bg-orange-600', icon: '🆘' },
    { label: 'MediCare Pro ER', number: '18001234567', display: '1800-123-4567', color: 'bg-blue-600 hover:bg-blue-700', icon: '🏥' },
    { label: 'Disaster Mgmt.', number: '1078', color: 'bg-purple-600 hover:bg-purple-700', icon: '🛡️' },
  ],
  US: [
    { label: 'Emergency Services', number: '911', color: 'bg-red-600 hover:bg-red-700', icon: '🚑' },
    { label: 'Poison Control', number: '18002221222', display: '1-800-222-1222', color: 'bg-orange-500 hover:bg-orange-600', icon: '☠️' },
    { label: 'MediCare Pro ER', number: '18001234567', display: '1800-123-4567', color: 'bg-blue-600 hover:bg-blue-700', icon: '🏥' },
    { label: 'Mental Health Crisis', number: '988', color: 'bg-purple-600 hover:bg-purple-700', icon: '🧠' },
  ],
  GB: [
    { label: 'Emergency Services', number: '999', color: 'bg-red-600 hover:bg-red-700', icon: '🚑' },
    { label: 'Non-Emergency', number: '111', color: 'bg-orange-500 hover:bg-orange-600', icon: '🆘' },
    { label: 'MediCare Pro ER', number: '18001234567', display: '1800-123-4567', color: 'bg-blue-600 hover:bg-blue-700', icon: '🏥' },
    { label: 'Samaritans', number: '116123', color: 'bg-purple-600 hover:bg-purple-700', icon: '🧠' },
  ],
  DEFAULT: [
    { label: 'Ambulance', number: '108', color: 'bg-red-600 hover:bg-red-700', icon: '🚑' },
    { label: 'Emergency', number: '112', color: 'bg-orange-500 hover:bg-orange-600', icon: '🆘' },
    { label: 'MediCare Pro ER', number: '18001234567', display: '1800-123-4567', color: 'bg-blue-600 hover:bg-blue-700', icon: '🏥' },
    { label: 'Police', number: '100', color: 'bg-purple-600 hover:bg-purple-700', icon: '👮' },
  ],
};

const firstAidSteps = [
  'Stay calm and assess the situation',
  'Do NOT move the patient if spinal injury is suspected',
  'Keep the patient awake and comfortable',
  'Do NOT give food or water unless advised',
  'Share your exact location with the dispatcher',
];

const DISPATCH_STAGES = [
  { id: 'locating', label: 'Detecting your location...', icon: MapPin },
  { id: 'alerting', label: 'Sending dispatch alert...', icon: Radio },
  { id: 'confirmed', label: 'Dispatch confirmed!', icon: CheckCircle },
];

// Dial prompt component
function DialPrompt({ contact, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/70 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-gray-900 rounded-3xl w-full max-w-xs p-8 text-center shadow-2xl">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
          <PhoneCall className="w-8 h-8 text-white" />
        </div>
        <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Calling</p>
        <p className="text-white font-bold text-3xl mb-1">{contact.display || contact.number}</p>
        <p className="text-gray-400 text-sm mb-6">{contact.label}</p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full transition-colors"
          >
            Cancel
          </button>
          <a
            href={`tel:${contact.number}`}
            className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full transition-colors text-center"
            onClick={onClose}
          >
            Dial
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function EmergencyModal({ onClose }) {
  const [dispatchStage, setDispatchStage] = useState(0); // 0,1,2 = stages; 3 = done
  const [location, setLocation] = useState(null);
  const [countryCode, setCountryCode] = useState('DEFAULT');
  const [contacts, setContacts] = useState(CONTACTS_BY_REGION.DEFAULT);
  const [dialContact, setDialContact] = useState(null);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Simulate dispatch stages + get location
  useEffect(() => {
    // Stage 0 → 1
    const t1 = setTimeout(() => {
      setDispatchStage(1);
      // Attempt geolocation
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            setLocation({ lat: pos.coords.latitude.toFixed(4), lng: pos.coords.longitude.toFixed(4) });
            // Rough country detection by lat range
            const lat = pos.coords.latitude;
            const lng = pos.coords.longitude;
            if (lat >= 8 && lat <= 37 && lng >= 68 && lng <= 97) {
              setCountryCode('IN'); setContacts(CONTACTS_BY_REGION.IN);
            } else if (lat >= 24 && lat <= 50 && lng >= -125 && lng <= -66) {
              setCountryCode('US'); setContacts(CONTACTS_BY_REGION.US);
            } else if (lat >= 49 && lat <= 61 && lng >= -8 && lng <= 2) {
              setCountryCode('GB'); setContacts(CONTACTS_BY_REGION.GB);
            }
          },
          () => {} // silent fail, keep DEFAULT
        );
      }
    }, 1200);

    // Stage 1 → 2
    const t2 = setTimeout(() => setDispatchStage(2), 2600);
    // Stage 2 → done
    const t3 = setTimeout(() => setDispatchStage(3), 4000);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const dispatchDone = dispatchStage === 3;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="bg-red-600 px-6 py-5 flex items-center justify-between sticky top-0 z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-jakarta font-bold text-white text-xl">Emergency Help</h2>
                <p className="text-red-100 text-xs flex items-center gap-1 mt-0.5">
                  <Clock className="w-3 h-3" /> Available 24/7 — Respond in seconds
                </p>
              </div>
            </div>
            <button onClick={onClose} className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors">
              <X className="w-4 h-4 text-white" />
            </button>
          </div>

          <div className="p-6 space-y-5">
            {/* Dispatch Alert Banner */}
            <div className={`rounded-2xl p-4 border-2 transition-all duration-500 ${dispatchDone ? 'bg-green-50 border-green-400' : 'bg-red-50 border-red-200'}`}>
              <p className="text-xs font-bold uppercase tracking-widest mb-3 text-gray-500">Dispatch Status</p>
              <div className="space-y-2">
                {DISPATCH_STAGES.map((stage, i) => {
                  const done = dispatchStage > i;
                  const active = dispatchStage === i;
                  const Icon = stage.icon;
                  return (
                    <div key={stage.id} className={`flex items-center gap-3 text-sm font-medium transition-all ${done ? 'text-green-700' : active ? 'text-red-600' : 'text-gray-300'}`}>
                      {active ? (
                        <Loader2 className="w-4 h-4 animate-spin flex-shrink-0" />
                      ) : done ? (
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      ) : (
                        <Icon className="w-4 h-4 flex-shrink-0" />
                      )}
                      {stage.label}
                    </div>
                  );
                })}
              </div>

              {dispatchDone && (
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-3 pt-3 border-t border-green-200">
                  <p className="text-green-700 text-sm font-semibold">✅ Alert dispatched to MediCare Pro Emergency Response Team</p>
                  {location && (
                    <p className="text-green-600 text-xs mt-1">📍 Location detected: {location.lat}°N, {location.lng}°E</p>
                  )}
                </motion.div>
              )}
            </div>

            {/* Location-based contacts */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                  Emergency Contacts
                  {countryCode !== 'DEFAULT' && <span className="ml-2 text-blue-600">({countryCode})</span>}
                </p>
                {!location && (
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> Detecting region...
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                {contacts.map((c) => (
                  <button
                    key={c.number}
                    onClick={() => setDialContact(c)}
                    className={`${c.color} text-white rounded-2xl p-4 flex flex-col items-center gap-2 text-center transition-all active:scale-95 shadow-sm`}
                  >
                    <span className="text-2xl">{c.icon}</span>
                    <span className="font-bold text-lg leading-none">{c.display || c.number}</span>
                    <span className="text-xs opacity-90">{c.label}</span>
                    <span className="flex items-center gap-1 text-[10px] bg-white/20 px-2 py-0.5 rounded-full">
                      <Phone className="w-2.5 h-2.5" /> Tap to Call
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* First aid */}
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">While Waiting for Help</p>
              <ul className="space-y-2">
                {firstAidSteps.map((s, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                    <span className="w-5 h-5 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Dial prompt overlay */}
      <AnimatePresence>
        {dialContact && <DialPrompt contact={dialContact} onClose={() => setDialContact(null)} />}
      </AnimatePresence>
    </>
  );
}