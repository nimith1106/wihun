import React from 'react';
import { motion } from 'framer-motion';
import FeatureCard from './FeatureCard';

const FEATURE_IMG_1 = 'https://media.base44.com/images/public/69fb79b7748e5b3f3b5c5295/24cbf60c3_generated_485b6655.png';
const FEATURE_IMG_2 = 'https://media.base44.com/images/public/69fb79b7748e5b3f3b5c5295/f4143f651_generated_cd0dd65b.png';
const FEATURES_IMG = 'https://media.base44.com/images/public/69fb79b7748e5b3f3b5c5295/f8c4c2a78_generated_0f647311.png';

const features = [
  {
    tag: 'Core Engine',
    title: 'Real-Time Data Processing',
    description: 'Process millions of data points per second with our distributed pipeline architecture. Built for scale, optimized for speed.',
    image: FEATURE_IMG_1,
    size: 'large',
    specs: [
      { value: '1M+', label: 'Events/sec' },
      { value: '< 10ms', label: 'Latency' },
      { value: '99.99%', label: 'Reliability' },
      { value: 'Auto', label: 'Scaling' },
    ],
  },
  {
    tag: 'Intelligence',
    title: 'AI-Powered Analytics',
    description: 'Machine learning models that adapt to your business patterns, delivering predictive insights and automated decision-making.',
    image: FEATURES_IMG,
    specs: [
      { value: '95%+', label: 'Accuracy' },
      { value: 'Real-time', label: 'Updates' },
    ],
  },
  {
    tag: 'Security',
    title: 'Enterprise-Grade Protection',
    description: 'End-to-end encryption, zero-trust architecture, and SOC2 Type II compliance. Your data fortress.',
    specs: [
      { value: 'AES-256', label: 'Encryption' },
      { value: 'SOC2', label: 'Certified' },
    ],
  },
  {
    tag: 'Integration',
    title: 'Seamless Connectivity',
    description: 'Connect with 200+ platforms through our unified API gateway. RESTful, GraphQL, and WebSocket support out of the box.',
    image: FEATURE_IMG_2,
    specs: [
      { value: '200+', label: 'Integrations' },
      { value: '3 min', label: 'Setup Time' },
    ],
  },
  {
    tag: 'Automation',
    title: 'Workflow Orchestration',
    description: 'Design complex business workflows with our visual builder. No-code automation meets enterprise-grade execution.',
    specs: [
      { value: 'Visual', label: 'Builder' },
      { value: '∞', label: 'Workflows' },
    ],
  },
  {
    tag: 'Monitoring',
    title: 'Observability Suite',
    description: 'Full-stack monitoring with custom dashboards, real-time alerts, and deep performance profiling.',
    specs: [
      { value: '360°', label: 'Visibility' },
      { value: '< 1s', label: 'Alert Time' },
    ],
  },
];

export default function FeatureMatrix() {
  return (
    <section id="features" className="relative py-32 px-6 md:px-12 lg:px-24">
      <div className="hairline mb-20" />

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-16"
      >
        <span className="font-mono text-xs text-volt tracking-widest uppercase">
          System Capabilities
        </span>
        <h2 className="font-inter font-bold text-4xl md:text-6xl lg:text-7xl text-foreground mt-4 tracking-tighter max-w-4xl">
          The Feature
          <br />
          <span className="text-steel">Matrix</span>
        </h2>
        <p className="font-inter text-lg text-steel mt-6 max-w-2xl leading-relaxed">
          Every capability is engineered to transform complex requirements into 
          tangible business outcomes. No compromises.
        </p>
      </motion.div>

      {/* Bento grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature, i) => (
          <FeatureCard key={feature.title} feature={feature} index={i} />
        ))}
      </div>
    </section>
  );
}