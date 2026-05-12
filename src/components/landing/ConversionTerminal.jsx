import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { toast } from 'sonner';

const CONTACT_IMG = 'https://media.base44.com/images/public/69fb79b7748e5b3f3b5c5295/3151096ab_generated_c312e5db.png';

export default function ConversionTerminal() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });

  const fields = [
    { key: 'name', label: 'Your Name', placeholder: 'John Doe', type: 'text' },
    { key: 'email', label: 'Email Address', placeholder: 'john@company.com', type: 'email' },
    { key: 'company', label: 'Company', placeholder: 'Company Inc.', type: 'text' },
    { key: 'message', label: 'Project Brief', placeholder: 'Tell us about your project...', type: 'textarea' },
  ];

  const progress = ((step + 1) / fields.length) * 100;

  const handleSubmit = () => {
    setSubmitted(true);
    toast.success('Message sent! We\'ll be in touch within 24 hours.');
  };

  const handleNext = () => {
    if (step < fields.length - 1) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-15">
        <img src={CONTACT_IMG} alt="Precision component" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-obsidian/90 to-obsidian" />

      {/* Progress fill */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 bg-volt/5"
        animate={{ height: `${progress}%` }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      />

      <div className="relative z-10 px-6 md:px-12 lg:px-24">
        <div className="hairline mb-20" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="font-mono text-xs text-volt tracking-widest uppercase">
            Initiate Contact
          </span>
          <h2 className="font-inter font-bold text-4xl md:text-6xl lg:text-7xl text-foreground mt-4 tracking-tighter">
            Conversion
            <br />
            <span className="text-steel">Terminal</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl">
          {!submitted ? (
            <>
              {/* Step indicator */}
              <div className="flex items-center gap-2 mb-12">
                {fields.map((_, i) => (
                  <div
                    key={i}
                    className={`h-0.5 flex-1 rounded-full transition-all duration-500 ${
                      i <= step ? 'bg-volt' : 'bg-white/10'
                    }`}
                  />
                ))}
              </div>

              {/* Current field */}
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.5 }}
              >
                <label className="font-mono text-xs text-steel tracking-widest uppercase block mb-4">
                  {fields[step].label}
                </label>

                {fields[step].type === 'textarea' ? (
                  <textarea
                    autoFocus
                    value={form[fields[step].key]}
                    onChange={(e) => setForm({ ...form, [fields[step].key]: e.target.value })}
                    placeholder={fields[step].placeholder}
                    rows={4}
                    className="w-full bg-transparent border-0 border-b border-white/10 focus:border-volt text-foreground font-inter text-3xl md:text-4xl font-light placeholder:text-white/10 focus:outline-none focus:ring-0 pb-4 transition-colors duration-300 resize-none"
                    onKeyDown={(e) => { if (e.key === 'Enter' && e.metaKey) handleNext(); }}
                  />
                ) : (
                  <input
                    autoFocus
                    type={fields[step].type}
                    value={form[fields[step].key]}
                    onChange={(e) => setForm({ ...form, [fields[step].key]: e.target.value })}
                    placeholder={fields[step].placeholder}
                    className="w-full bg-transparent border-0 border-b border-white/10 focus:border-volt text-foreground font-inter text-3xl md:text-5xl font-light placeholder:text-white/10 focus:outline-none focus:ring-0 pb-4 transition-colors duration-300"
                    onKeyDown={(e) => { if (e.key === 'Enter') handleNext(); }}
                  />
                )}
              </motion.div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-12">
                <button
                  onClick={() => step > 0 && setStep(step - 1)}
                  className={`font-inter text-sm text-steel hover:text-foreground transition-colors ${
                    step === 0 ? 'opacity-0 pointer-events-none' : ''
                  }`}
                >
                  ← Back
                </button>

                <button
                  onClick={handleNext}
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-volt text-obsidian font-inter font-semibold text-sm rounded-full hover:bg-volt/90 transition-all duration-300 glow-accent"
                >
                  {step === fields.length - 1 ? 'Submit' : 'Continue'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center py-20"
            >
              <div className="w-16 h-16 rounded-full bg-volt/20 flex items-center justify-center mx-auto mb-8">
                <Check className="w-8 h-8 text-volt" />
              </div>
              <h3 className="font-inter font-bold text-3xl md:text-4xl text-foreground tracking-tight">
                Transmission Received
              </h3>
              <p className="font-inter text-lg text-steel mt-4 max-w-md mx-auto">
                Our team will analyze your brief and respond within 24 hours. 
                Welcome to the network.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}