import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Star, MapPin, Video, CheckCircle, Search, Filter } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { toast } from 'sonner';

const doctors = [
  { id: 1, name: 'Dr. Meena Iyer', specialty: 'Gynecologist', exp: '18 yrs', rating: 4.9, reviews: 312, location: 'Bengaluru', type: ['in-person', 'online'], bio: 'Expert in PCOD/PCOS, endometriosis, and women\'s hormonal health.', img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&q=80' },
  { id: 2, name: 'Dr. Arun Verma', specialty: 'Cardiologist', exp: '22 yrs', rating: 4.8, reviews: 289, location: 'Mumbai', type: ['in-person'], bio: 'Specialist in interventional cardiology, ECG monitoring, and heart failure management.', img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&q=80' },
  { id: 3, name: 'Dr. Priya Sharma', specialty: 'General Physician', exp: '14 yrs', rating: 4.7, reviews: 198, location: 'Delhi', type: ['in-person', 'online'], bio: 'Comprehensive primary care, preventive health, and chronic disease management.', img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&q=80' },
  { id: 4, name: 'Dr. Suresh Pillai', specialty: 'Neurologist', exp: '16 yrs', rating: 4.8, reviews: 176, location: 'Chennai', type: ['in-person', 'online'], bio: 'Expert in stroke management, epilepsy, migraine, and neurodegenerative disorders.', img: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&q=80' },
  { id: 5, name: 'Dr. Kavita Nair', specialty: 'Gynecologist', exp: '11 yrs', rating: 4.6, reviews: 145, location: 'Pune', type: ['online'], bio: 'Focused on maternal health, fertility, and minimally invasive gynecological procedures.', img: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=200&q=80' },
  { id: 6, name: 'Dr. Rahul Gupta', specialty: 'Cardiologist', exp: '9 yrs', rating: 4.5, reviews: 122, location: 'Hyderabad', type: ['in-person', 'online'], bio: 'Cardiac rehabilitation, preventive cardiology, and lipid management specialist.', img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&q=80' },
];

const specialties = ['All', 'Gynecologist', 'Neurologist', 'Cardiologist', 'General Physician'];
const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'];

function DoctorCard({ doc, onSelect }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-5">
      <div className="flex gap-4">
        <img src={doc.img} alt={doc.name} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-jakarta font-bold text-gray-900">{doc.name}</h3>
              <p className="text-blue-600 text-sm font-semibold">{doc.specialty}</p>
            </div>
            <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">
              <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
              <span className="text-xs font-semibold text-gray-700">{doc.rating}</span>
            </div>
          </div>
          <p className="text-gray-500 text-xs mt-1">{doc.bio}</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            <span className="flex items-center gap-1 text-xs text-gray-500"><User className="w-3 h-3" />{doc.exp} exp.</span>
            <span className="flex items-center gap-1 text-xs text-gray-500"><MapPin className="w-3 h-3" />{doc.location}</span>
            <span className="text-xs text-gray-400">{doc.reviews} reviews</span>
          </div>
          <div className="flex gap-2 mt-2">
            {doc.type.includes('online') && <span className="flex items-center gap-1 text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full"><Video className="w-3 h-3" />Online</span>}
            {doc.type.includes('in-person') && <span className="flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full"><MapPin className="w-3 h-3" />In-person</span>}
          </div>
        </div>
      </div>
      <button onClick={() => onSelect(doc)}
        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors">
        Book Appointment
      </button>
    </motion.div>
  );
}

export default function Appointments() {
  const [specialty, setSpecialty] = useState('All');
  const [consult, setConsult] = useState('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [bookForm, setBookForm] = useState({ patient_name: '', email: '', phone: '', date: '', time_slot: '', reason: '' });
  const [confirmed, setConfirmed] = useState(null);
  const [loading, setLoading] = useState(false);

  const filtered = doctors.filter(d =>
    (specialty === 'All' || d.specialty === specialty) &&
    (consult === 'all' || d.type.includes(consult)) &&
    (search === '' || d.name.toLowerCase().includes(search.toLowerCase()) || d.specialty.toLowerCase().includes(search.toLowerCase()))
  );

  const handleBook = async (e) => {
    e.preventDefault();
    setLoading(true);
    await base44.entities.Appointment.create({
      ...bookForm, doctor: selected.name, department: selected.specialty, status: 'pending'
    });
    setLoading(false);
    setConfirmed({ ...bookForm, doctor: selected });
    setSelected(null);
    toast.success('Appointment booked!');
  };

  const isBookValid = bookForm.patient_name && bookForm.email && bookForm.phone && bookForm.date && bookForm.time_slot;

  if (confirmed) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="font-jakarta font-bold text-2xl text-gray-900 mb-2">Appointment Confirmed!</h2>
          <p className="text-gray-600 mb-1">with <strong>{confirmed.doctor.name}</strong> ({confirmed.doctor.specialty})</p>
          <p className="text-gray-600 mb-1">on <strong>{confirmed.date}</strong> at <strong>{confirmed.time_slot}</strong></p>
          <p className="text-gray-400 text-sm mb-8">Confirmation sent to <strong>{confirmed.email}</strong></p>
          <button onClick={() => setConfirmed(null)} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full">
            Book Another
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="font-jakarta font-bold text-3xl text-gray-900">Book a Doctor</h1>
          <p className="text-gray-500 mt-2">Find the right specialist and book your appointment in minutes.</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm p-4 mb-6 flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-2 flex-1 min-w-48">
            <Search className="w-4 h-4 text-gray-400" />
            <input placeholder="Search by name or specialty..." value={search} onChange={e => setSearch(e.target.value)}
              className="flex-1 text-sm focus:outline-none" />
          </div>
          <div className="flex flex-wrap gap-2">
            {specialties.map(s => (
              <button key={s} onClick={() => setSpecialty(s)}
                className={`text-sm px-4 py-1.5 rounded-full border transition-all ${specialty === s ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-200 text-gray-600 hover:border-blue-300'}`}>
                {s}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            {[['all', 'All'], ['online', 'Online'], ['in-person', 'In-person']].map(([v, l]) => (
              <button key={v} onClick={() => setConsult(v)}
                className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-all ${consult === v ? 'bg-green-600 text-white border-green-600' : 'border-gray-200 text-gray-600 hover:border-green-300'}`}>
                {v === 'online' ? <Video className="w-3 h-3" /> : v === 'in-person' ? <MapPin className="w-3 h-3" /> : <Filter className="w-3 h-3" />} {l}
              </button>
            ))}
          </div>
        </div>

        {/* Doctor grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map(doc => <DoctorCard key={doc.id} doc={doc} onSelect={setSelected} />)}
          {filtered.length === 0 && <p className="text-gray-400 text-center py-10 col-span-2">No doctors found for this filter.</p>}
        </div>
      </div>

      {/* Booking modal */}
      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={e => e.target === e.currentTarget && setSelected(null)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
              <div className="flex items-center gap-4 mb-6">
                <img src={selected.img} alt={selected.name} className="w-14 h-14 rounded-xl object-cover" />
                <div>
                  <h3 className="font-jakarta font-bold text-gray-900">{selected.name}</h3>
                  <p className="text-blue-600 text-sm">{selected.specialty} · {selected.location}</p>
                </div>
              </div>
              <form onSubmit={handleBook} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {[{ k: 'patient_name', l: 'Full Name *', p: 'Your name' }, { k: 'phone', l: 'Phone *', p: '+91 9876543210' }, { k: 'email', l: 'Email *', p: 'you@email.com', t: 'email' }, { k: 'date', l: 'Date *', t: 'date' }].map(f => (
                    <div key={f.k}>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">{f.l}</label>
                      <input type={f.t || 'text'} placeholder={f.p} value={bookForm[f.k]}
                        onChange={e => setBookForm(b => ({ ...b, [f.k]: e.target.value }))}
                        min={f.k === 'date' ? new Date().toISOString().split('T')[0] : undefined}
                        className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">Time Slot *</label>
                  <div className="grid grid-cols-4 gap-2">
                    {timeSlots.map(t => (
                      <button key={t} type="button" onClick={() => setBookForm(b => ({ ...b, time_slot: t }))}
                        className={`py-2 rounded-xl text-xs font-medium border transition-all ${bookForm.time_slot === t ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'}`}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Reason (optional)</label>
                  <textarea value={bookForm.reason} onChange={e => setBookForm(b => ({ ...b, reason: e.target.value }))} rows={2}
                    placeholder="Brief reason for visit..." className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none" />
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setSelected(null)}
                    className="flex-1 py-3 border border-gray-300 text-gray-600 font-semibold rounded-xl hover:bg-gray-50">
                    Cancel
                  </button>
                  <button type="submit" disabled={!isBookValid || loading}
                    className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl disabled:opacity-50 transition-colors">
                    {loading ? 'Booking...' : 'Confirm'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}