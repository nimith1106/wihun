import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MapPin, Navigation, AlertTriangle, CheckCircle, Loader2, Heart, Zap, Shield, Map } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

const MOCK_HOSPITALS = [
  { id: 1, name: 'Apollo Hospital', address: '154 Bannerghatta Road, Bengaluru', distance: '1.2 km', phone: '080-26941414', emergency: '080-26941000', open: true, specialties: ['Cardiac', 'Neuro', 'Trauma'], rating: 4.8, mapQuery: 'Apollo+Hospital+Bannerghatta+Bengaluru' },
  { id: 2, name: 'Manipal Hospital', address: '98 HAL Airport Road, Bengaluru', distance: '2.8 km', phone: '080-25024444', emergency: '1800-102-4455', open: true, specialties: ['Stroke Unit', 'PCOD Clinic', 'ER 24/7'], rating: 4.7, mapQuery: 'Manipal+Hospital+HAL+Bengaluru' },
  { id: 3, name: 'Fortis Hospital', address: 'Cunningham Road, Bengaluru', distance: '4.1 km', phone: '080-66214444', emergency: '080-66214888', open: true, specialties: ['Cardiology', 'Neurology', "Women's Health"], rating: 4.6, mapQuery: 'Fortis+Hospital+Cunningham+Road+Bengaluru' },
  { id: 4, name: 'Victoria Hospital', address: 'Fort Road, Bengaluru', distance: '5.5 km', phone: '080-26703000', emergency: '080-26703100', open: true, specialties: ['General ER', 'Trauma', 'Govt. Hospital'], rating: 4.3, mapQuery: 'Victoria+Hospital+Fort+Road+Bengaluru' },
  { id: 5, name: 'Narayana Health', address: 'Bommasandra, Bengaluru', distance: '7.2 km', phone: '080-71222222', emergency: '1800-889-0290', open: false, specialties: ['Cardiac Surgery', 'Multi-specialty'], rating: 4.9, mapQuery: 'Narayana+Health+Bommasandra+Bengaluru' },
];

const quickActions = [
  { label: 'Call Ambulance', number: '108', icon: Heart, color: 'bg-red-600 hover:bg-red-700', desc: 'National ambulance service' },
  { label: 'Emergency Helpline', number: '112', icon: Zap, color: 'bg-orange-500 hover:bg-orange-600', desc: 'Police, Fire, Medical' },
  { label: 'MediCare Pro ER', number: '18001234567', icon: Shield, color: 'bg-blue-600 hover:bg-blue-700', desc: '24/7 hospital helpline' },
];

const BENGALURU_MAP_EMBED = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.84916296526!2d77.49085305!3d12.9539974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin";

