import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const team = [
  { name: 'Dr. Meena Iyer', specialty: 'Gynecology & PCOD Specialist', img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&q=80', exp: '18 yrs' },
  { name: 'Dr. Arun Verma', specialty: 'Senior Cardiologist', img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&q=80', exp: '22 yrs' },
  { name: 'Dr. Priya Sharma', specialty: 'Internal Medicine', img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&q=80', exp: '14 yrs' },
  { name: 'Dr. Suresh Pillai', specialty: 'Orthopedics', img: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&q=80', exp: '16 yrs' },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Doctors */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Our Team</span>
          <h2 className="font-jakarta font-bold text-3xl sm:text-4xl text-gray-900 mt-2">Meet Our Specialists</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-20">
          {team.map((doc, i) => (
            <motion.div
              key={doc.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-4 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <img src={doc.img} alt={doc.name} className="w-20 h-20 rounded-full object-cover mx-auto mb-3 border-4 border-blue-50" />
              <p className="font-semibold text-gray-900 text-sm">{doc.name}</p>
              <p className="text-gray-500 text-xs mt-1">{doc.specialty}</p>
              <span className="inline-block mt-2 bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">{doc.exp} Exp.</span>
            </motion.div>
          ))}
        </div>

        {/* Contact */}
        <div className="bg-blue-600 rounded-3xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="font-jakarta font-bold text-2xl md:text-3xl text-white mb-4">Visit Us or Get In Touch</h3>
            <p className="text-blue-100 mb-6">We're here for you around the clock. Reach out for appointments, queries, or emergencies.</p>
            <div className="space-y-3">
              {[
                { icon: MapPin, text: '42 Healthcare Avenue, Bengaluru, Karnataka 560001' },
                { icon: Phone, text: '+91 80 1234 5678 (24/7 Helpline)' },
                { icon: Mail, text: 'care@medicarepro.in' },
                { icon: Clock, text: 'ER Open 24/7 · OPD: Mon–Sat 8am–8pm' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-3 text-blue-100 text-sm">
                  <Icon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  {text}
                </div>
              ))}
            </div>
          </div>
          <div className="w-full h-56 md:h-64 bg-blue-500 rounded-2xl overflow-hidden">
            <iframe
              title="Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.84916296526!2d77.49085305!3d12.9539974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000"
              className="w-full h-full"
              style={{ border: 0, filter: 'hue-rotate(200deg)' }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}