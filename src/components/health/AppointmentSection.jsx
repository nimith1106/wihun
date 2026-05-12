import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, CheckCircle } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { toast } from 'sonner';

const departments = ['General Medicine', 'Gynecology', 'Cardiology', 'Orthopedics', 'Dermatology', 'Pediatrics'];
const doctors = {
  'General Medicine': ['Dr. Rajan Kumar', 'Dr. Priya Sharma'],
  'Gynecology': ['Dr. Meena Iyer', 'Dr. Sunita Rao'],
  'Cardiology': ['Dr. Arun Verma', 'Dr. Kavita Nair'],
  'Orthopedics': ['Dr. Suresh Pillai', 'Dr. Rahul Gupta'],
  'Dermatology': ['Dr. Divya Menon', 'Dr. Arjun Patel'],
  'Pediatrics': ['Dr. Shweta Singh', 'Dr. Mohan Das'],
};
const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'];

export default function AppointmentSection() {
  const [form, setForm] = useState({ patient_name: '', email: '', phone: '', department: '', doctor: '', date: '', time_slot: '', reason: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val, ...(key === 'department' ? { doctor: '' } : {}) }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await base44.entities.Appointment.create(form);
    setLoading(false);
    setSubmitted(true);
    toast.success('Appointment booked successfully!');
  };

  const isValid = form.patient_name && form.email && form.phone && form.department && form.doctor && form.date && form.time_slot;

  if (submitted) {
    return (
      <section id="appointments" className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h3 className="font-jakarta font-bold text-2xl text-gray-900 mb-3">Appointment Confirmed!</h3>
            <p className="text-gray-500 mb-2">Your appointment has been booked with <strong>{form.doctor}</strong></p>
            <p className="text-gray-500 mb-6">on <strong>{form.date}</strong> at <strong>{form.time_slot}</strong></p>
            <p className="text-sm text-gray-400 mb-8">A confirmation will be sent to <strong>{form.email}</strong></p>
            <button onClick={() => { setSubmitted(false); setForm({ patient_name: '', email: '', phone: '', department: '', doctor: '', date: '', time_slot: '', reason: '' }); }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full transition-colors">
              Book Another Appointment
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="appointments" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Easy Booking</span>
          <h2 className="font-jakarta font-bold text-3xl sm:text-4xl text-gray-900 mt-2">Book an Appointment</h2>
          <p className="text-gray-500 mt-3">Schedule your visit with our specialists in minutes.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Info cards */}
          <div className="space-y-4">
            {[{ IconComp: Calendar, title: 'Flexible Scheduling', desc: 'Choose from morning, afternoon, or evening slots.' },
              { IconComp: User, title: 'Top Specialists', desc: 'Board-certified doctors across 15+ specialties.' },
              { IconComp: Clock, title: 'No Long Waits', desc: 'Average wait time less than 10 minutes.' }
            ].map(({ IconComp, title, desc }) => (
              <div key={title} className="flex gap-4 p-4 rounded-2xl bg-blue-50">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <IconComp className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{title}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 bg-gray-50 rounded-3xl p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[{ key: 'patient_name', label: 'Full Name', placeholder: 'Your full name' },
                { key: 'phone', label: 'Phone Number', placeholder: '+91 9876543210' },
                { key: 'email', label: 'Email Address', placeholder: 'your@email.com', type: 'email' },
                { key: 'date', label: 'Preferred Date', type: 'date' },
              ].map(f => (
                <div key={f.key}>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">{f.label}</label>
                  <input
                    type={f.type || 'text'}
                    value={form[f.key]}
                    onChange={e => set(f.key, e.target.value)}
                    placeholder={f.placeholder}
                    min={f.key === 'date' ? new Date().toISOString().split('T')[0] : undefined}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Department</label>
                <select value={form.department} onChange={e => set('department', e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-300">
                  <option value="">Select department</option>
                  {departments.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Doctor</label>
                <select value={form.doctor} onChange={e => set('doctor', e.target.value)} disabled={!form.department}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-50">
                  <option value="">Select doctor</option>
                  {(doctors[form.department] || []).map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">Time Slot</label>
              <div className="grid grid-cols-4 gap-2">
                {timeSlots.map(t => (
                  <button key={t} type="button" onClick={() => set('time_slot', t)}
                    className={`py-2 rounded-xl text-xs font-medium border transition-all ${form.time_slot === t ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Reason for Visit (optional)</label>
              <textarea value={form.reason} onChange={e => set('reason', e.target.value)} rows={2} placeholder="Brief description of your concern..."
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none" />
            </div>

            <button type="submit" disabled={!isValid || loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? 'Booking...' : 'Confirm Appointment'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}