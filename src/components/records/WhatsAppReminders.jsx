import React, { useState } from 'react';
import { MessageCircle, Bell, CheckCircle, Phone } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { toast } from 'sonner';

const REMINDER_TYPES_KEYS = ['consultFollowup', 'medicationAlert', 'bpCheck'];
const FREQ_KEYS = ['daily', 'weekly', 'monthly'];

export default function WhatsAppReminders() {
  const { t } = useLanguage();
  const [phone, setPhone] = useState('');
  const [freq, setFreq] = useState('weekly');
  const [selected, setSelected] = useState(['consultFollowup']);
  const [saved, setSaved] = useState(false);

  const toggle = (key) => setSelected(s => s.includes(key) ? s.filter(x => x !== key) : [...s, key]);

  const handleSave = () => {
    if (!phone.match(/^\+?[\d\s-]{8,}$/)) {
      toast.error('Please enter a valid phone number');
      return;
    }
    setSaved(true);
    toast.success(t('reminderSaved'));
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
          <MessageCircle className="w-5 h-5 text-green-600" />
        </div>
        <div>
          <h2 className="font-jakarta font-bold text-xl text-gray-900">{t('reminders')}</h2>
          <p className="text-gray-500 text-xs">Simulated WhatsApp notification system</p>
        </div>
      </div>

      {saved ? (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-5 flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-green-800 text-sm">{t('reminderSaved')}</p>
            <p className="text-green-600 text-xs mt-1">📱 {phone} · {t(freq)} · {selected.length} alert type(s)</p>
            <button onClick={() => setSaved(false)} className="mt-3 text-xs text-green-700 underline">Edit reminders</button>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{t('phone')}</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="tel" placeholder="+91 9876543210" value={phone} onChange={e => setPhone(e.target.value)}
                className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-300" />
            </div>
          </div>

          {/* Frequency */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">{t('frequency')}</label>
            <div className="flex gap-2">
              {FREQ_KEYS.map(f => (
                <button key={f} onClick={() => setFreq(f)}
                  className={`flex-1 py-2 rounded-xl text-sm font-semibold border-2 transition-all ${freq === f ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200 text-gray-500 hover:border-green-300'}`}>
                  {t(f)}
                </button>
              ))}
            </div>
          </div>

          {/* Alert types */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Alert Types</label>
            <div className="space-y-2">
              {REMINDER_TYPES_KEYS.map(key => (
                <button key={key} onClick={() => toggle(key)}
                  className={`w-full flex items-center gap-3 text-left px-4 py-3 rounded-xl border-2 text-sm transition-all ${selected.includes(key) ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200 text-gray-600 hover:border-green-300'}`}>
                  <Bell className="w-4 h-4 flex-shrink-0" />
                  {t(key)}
                  {selected.includes(key) && <CheckCircle className="w-4 h-4 ml-auto text-green-500" />}
                </button>
              ))}
            </div>
          </div>

          <button onClick={handleSave}
            className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-colors">
            <MessageCircle className="w-4 h-4" /> {t('enableReminders')}
          </button>

          <p className="text-xs text-gray-400 text-center">
            ⚠️ Simulated system. Real WhatsApp integration via Business API in production deployment.
          </p>
        </div>
      )}
    </div>
  );
}