export default function Emergency() {
  const { t } = useLanguage();
  const [detecting, setDetecting] = useState(false);
  const [detected, setDetected] = useState(false);
  const [location, setLocation] = useState(/** @type {{lat:string; lng:string}|null} */ (null));
  const [locationShared, setLocationShared] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(/** @type {{id:number; name:string; address:string; distance:string; phone:string; emergency:string; open:boolean; specialties:string[]; rating:number; mapQuery:string}|null} */ (null));

  const detectHospitals = () => {
    setDetecting(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          setLocation({ lat: pos.coords.latitude.toFixed(3), lng: pos.coords.longitude.toFixed(3) });
          setTimeout(() => { setDetecting(false); setDetected(true); }, 1200);
        },
        () => setTimeout(() => { setDetecting(false); setDetected(true); }, 1500)
      );
    } else {
      setTimeout(() => { setDetecting(false); setDetected(true); }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Hero emergency banner */}
        <div className="bg-red-600 rounded-3xl p-6 md:p-8 text-white">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-jakarta font-bold text-2xl md:text-3xl">{t('emergencySupport')}</h1>
              <p className="text-red-100 mt-1">Immediate help for medical emergencies. Stay calm — help is close.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {quickActions.map(a => {
              const Icon = a.icon;
              return (
                <a key={a.number} href={`tel:${a.number}`}
                  className={`${a.color} rounded-2xl p-4 flex items-center gap-3 transition-all active:scale-95`}>
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">{a.label}</p>
                    <p className="text-white/80 text-xs">{a.number === '18001234567' ? '1800-123-4567' : a.number} · {a.desc}</p>
                  </div>
                  <Phone className="w-4 h-4 ml-auto opacity-70" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Location share */}
        <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <MapPin className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">{t('shareLocation')}</p>
              <p className="text-gray-500 text-xs">{location ? `Detected: ${location.lat}°N, ${location.lng}°E` : 'Share with emergency dispatcher'}</p>
            </div>
          </div>
          <button onClick={() => {
            setLocationShared(true);
            if (!location && navigator.geolocation) navigator.geolocation.getCurrentPosition(p => setLocation({ lat: p.coords.latitude.toFixed(3), lng: p.coords.longitude.toFixed(3) }), () => {});
          }}
            className={`flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full transition-colors ${locationShared ? 'bg-green-100 text-green-700' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}>
            {locationShared ? <><CheckCircle className="w-4 h-4" /> {t('shared')}</> : <><Navigation className="w-4 h-4" /> {t('shareLocation')}</>}
          </button>
        </div>

        {/* Google Map */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="flex items-center gap-3 p-4 border-b border-gray-100">
            <Map className="w-5 h-5 text-blue-600" />
            <h2 className="font-jakarta font-bold text-lg text-gray-900">Hospital Map — Bengaluru</h2>
            {selectedHospital && (
              <a href={`https://www.google.com/maps/search/${selectedHospital.mapQuery}`} target="_blank" rel="noopener noreferrer"
                className="ml-auto text-xs text-blue-600 hover:underline">Open in Google Maps →</a>
            )}
          </div>
          <div className="relative">
            <iframe
              title="Hospital Map"
              src={selectedHospital
                ? `https://www.google.com/maps/embed/v1/search?key=AIzaSyD-placeholder&q=${selectedHospital.mapQuery}`
                : BENGALURU_MAP_EMBED
              }
              className="w-full h-64 md:h-80"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Overlay with hospital pins */}
            <div className="absolute top-3 right-3 bg-white rounded-xl shadow-lg p-2 space-y-1 max-w-[160px]">
              <p className="text-xs font-bold text-gray-700 px-1">Quick Select</p>
              {MOCK_HOSPITALS.slice(0, 3).map(h => (
                <button key={h.id} onClick={() => setSelectedHospital(h)}
                  className={`w-full text-left text-xs px-2 py-1.5 rounded-lg transition-colors ${selectedHospital?.id === h.id ? 'bg-blue-100 text-blue-700 font-semibold' : 'hover:bg-gray-50 text-gray-600'}`}>
                  📍 {h.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
          <div className="px-4 py-2 bg-blue-50 text-xs text-blue-600">
            ℹ️ Map shows Bengaluru region. In production, this integrates with Google Places API for real-time nearby hospital detection.
          </div>
        </div>

        {/* Nearby hospitals list */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-jakarta font-bold text-xl text-gray-900">{t('nearbyHospitals')}</h2>
            {!detected && (
              <button onClick={detectHospitals} disabled={detecting}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full disabled:opacity-70 transition-colors">
                {detecting ? <><Loader2 className="w-4 h-4 animate-spin" /> Detecting...</> : <><MapPin className="w-4 h-4" /> {t('detectNearest')}</>}
              </button>
            )}
            {detected && <span className="text-xs text-green-600 font-semibold flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5" /> Location detected</span>}
          </div>

          {!detected && !detecting && (
            <div className="text-center py-12 text-gray-400">
              <MapPin className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p className="text-sm">Click "{t('detectNearest')}" to find hospitals near you</p>
            </div>
          )}

          {detecting && (
            <div className="text-center py-12 text-blue-500">
              <Loader2 className="w-10 h-10 mx-auto mb-3 animate-spin" />
              <p className="text-sm">Locating nearest emergency services...</p>
            </div>
          )}

          <AnimatePresence>
            {detected && (
              <div className="space-y-4">
                {MOCK_HOSPITALS.map((h, i) => (
                  <motion.div key={h.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                    className={`border rounded-2xl p-4 hover:shadow-sm transition-all cursor-pointer ${selectedHospital?.id === h.id ? 'border-blue-400 bg-blue-50' : 'border-gray-100 hover:border-blue-200'}`}
                    onClick={() => setSelectedHospital(h)}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900">{h.name}</h3>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${h.open ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {h.open ? 'Open 24/7' : 'Closed'}
                          </span>
                        </div>
                        <p className="text-gray-500 text-sm flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 flex-shrink-0" /> {h.address}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {h.specialties.map(s => (
                            <span key={s} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">{s}</span>
                          ))}
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="font-bold text-blue-600 text-sm">{h.distance}</p>
                        <p className="text-xs text-gray-400">away</p>
                        <a href={`https://www.google.com/maps/search/${h.mapQuery}`} target="_blank" rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="text-xs text-blue-500 hover:underline mt-1 block">View Map</a>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-100">
                      <a href={`tel:${h.emergency}`} onClick={e => e.stopPropagation()}
                        className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-3 py-1.5 rounded-full transition-colors">
                        <Phone className="w-3 h-3" /> Emergency: {h.emergency}
                      </a>
                      <a href={`tel:${h.phone}`} onClick={e => e.stopPropagation()}
                        className="flex items-center gap-1.5 border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors">
                        <Phone className="w-3 h-3" /> Reception
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* First aid tips */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="font-jakarta font-bold text-xl text-gray-900 mb-4">{t('whileWaiting')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { n: '1', text: 'Stay calm and assess the situation safely.' },
              { n: '2', text: 'Do NOT move the patient if spinal/neck injury is suspected.' },
              { n: '3', text: 'Keep the person awake and talking if conscious.' },
              { n: '4', text: 'Do NOT give food or water unless instructed.' },
              { n: '5', text: 'For suspected stroke — note exact time symptoms began.' },
              { n: '6', text: 'Keep emergency contact numbers visible and accessible.' },
            ].map(s => (
              <div key={s.n} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                <span className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{s.n}</span>
                <p className="text-sm text-gray-700">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}